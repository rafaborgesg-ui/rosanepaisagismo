import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/apiService";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";
import { useLandingContent } from "@/hooks/useLandingContent";
import { trackEvent } from "@/lib/tracking";

const investmentOptions = [
  "Ainda não sei, preciso de orientação",
  "Até R$ 15 mil",
  "R$ 15 mil a R$ 30 mil",
  "R$ 30 mil a R$ 80 mil",
  "R$ 80 mil a R$ 200 mil",
  "Acima de R$ 200 mil",
];

const urgencyOptions = [
  "Quero começar imediatamente",
  "Nos próximos 30 dias",
  "Em até 3 meses",
  "Estou planejando para depois",
];

export default function Contato() {
  const content = useLandingContent();
  const whatsappNumero = content?.whatsapp_numero || "5538999313930";

  const urlParams = new URLSearchParams(window.location.search);
  const interesseParam = urlParams.get("interesse") || "Projeto de Paisagismo Premium";

  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    cidade: "",
    tipo: "Residência de alto padrão",
    investimento: "R$ 30 mil a R$ 80 mil",
    urgencia: "Nos próximos 30 dias",
    interesse: interesseParam,
    mensagem: "",
  });
  const [sent, setSent] = useState(false);
  const [arquivo, setArquivo] = useState(null);
  const [arquivoErro, setArquivoErro] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleArquivo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setArquivoErro("O arquivo deve ter no máximo 5 MB.");
      setArquivo(null);
      return;
    }
    setArquivoErro("");
    setArquivo(file);
  };

  const whatsappText = () => encodeURIComponent(
    `Olá, Rosane. Vim pelo site e quero um diagnóstico de paisagismo premium.\n\n` +
    `Nome: ${form.nome}\n` +
    `Cidade: ${form.cidade}\n` +
    `WhatsApp: ${form.whatsapp}\n` +
    `Tipo de projeto: ${form.tipo}\n` +
    `Interesse: ${form.interesse}\n` +
    `Investimento: ${form.investimento}\n` +
    `Prazo: ${form.urgencia}\n` +
    `Mensagem: ${form.mensagem || "Ainda vou enviar mais detalhes."}`
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let arquivo_url = null;
      let arquivo_nome = null;

      if (arquivo) {
        const uploadRes = await api.integrations.Core.UploadFile({ file: arquivo });
        arquivo_url = uploadRes.file_url;
        arquivo_nome = arquivo.name;
      }

      const mensagemCompleta = [
        form.mensagem,
        "",
        "Dados de qualificação:",
        `Cidade: ${form.cidade}`,
        `Tipo de projeto: ${form.tipo}`,
        `Investimento: ${form.investimento}`,
        `Prazo: ${form.urgencia}`,
      ].join("\n");

      const res = await api.functions.invoke("sendContactFormEmail", {
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp,
        interesse: form.interesse,
        mensagem: mensagemCompleta,
        arquivo_url,
        arquivo_nome,
      });

      if (res.data && res.data.success) {
        setSent(true);
        trackEvent("briefing_submitted", {
          interesse: form.interesse,
          tipo: form.tipo,
          investimento: form.investimento,
          urgencia: form.urgencia,
          cidade: form.cidade,
        });
        window.open(`https://wa.me/${whatsappNumero}?text=${whatsappText()}`, "_blank");
      }
    } catch (error) {
      setArquivoErro(error.message || "Erro ao enviar mensagem. Você também pode chamar pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Diagnóstico de Paisagismo Premium"
        description="Preencha o briefing para receber uma avaliação de projeto de paisagismo residencial, comercial, clínico ou manutenção premium."
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <SiteNav activeLink="contato" />

      <main className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 pt-32 font-body md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <section className="space-y-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#b28a28]">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Voltar ao site
          </Link>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Diagnóstico premium</p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-tight md:text-6xl">
              Conte o cenário. Nós indicamos o melhor caminho.
            </h1>
            <p className="mt-6 max-w-xl leading-8 text-stone-600">
              Este briefing ajuda a entender potencial, urgência e investimento. Assim a conversa já começa com direção, e não com um orçamento genérico.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              ["Resposta comercial", "Retorno com próximos passos e perguntas técnicas."],
              ["WhatsApp qualificado", "A mensagem chega com cidade, prazo e investimento."],
              ["Projeto de alto padrão", "Indicado para quem busca estética, técnica e execução."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-stone-200 bg-white p-5">
                <h2 className="font-display text-2xl font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-7 text-stone-600">{text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[24px] bg-[#173727] p-7 text-white">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">Contato direto</p>
            <a href={`https://wa.me/${whatsappNumero}`} className="mt-3 block font-display text-3xl font-bold">
              +{whatsappNumero}
            </a>
            <a href="mailto:rosanepaisagismo@gmail.com" className="mt-3 block text-white/70 hover:text-[#d7ae45]">
              rosanepaisagismo@gmail.com
            </a>
          </div>
        </section>

        <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/60 md:p-9">
          {sent ? (
            <div className="grid min-h-[520px] place-items-center text-center">
              <div>
                <span className="material-symbols-outlined mb-5 block text-6xl text-[#276a4d]">check_circle</span>
                <h2 className="font-display text-4xl font-bold">Briefing enviado.</h2>
                <p className="mx-auto mt-4 max-w-md leading-7 text-stone-600">
                  Também abrimos o WhatsApp com sua mensagem pronta para agilizar o atendimento.
                </p>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <h2 className="font-display text-3xl font-bold">Briefing rápido</h2>
                <p className="mt-2 text-sm text-stone-500">Campos pensados para qualificar projetos com maior chance de fechamento.</p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-stone-500">Nome completo</span>
                  <input required value={form.nome} onChange={(e) => updateForm("nome", e.target.value)} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 outline-none focus:border-[#b28a28]" placeholder="Seu nome" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-stone-500">WhatsApp</span>
                  <input required value={form.whatsapp} onChange={(e) => updateForm("whatsapp", e.target.value)} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 outline-none focus:border-[#b28a28]" placeholder="(00) 00000-0000" />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-stone-500">E-mail</span>
                  <input required type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 outline-none focus:border-[#b28a28]" placeholder="seu@email.com" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-stone-500">Cidade e bairro</span>
                  <input required value={form.cidade} onChange={(e) => updateForm("cidade", e.target.value)} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 outline-none focus:border-[#b28a28]" placeholder="Ex: Montes Claros, Ibituruna" />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-stone-500">Tipo de projeto</span>
                  <select value={form.tipo} onChange={(e) => updateForm("tipo", e.target.value)} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 outline-none focus:border-[#b28a28]">
                    <option>Residência de alto padrão</option>
                    <option>Área gourmet e piscina</option>
                    <option>Clínica ou consultório</option>
                    <option>Condomínio ou empresa</option>
                    <option>Manutenção premium</option>
                    <option>Consultoria técnica</option>
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-stone-500">Interesse</span>
                  <input value={form.interesse} onChange={(e) => updateForm("interesse", e.target.value)} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 outline-none focus:border-[#b28a28]" />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-stone-500">Investimento previsto</span>
                  <select value={form.investimento} onChange={(e) => updateForm("investimento", e.target.value)} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 outline-none focus:border-[#b28a28]">
                    {investmentOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-stone-500">Prazo</span>
                  <select value={form.urgencia} onChange={(e) => updateForm("urgencia", e.target.value)} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 outline-none focus:border-[#b28a28]">
                    {urgencyOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
              </div>

              <label className="space-y-2 block">
                <span className="text-xs font-extrabold uppercase tracking-widest text-stone-500">O que você deseja transformar?</span>
                <textarea value={form.mensagem} onChange={(e) => updateForm("mensagem", e.target.value)} rows={5} className="w-full resize-none rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 outline-none focus:border-[#b28a28]" placeholder="Conte sobre o espaço, medidas aproximadas, estilo desejado, problemas atuais ou referências." />
              </label>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-stone-500">Fotos, planta ou referência</span>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 px-4 py-5 text-left hover:border-[#b28a28]">
                  <span className="material-symbols-outlined text-[#b28a28]">attach_file</span>
                  <span className="min-w-0 flex-1 truncate text-sm text-stone-500">{arquivo ? arquivo.name : "Anexar arquivo opcional até 5 MB"}</span>
                </button>
                <input ref={fileInputRef} type="file" className="hidden" onChange={handleArquivo} />
                {arquivoErro && <p className="text-sm text-red-600">{arquivoErro}</p>}
              </div>

              <button disabled={loading} className="w-full rounded-full bg-[#d7ae45] px-8 py-5 text-xs font-extrabold uppercase tracking-[0.22em] text-[#173727] transition hover:bg-[#173727] hover:text-white disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Enviando briefing..." : "Enviar briefing e abrir WhatsApp"}
              </button>
            </form>
          )}
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
