import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { labelClass } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";

export default function FounderSection({ reducedMotion = false }) {
  return (
    <section id="sobre" className="bg-white px-4 py-20 md:py-28">
      <div className="mx-auto grid w-[min(100%,1180px)] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.figure
          {...getInViewProps(reducedMotion, { offset: 26 })}
          className="overflow-hidden rounded-[8px] bg-[#111913]"
        >
          <img
            src="/brand/rosane-borges.jpg"
            alt="Rosane Borges em retrato institucional"
            loading="lazy"
            decoding="async"
            className="h-[620px] w-full object-cover"
          />
        </motion.figure>
        <motion.div {...getInViewProps(reducedMotion, { offset: 26 })}>
          <p className={labelClass}>Rosane Borges</p>
          <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
            Base academica, criterio de obra e leitura sensivel da natureza.
          </h2>
          <p className="mt-7 text-lg leading-8 text-[#4b5248]">
            Rosane une formacao em agronomia, doutorado em Producao Vegetal e
            experiencia de campo para desenhar jardins que amadurecem com elegancia.
            Cada escolha considera solo, insolacao, especie, escala e manutencao
            prevista.
          </p>
          <div className="mt-9 grid gap-3">
            {[
              "Engenheira Agronoma e Paisagista.",
              "Doutora em Producao Vegetal com enfase em plantas ornamentais.",
              "Atuacao desde 2016 em residencias e projetos selecionados.",
              "Projeto e implantacao com orientacao tecnica do inicio ao pos-obra.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 text-[#8a6e42]" aria-hidden="true" />
                <p className="text-[#4b5248]">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
