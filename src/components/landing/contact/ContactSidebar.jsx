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
      className="w-full max-w-[calc(100vw-2.5rem)] min-w-0 lg:sticky lg:top-32 lg:max-w-none"
    >
      <p className={labelClass}>Briefing privado</p>
      <h2 className="mt-5 max-w-full break-words font-heading text-[clamp(2.7rem,13vw,6.6rem)] font-medium leading-[0.9] text-[#111913] md:text-[clamp(3rem,6.4vw,6.6rem)]">
        O primeiro contato já deve parecer uma curadoria.
      </h2>
      <p className="mt-8 max-w-lg break-words text-lg font-light leading-9 text-[#4b5248]">
        Fotos, planta, metragem, cidade e intenção de uso ajudam a transformar referências soltas
        em uma leitura inicial mais precisa, seletiva e viável.
      </p>

      <div className="mt-10 grid border-t border-[#d8cdbb]">
        {[
          {
            href: "mailto:rosanepaisagismo@gmail.com",
            icon: Mail,
            label: "E-mail",
            value: "rosanepaisagismo@gmail.com",
          },
          {
            href: buildWhatsAppUrl(whatsappMessage),
            icon: Phone,
            label: "WhatsApp",
            value: "Atendimento privado e consultivo",
          },
          {
            icon: MapPin,
            label: "Atuação",
            value: "MG, SP e projetos selecionados no Brasil",
          },
        ].map((item) => {
          const Icon = item.icon;
          const content = (
            <div className="grid min-w-0 grid-cols-[2.4rem_minmax(0,1fr)] gap-4 border-b border-[#d8cdbb] py-5 transition hover:bg-[#ebe2d3]/50">
              <Icon className="mt-1 h-4 w-4 text-[#8a6e42]" aria-hidden="true" />
              <div>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#8f7b55]">
                  {item.label}
                </p>
                <p className="mt-1 break-words text-sm font-semibold leading-6 text-[#171914]">{item.value}</p>
              </div>
            </div>
          );

          if (item.href) {
            return (
              <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
                {content}
              </a>
            );
          }

          return <div key={item.label}>{content}</div>;
        })}
      </div>
    </motion.aside>
  );
}
