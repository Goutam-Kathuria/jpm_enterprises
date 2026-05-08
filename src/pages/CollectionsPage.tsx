import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SeoHead } from "../components/SeoHead";
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildWebPageSchema,
} from "../lib/seo";
import { useWebsiteCategories, useWebsiteProducts } from "../lib/websiteApi";

const ALL_COLLECTIONS_SLUG = "all";

export function CollectionsPage() {
  const search = useSearch({ strict: false }) as { category?: string };
  const navigate = useNavigate();
  const selectedCategory = search.category || ALL_COLLECTIONS_SLUG;
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useWebsiteCategories();
  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useWebsiteProducts();

  const categoryCounts = products.reduce<Record<string, number>>(
    (counts, product) => {
      if (!product.category?.slug) {
        return counts;
      }

      counts[product.category.slug] = (counts[product.category.slug] ?? 0) + 1;
      return counts;
    },
    {},
  );

  const activeCategory =
    selectedCategory === ALL_COLLECTIONS_SLUG
      ? null
      : categories.find((category) => category.slug === selectedCategory) ||
        null;

  const filteredProducts =
    selectedCategory === ALL_COLLECTIONS_SLUG
      ? products
      : products.filter(
          (product) => product.category?.slug === selectedCategory,
        );

  const loading = categoriesLoading || productsLoading;
  const error = categoriesError || productsError;

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Full Furniture Collection Catalogue"
        description="Browse the complete JPM Enterprises catalogue with category filters across luxury sofas, custom furniture, and handcrafted seating collections."
        path="/collections"
        keywords={[
          "furniture catalogue",
          "sofa collection catalogue",
          "luxury furniture collections",
          "custom furniture hisar",
        ]}
        structuredData={[
          buildWebPageSchema({
            title: "Full Furniture Collection Catalogue",
            description:
              "Browse the complete JPM Enterprises catalogue with category filters across luxury sofas, custom furniture, and handcrafted seating collections.",
            path: "/collections",
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Collections", path: "/collections" },
          ]),
          ...(filteredProducts.length > 0
            ? [
                buildItemListSchema(
                  activeCategory?.name || "JPM Collection Catalogue",
                  filteredProducts.map((product) => ({
                    name: product.name,
                    path: `/product/${product.slug}`,
                    image: product.image,
                  })),
                ),
              ]
            : []),
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
              Collection Catalogue
            </p>
            <h1 className="mt-4 max-w-4xl font-playfair text-4xl font-bold text-foreground lg:text-6xl">
              Explore every signature design in one place
            </h1>
            <p className="mt-5 max-w-3xl font-general text-base leading-relaxed text-muted-foreground">
              Filter by category to review each furniture line with clarity,
              compare styles, and move directly into the product details that
              best match your project.
            </p>
          </section>

          <section className="mt-10 rounded-[32px] bg-white p-6 shadow-[0_16px_36px_oklch(0.12_0.01_60_/_0.05)]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p
                  className="font-general text-xs font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "oklch(0.65 0.12 75)" }}
                >
                  Category Filter
                </p>
                <h2 className="mt-2 font-playfair text-2xl font-semibold text-foreground">
                  {activeCategory?.name || "All Collections"}
                </h2>
              </div>
              <p className="font-general text-sm text-muted-foreground">
                {filteredProducts.length} products available
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate({ to: "/collections", search: {} })}
                className="rounded-full px-4 py-2 font-general text-xs font-semibold uppercase tracking-[0.18em] transition-all"
                style={{
                  background:
                    selectedCategory === ALL_COLLECTIONS_SLUG
                      ? "oklch(0.65 0.12 75)"
                      : "oklch(0.97 0.008 84)",
                  color:
                    selectedCategory === ALL_COLLECTIONS_SLUG
                      ? "oklch(0.12 0.01 60)"
                      : "oklch(0.45 0.03 70)",
                  border:
                    selectedCategory === ALL_COLLECTIONS_SLUG
                      ? "1px solid oklch(0.65 0.12 75)"
                      : "1px solid oklch(0.9 0.015 82)",
                }}
              >
                All Collections ({products.length})
              </button>

              {categories.map((category) => {
                const isActive = category.slug === selectedCategory;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      navigate({
                        to: "/collections",
                        search: { category: category.slug },
                      })
                    }
                    className="rounded-full px-4 py-2 font-general text-xs font-semibold uppercase tracking-[0.18em] transition-all"
                    style={{
                      background: isActive
                        ? "oklch(0.65 0.12 75)"
                        : "oklch(0.97 0.008 84)",
                      color: isActive
                        ? "oklch(0.12 0.01 60)"
                        : "oklch(0.45 0.03 70)",
                      border: isActive
                        ? "1px solid oklch(0.65 0.12 75)"
                        : "1px solid oklch(0.9 0.015 82)",
                    }}
                  >
                    {category.name} ({categoryCounts[category.slug] ?? 0})
                  </button>
                );
              })}
            </div>
          </section>

          {error && !loading ? (
            <section
              className="mt-10 rounded-[32px] bg-white px-8 py-14 text-center"
              style={{ border: "1px solid oklch(0.9 0.015 82)" }}
            >
              <h2 className="font-playfair text-3xl font-semibold text-foreground">
                The catalogue could not be loaded right now
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-general text-sm leading-relaxed text-muted-foreground">
                Please try again in a moment. If the issue continues, check
                whether the website product service is available.
              </p>
            </section>
          ) : null}

          {!error ? (
            loading ? (
              <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={`catalogue-skeleton-${index + 1}`}
                    className="overflow-hidden rounded-[30px] bg-white"
                    style={{
                      border: "1px solid oklch(0.9 0.015 82)",
                      boxShadow: "0 20px 40px oklch(0.12 0.01 60 / 0.06)",
                    }}
                  >
                    <div className="aspect-[4/3] animate-pulse bg-[oklch(0.93_0.01_82)]" />
                    <div className="space-y-3 p-6">
                      <div className="h-3 w-24 animate-pulse rounded-full bg-[oklch(0.9_0.015_82)]" />
                      <div className="h-8 w-4/5 animate-pulse rounded-[18px] bg-[oklch(0.94_0.01_82)]" />
                      <div className="h-4 w-full animate-pulse rounded-full bg-[oklch(0.94_0.01_82)]" />
                    </div>
                  </div>
                ))}
              </section>
            ) : filteredProducts.length > 0 ? (
              <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product, index) => {
                  const infoChips = [
                    product.material,
                    product.frame,
                    product.warranty,
                  ].filter(Boolean);

                  return (
                    <article
                      key={product.id}
                      className="group overflow-hidden rounded-[30px] bg-white"
                      style={{
                        border: "1px solid oklch(0.9 0.015 82)",
                        boxShadow: "0 20px 40px oklch(0.12 0.01 60 / 0.06)",
                      }}
                    >
                      <Link
                        to="/product/$productSlug"
                        params={{ productSlug: product.slug }}
                        className="block"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            loading={index < 3 ? "eager" : "lazy"}
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(12,12,10,0.78))]" />
                          <div className="absolute left-5 top-5">
                            <span
                              className="rounded-full px-3 py-1 font-general text-[11px] font-semibold uppercase tracking-[0.18em]"
                              style={{
                                background: "oklch(1 0 0 / 0.18)",
                                color: "oklch(0.95 0.005 85)",
                                border: "1px solid oklch(1 0 0 / 0.16)",
                              }}
                            >
                              {product.category?.name || "Signature Design"}
                            </span>
                          </div>
                        </div>
                      </Link>

                      <div className="space-y-5 p-6">
                        <div>
                          <h3 className="font-playfair text-2xl font-semibold text-foreground">
                            <Link
                              to="/product/$productSlug"
                              params={{ productSlug: product.slug }}
                              className="transition-colors hover:text-[oklch(0.65_0.12_75)]"
                            >
                              {product.name}
                            </Link>
                          </h3>
                          <p className="mt-3 font-general text-sm leading-relaxed text-muted-foreground">
                            {product.shortDescription || product.description}
                          </p>
                        </div>

                        {infoChips.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {infoChips.slice(0, 3).map((chip) => (
                              <span
                                key={chip}
                                className="rounded-full px-3 py-1 font-general text-[11px] uppercase tracking-[0.16em]"
                                style={{
                                  background: "oklch(0.97 0.008 84)",
                                  color: "oklch(0.55 0.05 68)",
                                  border: "1px solid oklch(0.9 0.015 82)",
                                }}
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        <Link
                          to="/product/$productSlug"
                          params={{ productSlug: product.slug }}
                          className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-general text-xs font-semibold uppercase tracking-[0.18em]"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.66 0.12 75), oklch(0.76 0.11 82))",
                            color: "oklch(0.12 0.01 60)",
                          }}
                        >
                          View Details
                          <ArrowRight size={15} />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </section>
            ) : (
              <section
                className="mt-10 rounded-[32px] bg-white px-8 py-16 text-center"
                style={{ border: "1px solid oklch(0.9 0.015 82)" }}
              >
                <h2 className="font-playfair text-3xl font-semibold text-foreground">
                  We&apos;re currently curating this collection
                </h2>
                <p className="mx-auto mt-4 max-w-2xl font-general text-sm leading-relaxed text-muted-foreground">
                  There are no products published in this category just yet.
                  Please explore another collection or check back shortly for
                  new additions.
                </p>
              </section>
            )
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
