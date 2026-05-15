import { motion } from "framer-motion";
import { labelClass, presenceImages } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";

export default function PresenceSection({ reducedMotion = false }) {
  return (
    <section id="depoimentos" className="px-4 py-20 md:py-28">
      <div className="mx-auto w-[min(100%,1180px)]">
        <div className="mb-12 max-w-3xl">
          <p className={labelClass}>Presença real</p>
          <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
            Obras, estudos e bastidores que sustentam a autoridade técnica.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#4b5248]">
            Em vez de depoimentos genéricos, o acervo mostra processo real:
            levantamento, estudo 3D, execução e implantações concluídas.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {presenceImages.map((image, index) => (
            <motion.figure
              key={image}
              {...getInViewProps(reducedMotion, {
                offset: 22,
                margin: "-80px",
                delay: reducedMotion ? 0 : index * 0.08,
                duration: 0.62,
              })}
              className="overflow-hidden rounded-[8px] border border-[#dfd9cc] bg-white shadow-[0_18px_55px_rgba(36,35,28,0.05)]"
            >
              <img
                src={image}
                alt="Registro de estudo e implantação"
                className="h-[360px] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
