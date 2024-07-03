<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class SpaceRequest extends FormRequest
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
            'name' => ['required', 'max:64', 'min:3'],
            'description' => ['max:250'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => "حقل الاسم مطلوب.",
            'name.min' => "يجب أن يحتوي الاسم على الأقل على 3 أحرف.",
            'name.max' => "يجب أن لا يتجاوز الاسم 20 حرفًا.",
            'description.man' => "يجب ألا يتخطي الوصف 250 حرف.",
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
