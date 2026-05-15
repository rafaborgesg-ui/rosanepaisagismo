import { Check, ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/data/premiumProjects";

export default function ProjectCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#6f7b5f] px-4 py-20 text-white md:py-28">
      <img
        src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p5_i1.jpg"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-[#171914]/58" />
      <div className="relative mx-auto max-w-4xl text-center">
        <Check className="mx-auto mb-7 h-8 w-8 text-[#d3b473]" aria-hidden="true" />
        <h2 className="font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
          Seu jardim pode ser o próximo espaço memorável.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/78">
          Envie fotos, planta ou referencias. A primeira leitura ja mostra o caminho
          mais elegante para transformar o espaco.
        </p>
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noreferrer"
          className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473]"
        >
          Iniciar avaliacao
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
