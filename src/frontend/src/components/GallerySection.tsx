import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const images = [
  {
    id: 1,
    src: "/assets/generated/gallery-1.dim_600x800.jpg",
    alt: "Luxury living room with cream sofa",
  },
  {
    id: 2,
    src: "/assets/generated/gallery-2.dim_800x600.jpg",
    alt: "Modern sofa arrangement",
  },
  {
    id: 3,
    src: "/assets/generated/gallery-3.dim_600x700.jpg",
    alt: "Elegant reading corner",
  },
  {
    id: 4,
    src: "/assets/generated/gallery-4.dim_800x600.jpg",
    alt: "Penthouse living room",
  },
  {
    id: 5,
    src: "/assets/generated/gallery-5.dim_600x800.jpg",
    alt: "Premium upholstery detail",
  },
  {
    id: 6,
    src: "/assets/generated/gallery-6.dim_800x500.jpg",
    alt: "Open plan living space",
  },
];

export function GallerySection() {
  const headerRef = useScrollReveal();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const items = grid.querySelectorAll(".gallery-item");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        }
      },
      { threshold: 0.05 },
    );
    for (const item of items) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () =>
      setLightboxIndex((prev) =>
        prev !== null ? (prev - 1 + images.length) % images.length : null,
      ),
    [],
  );
  const nextImage = useCallback(
    () =>
      setLightboxIndex((prev) =>
        prev !== null ? (prev + 1) % images.length : null,
      ),
    [],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  return (
    <section id="gallery" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headerRef} className="reveal text-center mb-16">
          <p
            className="font-general text-sm font-semibold tracking-[0.25em] uppercase mb-3"
            style={{ color: "oklch(0.65 0.12 75)" }}
          >
            Portfolio
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Work in Beautiful Spaces
          </h2>
          <p className="font-general text-muted-foreground max-w-lg mx-auto">
            Explore how JPM furniture transforms living spaces into refined
            sanctuaries.
          </p>
        </div>

        <div
          ref={gridRef}
          className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              data-ocid={`gallery.item.${img.id}`}
              className="gallery-item group relative overflow-hidden rounded-sm cursor-pointer break-inside-avoid mb-4 w-full"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
              }}
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "oklch(0.65 0.12 75 / 0.4)" }}
              >
                <ZoomIn size={32} className="text-white" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            type="button"
            data-ocid="lightbox.close_button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            data-ocid="lightbox.prev_button"
            onClick={prevImage}
            className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>

          <img
            src={images[lightboxIndex].src}
            alt={images[lightboxIndex].alt}
            className="max-h-[85vh] max-w-[85vw] object-contain rounded-sm shadow-2xl"
          />

          <button
            type="button"
            data-ocid="lightbox.next_button"
            onClick={nextImage}
            className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-general text-white/60 text-sm">
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </section>
  );
}
