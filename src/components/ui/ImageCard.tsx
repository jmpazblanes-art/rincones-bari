import Image from "next/image";
import Link from "next/link";
import AffiliateButton from "./AffiliateButton";

interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  categorySlug: string;
  imageSlug: string;
  affiliateQuery?: string;
}

export default function ImageCard({
  src,
  alt,
  title,
  description,
  categorySlug,
  imageSlug,
  affiliateQuery,
}: ImageCardProps) {
  return (
    <div className="masonry-item group">
      <Link href={`/galeria/${categorySlug}/${imageSlug}`}>
        <div className="relative overflow-hidden bg-surface editorial-card">
          <Image
            src={src}
            alt={alt}
            width={800}
            height={1000}
            className="w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Pinterest save — appears on hover */}
          <button className="absolute top-4 right-4 bg-white/90 px-4 py-2 text-[10px] font-label font-medium uppercase tracking-[0.15em] flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-on-surface">
            <span className="material-symbols-outlined text-sm">bookmark</span>
            Guardar
          </button>
        </div>
      </Link>
      <div className="mt-5">
        <h3 className="font-serif-display text-xl text-on-surface mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-4">
          {description}
        </p>
        {affiliateQuery && <AffiliateButton query={affiliateQuery} />}
      </div>
    </div>
  );
}
