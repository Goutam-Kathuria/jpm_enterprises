import { useMemo } from "react";
import {
  resolveWebsiteApiBaseUrl,
  resolveWebsiteAssetUrl,
  useWebsiteContent,
} from "./websiteApi";

interface RawWebsiteBlogPost {
  id?: string;
  _id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  summary?: string;
  description?: string;
  content?: string;
  body?: string;
  paragraphs?: string[];
  coverImageUrl?: string;
  image?: string;
  authorName?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  readingTime?: string;
  featured?: boolean;
  visible?: boolean;
  order?: number;
}

export interface WebsiteBlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  paragraphs: string[];
  coverImage: string;
  authorName: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  readingTime: string;
  featured: boolean;
  order: number;
}

export interface WebsiteBlogsContent {
  overline: string;
  heading: string;
  description: string;
  posts: WebsiteBlog[];
}

const DEFAULT_BLOGS_CONTENT: WebsiteBlogsContent = {
  overline: "Furniture Journal",
  heading: "Ideas that help your home feel beautifully lived in",
  description:
    "Publishing blog articles through the admin panel unlocks fresh keyword coverage, stronger internal linking, and more entry pages for search.",
  posts: [],
};

function normalizeText(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function toSlug(value: string) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toStringArray(values: string[] | undefined) {
  return Array.isArray(values)
    ? values
        .map((value) => normalizeText(value))
        .filter(Boolean)
    : [];
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function buildExcerpt(content: string) {
  if (content.length <= 180) {
    return content;
  }

  return `${content.slice(0, 177).trimEnd()}...`;
}

function computeReadingTime(content: string) {
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 180));
  return `${minutes} min read`;
}

function resolveParagraphs(
  post: RawWebsiteBlogPost,
  fallbackContent: string,
) {
  if (Array.isArray(post.paragraphs)) {
    const paragraphs = post.paragraphs
      .map((paragraph) => normalizeText(paragraph))
      .filter(Boolean);

    if (paragraphs.length > 0) {
      return paragraphs;
    }
  }

  if (!fallbackContent) {
    return [];
  }

  return fallbackContent
    .split(/\n\s*\n/)
    .map((paragraph) => stripHtml(paragraph))
    .map((paragraph) => normalizeText(paragraph))
    .filter(Boolean);
}

function compareBlogPosts(left: WebsiteBlog, right: WebsiteBlog) {
  if (left.featured !== right.featured) {
    return left.featured ? -1 : 1;
  }

  if (left.order !== right.order) {
    return left.order - right.order;
  }

  const leftDate = Date.parse(left.publishedAt);
  const rightDate = Date.parse(right.publishedAt);

  if (!Number.isNaN(leftDate) && !Number.isNaN(rightDate) && leftDate !== rightDate) {
    return rightDate - leftDate;
  }

  return left.title.localeCompare(right.title);
}

function normalizeBlogPost(
  post: RawWebsiteBlogPost,
  index: number,
  baseUrl: string,
): WebsiteBlog | null {
  if (post.visible === false) {
    return null;
  }

  const title = normalizeText(post.title) || `JPM Blog ${index + 1}`;
  const slug = normalizeText(post.slug) || toSlug(title) || `blog-${index + 1}`;
  const rawContent = stripHtml(
    normalizeText(post.content) ||
      normalizeText(post.body) ||
      normalizeText(post.description),
  );
  const paragraphs = resolveParagraphs(post, rawContent);
  const content = paragraphs.join("\n\n") || rawContent;
  const excerpt =
    normalizeText(post.excerpt) ||
    normalizeText(post.summary) ||
    buildExcerpt(paragraphs[0] || content);
  const coverImage =
    resolveWebsiteAssetUrl(
      normalizeText(post.coverImageUrl) || normalizeText(post.image),
      baseUrl,
    ) || "";

  return {
    id: normalizeText(post.id || post._id) || `blog-${slug}`,
    slug,
    title,
    excerpt,
    content,
    paragraphs,
    coverImage,
    authorName: normalizeText(post.authorName) || "JPM Enterprises",
    publishedAt: normalizeText(post.publishedAt),
    updatedAt: normalizeText(post.updatedAt),
    tags: toStringArray(post.tags),
    metaTitle:
      normalizeText(post.metaTitle) || `${title} | JPM Enterprises Blog`,
    metaDescription: normalizeText(post.metaDescription) || excerpt,
    readingTime: normalizeText(post.readingTime) || computeReadingTime(content),
    featured: post.featured === true,
    order: typeof post.order === "number" ? post.order : index,
  };
}

function normalizeBlogsContent(raw: Record<string, unknown> | null | undefined) {
  const baseUrl = resolveWebsiteApiBaseUrl();
  const payload = raw && typeof raw === "object" ? raw : {};
  const rawPosts = Array.isArray(payload.posts)
    ? (payload.posts as RawWebsiteBlogPost[])
    : [];

  const posts = rawPosts
    .map((post, index) => normalizeBlogPost(post, index, baseUrl))
    .filter((post): post is WebsiteBlog => Boolean(post))
    .sort(compareBlogPosts);

  return {
    overline:
      normalizeText(String(payload.overline ?? "")) ||
      DEFAULT_BLOGS_CONTENT.overline,
    heading:
      normalizeText(String(payload.heading ?? "")) ||
      DEFAULT_BLOGS_CONTENT.heading,
    description:
      normalizeText(String(payload.description ?? "")) ||
      DEFAULT_BLOGS_CONTENT.description,
    posts,
  } satisfies WebsiteBlogsContent;
}

export function useWebsiteBlogs() {
  const query = useWebsiteContent("blogs");
  const data = useMemo(
    () =>
      normalizeBlogsContent(
        query.data && typeof query.data === "object"
          ? (query.data as Record<string, unknown>)
          : null,
      ),
    [query.data],
  );

  return {
    ...query,
    data,
  };
}

export function useWebsiteBlog(slug?: string) {
  const query = useWebsiteBlogs();
  const normalizedSlug = normalizeText(slug);
  const data = useMemo(
    () =>
      query.data.posts.find((post) => post.slug === normalizedSlug) ?? null,
    [normalizedSlug, query.data.posts],
  );

  return {
    ...query,
    data,
  };
}
