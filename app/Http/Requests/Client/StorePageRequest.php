<?php

namespace App\Http\Requests\Client;

use App\Models\Page;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Override;
use RealRashid\SweetAlert\Facades\Alert;

class StorePageRequest extends FormRequest
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
        if($this->has('slug')) {
            $this->merge([
                'slug' => Str::slug($this->slug ?: $this->name)
            ]);
        }
        
        parent::prepareForValidation();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique(Page::class)->whereNull('delete_at')],
            'slug' => ['required', 'string', 'max:255', Rule::unique(Page::class)->whereNull('delete_at')]
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        Alert::error(__('error'), $validator->errors()->first());
        parent::failedValidation($validator);
    }
}
