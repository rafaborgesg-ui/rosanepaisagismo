import { ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/data/premiumProjects";

export default function PortfolioCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#081009] px-5 py-24 text-white md:px-10 md:py-36">
      <img
        src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p5_i2.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-34 grayscale-[10%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,16,9,0.92),rgba(8,16,9,0.66)_52%,rgba(8,16,9,0.92))]" />
      <div className="relative mx-auto grid w-[min(100%,1320px)] gap-10 lg:grid-cols-[0.9fr_0.46fr] lg:items-end">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#d3b473]">
            Próximo projeto
          </p>
          <h2 className="mt-5 max-w-4xl font-heading text-[clamp(3.1rem,7vw,7.2rem)] font-medium leading-[0.88]">
            Seu jardim pode nascer com intenção, técnica e presença.
          </h2>
        </div>
        <div>
          <p className="text-base font-light leading-8 text-white/68">
            Envie fotos, planta ou referências. A primeira leitura identifica aderência,
            escopo e o caminho mais adequado para uma proposta autoral.
          </p>
          <a
            href={buildWhatsAppUrl(
              "Olá, quero solicitar uma proposta autoral para meu projeto de paisagismo.",
            )}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473]"
          >
            Solicitar proposta autoral
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
