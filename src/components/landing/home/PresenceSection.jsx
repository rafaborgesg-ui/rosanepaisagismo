import { motion } from "framer-motion";
import { labelClass, presenceImages } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";

const captions = ["Leitura do imóvel", "Estudo visual e técnica", "Implantação orientada"];

export default function PresenceSection({ reducedMotion = false }) {
  return (
    <section id="bastidores" className="relative bg-[#10120e] px-5 py-section-md text-white md:px-10">
      <div className="rb-grain absolute inset-0" />
      <div className="relative mx-auto w-[min(100%,1320px)]">
        <div className="mb-20 grid gap-8 lg:grid-cols-[0.82fr_0.48fr] lg:items-end">
          <div className="max-w-4xl">
            <p className={labelClass}>Presença real</p>
            <h2 className="mt-6 font-heading text-[clamp(2.8rem,6.2vw,6.4rem)] font-medium leading-[0.9] text-white">
              Obras, estudos e bastidores que sustentam a autoridade técnica.
            </h2>
          </div>
          <p className="max-w-md text-base font-light leading-8 text-white/56 lg:justify-self-end">
            A assinatura não aparece só na imagem final. Ela nasce no levantamento,
            na escolha botânica, no estudo de implantação e na maturação do jardim.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-[0.92fr_1.16fr_0.92fr] md:items-end">
          {presenceImages.map((image, index) => (
            <motion.figure
              key={image}
              {...getInViewProps(reducedMotion, {
                offset: 24,
                margin: "-80px",
                delay: reducedMotion ? 0 : index * 0.1,
                duration: 0.68,
              })}
              className={`rb-cinematic-image group relative overflow-hidden bg-[#182019] ${
                index === 1 ? "md:mb-20" : ""
              }`}
            >
              <img
                src={image}
                alt={captions[index]}
                className={`w-full object-cover opacity-88 grayscale-[10%] ${
                  index === 1 ? "h-[560px]" : "h-[440px]"
                }`}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#081009]/80 to-transparent px-6 pb-6 pt-28 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/54 transition-all duration-700 group-hover:text-white/72">
                {captions[index]}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
