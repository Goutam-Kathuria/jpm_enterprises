import { useQuery } from "@tanstack/react-query";

const DEFAULT_LOCAL_WEBSITE_API_BASE_URL = "https://api.jpme.in/jpm";
// const DEFAULT_LOCAL_WEBSITE_API_BASE_URL = "http://localhost:7000/jpm";

const FALLBACK_CATEGORY_IMAGES = [
  "/assets/generated/hero-sofa.dim_1600x900.jpg",
  "/assets/generated/sofa-modern.dim_800x600.jpg",
  "/assets/generated/sofa-lshape.dim_800x600.jpg",
  "/assets/generated/sofa-leather.dim_800x600.jpg",
];

const FALLBACK_PRODUCT_IMAGES = [
  "/assets/generated/sofa-modern.dim_800x600.jpg",
  "/assets/generated/sofa-leather.dim_800x600.jpg",
  "/assets/generated/sofa-fabric.dim_800x600.jpg",
  "/assets/generated/sofa-lshape.dim_800x600.jpg",
  "/assets/generated/sofa-recliner.dim_800x600.jpg",
];

const FALLBACK_GALLERY_IMAGES = [
  "/assets/generated/gallery-1.dim_600x800.jpg",
  "/assets/generated/gallery-2.dim_800x600.jpg",
  "/assets/generated/gallery-3.dim_600x700.jpg",
  "/assets/generated/gallery-4.dim_800x600.jpg",
  "/assets/generated/gallery-5.dim_600x800.jpg",
  "/assets/generated/gallery-6.dim_800x500.jpg",
];

interface RawWebsiteCategory {
  _id?: string;
  name?: string;
  slug?: string;
  image?: string;
  description?: string;
  tags?: string[];
  order?: number;
  metaTitle?: string;
  metaDescription?: string;
}

interface RawWebsiteProduct {
  _id?: string;
  name?: string;
  slug?: string;
  image?: string;
  gallery?: string[];
  shortDescription?: string;
  description?: string;
  material?: string;
  frame?: string;
  cushions?: string;
  warranty?: string;
  tags?: string[];
  categoryId?: RawWebsiteCategory | string | null;
  order?: number;
  metaTitle?: string;
  metaDescription?: string;
}

interface RawWebsiteGalleryItem {
  _id?: string;
  image?: string;
  createdAt?: string;
}

interface RawWebsiteReview {
  _id?: string;
  name?: string;
  profilePic?: string;
  description?: string;
  createdAt?: string;
}

interface RawWebsiteSettings {
  enquiryEmail?: string;
  enquiryPhone?: string;
  address?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
}

interface WebsiteCategoriesResponse {
  categories?: RawWebsiteCategory[];
}

interface WebsiteProductsResponse {
  products?: RawWebsiteProduct[];
}

interface WebsiteProductResponse {
  product?: RawWebsiteProduct;
  relatedProducts?: RawWebsiteProduct[];
}

interface WebsiteGalleryResponse {
  gallery?: RawWebsiteGalleryItem[];
}

interface WebsiteReviewsResponse {
  reviews?: RawWebsiteReview[];
}

interface WebsiteSettingsResponse {
  setting?: RawWebsiteSettings;
}

export interface WebsiteCategorySummary {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface WebsiteCategory extends WebsiteCategorySummary {
  tags: string[];
  order: number;
  metaTitle: string;
  metaDescription: string;
}

export interface WebsiteProduct {
  id: string;
  name: string;
  slug: string;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  material: string;
  frame: string;
  cushions: string;
  warranty: string;
  tags: string[];
  category: WebsiteCategorySummary | null;
  order: number;
  metaTitle: string;
  metaDescription: string;
}

export interface WebsiteGalleryItem {
  id: string;
  image: string;
  alt: string;
  createdAt: string;
}

export interface WebsiteReview {
  id: string;
  name: string;
  profilePic: string;
  description: string;
  createdAt: string;
}

export interface WebsiteSettings {
  enquiryEmail: string;
  enquiryPhone: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
}

const EMPTY_WEBSITE_SETTINGS: WebsiteSettings = {
  enquiryEmail: "",
  enquiryPhone: "",
  address: "",
  facebookUrl: "",
  instagramUrl: "",
  twitterUrl: "",
  linkedinUrl: "",
};

function normalizeText(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function joinUrl(baseUrl: string, path: string) {
  return `${stripTrailingSlash(baseUrl)}/${path.replace(/^\/+/, "")}`;
}

function pickFallbackImage(images: string[], index: number) {
  return images[index % images.length];
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toStringArray(values: string[] | undefined) {
  return Array.isArray(values)
    ? values
        .map((value) => normalizeText(value))
        .filter((value) => value.length > 0)
    : [];
}

export function getDefaultWebsiteApiBaseUrl() {
  return DEFAULT_LOCAL_WEBSITE_API_BASE_URL;
}

export function resolveWebsiteApiBaseUrl(value?: string | null) {
  return stripTrailingSlash(
    normalizeText(value) || DEFAULT_LOCAL_WEBSITE_API_BASE_URL,
  );
}

export function resolveWebsiteAssetUrl(assetPath: string, baseUrl: string) {
  const normalizedAssetPath = normalizeText(assetPath);

  if (!normalizedAssetPath) {
    return "";
  }

  if (/^https?:\/\//i.test(normalizedAssetPath)) {
    return normalizedAssetPath;
  }

  try {
    if (typeof window !== "undefined") {
      const absoluteBaseUrl = new URL(baseUrl, window.location.origin);
      return new URL(normalizedAssetPath, absoluteBaseUrl).toString();
    }

    const serverBaseUrl = baseUrl.startsWith("http")
      ? baseUrl
      : DEFAULT_LOCAL_WEBSITE_API_BASE_URL;

    return new URL(normalizedAssetPath, serverBaseUrl).toString();
  } catch {
    return normalizedAssetPath;
  }
}

async function requestWebsiteApi<T>(path: string, init: RequestInit = {}) {
  const baseUrl = resolveWebsiteApiBaseUrl();
  const headers = new Headers(init.headers);

  headers.set("Accept", "application/json");

  const response = await fetch(joinUrl(baseUrl, path), {
    ...init,
    headers,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const responseData = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof responseData === "object" &&
      responseData !== null &&
      "message" in responseData &&
      typeof responseData.message === "string"
        ? responseData.message
        : response.statusText || "Request failed.";

    throw new Error(message);
  }

  return { data: responseData as T, baseUrl };
}

async function requestWebsiteOptional<T>(path: string, init: RequestInit = {}) {
  const baseUrl = resolveWebsiteApiBaseUrl();
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");

  const response = await fetch(joinUrl(baseUrl, path), {
    ...init,
    headers,
  });

  if (response.status === 404) {
    return null;
  }

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const responseData = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof responseData === "object" &&
      responseData !== null &&
      "message" in responseData &&
      typeof responseData.message === "string"
        ? responseData.message
        : response.statusText || "Request failed.";
    throw new Error(message);
  }

  return { data: responseData as T, baseUrl };
}

export interface HeroSectionContent {
  eyebrowText?: string;
  headlineLine1?: string;
  headlineAccent?: string;
  subheading?: string;
  caption?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  backgroundImageUrl?: string;
  highlightsCardTitle?: string;
  highlights?: { title?: string; subtitle?: string; imageUrl?: string }[];
  deskHeading?: string;
  deskPhone?: string;
  deskEmail?: string;
}

export interface WhyChooseSectionContent {
  overline?: string;
  heading?: string;
  description?: string;
  items?: { iconKey?: string; title?: string; description?: string }[];
}

export interface OurStorySectionContent {
  overline?: string;
  headingLine1?: string;
  headingAccent?: string;
  paragraphs?: string[];
  stats?: { value?: string; label?: string }[];
  imageUrl?: string;
}

interface WebsiteContentResponse {
  content?: { modelKey?: string; data?: Record<string, unknown> } | null;
}

export async function getWebsiteContentByKey(modelKey: string): Promise<
  Record<string, unknown> | null
> {
  const trimmed = normalizeText(modelKey);
  if (!trimmed) return null;

  const result = await requestWebsiteOptional<WebsiteContentResponse>(
    `/website/content/${encodeURIComponent(trimmed)}`,
  );

  const payload = result?.data?.content;
  if (!payload?.data || typeof payload.data !== "object") {
    return null;
  }

  return payload.data as Record<string, unknown>;
}

export function useWebsiteContent(modelKey: string) {
  const key = normalizeText(modelKey);

  return useQuery({
    queryKey: ["website", "content", key],
    queryFn: async () => (key ? getWebsiteContentByKey(key) : null),
    staleTime: 60 * 1000,
    enabled: key.length > 0,
  });
}

export interface SubmitWebsiteInquiryInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  source: "contact_page" | "custom_design";
  meta?: Record<string, unknown>;
}

export async function submitWebsiteInquiry(input: SubmitWebsiteInquiryInput) {
  const baseUrl = resolveWebsiteApiBaseUrl();
  const response = await fetch(joinUrl(baseUrl, "/website/inquiries"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : "Could not send your enquiry.";
    throw new Error(message);
  }

  return payload as { message?: string; inquiry?: { id?: string; createdAt?: string } };
}

export async function trackWebsitePageView(path?: string) {
  const baseUrl = resolveWebsiteApiBaseUrl();
  try {
    await fetch(joinUrl(baseUrl, "/website/analytics/track"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: path ? path.slice(0, 512) : "" }),
    });
  } catch {
    /* intentionally quiet — analytics must not break UX */
  }
}

function normalizeCategory(
  category: RawWebsiteCategory | null | undefined,
  baseUrl: string,
  index: number,
): WebsiteCategory {
  const name = normalizeText(category?.name) || `Collection ${index + 1}`;
  const slug = normalizeText(category?.slug) || toSlug(name);
  const description =
    normalizeText(category?.description) ||
    "Explore handcrafted seating designed for luxurious everyday living.";

  return {
    id: normalizeText(category?._id) || `category-${slug || index}`,
    name,
    slug,
    image:
      resolveWebsiteAssetUrl(normalizeText(category?.image), baseUrl) ||
      pickFallbackImage(FALLBACK_CATEGORY_IMAGES, index),
    description,
    tags: toStringArray(category?.tags),
    order: typeof category?.order === "number" ? category.order : index,
    metaTitle:
      normalizeText(category?.metaTitle) ||
      `${name} Collection | JPM Enterprises`,
    metaDescription: normalizeText(category?.metaDescription) || description,
  };
}

function normalizeCategorySummary(
  category: RawWebsiteCategory | string | null | undefined,
  baseUrl: string,
  index: number,
): WebsiteCategorySummary | null {
  if (!category || typeof category === "string") {
    return null;
  }

  const normalizedCategory = normalizeCategory(category, baseUrl, index);

  return {
    id: normalizedCategory.id,
    name: normalizedCategory.name,
    slug: normalizedCategory.slug,
    image: normalizedCategory.image,
    description: normalizedCategory.description,
  };
}

function normalizeProduct(
  product: RawWebsiteProduct | null | undefined,
  baseUrl: string,
  index: number,
): WebsiteProduct {
  const name = normalizeText(product?.name) || `Product ${index + 1}`;
  const slug = normalizeText(product?.slug) || toSlug(name);
  const gallery = toStringArray(product?.gallery)
    .map((image) => resolveWebsiteAssetUrl(image, baseUrl))
    .filter(Boolean);
  const image =
    resolveWebsiteAssetUrl(normalizeText(product?.image), baseUrl) ||
    gallery[0] ||
    pickFallbackImage(FALLBACK_PRODUCT_IMAGES, index);
  const shortDescription =
    normalizeText(product?.shortDescription) ||
    normalizeText(product?.description) ||
    "Refined proportions, premium comfort, and long-lasting craftsmanship.";
  const description = normalizeText(product?.description) || shortDescription;

  return {
    id: normalizeText(product?._id) || `product-${slug || index}`,
    name,
    slug,
    image,
    gallery: Array.from(new Set([image, ...gallery])),
    shortDescription,
    description,
    material: normalizeText(product?.material),
    frame: normalizeText(product?.frame),
    cushions: normalizeText(product?.cushions),
    warranty: normalizeText(product?.warranty),
    tags: toStringArray(product?.tags),
    category: normalizeCategorySummary(product?.categoryId, baseUrl, index),
    order: typeof product?.order === "number" ? product.order : index,
    metaTitle: normalizeText(product?.metaTitle) || `${name} | JPM Enterprises`,
    metaDescription:
      normalizeText(product?.metaDescription) || shortDescription,
  };
}

function normalizeGalleryItem(
  item: RawWebsiteGalleryItem | null | undefined,
  baseUrl: string,
  index: number,
): WebsiteGalleryItem {
  return {
    id: normalizeText(item?._id) || `gallery-${index + 1}`,
    image:
      resolveWebsiteAssetUrl(normalizeText(item?.image), baseUrl) ||
      pickFallbackImage(FALLBACK_GALLERY_IMAGES, index),
    alt: `JPM Enterprises gallery showcase ${index + 1}`,
    createdAt: normalizeText(item?.createdAt),
  };
}

function normalizeReview(
  review: RawWebsiteReview | null | undefined,
  baseUrl: string,
  index: number,
): WebsiteReview {
  return {
    id: normalizeText(review?._id) || `review-${index + 1}`,
    name: normalizeText(review?.name) || `Client ${index + 1}`,
    profilePic: resolveWebsiteAssetUrl(
      normalizeText(review?.profilePic),
      baseUrl,
    ),
    description:
      normalizeText(review?.description) ||
      "JPM delivered a beautifully crafted piece with impressive comfort and finish.",
    createdAt: normalizeText(review?.createdAt),
  };
}

function normalizeSettings(
  settings: RawWebsiteSettings | null | undefined,
): WebsiteSettings {
  return {
    enquiryEmail: normalizeText(settings?.enquiryEmail),
    enquiryPhone: normalizeText(settings?.enquiryPhone),
    address: normalizeText(settings?.address),
    facebookUrl: normalizeText(settings?.facebookUrl),
    instagramUrl: normalizeText(settings?.instagramUrl),
    twitterUrl: normalizeText(settings?.twitterUrl),
    linkedinUrl: normalizeText(settings?.linkedinUrl),
  };
}

export async function getWebsiteSettings() {
  const response =
    await requestWebsiteApi<WebsiteSettingsResponse>("/website/settings");

  return normalizeSettings(response.data.setting);
}

export async function getWebsiteCategories() {
  const response = await requestWebsiteApi<WebsiteCategoriesResponse>(
    "/website/categories",
  );

  return (response.data.categories ?? []).map((category, index) =>
    normalizeCategory(category, response.baseUrl, index),
  );
}

export async function getWebsiteProducts(filters?: {
  categorySlug?: string;
  categoryId?: string;
}) {
  const searchParams = new URLSearchParams();

  if (normalizeText(filters?.categorySlug)) {
    searchParams.set("categorySlug", normalizeText(filters?.categorySlug));
  }

  if (normalizeText(filters?.categoryId)) {
    searchParams.set("categoryId", normalizeText(filters?.categoryId));
  }

  const query = searchParams.toString();
  const response = await requestWebsiteApi<WebsiteProductsResponse>(
    `/website/products${query ? `?${query}` : ""}`,
  );

  return (response.data.products ?? []).map((product, index) =>
    normalizeProduct(product, response.baseUrl, index),
  );
}

export async function getWebsiteGallery() {
  const response =
    await requestWebsiteApi<WebsiteGalleryResponse>("/website/gallery");

  return (response.data.gallery ?? []).map((item, index) =>
    normalizeGalleryItem(item, response.baseUrl, index),
  );
}

export async function getWebsiteReviews() {
  const response =
    await requestWebsiteApi<WebsiteReviewsResponse>("/website/reviews");

  return (response.data.reviews ?? []).map((review, index) =>
    normalizeReview(review, response.baseUrl, index),
  );
}

export async function getWebsiteProductBySlug(slug: string) {
  const response = await requestWebsiteApi<WebsiteProductResponse>(
    `/website/products/${encodeURIComponent(slug)}`,
  );

  return {
    product: response.data.product
      ? normalizeProduct(response.data.product, response.baseUrl, 0)
      : null,
    relatedProducts: (response.data.relatedProducts ?? []).map(
      (product, index) =>
        normalizeProduct(product, response.baseUrl, index + 1),
    ),
  };
}

export function useWebsiteSettings() {
  return useQuery({
    queryKey: ["website", "settings"],
    queryFn: getWebsiteSettings,
    staleTime: 5 * 60 * 1000,
    placeholderData: EMPTY_WEBSITE_SETTINGS,
  });
}

export function useWebsiteCategories() {
  return useQuery({
    queryKey: ["website", "categories"],
    queryFn: getWebsiteCategories,
    staleTime: 60 * 1000,
  });
}

export function useWebsiteProducts(filters?: {
  categorySlug?: string;
  categoryId?: string;
}) {
  const categorySlug = normalizeText(filters?.categorySlug);
  const categoryId = normalizeText(filters?.categoryId);

  return useQuery({
    queryKey: ["website", "products", categorySlug, categoryId],
    queryFn: () => getWebsiteProducts({ categorySlug, categoryId }),
    staleTime: 60 * 1000,
  });
}

export function useWebsiteGallery() {
  return useQuery({
    queryKey: ["website", "gallery"],
    queryFn: getWebsiteGallery,
    staleTime: 60 * 1000,
  });
}

export function useWebsiteReviews() {
  return useQuery({
    queryKey: ["website", "reviews"],
    queryFn: getWebsiteReviews,
    staleTime: 60 * 1000,
  });
}

export function useWebsiteProduct(slug?: string) {
  const productSlug = normalizeText(slug);

  return useQuery({
    queryKey: ["website", "product", productSlug],
    queryFn: () => getWebsiteProductBySlug(productSlug),
    enabled: productSlug.length > 0,
    staleTime: 60 * 1000,
  });
}
