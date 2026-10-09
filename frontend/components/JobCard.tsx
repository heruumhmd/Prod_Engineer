import Link from 'next/link';
import { Building2, MapPin, Briefcase } from 'lucide-react';
import { Vacancy } from '@/types/vacancy';
import { EMPLOYMENT_TYPE_CARD_LABELS, MIN_EXPERIENCE_LABELS, formatDateIndo } from '@/lib/labels';

interface JobCardProps {
  vacancy: Vacancy;
}

export default function JobCard({ vacancy }: JobCardProps) {
  const employmentTypeLabel = EMPLOYMENT_TYPE_CARD_LABELS[vacancy.employment_type] || vacancy.employment_type;
  const expLabel = MIN_EXPERIENCE_LABELS[vacancy.min_experience] || vacancy.min_experience;
  const createdDate = formatDateIndo(vacancy.created_at);
  const activeUntilDate = formatDateIndo(vacancy.active_until);

  return (
    <Link
      href={`/vacancies/${vacancy.id}`}
      data-testid="job-card"
      className="group block bg-white border border-slate-200/90 rounded-xl p-5 hover:border-slate-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:-translate-y-[0.5px] transition-all duration-200 active:scale-[0.995]"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left section: Logo + Info */}
        <div className="flex items-start gap-4">
          {/* Logo box */}
          <div className="w-16 h-16 md:w-20 md:h-20 bg-[#2d3e50] rounded-lg flex items-center justify-center shrink-0 text-white font-bold tracking-wider text-xs md:text-sm select-none shadow-xs group-hover:bg-[#1e2b38] transition-colors">
            <span>dicoding</span>
          </div>

          <div className="flex flex-col gap-2">
            <h2
              data-testid="job-title"
              className="text-base md:text-[17px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight"
            >
              {vacancy.title}
            </h2>

            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs md:text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-medium text-slate-700">{vacancy.company?.name || 'Dicoding Indonesia'}</span>
              </div>

              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                {employmentTypeLabel}
              </span>

              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{vacancy.location}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{expLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right section: Dates */}
        <div className="flex flex-col md:items-end justify-center text-xs text-slate-500 shrink-0 border-t md:border-t-0 pt-2.5 md:pt-0 border-slate-100">
          <p className="font-medium text-slate-600">Dibuat pada {createdDate}</p>
          <p className="mt-1 text-slate-400">Lamar sebelum <span className="text-slate-600 font-medium">{activeUntilDate}</span></p>
        </div>
      </div>
    </Link>
  );
}
