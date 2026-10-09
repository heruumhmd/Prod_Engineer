'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

function NavLinks() {
  const pathname = usePathname();
  const isHomeActive = pathname === '/' || pathname.startsWith('/vacancies');
  const isDashboardActive = pathname.startsWith('/dashboard');

  return (
    <nav className="flex items-center gap-6 text-sm">
      <Link
        href="/"
        className={`relative py-5 transition-colors font-medium ${
          isHomeActive
            ? 'text-zinc-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-zinc-900 after:rounded-t-sm'
            : 'text-zinc-600 hover:text-zinc-900'
        }`}
      >
        Lowongan Kerja
      </Link>

      <Link
        href="/dashboard"
        className={`relative py-5 transition-colors font-medium ${
          isDashboardActive
            ? 'text-zinc-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-zinc-900 after:rounded-t-sm'
            : 'text-zinc-600 hover:text-zinc-900'
        }`}
      >
        Dashboard
      </Link>
    </nav>
  );
}

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-zinc-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo-jobs.png"
              alt="Dicoding Jobs"
              width={82}
              height={28}
              priority
              className="h-7 w-auto object-contain"
            />
          </Link>

          <Suspense fallback={<div className="h-5 w-40" />}>
            <NavLinks />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
