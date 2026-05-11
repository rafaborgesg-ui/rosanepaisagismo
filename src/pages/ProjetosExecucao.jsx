import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useCanEdit } from "@/hooks/useCanEdit";
import { useOfficeOwner } from "@/hooks/useOfficeOwner";
import { Plus, Pencil, Trash2, Search, Calendar, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageHeader from "../components/shared/PageHeader";
import EmptyState from "../components/shared/EmptyState";
import ProjetoForm from "../components/projetos/ProjetoForm";
import { formatCurrency } from "../lib/formatters";
import { format } from "date-fns";

const STATUS_CONFIG = {
  "Planejamento": { badge: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-500" },
  "Em Execução": { badge: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  "Finalizada": { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  "Pausada": { badge: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500" },
};

export default function ProjetosExecucao() {
  const { user } = useAuth();
  const { canEdit } = useCanEdit();
  const { officeOwner } = useOfficeOwner();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const qc = useQueryClient();

  const { data: items = [] } = useQuery({
    queryKey: ["projetos-execucao", officeOwner],
    queryFn: () => base44.entities.ProjetoExecucao.filter({ office_owner: officeOwner }),
    enabled: !!officeOwner,
  });

  const closeForm = () => { setShowForm(false); setEditing(null); };
  const createM = useMutation({
    mutationFn: d => base44.entities.ProjetoExecucao.create(d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["projetos-execucao"] }); closeForm(); },
  });

  const updateM = useMutation({
    mutationFn: ({ id, data }) => base44.entities.ProjetoExecucao.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["projetos-execucao"] }); closeForm(); },
  });

  const deleteM = useMutation({
    mutationFn: id => base44.entities.ProjetoExecucao.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projetos-execucao"] }),
  });

  const handleSave = d => {
    editing ? updateM.mutate({ id: editing.id, data: d }) : createM.mutate({ ...d, office_owner: officeOwner });
  };

  const filtered = items.filter(i => {
    const m = i.nome_projeto?.toLowerCase().includes(search.toLowerCase()) || 
              i.cliente?.toLowerCase().includes(search.toLowerCase());
    return m && (filterStatus === "todos" || i.status === filterStatus);
  });

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-4">
      <PageHeader
        title="Obras em Execução"
        subtitle="Controle de projetos e cronogramas"
        actions={
          <div className="flex items-center gap-2">
            {!canEdit && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 text-xs text-amber-700">
                <Crown className="w-3.5 h-3.5" />
                <span>Limite do plano atingido — <a href="/pricing" className="underline font-medium">Fazer upgrade</a></span>
              </div>
            )}
            <Button
              onClick={() => { setEditing(null); setShowForm(true); }}
              size="sm"
              className="bg-primary text-primary-foreground h-8 text-xs gap-1.5 px-3"
              disabled={!canEdit}
            >
              <Plus className="w-3.5 h-3.5" /> Nova Obra
            </Button>
          </div>
        }
      />

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total de Obras", value: filtered.length, sub: "projetos", border: "border-border bg-card" },
          { label: "Em Execução", value: filtered.filter(i => i.status === "Em Execução").length, sub: "obras ativas", border: "border-amber-100 bg-amber-50/60" },
          { label: "Finalizadas", value: filtered.filter(i => i.status === "Finalizada").length, sub: "concluídas", border: "border-emerald-100 bg-emerald-50/60" },
          { label: "Planejamento", value: filtered.filter(i => i.status === "Planejamento").length, sub: "em preparação", border: "border-blue-100 bg-blue-50/60" },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border px-4 py-3 ${s.border}`}>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">{s.label}</p>
            <p className="text-[22px] font-bold text-foreground leading-none">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/20">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
            <Input placeholder="Buscar projeto ou cliente..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 h-7 text-xs bg-background" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-7 w-40 text-xs bg-background"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Planejamento">Planejamento</SelectItem>
              <SelectItem value="Em Execução">Em Execução</SelectItem>
              <SelectItem value="Finalizada">Finalizada</SelectItem>
              <SelectItem value="Pausada">Pausada</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-[11px] text-muted-foreground ml-auto">{filtered.length} resultado(s)</span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="Nenhuma obra" description="Cadastre sua primeira obra em execução." />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border">
                  {["Projeto", "Cliente", "Endereço", "Início", "Previsão Término", "Status", "Responsável", ""].map(h => (
                    <TableHead key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 py-2.5">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(item => {
                  const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG["Planejamento"];
                  return (
                    <TableRow key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors group">
                      <TableCell className="text-[12px] font-semibold text-foreground py-2.5 whitespace-nowrap">{item.nome_projeto}</TableCell>
                      <TableCell className="text-[11px] text-muted-foreground py-2.5">{item.cliente}</TableCell>
                      <TableCell className="text-[11px] text-muted-foreground py-2.5 max-w-[200px] truncate">{item.endereco}</TableCell>
                      <TableCell className="text-[11px] text-muted-foreground py-2.5 whitespace-nowrap">{item.data_inicio ? format(new Date(item.data_inicio), "dd/MM/yy") : "—"}</TableCell>
                      <TableCell className="text-[11px] text-muted-foreground py-2.5 whitespace-nowrap">{item.data_prevista_termino ? format(new Date(item.data_prevista_termino), "dd/MM/yy") : "—"}</TableCell>
                      <TableCell className="py-2.5">
                        <Badge variant="outline" className={`text-[10px] font-semibold gap-1 py-0.5 ${cfg.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />{item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[11px] text-muted-foreground py-2.5">{item.responsavel}</TableCell>
                      <TableCell className="py-2.5 w-14">
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setEditing(item); setShowForm(true); }} className="p-1 hover:bg-muted rounded-md"><Pencil className="w-3 h-3 text-muted-foreground" /></button>
                          <button onClick={() => deleteM.mutate(item.id)} className="p-1 hover:bg-red-50 rounded-md"><Trash2 className="w-3 h-3 text-red-400" /></button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <ProjetoForm open={showForm} onClose={closeForm} onSave={handleSave} initialData={editing} />
    </div>
  );
}