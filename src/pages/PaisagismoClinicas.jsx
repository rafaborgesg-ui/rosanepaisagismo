import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const outcomes = [
  ["Confiança na chegada", "A fachada e a recepção comunicam cuidado antes mesmo da consulta começar."],
  ["Experiência do paciente", "O verde reduz frieza, melhora acolhimento e cria lembrança positiva da marca."],
  ["Diferenciação comercial", "Clínicas premium precisam de presença visual compatível com o valor do serviço."],
];

const areas = ["Fachadas", "Recepções", "Jardins internos", "Varandas", "Áreas de espera", "Pontos instagramáveis"];

export default function PaisagismoClinicas() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Paisagismo para Clínicas e Consultórios"
        description="Projetos de paisagismo biofílico para clínicas, consultórios e negócios de saúde que desejam melhorar acolhimento, marca e experiência do paciente."
        keywords="paisagismo para clínicas, paisagismo biofílico, jardim para consultório, fachada de clínica premium, biofilia em clínicas"
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <SiteNav activeLink="clinicas" />

      <main className="font-body">
        <section className="relative min-h-[92vh] overflow-hidden bg-[#173727] pt-28 text-white">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=1920"
            alt="Paisagismo biofílico para clínica premium"
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
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Biofilia Premium & Saúde</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">
                O ambiente também cura, acolhe e vende valor.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80">
                Paisagismo corporativo e biofílico para clínicas de alto padrão. Elevamos a percepção de marca e a experiência do seu paciente desde o primeiro contato na recepção.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/contato?interesse=Paisagismo+para+Clinicas" className="rounded-full bg-[#d7ae45] px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-xl hover:bg-white transition-all hover:scale-105">
                  Solicitar Diagnóstico Comercial
                </Link>
                <Link to="/portfolio" className="rounded-full border border-white/30 px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-white transition-all hover:border-[#d7ae45] hover:text-[#d7ae45] hover:scale-105">
                  Ver portfólio completo
                </Link>
              </div>
            </div>
            <aside className="rounded-[32px] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">Áreas de Intervenção</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {areas.map((item, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    key={item} 
                    className="flex items-center justify-center text-center rounded-2xl bg-white/10 p-4 text-sm font-semibold transition-colors hover:bg-white/20"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </aside>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-32 md:px-8">
          <div className="mb-16 max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Posicionamento de Marca</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl text-[#173727]">
              O paisagismo vira parte da experiência de atendimento.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {outcomes.map(([title, text], index) => (
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
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Estratégia Biofílica</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl text-[#173727]">Sua clínica será lembrada pelo ambiente seguro e acolhedor.</h2>
              <p className="mt-6 leading-8 text-stone-600">
                Um projeto biofílico bem resolvido cria diferenciação imediata e aumenta a coerência entre o alto valor do seu serviço e a percepção visual do espaço. A arquitetura comercial premium exige um verde planejado.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {["Baixa manutenção", "Espécies purificadoras", "Identidade da marca", "Ambientes instagramáveis"].map((item) => (
                  <div key={item} className="flex items-center gap-4 rounded-2xl border border-stone-100 bg-white p-5 shadow-sm transition-colors hover:border-[#d7ae45]">
                    <span className="material-symbols-outlined text-[#d7ae45]">check_circle</span>
                    <span className="font-bold text-[#173727]">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/contato?interesse=Paisagismo+para+Clinicas" className="mt-10 inline-block rounded-full bg-[#173727] px-10 py-5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#d7ae45] shadow-xl hover:bg-black transition-all hover:scale-105">
                Solicitar Diagnóstico Comercial
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-[32px] shadow-2xl"
            >
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200" alt="Clínica premium com paisagismo" className="h-full min-h-[520px] w-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
