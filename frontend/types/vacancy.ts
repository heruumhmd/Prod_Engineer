export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'internship';
export type MinExperience = 'lt_1' | '1_3' | '4_5' | '6_10' | 'gt_10';

export interface Company {
  id: number;
  name: string;
  business_sector: string;
  size_range: string;
  logo_url: string | null;
}

export interface Vacancy {
  id: number;
  title: string;
  position: string;
  employment_type: EmploymentType;
  candidates_needed: number;
  active_until: string;
  location: string;
  is_remote: boolean;
  description: string;
  salary_min: number;
  salary_max: number | null;
  show_salary: boolean;
  min_experience: MinExperience;
  created_at: string;
  company: Company;
}

export interface CreateVacancyPayload {
  title: string;
  position: string;
  employment_type: EmploymentType;
  candidates_needed: number;
  active_until: string;
  location: string;
  is_remote: boolean;
  description: string;
  salary_min: number;
  salary_max?: number | null;
  show_salary: boolean;
  min_experience: MinExperience;
}

export interface ApiValidationErrors {
  [key: string]: string[];
}
