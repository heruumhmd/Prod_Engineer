<?php

namespace Tests\Feature;

use App\Models\Company;
use App\Models\Vacancy;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VacancyApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_post_valid_creates_vacancy_and_associates_company(): void
    {
        $company = Company::factory()->create(['name' => 'Dicoding Indonesia']);

        $payload = [
            'title' => 'Software Engineer in Test',
            'position' => 'QA Engineer',
            'employment_type' => 'full_time',
            'candidates_needed' => 2,
            'active_until' => now()->addDays(30)->toDateString(),
            'location' => 'Bandung',
            'is_remote' => true,
            'description' => '<p>Test automation and QA</p>',
            'salary_min' => 8000000,
            'salary_max' => 12000000,
            'show_salary' => true,
            'min_experience' => '1_3',
        ];

        $response = $this->postJson('/api/vacancies', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('data.title', 'Software Engineer in Test')
            ->assertJsonPath('data.company.id', $company->id)
            ->assertJsonPath('data.company.name', 'Dicoding Indonesia');

        $this->assertDatabaseHas('vacancies', [
            'title' => 'Software Engineer in Test',
            'company_id' => $company->id,
            'position' => 'QA Engineer',
            'is_remote' => 1,
            'show_salary' => 1,
        ]);
    }

    public function test_post_invalid_returns_422_with_validation_errors(): void
    {
        $response = $this->postJson('/api/vacancies', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'title',
                'position',
                'employment_type',
                'candidates_needed',
                'active_until',
                'location',
                'description',
                'salary_min',
                'min_experience',
            ]);
    }

    public function test_get_vacancies_returns_200_ordered_by_created_at_desc(): void
    {
        $company = Company::factory()->create();

        $v1 = Vacancy::factory()->create([
            'company_id' => $company->id,
            'title' => 'Older Job',
            'created_at' => Carbon::now()->subDays(2),
        ]);
        $v2 = Vacancy::factory()->create([
            'company_id' => $company->id,
            'title' => 'Newer Job',
            'created_at' => Carbon::now(),
        ]);

        $response = $this->getJson('/api/vacancies');

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.title', 'Newer Job')
            ->assertJsonPath('data.1.title', 'Older Job');
    }

    public function test_get_vacancies_with_search_filters_by_title(): void
    {
        $company = Company::factory()->create();

        Vacancy::factory()->create([
            'company_id' => $company->id,
            'title' => 'Android Developer',
        ]);
        Vacancy::factory()->create([
            'company_id' => $company->id,
            'title' => 'iOS Developer',
        ]);
        Vacancy::factory()->create([
            'company_id' => $company->id,
            'title' => 'Backend Engineer',
        ]);

        $matchResponse = $this->getJson('/api/vacancies?search=Developer');
        $matchResponse->assertStatus(200)
            ->assertJsonCount(2, 'data');

        $noMatchResponse = $this->getJson('/api/vacancies?search=NonExistentJobTitle');
        $noMatchResponse->assertStatus(200)
            ->assertJsonCount(0, 'data');
    }

    public function test_get_vacancy_detail_returns_all_fields_and_handles_404(): void
    {
        $company = Company::factory()->create([
            'name' => 'Dicoding Indonesia',
            'business_sector' => 'Technology',
            'size_range' => '50-100',
        ]);

        $vacancy = Vacancy::factory()->create([
            'company_id' => $company->id,
            'title' => 'Product Engineer',
            'position' => 'Product Engineer',
            'employment_type' => 'full_time',
            'candidates_needed' => 1,
            'active_until' => '2023-12-30',
            'location' => 'Bandung',
            'is_remote' => false,
            'description' => '<p>Impactful products</p>',
            'salary_min' => 10000000,
            'salary_max' => 15000000,
            'show_salary' => true,
            'min_experience' => '1_3',
        ]);

        $response = $this->getJson("/api/vacancies/{$vacancy->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $vacancy->id)
            ->assertJsonPath('data.title', 'Product Engineer')
            ->assertJsonPath('data.position', 'Product Engineer')
            ->assertJsonPath('data.employment_type', 'full_time')
            ->assertJsonPath('data.candidates_needed', 1)
            ->assertJsonPath('data.active_until', '2023-12-30')
            ->assertJsonPath('data.location', 'Bandung')
            ->assertJsonPath('data.is_remote', false)
            ->assertJsonPath('data.salary_min', 10000000)
            ->assertJsonPath('data.salary_max', 15000000)
            ->assertJsonPath('data.show_salary', true)
            ->assertJsonPath('data.min_experience', '1_3')
            ->assertJsonPath('data.company.name', 'Dicoding Indonesia')
            ->assertJsonPath('data.company.business_sector', 'Technology')
            ->assertJsonPath('data.company.size_range', '50-100');

        $notFoundResponse = $this->getJson('/api/vacancies/99999');
        $notFoundResponse->assertStatus(404)
            ->assertJsonPath('message', 'Resource not found.');
    }
}
