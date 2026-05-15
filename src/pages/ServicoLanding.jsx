import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const WHATSAPP = "5538999313930";

const services = {
  "paisagismo-residencial": {
    title: "Paisagismo Residencial Premium",
    subtitle: "Jardins, fachadas, piscinas e áreas gourmet com assinatura botânica.",
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=1920",
    bullets: ["Fachadas de impacto", "Áreas externas funcionais", "Curadoria botânica", "Implantação orientada"],
    investment: "Projetos indicados a partir de R$ 25 mil",
  },
  "paisagismo-corporativo": {
    title: "Paisagismo Corporativo e Clínicas",
    subtitle: "Biofilia aplicada à percepção de marca, acolhimento e bem-estar.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920",
    bullets: ["Recepções e fachadas", "Ambientes de espera", "Baixa manutenção", "Experiência do cliente"],
    investment: "Projetos indicados a partir de R$ 20 mil",
  },
  "jardins-verticais": {
    title: "Jardins Verticais",
    subtitle: "Soluções verdes para paredes, varandas, coberturas e fachadas compactas.",
    image: "https://images.unsplash.com/photo-1598516091216-c3059871bbbb?auto=format&fit=crop&q=80&w=1920",
    bullets: ["Aproveitamento de espaço", "Sistema de irrigação", "Textura botânica", "Impacto visual imediato"],
    investment: "Projetos indicados a partir de R$ 15 mil",
  },
};

const fallback = {
  title: "Projeto de Paisagismo Premium",
  subtitle: "Uma solução sob medida para transformar o espaço externo em valor percebido.",
  image: "https://images.unsplash.com/photo-1558904541-efa8c1965f9d?auto=format&fit=crop&q=80&w=1920",
  bullets: ["Diagnóstico", "Projeto autoral", "Curadoria de espécies", "Execução planejada"],
  investment: "Avaliação personalizada por briefing",
};

export default function ServicoLanding() {
  const { id } = useParams();
  const data = services[id] || fallback;
  const message = encodeURIComponent(`Olá, Rosane. Vim pela página ${data.title} e quero um diagnóstico.`);

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title={data.title}
        description={`${data.subtitle} ${data.investment}.`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: data.title,
          description: data.subtitle,
          provider: {
            "@type": "LocalBusiness",
            name: "Rosane Paisagismo",
            areaServed: ["Minas Gerais", "São Paulo"],
          },
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
        <section className="relative min-h-[100vh] overflow-hidden bg-[#173727] pt-28 text-white">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src={data.image} 
            alt={data.title} 
            className="absolute inset-0 h-full w-full object-cover opacity-40" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/85 to-[#173727]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173727] via-transparent to-[#173727]/30" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto grid min-h-[74vh] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8"
          >
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-[#d7ae45]">Projetos de Assinatura</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-[5rem] md:leading-[1.02]">{data.title}</h1>
              <p className="mt-7 max-w-xl text-[1.1rem] leading-[1.85] text-white/75 font-light">{data.subtitle}</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to={`/contato?interesse=${encodeURIComponent(data.title)}`} className="rounded-full bg-[#d7ae45] px-10 py-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-xl transition-all hover:scale-105 hover:bg-white">
                  Solicitar Projeto de Assinatura
                </Link>
                <a href={`https://wa.me/${WHATSAPP}?text=${message}`} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 px-10 py-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white transition-all hover:border-[#d7ae45] hover:text-[#d7ae45] hover:scale-105">
                  Falar no WhatsApp
                </a>
              </div>
            </div>
            <aside className="rounded-[32px] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">Arquitetura Botânica</p>
              <div className="mt-6 space-y-4">
                {data.bullets.map((item, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    key={item} 
                    className="flex items-center gap-4 rounded-2xl bg-white/10 p-5 transition-colors hover:bg-white/20"
                  >
                    <span className="material-symbols-outlined text-[#d7ae45]">check_circle</span>
                    <span className="font-semibold">{item}</span>
                  </motion.div>
                ))}
              </div>
              <p className="mt-8 rounded-2xl bg-[#d7ae45] p-5 text-center text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#173727]">{data.investment}</p>
            </aside>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-32 md:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#d7ae45]">Nosso Processo</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl text-[#173727]">Do conceito à realidade — com excelência em cada etapa.</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ["Avaliabilidade e Diagnóstico", "Compreensão profunda da arquitetura do imóvel, restrições climáticas e intenção de investimento do cliente."],
              ["Design Botânico Autoral", "Seleção de espécies para impacto imediato, estruturação da iluminação cênica e layout de circulação."],
              ["Engenharia de Execução", "Acompanhamento preciso para garantir que o resultado final seja idêntico à experiência prometida no conceito."],
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

        <section className="bg-[#173727] px-5 py-32 text-center text-white md:px-8 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl relative z-10"
          >
            <p className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-[#d7ae45]">Próximo Passo</p>
            <h2 className="mt-6 font-display text-5xl font-bold leading-tight md:text-[4rem] md:leading-[1.1]">Vamos criar algo <span className="italic text-[#d7ae45]">extraordinário?</span></h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/60 font-light">
              O diagnóstico é a primeira etapa para entendermos como elevar seu espaço ao máximo potencial.
            </p>
            <Link to={`/contato?interesse=${encodeURIComponent(data.title)}`} className="mt-12 inline-block rounded-full bg-[#d7ae45] px-12 py-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-2xl transition-all hover:scale-105 hover:bg-white">
              Agendar Avaliação de Imóvel
            </Link>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
