import { motion } from "framer-motion";
import { getInViewProps } from "@/components/landing/home/motion";
import { useLandingContent } from "@/hooks/useLandingContent";
import PremiumLink from "@/components/landing/home/PremiumLink";

const defaultTestimonials = [
  {
    quote: "O projeto transformou completamente a percepção do imóvel. A área externa deixou de ser um anexo e passou a ser o coração da casa.",
    name: "Ana Paula Ferreira",
    role: "Residência de alto padrão",
    initials: "AP",
  },
  {
    quote: "A consultoria foi precisa. O jardim biofílico da clínica criou uma experiência de acolhimento e sofisticação para os pacientes.",
    name: "Dr. Ricardo Mota",
    role: "Clínica premium",
    initials: "RM",
  },
  {
    quote: "Uma parceria de altíssimo nível. A entrega técnica ajudou a preservar a intenção estética até a implantação final.",
    name: "Construtora Ávila",
    role: "Empreendimento residencial",
    initials: "CA",
  },
];

function getInitials(name = "") {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function TestimonialsSection({ reducedMotion = false }) {
  const content = useLandingContent();
  const homeTexts = content?.home_texts || {};
  const testimonials = defaultTestimonials.map((t, i) => {
    const n = i + 1;
    const name = homeTexts[`testimonial_${n}_name`] || t.name;
    return {
      quote: homeTexts[`testimonial_${n}_quote`] || t.quote,
      name,
      role: homeTexts[`testimonial_${n}_role`] || t.role,
      initials: getInitials(name) || t.initials,
    };
  });

  return (
    <section className="relative bg-[#0b0f0b] px-5 py-section-md text-white md:px-10">
      <div className="rb-grain absolute inset-0" />
      <div className="relative mx-auto w-[min(100%,1320px)]">
        <div className="mb-16 grid gap-6 lg:grid-cols-[0.75fr_0.5fr] lg:items-end">
          <h2 className="font-heading text-[clamp(2.8rem,5.8vw,5.8rem)] font-medium leading-[0.9]">
            Confiança discreta, construída no detalhe.
          </h2>
          <p className="max-w-md text-base font-light leading-8 text-white/56 lg:justify-self-end">
            A prova social entra como assinatura, não como ruído: clientes que buscavam
            técnica, presença estética e segurança de implantação.
          </p>
        </div>
        <div className="grid border-t border-white/12 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              {...getInViewProps(reducedMotion, {
                offset: 22,
                margin: "-80px",
                delay: reducedMotion ? 0 : index * 0.1,
                duration: 0.65,
              })}
              className="group flex min-h-[340px] flex-col justify-between border-b border-white/10 py-10 transition-colors duration-500 hover:bg-white/[0.02] lg:border-r lg:px-9 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              {/* Editorial quote mark */}
              <div>
                <span className="block font-heading text-[4.5rem] leading-[0.5] text-[#d3b473]/24" aria-hidden="true">"</span>
                <p className="mt-4 font-heading text-[1.6rem] font-medium leading-tight text-white md:text-[1.8rem]">
                  {testimonial.quote}
                </p>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d3b473]/32 text-sm font-semibold text-[#d3b473] transition-all duration-500 group-hover:border-[#d3b473]/52 group-hover:shadow-[0_0_20px_rgba(211,180,115,0.08)]">
                  {testimonial.initials}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{testimonial.name}</h3>
                  <p className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-white/38">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA after testimonials */}
        <motion.div
          {...getInViewProps(reducedMotion, { offset: 20 })}
          className="mt-16 flex justify-center border-t border-white/10 pt-10"
        >
          <PremiumLink to="/contato" variant="outline">
            Agendar conversa estratégica
          </PremiumLink>
        </motion.div>
      </div>
    </section>
  );
}
