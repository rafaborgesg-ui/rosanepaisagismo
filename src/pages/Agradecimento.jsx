import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";

export default function Agradecimento() {
  const { isAuthenticated } = useAuth();

  const handleAcessar = () => {
    if (isAuthenticated) {
      window.location.href = "/dashboard";
    } else {
      base44.auth.redirectToLogin("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&family=Work+Sans:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }
        .font-serif-s { font-family: 'Noto Serif', serif; }
        .font-sans-s { font-family: 'Work Sans', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.8s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.8s ease 0.2s forwards; opacity: 0; }
        .fade-up-3 { animation: fadeUp 0.8s ease 0.45s forwards; opacity: 0; }
        .fade-up-4 { animation: fadeUp 0.8s ease 0.65s forwards; opacity: 0; }
      `}</style>

      {/* Topo */}
      <header className="w-full py-6 px-8 flex items-center justify-center border-b border-stone-100 bg-white font-sans-s">
        <Link to="/" className="font-serif-s text-lg font-bold text-[#1a3d2b] tracking-tight">
          Rosane Paisagismo
        </Link>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full text-center font-sans-s">

          {/* Ícone de sucesso */}
          <div className="fade-up flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-[#276a4d]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#276a4d]" style={{fontSize: "42px"}}>check_circle</span>
            </div>
          </div>

          {/* Badge */}
          <div className="fade-up-2 flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-[#276a4d]/10 text-[#276a4d] px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Compra Realizada com Sucesso
            </span>
          </div>

          {/* Título */}
          <h1 className="fade-up-3 font-serif-s text-5xl lg:text-6xl font-bold text-[#1a3d2b] mb-6 leading-tight">
            Obrigado!
          </h1>

          {/* Texto */}
          <p className="fade-up-3 text-stone-500 text-lg leading-relaxed mb-12 max-w-lg mx-auto">
            Sua jornada rumo à excelência começou. O sistema{" "}
            <span className="font-semibold text-[#276a4d]">Paisagismo Inteligente</span>{" "}
            agora é seu aliado na gestão do seu escritório.
          </p>

          {/* CTA */}
          <div className="fade-up-4">
            <button
              onClick={handleAcessar}
              className="inline-flex items-center gap-3 bg-[#276a4d] text-white px-10 py-5 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#1a3d2b] transition-colors shadow-lg shadow-[#276a4d]/20"
            >
              Acessar Plataforma
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>

          {/* Divisor */}
          <div className="my-16 flex items-center gap-6">
            <div className="flex-1 h-px bg-stone-200"></div>
            <span className="material-symbols-outlined text-stone-300">eco</span>
            <div className="flex-1 h-px bg-stone-200"></div>
          </div>

          {/* Destaques */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              { icon: "lock", title: "Acesso Imediato", desc: "Entre na plataforma agora mesmo com seu e-mail de cadastro." },
              { icon: "support_agent", title: "Suporte Incluso", desc: "Nossa equipe está disponível para te ajudar em cada etapa." },
              { icon: "card_giftcard", title: "Bônus Ativado", desc: "O Combo Paisagista Profissional já está disponível na sua conta." },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm">
                <span className="material-symbols-outlined text-[#276a4d] mb-3 block">{item.icon}</span>
                <h3 className="font-serif-s font-bold text-[#1a3d2b] mb-1 text-sm">{item.title}</h3>
                <p className="text-stone-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Rodapé simples */}
      <footer className="py-8 text-center text-xs text-stone-400 font-sans-s uppercase tracking-widest border-t border-stone-100">
        © 2026 Rosane Borges · Paisagismo Inteligente
      </footer>
    </div>
  );
}