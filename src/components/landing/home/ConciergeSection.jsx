import { MessageCircle } from "lucide-react";
import { useLandingContent } from "@/hooks/useLandingContent";

const fieldClass =
  "min-h-[52px] border-0 border-b border-white/14 bg-transparent px-1 text-sm text-white outline-none transition-all placeholder:text-white/36 focus:border-[#d3b473] focus:bg-white/[0.03]";

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
    <section id="contato-concierge" className="bg-[#f3eee4] px-5 py-section-md md:px-10">
      <div className="mx-auto grid w-[min(100%,1320px)] overflow-hidden bg-[#081009] text-white shadow-[0_40px_120px_rgba(36,35,28,0.2)] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rb-cinematic-image relative min-h-[420px]">
          <img
            src={homeTexts.concierge_image_url || "/brand/PAISAGISMO-PRISCILLA-ROSANE_p5_i2.jpg"}
            alt="Composição de jardim em área social"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover grayscale-[6%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,9,0.04),rgba(8,16,9,0.58))]" />
        </div>
        <div className="p-8 md:p-12 lg:p-16">
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#d3b473]">
            {homeTexts.concierge_label || "Atendimento consultivo"}
          </p>
          <h2 className="mt-6 font-heading text-[clamp(2.6rem,5.4vw,5.6rem)] font-medium leading-[0.9]">
            {homeTexts.concierge_title || "Vamos desenhar o próximo capítulo da sua área externa?"}
          </h2>
          <p className="mt-7 max-w-2xl text-base font-light leading-8 text-white/62 md:text-lg">
            {homeTexts.concierge_text ||
              "Conte sobre o imóvel, fase da obra e escopo desejado. A equipe retorna com o próximo passo mais adequado para seu contexto."}
          </p>
          <form onSubmit={submitLead} onFocusCapture={onBriefingStarted} className="mt-10 grid gap-4">
            <input
              value={lead.name}
              onChange={(e) => setLead((p) => ({ ...p, name: e.target.value }))}
              className={fieldClass}
              placeholder="Seu nome"
              aria-label="Seu nome"
              required
            />
            <input
              value={lead.whatsapp}
              onChange={(e) => setLead((p) => ({ ...p, whatsapp: e.target.value }))}
              className={fieldClass}
              placeholder="WhatsApp"
              aria-label="WhatsApp"
              required
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                value={lead.city}
                onChange={(e) => setLead((p) => ({ ...p, city: e.target.value }))}
                className={fieldClass}
                placeholder="Cidade"
                aria-label="Cidade"
                required
              />
              <select
                value={lead.propertyType}
                onChange={(e) => setLead((p) => ({ ...p, propertyType: e.target.value }))}
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
            <div className="grid gap-4 sm:grid-cols-2">
              <select
                value={lead.phase}
                onChange={(e) => setLead((p) => ({ ...p, phase: e.target.value }))}
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
                onChange={(e) => setLead((p) => ({ ...p, scope: e.target.value }))}
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
            <div className="grid gap-4 sm:grid-cols-2">
              <select
                value={lead.timeline}
                onChange={(e) => setLead((p) => ({ ...p, timeline: e.target.value }))}
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
                onChange={(e) => setLead((p) => ({ ...p, investment: e.target.value }))}
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
              onChange={(e) => setLead((p) => ({ ...p, details: e.target.value }))}
              className={`${fieldClass} min-h-28 py-3`}
              placeholder="Conte o contexto do imóvel e o resultado que você busca."
              aria-label="Detalhes do projeto"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="group/submit mt-3 inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-white px-8 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#171914] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#f5e6c8] hover:shadow-[0_8px_32px_rgba(211,180,115,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Enviando..." : homeTexts.concierge_button || "Solicitar uma proposta autoral"}
              <MessageCircle className="h-4 w-4 transition-transform duration-500 group-hover/submit:translate-x-0.5" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
