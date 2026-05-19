import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { fadeUp } from "@/components/landing/contact/contactShared";

export default function ContactHero({
  reducedMotion = false,
  whatsappNumero,
  whatsappMessage,
}) {
  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-[#081009] text-white">
      <img
        src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p6_i2.jpg"
        alt="Estudo de paisagismo residencial"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,16,9,0.9),rgba(8,16,9,0.28)_52%,rgba(8,16,9,0.72)),linear-gradient(180deg,rgba(8,16,9,0.4),rgba(8,16,9,0.05)_42%,rgba(8,16,9,0.9))]" />
      <div className="absolute inset-x-0 bottom-0 h-[28vh] bg-gradient-to-t from-[#081009] to-transparent" />

      <motion.div
        initial={reducedMotion ? false : "hidden"}
        animate={reducedMotion ? undefined : "visible"}
        variants={reducedMotion ? undefined : fadeUp}
        className="relative z-10 mx-auto grid min-h-[92svh] w-[min(100%,1680px)] items-end gap-12 px-5 pb-16 pt-32 md:px-10 md:pb-20 lg:grid-cols-[0.95fr_0.44fr]"
      >
        <div className="max-w-5xl">
          <div className="mb-7 h-px w-28 rb-luxury-hairline" aria-hidden="true" />
          <h1 className="font-heading text-[clamp(3.7rem,8.2vw,9rem)] font-medium leading-[0.88] text-white [text-wrap:balance]">
            Vamos desenhar um exterior à altura do seu imóvel
          </h1>
          <p className="mt-7 max-w-2xl text-base font-light leading-8 text-white/76 md:text-lg">
            Conte sobre sua casa, clínica, piscina ou área gourmet. A primeira conversa
            identifica potencial, prioridades e o melhor caminho para uma proposta autoral.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/${whatsappNumero}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473]"
            >
              Falar com especialista
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#briefing"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/34 px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Enviar briefing
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="hidden border-l border-white/18 pl-7 text-white/72 lg:block">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#d3b473]">
            Como começamos
          </p>
          <div className="mt-6 grid gap-5 border-t border-white/14 pt-6">
            {[
              ["01", "Envie fotos, planta ou referências."],
              ["02", "Receba uma leitura inicial de escopo."],
              ["03", "Agende a consultoria estratégica."],
            ].map(([num, text]) => (
              <div key={num} className="grid grid-cols-[3rem_1fr] gap-4">
                <p className="font-heading text-3xl text-[#d3b473]">{num}</p>
                <p className="text-sm leading-6 text-white/72">{text}</p>
              </div>
            ))}
          </div>
        </aside>
      </motion.div>
    </section>
  );
}
