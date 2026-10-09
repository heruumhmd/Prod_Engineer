<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VacancyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'position' => $this->position,
            'employment_type' => $this->employment_type instanceof \BackedEnum ? $this->employment_type->value : (string) $this->employment_type,
            'candidates_needed' => (int) $this->candidates_needed,
            'active_until' => $this->active_until ? (is_string($this->active_until) ? $this->active_until : $this->active_until->format('Y-m-d')) : null,
            'location' => $this->location,
            'is_remote' => (bool) $this->is_remote,
            'description' => $this->description,
            'salary_min' => (int) $this->salary_min,
            'salary_max' => $this->salary_max !== null ? (int) $this->salary_max : null,
            'show_salary' => (bool) $this->show_salary,
            'min_experience' => $this->min_experience instanceof \BackedEnum ? $this->min_experience->value : (string) $this->min_experience,
            'created_at' => $this->created_at?->toISOString(),
            'company' => new CompanyResource($this->whenLoaded('company', $this->company)),
        ];
    }
}
