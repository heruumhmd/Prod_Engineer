<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
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
            'name' => $this->name,
            'business_sector' => $this->business_sector,
            'size_range' => $this->size_range,
            'logo_url' => $this->logo_path ? asset($this->logo_path) : null,
        ];
    }
}
