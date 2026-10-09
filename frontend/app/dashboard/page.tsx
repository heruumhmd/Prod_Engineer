'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { Briefcase, Upload, Clock, Pencil, Trash2, Plus, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import DashboardCardSkeleton from '@/components/skeletons/DashboardCardSkeleton';
import { getVacancies, deleteVacancy } from '@/lib/api';
import { formatDateIndo } from '@/lib/labels';

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    data: vacancies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['vacancies'],
    queryFn: () => getVacancies(),
  });

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteVacancy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      setDeleteTarget(null);
      showToast('Lowongan berhasil dihapus');
    },
    onError: (err) => {
      alert('Gagal menghapus lowongan: ' + (err as Error).message);
    },
  });

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteMutation.mutate(deleteTarget.id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white border border-zinc-200 rounded-lg p-5 shadow-xs">
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
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Lowongan Saya
            </h1>

            <Link
              href="/dashboard/vacancies/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2d3e50] text-white rounded-xl text-sm font-semibold hover:bg-[#1e2b38] transition-all shadow-xs active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Buat lowongan</span>
            </Link>
          </div>

          {isLoading ? (
            <DashboardCardSkeleton count={3} />
          ) : isError ? (
            <div className="p-6 text-center bg-rose-50 border border-rose-200 rounded-xl text-rose-700">
              <p className="font-semibold text-sm">Gagal memuat lowongan dashboard</p>
            </div>
          ) : vacancies.length === 0 ? (
            <div className="p-12 text-center bg-white border border-dashed border-slate-200 rounded-2xl">
              <p className="text-slate-600 text-sm mb-4">Belum ada lowongan yang dibuat.</p>
              <Link
                href="/dashboard/vacancies/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#2d3e50] text-white rounded-xl text-sm font-semibold hover:bg-[#1e2b38] transition-all active:scale-[0.98]"
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
                  className="bg-white border border-slate-200/90 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Navy logo box with '9' mark matching Figma Frame 3 */}
                    <div className="w-14 h-14 bg-[#2d3e50] rounded-xl flex items-center justify-center text-white text-xl font-bold shrink-0 select-none shadow-2xs">
                      <span>9</span>
                    </div>

                    <div>
                      <Link
                        href={`/vacancies/${vacancy.id}`}
                        className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors tracking-tight"
                      >
                        {vacancy.title}
                      </Link>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-500 mt-2">
                        <div className="flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5 text-slate-400" />
                          <span>Dibuat: <span className="font-medium text-slate-600">{formatDateIndo(vacancy.created_at)}</span></span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Aktif hingga: <span className="font-medium text-slate-600">{formatDateIndo(vacancy.active_until)}</span></span>
                        </div>
                      </div>

                      {/* Action buttons on card */}
                      <div className="flex items-center gap-2 mt-4">
                        <Link
                          href={`/dashboard/vacancies/${vacancy.id}/edit`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs active:scale-95"
                        >
                          <Pencil className="w-3.5 h-3.5 text-slate-400" />
                          <span>Edit</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => setDeleteTarget({ id: vacancy.id, title: vacancy.title })}
                          disabled={deleteMutation.isPending}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs font-semibold hover:bg-rose-100 transition-colors cursor-pointer disabled:opacity-50 active:scale-95"
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

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-zinc-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-zinc-900">
                  Hapus Lowongan Pekerjaan
                </h3>
                <p className="text-sm text-zinc-600 mt-1">
                  Apakah Anda yakin ingin menghapus lowongan <span className="font-semibold text-zinc-900">&quot;{deleteTarget.title}&quot;</span>? Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                {deleteMutation.isPending ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-zinc-900 text-white px-4 py-3 rounded-lg shadow-lg border border-zinc-800 animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-zinc-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

