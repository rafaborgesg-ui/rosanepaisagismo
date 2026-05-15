import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { fadeUp } from "@/components/landing/project/projectShared";

export default function ProjectHero({ project, heroStats, reducedMotion = false }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#171914] text-white">
      <img
        src={project.cover}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,18,14,0.88),rgba(16,18,14,0.32)_54%,rgba(16,18,14,0.7)),linear-gradient(180deg,rgba(16,18,14,0.25),rgba(16,18,14,0.9))]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] flex-col justify-end px-4 pb-12 pt-32 md:pb-16">
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          animate={reducedMotion ? undefined : "visible"}
          variants={reducedMotion ? undefined : fadeUp}
          className="w-full min-w-0 max-w-4xl"
        >
          <Link
            to="/portfolio"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/72 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar ao portfólio
          </Link>
          <h1 className="max-w-[21rem] font-heading text-[2.55rem] font-medium leading-[0.98] tracking-normal sm:max-w-4xl sm:text-6xl md:text-7xl lg:text-8xl">
            {project.title}
          </h1>
          <p className="mt-7 max-w-[21rem] text-lg font-light leading-8 text-white/78 sm:max-w-2xl md:text-xl">
            {project.summary}
          </p>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { delay: 0.18, duration: 0.7 }}
          className="mt-12 grid gap-3 border-t border-white/18 pt-6 sm:grid-cols-3"
        >
          {heroStats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <Icon className="mt-1 h-4 w-4 text-[#d3b473]" aria-hidden="true" />
              <div>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-white/50">
                  {label}
                </p>
                <p className="mt-1 text-sm leading-6 text-white/82">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
