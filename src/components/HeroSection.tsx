import { ArrowUpRight, ChevronDown } from "lucide-react";
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
  const primaryCtaLabel = normalizeText(content?.primaryCtaLabel) || "Explore Collections";
  const secondaryCtaLabel = normalizeText(content?.secondaryCtaLabel) || "Start Custom Design";

  const defaultBgPath = "/assets/generated/hero-sofa.dim_1600x900.jpg";
  const backgroundPath = normalizeText(content?.backgroundImageUrl) || defaultBgPath;
  const backgroundImageCss = /^https?:\/\//i.test(backgroundPath)
    ? backgroundPath
    : resolveWebsiteAssetUrl(backgroundPath, baseUrl) || backgroundPath;

  const highlightedCollections = categories.slice(0, 3);
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
  const phoneHref = getPhoneHref(deskPhone);

  const scrollToCollection = () => {
    document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[720px] items-center overflow-hidden py-20 sm:min-h-[780px] lg:min-h-[90vh]"
      style={{
        backgroundImage: `url('${backgroundImageCss}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-8 lg:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow text */}
          <p className="hero-label font-general text-xs font-semibold uppercase tracking-[0.3em] text-accent sm:text-sm">
            {eyebrowText}
          </p>

          {/* Hero title */}
          <h1 className="hero-title font-playfair text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl">
            {headlineLine1}
            <br />
            <span className="italic text-accent">
              {headlineAccent}
            </span>
          </h1>

          {/* Subheading */}
          <p className="hero-sub max-w-2xl font-general text-base leading-[1.7] text-white/90 sm:text-lg">
            {subheading}
          </p>

          {/* CTA buttons - using CSS variables */}
          <div className="hero-cta flex flex-wrap gap-4 pt-2">
            <button
              type="button"
              onClick={scrollToCollection}
              data-ocid="hero.primary_button"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-general text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground shadow-lg transition-all duration-300 hover:brightness-110"
            >
              {primaryCtaLabel}
              <ArrowUpRight size={16} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#custom-design")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="hero.secondary_button"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 font-general text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20"
            >
              {secondaryCtaLabel}
            </button>
          </div>

          {/* Phone contact */}
          {deskPhone ? (
            <a
              href={phoneHref || undefined}
              className="inline-flex pt-3 font-general text-sm font-semibold text-accent transition-colors hover:brightness-110"
            >
              Design desk: {deskPhone}
            </a>
          ) : null}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollToCollection}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
        aria-label="Scroll down"
      >
        <span className="font-general text-xs uppercase tracking-[0.28em]">Scroll</span>
        <ChevronDown size={20} className="hero-scroll" strokeWidth={2} />
      </button>
    </section>
  );
}
