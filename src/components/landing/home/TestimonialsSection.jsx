import { motion } from "framer-motion";
import { getInViewProps } from "@/components/landing/home/motion";
import { useLandingContent } from "@/hooks/useLandingContent";

const defaultTestimonials = [
  {
    quote:
      "O projeto transformou completamente a percepção do imóvel. A área externa deixou de ser um anexo e passou a ser o coração da casa.",
    name: "Ana Paula Ferreira",
    role: "Residência de alto padrão",
    initials: "AP",
  },
  {
    quote:
      "A consultoria foi precisa. O jardim biofílico da clínica criou uma experiência de acolhimento e sofisticação para os pacientes.",
    name: "Dr. Ricardo Mota",
    role: "Clínica premium",
    initials: "RM",
  },
  {
    quote:
      "Uma parceria de altíssimo nível. A entrega técnica ajudou a preservar a intenção estética até a implantação final.",
    name: "Construtora Ávila",
    role: "Empreendimento residencial",
    initials: "CA",
  },
];

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialsSection({ reducedMotion = false }) {
  const content = useLandingContent();
  const homeTexts = content?.home_texts || {};
  const testimonials = defaultTestimonials.map((testimonial, index) => {
    const number = index + 1;
    const name = homeTexts[`testimonial_${number}_name`] || testimonial.name;
    return {
      quote: homeTexts[`testimonial_${number}_quote`] || testimonial.quote,
      name,
      role: homeTexts[`testimonial_${number}_role`] || testimonial.role,
      initials: getInitials(name) || testimonial.initials,
    };
  });

  return (
    <section className="bg-[#0b0f0b] px-5 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto w-[min(100%,1320px)]">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.75fr_0.5fr] lg:items-end">
          <h2 className="font-heading text-[clamp(3rem,6vw,6.2rem)] font-medium leading-[0.9]">
            Confiança discreta, construída no detalhe.
          </h2>
          <p className="max-w-md text-base font-light leading-8 text-white/62 lg:justify-self-end">
            A prova social entra como assinatura, não como ruído: clientes que buscavam
            técnica, presença estética e segurança de implantação.
          </p>
        </div>
        <div className="grid border-t border-white/14 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              {...getInViewProps(reducedMotion, {
                offset: 22,
                margin: "-80px",
                delay: reducedMotion ? 0 : index * 0.08,
                duration: 0.62,
              })}
              className="flex min-h-[320px] flex-col justify-between border-b border-white/14 py-9 lg:border-r lg:px-8 lg:last:border-r-0"
            >
              <p className="font-heading text-3xl font-medium leading-tight text-white md:text-4xl">
                “{testimonial.quote}”
              </p>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d3b473]/42 text-sm font-semibold text-[#d3b473]">
                  {testimonial.initials}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{testimonial.name}</h3>
                  <p className="mt-1 text-[0.66rem] font-medium uppercase tracking-[0.12em] text-white/44">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
