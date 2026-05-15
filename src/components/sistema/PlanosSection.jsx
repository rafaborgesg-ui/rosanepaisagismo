import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { api } from "@/api/apiService";
// Links Kiwify para cada plano/período
const KIWIFY_LINKS = {
  basico_anual: "https://pay.kiwify.com.br/kCzjx5s",
  pro_mensal: "https://pay.kiwify.com.br/IApfgsq",
  pro_semestral: "https://pay.kiwify.com.br/8iMrbQb",
  pro_anual: "https://pay.kiwify.com.br/cSRmzsT"
};

export default function PlanosSection({ onSignup }) {
  const [period, setPeriod] = useState("anual");

  const proPrice = { mensal: "R$ 97", semestral: "R$ 79", anual: "R$ 59" };

  const handleAssinar = (planKey) => {
    window.open(KIWIFY_LINKS[planKey], "_blank");
  };

  return (
    <>
    <section className="py-32 bg-[#fcfaf7] font-body" id="planos">
      <style>{`
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }
      `}</style>
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-16">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-[#d7ae45] mb-4">Investimento</p>
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-[#173727] mb-6">Licenças da Plataforma</h2>
          <p className="text-stone-500 text-xl font-light">Elevando o padrão do seu escritório. 7 dias de garantia incondicional.</p>
        </div>

        {/* Seletor de Período */}
        <div className="flex justify-center mb-20">
          <div className="inline-flex p-1 bg-white rounded-full border border-stone-200 shadow-sm">
            {[
              { key: "mensal", label: "Mensal" },
              { key: "semestral", label: <span>Semestral <span className="opacity-80 text-[#d7ae45] font-bold text-[10px]">-25%</span></span> },
              { key: "anual", label: <span>Anual <span className="opacity-80 text-[#d7ae45] font-bold text-[10px]">-40%</span></span> }].
              map(({ key, label }) =>
              <button
                key={key}
                onClick={() => setPeriod(key)}
                className={`px-8 py-3 rounded-full text-[11px] font-extrabold uppercase tracking-[0.1em] transition-all ${
                period === key ?
                "bg-[#173727] text-[#d7ae45] shadow-lg" :
                "text-stone-500 hover:bg-stone-50"}`
                }>
                
                {label}
              </button>
              )}
          </div>
        </div>

        {/* Cards */}
        <div className={`grid gap-10 items-start justify-center ${period === "anual" ? "md:grid-cols-2 max-w-4xl mx-auto" : "max-w-lg mx-auto"}`}>

          {/* Básico — só no plano anual */}
          {period === "anual" &&
            <div className="bg-white p-12 rounded-[32px] border border-stone-200 flex flex-col h-full shadow-sm hover:shadow-xl transition-shadow">
              <div className="mb-10">
                <h3 className="font-display text-3xl font-bold text-[#173727] mb-2">Essencial</h3>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-5xl font-display font-bold text-[#173727]">R$ 39</span>
                  <span className="text-stone-400 tracking-widest text-xs uppercase">/mês</span>
                </div>
                <p className="text-sm text-stone-500 mt-4 leading-relaxed font-light">Ideal para profissionais autônomos em início de jornada.</p>
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                {["1 usuário VIP", "Até 8 projetos ativos", "Acesso ao Master Bundle", "Suporte dedicado"].map((f, i) =>
                <li key={i} className="flex items-center gap-4 text-[15px] text-stone-700">
                    <span className="material-symbols-outlined text-[#d7ae45] text-[22px]">verified</span>{f}
                  </li>
                )}
              </ul>
              <button
                onClick={() => handleAssinar("basico_anual")}
                className="w-full border-2 border-[#173727] text-[#173727] py-5 rounded-full font-extrabold text-[11px] uppercase tracking-[0.2em] hover:bg-[#173727] hover:text-[#d7ae45] transition-all">
                
                Iniciar Licença
              </button>
              
            </div>
            }

          {/* PRO — Destaque */}
          <div className="bg-[#173727] text-white p-12 rounded-[32px] border border-[#d7ae45]/30 flex flex-col h-full shadow-2xl relative transform md:-translate-y-4">
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#d7ae45] text-[#173727] text-[10px] px-5 py-2 rounded-full font-extrabold uppercase tracking-[0.3em] shadow-lg">
              Escolha Premium
            </div>
            <div className="mb-10">
              <h3 className="font-display text-3xl font-bold text-white mb-2">Signature</h3>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-5xl font-display font-bold text-[#d7ae45]">{proPrice[period]}</span>
                <span className="text-white/40 tracking-widest text-xs uppercase">/mês</span>
              </div>
              <p className="text-sm text-white/60 mt-4 leading-relaxed font-light">Para escritórios consolidados e equipes em expansão.</p>
            </div>
            <ul className="space-y-5 mb-12 flex-grow">
              {["5 usuários administrativos", "Até 15 projetos ativos", "Acesso ao Master Bundle", "Concierge Exclusivo (WhatsApp)"].map((f, i) =>
                <li key={i} className={`flex items-center gap-4 text-[15px] ${i === 0 ? "font-semibold text-white" : "text-white/80"}`}>
                  <span className="material-symbols-outlined text-[#d7ae45] text-[22px]">verified</span>{f}
                </li>
                )}
            </ul>
            <button
                onClick={() => handleAssinar(`pro_${period}`)}
                className="w-full bg-[#d7ae45] text-[#173727] py-5 rounded-full font-extrabold text-[11px] uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(215,174,69,0.3)] hover:bg-white transition-all">
                
              Desbloquear Acesso VIP
            </button>
          </div>

        </div>
      </div>
    </section>
    </>);

}
