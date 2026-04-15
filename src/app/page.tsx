import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getAllCategories } from "@/lib/content";

export default function HomePage() {
  const categories = getAllCategories();
  const [salon, cocinas, banos, habitaciones, patios, vestidor, despacho, recibidores] = categories;

  return (
    <>
      <Header />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Full-width cinematic with Ken Burns
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[90vh] min-h-[650px] overflow-hidden">
        <Image
          src="/images/salon/salon-decoracion-moderno-01.png"
          alt="Salón decorado con calma y estilo — Rincones Bari"
          fill
          priority
          className="object-cover animate-[slowZoom_25s_ease-in-out_infinite_alternate]"
          sizes="100vw"
        />
        {/* Gradient overlay — elegant, not heavy */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Hero content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-7xl mx-auto px-8 md:px-12 pb-16 md:pb-24">
            <p
              className="font-label text-[11px] tracking-[0.25em] uppercase text-white/50 mb-5"
              style={{ animation: "fadeUp 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s both" }}
            >
              Decoración de Interiores
            </p>
            <h1
              className="font-serif-display text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-normal text-white leading-[1.05] max-w-3xl"
              style={{ animation: "fadeUp 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.5s both" }}
            >
              Calma, belleza y estilo
              <br className="hidden md:block" />
              <span className="italic"> en cada detalle</span>
            </h1>
            <div
              className="w-16 h-[1px] bg-white/30 mt-7 mb-6"
              style={{ animation: "fadeUp 0.6s cubic-bezier(0.25,0.46,0.45,0.94) 0.7s both" }}
            />
            <p
              className="font-body text-[15px] text-white/60 max-w-md leading-[1.8]"
              style={{ animation: "fadeUp 0.6s cubic-bezier(0.25,0.46,0.45,0.94) 0.8s both" }}
            >
              Un espacio creado para inspirarte a transformar tu hogar
              en un refugio de paz y elegancia.
            </p>
            <div style={{ animation: "fadeUp 0.6s cubic-bezier(0.25,0.46,0.45,0.94) 1s both" }}>
              <Link
                href="/galeria"
                className="inline-flex items-center gap-3 mt-9 font-label text-[11px] tracking-[0.2em] uppercase text-white border border-white/25 px-8 py-3.5 hover:bg-white hover:text-on-surface transition-all duration-500"
              >
                Explorar galería
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero stats bar — bottom right */}
        <div className="absolute bottom-0 right-0 hidden lg:flex items-center gap-12 bg-white/95 px-10 py-5">
          <div className="hero-stat text-center">
            <p className="font-serif-display text-2xl text-on-surface">56</p>
            <p className="font-label text-[9px] tracking-[0.2em] uppercase text-on-surface-variant mt-1">Imágenes</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="hero-stat text-center">
            <p className="font-serif-display text-2xl text-on-surface">8</p>
            <p className="font-label text-[9px] tracking-[0.2em] uppercase text-on-surface-variant mt-1">Estancias</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="hero-stat text-center">
            <p className="font-serif-display text-2xl text-primary">100%</p>
            <p className="font-label text-[9px] tracking-[0.2em] uppercase text-on-surface-variant mt-1">Inspiración</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CATEGORÍAS — Magazine layout editorial
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 py-20 md:py-32">
        {/* Section header — centered editorial */}
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="font-label text-[11px] tracking-[0.25em] uppercase text-on-surface-variant mb-3">
            Inspiración
          </p>
          <h2 className="font-serif-display text-3xl md:text-4xl font-normal text-on-surface mb-4">
            Explora por estancias
          </h2>
          <div className="line-draw" />
        </ScrollReveal>

        {/* Row 1: Featured large (col-span-7) + 2 stacked (col-span-5) */}
        {salon && cocinas && banos && (
          <ScrollReveal variant="stagger" className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
            {/* FEATURED — large card */}
            <Link href={`/galeria/${salon.slug}`} className="lg:col-span-7 group block editorial-card">
              <div className="relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden bg-surface">
                <Image
                  src={salon.images[0].file}
                  alt={salon.images[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
              <div className="mt-5">
                <p className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-2">
                  {salon.title} · {salon.image_count} fotos
                </p>
                <h3 className="font-serif-display text-xl md:text-2xl font-normal text-on-surface leading-snug group-hover:text-primary transition-colors duration-300">
                  {salon.title_seo}
                </h3>
              </div>
            </Link>

            {/* Two stacked cards */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-5">
              {[cocinas, banos].map((cat) => (
                <Link key={cat.slug} href={`/galeria/${cat.slug}`} className="group block editorial-card">
                  <div className="relative aspect-[16/9] overflow-hidden bg-surface">
                    <Image
                      src={cat.images[0].file}
                      alt={cat.images[0].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-1">
                      {cat.title} · {cat.image_count} fotos
                    </p>
                    <h3 className="font-serif-display text-lg font-normal text-on-surface group-hover:text-primary transition-colors duration-300">
                      {cat.title_seo}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Row 2: 4 equal cards */}
        {habitaciones && (
          <ScrollReveal variant="stagger" className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            {[habitaciones, patios, vestidor, despacho].filter(Boolean).map((cat) => (
              <Link key={cat!.slug} href={`/galeria/${cat!.slug}`} className="group block editorial-card">
                <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                  <Image
                    src={cat!.images[0].file}
                    alt={cat!.images[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-1">
                    {cat!.title}
                  </p>
                  <h3 className="font-serif-display text-base font-normal text-on-surface group-hover:text-primary transition-colors duration-300">
                    {cat!.title_seo}
                  </h3>
                </div>
              </Link>
            ))}
          </ScrollReveal>
        )}

        {/* Row 3: remaining */}
        {recibidores && (
          <ScrollReveal className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            <Link href={`/galeria/${recibidores.slug}`} className="group block editorial-card">
              <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                <Image
                  src={recibidores.images[0].file}
                  alt={recibidores.images[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="mt-4">
                <p className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-1">
                  {recibidores.title}
                </p>
                <h3 className="font-serif-display text-base font-normal text-on-surface group-hover:text-primary transition-colors duration-300">
                  {recibidores.title_seo}
                </h3>
              </div>
            </Link>
          </ScrollReveal>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          EDITORIAL SPLIT — Sobre nosotras
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="section-separator" />
      <section className="bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image — reveal from left */}
          <ScrollReveal variant="left" className="relative aspect-square lg:aspect-auto lg:min-h-[650px] overflow-hidden editorial-card">
            <Image
              src="/images/salon/salon-decoracion-moderno-02.png"
              alt="Interior editorial — detalles de decoración"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </ScrollReveal>

          {/* Text — reveal from right */}
          <ScrollReveal variant="right" className="flex items-center px-8 md:px-16 lg:px-20 py-20 lg:py-0">
            <div className="max-w-md">
              <p className="font-allura text-3xl text-primary mb-2">Nuestra esencia</p>
              <h2 className="font-serif-display text-3xl md:text-4xl font-normal text-on-surface leading-snug mb-8">
                El arte de habitar con consciencia
              </h2>
              <div className="w-12 h-[1px] bg-primary/30 mb-8" />
              <p className="font-body text-[15px] text-on-surface-variant leading-[1.8] mb-6">
                En Rincones Bari curamos cada detalle, cada textura y cada color
                para que encuentres el equilibrio perfecto entre la funcionalidad
                y el arte de vivir bien.
              </p>
              <p className="font-serif-display italic text-lg text-on-surface-variant/80 leading-relaxed mb-10 border-l-2 border-primary/20 pl-6">
                &ldquo;Creemos que el diseño no es solo estética, es la emoción que
                sientes al cruzar el umbral de tu puerta.&rdquo;
              </p>
              <Link
                href="/sobre-nosotras"
                className="inline-flex items-center gap-2 font-label text-[11px] tracking-[0.2em] uppercase text-on-surface hover:text-primary transition-colors duration-300 group"
              >
                Descubre nuestra historia
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          VIDEO — Cinematic autoplay with parallax feel
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[55vh] min-h-[420px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/salon/salon-decoracion-moderno-03.png"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/video/rincones-bari-salon-video-01.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ScrollReveal variant="scale" className="text-center px-8">
            <p className="font-allura text-3xl md:text-4xl text-white/70 mb-3">Cada rincón</p>
            <h2 className="font-serif-display text-3xl md:text-5xl lg:text-6xl font-normal text-white italic leading-snug">
              cuenta una historia
            </h2>
            <div className="w-12 h-[1px] bg-white/30 mx-auto mt-6" />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PINTEREST CTA — Editorial clean
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36">
        <ScrollReveal className="max-w-xl mx-auto text-center px-8">
          <p className="font-label text-[11px] tracking-[0.25em] uppercase text-on-surface-variant mb-4">
            Comunidad
          </p>
          <h2 className="font-serif-display text-3xl md:text-4xl font-normal text-on-surface mb-4">
            Guarda tus rincones favoritos
          </h2>
          <div className="line-draw" />
          <p className="font-body text-[15px] text-on-surface-variant leading-[1.8] mb-12 mt-8">
            Síguenos en Pinterest y crea tableros con las ideas que más te
            inspiren. Tu próximo hogar empieza con un pin.
          </p>
          <a
            href="https://pinterest.com/rinconesbari"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-on-surface text-white font-label text-[11px] tracking-[0.2em] uppercase px-9 py-4 hover:bg-primary transition-colors duration-500 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-300 group-hover:scale-110">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
            Seguir en Pinterest
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
