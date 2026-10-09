<?php

namespace App\Http\Requests;

use App\Enums\EmploymentType;
use App\Enums\MinExperience;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVacancyRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],
            'employment_type' => ['required', Rule::enum(EmploymentType::class)],
            'candidates_needed' => ['required', 'integer', 'min:1'],
            'active_until' => ['required', 'date'],
            'location' => ['required', 'string', 'max:255'],
            'is_remote' => ['nullable', 'boolean'],
            'description' => ['required', 'string', 'max:20000'],
            'salary_min' => ['required', 'integer', 'min:0'],
            'salary_max' => ['nullable', 'integer', 'gte:salary_min'],
            'show_salary' => ['nullable', 'boolean'],
            'min_experience' => ['required', Rule::enum(MinExperience::class)],
        ];
    }
}
