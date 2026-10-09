'use client';

import { Suspense, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Building2, MapPin, Users, ArrowLeft, Share2, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SanitizedHtml from '@/components/SanitizedHtml';
import VacancyDetailSkeleton from '@/components/skeletons/VacancyDetailSkeleton';
import { getVacancy } from '@/lib/api';
import { EMPLOYMENT_TYPE_BADGE_LABELS, MIN_EXPERIENCE_LABELS, formatRupiah } from '@/lib/labels';

function VacancyDetailContent() {
  const params = useParams();
  const id = params?.id as string;
  const [copied, setCopied] = useState(false);

  const {
    data: vacancy,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['vacancy', id],
    queryFn: () => getVacancy(id),
    enabled: Boolean(id),
  });

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <VacancyDetailSkeleton />
        <Footer />
      </div>
    );
  }

  if (isError || !vacancy) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">
            Lowongan Tidak Ditemukan
          </h1>
          <p className="text-zinc-600 text-sm mb-6">
            Lowongan yang kamu cari mungkin sudah ditutup atau tidak tersedia.
          </p>
          <Link
            href="/"
            className="inline-flex px-4 py-2 bg-[#2d3e50] text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors shadow-xs"
          >
            Kembali ke Daftar Lowongan
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const employmentBadge = EMPLOYMENT_TYPE_BADGE_LABELS[vacancy.employment_type] || vacancy.employment_type;
  const expLabel = MIN_EXPERIENCE_LABELS[vacancy.min_experience] || vacancy.min_experience;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 md:py-10">
        {/* Navigation / Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke lowongan</span>
          </Link>

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer"
            title="Salin tautan lowongan"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-zinc-500" />
                <span>Bagikan</span>
              </>
            )}
          </button>
        </div>

        {/* Header section */}
        <div className="flex items-start gap-5 pb-8 border-b border-zinc-200">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-[#2d3e50] rounded-lg flex items-center justify-center shrink-0 text-white font-semibold text-xs md:text-sm select-none">
            <span>dicoding</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <h1
              data-testid="vacancy-detail-title"
              className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight"
            >
              {vacancy.title}
            </h1>

            <p className="text-xs md:text-sm text-zinc-600">
              Sektor Bisnis: <span className="font-medium">{vacancy.company?.business_sector || 'Technology'}</span>
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-zinc-600 mt-1">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-zinc-400 shrink-0" />
                <span className="text-blue-600 hover:underline cursor-pointer font-medium">
                  {vacancy.company?.name || 'Dicoding Indonesia'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>{vacancy.location}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>{vacancy.company?.size_range || '50-100'} Karyawan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badge employment type */}
        <div className="py-6">
          <span className="inline-block bg-blue-50 text-blue-600 border border-blue-200 rounded-full px-4 py-1 text-xs font-semibold">
            {employmentBadge}
          </span>
        </div>

        {/* Job Description (Sanitized HTML) */}
        <div className="prose prose-zinc max-w-none pb-10 border-b border-zinc-200 text-zinc-800 text-sm md:text-base leading-relaxed [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-zinc-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_li]:my-1.5 [&_a]:text-blue-600 [&_a]:underline">
          <SanitizedHtml html={vacancy.description} />
        </div>

        {/* Informasi Tambahan */}
        <section className="py-8">
          <h2 className="text-lg font-bold text-zinc-900 mb-6">
            Informasi Tambahan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-zinc-500 mb-1">Pengalaman bekerja</p>
              <p className="text-base font-semibold text-zinc-900">{expLabel}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-500 mb-1">Kandidat yang dibutuhkan</p>
              <p className="text-base font-semibold text-zinc-900">
                {vacancy.candidates_needed} kandidat
              </p>
            </div>

            {vacancy.show_salary && (
              <div>
                <p className="text-sm text-zinc-500 mb-1">Rentang Gaji</p>
                <p className="text-base font-semibold text-zinc-900">
                  {formatRupiah(vacancy.salary_min)}
                  {vacancy.salary_max ? ` - ${formatRupiah(vacancy.salary_max)}` : ''}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function VacancyDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col bg-white">
          <Navbar />
          <VacancyDetailSkeleton />
          <Footer />
        </div>
      }
    >
      <VacancyDetailContent />
    </Suspense>
  );
}

