import { Helmet } from "react-helmet-async";
import { createSeoPayload, type SeoConfig } from "../lib/seo";

export function SeoHead(config: SeoConfig) {
  const seo = createSeoPayload(config);
  const ogImageAlt = config.title.includes("JPM Enterprises")
    ? config.title
    : `${config.title} | JPM Enterprises`;

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-IN" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content={seo.robots} />
      <meta name="theme-color" content="#b78a4a" />
      <meta property="og:site_name" content="JPM Enterprises" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.canonicalUrl} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:url" content={seo.canonicalUrl} />
      {seo.keywords.length > 0 ? (
        <meta name="keywords" content={seo.keywords.join(", ")} />
      ) : null}
      {seo.author ? <meta name="author" content={seo.author} /> : null}
      {seo.publishedTime ? (
        <meta property="article:published_time" content={seo.publishedTime} />
      ) : null}
      {seo.modifiedTime ? (
        <meta property="article:modified_time" content={seo.modifiedTime} />
      ) : null}
      {seo.tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      <link rel="canonical" href={seo.canonicalUrl} />
      {seo.structuredData.map((entry, index) => (
        <script key={`structured-data-${index}`} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
}
