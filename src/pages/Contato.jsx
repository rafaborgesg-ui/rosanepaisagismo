import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Paperclip,
  Phone,
  X,
} from "lucide-react";
import { api } from "@/api/apiService";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import MobileConciergeBar from "@/components/landing/home/MobileConciergeBar";
import { useLandingContent } from "@/hooks/useLandingContent";
import SEO from "@/components/seo/SEO";
import { buildWhatsAppUrl } from "@/data/premiumProjects";

const interests = [
  "Projeto de Paisagismo",
  "Paisagismo Residencial Premium",
  "Áreas Gourmet e Piscinas",
  "Jardim Vertical",
  "Paisagismo para Clínicas",
  "Consultoria Técnica",
  "Implantação e Obra",
  "Outros",
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const labelClass =
  "text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8f7b55]";

export default function Contato() {
  const reducedMotion = useReducedMotion();
  const content = useLandingContent();
  const whatsappNumero = content?.whatsapp_numero || "5538999313930";
  const urlParams = new URLSearchParams(window.location.search);
  const interesseParam = urlParams.get("interesse") || "Projeto de Paisagismo";

  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    interesse: interesseParam,
    mensagem: "",
  });
  const [sent, setSent] = useState(false);
  const [arquivo, setArquivo] = useState(null);
  const [arquivoErro, setArquivoErro] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const whatsappMessage = `Olá, quero falar com um especialista sobre ${
    form.interesse || "um projeto exclusivo de paisagismo"
  }.`;

  const handleArquivo = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setArquivoErro("O arquivo deve ter no máximo 5 MB.");
      setArquivo(null);
      return;
    }
    setArquivoErro("");
    setArquivo(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

      if (res.data?.success) {
        setSent(true);
        setForm({
          nome: "",
          email: "",
          whatsapp: "",
          interesse: interesseParam,
          mensagem: "",
        });
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
    <div className="min-h-screen overflow-x-hidden bg-[#f8f6f2] text-[#171914]">
      <SEO
        title="Contato | Avaliacao de Projeto de Paisagismo"
        description="Solicite atendimento para projetos exclusivos de jardins, piscinas, áreas gourmet, jardins verticais, clínicas e residências de alto padrão."
        keywords="contato paisagista, avaliacao de projeto paisagismo, projeto de jardim premium, paisagismo alto padrao"
        url="https://rosanepaisagismo-site.vercel.app/contato"
      />
      <SiteNav activeLink="contato" />

      <main>
        <section className="relative overflow-hidden bg-[#171914] px-4 pb-20 pt-32 text-white md:pb-28 md:pt-40">
          <img
            src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p6_i2.jpg"
            alt="Estudo de paisagismo residencial"
            className="absolute inset-0 h-full w-full object-cover opacity-72"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,18,14,0.92),rgba(16,18,14,0.44)_55%,rgba(16,18,14,0.82)),linear-gradient(180deg,rgba(16,18,14,0.28),rgba(16,18,14,0.94))]" />
          <motion.div
            initial={reducedMotion ? false : "hidden"}
            animate={reducedMotion ? undefined : "visible"}
            variants={reducedMotion ? undefined : fadeUp}
            className="relative z-10 mx-auto grid w-[min(100%,1180px)] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end"
          >
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
                Atendimento premium
              </p>
              <h1 className="mt-5 max-w-[21rem] font-heading text-[2.55rem] font-medium leading-[0.98] tracking-normal sm:max-w-3xl sm:text-6xl md:text-7xl">
                Vamos desenhar um exterior à altura do seu imóvel.
              </h1>
              <p className="mt-8 max-w-[21rem] text-lg font-light leading-8 text-white/76 sm:max-w-2xl">
                Conte sobre sua casa, clínica, piscina ou área gourmet. A primeira
                conversa identifica potencial, prioridades e o melhor caminho para o
                projeto.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`https://wa.me/${whatsappNumero}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473]"
                >
                  Falar com especialista
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#briefing"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/34 px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Enviar briefing
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="grid gap-4 rounded-[8px] border border-white/14 bg-white/9 p-6 backdrop-blur-xl md:grid-cols-3">
              {[
                ["1", "Envie fotos, planta ou referências"],
                ["2", "Receba uma leitura inicial"],
                ["3", "Agende a consultoria estratégica"],
              ].map(([num, text]) => (
                <div key={num} className="border-l border-[#d3b473]/45 pl-4">
                  <p className="font-heading text-3xl font-medium text-[#d3b473]">{num}</p>
                  <p className="mt-2 text-sm leading-6 text-white/74">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="briefing" className="px-4 py-20 md:py-28">
          <div className="mx-auto grid w-[min(100%,1180px)] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <motion.aside
              initial={reducedMotion ? false : "hidden"}
              whileInView={reducedMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-90px" }}
              variants={reducedMotion ? undefined : fadeUp}
              className="lg:sticky lg:top-28"
            >
              <p className={labelClass}>Briefing exclusivo</p>
              <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-5xl">
                Poucas informações certas já revelam o potencial do projeto.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#5f665c]">
                Fotos, planta, metragem, cidade e estilo desejado ajudam a transformar
                referências soltas em uma primeira leitura mais precisa.
              </p>

              <div className="mt-10 grid gap-4">
                <a
                  href="mailto:rosanepaisagismo@gmail.com"
                  className="flex items-center gap-4 rounded-[8px] bg-white p-5 shadow-[0_16px_50px_rgba(36,35,28,0.06)] transition hover:-translate-y-0.5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#171914] text-white">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#8f7b55]">
                      E-mail
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#171914]">
                      rosanepaisagismo@gmail.com
                    </p>
                  </div>
                </a>
                <a
                  href={buildWhatsAppUrl(whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-[8px] bg-white p-5 shadow-[0_16px_50px_rgba(36,35,28,0.06)] transition hover:-translate-y-0.5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#171914] text-white">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#8f7b55]">
                      WhatsApp
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#171914]">
                      Atendimento rápido e premium
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-4 rounded-[8px] bg-white p-5 shadow-[0_16px_50px_rgba(36,35,28,0.06)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#171914] text-white">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#8f7b55]">
                      Atuação
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#171914]">
                      MG, SP e projetos selecionados no Brasil
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>

            <motion.div
              initial={reducedMotion ? false : "hidden"}
              whileInView={reducedMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-90px" }}
              variants={reducedMotion ? undefined : fadeUp}
              className="rounded-[8px] bg-white p-6 shadow-[0_26px_90px_rgba(36,35,28,0.1)] md:p-10"
            >
              {sent ? (
                <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                  <CheckCircle2 className="mb-6 h-16 w-16 text-[#6f7b5f]" aria-hidden="true" />
                  <h2 className="font-heading text-3xl font-medium tracking-normal">
                    Briefing recebido.
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-7 text-[#5f665c]">
                    Obrigado. A equipe vai analisar as informações e entrar em contato
                    para alinhar os próximos passos.
                  </p>
                  <Link
                    to="/portfolio"
                    className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#171914] px-7 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#6f7b5f]"
                  >
                    Ver portfólio
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <p className={labelClass}>Iniciar avaliacao exclusiva</p>
                    <h2 className="mt-3 font-heading text-3xl font-medium tracking-normal text-[#171914]">
                      Conte sobre o espaço.
                    </h2>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="grid gap-2">
                        <span className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#8f7b55]">
                          Nome completo
                        </span>
                        <input
                          className="rounded-[8px] border border-[#dfd9cc] bg-[#fbfaf7] px-5 py-4 text-sm outline-none transition focus:border-[#8f7b55] focus:ring-4 focus:ring-[#8f7b55]/10"
                          placeholder="Seu nome"
                          type="text"
                          required
                          value={form.nome}
                          onChange={(event) =>
                            setForm((prev) => ({ ...prev, nome: event.target.value }))
                          }
                        />
                      </label>
                      <label className="grid gap-2">
                        <span className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#8f7b55]">
                          E-mail
                        </span>
                        <input
                          className="rounded-[8px] border border-[#dfd9cc] bg-[#fbfaf7] px-5 py-4 text-sm outline-none transition focus:border-[#8f7b55] focus:ring-4 focus:ring-[#8f7b55]/10"
                          placeholder="seu@email.com"
                          type="email"
                          required
                          value={form.email}
                          onChange={(event) =>
                            setForm((prev) => ({ ...prev, email: event.target.value }))
                          }
                        />
                      </label>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="grid gap-2">
                        <span className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#8f7b55]">
                          WhatsApp
                        </span>
                        <input
                          className="rounded-[8px] border border-[#dfd9cc] bg-[#fbfaf7] px-5 py-4 text-sm outline-none transition focus:border-[#8f7b55] focus:ring-4 focus:ring-[#8f7b55]/10"
                          placeholder="(00) 00000-0000"
                          type="text"
                          value={form.whatsapp}
                          onChange={(event) =>
                            setForm((prev) => ({ ...prev, whatsapp: event.target.value }))
                          }
                        />
                      </label>
                      <label className="grid gap-2">
                        <span className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#8f7b55]">
                          Interesse
                        </span>
                        <select
                          className="rounded-[8px] border border-[#dfd9cc] bg-[#fbfaf7] px-5 py-4 text-sm outline-none transition focus:border-[#8f7b55] focus:ring-4 focus:ring-[#8f7b55]/10"
                          value={form.interesse}
                          onChange={(event) =>
                            setForm((prev) => ({ ...prev, interesse: event.target.value }))
                          }
                        >
                          {interests.map((interest) => (
                            <option key={interest}>{interest}</option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <label className="grid gap-2">
                      <span className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#8f7b55]">
                        Mensagem
                      </span>
                      <textarea
                        className="min-h-36 resize-none rounded-[8px] border border-[#dfd9cc] bg-[#fbfaf7] px-5 py-4 text-sm outline-none transition focus:border-[#8f7b55] focus:ring-4 focus:ring-[#8f7b55]/10"
                        placeholder="Conte sobre metragem, uso desejado, fase da obra, cidade e referências que você gosta."
                        value={form.mensagem}
                        onChange={(event) =>
                          setForm((prev) => ({ ...prev, mensagem: event.target.value }))
                        }
                      />
                    </label>

                    <div className="grid gap-2">
                      <span className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#8f7b55]">
                        Anexo opcional
                      </span>
                      <div
                        className="flex cursor-pointer items-center gap-3 rounded-[8px] border border-dashed border-[#d3c9b7] bg-[#fbfaf7] px-5 py-4 transition hover:border-[#8f7b55]"
                        onClick={() => fileInputRef.current?.click()}
                        role="button"
                        tabIndex={0}
                      >
                        <Paperclip className="h-5 w-5 text-[#8f7b55]" aria-hidden="true" />
                        <span className="flex-1 truncate text-sm text-[#5f665c]">
                          {arquivo
                            ? arquivo.name
                            : "Anexe fotos, planta ou referência em até 5 MB"}
                        </span>
                        {arquivo && (
                          <button
                            type="button"
                            className="text-[#858b80] transition hover:text-red-600"
                            onClick={(event) => {
                              event.stopPropagation();
                              setArquivo(null);
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            aria-label="Remover arquivo"
                          >
                            <X className="h-4 w-4" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                      <input ref={fileInputRef} type="file" className="hidden" onChange={handleArquivo} />
                      {arquivoErro && (
                        <p className="rounded-[8px] bg-red-50 p-3 text-xs text-red-700">
                          {arquivoErro}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#171914] px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#6f7b5f] disabled:cursor-not-allowed disabled:opacity-55"
                    >
                      {loading ? "Enviando..." : "Enviar briefing inicial"}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat hideOnMobile />
      <MobileConciergeBar href="#briefing" label="Ir para briefing" />
    </div>
  );
}
