<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Hash;

class EditSpaceRequest extends FormRequest
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
            'name' => ['max:64', 'min:3', 'unique:spaces', 'nullable'],
            'description' => ['max:250', 'nullable'],
            'avatar' => ['max:3072', 'file', 'mimes:jpeg,jpg,png,webp,tiff,bmp', 'nullable'],
            'cover' => ['max:6144', 'file', 'mimes:jpeg,jpg,png,webp,tiff,bmp', 'nullable'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.min' => "يجب أن يحتوي الاسم على الأقل على 3 أحرف.",
            'name.max' => "يجب أن لا يتجاوز الاسم 64 حرفًا.",
            'description.max' => "يجب أن لا يتجاوز الوصف 250 حرفًا.",
            'avatar.max' => "يجب ألا تزيد حجم الصورة عن 3 MB",
            'avatar.mimes' => "يجب أن يكون امتداد الصورة مثل: jpeg,jpg,png,webp,tiff,bmp",
            'cover.max' => "يجب ألا تزيد حجم الصورة عن 6 MB",
            'cover.mimes' => "يجب أن يكون امتداد الصورة مثل: jpeg,jpg,png,webp,tiff,bmp",
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
