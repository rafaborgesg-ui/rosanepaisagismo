import { motion } from "framer-motion";
import { labelClass } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";
import PremiumLink from "@/components/landing/home/PremiumLink";

export default function ManifestoSection({ reducedMotion = false }) {
  return (
    <section className="rb-section-divider relative overflow-hidden bg-[#f3eee4] px-5 py-section-md md:px-10">
      <div className="mx-auto grid w-[min(100%,1320px)] gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div {...getInViewProps(reducedMotion, { offset: 26, blur: true })} className="max-w-4xl">
          <p className={labelClass}>Manifesto</p>
          <h2 className="mt-6 font-heading text-[clamp(3rem,6.6vw,6.8rem)] font-medium leading-[0.88] text-[#111913]">
            Natureza, arquitetura e sensibilidade em equilíbrio.
          </h2>
          <p className="mt-9 max-w-3xl text-lg font-light leading-9 text-[#3f473e] md:text-xl">
            Jardim de alto padrão não é decoração final. É arquitetura viva:
            organiza circulação, sombra, privacidade e atmosfera para que a casa
            seja vivida com mais beleza, frescor e permanência.
          </p>
          <div className="mt-14 grid border-y border-[#d8cdbb] sm:grid-cols-2">
            {[
              ["Precisão botânica", "Espécies definidas por clima, solo, insolação e manutenção real."],
              ["Escala arquitetônica", "Composição vegetal desenhada para fachada, percurso e proporção."],
              ["Conforto e permanência", "Sombra, frescor, privacidade e áreas externas feitas para uso."],
              ["Curadoria técnica", "Materiais, fornecedores e implantação orientada por projeto executivo."],
            ].map(([title, text]) => (
              <div key={title} className="border-b border-[#d8cdbb] py-7 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8 [&:nth-last-child(-n+2)]:sm:border-b-0">
                <h3 className="font-heading text-[1.72rem] font-medium text-[#111913]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f665c]">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <PremiumLink to="/contato">Solicitar uma proposta autoral</PremiumLink>
          </div>
        </motion.div>

        <motion.figure
          {...getInViewProps(reducedMotion, { offset: 30, duration: 0.78 })}
          className="rb-cinematic-image relative overflow-hidden bg-[#111913] shadow-[0_36px_96px_rgba(36,35,28,0.14)]"
        >
          <img
            src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p8_i1.jpg"
            alt="Jardim vertical em projeto residencial autoral"
            className="h-[520px] w-full object-cover opacity-90 grayscale-[6%] md:h-[700px]"
          />
        </motion.figure>
      </div>
    </section>
  );
}
