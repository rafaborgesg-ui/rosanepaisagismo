import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle, Paperclip, Phone, X } from "lucide-react";
import { api } from "@/api/apiService";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import { useLandingContent } from "@/hooks/useLandingContent";
import SEO from "@/components/seo/SEO";

const interests = [
  "Projeto de Paisagismo",
  "Paisagismo Residencial Premium",
  "Áreas Gourmet & Piscinas",
  "Paisagismo para Clínicas",
  "Consultoria Técnica",
  "Implantação e Obra",
  "Outros",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

export default function Contato() {
  const content = useLandingContent();
  const whatsappNumero = content?.whatsapp_numero || "5538999313930";
  const urlParams = new URLSearchParams(window.location.search);
  const interesseParam = urlParams.get("interesse") || "Projeto de Paisagismo";

  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "", interesse: interesseParam, mensagem: "" });
  const [sent, setSent] = useState(false);
  const [arquivo, setArquivo] = useState(null);
  const [arquivoErro, setArquivoErro] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const whatsappMessage = encodeURIComponent(
    `Olá, quero falar com um especialista sobre ${form.interesse || "um projeto exclusivo de paisagismo"}.`
  );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setArquivoErro("");

    try {
      let arquivo_url = null;
      let arquivo_nome = null;

      if (arquivo) {
        const uploadRes = await api.integrations.Core.UploadFile({ file: arquivo });
        arquivo_url = uploadRes.file_url;
        arquivo_nome = arquivo.name;
      }

      const res = await api.functions.invoke("sendContactFormEmail", {
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp,
        interesse: form.interesse,
        mensagem: form.mensagem,
        arquivo_url,
        arquivo_nome,
      });

      if (res.data && res.data.success) {
        setSent(true);
        setForm({ nome: "", email: "", whatsapp: "", interesse: interesseParam, mensagem: "" });
        setArquivo(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (error) {
      setArquivoErro(error.message || "Erro ao enviar mensagem. Tente novamente pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#121411]">
      <SEO
        title="Contato | Agendar Consultoria de Paisagismo"
        description="Agende uma consultoria com a Rosane Paisagismo para projetos exclusivos de jardins, piscinas, áreas gourmet, clínicas e residências de alto padrão."
        keywords="contato paisagista, agendar consultoria paisagismo, projeto de jardim premium, orçamento paisagismo alto padrão"
        url="https://rosanepaisagismo.com/contato"
      />
      <SiteNav activeLink="contato" />

      <main>
        <section className="relative overflow-hidden bg-[#121411] px-5 pb-20 pt-32 text-white md:pb-28 md:pt-40">
          <img
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=85&w=2200"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-58"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,20,17,0.94),rgba(18,20,17,0.54)_55%,rgba(18,20,17,0.86)),linear-gradient(180deg,rgba(18,20,17,0.35),rgba(18,20,17,0.96))]" />
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#d5bd7b]">Atendimento premium</p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                Vamos desenhar um exterior à altura do seu imóvel.
              </h1>
              <p className="mt-8 max-w-2xl text-lg font-light leading-8 text-white/76">
                Conte sobre sua casa, clínica, piscina ou área gourmet. A primeira conversa identifica potencial, prioridades e o caminho ideal para um projeto exclusivo.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`https://wa.me/${whatsappNumero}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#121411] transition hover:-translate-y-0.5 hover:bg-[#b89445] hover:text-white"
                >
                  Falar com especialista <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href="#briefing"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/25 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
                >
                  Enviar briefing <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/12 bg-white/8 p-6 backdrop-blur-xl md:grid-cols-3">
              {[
                ["1", "Envie fotos, planta ou referência"],
                ["2", "Receba uma avaliação inicial"],
                ["3", "Agende a consultoria estratégica"],
              ].map(([num, text]) => (
                <div key={num} className="border-l border-[#d5bd7b]/45 pl-4">
                  <p className="text-2xl font-semibold text-[#d5bd7b]">{num}</p>
                  <p className="mt-2 text-sm leading-6 text-white/74">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="briefing" className="bg-[#f7f7f3] px-5 py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <motion.aside initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:sticky lg:top-28">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#b89445]">Briefing exclusivo</p>
              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
                Poucas informações certas já revelam o potencial do projeto.
              </h2>
              <p className="mt-6 text-lg font-light leading-8 text-[#626960]">
                Quanto mais contexto você enviar, melhor será a primeira leitura: fotos do espaço, planta, metragem, expectativas de uso e estilo desejado.
              </p>

              <div className="mt-10 grid gap-5">
                <a href="mailto:rosanepaisagismo@gmail.com" className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-[0_16px_50px_rgba(18,20,17,0.06)] transition hover:-translate-y-0.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#163528] text-white"><Mail className="h-5 w-5" /></span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a9188]">E-mail</p>
                    <p className="mt-1 text-sm font-semibold text-[#121411]">rosanepaisagismo@gmail.com</p>
                  </div>
                </a>
                <a href={`https://wa.me/${whatsappNumero}?text=${whatsappMessage}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-[0_16px_50px_rgba(18,20,17,0.06)] transition hover:-translate-y-0.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#163528] text-white"><Phone className="h-5 w-5" /></span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a9188]">WhatsApp</p>
                    <p className="mt-1 text-sm font-semibold text-[#121411]">Atendimento rápido e premium</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-[0_16px_50px_rgba(18,20,17,0.06)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#163528] text-white"><MapPin className="h-5 w-5" /></span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a9188]">Atuação</p>
                    <p className="mt-1 text-sm font-semibold text-[#121411]">SP, MG e projetos selecionados no Brasil</p>
                  </div>
                </div>
              </div>
            </motion.aside>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="rounded-[30px] bg-white p-6 shadow-[0_26px_90px_rgba(18,20,17,0.1)] md:p-10">
              {sent ? (
                <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                  <CheckCircle2 className="mb-6 h-16 w-16 text-[#163528]" />
                  <h2 className="text-3xl font-semibold tracking-[-0.03em]">Briefing recebido.</h2>
                  <p className="mt-4 max-w-md text-sm leading-7 text-[#626960]">
                    Obrigado. A equipe vai analisar as informações e entrar em contato para alinhar os próximos passos.
                  </p>
                  <Link to="/portfolio" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#121411] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#b89445]">
                    Ver portfólio <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b89445]">Solicitar projeto exclusivo</p>
                    <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#121411]">Conte sobre o espaço.</h2>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="grid gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9188]">Nome completo</span>
                        <input
                          className="rounded-2xl border border-[#e2dfd5] bg-[#fbfbf8] px-5 py-4 text-sm outline-none transition focus:border-[#b89445] focus:ring-4 focus:ring-[#b89445]/10"
                          placeholder="Seu nome"
                          type="text"
                          required
                          value={form.nome}
                          onChange={(e) => setForm((prev) => ({ ...prev, nome: e.target.value }))}
                        />
                      </label>
                      <label className="grid gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9188]">E-mail</span>
                        <input
                          className="rounded-2xl border border-[#e2dfd5] bg-[#fbfbf8] px-5 py-4 text-sm outline-none transition focus:border-[#b89445] focus:ring-4 focus:ring-[#b89445]/10"
                          placeholder="seu@email.com"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                        />
                      </label>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="grid gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9188]">WhatsApp</span>
                        <input
                          className="rounded-2xl border border-[#e2dfd5] bg-[#fbfbf8] px-5 py-4 text-sm outline-none transition focus:border-[#b89445] focus:ring-4 focus:ring-[#b89445]/10"
                          placeholder="(00) 00000-0000"
                          type="text"
                          value={form.whatsapp}
                          onChange={(e) => setForm((prev) => ({ ...prev, whatsapp: e.target.value }))}
                        />
                      </label>
                      <label className="grid gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9188]">Interesse</span>
                        <select
                          className="rounded-2xl border border-[#e2dfd5] bg-[#fbfbf8] px-5 py-4 text-sm outline-none transition focus:border-[#b89445] focus:ring-4 focus:ring-[#b89445]/10"
                          value={form.interesse}
                          onChange={(e) => setForm((prev) => ({ ...prev, interesse: e.target.value }))}
                        >
                          {interests.map((interest) => (
                            <option key={interest}>{interest}</option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <label className="grid gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9188]">Mensagem</span>
                      <textarea
                        className="min-h-36 resize-none rounded-2xl border border-[#e2dfd5] bg-[#fbfbf8] px-5 py-4 text-sm outline-none transition focus:border-[#b89445] focus:ring-4 focus:ring-[#b89445]/10"
                        placeholder="Conte sobre metragem, uso desejado, fase da obra, cidade e referências que você gosta."
                        value={form.mensagem}
                        onChange={(e) => setForm((prev) => ({ ...prev, mensagem: e.target.value }))}
                      />
                    </label>

                    <div className="grid gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9188]">Anexo opcional</span>
                      <div
                        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-[#d8d4c8] bg-[#fbfbf8] px-5 py-4 transition hover:border-[#b89445]"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Paperclip className="h-5 w-5 text-[#b89445]" />
                        <span className="flex-1 truncate text-sm text-[#697067]">
                          {arquivo ? arquivo.name : "Anexe fotos, planta ou referência em até 5 MB"}
                        </span>
                        {arquivo && (
                          <button
                            type="button"
                            className="text-[#8a9188] transition hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              setArquivo(null);
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            aria-label="Remover arquivo"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <input ref={fileInputRef} type="file" className="hidden" onChange={handleArquivo} />
                      {arquivoErro && <p className="rounded-xl bg-red-50 p-3 text-xs text-red-700">{arquivoErro}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex w-full min-h-14 items-center justify-center gap-3 rounded-full bg-[#121411] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-[#b89445] disabled:cursor-not-allowed disabled:opacity-55"
                    >
                      {loading ? "Enviando..." : "Solicitar projeto exclusivo"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
