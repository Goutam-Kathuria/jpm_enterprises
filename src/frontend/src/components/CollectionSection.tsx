import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const products = [
  {
    id: 1,
    slug: "modern-sofa",
    name: "Modern Sofa",
    description: "Clean lines and contemporary elegance for the modern home.",
    image: "/assets/generated/sofa-modern.dim_800x600.jpg",
  },
  {
    id: 2,
    slug: "luxury-leather-sofa",
    name: "Luxury Leather Sofa",
    description: "Premium full-grain leather with hand-stitched detailing.",
    image: "/assets/generated/sofa-leather.dim_800x600.jpg",
  },
  {
    id: 3,
    slug: "minimalist-fabric-sofa",
    name: "Minimalist Fabric Sofa",
    description: "Soft linen blend upholstery in a timeless Scandinavian form.",
    image: "/assets/generated/sofa-fabric.dim_800x600.jpg",
  },
  {
    id: 4,
    slug: "l-shape-sofa",
    name: "L-Shape Sofa",
    description: "Generous sectional for spacious living, built to impress.",
    image: "/assets/generated/sofa-lshape.dim_800x600.jpg",
  },
  {
    id: 5,
    slug: "recliner-sofa",
    name: "Recliner Sofa",
    description:
      "Motorized comfort with premium fabric and whisper-quiet mechanism.",
    image: "/assets/generated/sofa-recliner.dim_800x600.jpg",
  },
];

export { products };

export function CollectionSection() {
  const headerRef = useScrollReveal();
  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll(".card-reveal");
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
    <section id="collection" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headerRef} className="reveal text-center mb-16">
          <p
            className="font-general text-sm font-semibold tracking-[0.25em] uppercase mb-3"
            style={{ color: "oklch(0.65 0.12 75)" }}
          >
            Handcrafted Excellence
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Signature Collection
          </h2>
          <p className="font-general text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Each piece is meticulously crafted using premium materials, blending
            timeless design with unparalleled comfort for the discerning
            homeowner.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              data-ocid={`collection.item.${product.id}`}
              className="card-reveal group relative bg-card rounded-sm overflow-hidden cursor-pointer"
              style={{
                opacity: 0,
                transform: "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, box-shadow 0.3s ease, border-color 0.3s ease`,
                border: "1px solid oklch(0.87 0.02 80)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 40px oklch(0.65 0.12 75 / 0.2)";
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.borderColor = "oklch(0.65 0.12 75)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "oklch(0.87 0.02 80)";
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="font-general text-sm text-muted-foreground leading-relaxed mb-4">
                  {product.description}
                </p>
                <button
                  type="button"
                  data-ocid={`collection.view_button.${product.id}`}
                  onClick={() =>
                    navigate({
                      to: "/product/$productId",
                      params: { productId: product.slug },
                    })
                  }
                  className="font-general text-xs font-semibold tracking-wider uppercase px-5 py-2.5 border transition-all duration-300"
                  style={{
                    borderColor: "oklch(0.65 0.12 75)",
                    color: "oklch(0.65 0.12 75)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "oklch(0.65 0.12 75)";
                    e.currentTarget.style.color = "oklch(0.12 0.01 60)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "oklch(0.65 0.12 75)";
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
