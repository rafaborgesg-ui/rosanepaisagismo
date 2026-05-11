import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SiteFooter from "@/components/landing/SiteFooter";
import { api } from "@/api/apiService";
import { useAuth } from "@/lib/AuthContext";
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
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;600;700;900&family=Work+Sans:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }
        .font-serif-s { font-family: 'Noto Serif', serif; }
        .font-sans-s { font-family: 'Work Sans', sans-serif; }
      `}</style>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-stone-100 font-sans-s">
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          <Link to="/" className="font-serif-s text-xl font-bold text-[#1a3d2b] tracking-tight">
            Rosane Paisagismo
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <Link to="/" className="hover:text-[#276a4d] transition-colors">Site</Link>
            <a href="#funcionalidades" className="hover:text-[#276a4d] transition-colors">Funcionalidades</a>
            <a href="#bonus" className="hover:text-[#276a4d] transition-colors">Bônus</a>
            <a href="#planos" className="hover:text-[#276a4d] transition-colors">Planos</a>
          </nav>
          <button
            onClick={handleLogin}
            className="px-6 py-2.5 bg-[#276a4d] text-white rounded-xl text-sm font-bold hover:bg-[#1a3d2b] transition-colors font-sans-s"
          >
            Acessar Plataforma
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-32 border-b border-stone-100">
        <div className="max-w-[1280px] mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <p className="font-sans-s text-[#276a4d] mb-6 uppercase tracking-[0.2em] text-xs font-bold">O FUTURO DO SEU ESCRITÓRIO</p>
            <h1 className="font-serif-s text-5xl lg:text-6xl font-bold text-[#1a3d2b] mb-8 leading-tight">
              Suas finanças<br />sob controle
            </h1>
            <p className="font-sans-s text-stone-500 mb-10 max-w-lg text-lg leading-relaxed">
              A primeira plataforma de gestão financeira e operacional pensada exclusivamente para arquitetos e paisagistas. Organize fluxos, controle obras e prospere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSignup}
                className="px-8 py-4 bg-[#276a4d] text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#1a3d2b] transition-colors font-sans-s shadow-lg shadow-[#276a4d]/20"
              >
                Começar
              </button>
              <button
                onClick={handleSignup}
                className="px-8 py-4 border border-stone-200 text-[#1a3d2b] rounded-xl font-bold text-sm hover:bg-stone-50 transition-colors font-sans-s"
              >
                Ver demonstração
              </button>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-stone-400 font-sans-s">
              <div className="w-9 h-9 rounded-full bg-stone-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-stone-500">+</div>
              <p>Junte-se a outros profissionais</p>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="relative flex items-center justify-center lg:h-[560px]">
            <div className="relative w-full max-w-2xl bg-white rounded-xl border border-stone-200 shadow-2xl overflow-hidden lg:rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-stone-50 px-4 py-2 border-b border-stone-200 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-grow mx-4 h-6 bg-white rounded-md border border-stone-200 flex items-center px-3">
                  <span className="text-[10px] text-stone-400 font-sans-s truncate">rosanepaisagismo.com/dashboard</span>
                </div>
              </div>
              <img
                  alt="Painel do Sistema"
                  className="w-full h-auto object-cover"
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
      <section className="py-20 px-8 bg-[#1a3d2b] text-white text-center">
        <div className="max-w-2xl mx-auto font-sans-s">
          <h2 className="font-serif-s text-4xl lg:text-5xl font-bold mb-6">Pronto para transformar seu negócio?</h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            Junte-se a outros paisagistas que já gerenciam suas finanças com inteligência.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSignup}
              className="px-8 py-4 bg-white text-[#1a3d2b] rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-stone-100 transition-colors"
            >
              Criar conta
            </button>
            <button
              onClick={handleLogin}
              className="px-8 py-4 border border-white/30 text-white rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Já tenho conta
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white border-t border-stone-200 font-sans-s" id="faq">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-12">
            <p className="text-[#c09624] mb-2 uppercase tracking-[0.2em] text-xs font-bold">DÚVIDAS</p>
            <h2 className="font-serif-s text-4xl lg:text-5xl font-bold text-[#1a3d2b]">Perguntas Frequentes</h2>
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
