import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const scrollToCollection = () => {
    document
      .querySelector("#collection")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url('/assets/generated/hero-sofa.dim_1600x900.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20">
        <div className="max-w-3xl">
          <p
            className="hero-label font-general text-sm font-semibold tracking-[0.25em] uppercase mb-6"
            style={{ color: "oklch(0.65 0.12 75)" }}
          >
            Luxury Furniture Since 2005
          </p>

          <h1 className="hero-title font-playfair text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.05] text-white mb-6">
            Crafting Comfort.
            <br />
            <span className="italic">Designing Luxury.</span>
          </h1>

          <p className="hero-sub font-general text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
            Experience the finest in handcrafted sofas and custom furniture.
            Where elegance meets comfort, and every piece tells a story.
          </p>

          <div className="hero-cta flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#collection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="hero.primary_button"
              className="font-general px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-gold-lg hover:-translate-y-1"
              style={{
                background: "oklch(0.65 0.12 75)",
                color: "oklch(0.12 0.01 60)",
              }}
            >
              Explore Collection
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#custom-design")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="hero.secondary_button"
              className="font-general px-8 py-4 text-sm font-semibold tracking-wider uppercase border-2 border-white text-white transition-all duration-300 hover:bg-white hover:text-foreground hover:-translate-y-1"
            >
              Custom Sofa Design
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToCollection}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <span className="font-general text-xs tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown size={20} className="hero-scroll" />
      </button>
    </section>
  );
}
