<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Hash;

class EditProfileRequest extends FormRequest
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
            'name' => ['min:3', 'max:20', 'nullable'],
            'bio' => ['min:10', 'max:160', 'nullable'],
            'old_password' => ['min:8', 'max:64', 'nullable', function ($attribute, $value, $fail) {
                if (!Hash::check($value, auth()->user()->password)) {
                    $fail("كلمة المرور غير صحيحة");
                }
            }],
            'new_password' => ['min:8', 'max:64', 'nullable'],
            'password_confirmation' => ['same:new_password', 'nullable'],
            'avatar' => ['max:3072', 'file', 'mimes:jpeg,jpg,png,webp,tiff,bmp', 'nullable'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.min' => "يجب أن يحتوي الاسم على الأقل على 3 أحرف.",
            'name.max' => "يجب أن لا يتجاوز الاسم 20 حرفًا.",
            'bio.min' => "يجب أن تحتوي النبذة على الأقل على 10 أحرف.",
            'bio.max' => "يجب أن لا تتجاوز النبذة 160 حرفًا.",
            'password.min' => "يجب أن تحتوي كلمة المرور على الأقل على 8 أحرف.",
            'password.max' => "يجب أن لا تتجاوز كلمة المرور 64 حرفًا.",
            'password_confirmation.same' => 'يجب أن تتطابق كلمة المرور مع تأكيد كلمة المرور.',
            'avatar.max' => "يجب ألا تزيد حجم الصورة عن 3 MB",
            'avatar.mimes' => "يجب أن يكون امتداد الصورة مثل: jpeg,jpg,png,webp,tiff,bmp"
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
