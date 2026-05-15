import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { api } from "@/api/apiService";
import { auth } from "@/api/authService";

import { motion } from "framer-motion";

export default function Agradecimento() {
  const { isAuthenticated } = useAuth();

  const handleAcessar = () => {
    if (isAuthenticated) {
      window.location.href = "/dashboard";
    } else {
      auth.redirectToLogin("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#173727] flex flex-col overflow-x-hidden text-white">
      <style>{`
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Topo */}
      <header className="w-full py-8 px-8 flex items-center justify-center border-b border-white/10 bg-[#173727] font-body">
        <Link to="/" className="font-display text-2xl font-bold text-[#d7ae45] tracking-widest uppercase">
          Rosane Paisagismo
        </Link>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 flex items-center justify-center px-6 py-20 relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d7ae45]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-3xl w-full text-center font-body relative z-10">

          {/* Ícone de sucesso */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center mb-10"
          >
            <div className="w-24 h-24 rounded-full bg-white/5 border border-[#d7ae45]/30 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[#d7ae45]/20 animate-pulse"></div>
              <span className="material-symbols-outlined text-[#d7ae45] relative z-10" style={{fontSize: "48px"}}>verified</span>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center gap-3 bg-[#d7ae45]/10 text-[#d7ae45] border border-[#d7ae45]/20 px-6 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-[0.3em]">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Acesso Liberado com Sucesso
            </span>
          </motion.div>

          {/* Título */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight"
          >
            Seja Bem-vindo à<br/>
            <span className="text-[#d7ae45] italic">Alta Renda.</span>
          </motion.h1>

          {/* Texto */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/60 text-xl leading-relaxed mb-16 max-w-2xl mx-auto font-light"
          >
            Sua jornada rumo à excelência botânica começou. O sistema{" "}
            <span className="font-bold text-[#d7ae45]">Paisagismo Inteligente</span>{" "}
            agora é a chave para a gestão premium do seu escritório.
          </motion.p>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={handleAcessar}
              className="inline-flex items-center justify-center gap-4 bg-[#d7ae45] text-[#173727] px-12 py-6 rounded-full font-extrabold text-[11px] uppercase tracking-[0.25em] hover:bg-white transition-all duration-300 shadow-2xl hover:scale-105 w-full sm:w-auto"
            >
              Acessar Plataforma Exclusiva
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </motion.div>

          {/* Divisor */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="my-20 flex items-center gap-6"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d7ae45]/30"></div>
            <span className="material-symbols-outlined text-[#d7ae45]/50">diamond</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d7ae45]/30"></div>
          </motion.div>

          {/* Destaques */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          >
            {[
              { icon: "lock", title: "Acesso Premium", desc: "Entre na plataforma agora mesmo com seu e-mail de cadastro." },
              { icon: "support_agent", title: "Concierge Incluso", desc: "Nossa equipe está disponível para guiar cada etapa da sua experiência." },
              { icon: "card_giftcard", title: "Bônus Ativado", desc: "O Masterclass de Projetos Autorais já está liberado no painel." },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#d7ae45]/10 flex items-center justify-center mb-6 border border-[#d7ae45]/20">
                  <span className="material-symbols-outlined text-[#d7ae45]">{item.icon}</span>
                </div>
                <h3 className="font-display font-bold text-white mb-2 text-xl">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Rodapé simples */}
      <footer className="py-10 text-center text-[10px] text-white/30 font-body uppercase tracking-[0.3em] border-t border-white/5">
        © {new Date().getFullYear()} Rosane Borges · Exclusividade em Paisagismo
      </footer>
    </div>
  );
}
