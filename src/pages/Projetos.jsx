import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useOfficeOwner } from "@/hooks/useOfficeOwner";
import { Plus, Search, Grid2X2, List, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import ProjetoForm from "@/components/projetos/ProjetoForm";

const statusStyles = {
  "Planejamento": "bg-blue-50 text-blue-700",
  "Em Execução": "bg-purple-50 text-purple-700",
  "Finalizada": "bg-green-50 text-green-700",
  "Pausada": "bg-amber-50 text-amber-700",
};

export default function Projetos() {
  const { officeOwner } = useOfficeOwner();
  const qc = useQueryClient();
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [viewMode, setViewMode] = useState("grid");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data: projetos = [] } = useQuery({
    queryKey: ["projetos", officeOwner],
    queryFn: () => base44.entities.Projeto.filter({ office_owner: officeOwner }),
    enabled: !!officeOwner,
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Projeto.create({ ...data, office_owner: officeOwner }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projetos", officeOwner] });
      closeForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Projeto.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projetos", officeOwner] });
      closeForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Projeto.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projetos", officeOwner] });
    },
  });

  const closeForm = () => { setFormOpen(false); setEditing(null); };

  const handleSave = (data) => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const filtered = projetos.filter(p => {
    const matchSearch = p.nome_projeto?.toLowerCase().includes(search.toLowerCase()) ||
                       p.cliente?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Todas" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: projetos.length,
    planejamento: projetos.filter(p => p.status === "Planejamento").length,
    emExecucao: projetos.filter(p => p.status === "Em Execução").length,
    finalizados: projetos.filter(p => p.status === "Finalizada").length,
    pausados: projetos.filter(p => p.status === "Pausada").length,
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      <PageHeader
        title="Projetos"
        subtitle="Gerencie todos os seus projetos"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "Total", value: stats.total, color: "bg-slate-50 border-slate-200 text-slate-700" },
          { label: "Planejamento", value: stats.planejamento, color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Em Execução", value: stats.emExecucao, color: "bg-purple-50 border-purple-200 text-purple-700" },
          { label: "Finalizados", value: stats.finalizados, color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Pausados", value: stats.pausados, color: "bg-amber-50 border-amber-200 text-amber-700" },
        ].map(s => (
          <div key={s.label} className={`border rounded-xl p-4 ${s.color.split(' ').slice(0,2).join(' ')}`}>
            <p className="text-xs text-muted-foreground font-medium mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color.split(' ')[2]}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {["Todas", "Planejamento", "Em Execução", "Finalizada", "Pausada"].map(s => (
            <Button
              key={s}
              variant={statusFilter === s ? "default" : "outline"}
              onClick={() => setStatusFilter(s)}
              size="sm"
              className="text-xs h-7"
            >
              {s === "Todas" ? `Todos • ${projetos.length}` : s}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-xs w-48"
            />
          </div>
          <div className="flex gap-1 border border-border rounded-lg p-0.5">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")} className="px-2 h-7">
              <Grid2X2 className="w-3.5 h-3.5" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="px-2 h-7">
              <List className="w-3.5 h-3.5" />
            </Button>
          </div>
          <Button onClick={() => { setEditing(null); setFormOpen(true); }} size="sm" className="gap-1.5 text-xs h-8">
            <Plus className="w-3.5 h-3.5" /> Novo Projeto
          </Button>
        </div>
      </div>

      {/* Projects Grid/List */}
      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12">
          <EmptyState
            title="Nenhum projeto ativo encontrado"
            description="Comece criando um novo projeto para organizá-lo."
          />
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2"}>
          {filtered.map(projeto => (
            <div
              key={projeto.id}
              className={`bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow group ${
                viewMode === "list" ? "flex items-center justify-between gap-4" : ""
              }`}
            >
              <div className={`space-y-2 ${viewMode === "list" ? "flex-1 flex items-center gap-6" : ""}`}>
                <div className={`flex items-start justify-between gap-2 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className={viewMode === "list" ? "flex items-center gap-6 flex-1" : ""}>
                    <h3 className="font-semibold text-sm text-foreground">{projeto.nome_projeto}</h3>
                    {viewMode === "list" && <p className="text-xs text-muted-foreground">{projeto.cliente}</p>}
                    {viewMode === "list" && projeto.responsavel && <p className="text-xs text-muted-foreground">{projeto.responsavel}</p>}
                    {viewMode === "list" && projeto.data_inicio && (
                      <p className="text-xs text-muted-foreground">{new Date(projeto.data_inicio).toLocaleDateString('pt-BR')}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${statusStyles[projeto.status] || "bg-gray-50"}`}>
                      {projeto.status}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setEditing(projeto); setFormOpen(true); }}
                      className="p-1 hover:bg-muted rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Pencil className="w-3 h-3 text-muted-foreground" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); if (confirm('Excluir este projeto?')) deleteMutation.mutate(projeto.id); }}
                      className="p-1 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </button>
                  </div>
                </div>
                {viewMode === "grid" && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">{projeto.cliente}</p>
                    {projeto.endereco && <p className="text-xs text-muted-foreground">{projeto.endereco}</p>}
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      {projeto.data_inicio && <span>Início: {new Date(projeto.data_inicio).toLocaleDateString('pt-BR')}</span>}
                      {projeto.data_prevista_termino && <span>Término: {new Date(projeto.data_prevista_termino).toLocaleDateString('pt-BR')}</span>}
                    </div>
                    {projeto.responsavel && <p className="text-xs text-muted-foreground">Resp: {projeto.responsavel}</p>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ProjetoForm
        open={formOpen}
        onClose={closeForm}
        onSave={handleSave}
        initialData={editing}
        saving={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}