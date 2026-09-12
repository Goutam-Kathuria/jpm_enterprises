import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { DEFAULT_BLOGS_CONTENT, useWebsiteBlogs } from "../lib/blogs";

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
  const { data = DEFAULT_BLOGS_CONTENT, isLoading } = useWebsiteBlogs();
  const posts = data.posts.slice(0, 3);

  return (
    <section
      id="blogs"
      className="bg-secondary py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div ref={headerRef} className="reveal max-w-3xl">
            <p className="mb-3 font-general text-sm font-semibold uppercase tracking-[0.25em] text-primary">
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
            className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-card px-7 py-3 font-general text-xs font-semibold uppercase tracking-[0.18em] text-foreground shadow-sm transition-all duration-300 hover:bg-accent hover:border-accent hover:text-accent-foreground"
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
                  className="overflow-hidden rounded-[--radius] border border-border bg-card shadow-sm"
                >
                  <div className="aspect-[4/3] animate-pulse bg-muted" />
                  <div className="space-y-3 p-6">
                    <div className="h-3 w-24 animate-pulse rounded-full bg-muted" />
                    <div className="h-8 w-5/6 animate-pulse rounded-[calc(var(--radius)-2px)] bg-muted" />
                    <div className="h-4 w-full animate-pulse rounded-full bg-muted" />
                    <div className="h-4 w-4/5 animate-pulse rounded-full bg-muted" />
                  </div>
                </div>
              ))
            : posts.length > 0
              ? posts.map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-[--radius] border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <Link
                    to="/blogs/$blogSlug"
                    params={{ blogSlug: post.slug }}
                    className="block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-primary" />
                      )}
                    </div>
                  </Link>

                  <div className="space-y-4 p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-[calc(var(--radius)-2px)] bg-accent/10 px-3 py-1 font-general text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-foreground">
                        {formatBlogDate(post.publishedAt)}
                      </span>
                      <span className="font-general text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        {post.readingTime}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-playfair text-2xl font-semibold text-card-foreground">
                        <Link
                          to="/blogs/$blogSlug"
                          params={{ blogSlug: post.slug }}
                          className="transition-colors hover:text-primary"
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
                      className="inline-flex items-center gap-2 font-general text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:text-accent"
                    >
                      Read Article
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
                ))
              : (
                <div className="lg:col-span-3 rounded-[--radius] border border-border bg-card px-8 py-14 text-center shadow-sm">
                  <p className="font-playfair text-2xl font-semibold text-card-foreground">
                    Thoughtful articles will be published here soon
                  </p>
                  <p className="mx-auto mt-4 max-w-2xl font-general text-sm leading-relaxed text-muted-foreground">
                    We&apos;re preparing practical guidance on sofa selection,
                    materials, maintenance, and custom furniture planning to
                    make the journal genuinely useful when it goes live.
                  </p>
                </div>
              )}
        </div>
      </div>
    </section>
  );
}
