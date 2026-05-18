import { motion } from "framer-motion";
import { FileText } from "lucide-react";
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
    <section className="bg-white px-4 py-20 md:py-28">
      <div className="mx-auto grid w-[min(100%,1180px)] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-3xl">
          <p className={labelClass}>{homeTexts.deliverables_label || "Entregáveis"}</p>
          <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
            {homeTexts.deliverables_title || "O valor do projeto está no que ele entrega para a obra."}
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#4b5248]">
            {homeTexts.deliverables_text ||
              "Cada etapa transforma decisão estética em diretriz técnica. O cliente entende escopo, prazos e caminho de implantação com segurança."}
          </p>
        </div>
        <div className="grid gap-3">
          {items.map((item, index) => (
            <motion.article
              key={item}
              {...getInViewProps(reducedMotion, {
                offset: 22,
                margin: "-80px",
                delay: reducedMotion ? 0 : index * 0.05,
                duration: 0.62,
              })}
              className="flex items-start gap-3 rounded-[8px] border border-[#dfd9cc] bg-[#f8f4eb] p-5"
            >
              <FileText className="mt-1 h-4 w-4 shrink-0 text-[#8a6e42]" aria-hidden="true" />
              <p className="text-[#3f473e]">{item}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
