import Image from 'next/image';

interface HeroProps {
  type?: 'home' | 'create';
}

export default function Hero({ type = 'home' }: HeroProps) {
  if (type === 'create') {
    return (
      <section className="w-full bg-[#18181b] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Buat lowongan pekerjaan
              </h1>
              <div className="inline-flex rounded-full overflow-hidden border border-zinc-700 shrink-0">
                <Image
                  src="/hero-capsule.png"
                  alt="Dicoding Hero"
                  width={120}
                  height={38}
                  className="h-8 md:h-9 w-auto object-cover"
                />
              </div>
            </div>
            <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl leading-relaxed">
              Dicoding Jobs menghubungkan industri dengan talenta yang tepat. Mencari tim baru tidak harus melelahkan dan boros biaya.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#18181b] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <span className="text-blue-500 font-semibold text-xs md:text-sm tracking-wide block mb-2">
          Dicoding Jobs
        </span>
        <div className="flex items-center gap-4 flex-wrap">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-snug">
            Temukan lowongan yang cocok untuk kamu
          </h1>
          <div className="inline-flex rounded-full overflow-hidden border border-zinc-700 shrink-0">
            <Image
              src="/hero-capsule.png"
              alt="Dicoding Hero"
              width={120}
              height={38}
              className="h-8 md:h-9 w-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
