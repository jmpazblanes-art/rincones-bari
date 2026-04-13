import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [{ slug: "rincon-de-lectura-perfecto" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "rincon-de-lectura-perfecto") {
    return {
      title: "Cómo crear un rincón de lectura perfecto",
      description:
        "La luz, la textura y el silencio se convierten en los verdaderos protagonistas de un rincón que invita a perderse entre páginas.",
      openGraph: {
        images: [
          { url: "/images/habitaciones/habitacion-decoracion-interior-01.png" },
        ],
      },
    };
  }
  return { title: "Blog" };
}

const shopItems = [
  {
    name: "Silla de lectura en lino",
    price: "489 €",
    image: "/images/habitaciones/habitacion-decoracion-interior-04.png",
    alt: "Dormitorio con cabecero tapizado",
  },
  {
    name: "Lámpara de pie articulada",
    price: "215 €",
    image: "/images/despacho/despacho-estudio-decoracion-moderna-01.png",
    alt: "Despacho en casa moderno",
  },
  {
    name: "Cesta de mimbre natural",
    price: "89 €",
    image: "/images/salon/salon-decoracion-moderno-06.png",
    alt: "Rincón de lectura salón",
  },
  {
    name: "Estantería flotante roble",
    price: "340 €",
    image: "/images/despacho/despacho-estudio-decoracion-moderna-03.png",
    alt: "Despacho con estantería",
  },
];

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  if (slug !== "rincon-de-lectura-perfecto") {
    return (
      <>
        <Header />
        <main className="pt-40 pb-40 text-center">
          <p className="font-headline text-3xl text-on-surface">
            Artículo no encontrado
          </p>
          <Link href="/blog" className="mt-8 inline-block text-primary underline">
            Volver al blog
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        {/* Full-screen Hero */}
        <section className="relative h-[921px] w-full overflow-hidden">
          <Image
            src="/images/habitaciones/habitacion-decoracion-interior-01.png"
            alt="Habitación matrimonial decoración moderna con ropa de cama en lino"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-negro-humo/80 via-negro-humo/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-24 pb-20 flex flex-col gap-6 max-w-5xl">
            <p className="text-xs tracking-[0.2em] font-label uppercase text-beige-arena">
              Espacios · 6 min lectura
            </p>
            <h1 className="font-headline text-5xl md:text-7xl text-surface-container-lowest leading-tight">
              Cómo crear un rincón de lectura{" "}
              <em className="italic">perfecto</em>
            </h1>
            <p className="font-body text-lg text-beige-arena/90 max-w-2xl leading-relaxed italic">
              La luz, la textura y el silencio se convierten en los verdaderos
              protagonistas de un rincón que invita a perderse entre páginas.
            </p>
          </div>
        </section>

        {/* Article Body — 12-col grid */}
        <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-12">
            {/* Main text — 8 cols */}
            <article className="col-span-12 md:col-span-8">
              <p className="drop-cap font-body text-on-surface leading-8 text-lg mb-8">
                Un rincón de lectura no es solo un asiento y una lámpara. Es una
                declaración de intenciones sobre cómo queremos habitar nuestra
                casa. Es decirle al mundo —y a nosotras mismas— que necesitamos
                un espacio para detenernos, para respirar, para sumergirnos en
                otra realidad sin salir de casa.
              </p>
              <p className="font-body text-on-surface leading-8 text-lg mb-8">
                La psicología ambiental lleva décadas estudiando cómo los
                espacios afectan nuestro comportamiento. Y los rincones de
                lectura, esas pequeñas islas de quietud dentro del hogar,
                tienen un efecto particularmente poderoso: nos permiten
                desconectar del ruido del mundo sin necesidad de irnos a
                ningún lugar.
              </p>
              <h2 className="font-headline text-3xl text-on-surface mb-6 mt-12">
                El rincón ideal: elementos esenciales
              </h2>
              <p className="font-body text-on-surface leading-8 text-lg mb-8">
                Antes de pensar en la estética, hay que entender los pilares
                funcionales. Un rincón de lectura necesita tres cosas: asiento
                cómodo, luz adecuada y sensación de recogimiento. Todo lo demás
                es capa sobre capa de placer estético.
              </p>
              <p className="font-body text-on-surface leading-8 text-lg mb-8">
                El asiento debe ser suficientemente firme para mantener una
                buena postura pero lo bastante suave para que quieras quedarte
                horas. Las butacas con orejas son perfectas: crean ese efecto
                de micro-privacidad que necesitamos para concentrarnos. Los
                sillones bajos con cojines también funcionan estupendamente si
                prefieres una lectura más relajada.
              </p>
              <blockquote className="border-l-2 border-primary-container pl-8 py-4 my-10 font-headline text-2xl text-on-surface-variant italic leading-relaxed">
                &ldquo;El mejor rincón de lectura es aquel que te hace olvidar
                que existe el resto del mundo.&rdquo;
              </blockquote>
              <p className="font-body text-on-surface leading-8 text-lg mb-8">
                La luz merece un apartado propio. La luz natural es ideal para
                las horas diurnas —sitúa tu asiento perpendicular a la ventana
                para evitar reflejos en las páginas— pero la luz artificial
                es donde se juega la batalla de la comodidad nocturna.
              </p>
            </article>

            {/* Sidebar — 4 cols */}
            <aside className="col-span-12 md:col-span-4 flex flex-col gap-10">
              {/* Author */}
              <div className="flex flex-col gap-4 p-8 bg-surface-container border border-outline-variant">
                <p className="text-xs tracking-[0.15em] font-label uppercase text-primary">
                  Autora
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-beige-arena flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">
                      person
                    </span>
                  </div>
                  <div>
                    <p className="font-headline text-lg text-on-surface">
                      Elena Martínez
                    </p>
                    <p className="text-xs font-label text-outline">
                      Interiorista &amp; Editora
                    </p>
                  </div>
                </div>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  Especialista en interiorismo consciente y diseño de espacios
                  para el bienestar.
                </p>
              </div>

              {/* Date & read time */}
              <div className="flex flex-col gap-3 p-8 bg-surface-container-low border border-outline-variant">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-base">
                    calendar_today
                  </span>
                  <p className="font-body text-sm text-on-surface-variant">
                    12 de Octubre, 2024
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-base">
                    schedule
                  </span>
                  <p className="font-body text-sm text-on-surface-variant">
                    6 minutos de lectura
                  </p>
                </div>
              </div>

              {/* Share & Bookmark */}
              <div className="flex flex-col gap-4 p-8 border border-outline-variant">
                <p className="text-xs tracking-[0.15em] font-label uppercase text-primary">
                  Compartir
                </p>
                <div className="flex gap-4">
                  <button
                    aria-label="Compartir en Pinterest"
                    className="w-10 h-10 flex items-center justify-center border border-outline-variant hover:border-primary hover:text-primary transition-colors duration-300"
                  >
                    <span className="material-symbols-outlined text-on-surface-variant text-base">
                      push_pin
                    </span>
                  </button>
                  <button
                    aria-label="Guardar artículo"
                    className="w-10 h-10 flex items-center justify-center border border-outline-variant hover:border-primary hover:text-primary transition-colors duration-300"
                  >
                    <span className="material-symbols-outlined text-on-surface-variant text-base">
                      bookmark
                    </span>
                  </button>
                  <button
                    aria-label="Compartir artículo"
                    className="w-10 h-10 flex items-center justify-center border border-outline-variant hover:border-primary hover:text-primary transition-colors duration-300"
                  >
                    <span className="material-symbols-outlined text-on-surface-variant text-base">
                      share
                    </span>
                  </button>
                </div>
              </div>

              {/* Related categories */}
              <div className="flex flex-col gap-4 p-8 bg-surface-container-low">
                <p className="text-xs tracking-[0.15em] font-label uppercase text-primary">
                  Categorías relacionadas
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Habitaciones", "Salón", "Decoración", "Estilo de Vida"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 border border-outline-variant text-xs font-label text-on-surface-variant hover:border-primary hover:text-primary transition-colors duration-300 cursor-pointer"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Image Inset Section */}
        <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-0 items-start">
            {/* 60% image */}
            <div className="col-span-12 md:col-span-7 relative h-[480px] overflow-hidden">
              <Image
                src="/images/habitaciones/habitacion-decoracion-interior-06.png"
                alt="Dormitorio pequeño decoración para aprovechar el espacio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>
            {/* Overlapping white text card */}
            <div className="col-span-12 md:col-span-6 md:col-start-6 md:-ml-12 md:mt-20 relative z-10 bg-surface-container-lowest p-10 md:p-14 editorial-inset-shadow">
              <h2 className="font-headline text-3xl md:text-4xl text-on-surface leading-tight mb-6">
                La luz: el pincel de la atmósfera
              </h2>
              <p className="font-body text-on-surface-variant leading-relaxed mb-8">
                Una lámpara de pie bien posicionada puede transformar completamente
                la sensación de un rincón. La luz cálida (2700-3000K) crea
                ambientes íntimos perfectos para la lectura nocturna. La clave
                está en que la fuente de luz esté por encima del hombro y nunca
                enfrente de los ojos.
              </p>
              <p className="font-allura text-3xl text-primary-container italic leading-relaxed">
                &ldquo;La luz correcta no solo ilumina el libro, ilumina el
                alma.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Three Pillars Bento Grid */}
        <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.2em] font-label uppercase text-primary mb-4">
            Los tres pilares
          </p>
          <h2 className="font-headline text-4xl md:text-5xl text-on-surface mb-12">
            El rincón perfecto en tres actos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pilar 1 */}
            <div className="relative overflow-hidden group">
              <div className="relative h-80">
                <Image
                  src="/images/habitaciones/habitacion-decoracion-interior-09.png"
                  alt="Habitación con dosel decoración romántica"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-negro-humo/70 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-xs tracking-[0.15em] font-label uppercase text-beige-arena mb-3">
                  01
                </p>
                <h3 className="font-headline text-2xl text-surface-container-lowest mb-2">
                  Confort Ergonómico
                </h3>
                <p className="font-body text-sm text-beige-arena/90 leading-relaxed">
                  Un asiento que cuide tu postura sin sacrificar la comodidad.
                  El cuerpo descansado permite que la mente vuele.
                </p>
              </div>
            </div>

            {/* Pilar 2 */}
            <div className="relative overflow-hidden group">
              <div className="relative h-80">
                <Image
                  src="/images/habitaciones/habitacion-decoracion-interior-08.png"
                  alt="Dormitorio en tonos tierra decoración rústica moderna"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-negro-humo/70 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-xs tracking-[0.15em] font-label uppercase text-beige-arena mb-3">
                  02
                </p>
                <h3 className="font-headline text-2xl text-surface-container-lowest mb-2">
                  Capas de Textura
                </h3>
                <p className="font-body text-sm text-beige-arena/90 leading-relaxed">
                  Lino, lana, algodón orgánico. Las texturas táctiles crean
                  microambientes sensoriales que invitan a quedarse.
                </p>
              </div>
            </div>

            {/* Pilar 3 */}
            <div className="relative overflow-hidden group">
              <div className="relative h-80">
                <Image
                  src="/images/salon/salon-decoracion-moderno-10.png"
                  alt="Salón con plantas decoración natural y orgánica"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-negro-humo/70 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-xs tracking-[0.15em] font-label uppercase text-beige-arena mb-3">
                  03
                </p>
                <h3 className="font-headline text-2xl text-surface-container-lowest mb-2">
                  Elementos Vivos
                </h3>
                <p className="font-body text-sm text-beige-arena/90 leading-relaxed">
                  Una planta, una rama, una flor seca. Lo vivo trae energía
                  orgánica que equilibra los materiales inertes del espacio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Shop the Look */}
        <section className="bg-surface-container-low py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs tracking-[0.2em] font-label uppercase text-primary mb-4">
              Shop the Look
            </p>
            <h2 className="font-headline text-4xl text-on-surface mb-12">
              Crea tu rincón
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {shopItems.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-4 bg-surface-container-lowest p-4 group cursor-pointer"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-body text-sm text-on-surface leading-tight">
                      {item.name}
                    </p>
                    <p className="font-label text-primary font-semibold">
                      {item.price}
                    </p>
                  </div>
                  <button className="text-xs tracking-[0.1em] font-label uppercase text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-on-primary transition-all duration-300">
                    Ver producto
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social/Share Section */}
        <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto border-t border-outline-variant">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-xs font-label uppercase tracking-[0.1em] text-on-surface-variant hover:text-primary transition-colors duration-300">
                <span className="material-symbols-outlined text-base">
                  favorite
                </span>
                <span>248 Me gusta</span>
              </button>
              <button className="flex items-center gap-2 text-xs font-label uppercase tracking-[0.1em] text-on-surface-variant hover:text-primary transition-colors duration-300">
                <span className="material-symbols-outlined text-base">
                  chat_bubble
                </span>
                <span>12 Comentarios</span>
              </button>
              <button className="flex items-center gap-2 text-xs font-label uppercase tracking-[0.1em] text-on-surface-variant hover:text-primary transition-colors duration-300">
                <span className="material-symbols-outlined text-base">
                  bookmark
                </span>
                <span>Guardar</span>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-label uppercase tracking-[0.1em] text-outline">
                Compartir:
              </span>
              <button
                aria-label="Compartir en Pinterest"
                className="w-9 h-9 flex items-center justify-center border border-outline-variant hover:border-primary hover:text-primary transition-colors duration-300"
              >
                <span className="material-symbols-outlined text-sm">
                  push_pin
                </span>
              </button>
              <button
                aria-label="Compartir"
                className="w-9 h-9 flex items-center justify-center border border-outline-variant hover:border-primary hover:text-primary transition-colors duration-300"
              >
                <span className="material-symbols-outlined text-sm">share</span>
              </button>
            </div>
          </div>
        </section>

        {/* Comment Form */}
        <section className="bg-surface-container py-20 px-6 md:px-12">
          <div className="max-w-2xl mx-auto flex flex-col gap-8">
            <h2 className="font-headline text-3xl text-on-surface">
              Deja tu comentario
            </h2>
            <p className="font-body text-on-surface-variant leading-relaxed">
              ¿Tienes un rincón de lectura especial? Cuéntanos cómo lo has
              creado. Tu historia puede inspirar a otras.
            </p>
            <form className="flex flex-col gap-6" action="#">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-label uppercase tracking-[0.1em] text-outline">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="border-b border-outline-variant bg-transparent py-3 text-on-surface font-body focus:outline-none focus:border-primary transition-colors duration-300"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-label uppercase tracking-[0.1em] text-outline">
                    Correo
                  </label>
                  <input
                    type="email"
                    className="border-b border-outline-variant bg-transparent py-3 text-on-surface font-body focus:outline-none focus:border-primary transition-colors duration-300"
                    placeholder="tu@correo.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-label uppercase tracking-[0.1em] text-outline">
                  Comentario
                </label>
                <textarea
                  rows={5}
                  className="border-b border-outline-variant bg-transparent py-3 text-on-surface font-body focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                  placeholder="Comparte tu experiencia..."
                />
              </div>
              <button
                type="submit"
                className="self-start px-10 py-4 font-label text-xs tracking-[0.15em] uppercase text-on-primary bg-gradient-to-r from-primary to-primary-container hover:from-primary-container hover:to-primary transition-all duration-300"
              >
                Enviar comentario
              </button>
            </form>
          </div>
        </section>

        {/* Back to blog */}
        <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto text-center">
          <Link
            href="/blog"
            className="text-xs tracking-[0.2em] font-label uppercase text-primary border-b border-primary pb-1 hover:text-primary-container hover:border-primary-container transition-colors duration-300"
          >
            ← Volver al journal
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
