import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { fadeUp } from "@/components/landing/project/projectShared";

export default function ProjectHero({ project, heroStats, reducedMotion = false }) {
  return (
    <section className="relative min-h-[96svh] overflow-hidden bg-[#081009] text-white">
      <img
        src={project.cover}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,16,9,0.9),rgba(8,16,9,0.26)_54%,rgba(8,16,9,0.72)),linear-gradient(180deg,rgba(8,16,9,0.36),rgba(8,16,9,0.06)_42%,rgba(8,16,9,0.9))]" />
      <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-[#081009] to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[96svh] w-[min(100%,1680px)] items-end gap-12 px-5 pb-16 pt-32 md:px-10 md:pb-20 lg:grid-cols-[0.95fr_0.46fr]">
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          animate={reducedMotion ? undefined : "visible"}
          variants={reducedMotion ? undefined : fadeUp}
          className="w-full min-w-0 max-w-5xl"
        >
          <Link
            to="/portfolio"
            className="rb-premium-focus mb-8 inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/68 transition hover:text-[#d3b473]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar ao portfólio
          </Link>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#d3b473]">
            {project.category}
          </p>
          <h1 className="mt-5 max-w-5xl font-heading text-[clamp(3.6rem,8vw,8.6rem)] font-medium leading-[0.88] text-white [text-wrap:balance]">
            {project.title}
          </h1>
          <p className="mt-7 max-w-2xl text-base font-light leading-8 text-white/76 md:text-lg">
            {project.summary}
          </p>
        </motion.div>

        <motion.aside
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { delay: 0.22, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="border-l border-white/18 pl-7 text-white/72"
        >
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#d3b473]">
            Ficha do projeto
          </p>
          <div className="mt-6 grid gap-5 border-t border-white/14 pt-6">
            {heroStats.map(({ label, value }) => (
              <div key={label}>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/44">
                  {label}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/84">{value}</p>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
