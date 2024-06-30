<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class LoginRequest extends FormRequest
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
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'min:8', 'max:64'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => "حقل البريد الإلكتروني مطلوب.",
            'email.email' => "يجب أن يكون البريد الإلكتروني عنوانًا صالحًا.",
            'password.required' => "حقل كلمة المرور مطلوب.",
            'password.min' => "يجب أن تحتوي كلمة المرور على الأقل على 8 أحرف.",
            'password.max' => "يجب أن لا تتجاوز كلمة المرور 32 حرفًا.",
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
