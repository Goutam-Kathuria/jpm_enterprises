import { Award, Gem, Heart, PenTool, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const features = [
  {
    icon: <Gem size={24} />,
    title: "Premium Materials",
    desc: "We source only the finest fabrics, leathers, and structural materials from trusted suppliers worldwide.",
  },
  {
    icon: <Award size={24} />,
    title: "Expert Craftsmanship",
    desc: "Our artisans bring decades of experience to every seam, stitch, and joint in your furniture.",
  },
  {
    icon: <PenTool size={24} />,
    title: "Custom Designs",
    desc: "No two homes are alike. We create fully bespoke pieces tailored to your exact specification.",
  },
  {
    icon: <Heart size={24} />,
    title: "Long Lasting Comfort",
    desc: "Engineered for durability with high-density foam and hardwood frames built to last decades.",
  },
  {
    icon: <Sparkles size={24} />,
    title: "Elegant Modern Styles",
    desc: "Timeless aesthetics that complement contemporary interiors with understated sophistication.",
  },
];

export function WhyChooseSection() {
  const headerRef = useScrollReveal();
  const gridRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <section id="why-us" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headerRef} className="reveal text-center mb-16">
          <p
            className="font-general text-sm font-semibold tracking-[0.25em] uppercase mb-3"
            style={{ color: "oklch(0.65 0.12 75)" }}
          >
            The JPM Difference
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Choose JPM Enterprises
          </h2>
          <p className="font-general text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Two decades of passionate craftsmanship have earned us the trust of
            homeowners, architects, and interior designers across India.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <div
              key={feature.title}
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
                  {feature.icon}
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
          ))}
        </div>
      </div>
    </section>
  );
}
