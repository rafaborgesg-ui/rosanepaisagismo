import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { labelClass } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";
import { useLandingContent } from "@/hooks/useLandingContent";

const boutiqueDefault = (value, previousDefault, nextDefault) => {
  if (!value || value === previousDefault) return nextDefault;
  return value;
};

export default function FounderSection({ reducedMotion = false }) {
  const content = useLandingContent();
  const sobreTitulo = boutiqueDefault(
    content?.sobre_titulo,
    "Autoria botânica com base científica e olhar de arquitetura.",
    "Autoria botânica com ciência, obra e olhar de arquitetura."
  );
  const sobreFrase = boutiqueDefault(
    content?.sobre_frase,
    "Rosane une Doutorado em Produção Vegetal, formação em agronomia e experiência de campo para criar jardins com presença, longevidade e leitura arquitetônica.",
    "Rosane une Doutorado em Produção Vegetal, formação em agronomia e experiência de campo para criar jardins de presença silenciosa, longevidade e precisão arquitetônica."
  );
  const sobreTexto = boutiqueDefault(
    content?.sobre_texto,
    "A assinatura nasce da curadoria de espécies, da proporção dos volumes e da forma como o espaço será vivido ao longo dos anos.",
    "A assinatura nasce da escolha das espécies, da proporção dos volumes e da forma como o espaço amadurece com a rotina."
  );

  return (
    <section id="sobre" className="bg-[#f3eee4] px-5 py-section-md md:px-10">
      <div className="mx-auto grid w-[min(100%,1320px)] gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <motion.figure
          {...getInViewProps(reducedMotion, { offset: 26 })}
          className="rb-founder-image relative overflow-visible bg-[#111913]"
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
            {sobreTitulo}
          </h2>
          <p className="mt-9 max-w-3xl text-lg font-light leading-9 text-[#3f473e] md:text-xl">
            {sobreFrase}{" "}
            {sobreTexto}
          </p>
          <p className="mt-6 max-w-2xl border-l border-[#bda36f]/50 pl-5 text-base font-light leading-8 text-[#5b6258] md:text-lg">
            Uma abordagem de atelier: menos fórmulas prontas, mais interpretação do imóvel, da luz, da rotina e do valor que o jardim deve acrescentar à arquitetura.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-10 border-b border-[#d8cdbb] pb-8">
            {[
              ["Doutorado", "Produção Vegetal"],
              ["500+", "projetos e estudos"],
              ["15+", "anos de experiência"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-heading text-4xl font-medium text-[#8a6e42]">{value}</p>
                <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#5f665c]">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-0 border-b border-[#d8cdbb]">
            {[
              "Engenheira Agrônoma, Doutorado em Produção Vegetal e diretora criativa do escritório.",
              "Projetos residenciais, clínicas premium, fachadas vivas e áreas de permanência.",
              "Curadoria botânica com diagnóstico de solo, luz, escala, manutenção e obra real.",
              "Acompanhamento consultivo do conceito à maturação do jardim implantado.",
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
