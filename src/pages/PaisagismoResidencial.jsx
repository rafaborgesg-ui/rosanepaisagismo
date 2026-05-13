import { Link } from "react-router-dom";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

export default function PaisagismoResidencial() {
  return (
    <div className="min-h-screen bg-[#fcfaf7] overflow-x-hidden">
      <SEO
        title="Paisagismo Residencial Premium | Rosane Paisagismo"
        description="Projetos de paisagismo residencial de alto padrão em São Paulo e Minas Gerais. Transforme sua casa em um refúgio de luxo."
      />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 transition-all duration-1000 ease-in-out" style={{ backgroundImage: "linear-gradient(to bottom, rgba(10,10,10,0.40), rgba(10,10,10,0.80)), url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=1920')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-10" />
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <p className="font-sans-s text-[11px] font-bold uppercase tracking-[0.5em] text-[#c09624] mb-8">
            Paisagismo Residencial Premium
          </p>
          <h1 className="font-serif-s text-5xl md:text-7xl text-white leading-tight mb-8">
            Transforme sua casa em um <span className="italic text-[#c09624]">oásis de luxo</span>
          </h1>
          <p className="font-sans-s text-white/80 text-lg max-w-2xl mx-auto mb-12">
            Jardins autorais que elevam o valor do seu imóvel e criam experiências únicas para você e sua família.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contato?interesse=Paisagismo+Residencial+Premium" className="px-8 py-4 bg-[#c09624] text-white rounded-full font-bold text-sm uppercase tracking-wide hover:bg-white hover:text-[#1a3d2b] transition-all">
              Solicitar Projeto
            </Link>
            <a href="#portfolio" className="px-8 py-4 border border-white text-white rounded-full font-bold text-sm uppercase tracking-wide hover:bg-[#c09624] transition-all">
              Ver Projetos
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif-s text-4xl text-[#1a3d2b] mb-6">Por que investir em paisagismo premium?</h2>
            <p className="font-sans-s text-stone-600 text-lg max-w-3xl mx-auto">
              Mais do que beleza, um jardim bem projetado valoriza seu patrimônio e transforma seu dia a dia.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a3d2b] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[#c09624] text-2xl">trending_up</span>
              </div>
              <h3 className="font-serif-s text-2xl text-[#1a3d2b] mb-4">Valorização do Imóvel</h3>
              <p className="font-sans-s text-stone-500">Até 30% de aumento no valor de mercado com projetos autorais.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a3d2b] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[#c09624] text-2xl">spa</span>
              </div>
              <h3 className="font-serif-s text-2xl text-[#1a3d2b] mb-4">Bem-estar Diário</h3>
              <p className="font-sans-s text-stone-500">Espaços que promovem relaxamento e conexão com a natureza.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a3d2b] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[#c09624] text-2xl">star</span>
              </div>
              <h3 className="font-serif-s text-2xl text-[#1a3d2b] mb-4">Exclusividade</h3>
              <p className="font-sans-s text-stone-500">Projetos únicos que refletem seu estilo e personalidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 bg-[#fcfaf7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif-s text-4xl text-[#1a3d2b] mb-6">Projetos Residenciais</h2>
            <p className="font-sans-s text-stone-600 text-lg">Inspirações para transformar seu lar</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="aspect-square overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600" alt="Jardim residencial" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=600" alt="Piscina com jardim" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=600" alt="Área gourmet" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1a3d2b] text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif-s text-4xl text-white mb-6">Pronto para transformar sua casa?</h2>
          <p className="font-sans-s text-white/80 text-lg mb-8">Agende uma consultoria gratuita e descubra o potencial do seu espaço.</p>
          <Link to="/contato" className="px-8 py-4 bg-[#c09624] text-white rounded-full font-bold text-sm uppercase tracking-wide hover:bg-white hover:text-[#1a3d2b] transition-all inline-block">
            Agendar Consultoria
          </Link>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}