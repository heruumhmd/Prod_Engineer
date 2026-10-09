'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import JobCardSkeleton from '@/components/skeletons/JobCardSkeleton';
import { getVacancies } from '@/lib/api';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  // Debounce search input (~300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const {
    data: vacancies = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['vacancies', debouncedTerm],
    queryFn: () => getVacancies(debouncedTerm),
  });

  const sectionTitle = debouncedTerm.trim() !== '' ? 'Hasil Pencarian' : 'Daftar Pekerjaan Terbaru';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Hero type="home" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {/* Section Header with Search Input */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            {sectionTitle}
          </h2>

          <div className="relative w-full md:w-80 group">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
            <input
              type="text"
              data-testid="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setDebouncedTerm(searchTerm);
                }
              }}
              placeholder="Pekerjaan apa yang sedang kamu cari?"
              className="w-full pl-10 pr-9 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all shadow-2xs"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setDebouncedTerm('');
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                title="Hapus pencarian"
                aria-label="Hapus pencarian"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Content list */}
        {isLoading ? (
          <JobCardSkeleton count={4} />
        ) : isError ? (
          <div className="text-center py-16 text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-6">
            <p className="font-semibold">Gagal memuat lowongan</p>
            <p className="text-xs mt-1 text-slate-600">{error?.message || 'Terjadi kesalahan sistem'}</p>
          </div>
        ) : vacancies.length === 0 ? (
          <div
            data-testid="empty-state"
            className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50/40"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <Search className="w-5 h-5" />
            </div>
            <p className="text-base font-semibold text-slate-800">
              Tidak ada lowongan yang ditemukan
            </p>
            <p className="text-sm text-slate-500 mt-1 max-w-sm">
              Coba gunakan kata kunci pencarian yang lain atau periksa kembali ejaan kamu.
            </p>
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setDebouncedTerm('');
                }}
                className="mt-4 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
              >
                Reset Pencarian
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {vacancies.map((vacancy) => (
              <JobCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
