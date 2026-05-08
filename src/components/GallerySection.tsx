import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useWebsiteGallery } from "../lib/websiteApi";

function GalleryLoadingCard({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={`mb-4 w-full overflow-hidden rounded-[28px] ${
        tall ? "aspect-[4/5]" : "aspect-[4/3]"
      } animate-pulse bg-[oklch(0.9_0.015_82)]`}
    />
  );
}

export function GallerySection() {
  const headerRef = useScrollReveal();
  const { data: gallery = [], isLoading, error } = useWebsiteGallery();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const visibleGallery = gallery.slice(0, 10);
  const showFullGalleryButton = gallery.length > 10;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () =>
      setLightboxIndex((current) =>
        current !== null && visibleGallery.length > 0
          ? (current - 1 + visibleGallery.length) % visibleGallery.length
          : null,
      ),
    [visibleGallery.length],
  );
  const nextImage = useCallback(
    () =>
      setLightboxIndex((current) =>
        current !== null && visibleGallery.length > 0
          ? (current + 1) % visibleGallery.length
          : null,
      ),
    [visibleGallery.length],
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

  useEffect(() => {
    if (lightboxIndex !== null && lightboxIndex >= visibleGallery.length) {
      setLightboxIndex(null);
    }
  }, [lightboxIndex, visibleGallery.length]);

  return (
    <section id="gallery" className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div ref={headerRef} className="reveal">
            <p
              className="mb-3 font-general text-sm font-semibold uppercase tracking-[0.25em]"
              style={{ color: "oklch(0.65 0.12 75)" }}
            >
              Gallery
            </p>
            <h2 className="font-playfair text-4xl font-bold text-foreground lg:text-5xl">
              Our Work in Beautiful Spaces
            </h2>
          </div>
          <div>
            <p className="font-general text-base leading-relaxed text-muted-foreground">
              Explore how JPM furniture transforms living spaces into refined
              sanctuaries.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span
                className="rounded-full px-4 py-2 font-general text-xs font-semibold uppercase tracking-[0.18em]"
                style={{
                  background: "oklch(0.65 0.12 75 / 0.08)",
                  color: "oklch(0.55 0.14 65)",
                }}
              >
                {gallery.length} live gallery items
              </span>
            </div>
          </div>
        </div>

        {error && !isLoading ? (
          <div
            className="rounded-[28px] bg-white p-8 text-center"
            style={{ border: "1px solid oklch(0.9 0.015 82)" }}
          >
            <p className="font-playfair text-2xl font-semibold text-foreground">
              Gallery images couldn&apos;t be loaded
            </p>
            <p className="mt-3 font-general text-sm text-muted-foreground">
              The section is wired to `/website/gallery`. Please check the API
              availability if you&apos;re not seeing images here.
            </p>
          </div>
        ) : null}

        {!error ? (
          isLoading ? (
            <div className="columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3">
              <GalleryLoadingCard tall />
              <GalleryLoadingCard />
              <GalleryLoadingCard tall />
              <GalleryLoadingCard />
              <GalleryLoadingCard tall />
              <GalleryLoadingCard />
            </div>
          ) : gallery.length > 0 ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[280px]">
                {visibleGallery.map((item, index) => {
                const tallCard = index === 0 || index === 2;

                return (
                  <button
                    key={item.id}
                    type="button"
                    data-ocid={`gallery.item.${item.id}`}
                    className={`group relative overflow-hidden rounded-[28px] ${
                      tallCard ? "lg:row-span-2" : ""
                    }`}
                    onClick={() => setLightboxIndex(index)}
                    style={{ minHeight: "280px" }}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(12,12,10,0.54))]" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-full"
                        style={{ background: "oklch(1 0 0 / 0.16)" }}
                      >
                        <ZoomIn size={28} className="text-white" />
                      </div>
                    </div>
                  </button>
                );
              })}
              </div>

              {showFullGalleryButton ? (
                <div className="mt-10 flex justify-center">
                  <Link
                    to="/gallery"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-general text-xs font-semibold uppercase tracking-[0.18em]"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.66 0.12 75), oklch(0.76 0.11 82))",
                      color: "oklch(0.12 0.01 60)",
                      boxShadow: "0 18px 32px oklch(0.65 0.12 75 / 0.18)",
                    }}
                  >
                    View Full Gallery
                  </Link>
                </div>
              ) : null}
            </>
          ) : (
            <div
              className="rounded-[28px] bg-white p-10 text-center"
              style={{ border: "1px solid oklch(0.9 0.015 82)" }}
            >
              <p className="font-playfair text-2xl font-semibold text-foreground">
                A curated gallery will appear here soon
              </p>
              <p className="mt-3 font-general text-sm text-muted-foreground">
                We&apos;re preparing visual showcases of recent work,
                materials, and finished spaces. Please check back shortly for
                the full gallery experience.
              </p>
            </div>
          )
        ) : null}
      </div>

      {lightboxIndex !== null && visibleGallery[lightboxIndex] ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92">
          <button
            type="button"
            data-ocid="lightbox.close_button"
            onClick={closeLightbox}
            className="absolute right-5 top-5 rounded-full p-3 text-white transition-colors hover:bg-white/10"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            data-ocid="lightbox.prev_button"
            onClick={prevImage}
            className="absolute left-5 rounded-full p-3 text-white transition-colors hover:bg-white/10"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>

          <img
            src={visibleGallery[lightboxIndex].image}
            alt={visibleGallery[lightboxIndex].alt}
            decoding="async"
            className="max-h-[86vh] max-w-[86vw] rounded-[28px] object-contain shadow-2xl"
          />

          <button
            type="button"
            data-ocid="lightbox.next_button"
            onClick={nextImage}
            className="absolute right-5 rounded-full p-3 text-white transition-colors hover:bg-white/10"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-general text-sm text-white/62">
            {lightboxIndex + 1} / {visibleGallery.length}
          </p>
        </div>
      ) : null}
    </section>
  );
}
