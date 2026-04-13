"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/galeria", label: "Galería" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre-nosotras", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

const categoryLinks = [
  { href: "/galeria/salon", label: "Salones" },
  { href: "/galeria/cocinas", label: "Cocinas" },
  { href: "/galeria/banos", label: "Baños" },
  { href: "/galeria/habitaciones", label: "Habitaciones" },
  { href: "/galeria/patios", label: "Patios" },
  { href: "/galeria/vestidor", label: "Vestidores" },
  { href: "/galeria/despacho", label: "Despachos" },
  { href: "/galeria/recibidores", label: "Recibidores" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_0_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      {/* Row 1: Logo centered */}
      <div className="flex justify-between items-center px-6 md:px-12 pt-5 pb-3 max-w-[1920px] mx-auto">
        {/* Left — Pinterest */}
        <div className="flex items-center w-10 md:w-auto">
          <Link
            href="https://pinterest.com/rinconesbari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary transition-colors duration-300"
            aria-label="Pinterest"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
          </Link>
        </div>

        {/* Center — Logo */}
        <Link href="/" className="text-4xl font-allura text-on-surface tracking-wide hover:text-primary transition-colors duration-300">
          Rincones Bari
        </Link>

        {/* Right — Mobile toggle */}
        <div className="flex items-center w-10 md:w-auto justify-end">
          <button
            className="md:hidden text-on-surface"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
          {/* Desktop: search icon placeholder */}
          <Link
            href="/galeria"
            className="hidden md:block text-on-surface-variant hover:text-primary transition-colors duration-300"
            aria-label="Buscar"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </Link>
        </div>
      </div>

      {/* Thin separator */}
      <div className="border-t border-gray-100" />

      {/* Row 2: Navigation — desktop */}
      <nav className="hidden md:flex justify-center items-center gap-8 px-6 py-3 max-w-[1920px] mx-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] uppercase tracking-[0.2em] font-label transition-colors duration-200 py-1 ${
                isActive
                  ? "text-on-surface border-b border-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Row 3: Category sub-nav — only on galeria pages */}
      {pathname.startsWith("/galeria") && (
        <>
          <div className="hidden md:block border-t border-gray-100" />
          <nav className="hidden md:flex justify-center items-center gap-6 px-6 py-2.5 max-w-[1920px] mx-auto bg-surface">
            {categoryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[10px] uppercase tracking-[0.18em] font-label transition-colors duration-200 ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-on-surface-variant/70 hover:text-on-surface-variant"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </>
      )}

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 top-0 z-40 bg-white md:hidden"
          >
            {/* Close */}
            <div className="flex justify-end px-6 pt-6">
              <button onClick={() => setMobileOpen(false)} className="text-on-surface" aria-label="Close menu">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Logo */}
            <div className="flex justify-center pt-8 pb-6">
              <Link href="/" onClick={() => setMobileOpen(false)} className="text-4xl font-allura text-on-surface">
                Rincones Bari
              </Link>
            </div>

            <div className="border-t border-gray-100 mx-8" />

            {/* Main nav */}
            <div className="flex flex-col items-center gap-7 pt-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-xs uppercase tracking-[0.2em] font-label transition-colors duration-200 ${
                      isActive ? "text-on-surface" : "text-on-surface-variant"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-gray-100 mx-12 mt-8" />

            {/* Category links in mobile */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 pt-6 px-8">
              {categoryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[10px] uppercase tracking-[0.15em] font-label text-on-surface-variant/70 hover:text-on-surface transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
