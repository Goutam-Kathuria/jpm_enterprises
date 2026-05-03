import { useEffect } from "react";
import type { WebsiteProduct, WebsiteSettings } from "./websiteApi";

const SITE_NAME = "JPM Enterprises";
const DEFAULT_DESCRIPTION =
  "Luxury sofa manufacturer in Hisar crafting bespoke furniture, premium seating collections, and refined living spaces.";
const DEFAULT_IMAGE = "/assets/generated/hero-sofa.dim_1600x900.jpg";

interface SeoConfig {
  title: string;
  description?: string;
  image?: string;
  path?: string;
  type?: "website" | "article" | "product";
  keywords?: string[];
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

function resolveAbsoluteUrl(pathOrUrl?: string) {
  if (typeof window === "undefined") {
    return pathOrUrl ?? "";
  }

  try {
    return new URL(
      pathOrUrl || window.location.pathname,
      window.location.origin,
    ).toString();
  } catch {
    return window.location.href;
  }
}

function upsertMeta(
  selector: string,
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  if (typeof document === "undefined") {
    return;
  }

  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  if (typeof document === "undefined") {
    return;
  }

  let element = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`,
  );

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.append(element);
  }

  element.setAttribute("href", href);
}

function upsertStructuredData(
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>,
) {
  if (typeof document === "undefined") {
    return;
  }

  const scriptId = "jpm-structured-data";
  const existingScript = document.getElementById(scriptId);

  if (!structuredData) {
    existingScript?.remove();
    return;
  }

  const normalizedData = Array.isArray(structuredData)
    ? structuredData
    : [structuredData];

  const script =
    existingScript instanceof HTMLScriptElement
      ? existingScript
      : document.createElement("script");

  script.id = scriptId;
  script.type = "application/ld+json";
  script.text = JSON.stringify(normalizedData);

  if (!existingScript) {
    document.head.append(script);
  }
}

export function useDocumentMetadata(config: SeoConfig) {
  useEffect(() => {
    const title = config.title.includes(SITE_NAME)
      ? config.title
      : `${config.title} | ${SITE_NAME}`;
    const description = config.description || DEFAULT_DESCRIPTION;
    const image = resolveAbsoluteUrl(config.image || DEFAULT_IMAGE);
    const canonicalUrl = resolveAbsoluteUrl(config.path);
    const keywords = (config.keywords ?? []).join(", ");

    document.title = title;
    document.documentElement.lang = "en-IN";

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", "index, follow");
    upsertMeta('meta[name="theme-color"]', "name", "theme-color", "#b78a4a");

    if (keywords) {
      upsertMeta('meta[name="keywords"]', "name", "keywords", keywords);
    }

    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      description,
    );
    upsertMeta(
      'meta[property="og:type"]',
      "property",
      "og:type",
      config.type || "website",
    );
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[property="og:image"]', "property", "og:image", image);
    upsertMeta(
      'meta[property="og:site_name"]',
      "property",
      "og:site_name",
      SITE_NAME,
    );
    upsertMeta('meta[property="og:locale"]', "property", "og:locale", "en_IN");

    upsertMeta(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      "summary_large_image",
    );
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      description,
    );
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", image);

    upsertLink("canonical", canonicalUrl);
    upsertStructuredData(config.structuredData);
  }, [config]);
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: resolveAbsoluteUrl("/"),
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
