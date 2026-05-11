import { Helmet } from "react-helmet-async";

export default function SEO({ 
  title, 
  description, 
  keywords, 
  image = "https://rosanepaisagismo.com/og-image.jpg", 
  url = "https://rosanepaisagismo.com",
  type = "website",
  schema 
}) {
  const baseTitle = "Rosane Paisagismo | Paisagismo de Alto Padrão em São Paulo e MG";
  const finalTitle = title ? `${title} | Rosane Paisagismo` : baseTitle;
  
  const defaultDesc = "Paisagismo de alto padrão que valoriza arquitetura e transforma imóveis. Projetos autorais em São Paulo e Minas Gerais.";
  const finalDesc = description || defaultDesc;

  const defaultKeywords = "paisagismo alto padrão, paisagista em são paulo, projeto de paisagismo residencial, paisagismo corporativo, jardim tropical, área gourmet, rosane paisagismo";
  const finalKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDesc} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDesc} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
