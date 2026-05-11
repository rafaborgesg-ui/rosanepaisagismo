import { useEffect, useState, useRef } from "react";
import SobreSection from "@/components/landing/SobreSection";
import { useNavigate, Link } from "react-router-dom";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const slideTimer = useRef(null);

  useEffect(() => {








    // Não redirecionar mais automaticamente
    // Deixar usuário escolher plano primeiro
  }, []);useEffect(() => {base44.entities.LandingContent.list().then((records) => {if (records.length > 0) setContent(records[0]);});}, []);const slides = (content?.slides || []).map((s) => ({ imagem: s.imagem_url, titulo: s.titulo, subtitulo: s.subtitulo }));

  useEffect(() => {
    if (slides.length <= 1) return;
    slideTimer.current = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideTimer.current);
  }, [slides.length]);

  const logoTopo = content?.logo_topo_url;

  const handleLogin = () => base44.auth.redirectToLogin('/dashboard');

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightbox) return;
    const portfolioItems = content?.portfolio_items || [];
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' && lightboxIndex < portfolioItems.length - 1) {
        const next = portfolioItems[lightboxIndex + 1];
        setLightboxIndex(lightboxIndex + 1);
        setLightbox({ src: next.imagem_url, titulo: next.titulo });
      } else if (e.key === 'ArrowLeft' && lightboxIndex > 0) {
        const prev = portfolioItems[lightboxIndex - 1];
        setLightboxIndex(lightboxIndex - 1);
        setLightbox({ src: prev.imagem_url, titulo: prev.titulo });
      } else if (e.key === 'Escape') {
        setLightbox(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox, lightboxIndex, content]);

  return (
    <div className="min-h-screen bg-[#f9f9f9] font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Work+Sans:wght@300;400;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }
        .font-serif-custom { font-family: 'Noto Serif', serif; }
        .font-sans-custom { font-family: 'Work Sans', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-asymmetric { clip-path: polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%); }
      `}</style>

      {/* TopBar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-stone-100 font-sans-custom">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center" style={{ minHeight: "16px" }}>
            {logoTopo &&
            <img src={logoTopo} alt="Logo" className="object-contain" style={{ height: `${(content?.logo_topo_size || 100) * 0.4}px`, maxWidth: "200px" }} />
            }
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <Link to="/" className="hover:text-[#276a4d] transition-colors">Início</Link>
            <a href="#portfolio" className="hover:text-[#276a4d] transition-colors">Portfólio</a>
            <a href="#sobre" className="hover:text-[#276a4d] transition-colors">Sobre</a>
            <Link to="/produtos" className="hover:text-[#276a4d] transition-colors">Produtos</Link>
            <Link to="/contato" className="hover:text-[#276a4d] transition-colors">Contato</Link>
            <Link to="/sistema" className="ml-4 px-5 py-2 bg-[#276a4d] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#1a3d2b] transition-colors">
              Acessar Sistema
            </Link>
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="material-symbols-outlined text-[#276a4d]">menu</span>
          </button>
        </div>
        {menuOpen &&
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 space-y-3 text-sm font-medium text-stone-700">
            <a href="#portfolio" className="block py-2" onClick={() => setMenuOpen(false)}>Portfólio</a>
            <a href="#sobre" className="block py-2" onClick={() => setMenuOpen(false)}>Sobre</a>
            <Link to="/produtos" className="block py-2" onClick={() => setMenuOpen(false)}>Produtos</Link>
            <Link to="/contato" className="block py-2" onClick={() => setMenuOpen(false)}>Contato</Link>
            <Link to="/sistema" className="block w-full mt-2 px-5 py-2 bg-[#276a4d] text-white rounded-full text-xs font-bold uppercase tracking-wider text-center" onClick={() => setMenuOpen(false)}>
              Acessar Sistema
            </Link>
          </div>
        }
      </nav>

      <main className="pt-16">
        {/* Hero / Featured Portfolio - Auto Slideshow */}
        <section className="bg-[#f9f9f9] overflow-hidden pt-4 pb-0" id="portfolio">
          {slides.length > 0 &&
          <>
              {/* Image crossfade area */}
              <div className="relative aspect-[4/3] md:aspect-[21/9] overflow-hidden">
                {slides.map((s, i) =>
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  opacity: i === slideIndex ? 1 : 0,
                  transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  zIndex: i === slideIndex ? 1 : 0
                }}>
                
                    <img
                  alt={s.titulo}
                  className="w-full h-full object-cover"
                  style={{
                    transform: i === slideIndex ? "scale(1)" : "scale(1.04)",
                    transition: "transform 6s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                  src={s.imagem} />
                
                  </div>
              )}
              </div>

              {/* Caption — crossfade with key trick */}
              <div className="px-6 mt-6 pb-2 min-h-[56px]">
                {slides.map((s, i) =>
              <div
                key={i}
                style={{
                  opacity: i === slideIndex ? 1 : 0,
                  transition: "opacity 0.8s ease",
                  position: i === slideIndex ? "relative" : "absolute",
                  pointerEvents: i === slideIndex ? "auto" : "none"
                }}>
                
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1 font-bold font-sans-custom">{s.subtitulo}</p>
                    <h3 className="font-serif-custom text-2xl text-[#1a3d2b]">{s.titulo}</h3>
                  </div>
              )}
              </div>

              {/* Dots */}
              <div className="flex items-center gap-4 px-6 mt-8">
                <div className="flex-1 h-[1px] bg-stone-200"></div>
                <div className="flex gap-2">
                  {slides.map((_, i) =>
                <button
                  key={i}
                  onClick={() => {setSlideIndex(i);clearInterval(slideTimer.current);}}
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: i === slideIndex ? "24px" : "8px",
                    height: "8px",
                    backgroundColor: i === slideIndex ? "#276a4d" : "#d6d3d1"
                  }} />

                )}
                </div>
                <div className="flex-1 h-[1px] bg-stone-200"></div>
              </div>
            </>
          }
        </section>

        {/* About Dra. Rosane */}
        <SobreSection content={content} />

        {/* Services */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              
              <h2 className="font-serif-custom text-4xl text-[#1a3d2b] mt-2">Nossa Expertise</h2>
              <p className="text-stone-500 mt-4 font-serif-custom italic text-lg">Soluções planejadas para proprietários que valorizam o detalhe.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
              { num: "01", icon: "landscape", title: content?.servico1_titulo || "Projeto de Paisagismo", desc: content?.servico1_desc || "Conceito completo em 3D, do estudo preliminar ao executivo.", interesse: content?.servico1_titulo || "Projeto de Paisagismo" },
              { num: "02", icon: "menu_book", title: content?.servico2_titulo || "Consultoria Técnica", desc: content?.servico2_desc || "Escolha de espécies e melhorias pontuais no seu ambiente.", interesse: content?.servico2_titulo || "Consultoria Técnica" },
              { num: "03", icon: "verified", title: content?.servico3_titulo || "Implantação de Paisagismo", desc: content?.servico3_desc || "Gestão total da execução, garantindo rigor e sofisticação.", interesse: content?.servico3_titulo || "Implantação e Obra" }].
              map((s) =>
              <div key={s.num} className="group">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-serif-custom text-4xl text-stone-200 italic leading-none">{s.num}</span>
                    <div className="w-10 h-10 bg-white flex items-center justify-center border border-stone-100 rounded-lg shadow-sm">
                      <span className="material-symbols-outlined text-[#276a4d] text-xl">{s.icon}</span>
                    </div>
                  </div>
                  <h3 className="font-serif-custom text-xl text-[#1a3d2b] mb-3">{s.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed font-sans-custom normal-case">{s.desc}</p>
                  <Link to={`/contato?interesse=${encodeURIComponent(s.interesse)}`} className="inline-block mt-4 text-[10px] text-[#276a4d] uppercase tracking-[0.2em] border-b border-[#276a4d]/20 pb-1 hover:border-[#276a4d] transition-all font-bold font-sans-custom">
                    VER DETALHES
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-24 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif-custom text-4xl text-[#1a3d2b]">Portifólio</h2>
              <div className="h-px w-24 bg-[#276a4d]/20 mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(content?.portfolio_items || []).map((item, n) =>
              <div key={n} className="relative group overflow-hidden cursor-pointer" onClick={() => {setLightboxIndex(n);setLightbox({ src: item.imagem_url, titulo: item.titulo });}}>
                  <div className="aspect-square">
                    <img alt={item.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={item.imagem_url} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                    <h4 className="font-serif-custom text-white text-lg">{item.titulo}</h4>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightbox && (() => {
          const portfolioItems = content?.portfolio_items || [];
          const goTo = (idx) => {
            const item = portfolioItems[idx];
            if (item) {setLightboxIndex(idx);setLightbox({ src: item.imagem_url, titulo: item.titulo });}
          };
          return (
            <div
              className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}>
              
              {/* Close */}
              <button
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
                onClick={() => setLightbox(null)}>
                
                <span className="material-symbols-outlined">close</span>
              </button>

              {/* Prev */}
              {lightboxIndex > 0 &&
              <button
                className="absolute left-4 text-white bg-black/50 hover:bg-black/80 rounded-full w-12 h-12 flex items-center justify-center transition-colors z-10"
                onClick={(e) => {e.stopPropagation();goTo(lightboxIndex - 1);}}>
                
                  <span className="material-symbols-outlined text-3xl">chevron_left</span>
                </button>
              }

              {/* Next */}
              {lightboxIndex < portfolioItems.length - 1 &&
              <button
                className="absolute right-4 text-white bg-black/50 hover:bg-black/80 rounded-full w-12 h-12 flex items-center justify-center transition-colors z-10"
                onClick={(e) => {e.stopPropagation();goTo(lightboxIndex + 1);}}>
                
                  <span className="material-symbols-outlined text-3xl">chevron_right</span>
                </button>
              }

              <div className="relative max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
                <img
                  src={lightbox.src}
                  alt={lightbox.titulo}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
                
                {lightbox.titulo &&
                <p className="text-white text-center mt-3 font-serif-custom text-lg">{lightbox.titulo}</p>
                }
              </div>
            </div>);

        })()}

        {/* CTA */}
        <section className="py-20 bg-[#1a3d2b] text-white px-6 text-center">
          <h2 className="font-serif-custom text-4xl mb-4">Pronto para transformar seu espaço?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto font-sans-custom">Entre em contato e vamos planejar juntos o seu projeto exclusivo.</p>
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1a3d2b] rounded-full font-bold text-sm uppercase tracking-wider hover:bg-stone-100 transition-colors">
            
            Solicitar Orçamento
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </section>
      </main>

      <SiteFooter />

      <WhatsAppFloat />
    </div>);

}