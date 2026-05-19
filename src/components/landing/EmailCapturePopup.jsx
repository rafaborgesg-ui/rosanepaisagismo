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

    // Aparecer após 20 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            const popupSeen = localStorage.getItem("emailPopupSeen");
            if (!popupSeen) {
                setIsOpen(true);
            }
        }, 20000);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

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

            // Enviar email
            const res = await api.functions.invoke('sendGuiaPaisagismoEmail', {
                nome,
                email,
                whatsapp: "", 
            });

            if (res.data && res.data.success) {
                setSent(true);
                localStorage.setItem("emailPopupSeen", Date.now().toString());
                trackEvent("lead_magnet_submitted", { source: "popup_homepage" }); 

                setTimeout(() => {
                    setIsOpen(false);
                    setSent(false);
                    setEmail("");
                    setNome("");
                }, 4000);
            } else {
                setError("Erro ao enviar o guia. Tente novamente.");
                trackEvent("lead_magnet_submit_error", { source: "popup_homepage", message: "Email function failed" }); 
            }
        } catch (err) {
            console.error("Erro ao enviar lead ou email:", err);
            setError("Erro ao enviar. Verifique sua conexão e tente novamente.");
            trackEvent("lead_magnet_submit_error", { source: "popup_homepage", message: err.message }); 
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
                className="fixed inset-0 bg-[#0a100c]/80 backdrop-blur-md z-40 transition-opacity duration-700 animate-fade-in-slow"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                <div 
                  className="pointer-events-auto relative max-w-[440px] w-full overflow-hidden transform transition-all duration-700 scale-95 opacity-0 animate-scale-in rb-glass-dark border border-white/10 rounded-sm shadow-[0_24px_80px_rgba(0,0,0,0.6)]" 
                  style={{ animationFillMode: 'forwards' }}
                >
                    {/* Botão Fechar - Minimalista */}
                    <button
                        onClick={handleClose}
                        className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors duration-300 z-10 p-2"
                        aria-label="Fechar"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    {sent ? (
                        // Sucesso - Elegante
                        <div className="px-10 py-16 text-center text-white relative">
                            {/* Decorative Line */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] rb-luxury-hairline-gold" />
                            
                            <div className="mx-auto w-12 h-12 mb-6 rounded-full border border-[#d3b473]/30 flex items-center justify-center bg-[#d3b473]/10">
                                <svg className="w-5 h-5 text-[#d3b473]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 className="font-heading text-3xl mb-4 font-medium text-white tracking-tight">Acesso Concedido</h3>
                            <p className="text-sm leading-relaxed text-white/60 mb-8 max-w-[280px] mx-auto font-light">
                                O guia foi enviado para o seu e-mail. Verifique sua caixa de entrada para iniciar a leitura.
                            </p>
                            <button onClick={handleClose} className="px-8 py-3 bg-white text-[#0a100c] rounded-full font-bold text-[0.68rem] uppercase tracking-[0.14em] hover:bg-[#f5e6c8] transition-colors duration-300 w-full group">
                                Voltar ao site
                            </button>
                        </div>
                    ) : (
                        // Formulário Premium
                        <div className="p-10 relative">
                            {/* Decorative Line */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] rb-luxury-hairline-gold" />
                            
                            <div className="text-center mb-8 pt-2">
                                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#d3b473] mb-4">
                                    Acesso Exclusivo
                                </p>
                                <h3 className="font-heading text-3xl text-white mb-3 leading-tight">
                                    O Guia do Paisagismo de Alto Padrão
                                </h3>
                                <p className="text-sm text-white/60 font-light leading-relaxed">
                                    Descubra como valorizar sua arquitetura através de uma curadoria botânica impecável e técnica.
                                </p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="popup-nome" className="sr-only">Seu Nome</label>
                                    <input
                                        type="text"
                                        id="popup-nome"
                                        className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-[#d3b473]/50 focus:bg-white/10 text-white placeholder:text-white/30 text-sm font-light transition-all duration-300"
                                        placeholder="Nome completo"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="popup-email" className="sr-only">E-mail corporativo ou pessoal</label>
                                    <input
                                        type="email"
                                        id="popup-email"
                                        className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-[#d3b473]/50 focus:bg-white/10 text-white placeholder:text-white/30 text-sm font-light transition-all duration-300"
                                        placeholder="Seu melhor e-mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                                <button
                                    type="submit"
                                    className="relative w-full overflow-hidden px-6 py-4 bg-[#1e2d22] border border-white/10 text-white rounded-md font-semibold text-[0.68rem] uppercase tracking-[0.16em] hover:bg-[#d3b473] hover:text-[#0a100c] hover:border-transparent transition-all duration-500 group mt-2"
                                    disabled={loading}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {loading ? "Processando..." : "Receber Guia Gratuitamente"}
                                    </span>
                                </button>
                                <p className="text-center text-[0.65rem] text-white/30 mt-4">
                                    Suas informações estão seguras conosco.
                                </p>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}