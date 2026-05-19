import { motion } from "framer-motion";
import { labelClass } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";
import PremiumLink from "@/components/landing/home/PremiumLink";

export default function ManifestoSection({ reducedMotion = false }) {
  return (
    <section className="relative overflow-hidden bg-[#f3eee4] px-5 py-24 md:px-10 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#d8cdbb]" aria-hidden="true" />
      <div className="mx-auto grid w-[min(100%,1320px)] gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div {...getInViewProps(reducedMotion, { offset: 26 })} className="max-w-4xl">
          <p className={labelClass}>Manifesto</p>
          <h2 className="mt-5 font-heading text-[clamp(3.2rem,7vw,7.2rem)] font-medium leading-[0.88] text-[#111913]">
            Natureza, arquitetura e sensibilidade em equilíbrio.
          </h2>
          <p className="mt-8 max-w-3xl text-lg font-light leading-9 text-[#3f473e] md:text-xl">
            Jardim de alto padrão não é decoração final. É arquitetura viva:
            organiza circulação, sombra, privacidade e atmosfera para que a casa
            seja vivida com mais beleza, frescor e permanência.
          </p>
          <div className="mt-12 grid border-y border-[#d8cdbb] sm:grid-cols-2">
            {[
              ["Precisão botânica", "Espécies definidas por clima, solo, insolação e manutenção real."],
              ["Escala arquitetônica", "Composição vegetal desenhada para fachada, percurso e proporção."],
              ["Conforto e permanência", "Sombra, frescor, privacidade e áreas externas feitas para uso."],
              ["Curadoria técnica", "Materiais, fornecedores e implantação orientada por projeto executivo."],
            ].map(([title, text]) => (
              <div key={title} className="border-b border-[#d8cdbb] py-6 sm:odd:border-r sm:odd:pr-7 sm:even:pl-7 [&:nth-last-child(-n+2)]:sm:border-b-0">
                <h3 className="font-heading text-3xl font-medium text-[#111913]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f665c]">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <PremiumLink to="/contato">Solicitar uma proposta autoral</PremiumLink>
          </div>
        </motion.div>

        <motion.figure
          {...getInViewProps(reducedMotion, { offset: 30, duration: 0.78 })}
          className="relative overflow-hidden bg-[#111913] shadow-[0_36px_96px_rgba(36,35,28,0.14)]"
        >
          <img
            src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p8_i1.jpg"
            alt="Jardim vertical em projeto residencial autoral"
            loading="lazy"
            decoding="async"
            className="h-[520px] w-full object-cover opacity-92 grayscale-[6%] transition duration-1000 hover:scale-[1.025] md:h-[680px]"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#081009]/82 to-transparent px-6 pb-6 pt-24 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/62">
            Arquitetura viva, textura e permanência
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
