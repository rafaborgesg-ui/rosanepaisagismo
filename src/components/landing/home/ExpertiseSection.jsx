import { motion } from "framer-motion";
import { expertise, labelClass } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";
import { useLandingContent } from "@/hooks/useLandingContent";

export default function ExpertiseSection({ reducedMotion = false }) {
  const content = useLandingContent();
  const adminServices = [1, 2, 3]
    .map((index) => ({
      title: content?.[`servico${index}_titulo`],
      detail: content?.[`servico${index}_desc`],
    }))
    .filter((item) => item.title && item.detail);
  const services = adminServices.length ? [...adminServices, ...expertise.slice(3)] : expertise;

  return (
    <section id="servicos" className="bg-white px-4 py-20 md:py-28">
      <div className="mx-auto w-[min(100%,1180px)]">
        <div className="mb-12 max-w-3xl">
          <p className={labelClass}>Nossos Serviços</p>
          <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
            Frentes de atuação para projetos que exigem nível alto de execução.
          </h2>
        </div>
        <div className="grid gap-3">
          {services.map((item, index) => (
            <motion.article
              key={item.title}
              {...getInViewProps(reducedMotion, {
                offset: 24,
                margin: "-80px",
                delay: reducedMotion ? 0 : index * 0.06,
                duration: 0.6,
              })}
              className="grid gap-3 rounded-[8px] border border-[#dfd9cc] bg-[#f8f4eb] p-6 md:grid-cols-[0.75fr_1.25fr] md:items-center"
            >
              <h3 className="font-heading text-3xl font-medium tracking-normal md:text-4xl">
                {item.title}
              </h3>
              <p className="leading-7 text-[#4b5248]">{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
