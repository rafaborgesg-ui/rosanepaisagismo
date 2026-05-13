import { useState } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";
import { trackEvent } from "@/lib/tracking";

const WHATSAPP = "5538999313930";

const steps = [
  {
    key: "estilo",
    question: "Qual estética combina mais com seu imóvel?",
    options: ["Tropical sofisticado", "Contemporâneo minimalista", "Resort com piscina", "Ainda não sei"],
  },
  {
    key: "espaco",
    question: "Qual espaço você quer transformar?",
    options: ["Casa completa", "Área gourmet e piscina", "Fachada", "Clínica ou empresa"],
  },
  {
    key: "investimento",
    question: "Qual faixa de investimento você imagina?",
    options: ["Até R$ 15 mil", "R$ 15 mil a R$ 30 mil", "R$ 30 mil a R$ 80 mil", "Acima de R$ 80 mil"],
  },
  {
    key: "prazo",
    question: "Quando quer começar?",
    options: ["Agora", "Nos próximos 30 dias", "Em até 3 meses", "Estou planejando"],
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
          <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#b28a28]">Qualificação automática</p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-tight md:text-7xl">
            Descubra o caminho ideal para transformar seu jardim.
          </h1>
          <p className="mt-6 max-w-xl leading-8 text-stone-600">
            O quiz ajuda a entender estilo, espaço, investimento e prazo. No final, você envia tudo pronto pelo WhatsApp para agilizar o atendimento.
          </p>
          <Link to="/contato" className="mt-8 text-xs font-extrabold uppercase tracking-[0.2em] text-[#b28a28] underline decoration-[#d7ae45] decoration-2 underline-offset-8">
            Prefiro preencher o briefing completo
          </Link>
        </section>

        <section className="flex items-center">
          <div className="w-full rounded-[30px] border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/70 md:p-10">
            {!done ? (
              <>
                <div className="mb-9 flex gap-2">
                  {steps.map((item, index) => (
                    <div key={item.key} className={`h-2 flex-1 rounded-full ${index <= step ? "bg-[#d7ae45]" : "bg-stone-100"}`} />
                  ))}
                </div>
                <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-stone-400">Pergunta {step + 1} de {steps.length}</p>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">{steps[step].question}</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {steps[step].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => selectOption(option)}
                      className="rounded-2xl border-2 border-stone-100 bg-[#fbfaf6] p-5 text-left font-bold text-[#173727] transition hover:border-[#d7ae45] hover:bg-white"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={sendLead} className="space-y-6">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#b28a28]">Perfil mapeado</p>
                  <h2 className="mt-4 font-display text-4xl font-bold leading-tight">Para enviar seu diagnóstico, deixe seus dados.</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <input required value={lead.nome} onChange={(event) => setLead((current) => ({ ...current, nome: event.target.value }))} placeholder="Seu nome" className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 outline-none focus:border-[#b28a28]" />
                  <input required value={lead.whatsapp} onChange={(event) => setLead((current) => ({ ...current, whatsapp: event.target.value }))} placeholder="WhatsApp" className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 outline-none focus:border-[#b28a28]" />
                </div>
                <input required value={lead.cidade} onChange={(event) => setLead((current) => ({ ...current, cidade: event.target.value }))} placeholder="Cidade e bairro" className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 outline-none focus:border-[#b28a28]" />
                <div className="rounded-2xl bg-[#fbfaf6] p-5 text-sm leading-7 text-stone-600">
                  <strong className="text-[#173727]">Resumo:</strong> {answers.estilo}, {answers.espaco}, {answers.investimento}, {answers.prazo}.
                </div>
                <button className="w-full rounded-full bg-[#d7ae45] px-8 py-5 text-xs font-extrabold uppercase tracking-[0.22em] text-[#173727] hover:bg-[#173727] hover:text-white">
                  Enviar pelo WhatsApp
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
