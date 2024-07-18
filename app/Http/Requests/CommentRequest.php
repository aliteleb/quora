<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
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
            'comment' => ['max:600'],
            'image' => ['mimes:jpeg,jpg,png,webp', 'max:4096', 'nullable'],
            'video' => ['mimes:mp4,mov,ogg,avi,mkv', 'max:20480', 'nullable'],
        ];
    }
}
