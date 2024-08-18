<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class EditSpaceAboutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'text' => ['max:2600', 'required']
        ];
    }

    public function messages(): array
    {
        return [
            'text.max' => "يجب أن لا تتجاوز التفاصيل 2600 حرفًا.",
        ];
    }

    public function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->toArray();
        throw new HttpResponseException(
            back()->withErrors($errors)->withInput()
        );
    }
}
