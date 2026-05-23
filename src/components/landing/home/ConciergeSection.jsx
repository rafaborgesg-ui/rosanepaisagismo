import { MessageCircle } from "lucide-react";
import { useLandingContent } from "@/hooks/useLandingContent";

const FloatingInput = ({ value, onChange, label, required, type = "text" }) => (
  <div className="relative pt-4 w-full">
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={label}
      className="peer min-h-[52px] w-full border-0 border-b border-white/20 bg-transparent px-1 py-2 text-sm text-white outline-none transition-all placeholder-transparent focus:border-[#d3b473] focus:bg-white/[0.02]"
    />
    <label className={`pointer-events-none absolute left-1 top-1/2 -translate-y-1/2 text-sm text-white/50 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#d3b473] ${value ? "top-0 text-xs text-white/70" : ""}`}>
      {label} {required && "*"}
    </label>
  </div>
);

const FloatingSelect = ({ value, onChange, label, options, required }) => (
  <div className="relative pt-4 w-full">
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="peer min-h-[52px] w-full appearance-none border-0 border-b border-white/20 bg-transparent px-1 py-2 text-sm text-white outline-none transition-all focus:border-[#d3b473] focus:bg-white/[0.02] cursor-pointer"
    >
      <option value="" disabled hidden></option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="text-[#171914]">
          {opt}
        </option>
      ))}
    </select>
    <label className={`pointer-events-none absolute left-1 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#d3b473] ${value ? 'top-0 text-xs text-white/70' : 'top-1/2 -translate-y-1/2 text-sm text-white/50'}`}>
      {label} {required && "*"}
    </label>
    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/30 peer-focus:text-[#d3b473]">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
    </div>
  </div>
);

const FloatingTextarea = ({ value, onChange, label }) => (
  <div className="relative pt-4 w-full">
    <textarea
      value={value}
      onChange={onChange}
      placeholder={label}
      className="peer min-h-[112px] w-full border-0 border-b border-white/20 bg-transparent px-1 py-3 text-sm text-white outline-none transition-all placeholder-transparent focus:border-[#d3b473] focus:bg-white/[0.02] resize-none"
    />
    <label className={`pointer-events-none absolute left-1 top-6 -translate-y-1/2 text-sm text-white/50 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#d3b473] ${value ? "top-0 text-xs text-white/70" : ""}`}>
      {label}
    </label>
  </div>
);

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
            className="absolute inset-0 h-full w-full object-cover grayscale-[6%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,9,0.04),rgba(8,16,9,0.58))]" />
        </div>
        <div className="p-8 md:p-12 lg:p-16">
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#d3b473]">
            {homeTexts.concierge_label || "Atendimento consultivo"}
          </p>
          <h2 className="mt-6 font-heading text-[clamp(2.6rem,5.4vw,5.6rem)] font-medium leading-[0.9]">
            {homeTexts.concierge_title || "Uma primeira leitura para um jardim feito sob medida."}
          </h2>
          <p className="mt-7 max-w-2xl text-base font-light leading-8 text-white/62 md:text-lg">
            {homeTexts.concierge_text ||
              "Conte sobre o imóvel, fase da obra e intenção de uso. A equipe retorna com o caminho mais adequado para iniciar uma proposta autoral."}
          </p>
          <form onSubmit={submitLead} onFocusCapture={onBriefingStarted} className="mt-10 grid gap-6">
            <FloatingInput
              label="Seu nome"
              value={lead.name}
              onChange={(e) => setLead((p) => ({ ...p, name: e.target.value }))}
              required
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <FloatingInput
                label="WhatsApp"
                type="tel"
                value={lead.whatsapp}
                onChange={(e) => setLead((p) => ({ ...p, whatsapp: e.target.value }))}
                required
              />
              <FloatingInput
                label="Cidade do projeto"
                value={lead.city}
                onChange={(e) => setLead((p) => ({ ...p, city: e.target.value }))}
                required
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <FloatingSelect
                label="Tipo de imóvel"
                value={lead.propertyType}
                onChange={(e) => setLead((p) => ({ ...p, propertyType: e.target.value }))}
                required
                options={["Residencial", "Clínica ou corporativo", "Condomínio ou área comum", "Empreendimento"]}
              />
              <FloatingSelect
                label="Fase do projeto"
                value={lead.phase}
                onChange={(e) => setLead((p) => ({ ...p, phase: e.target.value }))}
                required
                options={["Terreno ou anteprojeto", "Em obra", "Imóvel pronto", "Reforma de área externa"]}
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <FloatingSelect
                label="Escopo desejado"
                value={lead.scope}
                onChange={(e) => setLead((p) => ({ ...p, scope: e.target.value }))}
                required
                options={["Projeto completo", "Consultoria técnica", "Projeto + implantação", "Jardim vertical"]}
              />
              <FloatingSelect
                label="Prazo desejado"
                value={lead.timeline}
                onChange={(e) => setLead((p) => ({ ...p, timeline: e.target.value }))}
                required
                options={["Até 3 meses", "3 a 6 meses", "6 a 12 meses", "Sem prazo definido"]}
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-1">
              <FloatingSelect
                label="Faixa de investimento (opcional)"
                value={lead.investment}
                onChange={(e) => setLead((p) => ({ ...p, investment: e.target.value }))}
                options={["Até R$15 mil", "R$15k a R$35k", "R$35k a R$80k", "Acima de R$80k", "Ainda não sei"]}
              />
            </div>
            <FloatingTextarea
              label="Detalhes e expectativas do projeto"
              value={lead.details}
              onChange={(e) => setLead((p) => ({ ...p, details: e.target.value }))}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="group/submit mt-4 inline-flex min-h-[56px] w-full sm:w-auto items-center justify-center gap-4 rounded-full bg-white px-10 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#171914] transition-all duration-500 hover:-translate-y-1 hover:bg-[#f5e6c8] hover:shadow-[0_12px_40px_rgba(211,180,115,0.22)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <span className="relative z-10 flex items-center gap-3">
                 {isSubmitting ? "Enviando briefing..." : homeTexts.concierge_button || "Solicitar curadoria paisagística"}
                 <MessageCircle className="h-4 w-4 transition-transform duration-500 group-hover/submit:translate-x-1 group-hover/submit:scale-110" aria-hidden="true" />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
