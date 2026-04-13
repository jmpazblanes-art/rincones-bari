import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AffiliateButton from "@/components/ui/AffiliateButton";
import { getAllImagePaths, getCategoryBySlug, getImagesForCategory } from "@/lib/content";

interface Props {
  params: Promise<{ categoria: string; imagen: string }>;
}

export async function generateStaticParams() {
  return getAllImagePaths().map(({ categoria, imagen }) => ({ categoria, imagen }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria, imagen } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) return {};

  const images = getImagesForCategory(categoria);
  const img = images.find(
    (i) => (i.file.split("/").pop()?.replace(".png", "") ?? "") === imagen
  );
  if (!img) return {};

  return {
    title: img.alt,
    description: category.meta_description,
    openGraph: {
      title: `${img.alt} | Rincones Bari`,
      description: category.meta_description,
      images: [{ url: img.file, alt: img.alt }],
    },
  };
}

// Placeholder product cards — affiliate-linked to Amazon
const PLACEHOLDER_PRODUCTS = [
  { label: "Sofá modular", query: "sofá modular salón" },
  { label: "Lámpara de pie", query: "lámpara de pie decoración" },
  { label: "Espejo decorativo", query: "espejo decorativo pared" },
  { label: "Cojines decorativos", query: "cojines decorativos sala" },
];

export default async function ImagenPage({ params }: Props) {
  const { categoria, imagen } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) notFound();

  const images = getImagesForCategory(categoria);
  const currentIndex = images.findIndex(
    (i) => (i.file.split("/").pop()?.replace(".png", "") ?? "") === imagen
  );
  if (currentIndex === -1) notFound();

  const img = images[currentIndex];
  const prevImage = currentIndex > 0 ? images[currentIndex - 1] : null;
  const nextImage = currentIndex < images.length - 1 ? images[currentIndex + 1] : null;
  const relatedImages = images.filter((_, idx) => idx !== currentIndex).slice(0, 4);

  const imageTitle = img.alt;
  const prevSlug = prevImage
    ? prevImage.file.split("/").pop()?.replace(".png", "") ?? ""
    : null;
  const nextSlug = nextImage
    ? nextImage.file.split("/").pop()?.replace(".png", "") ?? ""
    : null;

  const siteUrl = "https://www.rinconesbari.com";

  // JSON-LD ImageObject schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: img.alt,
    contentUrl: `${siteUrl}${img.file}`,
    description: category.description,
    url: `${siteUrl}/galeria/${categoria}/${imagen}`,
    author: {
      "@type": "Organization",
      name: "Rincones Bari",
      url: siteUrl,
    },
    isPartOf: {
      "@type": "ImageGallery",
      name: category.title_seo,
      url: `${siteUrl}/galeria/${categoria}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1920px] mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 text-xs font-label uppercase tracking-widest text-on-surface-variant">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <span className="material-symbols-outlined text-sm leading-none align-middle">
                chevron_right
              </span>
            </li>
            <li>
              <Link
                href={`/galeria/${categoria}`}
                className="hover:text-primary transition-colors"
              >
                {category.title}
              </Link>
            </li>
            <li>
              <span className="material-symbols-outlined text-sm leading-none align-middle">
                chevron_right
              </span>
            </li>
            <li className="text-primary truncate max-w-[200px]">{imageTitle}</li>
          </ol>
        </nav>

        {/* Main 12-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          {/* Left: main image col-span-8 */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-container-low group">
              <Image
                src={img.file}
                alt={img.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              {/* Floating action buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Pinterest save */}
                <a
                  href={`https://pinterest.com/pin/create/button/?media=${encodeURIComponent(
                    `${siteUrl}${img.file}`
                  )}&description=${encodeURIComponent(img.alt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-bright/80 backdrop-blur-md p-3 rounded-full text-primary shadow-sm hover:scale-105 transition-transform"
                  aria-label="Guardar en Pinterest"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    push_pin
                  </span>
                </a>
                {/* Share */}
                <button
                  className="bg-surface-bright/80 backdrop-blur-md p-3 rounded-full text-primary shadow-sm hover:scale-105 transition-transform"
                  aria-label="Compartir imagen"
                >
                  <span className="material-symbols-outlined">ios_share</span>
                </button>
              </div>
            </div>

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between mt-6">
              {prevSlug ? (
                <Link
                  href={`/galeria/${categoria}/${prevSlug}`}
                  className="flex items-center gap-2 text-xs font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  Anterior
                </Link>
              ) : (
                <span />
              )}
              <Link
                href={`/galeria/${categoria}`}
                className="text-xs font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
              >
                Ver todas ({images.length})
              </Link>
              {nextSlug ? (
                <Link
                  href={`/galeria/${categoria}/${nextSlug}`}
                  className="flex items-center gap-2 text-xs font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                >
                  Siguiente
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>

          {/* Right: sticky sidebar col-span-4 */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 flex flex-col gap-8">
              {/* Title + description */}
              <div>
                <p className="font-label text-xs uppercase tracking-[0.15em] text-primary mb-3">
                  {category.title}
                </p>
                <h1 className="font-serif-display text-3xl md:text-4xl text-on-surface leading-snug mb-4">
                  {imageTitle}
                </h1>
                <p className="font-body text-on-surface-variant text-base leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="w-full h-px bg-outline-variant" />

              {/* Designer Notes */}
              <div>
                <p className="font-label text-xs uppercase tracking-[0.15em] text-primary mb-4">
                  Notas del espacio
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-container text-base mt-0.5">
                      palette
                    </span>
                    <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                      Paleta de tonos neutros cálidos que invitan a la calma y el bienestar.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-container text-base mt-0.5">
                      texture
                    </span>
                    <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                      Materiales naturales — madera, lino y piedra — que aportan carácter sin recargar.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-container text-base mt-0.5">
                      light_mode
                    </span>
                    <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                      La luz natural es el elemento central del diseño. Se potencia con espejos y superficies reflectantes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-outline-variant" />

              {/* Download Moodboard CTA */}
              <a
                href="#"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary text-xs font-label font-bold uppercase tracking-widest px-6 py-4 rounded-full hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-base">download</span>
                Descargar Moodboard
              </a>

              {/* Affiliate shortcut */}
              <div className="pt-2">
                <AffiliateButton
                  query={category.title}
                  label={`Ver productos para ${category.title.toLowerCase()} en Amazon`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Related Products section */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="font-label text-xs uppercase tracking-[0.15em] text-primary mb-2">
                Productos sugeridos
              </p>
              <h2 className="font-serif-display text-3xl text-on-surface">
                Recrea este estilo en tu hogar
              </h2>
            </div>
          </div>
          <div className="w-full h-px bg-outline-variant mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PLACEHOLDER_PRODUCTS.map((product) => {
              const tag =
                typeof process !== "undefined"
                  ? process.env.NEXT_PUBLIC_AMAZON_TAG || "rinconesbari-21"
                  : "rinconesbari-21";
              const url = `https://www.amazon.es/s?k=${encodeURIComponent(product.query)}&tag=${tag}`;
              return (
                <a
                  key={product.label}
                  href={url}
                  target="_blank"
                  rel="nofollow sponsored"
                  className="group flex flex-col gap-4"
                >
                  {/* Placeholder thumbnail */}
                  <div className="aspect-square rounded-lg bg-surface-container-low overflow-hidden flex items-center justify-center group-hover:bg-surface-container transition-colors">
                    <span className="material-symbols-outlined text-4xl text-outline">
                      shopping_bag
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-on-surface text-sm font-medium mb-1">
                      {product.label}
                    </p>
                    <span className="font-label text-xs font-bold uppercase tracking-widest text-amazon-green">
                      Ver en Amazon →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Related Images section */}
        {relatedImages.length > 0 && (
          <section className="mb-16">
            <div className="mb-10">
              <p className="font-label text-xs uppercase tracking-[0.15em] text-primary mb-2">
                Seguir explorando
              </p>
              <h2 className="font-serif-display text-3xl text-on-surface">
                Más de {category.title}
              </h2>
            </div>
            <div className="w-full h-px bg-outline-variant mb-10" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedImages.map((relImg) => {
                const relSlug =
                  relImg.file.split("/").pop()?.replace(".png", "") ?? "";
                return (
                  <Link
                    key={relImg.file}
                    href={`/galeria/${categoria}/${relSlug}`}
                    className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-surface-container-low block"
                  >
                    <Image
                      src={relImg.file}
                      alt={relImg.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-on-surface/0 group-hover:bg-on-surface/20 transition-colors duration-500" />
                    <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="font-body text-on-primary text-xs leading-snug line-clamp-2">
                        {relImg.alt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <Link
                href={`/galeria/${categoria}`}
                className="inline-flex items-center gap-2 border border-outline-variant px-8 py-3 rounded-full text-xs font-label font-bold uppercase tracking-widest text-on-surface hover:bg-surface-container-low transition-colors"
              >
                Ver toda la galería de {category.title}
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
