<?php

namespace App\Models;

use App\Enums\EmploymentType;
use App\Enums\MinExperience;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vacancy extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'title',
        'position',
        'employment_type',
        'candidates_needed',
        'active_until',
        'location',
        'is_remote',
        'description',
        'salary_min',
        'salary_max',
        'show_salary',
        'min_experience',
    ];

    protected function casts(): array
    {
        return [
            'employment_type' => EmploymentType::class,
            'min_experience' => MinExperience::class,
            'candidates_needed' => 'integer',
            'active_until' => 'date',
            'is_remote' => 'boolean',
            'salary_min' => 'integer',
            'salary_max' => 'integer',
            'show_salary' => 'boolean',
        ];
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function scopeSearch(Builder $query, ?string $term): Builder
    {
        $trimmed = trim((string) $term);
        if ($trimmed !== '') {
            $escaped = str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $trimmed);
            $query->where('title', 'like', "%{$escaped}%");
        }
        return $query;
    }
}
