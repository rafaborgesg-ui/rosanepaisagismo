import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Paperclip, X } from "lucide-react";
import { fadeUp, interests, labelClass } from "@/components/landing/contact/contactShared";

const inputClass =
  "min-h-12 w-full min-w-0 border border-[#d8cdbb] bg-transparent px-4 text-sm text-[#171914] outline-none transition placeholder:text-[#858b80] focus:border-[#8f7b55] focus:bg-white/40";

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
  onBriefingStarted,
}) {
  return (
    <motion.div
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-90px" }}
      variants={reducedMotion ? undefined : fadeUp}
      className="w-full max-w-[calc(100vw-2.5rem)] min-w-0 border border-[#d8cdbb] bg-[#f8f3ea] p-6 shadow-[0_28px_90px_rgba(36,35,28,0.08)] md:p-9 lg:max-w-none"
    >
      {sent ? (
        <div className="flex min-h-[520px] flex-col items-start justify-center">
          <CheckCircle2 className="mb-6 h-14 w-14 text-[#8a6e42]" aria-hidden="true" />
          <p className={labelClass}>Briefing recebido</p>
          <h2 className="mt-3 font-heading text-5xl font-medium leading-none text-[#111913]">
            Obrigado. Vamos analisar com cuidado.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#4b5248]">
            A equipe vai revisar as informações e entrar em contato para alinhar os próximos passos.
          </p>
          <Link
            to="/portfolio"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#111913] px-7 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#8a6e42]"
          >
            Ver portfólio
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <p className={labelClass}>Briefing privado</p>
            <h2 className="mt-3 font-heading text-[clamp(2.8rem,5vw,4.8rem)] font-medium leading-[0.92] text-[#111913]">
              Conte sobre o imóvel com calma.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#5f665c]">
              Quanto mais contexto você trouxer, mais precisa será a primeira leitura de potencial, escopo e caminho de projeto.
            </p>
          </div>

          <form className="min-w-0 space-y-5" onSubmit={handleSubmit} onFocusCapture={onBriefingStarted}>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#8f7b55]">
                  Nome completo
                </span>
                <input
                  className={inputClass}
                  placeholder="Seu nome"
                  type="text"
                  required
                  value={form.nome}
                  onChange={(event) => setForm((prev) => ({ ...prev, nome: event.target.value }))}
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#8f7b55]">
                  E-mail
                </span>
                <input
                  className={inputClass}
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
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#8f7b55]">
                  WhatsApp
                </span>
                <input
                  className={inputClass}
                  placeholder="(00) 00000-0000"
                  type="text"
                  value={form.whatsapp}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, whatsapp: event.target.value }))
                  }
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#8f7b55]">
                  Interesse
                </span>
                <select
                  className={inputClass}
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
              <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#8f7b55]">
                Mensagem
              </span>
              <textarea
                className={`${inputClass} min-h-40 resize-none py-4`}
                placeholder="Conte sobre metragem, cidade, fase da obra, uso desejado e referências que você gosta."
                value={form.mensagem}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, mensagem: event.target.value }))
                }
              />
            </label>

            <div className="grid gap-2">
              <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#8f7b55]">
                Anexo opcional
              </span>
              <div
                className="flex w-full min-w-0 cursor-pointer items-center gap-3 overflow-hidden border border-dashed border-[#d3c9b7] bg-transparent px-5 py-4 transition hover:border-[#8f7b55]"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") fileInputRef.current?.click();
                }}
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
                <p className="bg-red-50 p-3 text-xs text-red-700">
                  {arquivoErro}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#111913] px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-[#8a6e42] disabled:cursor-not-allowed disabled:opacity-55"
            >
              {loading ? "Enviando..." : "Solicitar curadoria paisagística"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
}
