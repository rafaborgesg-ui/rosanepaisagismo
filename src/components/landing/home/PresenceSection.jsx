import { motion } from "framer-motion";
import { labelClass, presenceImages } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";

export default function PresenceSection({ reducedMotion = false }) {
  return (
    <section id="bastidores" className="bg-[#10120e] px-5 py-24 text-white md:px-10 md:py-36">
      <div className="mx-auto w-[min(100%,1320px)]">
        <div className="mb-16 grid gap-8 lg:grid-cols-[0.82fr_0.48fr] lg:items-end">
          <div className="max-w-4xl">
          <p className={labelClass}>Presença real</p>
          <h2 className="mt-5 font-heading text-[clamp(3rem,6.6vw,6.8rem)] font-medium leading-[0.9] text-white">
            Obras, estudos e bastidores que sustentam a autoridade técnica.
          </h2>
          </div>
          <p className="max-w-md text-base font-light leading-8 text-white/62 lg:justify-self-end">
            A assinatura não aparece só na imagem final. Ela nasce no levantamento,
            na escolha botânica, no estudo de implantação e na maturação do jardim.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-[0.92fr_1.16fr_0.92fr] md:items-end">
          {presenceImages.map((image, index) => (
            <motion.figure
              key={image}
              {...getInViewProps(reducedMotion, {
                offset: 22,
                margin: "-80px",
                delay: reducedMotion ? 0 : index * 0.08,
                duration: 0.62,
              })}
              className={`group relative overflow-hidden bg-[#182019] ${
                index === 1 ? "md:mb-16" : ""
              }`}
            >
              <img
                src={image}
                alt="Registro de estudo e implantação"
                className={`w-full object-cover opacity-90 grayscale-[12%] transition duration-1000 group-hover:scale-[1.035] group-hover:opacity-100 group-hover:grayscale-0 ${
                  index === 1 ? "h-[560px]" : "h-[430px]"
                }`}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#081009]/82 to-transparent px-5 pb-5 pt-24 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/58">
                {["Leitura do imóvel", "Estudo visual e técnica", "Implantação orientada"][index]}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
