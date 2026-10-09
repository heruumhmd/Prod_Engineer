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
      className="group block bg-white border border-zinc-200 rounded-lg p-5 hover:border-zinc-400 hover:shadow-xs transition-all"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left section: Logo + Info */}
        <div className="flex items-start gap-4">
          {/* Logo box */}
          <div className="w-16 h-16 md:w-20 md:h-20 bg-[#2d3e50] rounded-md flex items-center justify-center shrink-0 text-white font-semibold tracking-wider text-xs md:text-sm select-none">
            <span>dicoding</span>
          </div>

          <div className="flex flex-col gap-2">
            <h2
              data-testid="job-title"
              className="text-base md:text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors"
            >
              {vacancy.title}
            </h2>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs md:text-sm text-zinc-600">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>{vacancy.company?.name || 'Dicoding Indonesia'}</span>
              </div>

              <span className="text-zinc-600 font-medium">
                {employmentTypeLabel}
              </span>

              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>{vacancy.location}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>{expLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right section: Dates */}
        <div className="flex flex-col md:items-end justify-center text-xs text-zinc-500 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-zinc-100">
          <p>Dibuat pada {createdDate}</p>
          <p className="mt-1">Lamar sebelum {activeUntilDate}</p>
        </div>
      </div>
    </Link>
  );
}
