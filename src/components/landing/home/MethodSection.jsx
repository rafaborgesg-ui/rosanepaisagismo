import { motion } from "framer-motion";
import { process } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";
import { useLandingContent } from "@/hooks/useLandingContent";

export default function MethodSection({ reducedMotion = false }) {
  const content = useLandingContent();
  const homeTexts = content?.home_texts || {};

  return (
    <section id="metodo" className="bg-[#081009] px-5 py-24 text-white md:px-10 md:py-36">
      <div className="mx-auto grid w-[min(100%,1320px)] gap-16 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#d3b473]">
            {homeTexts.method_label || "Processo criativo"}
          </p>
          <h2 className="mt-5 font-heading text-[clamp(3rem,6.4vw,6.6rem)] font-medium leading-[0.9]">
            {homeTexts.method_title || "Um fluxo claro entre conceito, técnica e implantação."}
          </h2>
          <p className="mt-8 max-w-lg text-lg font-light leading-9 text-white/66">
            {homeTexts.method_text ||
              "O processo protege o resultado final do jardim: reduz ruídos, organiza decisões e transforma atmosfera em direção executiva."}
          </p>
        </div>
        <div className="grid border-t border-white/14">
          {process.map((step, index) => (
            <motion.div
              key={step.title}
              {...getInViewProps(reducedMotion, {
                axis: "x",
                offset: 24,
                margin: "-80px",
                delay: reducedMotion ? 0 : index * 0.05,
                duration: 0.62,
              })}
              className="grid gap-5 border-b border-white/14 py-8 md:grid-cols-[5rem_1fr]"
            >
              <span className="font-heading text-5xl font-medium text-[#d3b473] md:text-6xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-heading text-3xl font-medium leading-none text-white md:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base font-light leading-8 text-white/62">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
