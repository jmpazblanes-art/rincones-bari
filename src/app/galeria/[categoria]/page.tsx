import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ImageCard from "@/components/ui/ImageCard";
import { getAllCategories, getCategoryBySlug, getImagesForCategory } from "@/lib/content";

interface Props {
  params: Promise<{ categoria: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ categoria: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) return {};

  const firstImage = category.images[0];

  return {
    title: category.title_seo,
    description: category.meta_description,
    openGraph: {
      title: `${category.title_seo} | Rincones Bari`,
      description: category.meta_description,
      images: firstImage
        ? [{ url: firstImage.file, alt: firstImage.alt }]
        : [],
    },
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) notFound();

  const images = getImagesForCategory(categoria);
  const allCategories = getAllCategories();
  const otherCategories = allCategories.filter((c) => c.slug !== categoria);

  // JSON-LD ImageGallery schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: category.title_seo,
    description: category.meta_description,
    url: `https://www.rinconesbari.com/galeria/${categoria}`,
    image: images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: `https://www.rinconesbari.com${img.file}`,
      name: img.alt,
      description: category.description,
    })),
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
              <Link href="/galeria" className="hover:text-primary transition-colors">
                Galería
              </Link>
            </li>
            <li>
              <span className="material-symbols-outlined text-sm leading-none align-middle">
                chevron_right
              </span>
            </li>
            <li className="text-primary">{category.title}</li>
          </ol>
        </nav>

        {/* Page heading */}
        <h1 className="font-serif-display text-5xl md:text-6xl text-on-surface leading-tight mb-6 max-w-3xl">
          {category.title_seo}
        </h1>
        <div className="w-full h-px bg-outline-variant mb-16" />

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main: masonry grid */}
          <div className="flex-1 min-w-0">
            <div className="masonry-grid">
              {images.map((img) => {
                const imageSlug = img.file.split("/").pop()?.replace(".png", "") ?? "";
                return (
                  <ImageCard
                    key={img.file}
                    src={img.file}
                    alt={img.alt}
                    title={img.alt}
                    description={category.description}
                    categorySlug={categoria}
                    imageSlug={imageSlug}
                    affiliateQuery={category.title}
                  />
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-32 flex flex-col gap-8">
              {/* Other categories */}
              <div className="bg-surface-container-low rounded-lg p-6">
                <p className="font-label text-xs uppercase tracking-[0.15em] text-primary mb-5">
                  Otras estancias
                </p>
                <ul className="flex flex-col gap-3">
                  {otherCategories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/galeria/${cat.slug}`}
                        className="flex items-center justify-between group"
                      >
                        <span className="font-body text-on-surface text-sm group-hover:text-primary transition-colors">
                          {cat.title}
                        </span>
                        <span className="font-label text-xs text-on-surface-variant group-hover:text-primary transition-colors">
                          {cat.image_count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pinterest CTA */}
              <div className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant">
                <p className="font-label text-xs uppercase tracking-[0.15em] text-primary mb-3">
                  ¿Te inspira?
                </p>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-5">
                  Guarda estas ideas en Pinterest y tenlas siempre a mano cuando las necesites.
                </p>
                <a
                  href={`https://pinterest.com/rinconesbari`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary text-xs font-label font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  <span className="material-symbols-outlined text-base">push_pin</span>
                  Seguir en Pinterest
                </a>
              </div>

              {/* Newsletter */}
              <div className="bg-surface-container-low rounded-lg p-6">
                <p className="font-label text-xs uppercase tracking-[0.15em] text-primary mb-3">
                  Inspiración en tu buzón
                </p>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-5">
                  Ideas de decoración cada semana, sin ruido.
                </p>
                <form className="flex flex-col gap-3" action="#">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full border border-outline-variant bg-surface-container-lowest rounded px-4 py-3 text-sm font-body text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary text-on-primary text-xs font-label font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Suscribirme
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
