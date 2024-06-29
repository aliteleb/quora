<?php

namespace App\Http\Requests;

use App\Traits\HttpResponses;
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:20', 'unique:users,name'],
            'email' => ['required', 'string', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8', 'max:32', 'confirmed'],
            'password_confirmation' => ['required', 'same:password'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => "حقل الاسم مطلوب.",
            'name.min' => "يجب أن يحتوي الاسم على الأقل على 3 أحرف.",
            'name.max' => "يجب أن لا يتجاوز الاسم 20 حرفًا.",
            'name.unique' => "هذا الاسم مستخدم بالفعل.",
            'email.required' => "حقل البريد الإلكتروني مطلوب.",
            'email.email' => "يجب أن يكون البريد الإلكتروني عنوانًا صالحًا.",
            'email.unique' => "هذا البريد الإلكتروني مستخدم بالفعل.",
            'password.required' => "حقل كلمة المرور مطلوب.",
            'password.min' => "يجب أن تحتوي كلمة المرور على الأقل على 8 أحرف.",
            'password.max' => "يجب أن لا تتجاوز كلمة المرور 32 حرفًا.",
            'password.confirmed' => "عذرًا! كلمات المرور غير متطابقة. يرجى التحقق مرة أخرى والمحاولة.",
            'password_confirmation' => 'حقل تأكيد كلمة المرور مطلوب.'
        ];
    }


    public function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->toArray();
        throw new HttpResponseException(
            Inertia::render('Auth/Auth', ['errors' => $errors])->toResponse(request())
        );
    }
}
