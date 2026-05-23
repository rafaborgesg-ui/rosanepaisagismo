import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/data/premiumProjects";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function PortfolioHero({ reducedMotion = false }) {
  return (
    <header className="relative min-h-[92svh] overflow-hidden bg-[#081009] text-white">
      <img
        src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p9_i1.jpg"
        alt="Residência de alto padrão com paisagismo autoral"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,16,9,0.78),rgba(8,16,9,0.18)_52%,rgba(8,16,9,0.62)),linear-gradient(180deg,rgba(8,16,9,0.34),rgba(8,16,9,0.04)_42%,rgba(8,16,9,0.86))]" />
      <div className="absolute inset-x-0 bottom-0 h-[28vh] bg-gradient-to-t from-[#081009] to-transparent" />

      <motion.div
        initial={reducedMotion ? false : "hidden"}
        animate={reducedMotion ? undefined : "visible"}
        variants={reducedMotion ? undefined : fadeUp}
        className="relative z-10 mx-auto grid min-h-[92svh] w-[min(100%,1680px)] items-end gap-12 px-5 pb-16 pt-32 md:px-10 md:pb-20 lg:grid-cols-[0.95fr_0.42fr]"
      >
        <div className="max-w-5xl">
          <div className="mb-7 h-px w-28 rb-luxury-hairline" aria-hidden="true" />
          <h1 className="font-heading text-[clamp(3.7rem,8.2vw,9rem)] font-medium leading-[0.88] text-white [text-wrap:balance]">
            Projetos que revelam a arquitetura pela natureza
          </h1>
          <p className="mt-7 max-w-2xl text-base font-light leading-8 text-white/76 md:text-lg">
            Uma seleção editorial de estudos, implantações e jardins autorais em que técnica,
            curadoria botânica e atmosfera trabalham a favor do imóvel.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={buildWhatsAppUrl(
                "Olá, quero conversar sobre um projeto autoral inspirado no portfólio da Rosane Borges Paisagismo.",
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473]"
            >
              Solicitar leitura inicial
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#galeria"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/34 px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Explorar acervo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="hidden border-l border-white/18 pl-7 text-white/68 lg:block">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#d3b473]">
            Leitura de case
          </p>
          <p className="mt-5 text-lg font-light leading-8">
            Cada projeto é apresentado como leitura de contexto: o que a vegetação resolve,
            valoriza e transforma na experiência cotidiana do imóvel.
          </p>
          <div className="mt-8 grid gap-4 border-t border-white/14 pt-6">
            {["fachadas", "percurso", "permanência"].map((item) => (
              <p key={item} className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/54">
                {item}
              </p>
            ))}
          </div>
        </aside>
      </motion.div>
    </header>
  );
}
