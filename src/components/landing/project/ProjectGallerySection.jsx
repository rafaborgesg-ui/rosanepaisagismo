import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ProjectGallerySection({ project, reducedMotion = false }) {
  const [expandedImage, setExpandedImage] = useState(null);
  const galleryImages = Array.isArray(project.gallery) ? project.gallery : [];
  const galleryLength = galleryImages.length;

  const openExpandedImage = (index) => {
    const src = galleryImages[index];
    if (!src) return;
    setExpandedImage({ src, index });
  };

  const showRelativeImage = (direction) => {
    if (!galleryLength) return;
    setExpandedImage((current) => {
      if (!current) return current;
      const nextIndex = (current.index + direction + galleryLength) % galleryLength;
      return { src: galleryImages[nextIndex], index: nextIndex };
    });
  };

  useEffect(() => {
    if (!expandedImage) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setExpandedImage(null);
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showRelativeImage(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showRelativeImage(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedImage, galleryImages, galleryLength]);

  return (
    <section className="bg-[#081009] px-5 py-24 text-white md:px-10 md:py-36">
      <div className="mx-auto w-[min(100%,1320px)]">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_0.46fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#d3b473]">
              Atmosfera do projeto
            </p>
            <h2 className="mt-5 font-heading text-[clamp(3rem,6.8vw,7rem)] font-medium leading-[0.9]">
              Escala, textura e permanência vegetal.
            </h2>
          </div>
          <p className="max-w-md text-base font-light leading-8 text-white/62 lg:justify-self-end">
            A sequência evidencia volumes, enquadramentos e momentos de uso, mostrando
            como a paisagem conduz a experiência sem perder precisão técnica.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {galleryImages.map((image, index) => (
            <motion.figure
              key={`${image}-${index}`}
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
              <button
                type="button"
                onClick={() => openExpandedImage(index)}
                className="group relative block w-full overflow-hidden bg-transparent text-left outline-none cursor-zoom-in focus-visible:ring-2 focus-visible:ring-[#d3b473] focus-visible:ring-offset-4 focus-visible:ring-offset-[#081009]"
                aria-label={`Expandir imagem ${index + 1} do projeto ${project.title}`}
              >
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
              </button>
            </motion.figure>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {expandedImage && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[#050806]/95 p-4 text-white backdrop-blur-sm md:p-8"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={reducedMotion ? undefined : { opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={`Imagem ampliada ${expandedImage.index + 1} do projeto ${project.title}`}
            onClick={() => setExpandedImage(null)}
          >
            <button
              type="button"
              onClick={() => setExpandedImage(null)}
              className="rb-premium-focus absolute right-5 top-5 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white transition duration-300 hover:border-[#d3b473]/60 hover:bg-white/14 md:right-8 md:top-8"
              aria-label="Fechar imagem ampliada"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {galleryLength > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showRelativeImage(-1);
                  }}
                  className="rb-premium-focus absolute left-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white transition duration-300 hover:border-[#d3b473]/60 hover:bg-white/14 md:left-8 md:h-14 md:w-14"
                  aria-label="Ver imagem anterior"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showRelativeImage(1);
                  }}
                  className="rb-premium-focus absolute right-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white transition duration-300 hover:border-[#d3b473]/60 hover:bg-white/14 md:right-8 md:h-14 md:w-14"
                  aria-label="Ver próxima imagem"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </>
            )}

            {galleryLength > 1 && (
              <p className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white/62 md:bottom-8">
                {String(expandedImage.index + 1).padStart(2, "0")} / {String(galleryLength).padStart(2, "0")}
              </p>
            )}

            <motion.img
              key={expandedImage.src}
              src={expandedImage.src}
              alt={`${project.title} - imagem ampliada ${expandedImage.index + 1}`}
              className="max-h-[92svh] max-w-[94vw] object-contain"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
