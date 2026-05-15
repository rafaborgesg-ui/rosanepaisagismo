import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const locals = {
  "paisagista-em-montes-claros": {
    title: "Paisagista em Montes Claros",
    city: "Montes Claros",
    description: "Projetos de paisagismo premium em Montes Claros para residências, áreas gourmet, piscinas, fachadas, clínicas e manutenção.",
    keywords: "paisagista em Montes Claros, paisagismo Montes Claros, jardim em Montes Claros, paisagismo residencial Montes Claros",
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=1920",
    regions: ["Ibituruna", "Morada do Sol", "Jardim São Luiz", "Condomínios residenciais", "Clínicas e fachadas comerciais"],
  },
  "paisagismo-em-sao-paulo": {
    title: "Paisagismo em São Paulo",
    city: "São Paulo",
    description: "Projetos de paisagismo de alto padrão em São Paulo para casas, clínicas, fachadas comerciais, áreas gourmet e jardins verticais.",
    keywords: "paisagista em São Paulo, paisagismo São Paulo, paisagismo alto padrão SP, jardim residencial São Paulo",
    image: "https://images.unsplash.com/photo-1558904541-efa8c1965f9d?auto=format&fit=crop&q=80&w=1920",
    regions: ["Residências de alto padrão", "Clínicas premium", "Fachadas comerciais", "Coberturas", "Áreas gourmet"],
  },
  "paisagismo-alto-padrao-mg": {
    title: "Paisagismo Alto Padrão em MG",
    city: "Minas Gerais",
    description: "Paisagismo alto padrão em Minas Gerais com projeto autoral, curadoria botânica, implantação orientada e manutenção premium.",
    keywords: "paisagismo alto padrão MG, paisagista Minas Gerais, projeto de jardim MG, paisagismo premium Minas Gerais",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1920",
    regions: ["Montes Claros", "Condomínios", "Casas de campo", "Clínicas", "Empresas"],
  },
};

export default function LocalLanding({ slug }) {
  const page = locals[slug] || locals["paisagista-em-montes-claros"];

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title={page.title}
        description={page.description}
        keywords={page.keywords}
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Rosane Paisagismo",
          areaServed: page.city,
          telephone: "+55 38 99931-3930",
          description: page.description,
        }}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <SiteNav />

      <main className="font-body">
        <section className="relative min-h-[92vh] overflow-hidden bg-[#173727] pt-28 text-white">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src={page.image} 
            alt={page.title} 
            className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-overlay" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/86 to-[#173727]/25" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto grid min-h-[74vh] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8"
          >
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Arquitetura Externa em {page.city}</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">{page.title}</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80">{page.description}</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to={`/contato?interesse=${encodeURIComponent(page.title)}`} className="rounded-full bg-[#d7ae45] px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-xl hover:bg-white transition-all hover:scale-105">
                  Solicitar Projeto Exclusivo
                </Link>
                <Link to="/quiz-paisagismo" className="rounded-full border border-white/30 px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-white transition-all hover:border-[#d7ae45] hover:text-[#d7ae45] hover:scale-105">
                  Fazer quiz de perfil
                </Link>
              </div>
            </div>
            <aside className="rounded-[32px] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">Áreas de Atendimento</p>
              <div className="mt-6 space-y-4">
                {page.regions.map((item, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    key={item} 
                    className="flex items-center gap-4 rounded-2xl bg-white/10 p-5 transition-colors hover:bg-white/20"
                  >
                    <span className="material-symbols-outlined text-[#d7ae45]">location_on</span>
                    <span className="font-semibold">{item}</span>
                  </motion.div>
                ))}
              </div>
            </aside>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-32 md:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Especialidades na Região</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl text-[#173727]">Transformamos imóveis em patrimônios vivos.</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ["Residencial de Alto Padrão", "Fachadas, áreas gourmet, piscinas e jardins de assinatura com estética resort."],
              ["Clínicas & Arquitetura Comercial", "Biofilia corporativa para acolhimento de pacientes e elevação da percepção de marca."],
              ["Metodologia Executiva", "Previsibilidade total. Do diagnóstico visual à compatibilização técnica com fornecedores."],
            ].map(([title, text], index) => (
              <motion.article 
                key={title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="rounded-[32px] border border-stone-100 bg-white p-10 shadow-xl shadow-stone-200/50 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-[#173727] text-[#d7ae45] flex items-center justify-center font-display text-2xl font-bold mb-6">{index + 1}</div>
                <h3 className="font-display text-2xl font-bold text-[#173727]">{title}</h3>
                <p className="mt-5 text-sm leading-8 text-stone-500">{text}</p>
              </motion.article>
            ))}
          </div>
        </section>
        
        <section className="bg-[#173727] px-5 py-32 text-center text-white md:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Iniciar Conversa</p>
            <h2 className="mt-6 font-display text-5xl font-bold leading-tight md:text-6xl">
              Agende uma consultoria inicial.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Traga o endereço, fotos e expectativas do seu imóvel em {page.city}. Nossa equipe construirá o melhor caminho arquitetônico para você.
            </p>
            <Link to={`/contato?interesse=${encodeURIComponent(page.title)}`} className="mt-12 inline-block rounded-full bg-[#d7ae45] px-10 py-5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-2xl transition-all hover:scale-105 hover:bg-white">
              Solicitar Consultoria
            </Link>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
