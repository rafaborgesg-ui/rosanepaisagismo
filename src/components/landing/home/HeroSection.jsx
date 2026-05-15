import { motion } from "framer-motion";
import PremiumLink from "@/components/landing/home/PremiumLink";
import { getFadeUp, getStagger } from "@/components/landing/home/motion";

export default function HeroSection({ reducedMotion = false }) {
  const fadeUp = getFadeUp(reducedMotion);
  const stagger = getStagger(reducedMotion);

  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-[#101812] text-white">
      <motion.img
        src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p6_i2.jpg"
        alt="Fachada residencial com paisagismo autoral"
        className="absolute inset-0 h-full w-full object-cover"
        initial={reducedMotion ? false : { scale: 1.05 }}
        animate={reducedMotion ? undefined : { scale: 1 }}
        transition={reducedMotion ? undefined : { duration: 8, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,24,18,0.92),rgba(16,24,18,0.34)_56%,rgba(16,24,18,0.68)),linear-gradient(180deg,rgba(16,24,18,0.18),rgba(16,24,18,0.86))]" />

      <div className="relative z-10 mx-auto flex min-h-[92svh] w-full max-w-[1180px] items-end px-4 pb-24 pt-32 md:pb-16">
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          animate={reducedMotion ? undefined : "visible"}
          variants={stagger}
          className="w-full min-w-0 max-w-4xl"
        >
          <motion.h1
            variants={fadeUp}
            className="max-w-[21rem] font-heading text-[2.82rem] font-medium leading-[0.98] tracking-normal sm:max-w-4xl sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Paisagismo autoral de alto padrão.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-[21rem] text-lg font-light leading-8 text-white/78 sm:max-w-2xl md:text-xl"
          >
            Projetos botânicos e implantação orientada para residências, clínicas e
            empreendimentos que exigem presença, precisão e permanência.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#d6c5a6]"
          >
            Engenheira Agrônoma • Doutora em Produção Vegetal • Atuação desde 2016
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <PremiumLink to="/contato" variant="light">
              Iniciar avaliação
            </PremiumLink>
            <PremiumLink href="#projetos" variant="outline">
              Ver projetos selecionados
            </PremiumLink>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="mt-12 hidden w-full max-w-[21rem] grid-cols-3 gap-3 border-t border-white/18 pt-6 sm:grid sm:max-w-2xl sm:gap-4"
          >
              {[
                ["MG + SP", "atuação selecionada"],
                ["3D + Executivo", "entregas técnicas"],
                ["Projeto + Implant.", "fluxo orientado"],
              ].map(([number, text]) => (
                <div key={number}>
                  <p className="font-heading text-[1.9rem] font-medium leading-tight tracking-normal sm:text-3xl md:text-4xl">
                    {number}
                  </p>
                <p className="mt-2 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-white/56">
                  {text}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
