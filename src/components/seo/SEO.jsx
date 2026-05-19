import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "",
  description = "",
  keywords = "",
  image = "https://rosanepaisagismo.vercel.app/brand/PAISAGISMO-PRISCILLA-ROSANE_p6_i2.jpg",
  url = "https://rosanepaisagismo.vercel.app",
  type = "website",
  schema = null,
} = {}) {
  const baseTitle = "Rosane Borges Paisagismo | Escritório Boutique de Paisagismo";
  const finalTitle = title ? `${title} | Rosane Borges` : baseTitle;

  const finalDesc =
    description ||
    "Projetos de paisagismo autoral de alto padrão. Arquitetura e curadoria botânica para residências premium, clínicas e empreendimentos. Agende uma consultoria especializada.";

  const finalKeywords =
    keywords ||
    "paisagismo alto padrão, paisagismo residencial de luxo, escritório boutique paisagismo, jardim contemporâneo, projeto paisagístico, rosane borges";

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
