import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/apiService";
import { useAuth } from "@/lib/AuthContext";
import { useCanEdit } from "@/hooks/useCanEdit";
import { useOfficeOwner } from "@/hooks/useOfficeOwner";
import { Plus, Pencil, Trash2, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FornecedorForm from "../components/fornecedores/FornecedorForm";

const CATEGORIAS = ["Plantas", "Insumos", "Ferramentas", "Transporte", "Serviços", "Materiais", "Outro"];

export default function Fornecedores() {
  const { user } = useAuth();
  const { canEdit } = useCanEdit();
  const { officeOwner } = useOfficeOwner();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("todas");
  const [filterStatus, setFilterStatus] = useState("todos");
  const qc = useQueryClient();

  const { data: items = [] } = useQuery({
    queryKey: ["fornecedores", officeOwner],
    queryFn: () => api.entities.Fornecedor.filter({ office_owner: officeOwner }),
    enabled: !!officeOwner,
  });

  const closeForm = () => { setShowForm(false); setEditing(null); };
  const createM = useMutation({ mutationFn: d => api.entities.Fornecedor.create(d), onSuccess: () => { qc.invalidateQueries({ queryKey: ["fornecedores"] }); closeForm(); } });
  const updateM = useMutation({ mutationFn: ({ id, data }) => api.entities.Fornecedor.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["fornecedores"] }); closeForm(); } });
  const deleteM = useMutation({ mutationFn: id => api.entities.Fornecedor.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["fornecedores"] }) });

  const handleSave = (d) => {
    if (editing) updateM.mutate({ id: editing.id, data: d });
    else createM.mutate({ ...d, office_owner: officeOwner });
  };

  const filtered = items.filter(i =>
    (i.nome?.toLowerCase().includes(search.toLowerCase()) || i.contato?.toLowerCase().includes(search.toLowerCase())) &&
    (filterCategoria === "todas" || i.categoria === filterCategoria) &&
    (filterStatus === "todos" || i.status === filterStatus)
  );

  const totalAtivos = items.filter(i => i.status === "Ativo").length;

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-2xl px-6 py-5">
        <h1 className="text-xl font-bold text-foreground">Fornecedores</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Cadastre e organize seus parceiros por categoria</p>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2 bg-muted/40 border border-border rounded-lg px-4 py-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">{items.length}</span>
            <span className="text-muted-foreground">Total</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-2 text-sm">
            <Users className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-emerald-700">{totalAtivos}</span>
            <span className="text-emerald-600">Ativos</span>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">Lista de Fornecedores</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Todos os seus parceiros cadastrados</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 px-6 py-3 border-b border-border bg-muted/10">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
            <Input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 h-8 text-xs bg-background" />
          </div>
          <Select value={filterCategoria} onValueChange={setFilterCategoria}>
            <SelectTrigger className="h-8 w-32 text-xs bg-background"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              {CATEGORIAS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-8 w-28 text-xs bg-background"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Ativo">Ativo</SelectItem>
              <SelectItem value="Inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={() => { setEditing(null); setShowForm(true); }} 
            size="sm" 
            className="ml-auto gap-1.5 text-xs h-8"
            disabled={!canEdit}
            title={!canEdit ? "Apenas contas premium podem cadastrar fornecedores" : ""}
          >
            <Plus className="w-3.5 h-3.5" /> Novo Fornecedor
          </Button>
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Users className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm">Nenhum fornecedor encontrado</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map(item => (
              <div key={item.id} className="flex items-center gap-4 px-6 py-3 hover:bg-muted/20 group transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">{(item.nome || "?")[0].toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item.nome}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.contato}{item.telefone ? ` · ${item.telefone}` : ""}</p>
                </div>
                {item.categoria && (
                  <span className="text-xs text-muted-foreground hidden sm:block">{item.categoria}</span>
                )}
                <Badge variant="outline" className={item.status === "Ativo" ? "text-emerald-700 bg-emerald-50 border-emerald-200 text-xs" : "text-slate-500 bg-slate-50 border-slate-200 text-xs"}>
                  {item.status}
                </Badge>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditing(item); setShowForm(true); }} className="p-1 hover:bg-muted rounded-md">
                    <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button onClick={() => deleteM.mutate(item.id)} className="p-1 hover:bg-red-50 rounded-md">
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FornecedorForm open={showForm} onClose={closeForm} onSave={handleSave} initialData={editing} />
    </div>
  );
}
