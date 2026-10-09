<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Company>
 */
class CompanyFactory extends Factory
{
    protected $model = Company::class;

    public function definition(): array
    {
        return [
            'name' => 'Dicoding Indonesia',
            'business_sector' => 'Technology',
            'size_range' => '50-100',
            'logo_path' => null,
        ];
    }
}
