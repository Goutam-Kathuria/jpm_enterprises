import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SeoHead } from "../components/SeoHead";
import { type CmsSlug, useWebsiteCmsPage } from "../lib/cmsPages";

const labelBySlug: Record<CmsSlug, string> = {
  "about-us": "About Us",
  "contact-us": "Contact Us",
  "privacy-policy": "Privacy Policy",
};

export function CmsPage({ slug }: { slug: CmsSlug }) {
  const { page, isLoading } = useWebsiteCmsPage(slug);
  const title = page?.title || labelBySlug[slug];
  const description = `Read ${title} information from JPM Enterprises.`;

  return (
    <div className="min-h-screen bg-background">
      <SeoHead title={title} description={description} path={`/${slug}`} />
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-28 lg:px-8">
        <section className="rounded-3xl border border-border bg-white px-6 py-8 shadow-sm lg:px-10 lg:py-10">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading page...</p>
          ) : page ? (
            <>
              <h1 className="mb-6 font-playfair text-4xl font-bold text-foreground">
                {title}
              </h1>
              <div
                className="prose max-w-none prose-headings:font-playfair prose-p:font-general"
                dangerouslySetInnerHTML={{ __html: page.content || "<p>No content available.</p>" }}
              />
            </>
          ) : (
            <>
              <h1 className="mb-4 font-playfair text-3xl font-semibold text-foreground">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground">
                This page is currently unavailable.
              </p>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
