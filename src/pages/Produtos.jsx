import { useState } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";

const products = [
  {
    id: 1,
    icon: "assignment_turned_in",
    iconBg: "bg-emerald-50",
    iconColor: "text-[#276a4d]",
    titleColor: "text-[#276a4d]",
    btnColor: "bg-[#276a4d] hover:bg-[#1a3d2b]",
    precoOriginal: "R$ 97,00",
    preco: "R$ 47,00",
    titulo: "Kit Profissional do Paisagista Lucrativo",
    descricao: "A base organizacional que você precisa para conduzir propostas e briefings impecáveis.",
    items: [
      "Briefing detalhado (Arquitetura e Interiores)",
      "Proposta Comercial Editável (Excelência)",
      "Cronograma de execução mestre",
      "Tabela técnica de manutenção",
    ],
    link: "https://pay.kiwify.com.br/mnciAVd",
    cta: "Acessar Kit Agora",
  },
  {
    id: 2,
    icon: "gavel",
    iconBg: "bg-stone-100",
    iconColor: "text-stone-600",
    titleColor: "text-stone-700",
    btnColor: "bg-stone-700 hover:bg-stone-800",
    precoOriginal: "R$ 97,00",
    preco: "R$ 47,00",
    titulo: "Kit Contratos Blindados para Paisagistas",
    descricao: "Segurança jurídica absoluta para seus projetos de execução, consultoria e manutenção.",
    items: [
      "Contrato de Projeto (Prazos e Entregas)",
      "Contrato de Consultoria Técnica Especializada",
      "Contrato de Execução e Implantação",
      "Termos de Conclusão e Pós-Entrega",
    ],
    link: "https://pay.kiwify.com.br/xfNh4Q2",
    cta: "Acessar Contratos",
  },
];

export default function Produtos() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Work+Sans:wght@300;400;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }
        .font-serif-custom { font-family: 'Noto Serif', serif; }
        .font-sans-custom { font-family: 'Work Sans', sans-serif; }
      `}</style>

      <SiteNav activeLink="produtos" />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative bg-stone-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:grid md:grid-cols-12 gap-8 items-center py-16 md:py-24">
            <div className="md:col-span-7 z-10 text-center md:text-left font-sans-custom">
              <span className="inline-block bg-[#276a4d]/10 text-[#276a4d] px-4 py-1 rounded-full text-xs mb-6 uppercase tracking-wider font-bold">
                Excelência em Gestão
              </span>
              <h1 className="font-serif-custom text-4xl md:text-5xl text-[#1a3d2b] mb-6 leading-tight">
                Transforme seu paisagismo em um negócio profissional e lucrativo
              </h1>
              <p className="text-stone-500 mb-10 max-w-xl text-lg">
                Documentos profissionais prontos para uso, criados por uma especialista com PhD em Produção Vegetal.
              </p>
            </div>
            <div className="md:col-span-5 w-full relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <img
                  alt="Rosane Borges"
                  className="w-full h-full object-cover"
                  src="https://media.base44.com/images/public/69ea9c43ca6eb4180010c463/9825cfba9_IMG_7921jpg.jpg"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 md:-right-12 bg-white p-6 rounded-2xl shadow-xl z-20">
                <p className="text-[#276a4d] font-bold text-lg font-serif-custom">+15 Anos</p>
                <p className="text-stone-400 text-sm font-sans-custom font-bold uppercase text-xs">Expertise no Mercado</p>
              </div>
            </div>
          </div>
        </section>

        {/* Authority */}
        <section className="py-20 bg-white border-y border-stone-100 font-sans-custom">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-serif-custom text-3xl text-[#1a3d2b] mb-6">Expertise Técnica a Serviço da sua Carreira</h2>
            <p className="text-stone-500 mb-8 leading-relaxed">
              Rosane Borges é engenheira agrônoma, mestre e doutora (PhD) em Produção Vegetal, com especialização em plantas ornamentais. Seu método une o rigor científico à estética de alto padrão.
            </p>
            <div className="grid grid-cols-2 gap-8 py-8 border-y border-stone-100 justify-items-center">
              <div>
                <p className="text-3xl font-serif-custom text-[#276a4d] font-bold">Doutora</p>
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mt-1">Em Produção Vegetal</p>
              </div>
              <div>
                <p className="text-3xl font-serif-custom text-[#276a4d] font-bold">+500</p>
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mt-1">Projetos & Alunos</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-24 bg-stone-50 font-sans-custom" id="produtos">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif-custom text-4xl text-[#1a3d2b] mb-4">Ferramentas de Gestão Profissional</h2>
              <p className="text-stone-500">Pare de perder tempo criando documentos do zero toda semana.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-3xl p-8 md:p-12 border border-stone-100 shadow-sm hover:shadow-md transition-all flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`p-4 ${p.iconBg} rounded-2xl`}>
                      <span className={`material-symbols-outlined ${p.iconColor} text-3xl`}>{p.icon}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-stone-400 text-xs line-through block">De {p.precoOriginal}</span>
                      <span className={`${p.titleColor} font-serif-custom text-4xl font-bold`}>{p.preco}</span>
                    </div>
                  </div>
                  <h3 className={`font-serif-custom text-3xl ${p.titleColor} mb-4`}>{p.titulo}</h3>
                  <p className="text-stone-500 mb-8 flex-grow">{p.descricao}</p>
                  <ul className="space-y-4 mb-10 text-stone-500">
                    {p.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className={`material-symbols-outlined ${p.iconColor} text-sm`}>check_circle</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full ${p.btnColor} text-white py-4 rounded-full text-center font-bold text-xs uppercase tracking-widest transition-colors`}
                  >
                    {p.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Combo */}
        <section className="py-24 bg-[#1a3d2b] text-white overflow-hidden relative font-sans-custom" id="combo">
          {/* subtle bg triangle */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0 0 L100 0 L100 100 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-20 backdrop-blur-xl">
              <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <span className="inline-block bg-amber-100 text-amber-800 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-8 animate-pulse">OFERTA HISTÓRICA</span>
                  <h2 className="font-serif-custom text-5xl md:text-6xl mb-8">Combo Paisagista Profissional</h2>
                  <p className="text-xl text-white/80 mb-12 leading-relaxed">
                    Tenha o ecossistema completo para organizar seu escritório. Inclui o <b>Kit Profissional</b> + <b>Kit Contratos</b> + <b>Suporte VIP</b>.
                  </p>
                  <div className="flex items-center gap-10 justify-center lg:justify-start mb-12">
                    <div className="opacity-50">
                      <p className="text-sm uppercase font-bold mb-1 tracking-wide">De R$ 94,00</p>
                      <p className="text-3xl font-serif-custom line-through">R$ 94</p>
                    </div>
                    <div className="text-amber-300">
                      <p className="text-sm uppercase font-bold mb-1 tracking-wide">Por apenas</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-serif-custom font-bold">R$ 67</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://pay.kiwify.com.br/lH4EUVh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-amber-100 text-amber-900 px-12 py-6 rounded-full font-bold text-lg shadow-2xl hover:scale-105 active:scale-100 transition-all uppercase tracking-widest"
                  >
                    Garantir Meu Combo Agora
                  </a>
                  <p className="mt-6 text-sm opacity-60 font-bold uppercase tracking-wide">Pagamento seguro via Kiwify • Acesso imediato</p>
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="relative">
                    <img
                      alt="Celebrando Sucesso"
                      className="rounded-[32px] shadow-2xl border-4 border-white/20 w-full"
                      src="https://media.base44.com/images/public/69ea9c43ca6eb4180010c463/b7cd6c8a6_WhatsAppImage2026-05-02at21162511.jpg"
                    />
                    <div className="absolute -top-10 -right-4 md:-right-10 bg-white text-[#276a4d] p-8 rounded-3xl shadow-2xl text-center rotate-6">
                      <span className="material-symbols-outlined text-5xl mb-2 block">workspace_premium</span>
                      <p className="font-bold leading-tight uppercase text-xs font-sans-custom">Melhor<br />Compra</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Garantia + FAQ */}
        <section className="py-24 bg-white font-sans-custom" id="faq">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            {/* Garantia */}
            <div className="text-center mb-20 p-10 rounded-3xl border-2 border-dashed border-[#276a4d]/30 bg-stone-50">
              <div className="w-20 h-20 bg-[#276a4d]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[#276a4d] text-4xl">verified</span>
              </div>
              <h2 className="font-serif-custom text-3xl text-[#1a3d2b] mb-4">Risco Zero: 7 dias de Garantia</h2>
              <p className="text-stone-500 max-w-2xl mx-auto text-lg leading-relaxed">
                Explore todos os documentos, abra cada planilha. Se não sentir que seu escritório subiu de nível, devolvemos 100% do seu dinheiro sem perguntas.
              </p>
            </div>

            {/* FAQ */}
            <h2 className="font-serif-custom text-4xl text-[#1a3d2b] text-center mb-12">Perguntas Frequentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Para quem é este material?",
                  a: "O material é ideal para paisagistas, arquitetos e engenheiros que atuam no mercado e desejam profissionalizar sua gestão documental e processos comerciais.",
                },
                {
                  q: "Em quais formatos os arquivos são entregues?",
                  a: "Os arquivos são disponibilizados em formatos 100% editáveis: Word (.docx), Excel (.xlsx) e modelos estruturados no Canva para apresentações visuais.",
                },
                {
                  q: "Como recebo o acesso?",
                  a: "Imediatamente após a confirmação do pagamento, você receberá um e-mail da plataforma Kiwify com seus dados de login e link para a área de membros.",
                },
                {
                  q: "Tenho suporte em caso de dúvidas?",
                  a: "Sim! Dentro da plataforma você terá acesso aos nossos canais de suporte para auxiliar em qualquer dúvida sobre o uso do material.",
                },
              ].map((item, i) => (
                <details key={i} className="group border border-stone-200 rounded-2xl overflow-hidden bg-stone-50">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none hover:bg-stone-100 transition-colors">
                    <span className="text-lg font-bold text-[#1a3d2b]">{item.q}</span>
                    <span className="material-symbols-outlined text-[#276a4d] transition-transform duration-300 group-open:rotate-180">expand_more</span>
                  </summary>
                  <div className="px-6 pb-6 text-stone-500 leading-relaxed">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <WhatsAppFloat />
    </div>
  );
}