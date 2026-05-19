import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { buildWhatsAppUrl } from "@/data/premiumProjects";

const steps = [
  {
    key: "atmosphere",
    question: "Qual atmosfera arquitetonica mais te inspira?",
    options: [
      "Tropical Sofisticado",
      "Minimalista Contemporaneo",
      "Jardim Ingles Classico",
      "Resort & Piscina",
    ],
  },
  {
    key: "nature",
    question: "Qual a natureza do seu projeto?",
    options: [
      "Casa residencial",
      "Cobertura / Apartamento",
      "Clinica / Consultorio",
      "Empresa / Condominio",
    ],
  },
  {
    key: "investment",
    question: "Qual e a sua expectativa de investimento?",
    options: [
      "R$ 15k - R$ 30k",
      "R$ 30k - R$ 80k",
      "R$ 80k - R$ 200k",
      "Acima de R$ 200k",
    ],
  },
];

const initialAnswers = {
  atmosphere: "",
  nature: "",
  investment: "",
  name: "",
  whatsapp: "",
};

function ProgressBars({ currentStep }) {
  return (
    <div className="mb-10 flex justify-center gap-2">
      {steps.map((step, index) => (
        <span
          key={step.key}
          className={`h-1 rounded-full transition-all duration-300 ${
            index <= currentStep ? "w-12 bg-[#c09624]" : "w-5 bg-white/14"
          }`}
        />
      ))}
    </div>
  );
}

function ChoiceButton({ children, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[62px] rounded-xl border px-5 py-4 text-center text-sm font-semibold transition duration-300 ${
        selected
          ? "border-[#c09624] bg-[#c09624] text-white shadow-[0_18px_42px_rgba(0,0,0,0.18)]"
          : "border-white/10 bg-transparent text-white/72 hover:border-[#c09624] hover:bg-white/[0.04] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export default function ProjectCtaSection({ project }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [quizDone, setQuizDone] = useState(false);

  const currentStep = steps[stepIndex];
  const isContactStep = stepIndex === steps.length;
  const canSend = answers.name.trim() && answers.whatsapp.trim();

  const updateAnswer = (key, value) => {
    setAnswers((current) => ({ ...current, [key]: value }));
  };

  const chooseOption = (key, value) => {
    updateAnswer(key, value);
    window.setTimeout(() => {
      setStepIndex((current) => Math.min(current + 1, steps.length));
    }, 160);
  };

  const buildMessage = () => {
    return [
      "Ola, quero solicitar uma analise exclusiva da Rosane Paisagismo.",
      "",
      "Projeto de referencia no portfolio:",
      `Nome: ${project?.title || "-"}`,
      `Categoria: ${project?.category || "-"}`,
      `Area: ${project?.area || "-"}`,
      `Escopo: ${project?.scope || "-"}`,
      `Local/contexto: ${project?.location || "-"}`,
      "",
      "Preferencias do diagnostico:",
      `Atmosfera: ${answers.atmosphere || "-"}`,
      `Natureza do projeto: ${answers.nature || "-"}`,
      `Expectativa de investimento: ${answers.investment || "-"}`,
      "",
      "Contato:",
      `Nome: ${answers.name || "-"}`,
      `WhatsApp: ${answers.whatsapp || "-"}`,
    ].join("\n");
  };

  const sendBriefing = () => {
    if (!canSend) return;
    window.open(buildWhatsAppUrl(buildMessage()), "_blank", "noopener,noreferrer");
    setQuizDone(true);
  };

  return (
    <section
      id="briefing-projeto"
      className="relative min-h-[720px] overflow-hidden px-5 py-20 text-white md:px-10 md:py-24"
      style={{ backgroundColor: "#1a3d2b" }}
    >
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(30deg,#ffffff_12%,transparent_12.5%,transparent_87%,#ffffff_87.5%,#ffffff),linear-gradient(150deg,#ffffff_12%,transparent_12.5%,transparent_87%,#ffffff_87.5%,#ffffff),linear-gradient(30deg,#ffffff_12%,transparent_12.5%,transparent_87%,#ffffff_87.5%,#ffffff),linear-gradient(150deg,#ffffff_12%,transparent_12.5%,transparent_87%,#ffffff_87.5%,#ffffff)] [background-position:0_0,0_0,28px_49px,28px_49px] [background-size:56px_98px]" />
      <div className="relative mx-auto max-w-[920px]">
        <div className="mx-auto mb-12 max-w-[560px] text-center">
          <p className="mb-5 text-[0.64rem] font-bold uppercase tracking-[0.58em] text-[#c09624]">
            Assessoria privada
          </p>
          <h2 className="font-heading text-[clamp(2.95rem,5.4vw,4.85rem)] font-medium leading-[0.87] tracking-normal text-white">
            Receba um diagnostico para a sua propriedade.
          </h2>
        </div>

        <motion.div
          layout
          className="mx-auto max-w-[680px] rounded-[24px] border border-white/10 bg-white/[0.06] px-6 py-12 shadow-[0_30px_90px_rgba(0,0,0,0.18)] backdrop-blur-md md:px-12"
        >
          <AnimatePresence mode="wait">
            {!isContactStep && (
              <motion.div
                key={currentStep.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <ProgressBars currentStep={stepIndex} />
                <h3 className="mx-auto mb-10 max-w-[580px] text-center font-heading text-[clamp(2rem,3.2vw,2.72rem)] font-medium leading-[0.95] tracking-normal text-white">
                  {currentStep.question}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {currentStep.options.map((option) => (
                    <ChoiceButton
                      key={option}
                      selected={answers[currentStep.key] === option}
                      onClick={() => chooseOption(currentStep.key, option)}
                    >
                      {option}
                    </ChoiceButton>
                  ))}
                </div>
              </motion.div>
            )}

            {isContactStep && !quizDone && (
              <motion.form
                key="contact"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                onSubmit={(event) => {
                  event.preventDefault();
                  sendBriefing();
                }}
                className="mx-auto max-w-[574px]"
              >
                <p className="mb-8 text-center font-heading text-3xl font-medium leading-tight tracking-normal text-white">
                  Etapa final. Para onde enviamos seu estudo VIP?
                </p>
                <div className="grid gap-6">
                  <input
                    value={answers.name}
                    onChange={(event) => updateAnswer("name", event.target.value)}
                    name="nome"
                    required
                    placeholder="Seu nome completo"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-6 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-white/30 focus:border-[#c09624]"
                  />
                  <input
                    value={answers.whatsapp}
                    onChange={(event) => updateAnswer("whatsapp", event.target.value)}
                    name="whatsapp"
                    required
                    placeholder="WhatsApp com DDD"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-6 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-white/30 focus:border-[#c09624]"
                  />
                  <button
                    type="submit"
                    disabled={!canSend}
                    className="mt-4 w-full rounded-xl bg-[#c09624] px-6 py-5 text-[0.66rem] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#1a3d2b] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Solicitar Analise Exclusiva
                  </button>
                </div>
              </motion.form>
            )}

            {quizDone && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="py-8 text-center"
              >
                <span className="mb-6 block text-6xl text-[#c09624]" aria-hidden="true">
                  ✓
                </span>
                <h3 className="mb-4 font-heading text-3xl font-medium tracking-normal text-white">Tudo certo!</h3>
                <p className="mx-auto max-w-md text-sm font-light leading-7 text-white/60">
                  Suas respostas foram preparadas para o WhatsApp com as informações do projeto selecionado.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
