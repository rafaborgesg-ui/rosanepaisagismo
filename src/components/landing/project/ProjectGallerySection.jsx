import { motion } from "framer-motion";

export default function ProjectGallerySection({ project, reducedMotion = false }) {
  return (
    <section className="bg-[#171914] px-4 py-20 text-white md:py-28">
      <div className="mx-auto w-[min(100%,1180px)]">
        <div className="mb-10 max-w-3xl">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
            Galeria fullscreen
          </p>
          <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
            Atmosfera, escala e detalhes do projeto.
          </h2>
        </div>

        <div className="grid gap-4">
          {project.gallery.map((image, index) => (
            <motion.figure
              key={image}
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { delay: index * 0.08, duration: 0.7 }
              }
              className="overflow-hidden rounded-[8px] bg-[#262a21]"
            >
              <img
                src={image}
                alt={`${project.title} - imagem ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-[70vh] min-h-[420px] w-full object-cover"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
