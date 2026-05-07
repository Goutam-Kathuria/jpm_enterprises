import { ArrowUpRight, ChevronDown, Mail, Phone } from "lucide-react";
import {
  resolveWebsiteApiBaseUrl,
  resolveWebsiteAssetUrl,
  useWebsiteCategories,
  useWebsiteContent,
  useWebsiteSettings,
  type HeroSectionContent,
} from "../lib/websiteApi";

function getPhoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

function normalizeText(value: string | undefined) {
  return value?.trim() ?? "";
}

const FALLBACK_HIGHLIGHT_LABEL = "Curated collection";

export function HeroSection() {
  const { data: categories = [], isSuccess: categoriesReady } = useWebsiteCategories();
  const { data: settings } = useWebsiteSettings();
  const { data: cmsData } = useWebsiteContent("hero");

  const content = cmsData as HeroSectionContent | null | undefined;
  const baseUrl = resolveWebsiteApiBaseUrl();

  const eyebrowText =
    normalizeText(content?.eyebrowText) || "Handcrafted luxury furniture from Hisar";
  const headlineLine1 = normalizeText(content?.headlineLine1) || "Crafted for";
  const headlineAccent =
    normalizeText(content?.headlineAccent) || "beautiful living.";
  const subheading =
    normalizeText(content?.subheading) ||
    "Discover collection-led sofa experiences, tailored comfort, and a custom design journey built around your home, your taste, and your dimensions.";
  const caption =
    normalizeText(content?.caption) ||
    "Every furniture piece is designed for lasting comfort, rich textures, and a polished finish that brings out the best in modern living.";
  const primaryCtaLabel = normalizeText(content?.primaryCtaLabel) || "Explore Collections";
  const secondaryCtaLabel = normalizeText(content?.secondaryCtaLabel) || "Start Custom Design";
  const highlightsCardTitle =
    normalizeText(content?.highlightsCardTitle) || "Collection Highlights";
  const deskHeading = normalizeText(content?.deskHeading) || "Speak with the design desk";

  const defaultBgPath = "/assets/generated/hero-sofa.dim_1600x900.jpg";
  const backgroundPath = normalizeText(content?.backgroundImageUrl) || defaultBgPath;
  const backgroundImageCss = /^https?:\/\//i.test(backgroundPath)
    ? backgroundPath
    : resolveWebsiteAssetUrl(backgroundPath, baseUrl) || backgroundPath;

  const highlightedCollections = categories.slice(0, 8);
  const cmsHighlights = Array.isArray(content?.highlights)
    ? content?.highlights
    : [];

  const highlightRows = (() => {
    if (!cmsHighlights.length && categoriesReady) {
      return highlightedCollections.map((collection) => ({
        title: collection.name,
        subtitle: FALLBACK_HIGHLIGHT_LABEL,
        image: collection.image,
      }));
    }

    return cmsHighlights.map((entry, index) => {
      const fallback = highlightedCollections[index];
      const explicitImage = normalizeText(entry?.imageUrl);

      const imageUrl =
        (explicitImage
          ? resolveWebsiteAssetUrl(explicitImage, baseUrl) || explicitImage
          : "") ||
        fallback?.image ||
        "";

      return {
        title: normalizeText(entry?.title) || fallback?.name || `Highlight ${index + 1}`,
        subtitle: normalizeText(entry?.subtitle) || FALLBACK_HIGHLIGHT_LABEL,
        image: imageUrl,
      };
    });
  })();

  const deskPhone =
    normalizeText(content?.deskPhone) || normalizeText(settings?.enquiryPhone);
  const deskEmail =
    normalizeText(content?.deskEmail) || normalizeText(settings?.enquiryEmail);

  const phoneHref = getPhoneHref(deskPhone);

  const scrollToCollection = () => {
    document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImageCss}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(12,12,10,0.85)_8%,rgba(18,16,14,0.62)_50%,rgba(18,16,14,0.35)_100%)]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 75% 30%, oklch(0.7 0.12 80 / 0.24), transparent 32%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="max-w-3xl">
          <p
            className="hero-label mb-6 font-general text-sm font-semibold uppercase tracking-[0.32em]"
            style={{ color: "oklch(0.78 0.12 82)" }}
          >
            {eyebrowText}
          </p>

          <h1 className="hero-title font-playfair text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-8xl">
            {headlineLine1}
            <br />
            <span className="italic text-[oklch(0.85_0.09_84)]">{headlineAccent}</span>
          </h1>

          <p className="hero-sub mt-6 max-w-2xl font-general text-lg leading-relaxed text-white/80 sm:text-xl">
            {subheading}
          </p>

          <div className="hero-cta mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={scrollToCollection}
              data-ocid="hero.primary_button"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-general text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.67 0.12 76), oklch(0.78 0.11 82))",
                color: "oklch(0.12 0.01 60)",
                boxShadow: "0 20px 35px oklch(0.65 0.12 75 / 0.28)",
              }}
            >
              {primaryCtaLabel}
              <ArrowUpRight size={16} />
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#custom-design")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="hero.secondary_button"
              className="rounded-full border px-8 py-4 font-general text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "oklch(1 0 0 / 0.28)",
                background: "oklch(1 0 0 / 0.08)",
              }}
            >
              {secondaryCtaLabel}
            </button>
          </div>

          <div className="mt-10 max-w-2xl text-sm font-general leading-relaxed text-white/75">
            <p>{caption}</p>
          </div>
        </div>

        <div className="hidden self-end lg:block">
          <div
            className="ml-auto max-w-md rounded-[32px] p-7 text-white shadow-[0_28px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(180deg, oklch(1 0 0 / 0.16), oklch(0.12 0.01 60 / 0.3))",
              border: "1px solid oklch(1 0 0 / 0.14)",
            }}
          >
            <p
              className="font-general text-xs font-semibold uppercase tracking-[0.28em]"
              style={{ color: "oklch(0.82 0.11 82)" }}
            >
              {highlightsCardTitle}
            </p>
            <div className="mt-6 space-y-4">
              {highlightRows.length > 0 ? (
                highlightRows.map((row, index) => (
                  <div
                    key={`${row.title}-${index}`}
                    className="flex items-center gap-4 rounded-[22px] px-4 py-3"
                    style={{
                      background:
                        index === 0
                          ? "oklch(1 0 0 / 0.12)"
                          : "oklch(1 0 0 / 0.06)",
                    }}
                  >
                    {row.image ? (
                      <img
                        src={row.image}
                        alt={row.title}
                        loading="lazy"
                        decoding="async"
                        className="h-14 w-16 rounded-2xl object-cover"
                      />
                    ) : (
                      <div
                        className="h-14 w-16 shrink-0 rounded-2xl"
                        style={{ background: "oklch(1 0 0 / 0.12)" }}
                        aria-hidden
                      />
                    )}
                    <div>
                      <p className="font-playfair text-lg font-semibold">{row.title}</p>
                      <p className="font-general text-xs uppercase tracking-[0.16em] text-white/60">
                        {row.subtitle}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="rounded-[22px] px-4 py-5"
                  style={{ background: "oklch(1 0 0 / 0.08)" }}
                >
                  <p className="font-general text-sm leading-relaxed text-white/70">
                    Collection-led design previews will appear here as soon as the website
                    collections load.
                  </p>
                </div>
              )}
            </div>

            {deskPhone || deskEmail ? (
              <div
                className="mt-6 rounded-[24px] px-5 py-4"
                style={{
                  background: "oklch(1 0 0 / 0.08)",
                  border: "1px solid oklch(0.65 0.12 75 / 0.18)",
                }}
              >
                <p className="mb-3 font-playfair text-xl font-semibold">{deskHeading}</p>
                <div className="space-y-3 font-general text-sm text-white/78">
                  {deskPhone ? (
                    <a href={phoneHref || undefined} className="flex items-center gap-3">
                      <Phone size={15} style={{ color: "oklch(0.82 0.11 82)" }} />
                      {deskPhone}
                    </a>
                  ) : null}
                  {deskEmail ? (
                    <a href={`mailto:${deskEmail}`} className="flex items-center gap-3">
                      <Mail size={15} style={{ color: "oklch(0.82 0.11 82)" }} />
                      {deskEmail}
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToCollection}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition-colors hover:text-white"
        aria-label="Scroll down"
      >
        <span className="font-general text-xs uppercase tracking-[0.26em]">Scroll</span>
        <ChevronDown size={20} className="hero-scroll" />
      </button>
    </section>
  );
}
