import { MessageCircle } from "lucide-react";

export default function ConciergeSection({ lead, setLead, submitLead }) {
  return (
    <section id="contato-concierge" className="bg-white px-4 py-20 pb-32 md:py-28 md:pb-28">
      <div className="mx-auto grid w-[min(100%,1180px)] overflow-hidden rounded-[8px] border border-[#dfd9cc] bg-[#111913] text-white shadow-[0_30px_90px_rgba(36,35,28,0.16)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[360px]">
          <img
            src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p5_i2.jpg"
            alt="Composicao de jardim em area social"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#111913]/20" />
        </div>
        <div className="p-7 md:p-10 lg:p-12">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
            Atendimento
          </p>
          <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-5xl">
            Vamos avaliar o potencial do seu projeto?
          </h2>
          <p className="mt-5 leading-7 text-white/68">
            Conte sobre o imovel, fase da obra e escopo desejado. A equipe retorna com
            o proximo passo mais adequado para seu contexto.
          </p>
          <form onSubmit={submitLead} className="mt-8 grid gap-3">
            <input
              value={lead.name}
              onChange={(event) => setLead((prev) => ({ ...prev, name: event.target.value }))}
              className="min-h-12 rounded-[8px] border border-white/16 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/42 focus:border-[#d3b473]"
              placeholder="Seu nome"
              aria-label="Seu nome"
            />
            <input
              value={lead.whatsapp}
              onChange={(event) =>
                setLead((prev) => ({ ...prev, whatsapp: event.target.value }))
              }
              className="min-h-12 rounded-[8px] border border-white/16 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/42 focus:border-[#d3b473]"
              placeholder="WhatsApp"
              aria-label="WhatsApp"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={lead.city}
                onChange={(event) => setLead((prev) => ({ ...prev, city: event.target.value }))}
                className="min-h-12 rounded-[8px] border border-white/16 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/42 focus:border-[#d3b473]"
                placeholder="Cidade"
                aria-label="Cidade"
              />
              <select
                value={lead.propertyType}
                onChange={(event) =>
                  setLead((prev) => ({ ...prev, propertyType: event.target.value }))
                }
                className="min-h-12 rounded-[8px] border border-white/16 bg-white/10 px-4 text-sm text-white outline-none transition focus:border-[#d3b473]"
                aria-label="Tipo de imovel"
              >
                <option className="text-[#171914]">Residencial</option>
                <option className="text-[#171914]">Clinica ou corporativo</option>
                <option className="text-[#171914]">Condominio ou area comum</option>
                <option className="text-[#171914]">Empreendimento</option>
              </select>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <select
                value={lead.phase}
                onChange={(event) => setLead((prev) => ({ ...prev, phase: event.target.value }))}
                className="min-h-12 rounded-[8px] border border-white/16 bg-white/10 px-4 text-sm text-white outline-none transition focus:border-[#d3b473]"
                aria-label="Fase do projeto"
              >
                <option className="text-[#171914]">Terreno ou anteprojeto</option>
                <option className="text-[#171914]">Em obra</option>
                <option className="text-[#171914]">Imovel pronto</option>
                <option className="text-[#171914]">Reforma de area externa</option>
              </select>
              <select
                value={lead.scope}
                onChange={(event) => setLead((prev) => ({ ...prev, scope: event.target.value }))}
                className="min-h-12 rounded-[8px] border border-white/16 bg-white/10 px-4 text-sm text-white outline-none transition focus:border-[#d3b473]"
                aria-label="Escopo desejado"
              >
                <option className="text-[#171914]">Projeto completo</option>
                <option className="text-[#171914]">Consultoria tecnica</option>
                <option className="text-[#171914]">Projeto + implantacao</option>
                <option className="text-[#171914]">Jardim vertical</option>
              </select>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <select
                value={lead.timeline}
                onChange={(event) =>
                  setLead((prev) => ({ ...prev, timeline: event.target.value }))
                }
                className="min-h-12 rounded-[8px] border border-white/16 bg-white/10 px-4 text-sm text-white outline-none transition focus:border-[#d3b473]"
                aria-label="Prazo desejado"
              >
                <option className="text-[#171914]">Ate 3 meses</option>
                <option className="text-[#171914]">3 a 6 meses</option>
                <option className="text-[#171914]">6 a 12 meses</option>
                <option className="text-[#171914]">Sem prazo definido</option>
              </select>
              <input
                value={lead.investment}
                onChange={(event) =>
                  setLead((prev) => ({ ...prev, investment: event.target.value }))
                }
                className="min-h-12 rounded-[8px] border border-white/16 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/42 focus:border-[#d3b473]"
                placeholder="Faixa de investimento (opcional)"
                aria-label="Faixa de investimento"
              />
            </div>
            <textarea
              value={lead.details}
              onChange={(event) => setLead((prev) => ({ ...prev, details: event.target.value }))}
              className="min-h-28 rounded-[8px] border border-white/16 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/42 focus:border-[#d3b473]"
              placeholder="Conte o contexto do imovel e o resultado que voce busca."
              aria-label="Detalhes do projeto"
            />
            <button
              type="submit"
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473]"
            >
              Enviar briefing inicial
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
