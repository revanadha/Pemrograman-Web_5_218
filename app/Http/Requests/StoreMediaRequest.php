<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255', 'unique:media,title'],
            'type' => ['required', 'string', 'in:anime,manga'],
            'genre' => ['required', 'string', 'max:255'],
            'rating' => ['required', 'numeric', 'between:0,10'],
            'release_year' => ['required', 'integer', 'between:1900,2100'],
            'creator' => ['required', 'string', 'max:255'],
            'total_units' => ['required', 'integer', 'min:1'],
            'status' => ['sometimes', 'string', 'in:Ongoing,Completed'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Judul media wajib diisi.',
            'title.unique' => 'Judul media sudah terdaftar di FlipPlay.',
            'type.in' => 'Jenis media harus berupa anime atau manga.',
            'rating.between' => 'Rating harus berada di rentang 0 sampai 10.',
        ];
    }
}
