import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

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
        <section className="bg-[#173727] px-5 pb-20 pt-36 text-white md:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_0.75fr] md:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Materiais profissionais</p>
              <h1 className="mt-5 font-display text-5xl font-bold leading-tight md:text-7xl">
                Para paisagistas que querem vender com mais clareza e segurança.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
                Esta área é voltada para profissionais. Se você é cliente final e quer contratar um projeto, vá para o diagnóstico de paisagismo.
              </p>
            </div>
            <div className="overflow-hidden rounded-[28px] border border-white/15">
              <img src="https://media.base44.com/images/public/69ea9c43ca6eb4180010c463/9825cfba9_IMG_7921jpg.jpg" alt="Rosane Borges" className="h-full max-h-[560px] w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Produtos digitais</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              Documentos prontos para reduzir improviso na venda e na execução.
            </h2>
          </div>
          <div className="grid gap-7 md:grid-cols-2">
            {products.map((product) => (
              <article key={product.title} className="rounded-[28px] border border-stone-200 bg-white p-8 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[#173727] text-[#d7ae45]">
                    <span className="material-symbols-outlined">description</span>
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-bold text-stone-400 line-through">{product.original}</p>
                    <p className="font-display text-5xl font-bold text-[#173727]">{product.price}</p>
                  </div>
                </div>
                <h3 className="mt-8 font-display text-3xl font-bold">{product.title}</h3>
                <p className="mt-4 leading-7 text-stone-600">{product.description}</p>
                <ul className="mt-8 space-y-4">
                  {product.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-semibold text-stone-700">
                      <span className="material-symbols-outlined text-[#b28a28]">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href={product.link} target="_blank" rel="noreferrer" className="mt-9 block rounded-full bg-[#d7ae45] px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-[#173727] hover:text-white">
                  Acessar material
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#eef3ed] px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 rounded-[28px] bg-white p-8 shadow-sm md:grid-cols-[1fr_0.7fr] md:p-12">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Oferta combinada</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">Combo Paisagista Profissional</h2>
              <p className="mt-5 max-w-2xl leading-8 text-stone-600">
                Kit profissional + contratos em um único pacote para estruturar a parte comercial, documental e operacional do escritório.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-5 md:items-end">
              <p className="font-display text-6xl font-bold text-[#173727]">R$ 67</p>
              <a href="https://pay.kiwify.com.br/lH4EUVh" target="_blank" rel="noreferrer" className="rounded-full bg-[#173727] px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-white hover:bg-[#d7ae45] hover:text-[#173727]">
                Garantir combo
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
