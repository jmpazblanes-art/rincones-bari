export interface ImageItem {
  file: string;
  alt: string;
}

export interface Category {
  slug: string;
  title: string;
  title_seo: string;
  description: string;
  meta_description: string;
  image_count: number;
  images: ImageItem[];
  videos?: string[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
}

export interface ContentMap {
  site: SiteConfig;
  branding: {
    colors: Record<string, string>;
    fonts: Record<string, string>;
    assets: {
      logo: string;
      hero_images: string[];
    };
  };
  categories: Category[];
  affiliate: {
    program: string;
    tag: string;
    note: string;
  };
  pinterest: {
    account: string;
    board_prefix: string;
  };
}
