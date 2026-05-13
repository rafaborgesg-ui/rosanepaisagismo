import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import BeforeAfterSlider from "@/components/landing/BeforeAfterSlider";
import SEO from "@/components/seo/SEO";

// Database of specific niches
const NICHES = {
  "paisagismo-residencial": {
    title: "Paisagismo Residencial Premium",
    desc: "Projetos de alto padrão que valorizam a arquitetura da sua casa. Integração de áreas gourmet, piscinas e jardins externos.",
    heroImages: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1920",
      "https://images.unsplash.com/photo-1558904541-efa8c1965f9d?auto=format&fit=crop&q=80&w=1920"
    ],
    seoTitle: "Paisagismo Residencial de Alto Padrão",
    seoDesc: "Valorize seu imóvel com um projeto de paisagismo residencial exclusivo. Especialistas em casas de alto padrão, áreas gourmet e piscinas.",
    bullets: [
      "Valorização de até 30% no imóvel",
      "Integração perfeita com a arquitetura",
      "Seleção botânica premium e de baixa manutenção",
      "Jardins tropicais, verticais e de resort"
    ]
  },
  "paisagismo-corporativo": {
    title: "Paisagismo Corporativo e Clínicas",
    desc: "A biofilia aplicada aos negócios. Crie ambientes que reduzem o estresse, aumentam a produtividade e impressionam clientes.",
    heroImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920",
      "https://images.unsplash.com/photo-1572013343866-2f3b90623a84?auto=format&fit=crop&q=80&w=1920"
    ],
    seoTitle: "Paisagismo para Clínicas e Escritórios",
    seoDesc: "Transforme o ambiente da sua clínica ou empresa com paisagismo corporativo. Design biofílico para escritórios e espaços comerciais.",
    bullets: [
      "Experiência premium para o paciente/cliente",
      "Design biofílico corporativo",
      "Manutenção programada e eficiente",
      "Fachadas e recepções imponentes"
    ]
  },
  "jardins-verticais": {
    title: "Jardins Verticais e Soluções Urbanas",
    desc: "A natureza transformando paredes e coberturas. Soluções tecnológicas para irrigação e preservação em apartamentos e fachadas.",
    heroImages: [
      "https://images.unsplash.com/photo-1598516091216-c3059871bbbb?auto=format&fit=crop&q=80&w=1920",
      "https://images.unsplash.com/photo-1599583196884-60efd439a896?auto=format&fit=crop&q=80&w=1920"
    ],
    seoTitle: "Jardins Verticais Naturais e Preservados",
    seoDesc: "Projetos de jardins verticais para apartamentos de luxo, coberturas e fachadas comerciais. Sistemas modernos de irrigação automatizada.",
    bullets: [
      "Aproveitamento máximo de espaço",
      "Sistemas automatizados de rega e nutrição",
      "Isolamento térmico e acústico natural",
      "Opções de plantas preservadas ou naturais"
    ]
  }
};

const DEFAULT_NICHE = {
  title: "Paisagismo de Alto Padrão",
  desc: "Projetos autorais que transformam imóveis em experiências.",
  heroImages: [
    "https://images.unsplash.com/photo-1558904541-efa8c1965f9d?auto=format&fit=crop&q=80&w=1920",
  ],
  seoTitle: "Projetos de Paisagismo Exclusivos",
  seoDesc: "Escritório de Paisagismo Premium.",
  bullets: ["Design exclusivo", "Valorização", "Qualidade"]
};

export default function ServicoLanding() {
  const { id } = useParams();
  const data = NICHES[id] || DEFAULT_NICHE;

  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [quizData, setQuizData] = useState({});
  const [quizDone, setQuizDone] = useState(false);
  const slideTimer = useRef(null);

  useEffect(() => {
    slideTimer.current = setInterval(() => {
      setSlideIndex(i => (i + 1) % data.heroImages.length);
    }, 6000);
    return () => clearInterval(slideTimer.current);
  }, [data.heroImages.length]);

  const QUIZ_STEPS = [
    { key: "estilo", question: "Qual estilo você procura?", options: ["Tropical Sofisticado", "Minimalista Contemporâneo", "Resort & Spa", "Sem preferência clara"] },
    { key: "metragem", question: "Qual a área aproximada?", options: ["Até 50m²", "De 50m² a 200m²", "De 200m² a 500m²", "Acima de 500m²"] },
    { key: "orcamento", question: "Orçamento previsto para implantação?", options: ["R$ 15k – R$ 30k", "R$ 30k – R$ 100k", "Acima de R$ 100k", "Ainda não defini"] },
  ];

  const handleQuizSelect = (key, value) => {
    const next = { ...quizData, [key]: value };
    setQuizData(next);
    if (quizStep < QUIZ_STEPS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizDone(true);
    }
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.title,
    "description": data.desc,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Rosane Paisagismo",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "addressCountry": "BR"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] overflow-x-hidden">
      <SEO 
        title={data.seoTitle} 
        description={data.seoDesc} 
        schema={schemaData} 
        url={`https://rosanepaisagismo.com/servico/${id}`}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-serif-s { font-family: 'Playfair Display', serif; }
        .font-sans-s { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }
      `}</style>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100/60 font-sans-s">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="font-serif-s text-2xl font-bold text-[#1a3d2b] tracking-tight">
            Rosane<span className="text-[#c09624]">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
            <Link to="/portfolio" className="hover:text-[#c09624] transition-colors">Portfólio</Link>
            <a href="#solucao" className="hover:text-[#c09624] transition-colors">A Solução</a>
            <Link to="/contato" className="px-7 py-3 bg-[#1a3d2b] text-white rounded-full hover:bg-[#c09624] transition-all">
              Consultoria Exclusiva
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="material-symbols-outlined text-[#1a3d2b]">menu</span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:py-40 flex items-center overflow-hidden bg-[#1a3d2b]">
        {data.heroImages.map((src, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: i === slideIndex ? 1 : 0 }}>
            <div className="absolute inset-0 bg-[#1a3d2b]/80 z-10" />
            <img src={src} alt="Paisagismo" className="w-full h-full object-cover opacity-30" />
          </div>
        ))}
        <div className="relative z-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#c09624]/20 px-4 py-2 rounded-full mb-6 border border-[#c09624]/30">
              <span className="w-2 h-2 rounded-full bg-[#c09624] animate-pulse"></span>
              <span className="text-[10px] text-[#c09624] font-bold tracking-widest uppercase">Especialidade</span>
            </div>
            <h1 className="font-serif-s text-5xl md:text-6xl text-white leading-tight mb-8">
              {data.title}
            </h1>
            <p className="font-sans-s text-white/70 text-lg mb-10 leading-relaxed max-w-lg">
              {data.desc}
            </p>
            <ul className="space-y-4 mb-10">
              {data.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90 font-sans-s text-sm">
                  <span className="material-symbols-outlined text-[#c09624]">check_circle</span>
                  {b}
                </li>
              ))}
            </ul>
            <a href="#qualificacao" className="inline-block px-10 py-5 bg-[#c09624] text-white rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-white hover:text-[#1a3d2b] transition-all shadow-xl">
              Agendar Avaliação
            </a>
          </div>
        </div>
      </section>

      {/* QUALIFICAÇÃO / QUIZ */}
      <section id="qualificacao" className="py-24 bg-stone-50">
        <div className="max-w-3xl mx-auto px-6 font-sans-s">
          <div className="text-center mb-16">
            <span className="text-[10px] text-[#c09624] font-bold tracking-widest uppercase mb-4 block">Alinhamento de Perfil</span>
            <h2 className="font-serif-s text-4xl text-[#1a3d2b] font-bold">Conte-nos sobre o seu espaço</h2>
            <p className="text-stone-500 mt-4">Responda a 3 perguntas rápidas para que possamos entender o nível do projeto que você precisa.</p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-stone-100 shadow-2xl">
            {!quizDone ? (
              <div className="animate-fade-up">
                <div className="flex gap-2 mb-8 justify-center">
                  {QUIZ_STEPS.map((_, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= quizStep ? 'bg-[#c09624]' : 'bg-stone-100'}`} />
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-[#1a3d2b] mb-8 text-center">{QUIZ_STEPS[quizStep].question}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {QUIZ_STEPS[quizStep].options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleQuizSelect(QUIZ_STEPS[quizStep].key, opt)}
                      className="p-6 text-sm font-semibold text-[#1a3d2b] border-2 border-stone-100 rounded-xl hover:border-[#c09624] hover:bg-stone-50 transition-all text-center"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center animate-fade-up">
                <div className="w-20 h-20 bg-[#1a3d2b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-[#c09624] text-4xl">check</span>
                </div>
                <h3 className="font-serif-s text-3xl font-bold text-[#1a3d2b] mb-4">Perfil Mapeado com Sucesso!</h3>
                <p className="text-stone-500 mb-8 max-w-sm mx-auto leading-relaxed">
                  Com base nas suas respostas, nossos projetos autorais se encaixam perfeitamente na sua demanda. Fale com a Dra. Rosane agora mesmo.
                </p>
                <a
                  href={`https://wa.me/5538991234567?text=${encodeURIComponent(`Olá! Quero saber mais sobre ${data.title}. Meu estilo: ${quizData.estilo}, Área: ${quizData.metragem}, Orçamento: ${quizData.orcamento}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#1a3d2b] text-white px-10 py-5 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-[#c09624] transition-all"
                >
                  Continuar no WhatsApp <span className="material-symbols-outlined text-[18px]">chat</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
