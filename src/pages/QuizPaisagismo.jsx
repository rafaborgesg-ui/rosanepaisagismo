import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";
import { trackEvent } from "@/lib/tracking";

const WHATSAPP = "5538999313930";

const steps = [
  {
    key: "estilo",
    question: "Qual estética de paisagismo reflete o seu lifestyle?",
    options: ["Tropical Exuberante", "Contemporâneo Minimalista", "Clássico Europeu", "Resort & Área Gourmet"],
  },
  {
    key: "espaco",
    question: "Qual é o principal foco do projeto?",
    options: ["Residência Completa", "Área de Lazer e Piscina", "Fachada e Entrada", "Clínica / Espaço Comercial"],
  },
  {
    key: "investimento",
    question: "Qual a expectativa de investimento para a transformação?",
    options: ["Até R$ 25 mil", "De R$ 25k a R$ 50k", "Acima de R$ 50k", "Preciso de direcionamento"],
  },
  {
    key: "prazo",
    question: "Qual o estágio atual do imóvel?",
    options: ["Pronto para iniciar", "Em fase de obra", "Na planta / Projeto", "Apenas avaliando"],
  },
];

export default function QuizPaisagismo() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [lead, setLead] = useState({ nome: "", whatsapp: "", cidade: "" });

  const done = step >= steps.length;

  const selectOption = (value) => {
    setAnswers((current) => ({ ...current, [steps[step].key]: value }));
    trackEvent("quiz_step_answered", { step: steps[step].key, value });
    setStep((current) => current + 1);
  };

  const sendLead = (event) => {
    event.preventDefault();
    const text = encodeURIComponent(
      `Olá, Rosane. Respondi o quiz de paisagismo e quero um diagnóstico.\n\n` +
      `Nome: ${lead.nome}\n` +
      `WhatsApp: ${lead.whatsapp}\n` +
      `Cidade: ${lead.cidade}\n` +
      `Estilo: ${answers.estilo}\n` +
      `Espaço: ${answers.espaco}\n` +
      `Investimento: ${answers.investimento}\n` +
      `Prazo: ${answers.prazo}`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
    trackEvent("quiz_lead_submitted", {
      estilo: answers.estilo,
      espaco: answers.espaco,
      investimento: answers.investimento,
      prazo: answers.prazo,
      cidade: lead.cidade,
    });
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Quiz de Paisagismo Premium"
        description="Descubra qual estilo de paisagismo combina com seu imóvel e envie um briefing qualificado para a Rosane Paisagismo."
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <SiteNav />

      <main className="mx-auto grid min-h-screen max-w-7xl gap-10 px-5 pb-20 pt-32 font-body md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <section className="flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#b28a28]">Diagnóstico Premium</p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-tight md:text-7xl">
              Descubra o estilo de paisagismo ideal para o seu imóvel.
            </h1>
            <p className="mt-6 max-w-xl leading-8 text-stone-600">
              Em menos de 1 minuto, mapeamos seu perfil para entregar um direcionamento preciso de estilo, viabilidade e próximos passos.
            </p>
            <Link to="/contato" className="mt-8 inline-block text-xs font-extrabold uppercase tracking-[0.2em] text-[#b28a28] underline decoration-[#d7ae45] decoration-2 underline-offset-8 transition-colors hover:text-[#173727]">
              Agendar consultoria direta
            </Link>
          </motion.div>
        </section>

        <section className="flex items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full rounded-[32px] border border-stone-100 bg-white p-6 shadow-2xl shadow-stone-200/50 md:p-12 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-10 flex gap-3">
                    {steps.map((item, index) => (
                      <div key={item.key} className="h-1.5 flex-1 rounded-full bg-stone-100 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: index <= step ? "100%" : "0%" }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-[#d7ae45]" 
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-stone-400">Passo {step + 1} de {steps.length}</p>
                  <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-[#173727] md:text-4xl">{steps[step].question}</h2>
                  <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    {steps[step].options.map((option) => (
                      <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: "#fff", borderColor: "#d7ae45" }}
                        whileTap={{ scale: 0.98 }}
                        key={option}
                        onClick={() => selectOption(option)}
                        className="rounded-[20px] border border-stone-200 bg-[#fbfaf6] p-6 text-left font-semibold text-[#173727] transition-colors shadow-sm hover:shadow-md"
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={sendLead} 
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#173727] text-[#d7ae45] material-symbols-outlined text-3xl mb-4">check</span>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Perfil mapeado com sucesso</p>
                    <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-[#173727]">Para onde enviamos o diagnóstico?</h2>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input required value={lead.nome} onChange={(event) => setLead((current) => ({ ...current, nome: event.target.value }))} placeholder="Seu nome" className="rounded-2xl border border-stone-200 bg-[#fbfaf6] px-5 py-4 text-sm outline-none transition-all focus:border-[#b28a28] focus:bg-white focus:ring-4 focus:ring-[#d7ae45]/10" />
                    <input required value={lead.whatsapp} onChange={(event) => setLead((current) => ({ ...current, whatsapp: event.target.value }))} placeholder="WhatsApp" className="rounded-2xl border border-stone-200 bg-[#fbfaf6] px-5 py-4 text-sm outline-none transition-all focus:border-[#b28a28] focus:bg-white focus:ring-4 focus:ring-[#d7ae45]/10" />
                  </div>
                  <input required value={lead.cidade} onChange={(event) => setLead((current) => ({ ...current, cidade: event.target.value }))} placeholder="Sua Cidade e Estado" className="w-full rounded-2xl border border-stone-200 bg-[#fbfaf6] px-5 py-4 text-sm outline-none transition-all focus:border-[#b28a28] focus:bg-white focus:ring-4 focus:ring-[#d7ae45]/10" />
                  <div className="rounded-2xl border border-[#d7ae45]/20 bg-[#d7ae45]/5 p-5 text-xs leading-6 text-stone-600">
                    <strong className="text-[#173727] block mb-1">Seu Perfil:</strong> {answers.estilo} • {answers.espaco} • {answers.investimento} • {answers.prazo}.
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-full bg-[#173727] px-8 py-5 text-xs font-extrabold uppercase tracking-[0.22em] text-[#d7ae45] shadow-xl transition-colors hover:bg-black"
                  >
                    Solicitar Diagnóstico
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
