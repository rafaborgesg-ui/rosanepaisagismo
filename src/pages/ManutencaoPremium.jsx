import { Link } from "react-router-dom";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const routines = [
  "Poda técnica e condução estética",
  "Adubação e nutrição vegetal",
  "Controle preventivo de pragas",
  "Reposição de espécies e acabamentos",
  "Ajustes sazonais de irrigação",
  "Relatório de cuidados e prioridades",
];

export default function ManutencaoPremium() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Manutenção Premium de Jardins"
        description="Planos de manutenção premium para jardins residenciais, áreas gourmet, clínicas, condomínios e empresas."
        keywords="manutenção de jardim premium, manutenção paisagismo, manutenção jardim residencial, manutenção jardim Montes Claros"
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <SiteNav activeLink="manutencao" />

      <main className="font-body">
        <section className="relative min-h-[88vh] overflow-hidden bg-[#173727] pt-28 text-white">
          <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1920" alt="Manutenção premium de jardim" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/86 to-[#173727]/22" />
          <div className="relative mx-auto grid min-h-[74vh] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1fr_0.8fr] md:px-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Recorrência e preservação</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">
                O jardim premium precisa continuar premium depois da entrega.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76">
                Planos de manutenção para preservar estética, saúde vegetal e valor percebido em residências, clínicas, áreas gourmet, condomínios e empresas.
              </p>
              <Link to="/contato?interesse=Manutencao+Premium" className="mt-10 inline-block rounded-full bg-[#d7ae45] px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-white">
                Solicitar plano mensal
              </Link>
            </div>
            <aside className="rounded-[28px] border border-white/15 bg-white/10 p-7 backdrop-blur-md">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">Rotina técnica</p>
              <div className="mt-6 space-y-4">
                {routines.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                    <span className="material-symbols-outlined text-[#d7ae45]">check_circle</span>
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-7 md:grid-cols-3">
            {[
              ["Residencial", "Para casas, áreas gourmet, piscinas e jardins sociais que precisam manter padrão visual constante."],
              ["Clínicas e empresas", "Para fachadas e recepções onde a primeira impressão impacta a percepção do negócio."],
              ["Condomínios", "Para áreas comuns, entradas, praças e jardins extensos com manutenção por cronograma."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-[24px] border border-stone-200 bg-white p-7 shadow-sm">
                <h2 className="font-display text-3xl font-bold">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-stone-600">{text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
