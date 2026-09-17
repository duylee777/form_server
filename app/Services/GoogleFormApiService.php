<?php
namespace App\Services;

use App\Models\User;
use Google\Client;
use Google\Service\Drive;
use Exception;
use Google\Service\Forms;

class GoogleFormApiService
{
    private function getAuthenticatedClient(User $user): Client
    {
        $googleAccount = $user->getSocialAccount('google');

        if (!$googleAccount || !$googleAccount->access_token) {
            throw new Exception(__('the account is not connected to google'));
        }

        $client = new Client();
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        
        $accessToken = json_decode($googleAccount->access_token, true);
        $client->setAccessToken($accessToken);

        if ($client->isAccessTokenExpired()) {
            if ($googleAccount->refresh_token) {
                $newToken = $client->fetchAccessTokenWithRefreshToken($googleAccount->refresh_token);
                
                $googleAccount->update([
                    'access_token' => json_encode($newToken),
                    'expires_at'   => now()->addSeconds($newToken['expires_in']),
                ]);
            } else {
                throw new Exception(__('the google connection session has expired. please reconnect'));
            }
        }

        return $client;
    }

    public function getUserForms(User $user): array
    {
        $client = $this->getAuthenticatedClient($user);
        $driveService = new Drive($client);

        $query = "mimeType = 'application/vnd.google-apps.form' and 'me' in owners and trashed = false";

        $optParams = [
            'q'        => $query,
            'fields'   => 'files(id, name, webViewLink, createdTime, modifiedTime)',
            'pageSize' => 50,
            'orderBy'  => 'modifiedTime desc',
        ];

        $results = $driveService->files->listFiles($optParams);
        $forms = [];

        foreach ($results->getFiles() as $file) {
            $forms[] = [
                'id'            => $file->getId(),
                'name'          => $file->getName(),
                'web_view_link' => $file->getWebViewLink(),
                'created_at'    => date('d/m/Y H:i', strtotime($file->getCreatedTime())),
                'updated_at'    => date('d/m/Y H:i', strtotime($file->getModifiedTime())),
            ];
        }

        return $forms;
    }

    /**
     * Lấy chi tiết các câu hỏi (Fields) của một Form theo formId
     */
    public function getFormFields(User $user, string $formId): array
    {
        $client = $this->getAuthenticatedClient($user);
        $formsService = new Forms($client);

        // Gọi Google Forms API lấy dữ liệu form
        $form = $formsService->forms->get($formId);
        $items = $form->getItems() ?? [];

        $fields = [];
        foreach ($items as $item) {
            $questionItem = $item->getQuestionItem();
            
            // Bỏ qua các phần tử không phải câu hỏi (như tiêu đề section, ảnh, video)
            if (!$questionItem) {
                continue;
            }

            $question = $questionItem->getQuestion();

            $fields[] = [
                'item_id'     => $item->getItemId(),
                'title'       => $item->getTitle(),
                'description' => $item->getDescription(),
                'question_id' => $question?->getQuestionId(),
                'required'    => $question?->getRequired() ?? false,
                'type'        => $this->detectQuestionType($questionItem),
                'options'     => $this->extractQuestionOptions($questionItem),
            ];
        }

        return [
            'form_id' => $form->getFormId(),
            'title'   => $form->getInfo()?->getTitle(),
            'fields'  => $fields,
        ];
    }

    /**
     * Nhận diện loại câu hỏi (Text, Choice, Scale, File Upload...)
     */
    private function detectQuestionType(object $questionItem): string
    {
        $q = $questionItem->getQuestion();
        if (!$q) return 'unknown';

        if ($q->getTextQuestion()) return 'text';
        if ($q->getChoiceQuestion()) return $q->getChoiceQuestion()->getType(); // RADIO, CHECKBOX, DROP_DOWN
        if ($q->getScaleQuestion()) return 'scale';
        if ($q->getDateQuestion()) return 'date';
        if ($q->getTimeQuestion()) return 'time';
        if ($q->getFileUploadQuestion()) return 'file_upload';

        return 'other';
    }

    /**
     * Bóc tách các option (đối với câu hỏi trắc nghiệm/checkbox/dropdown)
     */
    private function extractQuestionOptions(object $questionItem): array
    {
        $choiceQuestion = $questionItem->getQuestion()?->getChoiceQuestion();
        if (!$choiceQuestion) return [];

        $options = [];
        foreach ($choiceQuestion->getOptions() as $option) {
            $options[] = $option->getValue();
        }

        return $options;
    }
}