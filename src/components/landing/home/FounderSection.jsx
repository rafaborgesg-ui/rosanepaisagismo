import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { labelClass } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";
import { useLandingContent } from "@/hooks/useLandingContent";

export default function FounderSection({ reducedMotion = false }) {
  const content = useLandingContent();

  return (
    <section id="sobre" className="bg-[#f3eee4] px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto grid w-[min(100%,1320px)] gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <motion.figure
          {...getInViewProps(reducedMotion, { offset: 26 })}
          className="relative overflow-hidden bg-[#111913]"
        >
          <img
            src={content?.sobre_imagem_url || "/brand/rosane-borges.jpg"}
            alt="Rosane Borges em retrato institucional"
            loading="lazy"
            decoding="async"
            className="h-[560px] w-full object-cover grayscale-[12%] md:h-[720px]"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0b0f0b]/78 to-transparent px-6 pb-6 pt-20 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/68">
            Direção criativa e técnica
          </figcaption>
        </motion.figure>
        <motion.div {...getInViewProps(reducedMotion, { offset: 26 })} className="lg:pl-8">
          <p className={labelClass}>{content?.sobre_cargo || "Rosane Borges"}</p>
          <h2 className="mt-5 font-heading text-[clamp(3.1rem,6.8vw,7.4rem)] font-medium leading-[0.9] text-[#111913]">
            {content?.sobre_titulo || "Natureza, arquitetura e sensibilidade em equilíbrio."}
          </h2>
          <p className="mt-8 max-w-3xl text-lg font-light leading-9 text-[#3f473e] md:text-xl">
            {content?.sobre_frase ||
              "Rosane une formação em agronomia, doutorado em Produção Vegetal e experiência de campo para desenhar jardins que amadurecem com elegância."}{" "}
            {content?.sobre_texto ||
              "Cada escolha considera solo, insolação, espécie, escala, manutenção e a forma como o jardim será vivido ao longo do tempo."}
          </p>
          <div className="mt-10 grid gap-0 border-y border-[#d8cdbb]">
            {[
              "Engenheira Agrônoma, Doutora em Produção Vegetal e Paisagista.",
              "Projetos residenciais, clínicas, fachadas vivas e áreas de permanência.",
              "Curadoria botânica com leitura técnica de obra, solo, luz e manutenção.",
              "Acompanhamento consultivo do conceito ao pós-implantação.",
            ].map((item) => (
              <div key={item} className="grid grid-cols-[1.5rem_1fr] gap-4 border-b border-[#d8cdbb] py-4 last:border-b-0">
                <Check className="mt-1 h-4 w-4 text-[#8a6e42]" aria-hidden="true" />
                <p className="text-sm leading-7 text-[#3f473e] md:text-base">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
