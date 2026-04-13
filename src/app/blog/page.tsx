import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "El Diario Editorial",
  description:
    "Ideas, reflexiones y perspectivas sobre el arte de habitar con consciencia. Decoración de interiores, estilo de vida y bienestar en el hogar.",
};

const blogPosts = [
  {
    slug: "rincon-de-lectura-perfecto",
    category: "Espacios",
    title: "Cómo crear un rincón de lectura perfecto",
    excerpt:
      "La luz, la textura y el silencio se convierten en los verdaderos protagonistas de un rincón que invita a perderse entre páginas.",
    image: "/images/habitaciones/habitacion-decoracion-interior-01.png",
    alt: "Habitación matrimonial con rincón de lectura",
    date: "12 Oct 2024",
    readTime: "6 min",
  },
  {
    slug: "paleta-tonos-tierra",
    category: "Color",
    title: "La paleta de los tonos tierra: calidez sin esfuerzo",
    excerpt:
      "Ocres, arcillas y beiges que transforman cualquier estancia en un abrazo visual. El arte de elegir colores que permanecen.",
    image: "/images/salon/salon-decoracion-moderno-08.png",
    alt: "Salón pequeño decoración para maximizar el espacio",
    date: "5 Oct 2024",
    readTime: "4 min",
  },
  {
    slug: "plantas-interior-bienestar",
    category: "Naturaleza",
    title: "Plantas de interior: el verde que sana",
    excerpt:
      "Más allá de la estética, las plantas crean microclimas de bienestar. Guía para elegir las especies perfectas según tu hogar.",
    image: "/images/salon/salon-decoracion-moderno-10.png",
    alt: "Salón con plantas decoración natural y orgánica",
    date: "28 Sep 2024",
    readTime: "5 min",
  },
  {
    slug: "cocina-funcional-bella",
    category: "Cocinas",
    title: "Cocina funcional y bella: el equilibrio perfecto",
    excerpt:
      "Cuando la eficiencia y la estética se encuentran, cocinar se convierte en un ritual placentero. Claves para una cocina que inspira.",
    image: "/images/cocinas/cocina-moderna-decoracion-interior-05.png",
    alt: "Cocina con mármol y accesorios dorados",
    date: "20 Sep 2024",
    readTime: "7 min",
  },
  {
    slug: "bano-santuario-personal",
    category: "Baños",
    title: "El baño como santuario: rituales de cuidado",
    excerpt:
      "Transformar el baño en un espacio de bienestar es posible con pequeños gestos. Materiales, aromas y luz que invitan a detenerse.",
    image: "/images/banos/bano-moderno-decoracion-interior-03.png",
    alt: "Baño con bañera exenta decoración de lujo",
    date: "12 Sep 2024",
    readTime: "5 min",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Header */}
        <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.2em] font-label uppercase text-primary mb-6">
            Journal &amp; Perspectives
          </p>
          <h1 className="font-headline text-7xl md:text-8xl text-on-surface leading-none">
            El Diario{" "}
            <em className="pl-12 italic text-on-surface-variant">Editorial</em>
          </h1>
          <p className="mt-8 max-w-2xl text-on-surface-variant font-body text-lg leading-relaxed">
            Ideas, reflexiones y perspectivas sobre el arte de habitar con
            consciencia. Porque decorar es, ante todo, un acto de amor hacia uno
            mismo.
          </p>
        </section>

        {/* Featured Article — Editorial Inset */}
        <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-0 items-start">
            {/* Image — spans 8 cols */}
            <div className="col-span-12 md:col-span-8 relative h-[420px] md:h-[600px] overflow-hidden">
              <Image
                src="/images/salon/salon-decoracion-moderno-03.png"
                alt="Salón con sofá gris y detalles en madera natural"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
            </div>

            {/* Overlapping white card — col-start-7 col-span-5 */}
            <div className="col-span-12 md:col-span-5 md:col-start-7 md:-ml-16 md:mt-16 relative z-10 bg-surface-container-lowest p-10 md:p-12 editorial-inset-shadow">
              <p className="text-xs tracking-[0.2em] font-label uppercase text-primary mb-4">
                Featured Story
              </p>
              <h2 className="font-headline text-3xl md:text-4xl text-on-surface leading-tight mb-6">
                La psicología del espacio: cómo tu hogar moldea tu estado de
                ánimo
              </h2>
              <p className="font-body text-on-surface-variant leading-relaxed mb-8">
                La neurociencia del diseño revela que la forma en que organizamos
                y decoramos nuestros espacios tiene un impacto profundo en nuestra
                salud mental, productividad y bienestar emocional.
              </p>
              <Link
                href={`/blog/${featured.slug}`}
                className="text-xs tracking-[0.15em] font-label uppercase text-primary border-b border-primary pb-1 hover:text-primary-container hover:border-primary-container transition-colors duration-300"
              >
                Seguir leyendo
              </Link>
            </div>
          </div>
        </section>

        {/* Blog Grid — 3 cols */}
        <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Post 1 */}
            <article className="flex flex-col gap-5 group">
              <div className="relative overflow-hidden h-72">
                <Image
                  src={rest[0].image}
                  alt={rest[0].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xs tracking-[0.15em] font-label uppercase text-primary">
                  {rest[0].category}
                </p>
                <h3 className="font-headline text-2xl text-on-surface leading-tight">
                  {rest[0].title}
                </h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                  {rest[0].excerpt}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-label text-outline">
                    {rest[0].date}
                  </span>
                  <span className="text-xs font-label text-outline">
                    {rest[0].readTime} lectura
                  </span>
                </div>
                <Link
                  href={`/blog/${rest[0].slug}`}
                  className="text-xs tracking-[0.15em] font-label uppercase text-primary border-b border-primary pb-0.5 w-fit hover:text-primary-container hover:border-primary-container transition-colors duration-300"
                >
                  Leer artículo
                </Link>
              </div>
            </article>

            {/* Post 2 */}
            <article className="flex flex-col gap-5 group">
              <div className="relative overflow-hidden h-72">
                <Image
                  src={rest[1].image}
                  alt={rest[1].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xs tracking-[0.15em] font-label uppercase text-primary">
                  {rest[1].category}
                </p>
                <h3 className="font-headline text-2xl text-on-surface leading-tight">
                  {rest[1].title}
                </h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                  {rest[1].excerpt}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-label text-outline">
                    {rest[1].date}
                  </span>
                  <span className="text-xs font-label text-outline">
                    {rest[1].readTime} lectura
                  </span>
                </div>
                <Link
                  href={`/blog/${rest[1].slug}`}
                  className="text-xs tracking-[0.15em] font-label uppercase text-primary border-b border-primary pb-0.5 w-fit hover:text-primary-container hover:border-primary-container transition-colors duration-300"
                >
                  Leer artículo
                </Link>
              </div>
            </article>

            {/* Pull Quote — center block */}
            <div className="flex flex-col justify-center items-center gap-6 py-12 px-8 bg-surface-container border-l-2 border-primary-container">
              <span className="font-allura text-5xl text-primary-container">
                &ldquo;
              </span>
              <blockquote className="font-headline text-xl md:text-2xl text-on-surface text-center italic leading-relaxed">
                Un espacio bello no es un lujo. Es una necesidad para el alma que
                habita en él.
              </blockquote>
              <p className="text-xs tracking-[0.15em] font-label uppercase text-outline">
                — Rincones Bari
              </p>
            </div>

            {/* Post 3 */}
            <article className="flex flex-col gap-5 group">
              <div className="relative overflow-hidden h-72">
                <Image
                  src={rest[2].image}
                  alt={rest[2].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xs tracking-[0.15em] font-label uppercase text-primary">
                  {rest[2].category}
                </p>
                <h3 className="font-headline text-2xl text-on-surface leading-tight">
                  {rest[2].title}
                </h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                  {rest[2].excerpt}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-label text-outline">
                    {rest[2].date}
                  </span>
                  <span className="text-xs font-label text-outline">
                    {rest[2].readTime} lectura
                  </span>
                </div>
                <Link
                  href={`/blog/${rest[2].slug}`}
                  className="text-xs tracking-[0.15em] font-label uppercase text-primary border-b border-primary pb-0.5 w-fit hover:text-primary-container hover:border-primary-container transition-colors duration-300"
                >
                  Leer artículo
                </Link>
              </div>
            </article>

            {/* Post 4 */}
            <article className="flex flex-col gap-5 group">
              <div className="relative overflow-hidden h-72">
                <Image
                  src={rest[3].image}
                  alt={rest[3].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xs tracking-[0.15em] font-label uppercase text-primary">
                  {rest[3].category}
                </p>
                <h3 className="font-headline text-2xl text-on-surface leading-tight">
                  {rest[3].title}
                </h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                  {rest[3].excerpt}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-label text-outline">
                    {rest[3].date}
                  </span>
                  <span className="text-xs font-label text-outline">
                    {rest[3].readTime} lectura
                  </span>
                </div>
                <Link
                  href={`/blog/${rest[3].slug}`}
                  className="text-xs tracking-[0.15em] font-label uppercase text-primary border-b border-primary pb-0.5 w-fit hover:text-primary-container hover:border-primary-container transition-colors duration-300"
                >
                  Leer artículo
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-surface-container py-24 px-6 md:px-12 mt-12">
          <div className="max-w-2xl mx-auto text-center flex flex-col gap-8">
            <p className="text-xs tracking-[0.2em] font-label uppercase text-primary">
              Newsletter
            </p>
            <h2 className="font-headline text-4xl md:text-5xl text-on-surface leading-tight">
              Inspiración directa en tu bandeja
            </h2>
            <p className="font-body text-on-surface-variant leading-relaxed">
              Cada semana, ideas cuidadas, descubrimientos de interiorismo y
              reflexiones sobre el arte de habitar con alma.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto w-full"
              action="#"
            >
              <input
                type="email"
                placeholder="tu@correo.com"
                className="flex-1 border-b border-outline bg-transparent px-0 py-3 text-on-surface font-body placeholder:text-outline focus:outline-none focus:border-primary transition-colors duration-300"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 font-label text-xs tracking-[0.15em] uppercase text-on-primary bg-gradient-to-r from-primary to-primary-container hover:from-primary-container hover:to-primary transition-all duration-300 whitespace-nowrap"
              >
                Unirme
              </button>
            </form>
            <p className="text-xs font-label text-outline">
              Sin spam. Solo belleza. Puedes darte de baja cuando quieras.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
