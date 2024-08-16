<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
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
}
