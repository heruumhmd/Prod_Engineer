<?php

namespace Tests\Unit;

use App\Enums\EmploymentType;
use App\Enums\MinExperience;
use App\Models\Company;
use App\Models\Vacancy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VacancyModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_factory_creates_valid_vacancy(): void
    {
        $vacancy = Vacancy::factory()->create();

        $this->assertNotNull($vacancy->id);
        $this->assertInstanceOf(Company::class, $vacancy->company);
        $this->assertInstanceOf(EmploymentType::class, $vacancy->employment_type);
        $this->assertInstanceOf(MinExperience::class, $vacancy->min_experience);
    }

    public function test_casts_work_properly(): void
    {
        $company = Company::factory()->create();
        $vacancy = Vacancy::create([
            'company_id' => $company->id,
            'title' => 'Backend Engineer',
            'position' => 'Backend',
            'employment_type' => EmploymentType::FULL_TIME,
            'candidates_needed' => 2,
            'active_until' => now()->addDays(10)->toDateString(),
            'location' => 'Bandung',
            'is_remote' => true,
            'description' => '<p>Desc</p>',
            'salary_min' => 7000000,
            'salary_max' => 10000000,
            'show_salary' => true,
            'min_experience' => MinExperience::EXP_1_3,
        ]);

        $this->assertSame(EmploymentType::FULL_TIME, $vacancy->employment_type);
        $this->assertSame(MinExperience::EXP_1_3, $vacancy->min_experience);
        $this->assertTrue($vacancy->is_remote);
        $this->assertTrue($vacancy->show_salary);
        $this->assertSame(2, $vacancy->candidates_needed);
        $this->assertSame(7000000, $vacancy->salary_min);
    }

    public function test_scope_search_filters_matching_title(): void
    {
        $company = Company::factory()->create();
        Vacancy::factory()->create(['company_id' => $company->id, 'title' => 'Software Engineer']);
        Vacancy::factory()->create(['company_id' => $company->id, 'title' => 'Product Manager']);

        $results = Vacancy::search('Software')->get();
        $this->assertCount(1, $results);
        $this->assertSame('Software Engineer', $results->first()->title);
    }

    public function test_scope_search_with_empty_or_null_returns_all(): void
    {
        $company = Company::factory()->create();
        Vacancy::factory()->create(['company_id' => $company->id, 'title' => 'Frontend Dev']);
        Vacancy::factory()->create(['company_id' => $company->id, 'title' => 'Backend Dev']);

        $this->assertCount(2, Vacancy::search(null)->get());
        $this->assertCount(2, Vacancy::search('')->get());
        $this->assertCount(2, Vacancy::search('   ')->get());
    }

    public function test_scope_search_treats_wildcard_characters_literally(): void
    {
        $company = Company::factory()->create();
        Vacancy::factory()->create(['company_id' => $company->id, 'title' => '100% Remote Dev']);
        Vacancy::factory()->create(['company_id' => $company->id, 'title' => '1000 Remote Dev']);
        Vacancy::factory()->create(['company_id' => $company->id, 'title' => 'Dev_Test']);
        Vacancy::factory()->create(['company_id' => $company->id, 'title' => 'DevXTest']);

        $percentResults = Vacancy::search('100%')->get();
        $this->assertCount(1, $percentResults);
        $this->assertSame('100% Remote Dev', $percentResults->first()->title);

        $underscoreResults = Vacancy::search('Dev_Test')->get();
        $this->assertCount(1, $underscoreResults);
        $this->assertSame('Dev_Test', $underscoreResults->first()->title);
    }
}
