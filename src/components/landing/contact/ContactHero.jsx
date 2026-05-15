import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { fadeUp } from "@/components/landing/contact/contactShared";

export default function ContactHero({
  reducedMotion = false,
  whatsappNumero,
  whatsappMessage,
}) {
  return (
    <section className="relative overflow-hidden bg-[#171914] px-4 pb-20 pt-32 text-white md:pb-28 md:pt-40">
      <img
        src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p6_i2.jpg"
        alt="Estudo de paisagismo residencial"
        className="absolute inset-0 h-full w-full object-cover opacity-72"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,18,14,0.92),rgba(16,18,14,0.44)_55%,rgba(16,18,14,0.82)),linear-gradient(180deg,rgba(16,18,14,0.28),rgba(16,18,14,0.94))]" />
      <motion.div
        initial={reducedMotion ? false : "hidden"}
        animate={reducedMotion ? undefined : "visible"}
        variants={reducedMotion ? undefined : fadeUp}
        className="relative z-10 mx-auto grid w-[min(100%,1180px)] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end"
      >
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
            Atendimento premium
          </p>
          <h1 className="mt-5 max-w-[21rem] font-heading text-[2.55rem] font-medium leading-[0.98] tracking-normal sm:max-w-3xl sm:text-6xl md:text-7xl">
            Vamos desenhar um exterior à altura do seu imóvel.
          </h1>
          <p className="mt-8 max-w-[21rem] text-lg font-light leading-8 text-white/76 sm:max-w-2xl">
            Conte sobre sua casa, clínica, piscina ou área gourmet. A primeira conversa
            identifica potencial, prioridades e o melhor caminho para o projeto.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={`https://wa.me/${whatsappNumero}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473]"
            >
              Falar com especialista
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#briefing"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/34 px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Enviar briefing
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid gap-4 rounded-[8px] border border-white/14 bg-white/9 p-6 backdrop-blur-xl md:grid-cols-3">
          {[
            ["1", "Envie fotos, planta ou referências"],
            ["2", "Receba uma leitura inicial"],
            ["3", "Agende a consultoria estratégica"],
          ].map(([num, text]) => (
            <div key={num} className="border-l border-[#d3b473]/45 pl-4">
              <p className="font-heading text-3xl font-medium text-[#d3b473]">{num}</p>
              <p className="mt-2 text-sm leading-6 text-white/74">{text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
