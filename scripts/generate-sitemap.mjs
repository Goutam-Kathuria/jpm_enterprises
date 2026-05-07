import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const SITE_URL = (process.env.VITE_SITE_URL || "https://jpme.in").replace(
  /\/+$/,
  "",
);
const WEBSITE_API_URL = (
  process.env.VITE_WEBSITE_API_URL || "https://api.jpme.in/jpm"
).replace(/\/+$/, "");

const staticRoutes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.8" },
  { path: "/custom-design", changefreq: "monthly", priority: "0.9" },
  { path: "/blogs", changefreq: "weekly", priority: "0.8" },
];

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function toSlug(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toIsoDate(value) {
  const trimmed = normalizeText(value);

  if (!trimmed) {
    return "";
  }

  const date = new Date(trimmed);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

async function requestJson(pathname) {
  const response = await fetch(`${WEBSITE_API_URL}${pathname}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${pathname}: ${response.status}`);
  }

  return response.json();
}

async function getProductRoutes() {
  try {
    const data = await requestJson("/website/products");
    const products = Array.isArray(data?.products) ? data.products : [];

    return products
      .map((product) => {
        const slug =
          normalizeText(product?.slug) || toSlug(product?.name) || "";

        if (!slug) {
          return null;
        }

        return {
          path: `/product/${slug}`,
          lastmod: toIsoDate(product?.updatedAt || product?.createdAt),
          changefreq: "weekly",
          priority: "0.8",
        };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

async function getBlogRoutes() {
  try {
    const data = await requestJson("/website/content/blogs");
    const payload =
      data?.content && typeof data.content === "object" ? data.content : {};
    const blogData =
      payload?.data && typeof payload.data === "object" ? payload.data : {};
    const posts = Array.isArray(blogData.posts) ? blogData.posts : [];

    return posts
      .filter((post) => post?.visible !== false)
      .map((post) => {
        const slug =
          normalizeText(post?.slug) || toSlug(post?.title) || "";

        if (!slug) {
          return null;
        }

        return {
          path: `/blogs/${slug}`,
          lastmod: toIsoDate(post?.updatedAt || post?.publishedAt),
          changefreq: "monthly",
          priority: "0.7",
        };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

function renderUrlNode(route) {
  const lines = [
    "  <url>",
    `    <loc>${SITE_URL}${route.path}</loc>`,
  ];

  if (route.lastmod) {
    lines.push(`    <lastmod>${route.lastmod}</lastmod>`);
  }

  lines.push(`    <changefreq>${route.changefreq}</changefreq>`);
  lines.push(`    <priority>${route.priority}</priority>`);
  lines.push("  </url>");

  return lines.join("\n");
}

async function main() {
  const [productRoutes, blogRoutes] = await Promise.all([
    getProductRoutes(),
    getBlogRoutes(),
  ]);

  const routes = [...staticRoutes, ...productRoutes, ...blogRoutes];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(renderUrlNode),
    "</urlset>",
    "",
  ].join("\n");

  const publicDir = path.resolve("public");
  mkdirSync(publicDir, { recursive: true });
  writeFileSync(path.join(publicDir, "sitemap.xml"), xml, "utf8");
}

main().catch(() => {
  const publicDir = path.resolve("public");
  mkdirSync(publicDir, { recursive: true });
  const fallbackXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticRoutes.map(renderUrlNode),
    "</urlset>",
    "",
  ].join("\n");
  writeFileSync(path.join(publicDir, "sitemap.xml"), fallbackXml, "utf8");
});
