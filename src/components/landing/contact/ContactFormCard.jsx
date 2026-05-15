import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Paperclip, X } from "lucide-react";
import { fadeUp, interests, labelClass } from "@/components/landing/contact/contactShared";

export default function ContactFormCard({
  reducedMotion = false,
  sent,
  loading,
  form,
  setForm,
  arquivo,
  setArquivo,
  arquivoErro,
  fileInputRef,
  handleArquivo,
  handleSubmit,
}) {
  return (
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
            Obrigado. A equipe vai analisar as informações e entrar em contato para
            alinhar os próximos passos.
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
            <p className={labelClass}>Iniciar avaliação exclusiva</p>
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
                  onChange={(event) => setForm((prev) => ({ ...prev, nome: event.target.value }))}
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
                  {arquivo ? arquivo.name : "Anexe fotos, planta ou referência em até 5 MB"}
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
  );
}
