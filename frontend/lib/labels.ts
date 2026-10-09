import { EmploymentType, MinExperience } from '@/types/vacancy';

export const EMPLOYMENT_TYPE_CARD_LABELS: Record<EmploymentType, string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  contract: 'Kontrak',
  internship: 'Intern',
};

export const EMPLOYMENT_TYPE_BADGE_LABELS: Record<EmploymentType, string> = {
  full_time: 'Full-Time',
  part_time: 'Part-Time',
  contract: 'Kontrak',
  internship: 'Intern',
};

export const MIN_EXPERIENCE_LABELS: Record<MinExperience, string> = {
  lt_1: 'Kurang dari 1 tahun',
  '1_3': '1-3 tahun',
  '4_5': '4-5 tahun',
  '6_10': '6-10 tahun',
  gt_10: 'Lebih dari 10 tahun',
};

const indonesianMonths = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Format string tanggal (Y-m-d atau ISO string) ke format Indonesia '15 Desember 2023'.
 * Menggunakan parsing UTC agar tidak bergeser hari karena timezone.
 */
export function formatDateIndo(dateStr?: string | null): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;

  const day = d.getUTCDate();
  const month = indonesianMonths[d.getUTCMonth()];
  const year = d.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Format angka rupiah.
 */
export function formatRupiah(num: number): string {
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(num);
}
