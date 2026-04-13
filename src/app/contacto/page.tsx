import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Ponte en contacto con Rincones Bari. Colaboraciones, consultas de interiorismo o simplemente para decir hola.",
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Page Header */}
        <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.2em] font-label uppercase text-primary mb-6">
            Get in Touch
          </p>
          <h1 className="font-headline text-5xl md:text-7xl text-on-surface leading-tight max-w-4xl italic">
            Let&rsquo;s create your sanctuary together.
          </h1>
        </section>

        {/* 12-col grid: contact info + form */}
        <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-12 md:gap-20 items-start">
            {/* Left column — col-span-4 */}
            <div className="col-span-12 md:col-span-4 flex flex-col gap-12">
              {/* Email */}
              <div className="flex flex-col gap-3">
                <p className="text-xs tracking-[0.2em] font-label uppercase text-primary">
                  Email
                </p>
                <a
                  href="mailto:hola@rinconesbari.com"
                  className="font-body text-on-surface hover:text-primary transition-colors duration-300"
                >
                  hola@rinconesbari.com
                </a>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-3">
                <p className="text-xs tracking-[0.2em] font-label uppercase text-primary">
                  Ubicación
                </p>
                <address className="font-body text-on-surface-variant not-italic leading-relaxed">
                  Barcelona, España
                  <br />
                  Disponible también online
                </address>
              </div>

              {/* Social links */}
              <div className="flex flex-col gap-4">
                <p className="text-xs tracking-[0.2em] font-label uppercase text-primary">
                  Redes sociales
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://pinterest.com/rinconesbari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-body text-on-surface-variant hover:text-primary transition-colors duration-300 group"
                  >
                    <span className="material-symbols-outlined text-base text-primary-container group-hover:text-primary transition-colors duration-300">
                      push_pin
                    </span>
                    Pinterest
                  </a>
                  <a
                    href="https://instagram.com/rinconesbari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-body text-on-surface-variant hover:text-primary transition-colors duration-300 group"
                  >
                    <span className="material-symbols-outlined text-base text-primary-container group-hover:text-primary transition-colors duration-300">
                      photo_camera
                    </span>
                    Instagram
                  </a>
                </div>
              </div>

              {/* Editorial inset image with Allura quote */}
              <div className="relative mt-4">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src="/images/patios/patio-exterior-decoracion-jardin-01.png"
                    alt="Patio moderno con muebles de exterior decoración mediterránea"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-negro-humo/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-allura text-3xl text-surface-container-lowest italic leading-relaxed">
                    &ldquo;Tu hogar merece amor.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Right column — col-span-8: form */}
            <div className="col-span-12 md:col-span-8 bg-surface-container-low p-10 md:p-16">
              <h2 className="font-headline text-3xl text-on-surface mb-10">
                Cuéntanos todo
              </h2>
              <form
                className="flex flex-col gap-10"
                action="#"
              >
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-label uppercase tracking-[0.15em] text-outline">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="border-b border-outline-variant bg-transparent py-4 text-on-surface font-body placeholder:text-outline focus:outline-none focus:border-primary transition-colors duration-300 text-lg"
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-label uppercase tracking-[0.15em] text-outline">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    className="border-b border-outline-variant bg-transparent py-4 text-on-surface font-body placeholder:text-outline focus:outline-none focus:border-primary transition-colors duration-300 text-lg"
                    required
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-label uppercase tracking-[0.15em] text-outline">
                    Mensaje
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    className="border-b border-outline-variant bg-transparent py-4 text-on-surface font-body placeholder:text-outline focus:outline-none focus:border-primary transition-colors duration-300 resize-none text-lg"
                    required
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-between flex-wrap gap-6 pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-3 px-12 py-5 font-label text-xs tracking-[0.15em] uppercase text-on-primary bg-eucalyptus hover:bg-amazon-green transition-all duration-300 group"
                  >
                    Send Message
                    <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      north_east
                    </span>
                  </button>
                  <p className="text-xs font-label text-outline">
                    Respondemos en menos de 48 horas
                  </p>
                </div>
              </form>

              {/* Italic border-left quote below form */}
              <blockquote className="border-l-2 border-primary-container pl-8 py-3 mt-16 font-headline text-xl text-on-surface-variant italic leading-relaxed">
                &ldquo;Cada conversación sobre decoración es el comienzo de una
                transformación. No hay espacio demasiado pequeño ni sueño
                demasiado grande.&rdquo;
              </blockquote>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
