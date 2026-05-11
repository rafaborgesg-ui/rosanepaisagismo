import { useState } from "react";
import { Link } from "react-router-dom";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const PROJECTS = [
  {
    title: "Residência Alphaville",
    category: "Paisagismo Residencial",
    image: "https://images.unsplash.com/photo-1558904541-efa8c1965f9d?auto=format&fit=crop&q=80&w=1200",
    stats: { area: "1.200m²", prazo: "4 meses", investimento: "R$ 150k+" }
  },
  {
    title: "Sede Corporativa XPTO",
    category: "Paisagismo Corporativo",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    stats: { area: "800m²", prazo: "2 meses", investimento: "R$ 80k+" }
  },
  {
    title: "Condomínio Reserva",
    category: "Soluções Urbanas",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200",
    stats: { area: "5.000m²", prazo: "8 meses", investimento: "R$ 400k+" }
  },
  {
    title: "Cobertura Jardins",
    category: "Jardins Verticais",
    image: "https://images.unsplash.com/photo-1598516091216-c3059871bbbb?auto=format&fit=crop&q=80&w=1200",
    stats: { area: "150m²", prazo: "45 dias", investimento: "R$ 60k+" }
  },
  {
    title: "Clínica Bem-Estar",
    category: "Paisagismo Corporativo",
    image: "https://images.unsplash.com/photo-1572013343866-2f3b90623a84?auto=format&fit=crop&q=80&w=1200",
    stats: { area: "300m²", prazo: "60 dias", investimento: "R$ 45k+" }
  },
  {
    title: "Casa de Campo",
    category: "Paisagismo Residencial",
    image: "https://images.unsplash.com/photo-1590011502447-90977f6b9571?auto=format&fit=crop&q=80&w=1200",
    stats: { area: "3.500m²", prazo: "6 meses", investimento: "R$ 250k+" }
  }
];

const CATEGORIES = ["Todos", "Paisagismo Residencial", "Paisagismo Corporativo", "Jardins Verticais", "Soluções Urbanas"];

export default function Portfolio() {
  const [filter, setFilter] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProjects = filter === "Todos" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#fcfaf7] overflow-x-hidden">
      <SEO 
        title="Portfólio de Projetos | Paisagismo Alto Padrão" 
        description="Conheça nosso portfólio de projetos autorais em paisagismo residencial e corporativo. Obras executadas com rigor botânico e alto padrão." 
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
            <Link to="/portfolio" className="text-[#c09624] transition-colors">Portfólio</Link>
            <Link to="/contato" className="px-7 py-3 bg-[#1a3d2b] text-white rounded-full hover:bg-[#c09624] transition-all">
              Agendar Reunião
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="material-symbols-outlined text-[#1a3d2b]">menu</span>
          </button>
        </div>
      </nav>

      {/* HERO PORTFOLIO */}
      <header className="pt-32 pb-16 bg-[#1a3d2b] text-center px-6">
        <h1 className="font-serif-s text-5xl text-white mb-6">Nosso Portfólio</h1>
        <p className="font-sans-s text-white/70 max-w-2xl mx-auto">
          Uma seleção cuidadosa de obras que redefinem o conceito de áreas externas. Mais de 150 projetos assinados e executados com maestria técnica e botânica.
        </p>
      </header>

      {/* FILTER */}
      <div className="bg-white border-b border-stone-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 overflow-x-auto no-scrollbar flex items-center gap-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === cat ? 'bg-[#c09624] text-white' : 'bg-stone-50 text-stone-500 hover:bg-stone-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto min-h-screen">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((proj, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-6">
                <div className="absolute inset-0 bg-[#1a3d2b]/20 group-hover:bg-transparent transition-all z-10 duration-500"></div>
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest text-[#1a3d2b]">
                  {proj.category}
                </div>
              </div>
              <h3 className="font-serif-s text-2xl font-bold text-[#1a3d2b] mb-3">{proj.title}</h3>
              <div className="grid grid-cols-3 gap-2 border-t border-stone-200 pt-4">
                <div>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1">Área</p>
                  <p className="text-xs text-[#1a3d2b] font-semibold">{proj.stats.area}</p>
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1">Prazo</p>
                  <p className="text-xs text-[#1a3d2b] font-semibold">{proj.stats.prazo}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#c09624] font-bold uppercase tracking-wider mb-1">Status</p>
                  <p className="text-xs text-[#1a3d2b] font-semibold">Entregue</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
