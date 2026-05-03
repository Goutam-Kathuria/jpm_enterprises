import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Mail, Phone, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { buildProductSchema, useDocumentMetadata } from "../lib/seo";
import { useWebsiteProduct, useWebsiteSettings } from "../lib/websiteApi";
import { scrollToSection } from "../utils/scrollToSection";

const DETAIL_SKELETON_KEYS = [
  "detail-skeleton-a",
  "detail-skeleton-b",
  "detail-skeleton-c",
  "detail-skeleton-d",
];

function getPhoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

function DetailSkeleton() {
  return (
    <div className="grid gap-12 xl:grid-cols-[1.08fr_0.92fr]">
      <div>
        <div className="aspect-[5/4] animate-pulse rounded-[32px] bg-[oklch(0.9_0.015_82)]" />
        <div className="mt-4 grid grid-cols-4 gap-3">
          {DETAIL_SKELETON_KEYS.map((key) => (
            <div
              key={key}
              className="aspect-[4/3] animate-pulse rounded-[22px] bg-[oklch(0.93_0.01_82)]"
            />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 w-28 animate-pulse rounded-full bg-[oklch(0.9_0.015_82)]" />
        <div className="h-12 w-4/5 animate-pulse rounded-[18px] bg-[oklch(0.94_0.01_82)]" />
        <div className="h-12 w-full animate-pulse rounded-[18px] bg-[oklch(0.94_0.01_82)]" />
        <div className="h-12 w-5/6 animate-pulse rounded-[18px] bg-[oklch(0.94_0.01_82)]" />
      </div>
    </div>
  );
}

export function ProductDetailPage() {
  const { productSlug } = useParams({ strict: false }) as {
    productSlug?: string;
  };
  const navigate = useNavigate();
  const { data, isLoading, error } = useWebsiteProduct(productSlug);
  const { data: settings } = useWebsiteSettings();
  const product = data?.product ?? null;
  const relatedProducts = data?.relatedProducts ?? [];
  const [selectedImage, setSelectedImage] = useState("");
  const phoneHref = getPhoneHref(settings?.enquiryPhone ?? "");
  const detailTags = product
    ? Array.from(
        new Set(
          product.tags
            .map((tag) => tag.trim())
            .filter(
              (tag) =>
                Boolean(tag) &&
                tag.toLowerCase() !== product.category?.name?.toLowerCase(),
            ),
        ),
      )
    : [];

  useEffect(() => {
    if (!product) {
      return;
    }

    setSelectedImage(product.gallery[0] || product.image);
  }, [product]);

  useDocumentMetadata({
    title: product?.metaTitle || product?.name || "Luxury Sofa Collection",
    description:
      product?.metaDescription ||
      product?.shortDescription ||
      "Explore handcrafted sofa details from JPM Enterprises.",
    path: product ? `/product/${product.slug}` : "/",
    image: product?.image,
    type: "product",
    keywords: [
      product?.name || "luxury sofa",
      product?.category?.name || "furniture collection",
      "premium handcrafted sofa",
      "bespoke furniture India",
    ].filter(Boolean),
    structuredData: product ? buildProductSchema(product, settings) : undefined,
  });

  const detailItems = product
    ? [
        { label: "Material", value: product.material },
        { label: "Frame", value: product.frame },
        { label: "Cushions", value: product.cushions },
        { label: "Warranty", value: product.warranty },
      ].filter((item) => item.value)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main
        className="pb-24 pt-28"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.98 0.008 85), oklch(0.96 0.01 82))",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <button
            type="button"
            onClick={() =>
              window.history.length > 1
                ? window.history.back()
                : navigate({ to: "/" })
            }
            data-ocid="product.back_button"
            className="mb-10 inline-flex items-center gap-2 font-general text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-200 hover:-translate-x-1"
            style={{ color: "oklch(0.65 0.12 75)" }}
          >
            <ArrowLeft size={16} />
            Back to Collection
          </button>

          {isLoading ? <DetailSkeleton /> : null}

          {!isLoading && (error || !product) ? (
            <div
              className="rounded-[32px] bg-white px-8 py-16 text-center"
              style={{ border: "1px solid oklch(0.9 0.015 82)" }}
            >
              <p className="font-playfair text-3xl font-semibold text-foreground">
                Product not found
              </p>
              <p className="mx-auto mt-3 max-w-lg font-general text-sm leading-relaxed text-muted-foreground">
                The product detail page is now wired to the live slug API. If
                this item exists in the backend, please confirm the slug is
                active and reachable under `/website/products/:slug`.
              </p>
              <button
                type="button"
                onClick={() => navigate({ to: "/" })}
                className="mt-8 rounded-full px-6 py-3 font-general text-xs font-semibold uppercase tracking-[0.18em]"
                style={{
                  background: "oklch(0.65 0.12 75)",
                  color: "oklch(0.12 0.01 60)",
                }}
              >
                Go Home
              </button>
            </div>
          ) : null}

          {product ? (
            <>
              <div className="grid gap-12 xl:grid-cols-[1.08fr_0.92fr]">
                <div>
                  <div
                    className="overflow-hidden rounded-[34px] bg-white"
                    style={{
                      border: "1px solid oklch(0.9 0.015 82)",
                      boxShadow: "0 24px 52px oklch(0.12 0.01 60 / 0.08)",
                    }}
                  >
                    <img
                      src={selectedImage || product.image}
                      alt={product.name}
                      className="aspect-[5/4] w-full object-cover"
                    />
                  </div>

                  {product.gallery.length > 1 ? (
                    <div className="mt-4 grid grid-cols-4 gap-3">
                      {product.gallery.map((image) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setSelectedImage(image)}
                          className="overflow-hidden rounded-[22px] bg-white"
                          style={{
                            border:
                              image === selectedImage
                                ? "2px solid oklch(0.65 0.12 75)"
                                : "1px solid oklch(0.9 0.015 82)",
                          }}
                        >
                          <img
                            src={image}
                            alt={product.name}
                            className="aspect-[4/3] w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="rounded-full px-4 py-2 font-general text-xs font-semibold uppercase tracking-[0.18em]"
                      style={{
                        background: "oklch(0.65 0.12 75 / 0.1)",
                        color: "oklch(0.55 0.14 65)",
                      }}
                    >
                      {product.category?.name || "Signature Design"}
                    </span>
                  </div>

                  <h1 className="mt-5 font-playfair text-4xl font-bold text-foreground lg:text-5xl">
                    {product.name}
                  </h1>
                  <p className="mt-3 text-sm uppercase tracking-[0.24em] text-muted-foreground">
                    {product.shortDescription || "A beautifully balanced statement piece."}
                  </p>
                  <p className="mt-5 font-general text-base leading-relaxed text-secondary-foreground">
                    {product.description}
                  </p>

                  {detailItems.length > 0 ? (
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      {detailItems.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[32px] bg-[oklch(0.98_0.008_85)] p-6 shadow-[0_16px_32px_rgba(0,0,0,0.06)]"
                          style={{
                            border: "1px solid oklch(0.9 0.015 82)",
                          }}
                        >
                          <p className="font-general text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                            {item.label}
                          </p>
                          <p className="mt-4 text-sm font-semibold leading-snug text-foreground">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div
                    className="mt-8 rounded-[30px] bg-white p-6"
                    style={{
                      border: "1px solid oklch(0.9 0.015 82)",
                      boxShadow: "0 20px 38px oklch(0.12 0.01 60 / 0.05)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full"
                        style={{ background: "oklch(0.65 0.12 75 / 0.12)" }}
                      >
                        <Sparkles
                          size={18}
                          style={{ color: "oklch(0.55 0.14 65)" }}
                        />
                      </div>
                      <div>
                        <p className="font-playfair text-2xl font-semibold text-foreground">
                          Request this design
                        </p>
                        <p className="mt-2 font-general text-sm leading-relaxed text-muted-foreground">
                          Use the live settings details below or jump straight
                          to the custom design flow with this product
                          preselected.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        data-ocid="product.inquiry_button"
                        onClick={() => {
                          navigate({ to: "/" });
                          setTimeout(() => scrollToSection("contact"), 350);
                        }}
                        className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-general text-xs font-semibold uppercase tracking-[0.18em]"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.66 0.12 75), oklch(0.76 0.11 82))",
                          color: "oklch(0.12 0.01 60)",
                        }}
                      >
                        Request a Quote
                        <ArrowRight size={15} />
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
                        className="rounded-full px-5 py-3 font-general text-xs font-semibold uppercase tracking-[0.18em]"
                        style={{
                          border: "1px solid oklch(0.65 0.12 75 / 0.3)",
                          color: "oklch(0.65 0.12 75)",
                        }}
                      >
                        Customize This
                      </button>
                    </div>

                    {settings?.enquiryPhone || settings?.enquiryEmail ? (
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {settings.enquiryPhone ? (
                          <a
                            href={phoneHref}
                            className="flex min-w-0 items-center gap-3 rounded-[22px] bg-[oklch(0.98_0.008_85)] px-4 py-4 font-general text-sm text-foreground"
                          >
                            <Phone
                              size={16}
                              style={{ color: "oklch(0.65 0.12 75)" }}
                            />
                            <span className="min-w-0 break-words">
                              {settings.enquiryPhone}
                            </span>
                          </a>
                        ) : null}
                        {settings.enquiryEmail ? (
                          <a
                            href={`mailto:${settings.enquiryEmail}`}
                            className="flex min-w-0 items-center gap-3 rounded-[22px] bg-[oklch(0.98_0.008_85)] px-4 py-4 font-general text-sm text-foreground"
                          >
                            <Mail
                              size={16}
                              style={{ color: "oklch(0.65 0.12 75)" }}
                            />
                            <span className="min-w-0 break-words">
                              {settings.enquiryEmail}
                            </span>
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {relatedProducts.length > 0 ? (
                <section className="mt-20">
                  <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                      <p
                        className="font-general text-xs font-semibold uppercase tracking-[0.22em]"
                        style={{ color: "oklch(0.65 0.12 75)" }}
                      >
                        Related Pieces
                      </p>
                      <h2 className="mt-2 font-playfair text-3xl font-semibold text-foreground">
                        More from {product.category?.name || "this collection"}
                      </h2>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {relatedProducts.map((relatedProduct) => (
                      <article
                        key={relatedProduct.id}
                        className="overflow-hidden rounded-[28px] bg-white"
                        style={{
                          border: "1px solid oklch(0.9 0.015 82)",
                          boxShadow: "0 18px 38px oklch(0.12 0.01 60 / 0.05)",
                        }}
                      >
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="aspect-[4/3] w-full object-cover"
                        />
                        <div className="p-5">
                          <h3 className="font-playfair text-2xl font-semibold text-foreground">
                            {relatedProduct.name}
                          </h3>
                          <p className="mt-2 font-general text-sm leading-relaxed text-muted-foreground">
                            {relatedProduct.shortDescription}
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              navigate({
                                to: "/product/$productSlug",
                                params: { productSlug: relatedProduct.slug },
                              })
                            }
                            className="mt-5 inline-flex items-center gap-2 font-general text-xs font-semibold uppercase tracking-[0.18em]"
                            style={{ color: "oklch(0.65 0.12 75)" }}
                          >
                            View Product
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}
            </>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
