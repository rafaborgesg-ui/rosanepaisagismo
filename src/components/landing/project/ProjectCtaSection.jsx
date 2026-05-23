import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/data/premiumProjects";

const steps = [
  {
    key: "atmosphere",
    question: "Qual atmosfera mais se aproxima do seu desejo?",
    options: [
      "Tropical sofisticado",
      "Contemporâneo minimalista",
      "Natural e acolhedor",
      "Resort, piscina e permanência",
    ],
  },
  {
    key: "nature",
    question: "Qual é a natureza do projeto?",
    options: [
      "Residência",
      "Área gourmet ou piscina",
      "Clínica ou corporativo",
      "Condomínio ou empreendimento",
    ],
  },
  {
    key: "investment",
    question: "Qual faixa de investimento deseja considerar?",
    options: [
      "Até R$ 30 mil",
      "R$ 30 mil a R$ 80 mil",
      "R$ 80 mil a R$ 200 mil",
      "Acima de R$ 200 mil",
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

function ChoiceButton({ children, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[58px] border px-5 py-4 text-left text-sm font-semibold transition duration-300 ${
        selected
          ? "border-[#d3b473] bg-[#d3b473] text-[#081009]"
          : "border-white/14 bg-transparent text-white/72 hover:border-[#d3b473] hover:text-white"
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

  const buildMessage = () => [
    "Olá, quero solicitar uma curadoria privada da Rosane Borges Paisagismo.",
    "",
    "Projeto de referência:",
    `Nome: ${project?.title || "-"}`,
    `Categoria: ${project?.category || "-"}`,
    `Área: ${project?.area || "-"}`,
    `Escopo: ${project?.scope || "-"}`,
    `Local/contexto: ${project?.location || "-"}`,
    "",
    "Preferências:",
    `Atmosfera: ${answers.atmosphere || "-"}`,
    `Natureza do projeto: ${answers.nature || "-"}`,
    `Investimento: ${answers.investment || "-"}`,
    "",
    "Contato:",
    `Nome: ${answers.name || "-"}`,
    `WhatsApp: ${answers.whatsapp || "-"}`,
  ].join("\n");

  const sendBriefing = () => {
    if (!canSend) return;
    window.open(buildWhatsAppUrl(buildMessage()), "_blank", "noopener,noreferrer");
    setQuizDone(true);
  };

  return (
    <section
      id="briefing-projeto"
      className="relative overflow-hidden bg-[#081009] px-5 py-24 text-white md:px-10 md:py-36"
    >
      <img
        src={project?.cover}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-22 grayscale"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,16,9,0.94),rgba(8,16,9,0.76)_50%,rgba(8,16,9,0.94))]" />
      <div className="relative mx-auto grid w-[min(100%,1320px)] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="max-w-3xl">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#d3b473]">
            Assessoria privada
          </p>
          <h2 className="mt-5 font-heading text-[clamp(3.1rem,6.8vw,7rem)] font-medium leading-[0.9]">
            Transforme referência em direção autoral.
          </h2>
          <p className="mt-8 max-w-lg text-base font-light leading-8 text-white/68 md:text-lg">
            Responda três pontos de contexto e envie uma mensagem estruturada para uma curadoria privada do seu imóvel.
          </p>
        </div>

        <motion.div
          layout
          className="border border-white/14 bg-white/[0.055] p-6 backdrop-blur-md md:p-9"
        >
          <div className="mb-8 flex gap-2">
            {steps.map((step, index) => (
              <span
                key={step.key}
                className={`h-px flex-1 transition-all duration-300 ${
                  index <= stepIndex ? "bg-[#d3b473]" : "bg-white/16"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {!isContactStep && (
              <motion.div
                key={currentStep.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <h3 className="mb-8 font-heading text-[clamp(2.3rem,4vw,3.4rem)] font-medium leading-[0.96] text-white">
                  {currentStep.question}
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
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
              >
                <h3 className="mb-7 font-heading text-[clamp(2.3rem,4vw,3.4rem)] font-medium leading-[0.96] text-white">
                  Como seguimos com a curadoria?
                </h3>
                <div className="grid gap-3">
                  <input
                    value={answers.name}
                    onChange={(event) => updateAnswer("name", event.target.value)}
                    name="nome"
                    required
                    placeholder="Seu nome completo"
                    className="min-h-12 border border-white/14 bg-black/20 px-5 text-sm text-white outline-none transition placeholder:text-white/34 focus:border-[#d3b473]"
                  />
                  <input
                    value={answers.whatsapp}
                    onChange={(event) => updateAnswer("whatsapp", event.target.value)}
                    name="whatsapp"
                    required
                    placeholder="WhatsApp com DDD"
                    className="min-h-12 border border-white/14 bg-black/20 px-5 text-sm text-white outline-none transition placeholder:text-white/34 focus:border-[#d3b473]"
                  />
                  <button
                    type="submit"
                    disabled={!canSend}
                    className="mt-4 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#081009] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Solicitar curadoria privada
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.form>
            )}

            {quizDone && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="py-8"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#d3b473]">
                  Mensagem preparada
                </p>
                <h3 className="mt-4 font-heading text-4xl font-medium text-white">
                  Tudo certo.
                </h3>
                <p className="mt-4 max-w-md text-sm font-light leading-7 text-white/62">
                  Suas respostas foram estruturadas no WhatsApp com as informações do projeto selecionado.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
