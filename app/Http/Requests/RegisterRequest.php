<?php

namespace App\Http\Requests;

use App\Traits\HttpResponses;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Inertia\Inertia;

class RegisterRequest extends FormRequest
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
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:20'],
            'username' => [
                'required',
                'string',
                'regex:/^[a-zA-Z0-9_]+$/',
                'min:3',
                'max:20',
                'unique:users,username'
            ],
            'email' => ['required', 'string', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8', 'max:64', 'confirmed'],
            'password_confirmation' => ['required', 'same:password'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => "حقل الاسم مطلوب.",
            'name.min' => "يجب أن يحتوي الاسم على الأقل على 3 أحرف.",
            'name.max' => "يجب أن لا يتجاوز الاسم 20 حرفًا.",
            'username.required' => "حقل اسم المستخدم مطلوب.",
            'username.string' => "يجب أن يكون اسم المستخدم نصًا.",
            'username.regex' => "يمكن أن يحتوي اسم المستخدم على أحرف وأرقام وعلامات التسطير السفلية فقط.",
            'username.min' => "يجب أن يحتوي اسم المستخدم على الأقل على 3 أحرف.",
            'username.max' => "يجب أن لا يتجاوز اسم المستخدم 20 حرفًا.",
            'username.unique' => "هذا اسم المستخدم مستخدم بالفعل.",
            'email.required' => "حقل البريد الإلكتروني مطلوب.",
            'email.email' => "يجب أن يكون البريد الإلكتروني عنوانًا صالحًا.",
            'email.unique' => "هذا البريد الإلكتروني مستخدم بالفعل.",
            'password.required' => "حقل كلمة المرور مطلوب.",
            'password.min' => "يجب أن تحتوي كلمة المرور على الأقل على 8 أحرف.",
            'password.max' => "يجب أن لا تتجاوز كلمة المرور 64 حرفًا.",
            'password.confirmed' => "عذرًا! كلمات المرور غير متطابقة. يرجى التحقق مرة أخرى والمحاولة.",
            'password_confirmation.required' => 'حقل تأكيد كلمة المرور مطلوب.',
            'password_confirmation.same' => 'يجب أن تتطابق كلمة المرور مع تأكيد كلمة المرور.',
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
