import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";
import { motion } from "framer-motion";

const products = [
  {
    title: "Kit Profissional do Paisagista Lucrativo",
    price: "R$ 47",
    original: "R$ 97",
    description: "Modelos para organizar briefing, proposta, cronograma e manutenção com apresentação mais profissional.",
    items: ["Briefing detalhado", "Proposta comercial editável", "Cronograma de execução", "Tabela de manutenção"],
    link: "https://pay.kiwify.com.br/mnciAVd",
  },
  {
    title: "Kit Contratos Blindados para Paisagistas",
    price: "R$ 47",
    original: "R$ 97",
    description: "Documentos editáveis para deixar escopo, prazos e responsabilidades mais claros no relacionamento com clientes.",
    items: ["Contrato de projeto", "Contrato de consultoria", "Contrato de execução", "Termos de conclusão"],
    link: "https://pay.kiwify.com.br/xfNh4Q2",
  },
];

export default function Produtos() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Materiais para Paisagistas"
        description="Kits editáveis para paisagistas profissionalizarem briefing, propostas, contratos, cronogramas e gestão comercial."
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <SiteNav activeLink="produtos" />

      <main className="font-body">
        <section className="bg-[#173727] px-5 pb-32 pt-48 text-white md:px-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-[#d7ae45]/10 to-transparent pointer-events-none" />
          <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[1.2fr_0.8fr] md:items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-[#d7ae45]">Materiais Profissionais</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.1] md:text-7xl lg:text-[5rem]">
                Elevando o Padrão do Seu <span className="italic text-[#d7ae45]">Escritório.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/70 font-light">
                Modelos editoriais, contratos blindados e acervo documental de alto padrão para arquitetos e paisagistas que buscam excelência operacional.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="overflow-hidden rounded-[40px] border border-white/10 shadow-2xl relative group"
            >
              <div className="absolute inset-0 bg-[#173727]/20 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
              <img src="https://media.base44.com/images/public/69ea9c43ca6eb4180010c463/9825cfba9_IMG_7921jpg.jpg" alt="Rosane Borges Masterclass" className="h-full max-h-[600px] w-full object-cover filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-32 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 max-w-3xl"
          >
            <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#d7ae45]">Acervo Digital</p>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight md:text-6xl text-[#173727]">
              Sistemas de gestão e contratos blindados.
            </h2>
          </motion.div>
          <div className="grid gap-10 md:grid-cols-2">
            {products.map((product, index) => (
              <motion.article 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                key={product.title} 
                className="rounded-[40px] border border-stone-200 bg-white p-10 shadow-xl shadow-stone-200/50 hover:-translate-y-2 transition-transform duration-500 flex flex-col h-full"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#fbfaf6] border border-stone-100 shadow-sm text-[#d7ae45]">
                    <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-bold text-stone-400 line-through tracking-wider">{product.original}</p>
                    <p className="font-display text-5xl font-bold text-[#173727] mt-1">{product.price}</p>
                  </div>
                </div>
                <h3 className="mt-10 font-display text-3xl font-bold text-[#173727] leading-tight">{product.title}</h3>
                <p className="mt-4 leading-relaxed text-stone-500 font-light text-lg">{product.description}</p>
                
                <div className="mt-10 mb-10 flex-1">
                  <ul className="space-y-4">
                    {product.items.map((item) => (
                      <li key={item} className="flex items-center gap-4 text-[15px] font-medium text-stone-700">
                        <span className="material-symbols-outlined text-[#d7ae45] text-[20px]">check_circle</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a href={product.link} target="_blank" rel="noreferrer" className="block w-full rounded-full bg-[#173727] px-8 py-5 text-center text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#d7ae45] hover:bg-[#d7ae45] hover:text-[#173727] transition-all shadow-lg hover:shadow-xl hover:scale-105">
                  Adquirir Licença
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="bg-[#173727] px-5 py-32 md:px-8 relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d7ae45]/10 to-transparent pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mx-auto grid max-w-7xl gap-16 rounded-[40px] bg-white/5 border border-white/10 p-12 md:grid-cols-[1fr_0.8fr] md:p-16 backdrop-blur-sm relative z-10"
          >
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#d7ae45]">Oferta Exclusiva</p>
              <h2 className="mt-6 font-display text-5xl font-bold leading-[1.1] md:text-6xl text-white">The Master<br/><span className="italic text-[#d7ae45]">Bundle</span></h2>
              <p className="mt-6 max-w-2xl leading-relaxed text-white/70 text-lg font-light">
                O arsenal completo do escritório de alto padrão. Adquira o Kit Profissional e os Contratos Blindados em uma única licença vitalícia.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-8 md:items-end md:text-right border-t border-white/10 pt-10 md:pt-0 md:border-t-0 md:border-l md:pl-10">
              <div>
                <p className="text-white/40 text-sm font-bold line-through mb-2 tracking-widest">R$ 194</p>
                <p className="font-display text-7xl font-bold text-[#d7ae45]">R$ 67</p>
              </div>
              <a href="https://pay.kiwify.com.br/lH4EUVh" target="_blank" rel="noreferrer" className="w-full md:w-auto rounded-full bg-[#d7ae45] px-10 py-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-white transition-all shadow-[0_0_40px_rgba(215,174,69,0.3)] text-center hover:scale-105">
                Desbloquear Acesso
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
