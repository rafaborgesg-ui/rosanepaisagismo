import { MessageCircle } from "lucide-react";
import { useLandingContent } from "@/hooks/useLandingContent";

const fieldClass =
  "min-h-12 border border-white/16 bg-white/[0.07] px-4 text-sm text-white outline-none transition placeholder:text-white/42 focus:border-[#d3b473]";

export default function ConciergeSection({
  lead,
  setLead,
  submitLead,
  onBriefingStarted,
  isSubmitting = false,
}) {
  const content = useLandingContent();
  const homeTexts = content?.home_texts || {};

  return (
    <section id="contato-concierge" className="bg-[#f3eee4] px-5 py-24 pb-32 md:px-10 md:py-36 md:pb-36">
      <div className="mx-auto grid w-[min(100%,1320px)] overflow-hidden bg-[#081009] text-white shadow-[0_34px_100px_rgba(36,35,28,0.22)] lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative min-h-[420px]">
          <img
            src={homeTexts.concierge_image_url || "/brand/PAISAGISMO-PRISCILLA-ROSANE_p5_i2.jpg"}
            alt="Composição de jardim em área social"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover grayscale-[8%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,9,0.04),rgba(8,16,9,0.62))]" />
        </div>
        <div className="p-7 md:p-10 lg:p-14">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#d3b473]">
            {homeTexts.concierge_label || "Atendimento consultivo"}
          </p>
          <h2 className="mt-5 font-heading text-[clamp(3rem,5.8vw,6rem)] font-medium leading-[0.9]">
            {homeTexts.concierge_title || "Vamos desenhar o próximo capítulo da sua área externa?"}
          </h2>
          <p className="mt-6 max-w-2xl text-base font-light leading-8 text-white/68 md:text-lg">
            {homeTexts.concierge_text ||
              "Conte sobre o imóvel, fase da obra e escopo desejado. A equipe retorna com o próximo passo mais adequado para seu contexto."}
          </p>
          <form onSubmit={submitLead} onFocusCapture={onBriefingStarted} className="mt-8 grid gap-3">
            <input
              value={lead.name}
              onChange={(event) => setLead((prev) => ({ ...prev, name: event.target.value }))}
              className={fieldClass}
              placeholder="Seu nome"
              aria-label="Seu nome"
              required
            />
            <input
              value={lead.whatsapp}
              onChange={(event) =>
                setLead((prev) => ({ ...prev, whatsapp: event.target.value }))
              }
              className={fieldClass}
              placeholder="WhatsApp"
              aria-label="WhatsApp"
              required
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={lead.city}
                onChange={(event) => setLead((prev) => ({ ...prev, city: event.target.value }))}
                className={fieldClass}
                placeholder="Cidade"
                aria-label="Cidade"
                required
              />
              <select
                value={lead.propertyType}
                onChange={(event) =>
                  setLead((prev) => ({ ...prev, propertyType: event.target.value }))
                }
                className={fieldClass}
                aria-label="Tipo de imóvel"
                required
              >
                <option className="text-[#171914]">Residencial</option>
                <option className="text-[#171914]">Clínica ou corporativo</option>
                <option className="text-[#171914]">Condomínio ou área comum</option>
                <option className="text-[#171914]">Empreendimento</option>
              </select>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <select
                value={lead.phase}
                onChange={(event) => setLead((prev) => ({ ...prev, phase: event.target.value }))}
                className={fieldClass}
                aria-label="Fase do projeto"
                required
              >
                <option className="text-[#171914]">Terreno ou anteprojeto</option>
                <option className="text-[#171914]">Em obra</option>
                <option className="text-[#171914]">Imóvel pronto</option>
                <option className="text-[#171914]">Reforma de área externa</option>
              </select>
              <select
                value={lead.scope}
                onChange={(event) => setLead((prev) => ({ ...prev, scope: event.target.value }))}
                className={fieldClass}
                aria-label="Escopo desejado"
                required
              >
                <option className="text-[#171914]">Projeto completo</option>
                <option className="text-[#171914]">Consultoria técnica</option>
                <option className="text-[#171914]">Projeto + implantação</option>
                <option className="text-[#171914]">Jardim vertical</option>
              </select>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <select
                value={lead.timeline}
                onChange={(event) =>
                  setLead((prev) => ({ ...prev, timeline: event.target.value }))
                }
                className={fieldClass}
                aria-label="Prazo desejado"
                required
              >
                <option className="text-[#171914]">Até 3 meses</option>
                <option className="text-[#171914]">3 a 6 meses</option>
                <option className="text-[#171914]">6 a 12 meses</option>
                <option className="text-[#171914]">Sem prazo definido</option>
              </select>
              <select
                value={lead.investment}
                onChange={(event) =>
                  setLead((prev) => ({ ...prev, investment: event.target.value }))
                }
                className={fieldClass}
                aria-label="Faixa de investimento"
                required
              >
                <option className="text-[#171914]">Até R$15 mil</option>
                <option className="text-[#171914]">R$15k a R$35k</option>
                <option className="text-[#171914]">R$35k a R$80k</option>
                <option className="text-[#171914]">Acima de R$80k</option>
                <option className="text-[#171914]">Ainda não sei</option>
              </select>
            </div>
            <textarea
              value={lead.details}
              onChange={(event) => setLead((prev) => ({ ...prev, details: event.target.value }))}
              className={`${fieldClass} min-h-28 py-3`}
              placeholder="Conte o contexto do imóvel e o resultado que você busca."
              aria-label="Detalhes do projeto"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Enviando..." : homeTexts.concierge_button || "Solicitar uma proposta autoral"}
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
