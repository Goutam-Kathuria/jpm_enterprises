import { useMemo } from "react";
import { useWebsiteContent } from "./websiteApi";

export type CmsSlug = "about-us" | "contact-us" | "privacy-policy";

export type WebsiteCmsPage = {
  slug: CmsSlug;
  title: string;
  content: string;
  active: boolean;
  showInFooter: boolean;
};

const defaultPages: WebsiteCmsPage[] = [
  { slug: "about-us", title: "About Us", content: "", active: true, showInFooter: true },
  { slug: "contact-us", title: "Contact Us", content: "", active: true, showInFooter: true },
  { slug: "privacy-policy", title: "Privacy Policy", content: "", active: true, showInFooter: true },
];

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizePages(raw: unknown): WebsiteCmsPage[] {
  const data = raw && typeof raw === "object" ? raw : {};
  const pages = Array.isArray((data as { pages?: unknown[] }).pages)
    ? (data as { pages: unknown[] }).pages
    : [];

  const normalizedPages = pages
    .map((item) => {
      const page = item && typeof item === "object" ? item : {};
      const slug = normalizeText((page as { slug?: unknown }).slug) as CmsSlug;
      if (!slug) return null;

      return {
        slug,
        title: normalizeText((page as { title?: unknown }).title),
        content: normalizeText((page as { content?: unknown }).content),
        active: (page as { active?: unknown }).active !== false,
        showInFooter: (page as { showInFooter?: unknown }).showInFooter !== false,
      } satisfies WebsiteCmsPage;
    })
    .filter((page): page is WebsiteCmsPage => Boolean(page));

  return defaultPages.map((required) => {
    const page = normalizedPages.find((entry) => entry.slug === required.slug);
    return page ? { ...required, ...page } : required;
  });
}

export function useWebsiteCmsPages() {
  const query = useWebsiteContent("cms_pages");
  const pages = useMemo(() => normalizePages(query.data), [query.data]);
  const footerPages = pages.filter((page) => page.active && page.showInFooter);

  return {
    ...query,
    pages,
    footerPages,
  };
}

export function useWebsiteCmsPage(slug: CmsSlug) {
  const cms = useWebsiteCmsPages();
  const page = useMemo(
    () => cms.pages.find((entry) => entry.slug === slug && entry.active) ?? null,
    [cms.pages, slug],
  );

  return {
    ...cms,
    page,
  };
}
