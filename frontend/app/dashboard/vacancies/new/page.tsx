'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { createVacancy, ApiError } from '@/lib/api';
import { CreateVacancyPayload, EmploymentType, MinExperience, ApiValidationErrors } from '@/types/vacancy';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
  loading: () => (
    <div className="h-48 border border-zinc-200 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 text-xs">
      Memuat editor...
    </div>
  ),
});

const INITIAL_DESCRIPTION = `<h3>Deskripsi Pekerjaan</h3>
<p>Sebagai [Posisi Lowongan], Anda akan berpartisipasi dalam proses pembangunan aplikasi yang sedang dibangun dalam perusahaan [Nama Perusahaan]. Anda juga diharapkan mampu bekerja dalam tim.</p>
<h3>Tanggung Jawab</h3>
<ul>
  <li>Membuat atau memodifikasi program yang sudah ada.</li>
  <li>Bertanggung jawab dalam mengelola program.</li>
</ul>`;

export default function CreateVacancyPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Form states
  const [title, setTitle] = useState('');
  const [position, setPosition] = useState('');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('full_time');
  const [candidatesNeeded, setCandidatesNeeded] = useState<number | ''>('');
  const [activeUntil, setActiveUntil] = useState('');
  const [location, setLocation] = useState('');
  const [isRemote, setIsRemote] = useState(false);
  const [description, setDescription] = useState(INITIAL_DESCRIPTION);
  const [salaryMin, setSalaryMin] = useState<number | ''>('');
  const [salaryMax, setSalaryMax] = useState<number | ''>('');
  const [showSalary, setShowSalary] = useState(false);
  const [minExperience, setMinExperience] = useState<MinExperience>('1_3');

  const [validationErrors, setValidationErrors] = useState<ApiValidationErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (payload: CreateVacancyPayload) => createVacancy(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      router.push('/dashboard');
    },
    onError: (err: unknown) => {
      if (err instanceof ApiError && err.errors) {
        setValidationErrors(err.errors);
      } else {
        setGeneralError((err as Error).message || 'Terjadi kesalahan sistem.');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    setGeneralError(null);

    const payload: CreateVacancyPayload = {
      title,
      position,
      employment_type: employmentType,
      candidates_needed: Number(candidatesNeeded) || 0,
      active_until: activeUntil,
      location,
      is_remote: isRemote,
      description,
      salary_min: Number(salaryMin) || 0,
      salary_max: salaryMax ? Number(salaryMax) : null,
      show_salary: showSalary,
      min_experience: minExperience,
    };

    mutation.mutate(payload);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Hero type="create" />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-10">
        {generalError && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-sm">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Judul lowongan */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-1.5">
              Judul lowongan <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul lowongan"
              className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors ${
                validationErrors.title ? 'border-rose-500 bg-rose-50/30' : 'border-zinc-200 focus:border-zinc-400'
              }`}
            />
            <p className="text-xs text-zinc-500 mt-1.5">Contoh: Android Native Developer</p>
            {validationErrors.title && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{validationErrors.title[0]}</p>
            )}
          </div>

          {/* Posisi */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-1.5">
              Posisi <span className="text-rose-600">*</span>
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-zinc-900 bg-white focus:outline-none transition-colors ${
                validationErrors.position ? 'border-rose-500 bg-rose-50/30' : 'border-zinc-200 focus:border-zinc-400'
              }`}
            >
              <option value="">Pilih posisi yang dicari</option>
              <option value="Product Engineer">Product Engineer</option>
              <option value="Android Developer">Android Developer</option>
              <option value="iOS Developer">iOS Developer</option>
              <option value="Code Reviewer">Code Reviewer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Fullstack Developer">Fullstack Developer</option>
            </select>
            {validationErrors.position && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{validationErrors.position[0]}</p>
            )}
          </div>

          {/* Tipe pekerjaan */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-2">
              Tipe pekerjaan <span className="text-rose-600">*</span>
            </label>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Full-Time', value: 'full_time' },
                { label: 'Part-Time', value: 'part_time' },
                { label: 'Kontrak', value: 'contract' },
                { label: 'Intern', value: 'internship' },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-3 text-sm text-zinc-800 cursor-pointer">
                  <input
                    type="radio"
                    name="employment_type"
                    value={opt.value}
                    checked={employmentType === opt.value}
                    onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
                    className="w-4 h-4 text-zinc-900 border-zinc-300 focus:ring-zinc-900"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            {validationErrors.employment_type && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{validationErrors.employment_type[0]}</p>
            )}
          </div>

          {/* Kandidat yang dibutuhkan */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-1.5">
              Kandidat yang dibutuhkan <span className="text-rose-600">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={candidatesNeeded}
              onChange={(e) => setCandidatesNeeded(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              placeholder="Masukkan jumlah kandidat yang dibutuhkan"
              className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors ${
                validationErrors.candidates_needed ? 'border-rose-500 bg-rose-50/30' : 'border-zinc-200 focus:border-zinc-400'
              }`}
            />
            {validationErrors.candidates_needed && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{validationErrors.candidates_needed[0]}</p>
            )}
          </div>

          {/* Aktif hingga */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-1.5">
              Aktif hingga <span className="text-rose-600">*</span>
            </label>
            <input
              type="date"
              value={activeUntil}
              onChange={(e) => setActiveUntil(e.target.value)}
              className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-zinc-900 bg-white focus:outline-none transition-colors ${
                validationErrors.active_until ? 'border-rose-500 bg-rose-50/30' : 'border-zinc-200 focus:border-zinc-400'
              }`}
            />
            {validationErrors.active_until && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{validationErrors.active_until[0]}</p>
            )}
          </div>

          {/* Lokasi */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-1.5">
              Lokasi <span className="text-rose-600">*</span>
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-zinc-900 bg-white focus:outline-none transition-colors ${
                validationErrors.location ? 'border-rose-500 bg-rose-50/30' : 'border-zinc-200 focus:border-zinc-400'
              }`}
            >
              <option value="">Pilih lokasi</option>
              <option value="Bandung">Bandung</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Yogyakarta">Yogyakarta</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Remote">Remote</option>
            </select>
            {validationErrors.location && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{validationErrors.location[0]}</p>
            )}

            <div className="mt-3">
              <label className="flex items-center gap-2 text-sm text-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isRemote}
                  onChange={(e) => setIsRemote(e.target.checked)}
                  className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                />
                <span>Bisa remote</span>
              </label>
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-1.5">
              Deskripsi <span className="text-rose-600">*</span>
            </label>
            <RichTextEditor
              value={description}
              onChange={(val) => setDescription(val)}
            />
            <p className="text-xs text-zinc-500 mt-1.5">
              Anda bisa mengubah templat yang telah disediakan di atas.
            </p>
            {validationErrors.description && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{validationErrors.description[0]}</p>
            )}
          </div>

          {/* Rentang gaji per bulan */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-1.5">
              Rentang gaji per bulan <span className="text-rose-600">*</span>
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center flex-1 border border-zinc-200 rounded-lg overflow-hidden focus-within:border-zinc-400">
                <span className="px-3.5 py-2.5 bg-zinc-100 text-zinc-600 text-sm border-r border-zinc-200 font-medium">
                  Rp
                </span>
                <input
                  type="number"
                  min="0"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                  placeholder="Minimum"
                  className="w-full px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none"
                />
              </div>

              <span className="text-zinc-400 text-center">-</span>

              <div className="flex items-center flex-1 border border-zinc-200 rounded-lg overflow-hidden focus-within:border-zinc-400">
                <span className="px-3.5 py-2.5 bg-zinc-100 text-zinc-600 text-sm border-r border-zinc-200 font-medium">
                  Rp
                </span>
                <input
                  type="number"
                  min="0"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                  placeholder="Maksimum (opsional)"
                  className="w-full px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none"
                />
              </div>
            </div>

            <p className="text-xs text-zinc-500 mt-1.5">
              Anda tidak perlu mengisi kolom &quot;Maksimum&quot; jika yang dimasukkan adalah gaji pokok.
            </p>
            {(validationErrors.salary_min || validationErrors.salary_max) && (
              <p className="text-xs text-rose-600 mt-1 font-medium">
                {validationErrors.salary_min?.[0] || validationErrors.salary_max?.[0]}
              </p>
            )}

            {/* Toggle Tampilkan Gaji */}
            <div className="mt-4 pt-4 border-t border-zinc-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showSalary}
                  onChange={(e) => setShowSalary(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zinc-900 relative" />
                <span className="text-sm font-medium text-zinc-800">Tampilkan gaji</span>
              </label>
              <p className="text-xs text-zinc-500 mt-1 ml-14">
                Gaji akan ditampilkan di lowongan pekerjaan dan dapat dilihat oleh kandidat.
              </p>
            </div>
          </div>

          {/* Minimum pengalaman bekerja */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-2">
              Minimum pengalaman bekerja <span className="text-rose-600">*</span>
            </label>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Kurang dari 1 tahun', value: 'lt_1' },
                { label: '1-3 tahun', value: '1_3' },
                { label: '4-5 tahun', value: '4_5' },
                { label: '6-10 tahun', value: '6_10' },
                { label: 'Lebih dari 10 tahun', value: 'gt_10' },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-3 text-sm text-zinc-800 cursor-pointer">
                  <input
                    type="radio"
                    name="min_experience"
                    value={opt.value}
                    checked={minExperience === opt.value}
                    onChange={(e) => setMinExperience(e.target.value as MinExperience)}
                    className="w-4 h-4 text-zinc-900 border-zinc-300 focus:ring-zinc-900"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            {validationErrors.min_experience && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{validationErrors.min_experience[0]}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-3 pt-6 border-t border-zinc-200">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-5 py-2.5 bg-[#2d3e50] text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {mutation.isPending ? 'Menyimpan...' : 'Buat lowongan'}
            </button>

            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-5 py-2.5 bg-[#fafafa] border border-zinc-200 text-zinc-700 text-sm font-medium rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              Batal
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
