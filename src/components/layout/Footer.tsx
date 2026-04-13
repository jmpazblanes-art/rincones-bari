import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 md:px-12 py-20 max-w-7xl mx-auto">
        {/* Col 1: Logo + tagline */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="text-2xl font-allura text-on-surface hover:text-primary transition-colors duration-300">
            Rincones Bari
          </Link>
          <p className="text-on-surface-variant font-body leading-relaxed text-sm">
            Un santuario digital dedicado al arte del interiorismo pausado y la
            curaduría de espacios con alma.
          </p>
        </div>

        {/* Col 2: Links */}
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.2em] font-label uppercase text-primary">
              Explorar
            </span>
            <Link href="/galeria" className="text-on-surface-variant text-sm font-body hover:text-on-surface transition-colors duration-300">
              Galería
            </Link>
            <Link href="/blog" className="text-on-surface-variant text-sm font-body hover:text-on-surface transition-colors duration-300">
              Journal
            </Link>
            <Link href="/sobre-nosotras" className="text-on-surface-variant text-sm font-body hover:text-on-surface transition-colors duration-300">
              Sobre mí
            </Link>
            <Link href="/contacto" className="text-on-surface-variant text-sm font-body hover:text-on-surface transition-colors duration-300">
              Contacto
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.2em] font-label uppercase text-primary">
              Conectar
            </span>
            <a
              href="https://pinterest.com/rinconesbari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant text-sm font-body hover:text-on-surface transition-colors duration-300"
            >
              Pinterest
            </a>
            <a
              href="https://instagram.com/rinconesbari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant text-sm font-body hover:text-on-surface transition-colors duration-300"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Col 3: Copyright */}
        <div className="flex flex-col gap-6 items-start md:items-end justify-between">
          <p className="font-label text-[10px] tracking-[0.15em] uppercase text-on-surface-variant">
            © 2025 Rincones Bari
          </p>
          <p className="font-body text-xs text-on-surface-variant/50 italic">
            The Curated Sanctuary
          </p>
        </div>
      </div>
    </footer>
  );
}
