import { motion } from "framer-motion";
import { Leaf, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/data/premiumProjects";
import { fadeUp, labelClass } from "@/components/landing/project/projectShared";

export default function ProjectNarrativeSection({ project, reducedMotion = false }) {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto grid w-[min(100%,1180px)] gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.aside
          initial={reducedMotion ? false : "hidden"}
          whileInView={reducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-90px" }}
          variants={reducedMotion ? undefined : fadeUp}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className={labelClass}>Leitura do espaço</p>
          <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-5xl">
            Um case pensado como experiência, não como decoração.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#5f665c]">
            Cada decisão combina estética, técnica e rotina. O resultado precisa ser
            bonito no primeiro olhar e consistente depois da implantação.
          </p>
          <a
            href={buildWhatsAppUrl(
              `Ola, quero iniciar uma avaliacao inspirada no projeto ${project.title}.`,
            )}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#171914] px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#6f7b5f]"
          >
            Falar sobre meu projeto
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.aside>

        <div className="grid gap-5">
          {[
            ["Desafio", project.challenge],
            ["Solução aplicada", project.solution],
          ].map(([title, text], index) => (
            <motion.article
              key={title}
              initial={reducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { delay: index * 0.08, duration: 0.65 }
              }
              className="rounded-[8px] border border-[#dfd9cc] bg-white p-7 shadow-[0_20px_60px_rgba(36,35,28,0.06)] md:p-9"
            >
              <p className={labelClass}>{title}</p>
              <p className="mt-4 text-lg leading-8 text-[#343830]">{text}</p>
            </motion.article>
          ))}

          <motion.article
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.65 }}
            className="rounded-[8px] border border-[#dfd9cc] bg-[#171914] p-7 text-white shadow-[0_20px_60px_rgba(36,35,28,0.08)] md:p-9"
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
              Plantas utilizadas
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.plants.map((plant) => (
                <div key={plant} className="flex items-center gap-3 text-white/82">
                  <Leaf className="h-4 w-4 text-[#d3b473]" aria-hidden="true" />
                  <span>{plant}</span>
                </div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
