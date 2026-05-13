import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import BeforeAfterSlider from "@/components/landing/BeforeAfterSlider";
import SEO from "@/components/seo/SEO";

const HERO_IMAGES = [
  "https://plus.unsplash.com/premium_photo-1687960116802-a9a05891d33f?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1684858474017-1aaaf5212fc7?auto=format&fit=crop&q=80&w=1920",
  "https://plus.unsplash.com/premium_photo-1687960116506-f31f84371838?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1721222204126-e7042f2893b1?auto=format&fit=crop&q=80&w=1920",
  "https://plus.unsplash.com/premium_photo-1738099055015-dccf18e6f037?auto=format&fit=crop&q=80&w=1920",
];

const SERVICES = [
  { icon: "architecture", category: "Residencial Premium", title: "Projetos de Exteriores Autoral", desc: "Jardins autorais que valorizam a arquitetura, elevam o lifestyle e transformam imóveis em experiências.", link: "/paisagismo-residencial" },
  { icon: "water_drop", category: "Áreas Gourmet & Piscinas", title: "Ambientes de convívio sofisticado", desc: "Piscinas, gourmet e lounges integrados com design botânico e iluminação cênica.", link: "/contato?interesse=Áreas+Gourmet+%26+Piscinas" },
  { icon: "spa", category: "Clínicas & Corporativo", title: "Paisagismo biofílico de alto impacto", desc: "Espaços que aumentam bem-estar, percepção de valor e diferenciação no mercado.", link: "/paisagismo-clinicas" },
];

const TESTIMONIALS = [
  { name: "Ana Paula Ferreira", role: "Proprietária — Alphaville, SP", text: "O escritório da Rosane transformou completamente a percepção do nosso imóvel. Valorizou mais de 30% após o projeto." },
  { name: "Dr. Ricardo Mota", role: "Clínica Premium — BH, MG", text: "A consultoria foi cirúrgica. O jardim biofílico da nossa clínica criou uma experiência única para os pacientes." },
  { name: "Construtora Ávila", role: "Condomínio de Luxo — SP", text: "Parceria de alto nível. Entrega dentro do prazo, com um resultado que superou todas as expectativas dos compradores." },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [quizData, setQuizData] = useState({});
  const [quizDone, setQuizDone] = useState(false);
  const slideTimer = useRef(null);

  useEffect(() => {
    slideTimer.current = setInterval(() => {
      setSlideIndex(i => (i + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(slideTimer.current);
  }, []);

  const QUIZ_STEPS = [
    { key: "estilo", question: "Qual estilo mais te inspira?", options: ["Tropical Sofisticado", "Minimalista Contemporâneo", "Jardim Inglês Clássico", "Resort & Piscina"] },
    { key: "imovel", question: "Qual é o seu imóvel?", options: ["Casa residencial", "Cobertura / Apartamento", "Clínica / Consultório", "Empresa / Condomínio"] },
    { key: "orcamento", question: "Qual é o seu investimento?", options: ["R$ 15k – R$ 30k", "R$ 30k – R$ 80k", "R$ 80k – R$ 200k", "Acima de R$ 200k"] },
  ];

  const handleQuizSelect = (key, value) => {
    const next = { ...quizData, [key]: value };
    setQuizData(next);
    if (quizStep < QUIZ_STEPS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizStep(quizStep + 1);
    }
  };

  const ANTES = "https://images.unsplash.com/photo-1590011502447-90977f6b9571?auto=format&fit=crop&q=80&w=1200";
  const DEPOIS = "https://images.unsplash.com/photo-1558904541-efa8c1965f9d?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="min-h-screen bg-[#fcfaf7] overflow-x-hidden">
      <SEO 
        title="Escritório de Paisagismo de Alto Padrão | São Paulo & Minas Gerais" 
        description="Paisagismo autoral residencial e comercial. Projetos premium em São Paulo, Montes Claros e região. Jardim tropical, vertical, área gourmet, piscinas. Consultoria especializada."
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Rosane Paisagismo",
          "description": "Escritório de Paisagismo de Alto Padrão em São Paulo e Minas Gerais",
          "url": "https://rosanepaisagismo.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "São Paulo",
            "addressRegion": "SP",
            "addressCountry": "BR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-23.5505",
            "longitude": "-46.6333"
          },
          "areaServed": ["São Paulo", "Minas Gerais", "Montes Claros"]
        }}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-serif-s { font-family: 'Playfair Display', serif; }
        .font-sans-s { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }
      `}</style>

      {/* ─── NAV ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100/60 font-sans-s">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="font-serif-s text-2xl font-bold text-[#1a3d2b] tracking-tight">
            Rosane<span className="text-[#c09624]">.</span>
          </a>
          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
            <a href="#projetos" className="hover:text-[#c09624] transition-colors">Projetos</a>
            <a href="#servicos" className="hover:text-[#c09624] transition-colors">Serviços</a>
            <a href="#sobre" className="hover:text-[#c09624] transition-colors">Sobre</a>
            <Link to="/catalogo" className="hover:text-[#c09624] transition-colors">Espécies</Link>
            <Link to="/contato" className="px-7 py-3 bg-[#1a3d2b] text-white rounded-full hover:bg-[#c09624] transition-all">
              Agendar Reunião
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="material-symbols-outlined text-[#1a3d2b]">menu</span>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white px-6 py-8 space-y-6 text-sm font-bold uppercase tracking-widest text-[#1a3d2b] border-t border-stone-100">
            <a href="#projetos" className="block" onClick={() => setMenuOpen(false)}>Projetos</a>
            <a href="#servicos" className="block" onClick={() => setMenuOpen(false)}>Serviços</a>
            <Link to="/contato" className="block" onClick={() => setMenuOpen(false)}>Contato</Link>
          </div>
        )}
      </nav>

      <main>
        {/* ─── HERO CINEMATOGRÁFICO ─────────────────────── */}
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 transition-all duration-1000 ease-in-out" style={{ backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 10, 0.35), rgba(10, 10, 10, 0.80)), url('${HERO_IMAGES[slideIndex]}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/80 z-10" />

          <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
            <p className="font-sans-s text-[11px] font-bold uppercase tracking-[0.5em] text-[#c09624] mb-8">
              Escritório de Paisagismo de Alto Padrão · São Paulo & Minas Gerais
            </p>
            <h1 className="font-serif-s text-5xl md:text-8xl text-white leading-[1.05] mb-8">
              Projetos de paisagismo autorais que transformam imóveis em <span className="italic text-[#c09624]">experiências</span>
            </h1>
            <p className="font-sans-s text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
              Projetos residenciais e comerciais de alto padrão em São Paulo e Minas Gerais. Cada jardim é uma obra de arte viva que valoriza sua arquitetura e eleva seu lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link to="/contato?utm_source=landing&utm_medium=hero&utm_campaign=orcamento" className="px-10 py-5 bg-[#c09624] text-white rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-white hover:text-[#1a3d2b] transition-all shadow-2xl">
                Solicitar Orçamento
              </Link>
              <Link to="/contato?utm_source=landing&utm_medium=hero&utm_campaign=reuniao" className="px-10 py-5 border border-white text-white rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-[#c09624] hover:text-white transition-all">
                Agendar Reunião
              </Link>
              <a href="#projetos" className="text-white font-bold text-[10px] uppercase tracking-widest border-b border-white/40 pb-1 hover:border-[#c09624] hover:text-[#c09624] transition-all">
                Ver Projetos ↓
              </a>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {HERO_IMAGES.map((_, i) => (
              <button key={i} onClick={() => setSlideIndex(i)}
                className="rounded-full transition-all duration-500"
                style={{ width: i === slideIndex ? 28 : 8, height: 8, backgroundColor: i === slideIndex ? '#c09624' : 'rgba(255,255,255,0.4)' }} />
            ))}
          </div>
        </section>

        {/* ─── TRANSFORMAÇÃO PREMIUM ────────────────────── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <p className="font-sans-s text-[10px] font-bold uppercase tracking-[0.35em] text-[#c09624] mb-4">Posicionamento Premium</p>
            <h2 className="font-serif-s text-5xl text-[#1a3d2b] mb-6">Mais do que jardim, uma experiência de luxo.</h2>
            <p className="font-sans-s text-stone-600 text-lg max-w-3xl mx-auto mb-16">
              Projetos de paisagismo que comunicam exclusividade, arquitetura e bem-estar, com presença forte em São Paulo e Minas Gerais.
            </p>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="rounded-3xl border border-stone-100 p-10 text-left shadow-xl hover:shadow-2xl transition-shadow">
                <p className="font-sans-s text-[9px] font-bold uppercase tracking-[0.35em] text-[#c09624] mb-4">Arquitetura & Valor</p>
                <h3 className="font-serif-s text-2xl text-[#1a3d2b] mb-4">Projetos que valorizam imóveis</h3>
                <p className="font-sans-s text-stone-500 leading-relaxed">Cada proposta é pensada para aumentar o capital estético e financeiro do seu terreno.</p>
              </div>
              <div className="rounded-3xl border border-stone-100 p-10 text-left shadow-xl hover:shadow-2xl transition-shadow">
                <p className="font-sans-s text-[9px] font-bold uppercase tracking-[0.35em] text-[#c09624] mb-4">Lifestyle & Desejo</p>
                <h3 className="font-serif-s text-2xl text-[#1a3d2b] mb-4">Ambientes que encantam</h3>
                <p className="font-sans-s text-stone-500 leading-relaxed">Jardins que geram desejo, reforçam exclusividade e contam uma narrativa única.</p>
              </div>
              <div className="rounded-3xl border border-stone-100 p-10 text-left shadow-xl hover:shadow-2xl transition-shadow">
                <p className="font-sans-s text-[9px] font-bold uppercase tracking-[0.35em] text-[#c09624] mb-4">Experiência & Prova</p>
                <h3 className="font-serif-s text-2xl text-[#1a3d2b] mb-4">Conversão de leads premium</h3>
                <p className="font-sans-s text-stone-500 leading-relaxed">Estrutura de captura, qualificação e fechamento para projetos de alto ticket.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── NÚMEROS DE CREDIBILIDADE ─────────────────── */}
        <section className="bg-[#1a3d2b] py-16">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[ 
              { n: "200+", l: "Projetos Entregues" },
              { n: "25", l: "Anos de Experiência" },
              { n: "99%", l: "Clientes Satisfeitos" },
              { n: "3 Estados", l: "SP, MG & RJ" },
            ].map(({ n, l }) => (
              <div key={l}>
                <p className="font-serif-s text-4xl font-bold text-[#c09624]">{n}</p>
                <p className="font-sans-s text-[10px] uppercase tracking-widest text-white/50 mt-2">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FILOSOFIA / NARRATIVA ────────────────────── */}
        <section id="sobre" className="py-32 px-6 bg-[#fcfaf7]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-[40px] shadow-2xl">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=900" alt="Jardim autoral" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-[#1a3d2b] text-white p-10 rounded-[28px] hidden md:block max-w-[240px] shadow-2xl">
                <span className="material-symbols-outlined text-[#c09624] text-3xl block mb-3">eco</span>
                <p className="font-serif-s text-lg leading-snug italic">"Cada projeto é um jardim secreto esperando para ser revelado."</p>
              </div>
            </div>
            <div className="space-y-8">
              <p className="font-sans-s text-[10px] font-bold uppercase tracking-[0.35em] text-[#c09624]">Nossa Filosofia</p>
              <h2 className="font-serif-s text-5xl text-[#1a3d2b] leading-tight">Criamos refúgios onde o luxo encontra a natureza.</h2>
              <div className="h-px w-16 bg-[#c09624]" />
              <p className="font-sans-s text-stone-600 text-lg leading-relaxed">
                Cada terreno tem uma alma. Nossa missão é interpretá-la através de espécies selecionadas, iluminação cênica e design autoral que eleva o valor do imóvel e transforma a experiência de quem o vive.
              </p>
              <p className="font-sans-s text-stone-500 leading-relaxed">
                Atendemos residências de alto padrão, clínicas premium, condomínios de luxo e escritórios corporativos em São Paulo, Minas Gerais e regiões adjacentes.
              </p>
              <Link to="/contato" className="inline-flex items-center gap-3 font-sans-s font-bold text-[11px] uppercase tracking-widest text-[#1a3d2b] border-b-2 border-[#c09624] pb-1 hover:text-[#c09624] transition-colors">
                Conhecer o Escritório <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SERVIÇOS ─────────────────────────────────── */}
        <section id="servicos" className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="font-sans-s text-[10px] font-bold uppercase tracking-[0.35em] text-[#c09624] mb-4">Nossa Expertise</p>
              <h2 className="font-serif-s text-5xl text-[#1a3d2b]">A exclusividade que sua arquitetura merece.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {SERVICES.map((s, i) => (
                <div key={i} className="group p-10 rounded-3xl border border-stone-100 hover:border-[#1a3d2b] hover:shadow-2xl transition-all duration-500">
                  <div className="w-14 h-14 bg-[#fcfaf7] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#1a3d2b] transition-all duration-500">
                    <span className="material-symbols-outlined text-[#1a3d2b] group-hover:text-[#c09624] text-3xl">{s.icon}</span>
                  </div>
                  <p className="font-sans-s text-[9px] font-bold uppercase tracking-widest text-[#c09624] mb-3">{s.category}</p>
                  <h3 className="font-serif-s text-2xl text-[#1a3d2b] mb-4">{s.title}</h3>
                  <p className="font-sans-s text-stone-500 leading-relaxed mb-8">{s.desc}</p>
                  <Link to={s.link || "/contato"} className="inline-flex items-center gap-2 font-sans-s font-bold text-[10px] uppercase tracking-widest text-[#1a3d2b] border-b border-stone-200 pb-1 group-hover:border-[#c09624] group-hover:text-[#c09624] transition-all">
                    Solicitar este serviço <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ANTES E DEPOIS ───────────────────────────── */}
        <section className="py-32 px-6 bg-[#fcfaf7]" id="projetos">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <p className="font-sans-s text-[10px] font-bold uppercase tracking-[0.35em] text-[#c09624] mb-4">Transformações Reais</p>
                <h2 className="font-serif-s text-5xl text-[#1a3d2b]">Antes & Depois</h2>
                <p className="font-sans-s text-stone-500 mt-4 text-lg max-w-lg">Deslize para ver a transformação completa. Cada projeto começa com um terreno e termina com um legado.</p>
              </div>
              <Link to="/contato" className="font-sans-s font-bold text-[10px] uppercase tracking-widest text-[#1a3d2b] border-b-2 border-[#c09624] pb-1 hover:text-[#c09624] transition-colors whitespace-nowrap">
                Solicitar Transformação →
              </Link>
            </div>
            <BeforeAfterSlider before={ANTES} after={DEPOIS} labelBefore="Estado Inicial" labelAfter="Projeto Finalizado" />
          </div>
        </section>

        {/* ─── QUIZ DE QUALIFICAÇÃO ─────────────────────── */}
        <section className="py-32 px-6 bg-[#1a3d2b]">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-sans-s text-[10px] font-bold uppercase tracking-[0.35em] text-[#c09624] mb-4">Briefing Premium</p>
            <h2 className="font-serif-s text-4xl md:text-5xl text-white mb-6">Receba um diagnóstico personalizado para o seu espaço</h2>
            <p className="font-sans-s text-white/60 mb-14">Responda 3 perguntas rápidas e receba um projeto inicial pensado para valorizar seu imóvel.</p>

            {quizStep < QUIZ_STEPS.length ? (
              <div>
                <div className="flex justify-center gap-2 mb-10">
                  {QUIZ_STEPS.map((_, i) => (
                    <div key={i} className="h-1 rounded-full transition-all duration-500" style={{ width: i <= quizStep ? 48 : 24, backgroundColor: i <= quizStep ? '#c09624' : 'rgba(255,255,255,0.2)' }} />
                  ))}
                </div>
                <p className="font-serif-s text-2xl text-white mb-8">{QUIZ_STEPS[quizStep].question}</p>
                <div className="grid grid-cols-2 gap-4">
                  {QUIZ_STEPS[quizStep].options.map(opt => (
                    <button key={opt} onClick={() => handleQuizSelect(QUIZ_STEPS[quizStep].key, opt)}
                      className="font-sans-s font-medium text-sm px-6 py-4 rounded-2xl border border-white/20 text-white hover:bg-[#c09624] hover:border-[#c09624] transition-all text-center">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : !quizDone ? (
              <form className="space-y-5 text-left" onSubmit={e => { e.preventDefault(); setQuizDone(true); const msg = `Olá! Tenho interesse em paisagismo.\n\nPerfil: Estilo: ${quizData.estilo}, Imóvel: ${quizData.imovel}, Investimento: ${quizData.orcamento}\n\nNome: ${e.target.nome.value}`; window.open(`https://wa.me/5538999999999?text=${encodeURIComponent(msg)}`,'_blank'); }}>
                <p className="font-serif-s text-2xl text-white text-center mb-8">Quase lá! Para onde enviamos seu diagnóstico VIP?</p>
                <input name="nome" required placeholder="Seu nome completo" className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 font-sans-s focus:outline-none focus:border-[#c09624]" />
                <input name="whatsapp" required placeholder="WhatsApp com DDD" className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 font-sans-s focus:outline-none focus:border-[#c09624]" />
                <button type="submit" className="w-full py-5 bg-[#c09624] text-white rounded-full font-bold font-sans-s text-[11px] uppercase tracking-widest hover:bg-white hover:text-[#1a3d2b] transition-all">
                  Receber Análise VIP no WhatsApp →
                </button>
              </form>
            ) : (
              <div className="text-center">
                <span className="material-symbols-outlined text-[#c09624] text-6xl mb-6 block">check_circle</span>
                <h3 className="font-serif-s text-3xl text-white mb-4">Perfeito! Entraremos em contato em breve.</h3>
                <p className="font-sans-s text-white/60">Nossa equipe já recebeu seu perfil e vai preparar uma proposta personalizada para você.</p>
              </div>
            )}
          </div>
        </section>

        {/* ─── DEPOIMENTOS ──────────────────────────────── */}
        <section className="py-32 px-6 bg-[#fcfaf7]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <p className="font-sans-s text-[10px] font-bold uppercase tracking-[0.35em] text-[#c09624] mb-4">Histórias Reais</p>
              <h2 className="font-serif-s text-5xl text-[#1a3d2b]">O que nossos clientes dizem</h2>
              <p className="font-sans-s text-stone-500 mt-4 text-lg">Projetos que transformaram vidas e imóveis</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="p-10 bg-white rounded-3xl border border-stone-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, j) => <span key={j} className="text-[#c09624] text-sm">★</span>)}
                  </div>
                  <p className="font-serif-s text-lg text-[#1a3d2b] italic leading-relaxed mb-8">"{t.text}"</p>
                  <div>
                    <p className="font-sans-s font-bold text-sm text-[#1a3d2b]">{t.name}</p>
                    <p className="font-sans-s text-[11px] text-stone-400 uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA FINAL ────────────────────────────────── */}
        <section className="py-40 bg-[#1a3d2b] relative overflow-hidden text-center px-6">
          <div className="absolute inset-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover" alt="" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="font-sans-s text-[10px] font-bold uppercase tracking-[0.4em] text-[#c09624] mb-6">Pronto para começar?</p>
            <h2 className="font-serif-s text-5xl md:text-7xl text-white mb-8 leading-tight">Vamos criar o seu<br /><span className="italic">refúgio verde.</span></h2>
            <p className="font-sans-s text-white/60 text-lg mb-14 max-w-xl mx-auto">Agende uma reunião de conceito gratuita e descubra o potencial do seu espaço.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/contato?utm_source=landing&utm_medium=footer&utm_campaign=projeto" className="px-12 py-6 bg-[#c09624] text-white rounded-full font-bold font-sans-s text-[11px] uppercase tracking-widest hover:bg-white hover:text-[#1a3d2b] transition-all shadow-2xl">
                Iniciar Meu Projeto
              </Link>
              <a href="https://wa.me/5538999999999" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 font-sans-s font-bold text-[11px] uppercase tracking-widest text-white border-b border-white/40 pb-1 hover:border-[#c09624] hover:text-[#c09624] transition-all">
                <span className="material-symbols-outlined text-base">chat</span> Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
