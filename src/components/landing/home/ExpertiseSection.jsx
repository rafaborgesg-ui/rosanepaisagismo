import { motion } from "framer-motion";
import { expertise, labelClass } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";
import { useLandingContent } from "@/hooks/useLandingContent";
import PremiumLink from "@/components/landing/home/PremiumLink";

export default function ExpertiseSection({ reducedMotion = false }) {
  const content = useLandingContent();
  const homeTexts = content?.home_texts || {};
  const adminServices = [1, 2, 3]
    .map((i) => ({ title: content?.[`servico${i}_titulo`], detail: content?.[`servico${i}_desc`] }))
    .filter((s) => s.title && s.detail);
  const services = adminServices.length ? [...adminServices, ...expertise.slice(3)] : expertise;

  return (
    <section id="servicos" className="bg-[#f3eee4] px-5 py-section-md md:px-10">
      <div className="mx-auto w-[min(100%,1320px)]">
        <div className="mb-16 grid gap-8 lg:grid-cols-[0.92fr_0.5fr] lg:items-end">
          <div className="max-w-4xl">
            <p className={labelClass}>{homeTexts.services_label || "Atuação"}</p>
            <h2 className="mt-6 font-heading text-[clamp(2.8rem,6.4vw,6.6rem)] font-medium leading-[0.9] text-[#111913]">
              {homeTexts.services_title || "Projetos criados para viver melhor."}
            </h2>
          </div>
          <p className="max-w-md text-base font-light leading-8 text-[#4b5248] lg:justify-self-end">
            Do primeiro diagnóstico ao jardim implantado, cada frente nasce para transformar
            intenção estética em decisão técnica clara.
          </p>
        </div>
        <div className="grid border-t border-[#d8cdbb]">
          {services.map((item, index) => (
            <motion.article
              key={item.title}
              {...getInViewProps(reducedMotion, {
                offset: 24,
                margin: "-80px",
                delay: reducedMotion ? 0 : index * 0.05,
                duration: 0.6,
              })}
              className="group relative grid gap-5 border-b border-[#d8cdbb] py-8 transition-colors duration-600 hover:bg-[#ebe2d3]/50 md:grid-cols-[0.14fr_0.58fr_0.88fr] md:items-start md:px-6"
            >
              {/* Gold left accent on hover */}
              <span className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[#d3b473] transition-transform duration-600 group-hover:scale-y-100" aria-hidden="true" />
              <span className="font-heading text-3xl text-[#8a6e42]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-[1.9rem] font-medium leading-none text-[#111913] transition-colors duration-500 group-hover:text-[#8a6e42] md:text-[2.2rem]">
                {item.title}
              </h3>
              <p className="max-w-2xl text-base leading-8 text-[#4b5248]">{item.detail}</p>
            </motion.article>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-[#d8cdbb] pt-9 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-7 text-[#5f665c]">
            Para residências premium, clínicas, áreas gourmet, piscinas, fachadas vivas e
            projetos em fase de obra que precisam de decisão técnica clara.
          </p>
          <PremiumLink to="/contato">Criar meu jardim</PremiumLink>
        </div>
      </div>
    </section>
  );
}
