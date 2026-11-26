<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $media = $this->route('media');
        $mediaId = is_object($media) ? $media->id : $media;

        return [
            'title' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('media', 'title')->ignore($mediaId)],
            'type' => ['sometimes', 'required', 'string', 'in:anime,manga'],
            'genre' => ['sometimes', 'required', 'string', 'max:255'],
            'rating' => ['sometimes', 'required', 'numeric', 'between:0,10'],
            'release_year' => ['sometimes', 'required', 'integer', 'between:1900,2100'],
            'creator' => ['sometimes', 'required', 'string', 'max:255'],
            'total_units' => ['sometimes', 'required', 'integer', 'min:1'],
            'status' => ['sometimes', 'required', 'string', 'in:Ongoing,Completed'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Judul media tidak boleh kosong.',
            'title.unique' => 'Judul media sudah digunakan oleh media lain.',
            'type.in' => 'Jenis media harus berupa anime atau manga.',
            'rating.between' => 'Rating harus berada di rentang 0 sampai 10.',
        ];
    }
}
