import { useState, useEffect } from "react";
import { api } from "@/api/apiService";

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
            <div className="bg-gradient-to-br from-[#c09624] to-[#1a3d2b] p-12 text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl">check</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Guia enviado! 🎉</h3>
              <p className="text-white/90">Verifique seu email em 1 minuto.</p>
            </div>
          ) : (
            // Formulário
            <div className="p-8">
              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#c09624]">
                  Oferta Especial
                </span>
                <h2 className="text-2xl font-bold text-[#1a3d2b] mt-2 mb-2">
                  Guia Premium Grátis
                </h2>
                <p className="text-sm text-stone-600">
                  "Como Valorizar Seu Imóvel em até 30% com Paisagismo"
                </p>
              </div>

              {/* Benefícios Mini */}
              <div className="bg-[#f9f9f9] rounded-lg p-4 mb-6 space-y-2">
                <p className="text-xs text-stone-600">
                  ✓ 50 páginas com plantas e orçamentos
                </p>
                <p className="text-xs text-stone-600">
                  ✓ 5 case studies de valorização
                </p>
                <p className="text-xs text-stone-600">
                  ✓ 3 aulas exclusivas por email
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 text-sm focus:border-[#c09624] focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 text-sm focus:border-[#c09624] focus:outline-none"
                />

                {error && (
                  <p className="text-xs text-red-600 bg-red-50 p-2 rounded">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#c09624] text-white font-bold rounded-lg hover:bg-[#1a3d2b] transition-all disabled:opacity-50 text-sm uppercase tracking-wider"
                >
                  {loading ? "Enviando..." : "Receber Guia Agora"}
                </button>

                <p className="text-xs text-center text-stone-400">
                  Sem spam. Você pode sair quando quiser.
                </p>
              </form>

              {/* Urgência */}
              <div className="mt-6 pt-6 border-t border-stone-200 text-center">
                <p className="text-xs text-stone-500">
                  ⏰ <strong>Oferta limitada:</strong> Apenas 100 primeiros
                </p>
                <p className="text-xs text-[#c09624] font-bold mt-1">
                  Vagas: 87 disponíveis
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
