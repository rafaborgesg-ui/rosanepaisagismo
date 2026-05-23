import { motion } from "framer-motion";
import { Check, Leaf, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/data/premiumProjects";
import { fadeUp, labelClass } from "@/components/landing/project/projectShared";

export default function ProjectNarrativeSection({ project, reducedMotion = false }) {
  const intentions = project.intentions?.length
    ? project.intentions
    : [
        "Equilibrar arquitetura, vegetação e rotina de manutenção",
        "Criar uma leitura botânica autoral para o espaço",
        "Transformar a área externa em experiência de uso",
      ];
  const materials = project.materials?.length ? project.materials : project.plants;

  return (
    <section className="bg-[#f3eee4] px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto grid w-[min(100%,1320px)] gap-16 lg:grid-cols-[0.78fr_1.22fr]">
        <motion.aside
          initial={reducedMotion ? false : "hidden"}
          whileInView={reducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-90px" }}
          variants={reducedMotion ? undefined : fadeUp}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <p className={labelClass}>Leitura do espaço</p>
          <h2 className="mt-5 font-heading text-[clamp(3rem,6.4vw,6.6rem)] font-medium leading-[0.9] text-[#111913]">
            O jardim como experiência, não como decoração.
          </h2>
          <p className="mt-8 max-w-lg text-lg font-light leading-9 text-[#4b5248]">
            Cada decisão equilibra estética, técnica e rotina. O resultado precisa encantar
            no primeiro olhar e continuar consistente depois da implantação.
          </p>
          <a
            href={buildWhatsAppUrl(
              `Olá, quero iniciar uma avaliação inspirada no projeto ${project.title}.`,
            )}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#111913] px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#8a6e42]"
          >
            Agendar conversa estratégica
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.aside>

        <div className="grid border-t border-[#d8cdbb]">
          {[
            ["Desafio", project.challenge],
            ["Solução aplicada", project.solution],
          ].map(([title, text], index) => (
            <motion.article
              key={title}
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { delay: index * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }
              }
              className="grid gap-5 border-b border-[#d8cdbb] py-8 md:grid-cols-[0.34fr_1fr]"
            >
              <p className={labelClass}>{title}</p>
              <p className="max-w-3xl text-xl font-light leading-9 text-[#343830] md:text-2xl md:leading-10">
                {text}
              </p>
            </motion.article>
          ))}

          <motion.article
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-5 border-b border-[#d8cdbb] py-8 md:grid-cols-[0.34fr_1fr]"
          >
            <p className={labelClass}>Intenções</p>
            <div className="grid gap-4">
              {intentions.map((item, index) => (
                <div
                  key={item}
                  className="grid grid-cols-[2.4rem_1fr] items-start gap-4 border-b border-[#d8cdbb] pb-4 last:border-b-0 last:pb-0"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c3ad86] text-[0.64rem] font-semibold text-[#8a6e42]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-xl font-light leading-8 text-[#343830] md:text-2xl md:leading-9">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-5 border-b border-[#d8cdbb] py-8 md:grid-cols-[0.34fr_1fr]"
          >
            <p className={labelClass}>Curadoria botânica</p>
            <div className="grid gap-8">
              <div className="grid gap-3 sm:grid-cols-2">
                {project.plants.map((plant) => (
                  <div key={plant} className="flex items-center gap-3 border-b border-[#d8cdbb] pb-3 text-[#343830]">
                    <Leaf className="h-4 w-4 text-[#8a6e42]" aria-hidden="true" />
                    <span>{plant}</span>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 border border-[#d8cdbb] p-5 sm:grid-cols-3">
                {materials.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[#4b5248]">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#8a6e42]" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
