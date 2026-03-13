import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "15+", label: "Years Experience" },
  { value: "1000+", label: "Sofas Crafted" },
];

export function AboutSection() {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div ref={leftRef} className="reveal">
            <p
              className="font-general text-sm font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "oklch(0.65 0.12 75)" }}
            >
              Our Story
            </p>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Craftsmanship at the
              <br />
              <span className="italic">Heart of Everything</span>
            </h2>
            <p className="font-general text-secondary-foreground leading-relaxed mb-5">
              Founded in 2005 in Mumbai, JPM Enterprises began as a small
              workshop with a single vision: to create furniture that stands the
              test of time. Today, we are one of India's most trusted names in
              luxury sofa design and manufacturing.
            </p>
            <p className="font-general text-secondary-foreground leading-relaxed mb-5">
              Every JPM piece is born from a deep respect for traditional
              craftsmanship, enriched with contemporary design sensibility. Our
              master craftsmen hand-select materials, hand-stitch upholstery,
              and hand-finish every detail — because we believe furniture should
              be as beautiful to make as it is to own.
            </p>
            <p className="font-general text-secondary-foreground leading-relaxed mb-10">
              We don't just build sofas. We build heirlooms — pieces that become
              the anchor of your living space, companions for years of memories.
            </p>

            {/* Stats */}
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

          {/* Image */}
          <div ref={rightRef} className="reveal">
            <div className="relative">
              <img
                src="/assets/generated/about-craftsmanship.dim_800x600.jpg"
                alt="JPM Enterprises craftsmanship"
                loading="lazy"
                className="w-full h-auto object-cover rounded-sm"
                style={{
                  boxShadow: "0 20px 60px oklch(0.12 0.01 60 / 0.15)",
                }}
              />
              {/* Gold border accent */}
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
