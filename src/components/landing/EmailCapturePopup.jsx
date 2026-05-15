import { useEffect, useState } from "react";
import { Check, Download, X } from "lucide-react";
import { api } from "@/api/apiService";

export default function EmailCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const popupSeen = localStorage.getItem("emailPopupSeen");
      if (!popupSeen) setIsOpen(true);
    }, 22000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.entities.Leads.create({
        nome,
        email,
        whatsapp: "",
        fonte: "popup_homepage",
        data_captura: new Date().toISOString(),
        status: "novo",
      });

      const res = await api.functions.invoke("sendGuiaPaisagismoEmail", {
        nome,
        email,
        whatsapp: "",
      });

      if (res.data?.success) {
        setSent(true);
        localStorage.setItem("emailPopupSeen", Date.now().toString());
        setTimeout(() => {
          setIsOpen(false);
          setSent(false);
          setEmail("");
          setNome("");
        }, 2800);
      }
    } catch (err) {
      setError("Não foi possível enviar agora. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("emailPopupSeen", Date.now().toString());
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-[#10120e]/62 backdrop-blur-sm" onClick={handleClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative grid w-full max-w-3xl overflow-hidden rounded-[8px] bg-white shadow-[0_35px_120px_rgba(23,25,20,0.35)] md:grid-cols-[0.95fr_1.05fr]">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-[#171914] shadow-sm transition hover:bg-[#f0eee6]"
            aria-label="Fechar"
            type="button"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="hidden bg-[#171914] md:block">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=88&w=900"
              alt=""
              className="h-full min-h-[520px] w-full object-cover opacity-88"
            />
          </div>

          {sent ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center p-10 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#171914] text-white">
                <Check className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-3xl font-medium tracking-normal text-[#171914]">
                Guia enviado.
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-[#5f665c]">
                Confira sua caixa de entrada em alguns minutos.
              </p>
            </div>
          ) : (
            <div className="p-8 md:p-10">
              <Download className="mb-7 h-7 w-7 text-[#8f7b55]" aria-hidden="true" />
              <p className="mb-3 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[#8f7b55]">
                Curadoria premium
              </p>
              <h2 className="font-heading text-3xl font-medium leading-tight tracking-normal text-[#171914]">
                Guia para valorizar áreas externas.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#5f665c]">
                Receba uma leitura objetiva sobre decisões que tornam jardins, piscinas e
                áreas gourmet mais sofisticados, funcionais e valorizados.
              </p>

              <div className="my-7 grid gap-3 rounded-[8px] bg-[#f8f6f2] p-5 text-sm text-[#4d534b]">
                <p>Seleção botânica e baixa manutenção</p>
                <p>Iluminação, circulação e permanência</p>
                <p>Erros que reduzem percepção de luxo</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  required
                  className="w-full rounded-[8px] border border-[#dfd9cc] bg-white px-5 py-3 text-sm outline-none transition focus:border-[#8f7b55] focus:ring-4 focus:ring-[#8f7b55]/10"
                />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-[8px] border border-[#dfd9cc] bg-white px-5 py-3 text-sm outline-none transition focus:border-[#8f7b55] focus:ring-4 focus:ring-[#8f7b55]/10"
                />

                {error && <p className="rounded-[8px] bg-red-50 p-3 text-xs text-red-700">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#171914] px-6 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#6f7b5f] disabled:cursor-not-allowed disabled:opacity-55"
                >
                  {loading ? "Enviando..." : "Receber guia premium"}
                </button>

                <p className="text-center text-xs leading-5 text-[#858b80]">
                  Sem spam. Apenas conteúdo útil para projetos de alto padrão.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
