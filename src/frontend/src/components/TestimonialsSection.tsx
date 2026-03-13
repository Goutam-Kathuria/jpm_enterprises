import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const testimonials = [
  {
    id: 1,
    text: "The craftsmanship is absolutely incredible. My living room has been completely transformed. Every guest who visits asks about the sofa — it's truly a statement piece.",
    name: "Sarah M.",
    role: "Interior Designer",
    initials: "SM",
    color: "oklch(0.65 0.12 75)",
  },
  {
    id: 2,
    text: "JPM delivered exactly what I envisioned. The leather sofa is beyond expectations — the quality of the grain, the stitching, the feel. It's museum-quality furniture.",
    name: "Rajiv P.",
    role: "Homeowner",
    initials: "RP",
    color: "oklch(0.55 0.1 200)",
  },
  {
    id: 3,
    text: "From custom design to delivery, the process was seamless and the quality is truly unmatched. As an architect I have high standards — JPM exceeded every one of them.",
    name: "Priya K.",
    role: "Architect",
    initials: "PK",
    color: "oklch(0.55 0.08 150)",
  },
  {
    id: 4,
    text: "I've furnished three apartments with JPM. Their consistency and quality is remarkable. Every piece is as perfect as the last. They have a client for life in me.",
    name: "Ahmed S.",
    role: "Property Developer",
    initials: "AS",
    color: "oklch(0.5 0.12 45)",
  },
  {
    id: 5,
    text: "The recliner I ordered is the most comfortable piece of furniture I've ever owned. The mechanism is whisper-quiet and the fabric is incredibly luxurious. Worth every rupee.",
    name: "Linda T.",
    role: "Homeowner",
    initials: "LT",
    color: "oklch(0.55 0.1 330)",
  },
];

export function TestimonialsSection() {
  const headerRef = useScrollReveal();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % testimonials.length),
    [],
  );
  const prev = useCallback(
    () =>
      setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length),
    [],
  );

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(next, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, next]);

  return (
    <section id="testimonials" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headerRef} className="reveal text-center mb-16">
          <p
            className="font-general text-sm font-semibold tracking-[0.25em] uppercase mb-3"
            style={{ color: "oklch(0.65 0.12 75)" }}
          >
            Client Stories
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground">
            What Our Clients Say
          </h2>
        </div>

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="absolute -top-6 left-0 opacity-20"
            style={{ color: "oklch(0.65 0.12 75)" }}
          >
            <Quote size={64} fill="oklch(0.65 0.12 75)" />
          </div>

          <div
            className="bg-card rounded-sm p-10 shadow-luxury text-center"
            style={{ border: "1px solid oklch(0.87 0.02 80)" }}
          >
            <p className="font-playfair text-xl lg:text-2xl italic text-foreground leading-relaxed mb-8">
              "{testimonials[current].text}"
            </p>

            <div className="flex flex-col items-center gap-3">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-general font-bold text-lg"
                style={{ background: testimonials[current].color }}
              >
                {testimonials[current].initials}
              </div>
              <div>
                <p className="font-playfair font-semibold text-foreground">
                  {testimonials[current].name}
                </p>
                <p className="font-general text-sm text-muted-foreground">
                  {testimonials[current].role}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              type="button"
              data-ocid="testimonials.prev_button"
              onClick={prev}
              className="p-3 rounded-full border transition-all duration-200"
              style={{ borderColor: "oklch(0.87 0.02 80)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.65 0.12 75)";
                e.currentTarget.style.color = "oklch(0.65 0.12 75)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.87 0.02 80)";
                e.currentTarget.style.color = "";
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  data-ocid={`testimonials.dot.${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    background:
                      i === current
                        ? "oklch(0.65 0.12 75)"
                        : "oklch(0.87 0.02 80)",
                    width: i === current ? "24px" : "8px",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              data-ocid="testimonials.next_button"
              onClick={next}
              className="p-3 rounded-full border transition-all duration-200"
              style={{ borderColor: "oklch(0.87 0.02 80)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.65 0.12 75)";
                e.currentTarget.style.color = "oklch(0.65 0.12 75)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.87 0.02 80)";
                e.currentTarget.style.color = "";
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
