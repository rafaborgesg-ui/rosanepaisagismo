import { Link } from "react-router-dom";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

export default function PaisagismoClinicas() {
  return (
    <div className="min-h-screen bg-[#fcfaf7] overflow-x-hidden">
      <SEO
        title="Paisagismo para Clínicas | Rosane Paisagismo"
        description="Projetos de paisagismo biofílico para clínicas e consultórios. Ambientes que promovem bem-estar e confiança aos pacientes."
      />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 transition-all duration-1000 ease-in-out" style={{ backgroundImage: "linear-gradient(to bottom, rgba(10,10,10,0.40), rgba(10,10,10,0.80)), url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=1920')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-10" />
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <p className="font-sans-s text-[11px] font-bold uppercase tracking-[0.5em] text-[#c09624] mb-8">
            Paisagismo para Clínicas
          </p>
          <h1 className="font-serif-s text-5xl md:text-7xl text-white leading-tight mb-8">
            Ambientes que <span className="italic text-[#c09624]">curam</span> e conquistam
          </h1>
          <p className="font-sans-s text-white/80 text-lg max-w-2xl mx-auto mb-12">
            Jardins biofílicos que criam experiências únicas, promovem bem-estar e elevam a percepção de qualidade dos seus serviços.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contato?interesse=Paisagismo+para+Clínicas" className="px-8 py-4 bg-[#c09624] text-white rounded-full font-bold text-sm uppercase tracking-wide hover:bg-white hover:text-[#1a3d2b] transition-all">
              Consultoria Gratuita
            </Link>
            <a href="#beneficios" className="px-8 py-4 border border-white text-white rounded-full font-bold text-sm uppercase tracking-wide hover:bg-[#c09624] transition-all">
              Ver Benefícios
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif-s text-4xl text-[#1a3d2b] mb-6">Por que investir em paisagismo para clínicas?</h2>
            <p className="font-sans-s text-stone-600 text-lg max-w-3xl mx-auto">
              Um jardim bem projetado não é apenas decoração, é uma ferramenta de saúde e marketing.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a3d2b] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[#c09624] text-2xl">healing</span>
              </div>
              <h3 className="font-serif-s text-2xl text-[#1a3d2b] mb-4">Biofilia Terapêutica</h3>
              <p className="font-sans-s text-stone-500">Ambientes que reduzem o estresse e aceleram a recuperação dos pacientes.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a3d2b] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[#c09624] text-2xl">visibility</span>
              </div>
              <h3 className="font-serif-s text-2xl text-[#1a3d2b] mb-4">Diferencial Competitivo</h3>
              <p className="font-sans-s text-stone-500">Posicione sua clínica como referência em bem-estar e inovação.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a3d2b] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[#c09624] text-2xl">groups</span>
              </div>
              <h3 className="font-serif-s text-2xl text-[#1a3d2b] mb-4">Experiência do Paciente</h3>
              <p className="font-sans-s text-stone-500">Crie memórias positivas que geram indicações e fidelização.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 px-6 bg-[#fcfaf7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif-s text-4xl text-[#1a3d2b] mb-6">Projetos para Clínicas</h2>
            <p className="font-sans-s text-stone-600 text-lg">Casos de sucesso que transformaram clínicas</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600" alt="Clínica com jardim" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600" alt="Espaço terapêutico" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1a3d2b] text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif-s text-4xl text-white mb-6">Pronto para destacar sua clínica?</h2>
          <p className="font-sans-s text-white/80 text-lg mb-8">Descubra como um projeto de paisagismo pode elevar seus resultados.</p>
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