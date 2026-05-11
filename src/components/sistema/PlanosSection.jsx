import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { base44 } from "@/api/base44Client";
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
    <section className="py-20 bg-[#f9f9f9] font-sans-s" id="planos">
      <style>{`
        .font-serif-s { font-family: 'Noto Serif', serif; }
        .font-sans-s { font-family: 'Work Sans', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }
      `}</style>
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif-s text-4xl lg:text-5xl font-bold text-[#1a3d2b] mb-2">Escolha o plano ideal</h2>
          <p className="text-stone-500 text-lg">Experimente grátis por 7 dias. Cancele quando quiser.</p>
        </div>

        {/* Seletor de Período */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1 bg-stone-100 rounded-full border border-stone-200">
            {[
              { key: "mensal", label: "Mensal" },
              { key: "semestral", label: <span>Semestral <span className="opacity-80">-25%</span></span> },
              { key: "anual", label: <span>Anual <span className="opacity-80">-40%</span></span> }].
              map(({ key, label }) =>
              <button
                key={key}
                onClick={() => setPeriod(key)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                period === key ?
                "bg-[#276a4d] text-white shadow-md" :
                "text-stone-500 hover:bg-white"}`
                }>
                
                {label}
              </button>
              )}
          </div>
        </div>

        {/* Cards */}
        <div className={`grid gap-8 items-start justify-center ${period === "anual" ? "md:grid-cols-2 max-w-3xl mx-auto" : "max-w-md mx-auto"}`}>

          {/* Básico — só no plano anual */}
          {period === "anual" &&
            <div className="bg-white p-8 rounded-xl border border-stone-200 flex flex-col h-full shadow-sm">
              <div className="mb-8">
                <h3 className="font-serif-s text-2xl text-[#1a3d2b] mb-2">Básico</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#1a3d2b]">R$ 39</span>
                  <span className="text-stone-400">/mês</span>
                </div>
                <p className="text-sm text-stone-500 mt-2 italic">Ideal para escritórios monogestão.</p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {["1 usuário", "8 projetos ativos", "Combo Paisagista Profissional", "Suporte por e-mail"].map((f, i) =>
                <li key={i} className="flex items-center gap-3 text-sm text-stone-700">
                    <span className="material-symbols-outlined text-[#276a4d] text-[20px]">check_circle</span>{f}
                  </li>
                )}
              </ul>
              <button
                onClick={() => handleAssinar("basico_anual")}
                className="w-full border border-[#276a4d] text-[#276a4d] py-3 rounded-lg font-bold text-sm hover:bg-[#276a4d] hover:text-white transition-all">
                
                Testar Grátis por 7 Dias
              </button>
              
            </div>
            }

          {/* PRO — Destaque */}
          <div className="bg-white p-8 rounded-xl border-2 border-[#276a4d] flex flex-col h-full shadow-2xl relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#276a4d] text-white text-[10px] px-4 py-1 rounded-full font-bold uppercase tracking-wider">
              O MAIS POPULAR
            </div>
            <div className="mb-8">
              <h3 className="font-serif-s text-2xl text-[#1a3d2b] mb-2">PRO</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[#1a3d2b]">{proPrice[period]}</span>
                <span className="text-stone-400">/mês</span>
              </div>
              <p className="text-sm text-stone-500 mt-2 italic">Focado em escritórios em crescimento.</p>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              {["5 usuários", "15 projetos ativos", "Combo Paisagista Profissional", "Suporte por E-mail + WhatsApp"].map((f, i) =>
                <li key={i} className={`flex items-center gap-3 text-sm ${i === 0 ? "font-semibold text-stone-800" : "text-stone-700"}`}>
                  <span className="material-symbols-outlined text-[#276a4d] text-[20px]">check_circle</span>{f}
                </li>
                )}
            </ul>
            <button
                onClick={() => handleAssinar(`pro_${period}`)}
                className="w-full bg-[#276a4d] text-white py-4 rounded-lg font-bold text-sm shadow-md hover:bg-[#1a3d2b] transition-all">
                
              Testar Grátis por 7 Dias
            </button>
          </div>

        </div>
      </div>
    </section>
    </>);

}