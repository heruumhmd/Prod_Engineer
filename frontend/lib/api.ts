import { ApiValidationErrors, CreateVacancyPayload, Vacancy } from '@/types/vacancy';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export class ApiError extends Error {
  public status: number;
  public errors?: ApiValidationErrors;

  constructor(message: string, status: number, errors?: ApiValidationErrors) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData: { message?: string; errors?: ApiValidationErrors } | null = null;
    try {
      errorData = (await response.json()) as { message?: string; errors?: ApiValidationErrors };
    } catch {
      // ignore parse error
    }

    if (response.status === 422 && errorData?.errors) {
      throw new ApiError(errorData.message || 'Validation failed', 422, errorData.errors);
    }

    throw new ApiError(
      errorData?.message || `Request failed with status ${response.status}`,
      response.status
    );
  }

  if (response.status === 204) {
    return {} as T;
  }

  const json = await response.json();
  return json.data !== undefined ? json.data : json;
}

export async function getVacancies(search?: string): Promise<Vacancy[]> {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return request<Vacancy[]>(`/vacancies${query}`, { method: 'GET' });
}

export async function getVacancy(id: string | number): Promise<Vacancy> {
  return request<Vacancy>(`/vacancies/${id}`, { method: 'GET' });
}

export async function createVacancy(payload: CreateVacancyPayload): Promise<Vacancy> {
  return request<Vacancy>('/vacancies', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateVacancy(id: string | number, payload: Partial<CreateVacancyPayload>): Promise<Vacancy> {
  return request<Vacancy>(`/vacancies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteVacancy(id: string | number): Promise<void> {
  return request<void>(`/vacancies/${id}`, {
    method: 'DELETE',
  });
}
