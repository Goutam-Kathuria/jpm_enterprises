import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SeoHead } from "../components/SeoHead";
import { useWebsiteBlog, useWebsiteBlogs } from "../lib/blogs";
import {
  buildBlogPostingSchema,
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
    month: "long",
    year: "numeric",
  }).format(date);
}

export function BlogDetailPage() {
  const { blogSlug } = useParams({ strict: false }) as { blogSlug?: string };
  const { data: blog, isLoading } = useWebsiteBlog(blogSlug);
  const { data: blogFeed } = useWebsiteBlogs();
  const relatedPosts = blog
    ? blogFeed.posts
        .filter((post) => post.slug !== blog.slug)
        .slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-background">
      {blog ? (
        <SeoHead
          title={blog.metaTitle || blog.title}
          description={blog.metaDescription || blog.excerpt}
          path={`/blogs/${blog.slug}`}
          image={blog.coverImage}
          type="article"
          keywords={[
            blog.title,
            ...blog.tags,
            "sofa design blog",
            "furniture buying guide",
          ]}
          tags={blog.tags}
          author={blog.authorName}
          publishedTime={blog.publishedAt}
          modifiedTime={blog.updatedAt || blog.publishedAt}
          structuredData={[
            buildWebPageSchema({
              title: blog.title,
              description: blog.metaDescription || blog.excerpt,
              path: `/blogs/${blog.slug}`,
              image: blog.coverImage,
            }),
            buildBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blogs", path: "/blogs" },
              { name: blog.title, path: `/blogs/${blog.slug}` },
            ]),
            buildBlogPostingSchema(blog),
          ]}
        />
      ) : null}
      <Navbar />
      <main
        className="pb-24 pt-28"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.985 0.008 85), oklch(0.965 0.012 82))",
        }}
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Link
            to="/blogs"
            className="mb-10 inline-flex items-center gap-2 font-general text-sm font-semibold uppercase tracking-[0.18em]"
            style={{ color: "oklch(0.65 0.12 75)" }}
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </Link>

          {isLoading ? (
            <div className="space-y-4 rounded-[32px] bg-white p-8">
              <div className="h-4 w-28 animate-pulse rounded-full bg-[oklch(0.9_0.015_82)]" />
              <div className="h-12 w-4/5 animate-pulse rounded-[18px] bg-[oklch(0.95_0.01_82)]" />
              <div className="aspect-[16/9] animate-pulse rounded-[28px] bg-[oklch(0.93_0.012_82)]" />
              <div className="h-4 w-full animate-pulse rounded-full bg-[oklch(0.95_0.01_82)]" />
              <div className="h-4 w-5/6 animate-pulse rounded-full bg-[oklch(0.95_0.01_82)]" />
            </div>
          ) : blog ? (
            <>
              <article
                className="overflow-hidden rounded-[34px] bg-white shadow-[0_22px_48px_oklch(0.12_0.01_60_/_0.06)]"
                style={{ border: "1px solid oklch(0.9 0.015 82)" }}
              >
                <div className="px-8 pt-8 lg:px-12 lg:pt-12">
                  <div className="flex flex-wrap items-center gap-3 font-general text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <span>{formatBlogDate(blog.publishedAt)}</span>
                    <span>{blog.readingTime}</span>
                    <span>{blog.authorName}</span>
                  </div>

                  <h1 className="mt-5 font-playfair text-4xl font-bold text-foreground lg:text-6xl">
                    {blog.title}
                  </h1>
                  <p className="mt-5 max-w-3xl font-general text-base leading-relaxed text-muted-foreground">
                    {blog.excerpt}
                  </p>

                  {blog.tags.length > 0 ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
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
                </div>

                {blog.coverImage ? (
                  <div className="mt-8">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      fetchPriority="high"
                      decoding="async"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </div>
                ) : null}

                <div className="px-8 py-10 lg:px-12 lg:py-12">
                  <div className="prose prose-stone max-w-none prose-headings:font-playfair prose-headings:text-foreground prose-p:font-general prose-p:text-secondary-foreground">
                    {blog.paragraphs.map((paragraph, index) => (
                      <p key={`${blog.id}-paragraph-${index + 1}`}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>

              {relatedPosts.length > 0 ? (
                <section className="mt-16">
                  <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                      <p
                        className="font-general text-xs font-semibold uppercase tracking-[0.22em]"
                        style={{ color: "oklch(0.65 0.12 75)" }}
                      >
                        Continue Reading
                      </p>
                      <h2 className="mt-2 font-playfair text-3xl font-semibold text-foreground">
                        More articles from JPM
                      </h2>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {relatedPosts.map((post) => (
                      <article
                        key={post.id}
                        className="overflow-hidden rounded-[28px] bg-white"
                        style={{
                          border: "1px solid oklch(0.9 0.015 82)",
                          boxShadow: "0 18px 38px oklch(0.12 0.01 60 / 0.05)",
                        }}
                      >
                        {post.coverImage ? (
                          <Link
                            to="/blogs/$blogSlug"
                            params={{ blogSlug: post.slug }}
                            className="block"
                          >
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              loading="lazy"
                              decoding="async"
                              className="aspect-[4/3] w-full object-cover"
                            />
                          </Link>
                        ) : null}
                        <div className="p-5">
                          <p className="font-general text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                            {formatBlogDate(post.publishedAt)}
                          </p>
                          <h3 className="mt-3 font-playfair text-2xl font-semibold text-foreground">
                            <Link
                              to="/blogs/$blogSlug"
                              params={{ blogSlug: post.slug }}
                              className="transition-colors hover:text-[oklch(0.65_0.12_75)]"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <p className="mt-2 font-general text-sm leading-relaxed text-muted-foreground">
                            {post.excerpt}
                          </p>
                          <Link
                            to="/blogs/$blogSlug"
                            params={{ blogSlug: post.slug }}
                            className="mt-5 inline-flex items-center gap-2 font-general text-xs font-semibold uppercase tracking-[0.18em]"
                            style={{ color: "oklch(0.65 0.12 75)" }}
                          >
                            Read Next
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}
            </>
          ) : (
            <div
              className="rounded-[32px] bg-white px-8 py-16 text-center"
              style={{ border: "1px solid oklch(0.9 0.015 82)" }}
            >
              <h1 className="font-playfair text-3xl font-semibold text-foreground">
                Blog article not found
              </h1>
              <p className="mx-auto mt-4 max-w-2xl font-general text-sm leading-relaxed text-muted-foreground">
                The article you&apos;re looking for is not available at the
                moment. Please return to the journal to continue exploring our
                latest insights and design guidance.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
