import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  slug: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  imageCount?: number;
}

export default function CategoryCard({ slug, title, imageSrc, imageAlt, imageCount }: CategoryCardProps) {
  return (
    <Link href={`/galeria/${slug}`} className="group block editorial-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className="mt-4">
        <p className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-1">
          {slug}{imageCount ? ` · ${imageCount} fotos` : ""}
        </p>
        <h3 className="font-serif-display text-lg font-normal text-on-surface group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
      </div>
    </Link>
  );
}
