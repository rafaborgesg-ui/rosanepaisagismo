import { motion } from "framer-motion";

export default function SobreSection({ content }) {
  return (
    <section
      className="px-5 py-32 bg-[#fbfaf6] max-w-7xl mx-auto md:px-8"
      id="sobre"
      style={{ overflow: "hidden" }}>
      
      <style>{`
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-24 font-body">
        {/* Imagem */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative lg:w-1/2 group"
        >
          <div className="absolute -top-6 -left-6 w-40 h-40 border-t border-l border-[#d7ae45]/50 hidden lg:block transition-transform duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
          <div className="rounded-[40px] overflow-hidden bg-stone-100 shadow-2xl relative z-10">
            {content?.sobre_imagem_url &&
            <img
              alt="Dra. Rosane"
              className="w-full aspect-[3/4] lg:aspect-[4/5] object-cover transition duration-1000 filter grayscale-[30%] group-hover:grayscale-0 mix-blend-multiply"
              src={content.sobre_imagem_url} />
            }
            <div className="absolute inset-0 bg-[#173727]/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
          </div>
        </motion.div>

        {/* Texto */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-10 lg:w-1/2 pt-10 lg:pt-0"
        >
          <div className="space-y-4">
            <span className="text-[#d7ae45] uppercase tracking-[0.3em] text-[10px] font-extrabold block">
              {content?.sobre_cargo || "Fundadora & Diretora Criativa"}
            </span>
            <h2 className="font-display text-5xl lg:text-7xl font-bold text-[#173727] leading-[1.1]">
              {content?.sobre_titulo || "Dra. Rosane Borges"}
            </h2>
          </div>
          <p className="font-display italic text-2xl text-stone-400 leading-relaxed border-l-2 border-[#d7ae45] pl-6">
            "{content?.sobre_frase || "Onde a ciência da arquitetura exterior encontra a sofisticação de resorts particulares."}"
          </p>
          <p className="text-stone-600 text-lg leading-8">
            {content?.sobre_texto || "Com uma trajetória que une rigor acadêmico a um portfólio de alta renda, a assinatura Rosane Paisagismo é requisitada por clientes que buscam não apenas um jardim, mas a elevação definitiva de seus patrimônios através da arquitetura de áreas externas."}
          </p>
          
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="p-8 bg-white border border-stone-100 rounded-[32px] text-center shadow-xl shadow-stone-200/50 hover:-translate-y-1 transition-transform">
              <p className="text-4xl font-display font-bold text-[#173727] mb-2">350+</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#d7ae45] font-extrabold">Obras de Luxo</p>
            </div>
            <div className="p-8 bg-white border border-stone-100 rounded-[32px] text-center shadow-xl shadow-stone-200/50 hover:-translate-y-1 transition-transform">
              <p className="text-4xl font-display font-bold text-[#173727] mb-2">15</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#d7ae45] font-extrabold">Anos de Mercado</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
