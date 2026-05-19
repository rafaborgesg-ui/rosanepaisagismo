import { motion } from "framer-motion";
import { process } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";
import { useLandingContent } from "@/hooks/useLandingContent";
import PremiumLink from "@/components/landing/home/PremiumLink";

export default function MethodSection({ reducedMotion = false }) {
  const content = useLandingContent();
  const homeTexts = content?.home_texts || {};

  return (
    <section id="metodo" className="relative bg-[#081009] px-5 py-section-md text-white md:px-10">
      {/* Grain texture */}
      <div className="rb-grain absolute inset-0" />

      <div className="relative mx-auto grid w-[min(100%,1320px)] gap-16 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#d3b473]">
            {homeTexts.method_label || "Processo criativo"}
          </p>
          <h2 className="mt-6 font-heading text-[clamp(2.8rem,6vw,6.2rem)] font-medium leading-[0.9]">
            {homeTexts.method_title || "Um fluxo claro entre conceito, técnica e implantação."}
          </h2>
          <p className="mt-9 max-w-lg text-lg font-light leading-9 text-white/60">
            {homeTexts.method_text ||
              "O processo protege o resultado final do jardim: reduz ruídos, organiza decisões e transforma atmosfera em direção executiva."}
          </p>
          <div className="mt-12">
            <PremiumLink to="/contato" variant="outline">
              Conversar sobre meu projeto
            </PremiumLink>
          </div>
        </div>
        <div className="grid border-t border-white/12">
          {process.map((step, index) => (
            <motion.div
              key={step.title}
              {...getInViewProps(reducedMotion, {
                axis: "x",
                offset: 28,
                margin: "-80px",
                delay: reducedMotion ? 0 : index * 0.06,
                duration: 0.65,
              })}
              className="group grid gap-5 border-b border-white/10 py-9 md:grid-cols-[5rem_1fr]"
            >
              <span className="font-heading text-[3.2rem] font-medium leading-none text-[#d3b473]/70 transition-colors duration-500 group-hover:text-[#d3b473] md:text-[3.6rem]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-heading text-[1.7rem] font-medium leading-none text-white transition-colors duration-500 group-hover:text-[#d3b473]/90 md:text-[2rem]">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-2xl text-base font-light leading-8 text-white/56">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
