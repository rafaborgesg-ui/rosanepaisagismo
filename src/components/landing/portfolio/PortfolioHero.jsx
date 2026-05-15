import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/data/premiumProjects";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PortfolioHero({ reducedMotion = false }) {
  return (
    <header className="relative min-h-[88svh] overflow-hidden bg-[#171914] text-white">
      <img
        src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p6_i2.jpg"
        alt="Estudo de fachada residencial com paisagismo autoral"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,18,14,0.9),rgba(16,18,14,0.34)_55%,rgba(16,18,14,0.68)),linear-gradient(180deg,rgba(16,18,14,0.18),rgba(16,18,14,0.88))]" />
      <motion.div
        initial={reducedMotion ? false : "hidden"}
        animate={reducedMotion ? undefined : "visible"}
        variants={reducedMotion ? undefined : fadeUp}
        className="relative z-10 mx-auto flex min-h-[88svh] w-full max-w-[1180px] flex-col justify-end px-4 pb-12 pt-32 md:pb-16"
      >
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
          Projetos selecionados
        </p>
        <h1 className="mt-5 max-w-[21rem] font-heading text-[2.55rem] font-medium leading-[0.98] tracking-normal sm:max-w-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          Estudos e obras com assinatura botânica.
        </h1>
        <p className="mt-7 max-w-[21rem] text-lg font-light leading-8 text-white/76 sm:max-w-2xl md:text-xl">
          Acervo real com foco em fachada, percurso, permanência e leitura
          arquitetônica da área externa.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href={buildWhatsAppUrl(
              "Olá, quero iniciar uma avaliação inspirada nos projetos selecionados da Rosane Paisagismo.",
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473]"
          >
            Iniciar avaliação
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#galeria"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/34 px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
          >
            Ver acervo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </header>
  );
}
