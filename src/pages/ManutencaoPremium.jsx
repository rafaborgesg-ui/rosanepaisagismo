import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const routines = [
  "Poda técnica e condução estética",
  "Adubação e nutrição vegetal",
  "Controle preventivo de pragas",
  "Reposição de espécies e acabamentos",
  "Ajustes sazonais de irrigação",
  "Relatório de cuidados e prioridades",
];

export default function ManutencaoPremium() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Manutenção Premium de Jardins"
        description="Planos de manutenção premium para jardins residenciais, áreas gourmet, clínicas, condomínios e empresas."
        keywords="manutenção de jardim premium, manutenção paisagismo, manutenção jardim residencial, manutenção jardim Montes Claros"
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <SiteNav activeLink="manutencao" />

      <main className="font-body">
        <section className="relative min-h-[92vh] overflow-hidden bg-[#173727] pt-28 text-white">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1920" 
            alt="Manutenção premium de jardim" 
            className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-overlay" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/86 to-[#173727]/22" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto grid min-h-[74vh] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8"
          >
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Gestão de Patrimônio Botânico</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">
                O design de luxo exige preservação impecável.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80">
                A verdadeira arquitetura de exteriores ganha valor com o tempo. Nossos planos de manutenção garantem a estética, a saúde vegetal e o padrão resort da sua área externa.
              </p>
              <Link to="/contato?interesse=Manutencao+Premium" className="mt-10 inline-block rounded-full bg-[#d7ae45] px-10 py-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-xl transition-all hover:scale-105 hover:bg-white">
                Solicitar Plano de Manutenção
              </Link>
            </div>
            <aside className="rounded-[32px] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">Protocolo de Cuidados</p>
              <div className="mt-6 space-y-4">
                {routines.map((item, index) => (
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
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Escopo de Atuação</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl text-[#173727]">Especialistas na manutenção de alto padrão.</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ["Residências Exclusivas", "Para casas, áreas gourmet e jardins sociais que exigem discrição e rigor estético constante."],
              ["Clínicas de Luxo", "Manutenção focada na primeira impressão, essencial para espaços de saúde e bem-estar de alto ticket."],
              ["Condomínios Premium", "Gestão botânica para áreas comuns e fachadas, valorizando o metro quadrado de todos os moradores."],
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
                <h2 className="font-display text-2xl font-bold text-[#173727]">{title}</h2>
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
            <p className="text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Avaliação Técnica</p>
            <h2 className="mt-6 font-display text-5xl font-bold leading-tight md:text-6xl">Agende uma visita técnica de manutenção.</h2>
            <Link to="/contato?interesse=Manutencao+Premium" className="mt-12 inline-block rounded-full bg-[#d7ae45] px-12 py-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-2xl transition-all hover:scale-105 hover:bg-white">
              Solicitar Orçamento
            </Link>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
