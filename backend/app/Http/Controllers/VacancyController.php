<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVacancyRequest;
use App\Http\Resources\VacancyResource;
use App\Models\Company;
use App\Models\Vacancy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class VacancyController extends Controller
{
    /**
     * Display a listing of the vacancies.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $vacancies = Vacancy::with('company')
            ->search($request->query('search'))
            ->orderByDesc('created_at')
            ->orderBy('id', 'asc')
            ->get();

        return VacancyResource::collection($vacancies);
    }

    /**
     * Display the specified vacancy.
     */
    public function show(string $id): VacancyResource
    {
        $vacancy = Vacancy::with('company')->findOrFail($id);

        return new VacancyResource($vacancy);
    }

    /**
     * Store a newly created vacancy in storage.
     */
    public function store(StoreVacancyRequest $request): JsonResponse
    {
        $company = Company::first();
        if (!$company) {
            $company = Company::create([
                'name' => 'Dicoding Indonesia',
                'business_sector' => 'Technology',
                'size_range' => '50-100',
                'logo_path' => null,
            ]);
        }

        $validated = $request->validated();
        $validated['company_id'] = $company->id;
        $validated['is_remote'] = $request->boolean('is_remote');
        $validated['show_salary'] = $request->boolean('show_salary');

        $vacancy = Vacancy::create($validated);
        $vacancy->load('company');

        return (new VacancyResource($vacancy))
            ->response()
            ->setStatusCode(201);
    }
}
