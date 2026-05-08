import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SeoHead } from "../components/SeoHead";
import { useWebsiteBlogs } from "../lib/blogs";
import {
  buildBlogListingSchema,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from "../lib/seo";

function formatBlogDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Latest article";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function BlogsPage() {
  const { data, isLoading } = useWebsiteBlogs();
  const featuredPost = data.posts[0] ?? null;

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Furniture Blog and Sofa Design Ideas"
        description="Read JPM Enterprises articles on sofa buying, custom furniture design, upholstery choices, and home styling ideas."
        path="/blogs"
        image={featuredPost?.coverImage}
        type="article"
        keywords={[
          "furniture blog",
          "sofa design ideas",
          "custom furniture tips",
          "upholstery guide India",
          "living room furniture inspiration",
        ]}
        structuredData={[
          buildWebPageSchema({
            title: "Furniture Blog and Sofa Design Ideas",
            description:
              "Read JPM Enterprises articles on sofa buying, custom furniture design, upholstery choices, and home styling ideas.",
            path: "/blogs",
            image: featuredPost?.coverImage,
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blogs", path: "/blogs" },
          ]),
          buildBlogListingSchema(data.posts),
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
              {data.overline}
            </p>
            <h1 className="mt-4 max-w-4xl font-playfair text-4xl font-bold text-foreground lg:text-6xl">
              {data.heading}
            </h1>
            <p className="mt-5 max-w-3xl font-general text-base leading-relaxed text-muted-foreground">
              {data.description}
            </p>
          </section>

          {isLoading ? (
            <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={`blog-card-skeleton-${index + 1}`}
                  className="overflow-hidden rounded-[30px] bg-white"
                  style={{
                    border: "1px solid oklch(0.9 0.015 82)",
                    boxShadow: "0 20px 40px oklch(0.12 0.01 60 / 0.05)",
                  }}
                >
                  <div className="aspect-[4/3] animate-pulse bg-[oklch(0.93_0.012_82)]" />
                  <div className="space-y-3 p-6">
                    <div className="h-3 w-24 animate-pulse rounded-full bg-[oklch(0.9_0.015_82)]" />
                    <div className="h-8 w-4/5 animate-pulse rounded-[18px] bg-[oklch(0.95_0.01_82)]" />
                    <div className="h-4 w-full animate-pulse rounded-full bg-[oklch(0.95_0.01_82)]" />
                  </div>
                </div>
              ))}
            </section>
          ) : data.posts.length > 0 ? (
            <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {data.posts.map((post) => (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-[30px] bg-white"
                  style={{
                    border: "1px solid oklch(0.9 0.015 82)",
                    boxShadow: "0 20px 40px oklch(0.12 0.01 60 / 0.05)",
                  }}
                >
                  <Link
                    to="/blogs/$blogSlug"
                    params={{ blogSlug: post.slug }}
                    className="block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      ) : (
                        <div
                          className="h-full w-full"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.68 0.11 76), oklch(0.86 0.08 84))",
                          }}
                        />
                      )}
                    </div>
                  </Link>

                  <div className="space-y-4 p-6">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      <span>{formatBlogDate(post.publishedAt)}</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <div>
                      <h2 className="font-playfair text-2xl font-semibold text-foreground">
                        <Link
                          to="/blogs/$blogSlug"
                          params={{ blogSlug: post.slug }}
                          className="transition-colors hover:text-[oklch(0.65_0.12_75)]"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="mt-3 font-general text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </div>

                    {post.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full px-3 py-1 font-general text-[11px] uppercase tracking-[0.16em]"
                            style={{
                              background: "oklch(0.97 0.008 84)",
                              color: "oklch(0.55 0.05 68)",
                              border: "1px solid oklch(0.9 0.015 82)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <Link
                      to="/blogs/$blogSlug"
                      params={{ blogSlug: post.slug }}
                      className="inline-flex items-center gap-2 font-general text-xs font-semibold uppercase tracking-[0.18em]"
                      style={{ color: "oklch(0.65 0.12 75)" }}
                    >
                      Read Article
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <section
              className="mt-10 rounded-[32px] bg-white px-8 py-16 text-center"
              style={{ border: "1px solid oklch(0.9 0.015 82)" }}
            >
              <h2 className="font-playfair text-3xl font-semibold text-foreground">
                Thoughtful articles will be published here soon
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-general text-sm leading-relaxed text-muted-foreground">
                We&apos;re preparing practical guidance on sofa selection,
                materials, maintenance, and custom furniture planning so this
                journal launches with genuinely useful reading.
              </p>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
