import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-zinc-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col items-start gap-4">
          <Image
            src="/logo-dicoding.png"
            alt="Dicoding"
            width={120}
            height={32}
            className="h-8 w-auto object-contain"
          />
          <div className="text-zinc-500 text-sm leading-relaxed max-w-sm">
            <p className="font-medium text-zinc-600">Dicoding Space</p>
            <p>Jl. Batik Kumeli No.50, Sukaluyu,</p>
            <p>Kec. Cibeunying Kaler, Kota Bandung Jawa</p>
            <p>Barat 40123</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
