import { useState, useEffect } from "react";
import { api } from "@/api/apiService";
import { trackEvent } from "@/lib/tracking";

export default function EmailCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Mostrar popup após 20 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      // Verificar se o usuário já viu o popup (localStorage)
      const popupSeen = localStorage.getItem("emailPopupSeen");
      if (!popupSeen) {
        setIsOpen(true);
      }
    }, 20000); // 20 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Salvar lead
      await api.entities.Leads.create({
        nome,
        email,
        whatsapp: "",
        fonte: "popup_homepage",
        data_captura: new Date().toISOString(),
        status: "novo"
      });

      // Enviar email com lead magnet
      const res = await api.functions.invoke('sendGuiaPaisagismoEmail', {
        nome,
        email,
        whatsapp: "",
      });

      if (res.data && res.data.success) {
        setSent(true);
        trackEvent("lead_magnet_submitted", { source: "popup_homepage" });
        // Marcar como visto por 30 dias
        localStorage.setItem("emailPopupSeen", Date.now().toString());
        
        // Fechar popup após 3 segundos
        setTimeout(() => {
          setIsOpen(false);
          setSent(false);
          setEmail("");
          setNome("");
        }, 3000);
      }
    } catch (err) {
      setError("Erro ao enviar. Tente novamente.");
      trackEvent("lead_magnet_submit_error", { source: "popup_homepage" });
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
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
          {/* Fechar Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 text-2xl z-10"
          >
            ✕
          </button>

          {sent ? (
            // Mensagem de sucesso
            <div className="bg-[#173727] p-16 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d7ae45]/10 to-transparent pointer-events-none" />
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 border border-[#d7ae45]/20">
                <span className="material-symbols-outlined text-4xl text-[#d7ae45]">verified</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 font-serif text-[#d7ae45] relative z-10">Acesso Liberado!</h3>
              <p className="text-white/80 leading-relaxed relative z-10">O material exclusivo foi enviado para o seu e-mail institucional ou pessoal.</p>
            </div>
          ) : (
            // Formulário
            <div className="p-10 md:p-12">
              <div className="mb-8 text-center">
                <span className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-[#d7ae45]">
                  Dossiê Botânico Gratuito
                </span>
                <h2 className="text-3xl font-bold text-[#173727] mt-4 mb-3 font-serif">
                  Guia Prático de Valorização
                </h2>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Descubra os princípios de arquitetura externa que utilizamos para elevar o patrimônio de imóveis em até 30%.
                </p>
              </div>

              {/* Benefícios Mini */}
              <div className="bg-stone-50 rounded-2xl p-6 mb-8 space-y-3 border border-stone-100">
                <p className="text-xs text-stone-600 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#d7ae45] text-sm">check_circle</span>
                  Checklist premium para briefing
                </p>
                <p className="text-xs text-stone-600 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#d7ae45] text-sm">check_circle</span>
                  Diretrizes de valorização visual
                </p>
                <p className="text-xs text-stone-600 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#d7ae45] text-sm">check_circle</span>
                  Ideias para jardins, fachadas e áreas gourmet
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome Completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-stone-50 rounded-xl border border-stone-200 text-sm focus:border-[#d7ae45] focus:bg-white transition-colors outline-none"
                />
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-stone-50 rounded-xl border border-stone-200 text-sm focus:border-[#d7ae45] focus:bg-white transition-colors outline-none"
                />

                {error && (
                  <p className="text-xs text-red-600 bg-red-50 p-3 rounded-lg font-semibold">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-[#d7ae45] text-[#173727] font-extrabold rounded-xl hover:bg-[#173727] hover:text-[#d7ae45] transition-all disabled:opacity-50 text-[10px] uppercase tracking-[0.2em] shadow-lg mt-2"
                >
                  {loading ? "Processando envio..." : "Acessar Dossiê"}
                </button>

                <p className="text-[9px] uppercase tracking-widest text-center text-stone-400 mt-4">
                  Política de Privacidade Rigorosa
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
