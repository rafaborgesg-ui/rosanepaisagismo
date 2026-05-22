import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { labelClass } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";
import { useLandingContent } from "@/hooks/useLandingContent";

export default function FounderSection({ reducedMotion = false }) {
  const content = useLandingContent();

  return (
    <section id="sobre" className="bg-[#f3eee4] px-5 py-section-md md:px-10">
      <div className="mx-auto grid w-[min(100%,1320px)] gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <motion.figure
          {...getInViewProps(reducedMotion, { offset: 26 })}
          className="rb-cinematic-image relative overflow-hidden bg-[#111913]"
        >
          <img
            src={content?.sobre_imagem_url || "/brand/rosane-borges.jpg"}
            alt="Rosane Borges — paisagista, engenheira agrônoma e diretora criativa"
            className="h-[560px] w-full object-cover grayscale-[8%] md:h-[740px]"
          />
        </motion.figure>

        <motion.div {...getInViewProps(reducedMotion, { offset: 26, blur: true })} className="lg:pl-6">
          <p className={labelClass}>{content?.sobre_cargo || "Rosane Borges"}</p>
          <h2 className="mt-6 font-heading text-[clamp(2.8rem,6.2vw,6.8rem)] font-medium leading-[0.9] text-[#111913]">
            {content?.sobre_titulo || "Natureza, arquitetura e sensibilidade em equilíbrio."}
          </h2>
          <p className="mt-9 max-w-3xl text-lg font-light leading-9 text-[#3f473e] md:text-xl">
            {content?.sobre_frase ||
              "Rosane une formação em agronomia, doutorado em Produção Vegetal e experiência de campo para desenhar jardins que amadurecem com elegância."}{" "}
            {content?.sobre_texto ||
              "Cada escolha considera solo, insolação, espécie, escala, manutenção e a forma como o jardim será vivido ao longo do tempo."}
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-10 border-b border-[#d8cdbb] pb-8">
            {[
              ["15+", "anos de experiência"],
              ["200+", "projetos entregues"],
              ["MG & SP", "atuação"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-heading text-4xl font-medium text-[#8a6e42]">{value}</p>
                <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#5f665c]">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-0 border-b border-[#d8cdbb]">
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
