import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/apiService";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";
import { trackEvent } from "@/lib/tracking";

const guideItems = [
  "Como escolher o estilo certo para o imóvel",
  "Erros que deixam jardins premium com aparência comum",
  "O que avaliar antes de investir em área gourmet e piscina",
  "Checklist de briefing para conversar com um paisagista",
];

export default function GuiaPaisagismo() {
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await api.entities.Leads.create({
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp,
        fonte: "guia_paisagismo",
        data_captura: new Date().toISOString(),
        status: "novo",
      });

      await api.functions.invoke("sendGuiaPaisagismoEmail", {
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp,
      });

      trackEvent("lead_magnet_submitted", { source: "guia_paisagismo" });
      setSent(true);
    } catch (error) {
      trackEvent("lead_magnet_submit_error", { source: "guia_paisagismo" });
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Guia de Paisagismo Premium"
        description="Baixe o guia de paisagismo premium para entender como valorizar imóveis com jardins, áreas gourmet, piscinas e fachadas sofisticadas."
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <SiteNav />

      <main className="font-body">
        <section className="grid min-h-screen bg-[#173727] pt-28 text-white md:grid-cols-[1fr_0.9fr]">
          <div className="flex items-center px-5 py-16 md:px-12 lg:px-20">
            <div className="max-w-2xl">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-[#d7ae45]">Material gratuito</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">
                Guia de valorização para jardins premium.
              </h1>
              <p className="mt-7 text-lg leading-8 text-white/70">
                Um material rápido para quem quer transformar área externa em desejo, valor percebido e experiência de alto padrão.
              </p>
              <div className="mt-10 grid gap-4">
                {guideItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="material-symbols-outlined text-[#d7ae45]">check_circle</span>
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center bg-[#fbfaf6] px-5 py-16 text-[#173727] md:px-12 lg:px-20">
            <div className="w-full rounded-[32px] bg-white p-8 shadow-2xl shadow-black/10 md:p-10">
              {sent ? (
                <div className="py-12 text-center">
                  <span className="material-symbols-outlined mb-4 block text-6xl text-[#d7ae45]">mark_email_read</span>
                  <h2 className="font-display text-4xl font-bold">Pedido recebido.</h2>
                  <p className="mx-auto mt-4 max-w-md leading-7 text-stone-600">
                    Se a automação de e-mail estiver ativa, o guia chegará na sua caixa de entrada. Você também pode seguir para o diagnóstico.
                  </p>
                  <Link to="/contato?interesse=Guia+Paisagismo" className="mt-8 inline-block rounded-full bg-[#d7ae45] px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-[#173727] hover:text-white">
                    Solicitar diagnóstico
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#b28a28]">Acesso ao guia</p>
                    <h2 className="mt-3 font-display text-4xl font-bold">Receba o material.</h2>
                    <p className="mt-3 text-sm leading-7 text-stone-500">
                      Informe seus dados para entrar na esteira de conteúdo premium da Rosane Paisagismo.
                    </p>
                  </div>
                  <input required value={form.nome} onChange={(event) => update("nome", event.target.value)} placeholder="Nome completo" className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 outline-none focus:border-[#b28a28]" />
                  <input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="E-mail" className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 outline-none focus:border-[#b28a28]" />
                  <input value={form.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} placeholder="WhatsApp opcional" className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 outline-none focus:border-[#b28a28]" />
                  <button disabled={loading} className="w-full rounded-full bg-[#d7ae45] px-8 py-5 text-xs font-extrabold uppercase tracking-[0.22em] text-[#173727] hover:bg-[#173727] hover:text-white disabled:opacity-60">
                    {loading ? "Enviando..." : "Receber guia"}
                  </button>
                  <p className="text-center text-[10px] uppercase tracking-widest text-stone-400">
                    Sem spam. Apenas conteúdos úteis sobre paisagismo premium.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
