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
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Work+Sans:wght@300;400;600&display=swap');
        .font-serif-custom { font-family: 'Noto Serif', serif; }
        .font-sans-custom { font-family: 'Work Sans', sans-serif; }
      `}</style>

      {/* Header Simplificado */}
      <nav className="bg-white/90 backdrop-blur border-b border-stone-100 font-sans-custom sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[#276a4d] font-bold text-lg uppercase tracking-tighter">
            <Leaf className="w-6 h-6" />
            Rosane <span className="font-light">Paisagismo</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-stone-600 hover:text-[#276a4d] transition-colors">
            Voltar para o Início
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="bg-[#1a3d2b] text-white py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif-custom text-5xl md:text-6xl mb-6">Catálogo Botânico</h1>
            <p className="text-white/70 text-lg md:text-xl font-sans-custom leading-relaxed">
              Uma curadoria exclusiva de espécies selecionadas por nossa equipe técnica para transformar seu jardim em um ecossistema equilibrado e exuberante.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-12 px-6 -mt-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-stone-100 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                <Input 
                  placeholder="Busque por nome popular ou científico..." 
                  className="pl-12 h-12 bg-stone-50 border-stone-200 rounded-xl font-sans-custom"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      category === cat 
                      ? "bg-[#276a4d] text-white" 
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
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
                <div key={plant.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100 group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img 
                      src={plant.imagem} 
                      alt={plant.nome} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/80 backdrop-blur-md text-[#276a4d] border-none font-bold uppercase tracking-widest text-[10px]">
                        {plant.categoria}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif-custom text-xl text-[#1a3d2b] mb-1">{plant.nome}</h3>
                    <p className="text-stone-400 italic text-sm mb-4 font-serif-custom">{plant.cientifico}</p>
                    <p className="text-stone-600 text-sm font-sans-custom leading-relaxed mb-6 line-clamp-3">
                      {plant.descricao}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-xs text-stone-500 font-sans-custom">
                        <Sun className="w-4 h-4 text-amber-500" />
                        <span>{plant.clima}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-stone-500 font-sans-custom">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span>Rega {plant.rega}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-stone-500 font-sans-custom">
                        <Wind className="w-4 h-4 text-emerald-500" />
                        <span>Porte: {plant.porte}</span>
                      </div>
                    </div>

                    <Link 
                      to={`/contato?interesse=Dúvida sobre ${plant.nome}`}
                      className="w-full py-3 bg-stone-50 text-[#276a4d] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#276a4d] hover:text-white transition-all group/btn"
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
                <h3 className="font-serif-custom text-2xl text-stone-400">Nenhuma planta encontrada</h3>
                <p className="text-stone-500 font-sans-custom mt-2">Tente buscar por outro nome ou categoria.</p>
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
