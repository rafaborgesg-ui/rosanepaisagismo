import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { buildWhatsAppUrl } from "@/data/premiumProjects";
import { fadeUp, labelClass } from "@/components/landing/contact/contactShared";

export default function ContactSidebar({
  reducedMotion = false,
  whatsappMessage,
}) {
  return (
    <motion.aside
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-90px" }}
      variants={reducedMotion ? undefined : fadeUp}
      className="lg:sticky lg:top-28"
    >
      <p className={labelClass}>Briefing exclusivo</p>
      <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-5xl">
        Poucas informações certas já revelam o potencial do projeto.
      </h2>
      <p className="mt-6 text-lg leading-8 text-[#5f665c]">
        Fotos, planta, metragem, cidade e estilo desejado ajudam a transformar
        referências soltas em uma primeira leitura mais precisa.
      </p>

      <div className="mt-10 grid gap-4">
        <a
          href="mailto:rosanepaisagismo@gmail.com"
          className="flex items-center gap-4 rounded-[8px] bg-white p-5 shadow-[0_16px_50px_rgba(36,35,28,0.06)] transition hover:-translate-y-0.5"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#171914] text-white">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#8f7b55]">
              E-mail
            </p>
            <p className="mt-1 text-sm font-semibold text-[#171914]">
              rosanepaisagismo@gmail.com
            </p>
          </div>
        </a>
        <a
          href={buildWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 rounded-[8px] bg-white p-5 shadow-[0_16px_50px_rgba(36,35,28,0.06)] transition hover:-translate-y-0.5"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#171914] text-white">
            <Phone className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#8f7b55]">
              WhatsApp
            </p>
            <p className="mt-1 text-sm font-semibold text-[#171914]">
              Atendimento rápido e premium
            </p>
          </div>
        </a>
        <div className="flex items-center gap-4 rounded-[8px] bg-white p-5 shadow-[0_16px_50px_rgba(36,35,28,0.06)]">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#171914] text-white">
            <MapPin className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#8f7b55]">
              Atuação
            </p>
            <p className="mt-1 text-sm font-semibold text-[#171914]">
              MG, SP e projetos selecionados no Brasil
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
