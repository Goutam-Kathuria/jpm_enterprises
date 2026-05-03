import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  resolveWebsiteApiBaseUrl,
  resolveWebsiteAssetUrl,
  useWebsiteContent,
  type OurStorySectionContent,
} from "../lib/websiteApi";

const DEFAULT_STATS = [
  { value: "500+", label: "Happy Clients" },
  { value: "15+", label: "Years Experience" },
  { value: "1000+", label: "Sofas Crafted" },
];

const DEFAULT_PARAGRAPHS = [
  "Founded in 2005 in Hisar, JPM Enterprises began as a small workshop with a single vision: to create furniture that stands the test of time. Today, we are one of India's most trusted names in luxury sofa design and manufacturing.",
  "Every JPM piece is born from a deep respect for traditional craftsmanship, enriched with contemporary design sensibility. Our master craftsmen hand-select materials, hand-stitch upholstery, and hand-finish every detail — because we believe furniture should be as beautiful to make as it is to own.",
  "We don't just build sofas. We build heirlooms — pieces that become the anchor of your living space, companions for years of memories.",
];

export function AboutSection() {
  const { data: cmsData } = useWebsiteContent("our_story");
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  const content = cmsData as OurStorySectionContent | null | undefined;
  const baseUrl = resolveWebsiteApiBaseUrl();

  const overline = content?.overline?.trim() || "Our Story";
  const headingLine1 = content?.headingLine1?.trim() || "Craftsmanship at the";
  const headingAccent =
    content?.headingAccent?.trim() || "Heart of Everything";

  const paragraphs = (() => {
    const raw = Array.isArray(content?.paragraphs) ? content.paragraphs : null;
    if (raw?.length) {
      return raw.map((p) => String(p).trim()).filter(Boolean);
    }
    return DEFAULT_PARAGRAPHS;
  })();

  const stats = (() => {
    const raw = Array.isArray(content?.stats) ? content.stats : null;
    if (raw?.length) {
      return raw
        .map((s, index) => {
          const fb = DEFAULT_STATS[index] ?? { value: "", label: "" };
          return {
            value: s?.value?.trim() || fb.value,
            label: s?.label?.trim() || fb.label,
          };
        })
        .filter((s) => s.value || s.label);
    }
    return DEFAULT_STATS;
  })();

  const defaultImagePath = "/assets/generated/about-craftsmanship.dim_800x600.jpg";
  const imagePath = content?.imageUrl?.trim() || defaultImagePath;
  const imageSrc = resolveWebsiteAssetUrl(imagePath, baseUrl) || imagePath;

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={leftRef} className="reveal">
            <p
              className="font-general text-sm font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "oklch(0.65 0.12 75)" }}
            >
              {overline}
            </p>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {headingLine1}
              <br />
              <span className="italic">{headingAccent}</span>
            </h2>
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`font-general text-secondary-foreground leading-relaxed ${
                  index === paragraphs.length - 1 ? "mb-10" : "mb-5"
                }`}
              >
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="font-playfair text-4xl font-bold"
                    style={{ color: "oklch(0.65 0.12 75)" }}
                  >
                    {stat.value}
                  </span>
                  <span className="font-general text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div ref={rightRef} className="reveal">
            <div className="relative">
              <img
                src={imageSrc}
                alt="JPM Enterprises craftsmanship"
                loading="lazy"
                className="w-full h-auto object-cover rounded-sm"
                style={{
                  boxShadow: "0 20px 60px oklch(0.12 0.01 60 / 0.15)",
                }}
              />
              <div
                className="absolute -bottom-4 -right-4 w-full h-full rounded-sm"
                style={{
                  border: "2px solid oklch(0.65 0.12 75)",
                  zIndex: -1,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
