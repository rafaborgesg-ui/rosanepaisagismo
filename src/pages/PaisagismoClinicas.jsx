import { Link } from "react-router-dom";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const outcomes = [
  ["Confiança na chegada", "A fachada e a recepção comunicam cuidado antes mesmo da consulta começar."],
  ["Experiência do paciente", "O verde reduz frieza, melhora acolhimento e cria lembrança positiva da marca."],
  ["Diferenciação comercial", "Clínicas premium precisam de presença visual compatível com o valor do serviço."],
];

const areas = ["Fachadas", "Recepções", "Jardins internos", "Varandas", "Áreas de espera", "Pontos instagramáveis"];

export default function PaisagismoClinicas() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Paisagismo para Clínicas e Consultórios"
        description="Projetos de paisagismo biofílico para clínicas, consultórios e negócios de saúde que desejam melhorar acolhimento, marca e experiência do paciente."
        keywords="paisagismo para clínicas, paisagismo biofílico, jardim para consultório, fachada de clínica premium, biofilia em clínicas"
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <SiteNav activeLink="clinicas" />

      <main className="font-body">
        <section className="relative min-h-[88vh] overflow-hidden bg-[#173727] pt-28 text-white">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=1920"
            alt="Paisagismo biofílico para clínica"
            className="absolute inset-0 h-full w-full object-cover opacity-42"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/86 to-[#173727]/25" />
          <div className="relative mx-auto grid min-h-[74vh] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1fr_0.8fr] md:px-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Biofilia para saúde e estética</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">
                Ambientes que acolhem, diferenciam e vendem percepção de valor.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76">
                Paisagismo para clínicas, consultórios e negócios premium que precisam comunicar confiança, bem-estar e sofisticação desde a entrada.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/contato?interesse=Paisagismo+para+Clinicas" className="rounded-full bg-[#d7ae45] px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-white">
                  Avaliar minha clínica
                </Link>
                <Link to="/portfolio" className="rounded-full border border-white/30 px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-white hover:border-[#d7ae45] hover:text-[#d7ae45]">
                  Ver referências
                </Link>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/15 bg-white/10 p-7 backdrop-blur-md">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">Áreas atendidas</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {areas.map((item) => (
                  <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-bold">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Resultado para a marca</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
              O paisagismo vira parte da experiência do atendimento.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {outcomes.map(([title, text]) => (
              <article key={title} className="rounded-[24px] border border-stone-200 bg-white p-7 shadow-sm">
                <h3 className="font-display text-2xl font-bold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#eef3ed] px-5 py-24 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Estratégia</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">A clínica precisa ser lembrada também pelo ambiente.</h2>
              <p className="mt-6 leading-8 text-stone-600">
                Um projeto biofílico bem resolvido melhora acolhimento, cria diferenciação e aumenta a coerência entre preço, serviço e percepção visual. O projeto considera fluxo de pacientes, manutenção, iluminação, limpeza e identidade da marca.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {["Baixa manutenção", "Espécies adequadas", "Identidade visual", "Execução por etapas"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-5">
                    <span className="material-symbols-outlined text-[#b28a28]">check_circle</span>
                    <span className="font-bold">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/contato?interesse=Paisagismo+para+Clinicas" className="mt-8 inline-block rounded-full bg-[#d7ae45] px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-[#173727] hover:text-white">
                Solicitar diagnóstico
              </Link>
            </div>
            <div className="overflow-hidden rounded-[28px]">
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200" alt="Clínica premium com paisagismo" className="h-full min-h-[520px] w-full object-cover" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
