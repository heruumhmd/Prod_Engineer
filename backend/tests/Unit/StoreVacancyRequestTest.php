<?php

namespace Tests\Unit;

use App\Http\Requests\StoreVacancyRequest;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class StoreVacancyRequestTest extends TestCase
{
    private function validPayload(): array
    {
        return [
            'title' => 'Product Engineer',
            'position' => 'Product Engineer',
            'employment_type' => 'full_time',
            'candidates_needed' => 1,
            'active_until' => now()->addDays(14)->toDateString(),
            'location' => 'Bandung',
            'is_remote' => false,
            'description' => '<p>Valid description</p>',
            'salary_min' => 8000000,
            'salary_max' => 12000000,
            'show_salary' => false,
            'min_experience' => '1_3',
        ];
    }

    private function validate(array $data)
    {
        $rules = (new StoreVacancyRequest())->rules();
        return Validator::make($data, $rules);
    }

    public function test_valid_data_passes_validation(): void
    {
        $validator = $this->validate($this->validPayload());
        $this->assertTrue($validator->passes());
    }

    public function test_title_is_required(): void
    {
        $payload = $this->validPayload();
        $payload['title'] = '';

        $validator = $this->validate($payload);
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('title', $validator->errors()->toArray());
    }

    public function test_title_must_not_exceed_255_characters(): void
    {
        $payload = $this->validPayload();
        $payload['title'] = str_repeat('a', 256);

        $validator = $this->validate($payload);
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('title', $validator->errors()->toArray());
    }

    public function test_employment_type_must_be_valid_enum(): void
    {
        $payload = $this->validPayload();
        $payload['employment_type'] = 'freelance';

        $validator = $this->validate($payload);
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('employment_type', $validator->errors()->toArray());
    }

    public function test_candidates_needed_must_be_at_least_1(): void
    {
        $payload = $this->validPayload();
        $payload['candidates_needed'] = 0;

        $validator = $this->validate($payload);
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('candidates_needed', $validator->errors()->toArray());
    }

    public function test_active_until_cannot_be_in_the_past(): void
    {
        $payload = $this->validPayload();
        $payload['active_until'] = now()->subDay()->toDateString();

        $validator = $this->validate($payload);
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('active_until', $validator->errors()->toArray());
    }

    public function test_salary_max_cannot_be_less_than_salary_min(): void
    {
        $payload = $this->validPayload();
        $payload['salary_min'] = 10000000;
        $payload['salary_max'] = 5000000;

        $validator = $this->validate($payload);
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('salary_max', $validator->errors()->toArray());
    }

    public function test_min_experience_must_be_valid_enum(): void
    {
        $payload = $this->validPayload();
        $payload['min_experience'] = 'invalid_exp';

        $validator = $this->validate($payload);
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('min_experience', $validator->errors()->toArray());
    }
}
