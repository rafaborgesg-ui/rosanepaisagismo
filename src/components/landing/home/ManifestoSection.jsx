import { motion } from "framer-motion";
import { labelClass } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";

export default function ManifestoSection({ reducedMotion = false }) {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto grid w-[min(100%,1180px)] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div {...getInViewProps(reducedMotion, { offset: 26 })}>
          <p className={labelClass}>Manifesto</p>
          <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
            Jardim de alto padrão não é decoração final. É arquitetura viva.
          </h2>
          <p className="mt-7 text-lg leading-8 text-[#5f665c]">
            Um projeto bem resolvido organiza circulação, sombra, privacidade e
            atmosfera. Ele valoriza o patrimônio, melhora o uso cotidiano e traduz o
            padrão da casa na paisagem.
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {[
              ["Precisão botânica", "Espécies definidas por clima, solo e manutenção."],
              ["Escala arquitetônica", "Composição desenhada para leitura da fachada."],
              ["Conforto e permanência", "Sombra, frescor e uso real dos ambientes."],
              ["Curadoria técnica", "Materiais, fornecedores e implantação orientada."],
            ].map(([title, text]) => (
              <div key={title} className="border-l border-[#c8b88d] pl-4">
                <h3 className="font-semibold text-[#171914]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6b7168]">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.figure
          {...getInViewProps(reducedMotion, { offset: 30, duration: 0.78 })}
          className="overflow-hidden rounded-[8px] bg-[#d9d1bd] shadow-[0_30px_80px_rgba(36,35,28,0.12)]"
        >
          <img
            src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p8_i1.jpg"
            alt="Jardim vertical em projeto residencial"
            loading="lazy"
            decoding="async"
            className="h-[520px] w-full object-cover"
          />
        </motion.figure>
      </div>
    </section>
  );
}
