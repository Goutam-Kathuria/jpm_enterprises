import { Award, Gem, Heart, LucideIcon, PenTool, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useWebsiteContent, type WhyChooseSectionContent } from "../lib/websiteApi";

const ICON_MAP: Record<string, LucideIcon> = {
  gem: Gem,
  award: Award,
  pen: PenTool,
  heart: Heart,
  sparkles: Sparkles,
};

const DEFAULT_FEATURES: {
  iconKey: string;
  title: string;
  desc: string;
}[] = [
  {
    iconKey: "gem",
    title: "Premium Materials",
    desc: "We source only the finest fabrics, leathers, and structural materials from trusted suppliers worldwide.",
  },
  {
    iconKey: "award",
    title: "Expert Craftsmanship",
    desc: "Our artisans bring decades of experience to every seam, stitch, and joint in your furniture.",
  },
  {
    iconKey: "pen",
    title: "Custom Designs",
    desc: "No two homes are alike. We create fully bespoke pieces tailored to your exact specification.",
  },
  {
    iconKey: "heart",
    title: "Long Lasting Comfort",
    desc: "Engineered for durability with high-density foam and hardwood frames built to last decades.",
  },
  {
    iconKey: "sparkles",
    title: "Elegant Modern Styles",
    desc: "Timeless aesthetics that complement contemporary interiors with understated sophistication.",
  },
];

export function WhyChooseSection() {
  const { data: cmsData } = useWebsiteContent("why_choose_us");
  const headerRef = useScrollReveal();
  const gridRef = useRef<HTMLDivElement>(null);

  const content = cmsData as WhyChooseSectionContent | null | undefined;

  const overline =
    content?.overline?.trim() || "The JPM Difference";
  const heading =
    content?.heading?.trim() || "Why Choose JPM Enterprises";
  const description =
    content?.description?.trim() ||
    "Two decades of passionate craftsmanship have earned us the trust of homeowners, architects, and interior designers across India.";

  const itemsRaw = Array.isArray(content?.items) ? content?.items : null;
  const items = (itemsRaw && itemsRaw.length > 0
    ? itemsRaw.map((entry, index) => {
        const fallback = DEFAULT_FEATURES[index] ?? DEFAULT_FEATURES[0];
        return {
          iconKey: entry?.iconKey?.trim()?.toLowerCase() || fallback.iconKey,
          title: entry?.title?.trim() || fallback.title,
          desc: entry?.description?.trim() || fallback.desc,
        };
      })
    : DEFAULT_FEATURES
  ).slice(0, 12);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll(".feature-card");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        }
      },
      { threshold: 0.1 },
    );
    for (const card of cards) observer.observe(card);
    return () => observer.disconnect();
  }, [items]);

  return (
    <section id="why-us" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headerRef} className="reveal text-center mb-16">
          <p
            className="font-general text-sm font-semibold tracking-[0.25em] uppercase mb-3"
            style={{ color: "oklch(0.65 0.12 75)" }}
          >
            {overline}
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {heading}
          </h2>
          <p className="font-general text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((feature, i) => {
            const IconComponent = ICON_MAP[feature.iconKey] ?? Sparkles;
            return (
              <div
                key={`${feature.title}-${i}`}
                className="feature-card group bg-card p-8 rounded-sm cursor-default"
                style={{
                  opacity: 0,
                  transform: "translateY(30px)",
                  transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, box-shadow 0.3s ease`,
                  border: "1px solid oklch(0.87 0.02 80)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 40px oklch(0.65 0.12 75 / 0.18)";
                  e.currentTarget.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "oklch(0.65 0.12 75 / 0.15)" }}
                >
                  <span style={{ color: "oklch(0.55 0.14 65)" }}>
                    <IconComponent size={24} />
                  </span>
                </div>
                <h3 className="font-playfair text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-general text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
                <div
                  className="mt-5 h-px transition-all duration-300 group-hover:opacity-100 opacity-0"
                  style={{ background: "oklch(0.65 0.12 75)" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
