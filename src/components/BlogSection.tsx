import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useWebsiteBlogs } from "../lib/blogs";

function formatBlogDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Fresh insights";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function BlogSection() {
  const headerRef = useScrollReveal();
  const { data, isLoading } = useWebsiteBlogs();
  const posts = data.posts.slice(0, 3);

  if (!isLoading && posts.length === 0) {
    return null;
  }

  return (
    <section
      id="blogs"
      className="py-24"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.985 0.008 86), oklch(0.965 0.012 82))",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div ref={headerRef} className="reveal max-w-3xl">
            <p
              className="mb-3 font-general text-sm font-semibold uppercase tracking-[0.25em]"
              style={{ color: "oklch(0.65 0.12 75)" }}
            >
              {data.overline}
            </p>
            <h2 className="font-playfair text-4xl font-bold text-foreground lg:text-5xl">
              {data.heading}
            </h2>
            <p className="mt-4 font-general text-base leading-relaxed text-muted-foreground">
              {data.description}
            </p>
          </div>

          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-general text-xs font-semibold uppercase tracking-[0.18em]"
            style={{
              border: "1px solid oklch(0.65 0.12 75 / 0.28)",
              color: "oklch(0.65 0.12 75)",
            }}
          >
            View All Articles
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }, (_, index) => (
                <div
                  key={`blog-skeleton-${index + 1}`}
                  className="overflow-hidden rounded-[30px] bg-white"
                  style={{
                    border: "1px solid oklch(0.9 0.015 82)",
                    boxShadow: "0 20px 42px oklch(0.12 0.01 60 / 0.05)",
                  }}
                >
                  <div className="aspect-[4/3] animate-pulse bg-[oklch(0.92_0.012_82)]" />
                  <div className="space-y-3 p-6">
                    <div className="h-3 w-24 animate-pulse rounded-full bg-[oklch(0.9_0.015_82)]" />
                    <div className="h-8 w-5/6 animate-pulse rounded-[18px] bg-[oklch(0.95_0.01_82)]" />
                    <div className="h-4 w-full animate-pulse rounded-full bg-[oklch(0.95_0.01_82)]" />
                    <div className="h-4 w-4/5 animate-pulse rounded-full bg-[oklch(0.95_0.01_82)]" />
                  </div>
                </div>
              ))
            : posts.map((post) => (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-[30px] bg-white"
                  style={{
                    border: "1px solid oklch(0.9 0.015 82)",
                    boxShadow: "0 20px 42px oklch(0.12 0.01 60 / 0.05)",
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
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="rounded-full px-3 py-1 font-general text-[11px] font-semibold uppercase tracking-[0.18em]"
                        style={{
                          background: "oklch(0.65 0.12 75 / 0.1)",
                          color: "oklch(0.55 0.14 65)",
                        }}
                      >
                        {formatBlogDate(post.publishedAt)}
                      </span>
                      <span className="font-general text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        {post.readingTime}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-playfair text-2xl font-semibold text-foreground">
                        <Link
                          to="/blogs/$blogSlug"
                          params={{ blogSlug: post.slug }}
                          className="transition-colors hover:text-[oklch(0.65_0.12_75)]"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-3 font-general text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </div>

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
        </div>
      </div>
    </section>
  );
}
