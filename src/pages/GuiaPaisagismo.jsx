import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/apiService";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import SEO from "@/components/seo/SEO";

export default function GuiaPaisagismo() {
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Salvar lead na tabela de leads
      await api.entities.Leads.create({
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp,
        fonte: "guia_paisagismo",
        data_captura: new Date().toISOString(),
        status: "novo"
      });

      // Enviar email com o guia
      const res = await api.functions.invoke('sendGuiaPaisagismoEmail', {
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp,
      });

      if (res.data && res.data.success) {
        setSent(true);
        setForm({ nome: "", email: "", whatsapp: "" });
      } else {
        setError("Erro ao enviar guia. Tente novamente.");
      }
    } catch (err) {
      setError(err.message || "Erro ao processar sua solicitação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fcfaf7] to-white">
      <SEO 
        title="Guia Completo: Como Valorizar Seu Imóvel com Paisagismo | Rosane Paisagismo"
        description="Descubra como paisagismo premium pode valorizar seu imóvel em até 30%. Guia gratuito com 50 páginas com plantas, orçamentos e cases reais."
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-serif-s { font-family: 'Playfair Display', serif; }
        .font-sans-s { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }
      `}</style>

      <SiteNav />

      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="px-6 max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Coluna Esquerda - Info */}
            <div className="space-y-8">
              <div>
                <p className="font-sans-s text-[10px] font-bold uppercase tracking-[0.35em] text-[#c09624] mb-4">
                  Lead Magnet Gratuito
                </p>
                <h1 className="font-serif-s text-5xl md:text-6xl text-[#1a3d2b] leading-[1.1] mb-6">
                  Guia Completo: Como Valorizar Seu Imóvel com <span className="text-[#c09624]">Paisagismo</span>
                </h1>
                <p className="font-sans-s text-lg text-stone-600 leading-relaxed mb-8">
                  Descubra os segredos que paisagistas premium usam para valorizar imóveis em até <strong>30%</strong>. Este guia com 50 páginas inclui:
                </p>
              </div>

              {/* Benefícios */}
              <div className="space-y-4">
                {[
                  { icon: "check_circle", text: "10 ideias de projetos que aumentam valor do imóvel" },
                  { icon: "check_circle", text: "Espécies selecionadas para cada clima e estilo" },
                  { icon: "check_circle", text: "Tabela de orçamentos e ROI por tipo de projeto" },
                  { icon: "check_circle", text: "5 cases reais de valorização e antes/depois" },
                  { icon: "check_circle", text: "Dicas de iluminação e design que transformam jardins" },
                  { icon: "check_circle", text: "Checklist completo para contratar paisagista premium" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[#c09624] text-2xl flex-shrink-0">
                      {item.icon}
                    </span>
                    <p className="font-sans-s text-stone-700 pt-0.5">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Social Proof Mini */}
              <div className="pt-6 border-t border-stone-200 flex items-center gap-6">
                <div>
                  <p className="font-serif-s text-3xl font-bold text-[#c09624]">2.847+</p>
                  <p className="font-sans-s text-xs uppercase tracking-widest text-stone-400 mt-1">
                    Pessoas baixaram
                  </p>
                </div>
                <div>
                  <p className="font-serif-s text-3xl font-bold text-[#c09624]">4.9⭐</p>
                  <p className="font-sans-s text-xs uppercase tracking-widest text-stone-400 mt-1">
                    Avaliação média
                  </p>
                </div>
              </div>
            </div>

            {/* Coluna Direita - Formulário */}
            <div>
              <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl p-10 sticky top-32">
                {sent ? (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="material-symbols-outlined text-3xl text-green-600">check</span>
                    </div>
                    <div>
                      <h3 className="font-serif-s text-2xl font-bold text-[#1a3d2b] mb-2">
                        Guia enviado! 🎉
                      </h3>
                      <p className="font-sans-s text-stone-600 mb-6">
                        Verifique seu email. O guia foi enviado agora.
                      </p>
                      <p className="font-sans-s text-sm text-stone-500 mb-8">
                        Também enviaremos 3 emails com dicas exclusivas sobre paisagismo premium (sem spam, prometo!).
                      </p>
                    </div>
                    <Link 
                      to="/contato"
                      className="inline-block w-full py-4 bg-[#c09624] text-white font-bold rounded-full hover:bg-[#1a3d2b] transition-all uppercase text-xs tracking-widest"
                    >
                      Agendar Consultoria Gratuita
                    </Link>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif-s text-2xl font-bold text-[#1a3d2b] mb-2">
                      Receba o Guia Grátis
                    </h2>
                    <p className="font-sans-s text-sm text-stone-500 mb-8">
                      Preencha seus dados abaixo. Entrega instantânea por email.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="font-sans-s text-xs font-semibold text-stone-600 block mb-2">
                          Seu Nome
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Ana Paula"
                          value={form.nome}
                          onChange={(e) => setForm({ ...form, nome: e.target.value })}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#c09624] focus:outline-none font-sans-s"
                        />
                      </div>

                      <div>
                        <label className="font-sans-s text-xs font-semibold text-stone-600 block mb-2">
                          Seu Email
                        </label>
                        <input
                          type="email"
                          placeholder="seu@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#c09624] focus:outline-none font-sans-s"
                        />
                      </div>

                      <div>
                        <label className="font-sans-s text-xs font-semibold text-stone-600 block mb-2">
                          WhatsApp (Opcional)
                        </label>
                        <input
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={form.whatsapp}
                          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#c09624] focus:outline-none font-sans-s"
                        />
                      </div>

                      {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <p className="font-sans-s text-sm text-red-600">{error}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#c09624] text-white font-bold rounded-full hover:bg-[#1a3d2b] transition-all disabled:opacity-50 uppercase text-xs tracking-widest font-sans-s"
                      >
                        {loading ? "Processando..." : "✨ Receber Guia Agora"}
                      </button>

                      <p className="font-sans-s text-xs text-center text-stone-400">
                        Sem spam. Suas informações são seguras.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Seção */}
        <section className="bg-[#1a3d2b] py-16 px-6 my-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif-s text-3xl text-white text-center mb-12">
              O Que Recebem Nossos Leitores
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-white/90">
              {[
                { title: "50 Páginas Práticas", desc: "PDF editável com plantas, especificações técnicas e orçamentos" },
                { title: "5 Case Studies", desc: "Histórias reais de clientes que valorizaram seus imóveis em até 30%" },
                { title: "Sequência de Emails", desc: "3 aulas exclusivas sobre paisagismo premium (1 por dia)" },
                { title: "Tabelas de ROI", desc: "Quanto investir em cada tipo de projeto para máximo retorno" },
                { title: "Checklist Completo", desc: "Guia passo a passo para contratar paisagista profissional" },
                { title: "Bônus: Espécies", desc: "Catálogo com 30 plantas recomendadas por nossos paisagistas" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <p className="font-bold text-[#c09624]">✓ {item.title}</p>
                  <p className="font-sans-s text-sm text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="font-serif-s text-4xl text-[#1a3d2b] text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="space-y-6">
            {[
              { q: "O guia é realmente grátis?", a: "100% grátis! Você só precisa do seu email. Usamos para enviar dicas semanais (e você pode sair quando quiser)." },
              { q: "Quando receberei o guia?", a: "Instantaneamente após preencher o formulário. Vai cair na sua caixa de entrada em segundos." },
              { q: "Posso compartilhar o guia?", a: "O guia é para uso pessoal. Mas convide amigos para baixar também! 😉" },
              { q: "Será cobrado depois?", a: "Nunca. O guia é grátis. Você receberá emails informativos, mas sem obrigação de compra." },
              { q: "Vale para quem aluga?", a: "Sim! O guia inclui ideias para apartamentos e espaços pequenos também." },
            ].map((item, i) => (
              <div key={i} className="border-b border-stone-200 pb-6">
                <h3 className="font-serif-s text-lg font-bold text-[#1a3d2b] mb-3">
                  {item.q}
                </h3>
                <p className="font-sans-s text-stone-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="font-sans-s text-stone-500 text-lg mb-6">
            Pronto para transformar seu jardim?
          </p>
          <h2 className="font-serif-s text-4xl text-[#1a3d2b] mb-8">
            Comece com o Guia Grátis Agora
          </h2>
          <Link 
            to="#top"
            className="inline-block px-12 py-5 bg-[#c09624] text-white font-bold rounded-full hover:bg-[#1a3d2b] transition-all uppercase text-xs tracking-widest"
          >
            ↑ Voltar ao Formulário
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
