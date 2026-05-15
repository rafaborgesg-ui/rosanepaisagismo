import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { api } from "@/api/apiService";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import MobileConciergeBar from "@/components/landing/home/MobileConciergeBar";
import ContactHero from "@/components/landing/contact/ContactHero";
import ContactSidebar from "@/components/landing/contact/ContactSidebar";
import ContactFormCard from "@/components/landing/contact/ContactFormCard";
import { useLandingContent } from "@/hooks/useLandingContent";
import SEO from "@/components/seo/SEO";

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
        title="Contato | Avaliação de Projeto de Paisagismo"
        description="Solicite atendimento para projetos exclusivos de jardins, piscinas, áreas gourmet, jardins verticais, clínicas e residências de alto padrão."
        keywords="contato paisagista, avaliação de projeto paisagismo, projeto de jardim premium, paisagismo alto padrão"
        url="https://rosanepaisagismo-site.vercel.app/contato"
      />
      <SiteNav activeLink="contato" />

      <main>
        <ContactHero
          reducedMotion={Boolean(reducedMotion)}
          whatsappNumero={whatsappNumero}
          whatsappMessage={whatsappMessage}
        />

        <section id="briefing" className="px-4 py-20 md:py-28">
          <div className="mx-auto grid w-[min(100%,1180px)] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <ContactSidebar
              reducedMotion={Boolean(reducedMotion)}
              whatsappMessage={whatsappMessage}
            />
            <ContactFormCard
              reducedMotion={Boolean(reducedMotion)}
              sent={sent}
              loading={loading}
              form={form}
              setForm={setForm}
              arquivo={arquivo}
              setArquivo={setArquivo}
              arquivoErro={arquivoErro}
              fileInputRef={fileInputRef}
              handleArquivo={handleArquivo}
              handleSubmit={handleSubmit}
            />
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat hideOnMobile />
      <MobileConciergeBar href="#briefing" label="Ir para briefing" />
    </div>
  );
}
