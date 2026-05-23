import { useState, useEffect } from "react";
import { api } from "@/api/apiService";
import { useAuth } from "@/lib/AuthContext";
import { auth } from "@/api/authService";
import { Save, Upload, ExternalLink, LogIn, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import LogoSizeControl from "@/components/admin/LogoSizeControl";

const ALLOWED_EMAILS = ["rafaborgesg@gmail.com", "rosanepaisagismo@gmail.com", "rosanebm6@gmail.com"];

const DEFAULT = {
  logo_topo_url: "",
  logo_topo_size: 100,
  logo_rodape_url: "",
  logo_rodape_size: 100,
  slides: [
    { titulo: "Jardim Vertical Denso", subtitulo: "Portfólio Residencial", imagem_url: "https://lh3.googleusercontent.com/aida/ADBb0uiaBmILFB-BysvJyMy2ydZFI7yDG9Bhh50qPIIk37kPOTk1Pf821KJ6yqN-CxT6dxmjw9IuIkiOLc0miWdTe-SJ537aBXvVXiNXrj2ERPzMMrZxyPyqbe-7uiQdN7Cxa9o2NdPx7ZAb4MKoDe2YEgLpq3ikjnKTXfiyygwnfBVIcKPLe8C_lcjs4Z6hygLzs9hD29dCq9O7j7QDyfZch0ZPNrm12AFl-Vrb_Fu4cQdathR0A5ZKdDGYDXl_mX-j4Lse2C1rC1WUmg" },
    { titulo: "Área Gourmet & Ducha", subtitulo: "Arquitetura Corporativa", imagem_url: "https://lh3.googleusercontent.com/aida/ADBb0ujIzHVJeBFO5ARgM6ukrxNjM_pyTsFpWpiPM5wrWU-wOtM1usS2uuRitt05LdZ7Wi-dd8ZyeP05Bb2Pjak5KwzSwoaMASG1kOKrrbOHkCXbz4mtWcgNl-uufCWBfw4kzo4RIy4B1dlRnqR33dkqK2_VBpvdoDUuEKffoTfdq7Bb3yPu737CXvVox82-SPuRG_ZiegsqpfCMcIapjP-Cpl8vPyp7lmvsR5y-lTQt4-vI6P6iKPNregLmPaR7R_CaW4CDzGQMRaicWw" }
  ],
  sobre_titulo: "Dra. Rosane Borges",
  sobre_cargo: "Fundadora & Diretora Criativa",
  sobre_frase: "Onde a ciência da ecologia urbana encontra a sofisticação do design exclusivo.",
  sobre_texto: "Com Doutorado em Arquitetura Paisagística e uma trajetória de mais de 500 projetos autorais, Dra. Rosane redefine o conceito de luxo sustentável.",
  sobre_imagem_url: "https://lh3.googleusercontent.com/aida/ADBb0ug_AP5fC36sjt5bRKzseIc7AbvVa2OITKvy2HiEjBT4wFsd-LXpYMmo6R-SxlhiBZqJMlDFaov4x6SCky3OvL9wY0uIkgK5ESbhRbuly3_r5OSWVcP8fMS893SFzzw9W4cMVztFRaw_Xzba-cuygUforxrEFaq4ltncWwamsa1HamO6RQghAlajzxFTeTLsRGz5-oJafgYhVBKdTW56-vD9uWw_Bs4hxGdoqQO0NcpwfGVI7vbmJydaUYOZrOuThQuh1sou3RvT",
  servico1_titulo: "Projeto de Paisagismo", servico1_desc: "Conceito completo em 3D, do estudo preliminar ao executivo.",
  servico2_titulo: "Consultoria Técnica", servico2_desc: "Escolha de espécies e melhorias pontuais no seu ambiente.",
  servico3_titulo: "Implantação de Paisagismo", servico3_desc: "Gestão total da execução, garantindo rigor e sofisticação.",
  portfolio_items: [
    { titulo: "Jardim Vertical Preservado", imagem_url: "https://lh3.googleusercontent.com/aida/ADBb0ugYdpa-dtlauELaJsewHWxU1zLj-LzbsScFtGjNIp2e4S2a122-xYxoaUgnTh5B9carsJ6S14EOwFfHm3RRLnoRGX7HfQ38y-h9GLQZYSjvCU6QQrqgHcb0y-M9BIm7hocVugM6fQFTJ_4VKkU-LVWfbSxAXAUFFBzCc4cal7zRb7oWMWqmFscFLI6wyqcuDErTc6D2E0dr7JvBKMMzgjKeYdmnU-lidWiRfSbqP9Z0q65yipQwBUomr9CFyk3cJ3GfFjT2itKxgA" },
    { titulo: "Jardim Artificial", imagem_url: "https://lh3.googleusercontent.com/aida/ADBb0ujIzHVJeBFO5ARgM6ukrxNjM_pyTsFpWpiPM5wrWU-wOtM1usS2uuRitt05LdZ7Wi-dd8ZyeP05Bb2Pjak5KwzSwoaMASG1kOKrrbOHkCXbz4mtWcgNl-uufCWBfw4kzo4RIy4B1dlRnqR33dkqK2_VBpvdoDUuEKffoTfdq7Bb3yPu737CXvVox82-SPuRG_ZiegsqpfCMcIapjP-Cpl8vPyp7lmvsR5y-lTQt4-vI6P6iKPNregLmPaR7R_CaW4CDzGQMRaicWw" },
    { titulo: "Jardim de Mugo", imagem_url: "https://lh3.googleusercontent.com/aida/ADBb0ug_AP5fC36sjt5bRKzseIc7AbvVa2OITKvy2HiEjBT4wFsd-LXpYMmo6R-SxlhiBZqJMlDFaov4x6SCky3OvL9wY0uIkgK5ESbhRbuly3_r5OSWVcP8fMS893SFzzw9W4cMVztFRaw_Xzba-cuygUforxrEFaq4ltncWwamsa1HamO6RQghAlajzxFTeTLsRGz5-oJafgYhVBKdTW56-vD9uWw_Bs4hxGdoqQO0NcpwfGVI7vbmJydaUYOZrOuThQuh1sou3RvT" },
    { titulo: "Área Gourmet", imagem_url: "https://lh3.googleusercontent.com/aida/ADBb0uiaBmILFB-BysvJyMy2ydZFI7yDG9Bhh50qPIIk37kPOTk1Pf821KJ6yqN-CxT6dxmjw9IuIkiOLc0miWdTe-SJ537aBXvVXiNXrj2ERPzMMrZxyPyqbe-7uiQdN7Cxa9o2NdPx7ZAb4MKoDe2YEgLpq3ikjnKTXfiyygwnfBVIcKPLe8C_lcjs4Z6hygLzs9hD29dCq9O7j7QDyfZch0ZPNrm12AFl-Vrb_Fu4cQdathR0A5ZKdDGYDXl_mX-j4Lse2C1rC1WUmg" }
  ],
  whatsapp_numero: "5538991234567",
  email_contato: "rosanepaisagismo@gmail.com",
};

function LogoUploadField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const res = await api.integrations.Core.UploadFile({ file });
    onChange(res.file_url);
    setUploading(false);
  };
  return (
    <div className="space-y-2">
      <Label className="text-xs font-bold uppercase tracking-wider text-stone-500">{label}</Label>
      <div className="flex gap-3 items-center p-4 bg-stone-50 rounded-xl border border-stone-100">
        {value ? (
          <img src={value} alt="logo" className="h-12 max-w-[120px] object-contain rounded border border-stone-200 bg-white p-1 flex-shrink-0" />
        ) : (
          <div className="h-12 w-24 rounded border-2 border-dashed border-stone-200 flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] text-stone-300 font-bold uppercase">Sem logo</span>
          </div>
        )}
        <label className="flex-1 flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-[#276a4d]/30 rounded-lg p-4 hover:bg-[#276a4d]/5 transition-colors">
          <Upload className="w-5 h-5 text-[#276a4d]" />
          <span className="text-xs text-[#276a4d] font-bold">{uploading ? "Enviando..." : "Clique para fazer upload"}</span>
          <span className="text-[10px] text-stone-400">PNG, JPG ou SVG recomendado</span>
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
        </label>
      </div>
      {value && (
        <button onClick={() => onChange("")} className="text-[11px] text-red-400 hover:text-red-600 font-semibold">
          Remover logo
        </button>
      )}
    </div>
  );
}

function ImageUploadField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const res = await api.integrations.Core.UploadFile({ file });
    onChange(res.file_url);
    setUploading(false);
  };
  return (
    <div className="space-y-2">
      <Label className="text-xs font-bold uppercase tracking-wider text-stone-500">{label}</Label>
      <div className="flex gap-3 items-start">
        {value && <img src={value} alt="" className="w-20 h-20 rounded-lg object-cover border border-stone-200 flex-shrink-0" />}
        <div className="flex-1 space-y-2">
          <Input value={value} onChange={e => onChange(e.target.value)} placeholder="URL da imagem" className="text-sm" />
          <label className="flex items-center gap-2 cursor-pointer text-xs text-[#276a4d] font-semibold hover:underline">
            <Upload className="w-3.5 h-3.5" />
            {uploading ? "Enviando..." : "Ou fazer upload"}
            <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 space-y-5">
      <h2 className="font-semibold text-[#1a3d2b] text-base border-b border-stone-100 pb-3">{title}</h2>
      {children}
    </div>
  );
}

// Access gate for non-authenticated or wrong email
function AccessGate() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl border border-stone-100 shadow-lg p-10 max-w-sm w-full text-center space-y-6">
        <div className="w-16 h-16 bg-[#276a4d]/10 rounded-2xl flex items-center justify-center mx-auto">
          <LogIn className="w-8 h-8 text-[#276a4d]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#1a3d2b] mb-2">Acesso Restrito</h1>
          <p className="text-stone-500 text-sm leading-relaxed">
            Este painel é exclusivo para o e-mail:<br />
            <span className="font-bold text-[#276a4d]">{ALLOWED_EMAILS.join(", ")}</span>
          </p>
        </div>
        <Button
          onClick={() => auth.redirectToLogin()}
          className="w-full bg-[#1a3d2b] hover:bg-[#276a4d] text-white rounded-full py-3 font-bold"
        >
          Fazer Login
        </Button>
      </div>
    </div>
  );
}

export default function AdminLanding() {
  const { user, isAuthenticated, isLoadingAuth } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState(DEFAULT);
  const [recordId, setRecordId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const isAllowed = isAuthenticated && ALLOWED_EMAILS.includes(user?.email);

  useEffect(() => {
    if (isLoadingAuth) return;
    if (!isAllowed) { setLoading(false); return; }
    api.entities.LandingContent.list().then((records) => {
      if (records.length > 0) {
        setForm({ ...DEFAULT, ...records[0] });
        setRecordId(records[0].id);
      }
      setLoading(false);
    });
  }, [isAllowed, isLoadingAuth]);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    if (recordId) {
      await api.entities.LandingContent.update(recordId, form);
    } else {
      const rec = await api.entities.LandingContent.create(form);
      setRecordId(rec.id);
    }
    setSaving(false);
    toast({ title: "Alterações publicadas!", description: "A página inicial foi atualizada com sucesso." });
  };

  if (isLoadingAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-[#276a4d] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAllowed) return <AccessGate />;

  const handleAddSlide = () => {
    update("slides", [...(form.slides || []), { titulo: "", subtitulo: "", imagem_url: "" }]);
  };

  const handleRemoveSlide = (idx) => {
    update("slides", form.slides.filter((_, i) => i !== idx));
  };

  const handleUpdateSlide = (idx, field, value) => {
    const newSlides = [...form.slides];
    newSlides[idx] = { ...newSlides[idx], [field]: value };
    update("slides", newSlides);
  };

  const handleAddPortfolioItem = () => {
    update("portfolio_items", [...(form.portfolio_items || []), { titulo: "", imagem_url: "" }]);
  };

  const handleRemovePortfolioItem = (idx) => {
    update("portfolio_items", form.portfolio_items.filter((_, i) => i !== idx));
  };

  const handleUpdatePortfolioItem = (idx, field, value) => {
    const newItems = [...form.portfolio_items];
    newItems[idx] = { ...newItems[idx], [field]: value };
    update("portfolio_items", newItems);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&family=Work+Sans:wght@400;500;600;700&display=swap'); body{font-family:'Work Sans',sans-serif;}`}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-stone-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-lg font-bold text-[#1a3d2b]" style={{fontFamily:"'Noto Serif',serif"}}>Painel de Administração</h1>
          <p className="text-xs text-stone-400">{user?.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-stone-500 hover:text-[#276a4d] font-semibold transition-colors">
            <ExternalLink className="w-4 h-4" />
            Ver Site
          </a>
          <Button onClick={handleSave} disabled={saving} className="bg-[#1a3d2b] hover:bg-[#276a4d] text-white rounded-full px-6 text-sm font-bold flex items-center gap-2">
            <Save className="w-4 h-4" />
            {saving ? "Publicando..." : "Publicar Alterações"}
          </Button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Logos */}
        <Section title="Identidade Visual / Logo">
          <LogoUploadField label="Logo Topo (Navbar)" value={form.logo_topo_url} onChange={v => update("logo_topo_url", v)} />
          <LogoSizeControl label="Tamanho Logo Topo" value={form.logo_topo_size} onChange={v => update("logo_topo_size", v)} />
          <LogoUploadField label="Logo Rodapé" value={form.logo_rodape_url} onChange={v => update("logo_rodape_url", v)} />
          <LogoSizeControl label="Tamanho Logo Rodapé" value={form.logo_rodape_size} onChange={v => update("logo_rodape_size", v)} />
        </Section>

        {/* Hero Slides */}
        <Section title="Destaque Principal / Portfólio Selecionado (Slideshow)">
          <p className="text-xs text-stone-400 -mt-2">As fotos abaixo aparecem em carrossel com transição automática a cada 5 segundos na página inicial. Adicione quantos slides desejar.</p>
          <div className="space-y-4">
            {(form.slides || []).map((slide, idx) => (
              <div key={idx} className="p-4 bg-stone-50 rounded-xl border border-stone-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Slide {idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSlide(idx)}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 font-semibold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Excluir
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-stone-400">Título</Label>
                    <Input className="mt-1 text-sm" value={slide.titulo || ""} onChange={e => handleUpdateSlide(idx, "titulo", e.target.value)} placeholder="Título do slide" />
                  </div>
                  <div>
                    <Label className="text-xs text-stone-400">Subtítulo</Label>
                    <Input className="mt-1 text-sm" value={slide.subtitulo || ""} onChange={e => handleUpdateSlide(idx, "subtitulo", e.target.value)} placeholder="Ex: Portfólio Residencial" />
                  </div>
                </div>
                <ImageUploadField label="Foto do Slide" value={slide.imagem_url || ""} onChange={v => handleUpdateSlide(idx, "imagem_url", v)} />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSlide}
              className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-[#276a4d]/30 rounded-xl text-sm font-bold text-[#276a4d] hover:bg-[#276a4d]/5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Adicionar Slide
            </button>
          </div>
        </Section>

        {/* Apresentação Dra. Rosane */}
        <Section title="Apresentação Dra. Rosane">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-bold uppercase tracking-wider text-stone-500">Nome Título</Label>
              <Input className="mt-1" value={form.sobre_titulo} onChange={e => update("sobre_titulo", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-wider text-stone-500">Cargo</Label>
              <Input className="mt-1" value={form.sobre_cargo} onChange={e => update("sobre_cargo", e.target.value)} />
            </div>
          </div>
          <div>
            <Label className="text-xs font-bold uppercase tracking-wider text-stone-500">Frase em destaque</Label>
            <Input className="mt-1" value={form.sobre_frase} onChange={e => update("sobre_frase", e.target.value)} />
          </div>
          <div>
            <Label className="text-xs font-bold uppercase tracking-wider text-stone-500">Texto</Label>
            <Textarea className="mt-1" rows={3} value={form.sobre_texto} onChange={e => update("sobre_texto", e.target.value)} />
          </div>
          <ImageUploadField label="Foto da Dra. Rosane" value={form.sobre_imagem_url} onChange={v => update("sobre_imagem_url", v)} />
        </Section>

        {/* Serviços */}
        <Section title="Nosso Expertise / Serviços">
          <div className="space-y-4">
            {[1, 2, 3].map(n => (
              <div key={n} className="p-4 bg-stone-50 rounded-xl border border-stone-100 space-y-3">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Serviço {n}</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-stone-400">Título</Label>
                    <Input className="mt-1 text-sm" value={form[`servico${n}_titulo`]} onChange={e => update(`servico${n}_titulo`, e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-xs text-stone-400">Descrição</Label>
                    <Input className="mt-1 text-sm" value={form[`servico${n}_desc`]} onChange={e => update(`servico${n}_desc`, e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Grid Portfólio */}
        <Section title="Grid de Projetos / Destaque">
          <div className="space-y-4">
            {(form.portfolio_items || []).map((item, idx) => (
              <div key={idx} className="space-y-2 p-4 bg-stone-50 rounded-xl border border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-stone-500">Projeto {idx + 1}</Label>
                  <button
                    type="button"
                    onClick={() => handleRemovePortfolioItem(idx)}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 font-semibold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Excluir
                  </button>
                </div>
                {item.imagem_url && (
                  <img src={item.imagem_url} alt="" className="w-full h-24 rounded-lg object-cover border border-stone-200" />
                )}
                <Input placeholder="Título do projeto" className="text-sm" value={item.titulo} onChange={e => handleUpdatePortfolioItem(idx, "titulo", e.target.value)} />
                <Input placeholder="URL da imagem" className="text-sm" value={item.imagem_url} onChange={e => handleUpdatePortfolioItem(idx, "imagem_url", e.target.value)} />
                <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-[#276a4d] font-semibold hover:underline">
                  <Upload className="w-3 h-3" /> Upload foto
                  <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const res = await api.integrations.Core.UploadFile({ file });
                    handleUpdatePortfolioItem(idx, "imagem_url", res.file_url);
                  }} />
                </label>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddPortfolioItem}
              className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-[#276a4d]/30 rounded-xl text-sm font-bold text-[#276a4d] hover:bg-[#276a4d]/5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Adicionar Projeto
            </button>
          </div>
        </Section>

        {/* Contato */}
        <Section title="Contato">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-bold uppercase tracking-wider text-stone-500">WhatsApp (número)</Label>
              <Input className="mt-1" value={form.whatsapp_numero} onChange={e => update("whatsapp_numero", e.target.value)} placeholder="5538999999999" />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-wider text-stone-500">E-mail de contato</Label>
              <Input className="mt-1" value={form.email_contato} onChange={e => update("email_contato", e.target.value)} />
            </div>
          </div>
        </Section>

        <div className="sticky bottom-4 pb-4">
          <Button onClick={handleSave} disabled={saving} className="w-full bg-[#1a3d2b] hover:bg-[#276a4d] text-white rounded-full py-5 text-base font-bold shadow-2xl">
            {saving ? "Publicando..." : "Publicar Todas as Alterações"}
          </Button>
        </div>
      </div>
    </div>
  );
}
