import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "",
  description = "",
  keywords = "",
  image = "https://rosanepaisagismo-site.vercel.app/og-image.jpg",
  url = "https://rosanepaisagismo-site.vercel.app",
  type = "website",
  schema = null,
} = {}) {
  const baseTitle = "Rosane Borges Paisagismo | Paisagismo de Alto Padrão";
  const finalTitle = title ? `${title} | Rosane Borges Paisagismo` : baseTitle;

  const finalDesc =
    description ||
    "Paisagismo residencial de alto padrão que une natureza, arquitetura e sofisticação em projetos autorais para jardins, piscinas e áreas gourmet.";

  const finalKeywords =
    keywords ||
    "paisagismo residencial, paisagista, projetos de paisagismo, jardim moderno, paisagismo de luxo, paisagismo residencial alto padrão";

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDesc} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={image} />

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
