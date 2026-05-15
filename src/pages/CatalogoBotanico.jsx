import React, { useState } from 'react';
import { Search, Info, Leaf, Droplets, Sun, Wind, ChevronRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";

const PLANTS = [
  {
    id: 1,
    nome: "Palmeira Imperial",
    cientifico: "Roystonea oleracea",
    descricao: "Símbolo de elegância e imponência, ideal para entradas de grandes propriedades.",
    clima: "Tropical / Pleno Sol",
    rega: "Moderada",
    porte: "Até 40 metros",
    imagem: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800",
    categoria: "Árvores"
  },
  {
    id: 2,
    nome: "Costela de Adão",
    cientifico: "Monstera deliciosa",
    descricao: "Folhagem icônica e moderna, perfeita para áreas sombreadas e interiores iluminados.",
    clima: "Tropical / Meia Sombra",
    rega: "Frequente",
    porte: "Rasteira / Trepadeira",
    imagem: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800",
    categoria: "Folhagens"
  },
  {
    id: 3,
    nome: "Agave Attenuata",
    cientifico: "Agave attenuata",
    descricao: "Escultural e sofisticada, não possui espinhos. Ótima para jardins contemporâneos.",
    clima: "Tropical / Pleno Sol",
    rega: "Baixa",
    porte: "Até 1,5 metros",
    imagem: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80&w=800",
    categoria: "Suculentas"
  },
  {
    id: 4,
    nome: "Jasmim Manga",
    cientifico: "Plumeria rubra",
    descricao: "Árvore de floração perfumada e visual artístico. Suas flores variam do branco ao rosa.",
    clima: "Tropical / Pleno Sol",
    rega: "Moderada",
    porte: "Até 6 metros",
    imagem: "https://images.unsplash.com/photo-1596722265058-47754f9d786d?auto=format&fit=crop&q=80&w=800",
    categoria: "Floríferas"
  }
];

const CATEGORIES = ["Todas", "Árvores", "Folhagens", "Suculentas", "Floríferas"];

export default function CatalogoBotanico() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");

  const filteredPlants = PLANTS.filter(p => {
    const matchesSearch = p.nome.toLowerCase().includes(search.toLowerCase()) || 
                          p.cientifico.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "Todas" || p.categoria === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f9f9f9] font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Header Simplificado */}
      <nav className="bg-white/90 backdrop-blur border-b border-stone-100 font-body sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#173727] font-display text-xl font-bold text-[#d7ae45]">R</span>
            <span className="leading-tight text-[#173727]">
              <span className="block text-[11px] font-extrabold uppercase tracking-[0.24em]">Rosane</span>
              <span className="block text-[9px] uppercase tracking-[0.18em] text-stone-400">Paisagismo</span>
            </span>
          </Link>
          <Link to="/" className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-stone-400 hover:text-[#173727] transition-colors">
            Voltar para o Início
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="bg-[#173727] text-white py-32 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-[#d7ae45]/10 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-[#d7ae45] mb-6">Curadoria Exclusiva</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-[1.1]">Catálogo Botânico</h1>
            <p className="text-white/70 text-lg md:text-xl font-body font-light leading-relaxed">
              Uma seleção rigorosa de espécies para compor os ambientes de mais alto padrão, assinados pelo ateliê.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-12 px-6 -mt-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white p-6 rounded-[24px] shadow-xl border border-stone-100 flex flex-col md:flex-row gap-4 items-center relative z-20">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                <Input 
                  placeholder="Busque por nome popular ou científico..." 
                  className="pl-14 h-14 bg-stone-50 border-stone-100 rounded-full font-body outline-none focus:ring-1 focus:ring-[#173727] text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-6 py-3 rounded-full text-[11px] font-extrabold uppercase tracking-[0.15em] transition-all whitespace-nowrap ${
                      category === cat 
                      ? "bg-[#173727] text-[#d7ae45] shadow-lg" 
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Plants Grid */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredPlants.map(plant => (
                <div key={plant.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100 group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img 
                      src={plant.imagem} 
                      alt={plant.nome} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/80 backdrop-blur-md text-[#173727] border-none font-extrabold uppercase tracking-[0.2em] text-[8px] py-1.5 px-3">
                        {plant.categoria}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-display font-bold text-2xl text-[#173727] mb-1">{plant.nome}</h3>
                    <p className="text-[#d7ae45] italic text-sm mb-6 font-display font-semibold">{plant.cientifico}</p>
                    <p className="text-stone-500 text-sm font-body leading-relaxed mb-8 line-clamp-3">
                      {plant.descricao}
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-xs text-stone-500 font-body">
                        <Sun className="w-4 h-4 text-[#d7ae45]" />
                        <span>{plant.clima}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-stone-500 font-body">
                        <Droplets className="w-4 h-4 text-[#d7ae45]" />
                        <span>Rega {plant.rega}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-stone-500 font-body">
                        <Wind className="w-4 h-4 text-[#d7ae45]" />
                        <span>Porte: {plant.porte}</span>
                      </div>
                    </div>

                    <Link 
                      to={`/contato?interesse=Dúvida sobre ${plant.nome}`}
                      className="w-full py-4 bg-stone-50 text-[#173727] rounded-full font-extrabold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#173727] hover:text-[#d7ae45] transition-all group/btn"
                    >
                      Dúvidas / Orçamento
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredPlants.length === 0 && (
              <div className="text-center py-20">
                <Leaf className="w-16 h-16 text-stone-200 mx-auto mb-4" />
                <h3 className="font-display font-bold text-3xl text-stone-400">Nenhuma espécie encontrada</h3>
                <p className="text-stone-500 font-body mt-4">Tente buscar por outro nome ou categoria na coleção.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
