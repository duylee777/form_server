<?php

namespace App\Http\Requests\Client;

use App\Models\Page;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use RealRashid\SweetAlert\Facades\Alert;
use Override;

class UpdatePageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    #[Override]
    protected function prepareForValidation(): void
    {
        if ($this->has('slug')) {
            $this->merge([
                // Chuẩn hóa slug, nếu slug trống thì tự lấy name làm slug
                'slug' => Str::slug($this->slug ?: $this->name),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $page = $this->route('page');

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique(Page::class)->ignore($page),
            ],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique(Page::class)->ignore($page),
            ],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        Alert::error(__('error'), $validator->errors()->first());
        parent::failedValidation($validator);
    }
}
