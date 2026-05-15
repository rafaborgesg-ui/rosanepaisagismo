import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SiteFooter from "@/components/landing/SiteFooter";
import { api } from "@/api/apiService";
import { useAuth } from "@/lib/AuthContext";
import { auth } from "@/api/authService";
import PlanosSection from "@/components/sistema/PlanosSection";

export default function Sistema() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      auth.redirectToLogin('/dashboard');
    }
  };

  const handleSignup = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#f9f9f9] text-[#1a3d2b] min-h-screen overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }
      `}</style>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#173727]/90 backdrop-blur-xl border-b border-white/10 font-body">
        <div className="max-w-[1280px] mx-auto px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-white">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#d7ae45] font-display text-2xl font-bold text-[#173727]">R</span>
            <span className="leading-tight">
              <span className="block text-sm font-bold uppercase tracking-[0.24em]">Rosane</span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-white/60">Plataforma</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/70">
            <Link to="/" className="hover:text-[#d7ae45] transition-colors">Site Institucional</Link>
            <a href="#funcionalidades" className="hover:text-[#d7ae45] transition-colors">Recursos</a>
            <a href="#bonus" className="hover:text-[#d7ae45] transition-colors">Bônus</a>
            <a href="#planos" className="hover:text-[#d7ae45] transition-colors">Licenças</a>
          </nav>
          <button
            onClick={handleLogin}
            className="px-8 py-4 bg-[#d7ae45] text-[#173727] rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl"
          >
            Painel do Cliente
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#173727] py-24 lg:py-32 text-white">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-[#d7ae45]/10 to-transparent pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center relative z-10">
          <div>
            <p className="font-body text-[#d7ae45] mb-6 uppercase tracking-[0.4em] text-[10px] font-extrabold">Gestão de Alto Padrão</p>
            <h1 className="font-display text-5xl lg:text-[4.5rem] font-bold text-white mb-8 leading-[1.1]">
              Eleve a gestão do seu <span className="italic text-[#d7ae45]">escritório.</span>
            </h1>
            <p className="font-body text-white/70 mb-12 max-w-lg text-xl font-light leading-relaxed">
              A primeira plataforma financeira e operacional premium pensada exclusivamente para escritórios de arquitetura e paisagismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button
                onClick={handleSignup}
                className="px-10 py-5 bg-[#d7ae45] text-[#173727] rounded-full font-extrabold text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-all font-body shadow-xl hover:scale-105"
              >
                Inicie sua jornada
              </button>
              <button
                onClick={handleSignup}
                className="px-10 py-5 border border-white/20 text-white rounded-full font-extrabold text-[11px] hover:border-[#d7ae45] transition-all font-body uppercase tracking-[0.2em]"
              >
                Ver recursos VIP
              </button>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-2xl bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/10 shadow-[0_0_80px_rgba(215,174,69,0.15)] overflow-hidden transition-transform duration-700 hover:scale-105">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                </div>
                <div className="flex-grow mx-4 h-8 bg-white/5 rounded-full border border-white/10 flex items-center px-4">
                  <span className="text-[10px] text-white/40 font-body uppercase tracking-widest truncate">rosanepaisagismo.com/plataforma</span>
                </div>
              </div>
              <img
                  alt="Painel do Sistema"
                  className="w-full h-auto object-cover opacity-90 mix-blend-screen"
                  src="https://media.base44.com/images/public/69ea9c43ca6eb4180010c463/ad4bc841d_image.png"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 px-8 max-w-[1280px] mx-auto font-sans-s">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#276a4d] mb-4 uppercase tracking-[0.2em] text-xs font-bold">BENEFÍCIOS</p>
            <h2 className="font-serif-s text-4xl lg:text-5xl font-bold text-[#1a3d2b] mb-6">Dados reais, decisões melhores</h2>
            <p className="text-stone-500 mb-12 text-lg leading-relaxed">
              Cada transação registrada, categorizada e visualizada. Saiba exatamente onde está seu dinheiro e para onde ele vai.
            </p>
            <div className="grid gap-5">
              {[
                "Dados separados por usuário — total privacidade",
                "Acesso de qualquer dispositivo, a qualquer hora",
                "Visualizações intuitivas sem precisar de planilhas",
                "Alertas automáticos de vencimentos e pendências",
                "Comparativo mês a mês para tomada de decisão",
                "Configuração em menos de 5 minutos",
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#276a4d] bg-[#276a4d]/10 p-1 rounded-full text-[18px]">check</span>
                  <p className="text-[#1a3d2b] font-medium">{b}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#276a4d] p-12 rounded-[32px] flex flex-col items-center text-center text-white shadow-2xl shadow-[#276a4d]/20">
            <div className="bg-white/10 p-4 rounded-2xl mb-10 border border-white/20">
              <span className="material-symbols-outlined text-4xl text-white">eco</span>
            </div>
            <h3 className="font-serif-s text-4xl font-bold text-white mb-4">Comece Agora</h3>
            <p className="text-white/80 mb-10 text-lg leading-relaxed max-w-xs">
              Crie sua conta em segundos e tenha controle total das suas finanças.
            </p>
            <button
              onClick={handleSignup}
              className="w-full bg-white text-[#276a4d] py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-stone-100 transition-colors flex items-center justify-center gap-2"
            >
              Começar
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="py-20 px-8 bg-stone-50" id="funcionalidades">
        <div className="max-w-[1280px] mx-auto text-center mb-16 font-sans-s">
          <p className="text-[#276a4d] mb-4 uppercase tracking-[0.2em] text-xs font-bold">FUNCIONALIDADES</p>
          <h2 className="font-serif-s text-4xl lg:text-5xl font-bold text-[#1a3d2b] mb-4">Tudo que você precisa</h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg">
            Módulos integrados que trabalham juntos para dar você a visão completa do seu negócio.
          </p>
        </div>
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 font-sans-s">
          {[
            { bg: "bg-[#E7F6EF]", color: "text-[#00A361]", icon: "trending_up", title: "Controle de Receitas", desc: "Registre contratos, parcelas e acompanhe cada entrada com visibilidade total por competência." },
            { bg: "bg-[#FEEBED]", color: "text-[#F44336]", icon: "trending_down", title: "Gestão de Despesas", desc: "Categorize despesas fixas e variáveis, controle vencimentos e alertas de pagamentos pendentes." },
            { bg: "bg-[#EBF1FE]", color: "text-[#3F51B5]", icon: "group", title: "Pipeline Comercial", desc: "Acompanhe propostas enviadas, negociações em andamento e taxa de conversão de novos clientes." },
            { bg: "bg-[#FFF8E1]", color: "text-[#FFB300]", icon: "track_changes", title: "Metas Anuais", desc: "Defina metas pessimistas, realistas e ideais. Visualize seu progresso mês a mês em tempo real." },
            { bg: "bg-[#F3E5F5]", color: "text-[#9C27B0]", icon: "bar_chart", title: "Fluxo de Caixa", desc: "Gráficos de receitas, despesas e lucro mensal para uma visão clara da saúde financeira do negócio." },
            { bg: "bg-[#E0F2F1]", color: "text-[#009688]", icon: "description", title: "Relatórios Exportáveis", desc: "Gere relatórios detalhados por período e exporte para CSV com um clique, prontos para o contador." },
          ].map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-6`}>
                <span className={`material-symbols-outlined ${f.color}`}>{f.icon}</span>
              </div>
              <h3 className="font-serif-s text-xl text-[#1a3d2b] font-bold mb-4">{f.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bônus Exclusivo */}
      <section className="py-20 bg-stone-50" id="bonus">
        <div className="max-w-[1280px] mx-auto px-8 font-sans-s">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 bg-[#1a3d2b]/10 px-3 py-1 rounded-full mb-6 w-fit">
                <span className="material-symbols-outlined text-[16px] text-[#1a3d2b]">card_giftcard</span>
                <span className="text-[12px] font-semibold text-[#1a3d2b] uppercase tracking-wider">Bônus Exclusivo</span>
              </div>
              <h2 className="font-serif-s text-4xl lg:text-5xl font-bold text-[#1a3d2b] mb-6">E ainda tem um bônus que vale por si só</h2>
              <p className="text-stone-500 mb-4 text-lg leading-relaxed">
                Quem escolhe o plano <strong>Básico, PRO ou Premium</strong> desbloqueia o Combo Paisagista Profissional que já ajudou milhares de escritórios.
              </p>
              <p className="text-[#276a4d] font-semibold mb-8">+5 kit de ferramentas para profissionalizar seu escritório</p>
              <div className="grid gap-4 mb-10">
                {[
                  { icon: "description", title: "Modelos de Contrato", desc: "Contratos profissionais prontos para usar" },
                  { icon: "assignment_turned_in", title: "Checklist de Projetos", desc: "Não esqueça nenhuma etapa importante" },
                  { icon: "fact_check", title: "Briefing Completo", desc: "Capture todas as informações do cliente" },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border border-stone-200 flex items-start gap-4">
                    <span className="material-symbols-outlined text-[#276a4d]">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-[#1a3d2b]">{item.title}</h4>
                      <p className="text-sm text-stone-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleSignup}
                className="inline-flex items-center justify-center gap-2 bg-[#1a3d2b] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all w-fit shadow-lg"
              >
                Quero aproveitar <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Right — card escuro */}
            <div className="bg-[#1a3d2b] p-12 rounded-[40px] text-center flex flex-col items-center justify-center text-white min-h-[500px] shadow-2xl relative overflow-hidden">
              <div className="bg-[#adf1cc] text-[#002113] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 mb-8">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span> BÔNUS INCLUSO
              </div>
              <h3 className="font-serif-s text-[36px] font-bold text-white mb-2">Combo Paisagista Profissional</h3>
              <p className="text-white/50 text-sm mb-12 italic">+5 arquivos editáveis para profissionalizar seu escritório</p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-10 w-full max-w-[340px]">
                <span className="text-[32px] text-white/50 line-through decoration-red-400 decoration-2">R$ 94</span>
                <p className="text-white/70 text-xs my-2">Você não paga nada por isso!</p>
                <div className="text-[48px] font-bold text-[#adf1cc] leading-none mb-2">GRÁTIS</div>
                <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Incluso nos planos Básico, PRO e Premium</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preços */}
      <PlanosSection onSignup={handleSignup} />

      {/* CTA Final */}
      <section className="py-32 px-8 bg-[#173727] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#d7ae45]/10 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto font-body relative z-10">
          <h2 className="font-display text-4xl lg:text-6xl font-bold mb-8">Elevando a Arquitetura de Negócios.</h2>
          <p className="text-white/60 text-xl mb-12 leading-relaxed font-light">
            O sistema que organiza as finanças, protege o caixa e permite que o foco volte para a criação de projetos espetaculares.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleSignup}
              className="px-10 py-5 bg-[#d7ae45] text-[#173727] rounded-full font-extrabold text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl hover:scale-105"
            >
              Inicie a Transformação
            </button>
            <button
              onClick={handleLogin}
              className="px-10 py-5 border border-white/20 text-white rounded-full font-extrabold text-[11px] hover:border-[#d7ae45] transition-all uppercase tracking-[0.2em]"
            >
              Acessar Painel
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-white border-t border-stone-100 font-body" id="faq">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-[#d7ae45] mb-4">Suporte de Elite</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[#173727]">Dúvidas Frequentes</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: "Como faço para começar?", a: "Basta escolher seu plano e realizar o cadastro. O acesso é imediato." },
              { q: "Posso adicionar outros usuários?", a: "Sim, os planos PRO e Premium permitem múltiplos usuários com níveis de acesso personalizados." },
              { q: "Funciona no celular?", a: "Com certeza. O sistema é totalmente responsivo e funciona em qualquer dispositivo." },
              { q: "O combo paisagista profissional está incluso em qual plano?", a: "Este bônus exclusivo está disponível para todos os assinantes dos planos Semestral e Anual (Básico, PRO ou Premium dependendo da campanha)." },
            ].map((item, i) => (
              <details key={i} className="group bg-white border border-stone-200 rounded-xl overflow-hidden transition-all duration-300">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-stone-50 transition-colors">
                  <span className="font-semibold text-[#1a3d2b]">{item.q}</span>
                  <span className="material-symbols-outlined text-[#276a4d] transition-transform duration-300 group-open:rotate-180">expand_more</span>
                </summary>
                <div className="px-6 pb-6 text-stone-500">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
