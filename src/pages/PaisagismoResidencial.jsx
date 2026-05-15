import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const benefits = [
  ["Valorização percebida", "Fachada, entrada, piscina e área gourmet passam a comunicar cuidado, sofisticação e alto padrão."],
  ["Uso real do espaço", "O jardim deixa de ser decoração e passa a organizar convivência, descanso, circulação e contemplação."],
  ["Escolha botânica técnica", "Espécies selecionadas para clima, insolação, manutenção, escala arquitetônica e resultado visual."],
];

const process = [
  "Diagnóstico do imóvel, estilo de vida e investimento",
  "Conceito paisagístico e curadoria de espécies",
  "Projeto visual com setores, volumes e recomendações",
  "Orçamento de implantação e acompanhamento técnico",
];

export default function PaisagismoResidencial() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Paisagismo Residencial Premium"
        description="Projetos de paisagismo residencial de alto padrão para casas, fachadas, piscinas, áreas gourmet e jardins em Minas Gerais e São Paulo."
        keywords="paisagismo residencial premium, jardim para casa alto padrão, paisagismo área gourmet, paisagismo piscina, projeto de jardim residencial"
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <SiteNav activeLink="residencial" />

      <main className="font-body">
        <section className="relative min-h-[92vh] overflow-hidden bg-[#173727] pt-28 text-white">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=1920"
            alt="Paisagismo residencial com jardim e área externa"
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
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Residências de alto padrão</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">
                O seu imóvel elevado a nível de resort particular.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80">
                Projetos autorais para fachadas, piscinas e áreas gourmet. O paisagismo certo não é apenas estético, é a valorização patrimonial imediata da sua casa.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/contato?interesse=Paisagismo+Residencial+Premium" className="rounded-full bg-[#d7ae45] px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-xl hover:bg-white transition-all hover:scale-105">
                  Solicitar Projeto Exclusivo
                </Link>
                <Link to="/portfolio" className="rounded-full border border-white/30 px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-white transition-all hover:border-[#d7ae45] hover:text-[#d7ae45] hover:scale-105">
                  Ver portfólio completo
                </Link>
              </div>
            </div>
            <aside className="rounded-[32px] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">Indicado para</p>
              <div className="mt-6 space-y-4">
                {["Casas em construção ou reforma", "Áreas gourmet e piscinas", "Fachadas e entradas sociais", "Jardins que precisam de manutenção premium"].map((item, index) => (
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
            </aside>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-32 md:px-8">
          <div className="mb-16 max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">O Impacto do Paisagismo</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl text-[#173727]">
              O jardim certo muda como a casa é vista, usada e valorizada.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map(([title, text], index) => (
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

        <section className="bg-[#fbfaf6] border-t border-stone-200 px-5 py-32 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-[32px] shadow-2xl"
            >
              <img src="https://images.unsplash.com/photo-1558904541-efa8c1965f9d?auto=format&fit=crop&q=80&w=1200" alt="Jardim residencial premium" className="h-full min-h-[520px] w-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">O Método</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl text-[#173727]">Da intenção ao jardim 100% executável.</h2>
              <p className="mt-6 text-stone-600 leading-8">Nossa metodologia separa o amador do profissional. Previsibilidade estética e técnica desde a primeira reunião.</p>
              <div className="mt-10 space-y-4">
                {process.map((item, index) => (
                  <div key={item} className="flex gap-5 rounded-2xl border border-stone-100 bg-white p-5 shadow-sm transition-colors hover:border-[#d7ae45]">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#173727] text-sm font-bold text-[#d7ae45]">{index + 1}</span>
                    <p className="font-semibold text-[#173727] leading-7">{item}</p>
                  </div>
                ))}
              </div>
              <Link to="/contato?interesse=Paisagismo+Residencial+Premium" className="mt-10 inline-block rounded-full bg-[#d7ae45] px-10 py-5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-xl hover:bg-[#173727] hover:text-[#d7ae45] transition-all hover:scale-105">
                Começar Meu Projeto
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
