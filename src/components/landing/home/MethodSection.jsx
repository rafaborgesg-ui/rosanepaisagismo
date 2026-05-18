import { motion } from "framer-motion";
import { process } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";
import { useLandingContent } from "@/hooks/useLandingContent";

export default function MethodSection({ reducedMotion = false }) {
  const content = useLandingContent();
  const homeTexts = content?.home_texts || {};

  return (
    <section id="metodo" className="bg-[#101812] px-4 py-20 text-white md:py-28">
      <div className="mx-auto grid w-[min(100%,1180px)] gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
            {homeTexts.method_label || "Método"}
          </p>
          <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
            {homeTexts.method_title || "Um fluxo claro entre conceito, técnica e implantação."}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/68">
            {homeTexts.method_text ||
              "O objetivo é reduzir ruído nas decisões e proteger o resultado final do jardim, da primeira reunião até a fase de maturação."}
          </p>
        </div>
        <div className="grid gap-4">
          {process.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                {...getInViewProps(reducedMotion, {
                  axis: "x",
                  offset: 24,
                  margin: "-80px",
                  delay: reducedMotion ? 0 : index * 0.06,
                  duration: 0.62,
                })}
                className="grid grid-cols-[3rem_1fr] gap-5 border-b border-white/12 pb-5"
              >
                <span className="font-heading text-3xl font-medium text-[#d3b473]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-[#d3b473]" aria-hidden="true" />
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </div>
                  <p className="mt-2 leading-7 text-white/62">{step.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
