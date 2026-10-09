<?php

namespace Database\Factories;

use App\Enums\EmploymentType;
use App\Enums\MinExperience;
use App\Models\Company;
use App\Models\Vacancy;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Vacancy>
 */
class VacancyFactory extends Factory
{
    protected $model = Vacancy::class;

    public function definition(): array
    {
        return [
            'company_id' => Company::factory(),
            'title' => fake()->jobTitle(),
            'position' => fake()->jobTitle(),
            'employment_type' => EmploymentType::FULL_TIME,
            'candidates_needed' => fake()->numberBetween(1, 5),
            'active_until' => now()->addDays(14)->toDateString(),
            'location' => 'Bandung',
            'is_remote' => false,
            'description' => '<p>' . fake()->paragraphs(3, true) . '</p>',
            'salary_min' => 8000000,
            'salary_max' => 12000000,
            'show_salary' => false,
            'min_experience' => MinExperience::EXP_1_3,
        ];
    }
}
