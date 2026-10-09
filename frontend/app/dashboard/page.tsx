'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Briefcase, Upload, Clock, Pencil, Trash2, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { getVacancies } from '@/lib/api';
import { formatDateIndo } from '@/lib/labels';

export default function DashboardPage() {
  const {
    data: vacancies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['vacancies'],
    queryFn: () => getVacancies(),
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white border border-zinc-200 rounded-lg p-5">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-4">
              <span className="font-bold text-lg text-zinc-900">Jobs</span>
              {/* Circuit line icon */}
              <div className="flex items-center gap-1 text-blue-600">
                <div className="w-2 h-2 rounded-full border-2 border-blue-600" />
                <div className="w-4 h-[2px] bg-blue-600" />
                <div className="w-2 h-2 bg-blue-600 rounded-xs" />
              </div>
            </div>

            <nav>
              <div
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-zinc-100 text-zinc-900 font-medium text-sm cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-zinc-600" />
                <span>Lowongan Saya</span>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-zinc-900">
              Lowongan Saya
            </h1>

            <Link
              href="/dashboard/vacancies/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#2d3e50] text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Buat lowongan</span>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500 bg-white border border-zinc-200 rounded-lg">
              <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-800 rounded-full animate-spin mb-3" />
              <p className="text-sm">Memuat lowongan...</p>
            </div>
          ) : isError ? (
            <div className="p-6 text-center bg-rose-50 border border-rose-200 rounded-lg text-rose-700">
              <p className="font-semibold text-sm">Gagal memuat lowongan dashboard</p>
            </div>
          ) : vacancies.length === 0 ? (
            <div className="p-12 text-center bg-white border border-dashed border-zinc-200 rounded-lg">
              <p className="text-zinc-600 text-sm mb-4">Belum ada lowongan yang dibuat.</p>
              <Link
                href="/dashboard/vacancies/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#2d3e50] text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Buat lowongan pertama</span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {vacancies.map((vacancy) => (
                <div
                  key={vacancy.id}
                  data-testid="dashboard-vacancy-card"
                  className="bg-white border border-zinc-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-start gap-4">
                    {/* Navy logo box with '9' mark matching Figma Frame 3 */}
                    <div className="w-14 h-14 bg-[#2d3e50] rounded-lg flex items-center justify-center text-white text-xl font-bold shrink-0 select-none">
                      <span>9</span>
                    </div>

                    <div>
                      <Link
                        href={`/vacancies/${vacancy.id}`}
                        className="text-base font-bold text-zinc-900 hover:text-blue-600 transition-colors"
                      >
                        {vacancy.title}
                      </Link>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-zinc-600 mt-2">
                        <div className="flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Dibuat: {formatDateIndo(vacancy.created_at)}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Aktif hingga: {formatDateIndo(vacancy.active_until)}</span>
                        </div>
                      </div>

                      {/* Action buttons on card */}
                      <div className="flex items-center gap-2 mt-4">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fafafa] border border-zinc-200 rounded-md text-xs font-medium text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5 text-zinc-500" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fecdd3] text-[#be123c] rounded-md text-xs font-semibold hover:bg-rose-200 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
