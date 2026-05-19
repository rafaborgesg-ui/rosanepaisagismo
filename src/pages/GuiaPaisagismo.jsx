import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/apiService";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat"; // Adicionado para consistência, embora não usado diretamente no diff
import SEO from "@/components/seo/SEO";
import { trackEvent } from "@/lib/tracking"; // Adicionado para consistência

export default function GuiaPaisagismo() {
  // Estado do formulário
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handler do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Salvar lead na tabela
      await api.entities.Leads.create({
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp,
        fonte: "guia_paisagismo",
        data_captura: new Date().toISOString(),
        status: "novo"
      });

      // 2. Enviar email com o guia
      const res = await api.functions.invoke('sendGuiaPaisagismoEmail', {
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp,
      });

      if (res.data && res.data.success) {
        setSent(true);
        trackEvent("lead_magnet_submitted", { source: "guia_paisagismo" }); // Tracking de sucesso
      } else {
        setError("Erro ao enviar o guia. Tente novamente.");
        trackEvent("lead_magnet_submit_error", { source: "guia_paisagismo", message: "Email function failed" }); // Tracking de erro
      }
    } catch (err) {
      console.error("Erro ao enviar lead ou email:", err);
      setError("Erro ao processar sua solicitação. Verifique sua conexão e tente novamente.");
      trackEvent("lead_magnet_submit_error", { source: "guia_paisagismo", message: err.message }); // Tracking de erro
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fcfaf7] to-white">
      {/* SEO */}
      <SEO
        title="Guia Completo: Como Valorizar Seu Imóvel com Paisagismo"
        description="Descubra como paisagismo premium pode valorizar seu imóvel em até 30%..."
        url="https://rosanepaisagismo.vercel.app/guia-paisagismo"
      />

      {/* Estilos */}
      <style>{`
        .guia-section {
          padding: 4rem 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .guia-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.1;
          color: #1a3d2b;
          margin-bottom: 1rem;
        }
        .guia-subtitle {
          font-family: 'Manrope', sans-serif;
          font-size: clamp(1.125rem, 2vw, 1.5rem);
          color: #244334;
          margin-bottom: 2rem;
        }
        .guia-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2.5rem;
          background-color: #c09624;
          color: white;
          border-radius: 9999px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(192, 150, 36, 0.2);
        }
        .guia-button:hover {
          background-color: #1a3d2b;
          box-shadow: 0 15px 30px rgba(26, 61, 43, 0.2);
        }
        .guia-form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          color: #1a3d2b;
          background-color: #f9fafb;
        }
        .guia-form-input:focus {
          outline: none;
          border-color: #c09624;
          box-shadow: 0 0 0 3px rgba(192, 150, 36, 0.2);
        }
        .guia-social-proof-card {
          background-color: #244334;
          color: #fcfaf7;
          padding: 2.5rem;
          border-radius: 1.5rem;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .guia-social-proof-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 600;
          line-height: 1;
          color: #c09624;
        }
        .guia-social-proof-text {
          font-size: 1.125rem;
          margin-top: 0.5rem;
          color: #e0e0e0;
        }
        .guia-faq-item {
          border-bottom: 1px solid #e5e7eb;
          padding: 1.5rem 0;
        }
        .guia-faq-question {
          font-weight: 600;
          color: #1a3d2b;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .guia-faq-answer {
          color: #244334;
          margin-top: 0.75rem;
          line-height: 1.6;
        }
        .guia-cta-final {
          background-color: #f3eee4;
          padding: 3rem;
          border-radius: 1.5rem;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .guia-cta-final-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          color: #1a3d2b;
          margin-bottom: 1.5rem;
        }
      `}</style>

      <SiteNav />

      <main className="pt-32 pb-20">
        {/* Hero Section com Formulário */}
        <section className="guia-section">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Coluna Esquerda: Info */}
            <div>
              <h1 className="guia-title">
                Guia Completo: Como Valorizar Seu Imóvel com Paisagismo
              </h1>
              <p className="guia-subtitle">
                Descubra os segredos para transformar seu espaço e aumentar o valor percebido do seu patrimônio em até 30% com projetos de paisagismo autoral.
              </p>
              <ul className="space-y-3 text-[#244334] text-lg mb-8">
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#c09624]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span>Estratégias de valorização imobiliária com paisagismo.</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#c09624]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span>Como escolher espécies para durabilidade e baixa manutenção.</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#c09624]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span>O impacto do paisagismo na arquitetura e bem-estar.</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#c09624]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span>Cases de sucesso e antes/depois inspiradores.</span>
                </li>
              </ul>
              <p className="text-[#244334] text-lg">
                Preencha o formulário ao lado e receba seu guia exclusivo agora mesmo.
              </p>
            </div>

            {/* Coluna Direita: Formulário */}
            <div>
              <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl p-10 sticky top-32">
                {sent ? (
                  // Mensagem de sucesso
                  <div className="text-center">
                    <svg className="w-20 h-20 text-[#1a3d2b] mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="guia-title text-2xl mb-4">Guia Enviado!</h3>
                    <p className="text-[#244334] mb-6">
                      Verifique sua caixa de entrada (e spam) para baixar seu guia exclusivo.
                    </p>
                    <Link to="/" className="guia-button">
                      Voltar para a Home
                    </Link>
                  </div>
                ) : (
                  // Formulário
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="guia-title text-2xl text-center">Baixe seu Guia Grátis</h3>
                    <p className="text-[#244334] text-center">
                      Preencha seus dados para receber o guia completo no seu e-mail.
                    </p>
                    <div>
                      <label htmlFor="nome" className="sr-only">Nome</label>
                      <input
                        type="text"
                        id="nome"
                        className="guia-form-input"
                        placeholder="Seu nome completo"
                        value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">E-mail</label>
                      <input
                        type="email"
                        id="email"
                        className="guia-form-input"
                        placeholder="Seu melhor e-mail"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="whatsapp" className="sr-only">WhatsApp</label>
                      <input
                        type="tel"
                        id="whatsapp"
                        className="guia-form-input"
                        placeholder="Seu WhatsApp (com DDD)"
                        value={form.whatsapp}
                        onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                        required
                      />
                    </div>
                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                    <button
                      type="submit"
                      className="guia-button w-full"
                      disabled={loading}
                    >
                      {loading ? "Enviando..." : "Receber Guia Agora"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="bg-[#1a3d2b] py-16 px-6 my-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div className="guia-social-proof-card">
              <p className="guia-social-proof-number">2.847+</p>
              <p className="guia-social-proof-text">Downloads Realizados</p>
            </div>
            <div className="guia-social-proof-card">
              <p className="guia-social-proof-number">4.9 ⭐</p>
              <p className="guia-social-proof-text">Avaliação Média dos Leitores</p>
            </div>
            <div className="guia-social-proof-card">
              <p className="guia-social-proof-number">30%</p>
              <p className="guia-social-proof-text">Valorização Potencial do Imóvel</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="guia-section py-16">
          <h2 className="guia-title text-center mb-12">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto">
            <div className="guia-faq-item">
              <h3 className="guia-faq-question">
                O guia é realmente gratuito?
                <span className="text-xl text-[#c09624]">+</span>
              </h3>
              <p className="guia-faq-answer">
                Sim, o guia "Como Valorizar Seu Imóvel com Paisagismo" é totalmente gratuito. Nosso objetivo é compartilhar conhecimento de alto valor para proprietários e investidores.
              </p>
            </div>
            <div className="guia-faq-item">
              <h3 className="guia-faq-question">
                Vou receber spam após o download?
                <span className="text-xl text-[#c09624]">+</span>
              </h3>
              <p className="guia-faq-answer">
                Não. Respeitamos sua privacidade. Você receberá o guia e, ocasionalmente, conteúdos relevantes sobre paisagismo de alto padrão. Você pode se descadastrar a qualquer momento.
              </p>
            </div>
            <div className="guia-faq-item">
              <h3 className="guia-faq-question">
                O guia serve para qualquer tipo de imóvel?
                <span className="text-xl text-[#c09624]">+</span>
              </h3>
              <p className="guia-faq-answer">
                Sim, o guia aborda princípios universais de paisagismo que podem ser aplicados e adaptados a diversos tipos de imóveis, desde residências unifamiliares até empreendimentos comerciais.
              </p>
            </div>
            <div className="guia-faq-item">
              <h3 className="guia-faq-question">
                Preciso ter conhecimento prévio em paisagismo?
                <span className="text-xl text-[#c09624]">+</span>
              </h3>
              <p className="guia-faq-answer">
                Não, o guia foi elaborado para ser acessível a todos, desde iniciantes até aqueles com algum conhecimento. Ele oferece insights valiosos para qualquer pessoa interessada em paisagismo de alto padrão.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="guia-section py-20">
          <div className="guia-cta-final text-center">
            <h2 className="guia-cta-final-title">
              Pronto para transformar seu imóvel?
            </h2>
            <p className="text-[#244334] text-lg mb-8">
              Baixe o guia agora e comece a planejar seu paisagismo com inteligência e estratégia.
            </p>
            <button
              onClick={handleSubmit} // Re-use handleSubmit to trigger download
              className="guia-button"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Baixar Guia Grátis"}
            </button>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat /> {/* Adicionado para consistência */}
    </div>
  );
}