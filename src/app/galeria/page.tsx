import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryCard from "@/components/ui/CategoryCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getAllCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Galería de Inspiración",
  description:
    "Explora nuestra galería de decoración de interiores. Salones, cocinas, baños, habitaciones, patios y más — cada estancia con su propio universo estético.",
  openGraph: {
    title: "Galería de Inspiración | Rincones Bari",
    description:
      "Navega todas las categorías de nuestra galería: salones, cocinas, baños, habitaciones y más. Inspírate para transformar tu hogar.",
    images: [{ url: "/images/salon/salon-decoracion-moderno-01.png" }],
  },
};

export default function GaleriaPage() {
  const categories = getAllCategories();

  return (
    <>
      <Header />
      <main className="pt-36 pb-24 px-8 md:px-12 max-w-7xl mx-auto">
        {/* Page header */}
        <ScrollReveal className="text-center mb-16 max-w-2xl mx-auto">
          <p className="font-label text-[11px] tracking-[0.25em] uppercase text-on-surface-variant mb-3">
            Explorar
          </p>
          <h1 className="font-serif-display text-4xl md:text-5xl text-on-surface leading-tight mb-4">
            Galería de Inspiración
          </h1>
          <div className="line-draw" />
          <p className="font-body text-on-surface-variant text-[15px] leading-[1.8] mt-6">
            Cada estancia es un mundo. Explora las categorías y encuentra la inspiración
            que buscas para transformar tu hogar en un refugio de calma y belleza.
          </p>
        </ScrollReveal>

        {/* Thin divider */}
        <div className="section-separator mb-16" />

        {/* Category grid */}
        <ScrollReveal variant="stagger" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              slug={category.slug}
              title={category.title}
              imageSrc={category.images[0].file}
              imageAlt={category.images[0].alt}
              imageCount={category.image_count}
            />
          ))}
        </ScrollReveal>

        {/* Bottom copy */}
        <ScrollReveal className="mt-20 text-center">
          <p className="font-body text-on-surface-variant text-sm">
            {categories.reduce((acc, c) => acc + c.image_count, 0)} imágenes de inspiración · actualizado regularmente
          </p>
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
