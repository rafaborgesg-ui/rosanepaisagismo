import { useRef, useEffect, useState } from "react";

export default function SobreSection({ content }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 py-20 bg-white max-w-7xl mx-auto"
      id="sobre"
      style={{ overflow: "hidden" }}>
      
      <style>{`
        .sobre-img {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .sobre-img.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .sobre-text {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s;
        }
        .sobre-text.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .mask-asymmetric { clip-path: polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%); }
      `}</style>

      <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20">
        {/* Imagem */}
        <div className={`relative lg:w-1/2 sobre-img${visible ? " visible" : ""}`}>
          <div className="absolute -top-4 -left-4 w-32 h-32 border-t border-l border-[#276a4d]/20 hidden lg:block"></div>
          <div className="mask-asymmetric overflow-hidden bg-stone-100 shadow-xl">
            {content?.sobre_imagem_url &&
            <img
              alt="Dra. Rosane"
              className="w-full aspect-[3/2] lg:aspect-[4/5] object-cover scale-110"
              src={content.sobre_imagem_url} />

            }
          </div>
          <div className="absolute -bottom-6 -right-2 bg-[#276a4d] px-6 py-4 text-white shadow-lg">
            <p className="text-[10px] uppercase tracking-[0.2em] mb-1 opacity-80 font-sans-custom">Chancela Acadêmica</p>
            <p className="font-serif-custom italic text-lg leading-tight">Doutorado</p>
          </div>
        </div>

        {/* Texto */}
        <div className={`space-y-8 lg:w-1/2 pt-6 lg:pt-0 sobre-text${visible ? " visible" : ""}`}>
          <div className="space-y-2">
            <span className="text-[#276a4d] uppercase tracking-[0.15em] text-[11px] font-bold font-sans-custom">
              {content?.sobre_cargo || "Fundadora & Diretora Criativa"}
            </span>
            <h2 className="font-serif-custom text-5xl text-[#1a3d2b] leading-none">
              {content?.sobre_titulo || "Dra. Rosane Borges"}
            </h2>
          </div>
          <p className="font-serif-custom italic text-xl text-stone-500 leading-relaxed">
            "{content?.sobre_frase || "Onde a ciência da ecologia urbana encontra a sofisticação do design exclusivo."}"
          </p>
          <p className="text-stone-600 leading-relaxed font-sans-custom">
            {content?.sobre_texto || "Com PhD em Arquitetura Paisagística e uma trajetória de mais de 500 projetos autorais, Dra. Rosane redefine o conceito de luxo sustentável."}
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-6 bg-stone-50 border border-stone-100 rounded-sm text-center">
              <p className="text-3xl font-serif-custom text-[#276a4d] mb-1">500+</p>
              <p className="text-[9px] uppercase tracking-wider text-stone-400 font-bold font-sans-custom">Projetos Entregues</p>
            </div>
            <div className="p-6 bg-stone-50 border border-stone-100 rounded-sm text-center">
              <p className="text-3xl font-serif-custom text-[#276a4d] mb-1">Doutorado</p>
              <p className="text-[9px] uppercase tracking-wider text-stone-400 font-bold font-sans-custom">Nível de Especialidade</p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
