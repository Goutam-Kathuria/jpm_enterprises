import type { WebsiteBlog } from "./blogs";
import type { WebsiteProduct, WebsiteSettings } from "./websiteApi";

export const SITE_NAME = "JPM Enterprises";
export const SITE_URL = normalizeBaseUrl(
  import.meta.env.VITE_SITE_URL || "https://jpme.in",
);
export const DEFAULT_DESCRIPTION =
  "Luxury sofa manufacturer in Hisar crafting bespoke furniture, premium seating collections, and refined living spaces.";
export const DEFAULT_IMAGE = "/assets/generated/hero-sofa.dim_1600x900.jpg";

export interface SeoConfig {
  title: string;
  description?: string;
  image?: string;
  path?: string;
  type?: "website" | "article" | "product";
  keywords?: string[];
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
  robots?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, "");
}

function normalizeText(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function normalizeKeywords(values: string[] | undefined) {
  return Array.from(
    new Set(
      (values ?? [])
        .map((value) => normalizeText(value))
        .filter(Boolean),
    ),
  );
}

function toIsoDate(value: string | null | undefined) {
  const trimmed = normalizeText(value);

  if (!trimmed) {
    return "";
  }

  const date = new Date(trimmed);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function toDatePublished(value: string | null | undefined) {
  const isoDate = toIsoDate(value);
  return isoDate || undefined;
}

export function resolveAbsoluteUrl(pathOrUrl?: string) {
  const candidate = normalizeText(pathOrUrl) || "/";

  try {
    return new URL(candidate, `${SITE_URL}/`).toString();
  } catch {
    return `${SITE_URL}/`;
  }
}

export function createSeoPayload(config: SeoConfig) {
  const title = config.title.includes(SITE_NAME)
    ? config.title
    : `${config.title} | ${SITE_NAME}`;
  const description = normalizeText(config.description) || DEFAULT_DESCRIPTION;
  const image = resolveAbsoluteUrl(config.image || DEFAULT_IMAGE);
  const canonicalUrl = resolveAbsoluteUrl(config.path);
  const keywords = normalizeKeywords(config.keywords);
  const tags = normalizeKeywords(config.tags);
  const structuredData = Array.isArray(config.structuredData)
    ? config.structuredData
    : config.structuredData
      ? [config.structuredData]
      : [];

  return {
    title,
    description,
    image,
    canonicalUrl,
    type: config.type || "website",
    robots: normalizeText(config.robots) || "index, follow",
    author: normalizeText(config.author),
    publishedTime: toIsoDate(config.publishedTime),
    modifiedTime: toIsoDate(config.modifiedTime),
    keywords,
    tags,
    structuredData,
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: resolveAbsoluteUrl("/"),
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: resolveAbsoluteUrl("/"),
      logo: resolveAbsoluteUrl("/assets/uploads/image-1.png"),
    },
  };
}

export function buildWebPageSchema({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: resolveAbsoluteUrl(path),
    image: resolveAbsoluteUrl(image || DEFAULT_IMAGE),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: resolveAbsoluteUrl("/"),
    },
    inLanguage: "en-IN",
  };
}

export function buildLocalBusinessSchema(settings?: Partial<WebsiteSettings>) {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: resolveAbsoluteUrl("/"),
    image: resolveAbsoluteUrl(DEFAULT_IMAGE),
    logo: resolveAbsoluteUrl("/assets/uploads/image-1.png"),
    telephone: settings?.enquiryPhone || undefined,
    email: settings?.enquiryEmail || undefined,
    address: settings?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          addressCountry: "IN",
        }
      : undefined,
    sameAs: [
      settings?.facebookUrl,
      settings?.instagramUrl,
      settings?.twitterUrl,
      settings?.linkedinUrl,
    ].filter(Boolean),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: resolveAbsoluteUrl(item.path),
    })),
  };
}

export function buildItemListSchema(
  name: string,
  items: Array<{ name: string; path: string; image?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: resolveAbsoluteUrl(item.path),
      name: item.name,
      image: item.image ? resolveAbsoluteUrl(item.image) : undefined,
    })),
  };
}

export function buildProductSchema(
  product: WebsiteProduct,
  settings?: Partial<WebsiteSettings>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.metaDescription || product.description,
    image: product.gallery.length > 0 ? product.gallery : [product.image],
    category: product.category?.name || undefined,
    material: product.material || undefined,
    sku: product.slug,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_NAME,
      telephone: settings?.enquiryPhone || undefined,
      email: settings?.enquiryEmail || undefined,
    },
    url: resolveAbsoluteUrl(`/product/${product.slug}`),
  };
}

export function buildBlogPostingSchema(blog: WebsiteBlog) {
  const publishedTime = toDatePublished(blog.publishedAt);
  const modifiedTime = toDatePublished(blog.updatedAt || blog.publishedAt);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription || blog.excerpt,
    image: blog.coverImage ? [blog.coverImage] : [resolveAbsoluteUrl(DEFAULT_IMAGE)],
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: {
      "@type": "Organization",
      name: blog.authorName || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: resolveAbsoluteUrl("/assets/uploads/image-1.png"),
      },
    },
    mainEntityOfPage: resolveAbsoluteUrl(`/blogs/${blog.slug}`),
    keywords: blog.tags.join(", "),
    articleSection: "Furniture Blog",
  };
}

export function buildBlogListingSchema(blogs: WebsiteBlog[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    description:
      "Insights on sofa design, furniture care, and custom living spaces from JPM Enterprises.",
    url: resolveAbsoluteUrl("/blogs"),
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      url: resolveAbsoluteUrl(`/blogs/${blog.slug}`),
      image: blog.coverImage
        ? [blog.coverImage]
        : [resolveAbsoluteUrl(DEFAULT_IMAGE)],
      datePublished: toDatePublished(blog.publishedAt),
      author: {
        "@type": "Organization",
        name: blog.authorName || SITE_NAME,
      },
    })),
  };
}
