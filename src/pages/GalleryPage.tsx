import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SeoHead } from "../components/SeoHead";
import { buildBreadcrumbSchema, buildWebPageSchema } from "../lib/seo";
import { useWebsiteGallery } from "../lib/websiteApi";

export function GalleryPage() {
  const { data: gallery = [], isLoading, error } = useWebsiteGallery();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () =>
      setLightboxIndex((current) =>
        current !== null && gallery.length > 0
          ? (current - 1 + gallery.length) % gallery.length
          : null,
      ),
    [gallery.length],
  );
  const nextImage = useCallback(
    () =>
      setLightboxIndex((current) =>
        current !== null && gallery.length > 0
          ? (current + 1) % gallery.length
          : null,
      ),
    [gallery.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") prevImage();
      if (event.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeLightbox, lightboxIndex, nextImage, prevImage]);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Full Furniture Gallery"
        description="Explore the complete JPM Enterprises gallery of handcrafted sofas, interiors, and finished furniture installations."
        path="/gallery"
        keywords={[
          "furniture gallery",
          "sofa gallery",
          "interior furniture inspiration",
          "luxury sofa images",
        ]}
        structuredData={[
          buildWebPageSchema({
            title: "Full Furniture Gallery",
            description:
              "Explore the complete JPM Enterprises gallery of handcrafted sofas, interiors, and finished furniture installations.",
            path: "/gallery",
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ]),
        ]}
      />
      <Navbar />
      <main
        className="pb-24 pt-28"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.985 0.008 85), oklch(0.965 0.012 82))",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <section className="rounded-[36px] bg-white px-8 py-12 shadow-[0_20px_48px_oklch(0.12_0.01_60_/_0.06)]">
            <p
              className="font-general text-sm font-semibold uppercase tracking-[0.28em]"
              style={{ color: "oklch(0.65 0.12 75)" }}
            >
              Gallery
            </p>
            <h1 className="mt-4 max-w-4xl font-playfair text-4xl font-bold text-foreground lg:text-6xl">
              A closer look at our work in finished spaces
            </h1>
            <p className="mt-5 max-w-3xl font-general text-base leading-relaxed text-muted-foreground">
              Browse the complete visual gallery for a broader view of materials,
              detailing, and how each piece lives within real interiors.
            </p>
          </section>

          {error && !isLoading ? (
            <section
              className="mt-10 rounded-[32px] bg-white px-8 py-16 text-center"
              style={{ border: "1px solid oklch(0.9 0.015 82)" }}
            >
              <h2 className="font-playfair text-3xl font-semibold text-foreground">
                The gallery could not be loaded right now
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-general text-sm leading-relaxed text-muted-foreground">
                Please try again shortly. If the issue continues, confirm the
                gallery service is available.
              </p>
            </section>
          ) : null}

          {!error ? (
            isLoading ? (
              <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[280px]">
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={`gallery-page-skeleton-${index + 1}`}
                    className="aspect-[4/3] animate-pulse rounded-[28px] bg-[oklch(0.9_0.015_82)]"
                  />
                ))}
              </section>
            ) : gallery.length > 0 ? (
              <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[280px]">
                {gallery.map((item, index) => {
                  const tallCard = index % 5 === 0 || index % 5 === 3;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`group relative overflow-hidden rounded-[28px] ${
                        tallCard ? "lg:row-span-2" : ""
                      }`}
                      onClick={() => setLightboxIndex(index)}
                      style={{ minHeight: "280px" }}
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading={index < 4 ? "eager" : "lazy"}
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(12,12,10,0.54))]" />
                    </button>
                  );
                })}
              </section>
            ) : (
              <section
                className="mt-10 rounded-[32px] bg-white px-8 py-16 text-center"
                style={{ border: "1px solid oklch(0.9 0.015 82)" }}
              >
                <h2 className="font-playfair text-3xl font-semibold text-foreground">
                  A curated gallery will appear here soon
                </h2>
                <p className="mx-auto mt-4 max-w-2xl font-general text-sm leading-relaxed text-muted-foreground">
                  We&apos;re preparing visual showcases of recent work,
                  materials, and finished spaces. Please check back shortly for
                  the full gallery experience.
                </p>
              </section>
            )
          ) : null}
        </div>
      </main>
      <Footer />

      {lightboxIndex !== null && gallery[lightboxIndex] ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92">
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-5 top-5 rounded-full p-3 text-white transition-colors hover:bg-white/10"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            onClick={prevImage}
            className="absolute left-5 rounded-full p-3 text-white transition-colors hover:bg-white/10"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>

          <img
            src={gallery[lightboxIndex].image}
            alt={gallery[lightboxIndex].alt}
            decoding="async"
            className="max-h-[86vh] max-w-[86vw] rounded-[28px] object-contain shadow-2xl"
          />

          <button
            type="button"
            onClick={nextImage}
            className="absolute right-5 rounded-full p-3 text-white transition-colors hover:bg-white/10"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
