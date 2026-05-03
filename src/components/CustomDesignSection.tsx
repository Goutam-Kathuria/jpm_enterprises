import { useNavigate } from "@tanstack/react-router";
import { Home, Layers, Maximize2, Palette, Ruler, Square } from "lucide-react";
import { useEffect, useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    icon: <Palette size={22} />,
    title: "Choose Design",
    desc: "Browse our curated catalogue or share your vision with our designers.",
  },
  {
    number: "02",
    icon: <Layers size={22} />,
    title: "Select Material",
    desc: "Choose from premium leathers, linens, velvets, and more.",
  },
  {
    number: "03",
    icon: <Ruler size={22} />,
    title: "Customize Size",
    desc: "We build to your exact dimensions — no compromise, no off-the-shelf.",
  },
  {
    number: "04",
    icon: <Home size={22} />,
    title: "Get It Built",
    desc: "Our craftsmen bring your vision to life and deliver to your door.",
  },
];

const options = [
  { label: "Size", icon: <Maximize2 size={16} /> },
  { label: "Fabric", icon: <Layers size={16} /> },
  { label: "Color", icon: <Square size={16} /> },
  { label: "Style", icon: <Palette size={16} /> },
];

export function CustomDesignSection() {
  const leftRef = useScrollReveal();
  const stepsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = stepsRef.current;
    if (!container) return;
    const items = container.querySelectorAll(".step-item");
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
    for (const item of items) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="custom-design" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={leftRef} className="reveal">
            <p
              className="font-general text-sm font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "oklch(0.65 0.12 75)" }}
            >
              Bespoke Creations
            </p>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Design Your
              <br />
              <span className="italic">Perfect Sofa</span>
            </h2>
            <p className="font-general text-secondary-foreground leading-relaxed mb-8">
              Every home is unique, and so is every JPM sofa. We offer complete
              customization from the frame to the final stitch — crafted to your
              exact vision, your space, and your lifestyle.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {options.map((opt) => (
                <span
                  key={opt.label}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-general font-medium border rounded-full"
                  style={{
                    borderColor: "oklch(0.65 0.12 75)",
                    color: "oklch(0.55 0.14 65)",
                    background: "oklch(0.65 0.12 75 / 0.08)",
                  }}
                >
                  {opt.icon}
                  {opt.label}
                </span>
              ))}
            </div>

            <button
              type="button"
              data-ocid="custom.start_button"
              onClick={() => navigate({ to: "/custom-design" })}
              className="font-general px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "oklch(0.65 0.12 75)",
                color: "oklch(0.12 0.01 60)",
                boxShadow: "0 4px 20px oklch(0.65 0.12 75 / 0.3)",
              }}
            >
              Start Your Design
            </button>
          </div>

          <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="step-item bg-card p-6 rounded-sm"
                style={{
                  opacity: 0,
                  transform: "translateY(30px)",
                  transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
                  border: "1px solid oklch(0.87 0.02 80)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.65 0.12 75)" }}
                  >
                    <span style={{ color: "oklch(0.12 0.01 60)" }}>
                      {step.icon}
                    </span>
                  </span>
                  <span
                    className="font-playfair text-2xl font-bold"
                    style={{ color: "oklch(0.65 0.12 75 / 0.3)" }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="font-playfair text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="font-general text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
