<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PropertyRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    //TODO: sync with your DB struct
    public function rules()
    {
        return [
            'title' => 'required|string|max:200',
            'description' => 'required|string|min:20',
            'price' => 'required|numeric|min:0',
            'type' => 'required|in:apartment,villa,land,commercial',
            'purpose' => 'required|in:rent,sale',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'area_sqm' => 'nullable|integer|min:1',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:100',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'images' => 'nullable|array|max:20',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:5120'
        ];
    }
    //TODO: translate it in arabic
    public function messages()
    {
        return [
            'title.required' => 'Property title is required',
            'description.min' => 'Please provide a detailed description (minimum 20 characters)',
            'price.min' => 'Price must be a positive number',
            'images.max' => 'Maximum 20 images allowed per property'
        ];
    }
}