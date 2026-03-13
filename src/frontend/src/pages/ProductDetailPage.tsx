import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { products } from "../components/CollectionSection";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { scrollToSection } from "../utils/scrollToSection";

export function ProductDetailPage() {
  const { productId } = useParams({ strict: false }) as { productId?: string };
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === productId);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <button
            type="button"
            onClick={() => window.history.back()}
            data-ocid="product.back_button"
            className="flex items-center gap-2 font-general text-sm font-semibold tracking-wider uppercase mb-10 transition-all duration-200 hover:-translate-x-1"
            style={{ color: "oklch(0.65 0.12 75)" }}
          >
            <ArrowLeft size={16} />
            Back to Collection
          </button>

          {!product ? (
            <div className="text-center py-24">
              <p className="font-playfair text-3xl font-bold text-foreground mb-3">
                Product Not Found
              </p>
              <p className="font-general text-muted-foreground mb-8">
                The product you're looking for doesn't exist.
              </p>
              <button
                type="button"
                onClick={() => navigate({ to: "/" })}
                className="font-general px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "oklch(0.65 0.12 75)",
                  color: "oklch(0.12 0.01 60)",
                }}
              >
                Go Home
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Image */}
              <div
                className="rounded-sm overflow-hidden"
                style={{ border: "1px solid oklch(0.87 0.02 80)" }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div>
                <p
                  className="font-general text-sm font-semibold tracking-[0.25em] uppercase mb-3"
                  style={{ color: "oklch(0.65 0.12 75)" }}
                >
                  JPM Enterprises
                </p>
                <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  {product.name}
                </h1>
                <p className="font-general text-secondary-foreground leading-relaxed mb-10">
                  {product.description}
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    ["Material", "Premium Grade A Fabric / Full-grain Leather"],
                    ["Frame", "Solid hardwood kiln-dried frame"],
                    ["Cushions", "High-density foam with feather-down blend"],
                    ["Warranty", "5-year manufacturer warranty"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex gap-4 py-3"
                      style={{ borderBottom: "1px solid oklch(0.87 0.02 80)" }}
                    >
                      <span className="font-general text-xs font-semibold tracking-wider uppercase text-muted-foreground w-28 flex-shrink-0">
                        {label}
                      </span>
                      <span className="font-general text-sm text-foreground">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    data-ocid="product.inquiry_button"
                    onClick={() => {
                      navigate({ to: "/" });
                      setTimeout(() => scrollToSection("contact"), 350);
                    }}
                    className="font-general px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: "oklch(0.65 0.12 75)",
                      color: "oklch(0.12 0.01 60)",
                      boxShadow: "0 4px 20px oklch(0.65 0.12 75 / 0.3)",
                    }}
                  >
                    Request a Quote
                  </button>
                  <button
                    type="button"
                    data-ocid="product.customize_button"
                    onClick={() =>
                      navigate({
                        to: "/custom-design",
                        search: { product: product.slug },
                      })
                    }
                    className="font-general px-8 py-4 text-sm font-semibold tracking-wider uppercase border-2 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      borderColor: "oklch(0.65 0.12 75)",
                      color: "oklch(0.65 0.12 75)",
                    }}
                  >
                    Customize This
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
