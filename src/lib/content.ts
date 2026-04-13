import contentMap from "../../public/content-map.json";
import type { Category, ImageItem, ContentMap } from "@/types";

const data = contentMap as ContentMap;

export function getSiteConfig() {
  return data.site;
}

export function getBranding() {
  return data.branding;
}

export function getAllCategories(): Category[] {
  return data.categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return data.categories.find((c) => c.slug === slug);
}

export function getImagesForCategory(slug: string): ImageItem[] {
  const category = getCategoryBySlug(slug);
  return category?.images ?? [];
}

export function getAllImagePaths(): { categoria: string; imagen: string }[] {
  const paths: { categoria: string; imagen: string }[] = [];
  for (const cat of data.categories) {
    for (const img of cat.images) {
      const filename = img.file.split("/").pop()?.replace(".png", "") ?? "";
      paths.push({ categoria: cat.slug, imagen: filename });
    }
  }
  return paths;
}

export function getAffiliateTag(): string {
  return process.env.NEXT_PUBLIC_AMAZON_TAG || data.affiliate.tag;
}
