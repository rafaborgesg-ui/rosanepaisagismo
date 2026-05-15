import { ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/data/premiumProjects";

export default function PortfolioCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#171914] px-4 py-20 text-white md:py-28">
      <img
        src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p9_i1.jpg"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-24"
      />
      <div className="absolute inset-0 bg-[#171914]/72" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
          Próximo projeto
        </p>
        <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
          O próximo projeto pode ser o seu imóvel.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/72">
          Envie fotos, planta ou referências. A primeira leitura identifica aderência,
          escopo e próximo passo.
        </p>
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noreferrer"
          className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473]"
        >
          Solicitar atendimento privado
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
