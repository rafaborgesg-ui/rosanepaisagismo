import { motion } from "framer-motion";
import { deliverables, labelClass } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";
import { useLandingContent } from "@/hooks/useLandingContent";

export default function DeliverablesSection({ reducedMotion = false }) {
  const content = useLandingContent();
  const homeTexts = content?.home_texts || {};
  const items = Array.isArray(homeTexts.deliverables_items) && homeTexts.deliverables_items.length
    ? homeTexts.deliverables_items
    : deliverables;

  return (
    <section className="bg-[#f3eee4] px-5 py-section-md md:px-10">
      <div className="mx-auto grid w-[min(100%,1320px)] gap-16 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="max-w-3xl">
          <p className={labelClass}>{homeTexts.deliverables_label || "Direção técnica"}</p>
          <h2 className="mt-6 font-heading text-[clamp(2.8rem,6vw,6.2rem)] font-medium leading-[0.9] text-[#111913]">
            {homeTexts.deliverables_title || "Cada detalhe nasce para orientar a obra."}
          </h2>
          <p className="mt-9 text-lg font-light leading-9 text-[#4b5248]">
            {homeTexts.deliverables_text ||
              "O projeto não termina em uma imagem bonita. Ele entrega clareza de implantação, especificação e manutenção para que o jardim amadureça com consistência."}
          </p>
        </div>
        <div className="grid border-t border-[#d8cdbb] sm:grid-cols-2">
          {items.map((item, index) => (
            <motion.article
              key={item}
              {...getInViewProps(reducedMotion, {
                offset: 22,
                margin: "-80px",
                delay: reducedMotion ? 0 : index * 0.04,
                duration: 0.62,
              })}
              className="group min-h-40 border-b border-[#d8cdbb] p-6 transition-colors duration-500 hover:bg-[#ebe2d3]/40 sm:border-r sm:odd:border-l-0 sm:even:border-r-0 md:p-8"
            >
              <p className="font-heading text-3xl text-[#8a6e42] transition-transform duration-500 group-hover:translate-x-1">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-5 text-sm leading-7 text-[#3f473e] md:text-base">{item}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
