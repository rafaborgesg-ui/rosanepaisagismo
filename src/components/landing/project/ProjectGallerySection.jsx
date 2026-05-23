import { motion } from "framer-motion";

export default function ProjectGallerySection({ project, reducedMotion = false }) {
  return (
    <section className="bg-[#081009] px-5 py-24 text-white md:px-10 md:py-36">
      <div className="mx-auto w-[min(100%,1320px)]">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_0.46fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#d3b473]">
              Atmosfera do projeto
            </p>
            <h2 className="mt-5 font-heading text-[clamp(3rem,6.8vw,7rem)] font-medium leading-[0.9]">
              Escala, textura e presença vegetal.
            </h2>
          </div>
          <p className="max-w-md text-base font-light leading-8 text-white/62 lg:justify-self-end">
            Imagens pensadas como leitura de materialidade: volumes, percurso,
            enquadramentos e pontos de permanência.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {project.gallery.map((image, index) => (
            <motion.figure
              key={image}
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { delay: index * 0.06, duration: 0.75, ease: [0.16, 1, 0.3, 1] }
              }
              className={
                index === 0
                  ? "lg:col-span-8 lg:row-span-2"
                  : index === 1
                    ? "lg:col-span-4 lg:pt-16"
                    : "lg:col-span-4 lg:self-end"
              }
            >
              <div className="group relative overflow-hidden bg-[#151b14]">
                <img
                  src={image}
                  alt={`${project.title} - imagem ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover grayscale-[6%] transition duration-1000 group-hover:grayscale-0 ${
                    index === 0
                      ? "h-[66vh] min-h-[420px]"
                      : "h-[42vh] min-h-[320px] lg:h-[38vh]"
                  }`}
                />
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
