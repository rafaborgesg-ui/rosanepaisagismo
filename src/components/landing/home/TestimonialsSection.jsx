import { motion } from "framer-motion";
import { getInViewProps } from "@/components/landing/home/motion";

const testimonials = [
  {
    quote:
      "O escritório da Rosane transformou completamente a percepção do nosso imóvel. A residência valorizou mais de 30% após a execução do projeto.",
    name: "Ana Paula Ferreira",
    role: "Proprietária — Alphaville, SP",
    initials: "AP",
  },
  {
    quote:
      "A consultoria foi cirúrgica. O jardim biofílico da nossa clínica criou uma experiência de conforto e luxo única para os nossos pacientes.",
    name: "Dr. Ricardo Mota",
    role: "Clínica premium — BH, MG",
    initials: "RM",
  },
  {
    quote:
      "Uma parceria de altíssimo nível. A entrega impecável e o design sofisticado superaram todas as expectativas dos nossos compradores.",
    name: "Construtora Ávila",
    role: "Condomínio de luxo — SP",
    initials: "CA",
  },
];

export default function TestimonialsSection({ reducedMotion = false }) {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto grid w-[min(100%,1280px)] gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.article
            key={testimonial.name}
            {...getInViewProps(reducedMotion, {
              offset: 22,
              margin: "-80px",
              delay: reducedMotion ? 0 : index * 0.08,
              duration: 0.62,
            })}
            className="flex min-h-[274px] flex-col justify-between rounded-[22px] border border-[#e5e1dc] bg-[#fbfbfb] p-10 shadow-[0_18px_60px_rgba(23,25,20,0.04)] md:p-11"
          >
            <p className="text-[1.02rem] leading-7 text-[#29302c]">
              <span className="text-[#a9834a]">"</span>
              {testimonial.quote}
              <span className="text-[#a9834a]">"</span>
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#bdbdb9,#4c504b)] text-sm font-semibold text-white grayscale">
                {testimonial.initials}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#050807]">{testimonial.name}</h3>
                <p className="mt-1 text-[0.66rem] font-medium uppercase tracking-[0.06em] text-[#7b817b]">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
