import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Layers3, Palette, Sparkles } from "lucide-react";
import { useDeferredValue, useState, useTransition } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useWebsiteCategories, useWebsiteProducts } from "../lib/websiteApi";

const ALL_COLLECTIONS_SLUG = "all";
const CATEGORY_LOADING_KEYS = [
  "loading-alpha",
  "loading-bravo",
  "loading-charlie",
  "loading-delta",
];

function LoadingCard() {
  return (
    <div
      className="overflow-hidden rounded-[28px] bg-white"
      style={{ border: "1px solid oklch(0.9 0.015 82)" }}
    >
      <div className="aspect-[4/3] animate-pulse bg-[oklch(0.93_0.01_82)]" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-24 animate-pulse rounded-full bg-[oklch(0.9_0.015_82)]" />
        <div className="h-6 w-2/3 animate-pulse rounded-full bg-[oklch(0.9_0.015_82)]" />
        <div className="h-4 w-full animate-pulse rounded-full bg-[oklch(0.94_0.01_82)]" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-[oklch(0.94_0.01_82)]" />
      </div>
    </div>
  );
}

export function CollectionSection() {
  const headerRef = useScrollReveal();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState(ALL_COLLECTIONS_SLUG);
  const [isPending, startTransition] = useTransition();
  const deferredCategory = useDeferredValue(selectedCategory);
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

  const categoryCards = [
    {
      slug: ALL_COLLECTIONS_SLUG,
      name: "All Collections",
      description:
        "Browse the full JPM catalogue across every handcrafted seating collection.",
      image: "/assets/generated/hero-sofa.dim_1600x900.jpg",
      count: products.length,
    },
    ...categories.map((category) => ({
      ...category,
      count: categoryCounts[category.slug] ?? 0,
    })),
  ];

  const activeCategory =
    deferredCategory === ALL_COLLECTIONS_SLUG
      ? null
      : categories.find((category) => category.slug === deferredCategory) ||
        null;

  const featuredCategory = activeCategory ?? categories[0] ?? null;
  const filteredProducts =
    deferredCategory === ALL_COLLECTIONS_SLUG
      ? products
      : products.filter(
          (product) => product.category?.slug === deferredCategory,
        );
  const visibleProducts = filteredProducts.slice(0, 20);
  const showFullCollectionButton = filteredProducts.length > 20;

  const loading = categoriesLoading || productsLoading;
  const error = categoriesError || productsError;

  return (
    <section
      id="collection"
      className="relative overflow-hidden py-24"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.98 0.008 85), oklch(0.95 0.01 82))",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-56"
        style={{
          background:
            "radial-gradient(circle at 15% 0%, oklch(0.72 0.08 82 / 0.22), transparent 44%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div ref={headerRef} className="reveal">
            <p
              className="mb-3 font-general text-sm font-semibold uppercase tracking-[0.28em]"
              style={{ color: "oklch(0.65 0.12 75)" }}
            >
              Curated Collections
            </p>
            <h2 className="font-playfair text-4xl font-bold text-foreground lg:text-5xl">
              Our Signature Collection
            </h2>
            <p className="mt-4 max-w-2xl font-general text-base leading-relaxed text-muted-foreground">
              Collections now lead the browsing experience, making it easier to
              explore product families, compare design directions, and jump into
              the exact style your customer wants.
            </p>
          </div>

          <div
            className="rounded-[30px] p-6 lg:p-7"
            style={{
              background: featuredCategory?.image
                ? `linear-gradient(135deg, oklch(0.12 0.01 60 / 0.78), oklch(0.12 0.01 60 / 0.36)), url(${featuredCategory.image}) center/cover`
                : "linear-gradient(135deg, oklch(0.16 0.02 62), oklch(0.22 0.03 68))",
              border: "1px solid oklch(0.65 0.12 75 / 0.18)",
              boxShadow: "0 28px 55px oklch(0.12 0.01 60 / 0.08)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className="font-general text-xs font-semibold uppercase tracking-[0.24em]"
                  style={{ color: "oklch(0.82 0.11 82)" }}
                >
                  Featured Collection
                </p>
                <h3 className="mt-2 font-playfair text-3xl font-semibold text-white">
                  {featuredCategory?.name || "Collection Preview"}
                </h3>
              </div>
              <span
                className="rounded-full px-3 py-1 font-general text-xs font-semibold uppercase tracking-[0.18em]"
                style={{
                  background: "oklch(1 0 0 / 0.12)",
                  color: "oklch(0.9 0.005 85)",
                }}
              >
                {featuredCategory
                  ? `${categoryCounts[featuredCategory.slug] ?? 0} Designs`
                  : `${products.length} Designs`}
              </span>
            </div>

            <p className="mt-4 max-w-lg font-general text-sm leading-relaxed text-white/78">
              {featuredCategory?.description ||
                "Discover the full range of handcrafted JPM sofas, thoughtfully arranged by collection."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {featuredCategory?.tags.length ? (
                featuredCategory.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 font-general text-xs uppercase tracking-[0.16em] text-white/80"
                    style={{
                      background: "oklch(1 0 0 / 0.1)",
                      border: "1px solid oklch(1 0 0 / 0.14)",
                    }}
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <>
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-general text-xs uppercase tracking-[0.16em] text-white/80"
                    style={{
                      background: "oklch(1 0 0 / 0.1)",
                      border: "1px solid oklch(1 0 0 / 0.14)",
                    }}
                  >
                    <Layers3 size={13} />
                    Collection-first browsing
                  </span>
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-general text-xs uppercase tracking-[0.16em] text-white/80"
                    style={{
                      background: "oklch(1 0 0 / 0.1)",
                      border: "1px solid oklch(1 0 0 / 0.14)",
                    }}
                  >
                    <Palette size={13} />
                    Premium detailing
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {loading
            ? CATEGORY_LOADING_KEYS.map((key) => <LoadingCard key={key} />)
            : categoryCards.map((category) => {
                const isActive = category.slug === selectedCategory;

                return (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() =>
                      startTransition(() => setSelectedCategory(category.slug))
                    }
                    className="group relative overflow-hidden rounded-[28px] text-left transition-all duration-300 hover:-translate-y-1"
                    style={{
                      border: isActive
                        ? "1px solid oklch(0.65 0.12 75)"
                        : "1px solid oklch(0.88 0.02 82)",
                      boxShadow: isActive
                        ? "0 24px 45px oklch(0.65 0.12 75 / 0.18)"
                        : "0 12px 28px oklch(0.12 0.01 60 / 0.05)",
                      background: "white",
                    }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(12,12,10,0.8))]" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <p className="font-playfair text-2xl font-semibold">
                          {category.name}
                        </p>
                        <p className="mt-1 font-general text-xs uppercase tracking-[0.18em] text-white/68">
                          {category.count} pieces in view
                        </p>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="font-general text-sm leading-relaxed text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </button>
                );
              })}
        </div>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="font-general text-xs font-semibold uppercase tracking-[0.24em]"
              style={{ color: "oklch(0.65 0.12 75)" }}
            >
              {activeCategory ? "Selected Collection" : "All Collections"}
            </p>
            <h3 className="mt-2 font-playfair text-3xl font-semibold text-foreground">
              {activeCategory?.name || "Every signature design in one view"}
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-general text-sm text-muted-foreground">
              {showFullCollectionButton
                ? `Showing ${visibleProducts.length} of ${filteredProducts.length} products`
                : `${filteredProducts.length} products showing`}
            </p>
            {isPending ? (
              <span
                className="rounded-full px-3 py-1 font-general text-xs font-semibold uppercase tracking-[0.18em]"
                style={{
                  background: "oklch(0.65 0.12 75 / 0.1)",
                  color: "oklch(0.55 0.14 65)",
                }}
              >
                Updating
              </span>
            ) : null}
          </div>
        </div>

        {error && !loading ? (
          <div
            className="rounded-[28px] p-8 text-center"
            style={{
              background: "white",
              border: "1px solid oklch(0.9 0.015 82)",
            }}
          >
            <p className="font-playfair text-2xl font-semibold text-foreground">
              Collection data couldn&apos;t be loaded
            </p>
            <p className="mt-3 font-general text-sm text-muted-foreground">
              Please confirm the website APIs are reachable. The collection UI
              is now wired to live categories and products.
            </p>
          </div>
        ) : null}

        {!error ? (
          filteredProducts.length > 0 ? (
            <>
              <div
                className={`grid gap-6 md:grid-cols-2 xl:grid-cols-3 ${
                  isPending ? "opacity-80" : "opacity-100"
                } transition-opacity duration-200`}
              >
                {visibleProducts.map((product, index) => {
                const infoChips = [
                  product.material,
                  product.frame,
                  product.warranty,
                ].filter(Boolean);

                return (
                  <article
                    key={product.id}
                    data-ocid={`collection.item.${product.slug}`}
                    className="group overflow-hidden rounded-[30px] bg-white transition-all duration-300 hover:-translate-y-1"
                    style={{
                      border: "1px solid oklch(0.9 0.015 82)",
                      boxShadow: "0 20px 40px oklch(0.12 0.01 60 / 0.06)",
                    }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Link
                        to="/product/$productSlug"
                        params={{ productSlug: product.slug }}
                        className="block h-full w-full"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(12,12,10,0.78))]" />
                      <div className="absolute left-5 top-5 flex flex-wrap gap-2">
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
                        {index < 2 ? (
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-3 py-1 font-general text-[11px] font-semibold uppercase tracking-[0.18em]"
                            style={{
                              background: "oklch(0.65 0.12 75 / 0.92)",
                              color: "oklch(0.12 0.01 60)",
                            }}
                          >
                            <Sparkles size={12} />
                            Featured
                          </span>
                        ) : null}
                      </div>
                    </div>

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

                      <div className="flex flex-wrap gap-3">
                        <Link
                          to="/product/$productSlug"
                          params={{ productSlug: product.slug }}
                          data-ocid={`collection.view_button.${product.slug}`}
                          className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-general text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.66 0.12 75), oklch(0.76 0.11 82))",
                            color: "oklch(0.12 0.01 60)",
                          }}
                        >
                          View Details
                          <ArrowRight size={15} />
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            navigate({
                              to: "/custom-design",
                              search: { product: product.slug },
                            })
                          }
                          className="rounded-full px-5 py-3 font-general text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300"
                          style={{
                            color: "oklch(0.65 0.12 75)",
                            border: "1px solid oklch(0.65 0.12 75 / 0.32)",
                          }}
                        >
                          Customize
                        </button>
                      </div>
                    </div>
                  </article>
                  );
                })}
              </div>

              {showFullCollectionButton ? (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      navigate({
                        to: "/collections",
                        search: activeCategory
                          ? { category: activeCategory.slug }
                          : {},
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-general text-xs font-semibold uppercase tracking-[0.18em]"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.66 0.12 75), oklch(0.76 0.11 82))",
                      color: "oklch(0.12 0.01 60)",
                      boxShadow: "0 18px 32px oklch(0.65 0.12 75 / 0.18)",
                    }}
                  >
                    Browse Full Collection
                    <ArrowRight size={15} />
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div
              className="rounded-[28px] p-10 text-center"
              style={{
                background: "white",
                border: "1px solid oklch(0.9 0.015 82)",
              }}
            >
              <p className="font-playfair text-2xl font-semibold text-foreground">
                We&apos;re currently curating this collection
              </p>
              <p className="mt-3 font-general text-sm text-muted-foreground">
                There are no products published in this category just yet.
                Please explore another collection or check back shortly for new
                additions.
              </p>
            </div>
          )
        ) : null}
      </div>
    </section>
  );
}
