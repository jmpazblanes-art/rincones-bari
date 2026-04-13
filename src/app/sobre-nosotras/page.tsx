import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sobre Nosotras",
  description:
    "Conoce la historia detrás de Rincones Bari. El arte de habitar con consciencia, la búsqueda de la belleza cotidiana y el diseño que transforma.",
};

const values = [
  {
    icon: "cloud",
    title: "Calma",
    description:
      "Diseñamos para que el estrés desaparezca al cruzar la puerta. Cada decisión estética busca el sosiego y la quietud.",
  },
  {
    icon: "auto_awesome",
    title: "Belleza",
    description:
      "La belleza no es frivolidad: es una necesidad humana profunda. Creemos en espacios que deleitan la vista y nutren el espíritu.",
  },
  {
    icon: "architecture",
    title: "Funcionalidad",
    description:
      "Un espacio hermoso que no funciona es un fracaso. Buscamos siempre el equilibrio entre la estética y el uso real del día a día.",
  },
  {
    icon: "eco",
    title: "Sostenibilidad",
    description:
      "Compramos menos y mejor. Apostamos por materiales naturales, piezas de segunda mano y decisiones conscientes que cuidan el planeta.",
  },
];

export default function SobreNosotrasPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Editorial Inset */}
        <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-0 items-start">
            {/* Portrait image — col-span-7 */}
            <div className="col-span-12 md:col-span-7 relative h-[560px] md:h-[760px] overflow-hidden">
              <Image
                src="/images/habitaciones/habitacion-decoracion-interior-05.png"
                alt="Habitación con terraza decoración mediterránea"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 768px) 100vw, 58vw"
                priority
              />
            </div>

            {/* Overlapping white card — col-span-6 */}
            <div className="col-span-12 md:col-span-6 md:col-start-6 md:-ml-16 md:mt-24 relative z-10 bg-surface-container-lowest p-10 md:p-14 editorial-inset-shadow flex flex-col gap-8">
              <p className="font-allura text-5xl text-primary-container">
                Sobre Nosotras
              </p>
              <h1 className="font-headline text-4xl md:text-5xl text-on-surface leading-tight">
                El arte de habitar con consciencia
              </h1>
              <p className="font-body text-on-surface-variant leading-relaxed text-lg">
                Rincones Bari nació de una certeza simple pero poderosa: el hogar
                es el lugar más importante del mundo. No porque sea grande o
                lujoso, sino porque es donde somos nosotras mismas, donde
                descansamos, donde creamos y donde amamos.
              </p>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Desde hace más de diez años exploramos el interiorismo con una
                mirada particular: buscamos la belleza funcional, los materiales
                con historia, los gestos pequeños que transforman un espacio en
                un santuario personal. No nos interesa seguir tendencias efímeras.
                Nos interesa crear espacios que envejezcan bien, que cuenten algo,
                que tengan alma.
              </p>
              <p className="font-body text-on-surface leading-relaxed italic font-semibold border-l-2 border-primary-container pl-6">
                &ldquo;Decorar no es llenar espacios. Es vaciarlos de lo
                innecesario para que lo esencial respire.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Values Bento Grid */}
        <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.2em] font-label uppercase text-primary mb-4">
            Nuestros valores
          </p>
          <h2 className="font-headline text-4xl md:text-5xl text-on-surface mb-16">
            Lo que nos guía
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="group flex flex-col gap-6 p-10 border border-outline-variant hover:border-primary transition-all duration-500 cursor-default"
              >
                <span className="material-symbols-outlined text-primary-container text-4xl transition-transform duration-500 group-hover:scale-110">
                  {value.icon}
                </span>
                <h3 className="font-headline text-2xl text-on-surface">
                  {value.title}
                </h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Le Corbusier Quote Section */}
        <section className="bg-surface-container py-28 px-6 md:px-12">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 text-center">
            <span className="font-allura text-6xl text-primary-container">
              &ldquo;
            </span>
            <blockquote className="font-headline text-3xl md:text-5xl text-on-surface leading-tight italic">
              La arquitectura es el juego sabio, correcto y magnífico de los
              volúmenes ensamblados bajo la luz.
            </blockquote>
            <p className="text-xs tracking-[0.2em] font-label uppercase text-outline">
              — Le Corbusier
            </p>
            <p className="font-body text-on-surface-variant leading-relaxed max-w-2xl">
              En Rincones Bari hacemos nuestra esta idea y la llevamos al
              interiorismo doméstico: cada estancia es un lienzo donde la luz,
              la textura y la forma se encuentran para crear algo mayor que la
              suma de sus partes.
            </p>
          </div>
        </section>

        {/* Mission statement strip */}
        <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-outline-variant pt-16">
            <div className="flex flex-col gap-4">
              <p className="text-xs tracking-[0.2em] font-label uppercase text-primary">
                Nuestra misión
              </p>
              <h3 className="font-headline text-2xl text-on-surface leading-tight">
                Inspirar espacios que transformen vidas
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xs tracking-[0.2em] font-label uppercase text-primary">
                Nuestra visión
              </p>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Un mundo donde cada persona tenga acceso a un hogar que la nutra,
                la inspire y le dé la energía que necesita para vivir bien.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xs tracking-[0.2em] font-label uppercase text-primary">
                Nuestra promesa
              </p>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Contenido honesto, sin filtros excesivos. Inspiración que puede
                aplicarse en cualquier presupuesto, en cualquier espacio.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
