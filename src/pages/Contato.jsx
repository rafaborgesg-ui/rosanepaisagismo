import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/apiService";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import { useLandingContent } from "@/hooks/useLandingContent";

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

    try {
      let arquivo_url = null;
      let arquivo_nome = null;

      // Upload arquivo se existir
      if (arquivo) {
        const uploadRes = await api.integrations.Core.UploadFile({ file: arquivo });
        arquivo_url = uploadRes.file_url;
        arquivo_nome = arquivo.name;
      }

      // Enviar email
      const res = await api.functions.invoke('sendContactFormEmail', {
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
      }
    } catch (error) {
      setArquivoErro(error.message || "Erro ao enviar mensagem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Work+Sans:wght@300;400;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }
        .font-serif-custom { font-family: 'Noto Serif', serif; }
        .font-sans-custom { font-family: 'Work Sans', sans-serif; }
        .form-shadow { box-shadow: 0 8px 40px rgba(0,0,0,0.06); }
      `}</style>

      <SiteNav activeLink="contato" />

      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto font-sans-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#c09624] font-bold block">Atendimento Premium</span>
              <h1 className="font-serif-custom text-4xl md:text-6xl text-[#1a3d2b] italic leading-[1.1]">
                Vamos criar seu <br />
                <span className="font-bold not-italic">jardim exclusivo</span>
              </h1>
              <p className="text-stone-500 max-w-md">
                Cada projeto é único. Conte-nos sobre sua visão e transformaremos seu espaço em uma obra de arte viva.
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-stone-100 shadow-sm">
                  <span className="material-symbols-outlined text-[#c09624]">mail</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">E-mail Direct</p>
                  <a href="mailto:rosanepaisagismo@gmail.com" className="text-[#c09624] font-semibold hover:underline">
                    rosanepaisagismo@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-stone-100 shadow-sm">
                  <span className="material-symbols-outlined text-[#c09624]">location_on</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Headquarters</p>
                  <p className="text-[#1a3d2b] font-semibold">São Paulo - SP | Montes Claros - MG | Atendimento Nacional</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-stone-100 shadow-sm">
                  <span className="material-symbols-outlined text-[#c09624]">phone</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">WhatsApp</p>
                  <a href={`https://wa.me/${whatsappNumero}`} className="text-[#c09624] font-semibold hover:underline">
                   {whatsappNumero}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-stone-100 form-shadow">
            {sent ? (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-5xl text-[#276a4d] mb-4 block">check_circle</span>
                <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-3">Mensagem enviada!</h2>
                <p className="text-stone-500">Entraremos em contato em breve.</p>
              </div>
            ) : (
              <>
                <h2 className="font-serif-custom text-2xl text-[#1a3d2b] mb-8">Receba uma Consultoria Personalizada</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block ml-1">Nome Completo</label>
                      <input
                        className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#276a4d]/20 outline-none text-sm placeholder:text-stone-300"
                        placeholder="Seu nome aqui"
                        type="text"
                        required
                        value={form.nome}
                        onChange={e => setForm(p => ({ ...p, nome: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block ml-1">E-mail</label>
                      <input
                        className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#276a4d]/20 outline-none text-sm placeholder:text-stone-300"
                        placeholder="seu@email.com"
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block ml-1">WhatsApp</label>
                    <input
                      className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#276a4d]/20 outline-none text-sm placeholder:text-stone-300"
                      placeholder="(00) 00000-0000"
                      type="text"
                      value={form.whatsapp}
                      onChange={e => setForm(p => ({ ...p, whatsapp: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block ml-1">Interesse</label>
                    <select
                      className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#c09624]/20 outline-none text-sm appearance-none"
                      value={form.interesse}
                      onChange={e => setForm(p => ({ ...p, interesse: e.target.value }))}
                    >
                      <option>Projeto de Paisagismo</option>
                      <option>Paisagismo Residencial Premium</option>
                      <option>Áreas Gourmet & Piscinas</option>
                      <option>Paisagismo para Clínicas</option>
                      <option>Consultoria Técnica</option>
                      <option>Implantação e Obra</option>
                      <option>Outros</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block ml-1">Mensagem</label>
                    <textarea
                      className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#276a4d]/20 outline-none text-sm placeholder:text-stone-300 resize-none"
                      placeholder="Conte-nos um pouco sobre seu projeto..."
                      rows={4}
                      value={form.mensagem}
                      onChange={e => setForm(p => ({ ...p, mensagem: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block ml-1">Anexar Arquivo <span className="normal-case tracking-normal text-stone-300 font-normal">(opcional, máx. 5 MB)</span></label>
                    <div
                      className="w-full bg-stone-50 rounded-xl px-4 py-4 border-2 border-dashed border-stone-200 hover:border-[#276a4d]/40 transition-colors cursor-pointer flex items-center gap-3"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span className="material-symbols-outlined text-stone-400 text-[20px]">attach_file</span>
                      <span className="text-sm text-stone-400 flex-1 truncate">
                        {arquivo ? arquivo.name : "Clique para selecionar um arquivo"}
                      </span>
                      {arquivo && (
                        <button
                          type="button"
                          className="text-stone-400 hover:text-red-500 transition-colors"
                          onClick={e => { e.stopPropagation(); setArquivo(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      )}
                    </div>
                    <input ref={fileInputRef} type="file" className="hidden" onChange={handleArquivo} />
                    {arquivoErro && <p className="text-xs text-red-500 ml-1">{arquivoErro}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#c09624] text-white py-4 rounded-full text-[12px] uppercase tracking-[0.2em] font-bold shadow-lg shadow-[#c09624]/20 hover:bg-[#a07d1f] transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Enviando..." : "Receber Consultoria"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />

      <WhatsAppFloat />
    </div>
  );
}
