import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/apiService";
import { useAuth } from "@/lib/AuthContext";
import { useCanEdit } from "@/hooks/useCanEdit";
import { useOfficeOwner } from "@/hooks/useOfficeOwner";
import { Plus, Pencil, Trash2, Search, Paperclip, Crown, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import PageHeader from "../components/shared/PageHeader";
import EmptyState from "../components/shared/EmptyState";
import EntradaForm from "../components/caixa/EntradaForm";
import { formatCurrency } from "../lib/formatters";
import { format, isPast } from "date-fns";

const STATUS = {
  "Ativo":     "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Finalizado": "bg-blue-50 text-blue-700 border-blue-200",
  "Cancelado":  "bg-slate-50 text-slate-700 border-slate-200",
  "Pendente":   "bg-amber-50 text-amber-700 border-amber-200",
};

export default function CaixaEntrada() {
  const { user } = useAuth();
  const { canEdit, loading: subLoading } = useCanEdit();
  const { officeOwner, isLoading: ownerLoading } = useOfficeOwner();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterComp, setFilterComp] = useState([]);
  const [filterPago, setFilterPago] = useState([]);
  const [sortKey, setSortKey] = useState("vencimento");
  const [sortDir, setSortDir] = useState("asc");
  const [activeCard, setActiveCard] = useState(null);
  const qc = useQueryClient();

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const { data: items = [] } = useQuery({
    queryKey: ["caixa-entrada", officeOwner],
    queryFn: () => api.entities.CaixaEntrada.filter({ office_owner: officeOwner }),
    enabled: !!officeOwner && !ownerLoading,
  });

  const closeForm = () => { setShowForm(false); setEditing(null); };
  const createM = useMutation({ mutationFn: d => api.entities.CaixaEntrada.create(d), onSuccess: () => { qc.invalidateQueries({ queryKey: ["caixa-entrada"] }); closeForm(); } });
  const updateM = useMutation({ mutationFn: ({ id, data }) => api.entities.CaixaEntrada.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["caixa-entrada"] }); closeForm(); } });
  const deleteM = useMutation({ mutationFn: id => api.entities.CaixaEntrada.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["caixa-entrada"] }) });

  const handleSave = async (d) => {
    if (editing) {
      updateM.mutate({ id: editing.id, data: d });
      return;
    }
    createM.mutate({ ...d, office_owner: officeOwner });
  };

  const handleSaveMulti = async (records) => {
    const recordsWithOwner = records.map(r => ({ ...r, office_owner: officeOwner }));
    await api.entities.CaixaEntrada.bulkCreate(recordsWithOwner);
    qc.invalidateQueries({ queryKey: ["caixa-entrada"] });
    closeForm();
  };

  const togglePago = item => updateM.mutate({ id: item.id, data: { ...item, pago: !item.pago } });

  const MESES_ORDER = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

  const filtered = items.filter(i => {
    const m = (i.cliente || "").toLowerCase().includes(search.toLowerCase()) || (i.categoria || "").toLowerCase().includes(search.toLowerCase());
    const statusOk = filterStatus.length === 0 || filterStatus.includes(i.status);
    const compOk = filterComp.length === 0 || filterComp.includes(i.competencia);
    const pagoOk = filterPago.length === 0 || filterPago.includes(i.pago ? "pago" : "pendente");
    const cardOk = !activeCard
      || (activeCard === "recebido" && i.pago)
      || (activeCard === "apagar" && !i.pago)
      || (activeCard === "vencidos" && !i.pago && i.vencimento && isPast(new Date(i.vencimento)));
    return m && statusOk && compOk && pagoOk && cardOk;
  }).sort((a, b) => {
    if (!sortKey) return 0;
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
    return sortDir === "asc" ? cmp : -cmp;
  });

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-4">
      <PageHeader
        title="Caixa Entrada"
        subtitle="Controle de recebimentos e faturamento"
        actions={
          <div className="flex items-center gap-2">
            {!subLoading && !canEdit && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 text-xs text-amber-700">
                <Crown className="w-3.5 h-3.5" />
                <span>Limite atingido — <a href="/pricing" className="underline font-medium">Upgrade</a></span>
              </div>
            )}
            <Button 
              onClick={() => { setEditing(null); setShowForm(true); }} 
              size="sm" 
              className="bg-primary text-primary-foreground h-8 text-xs gap-1.5 px-3"
              disabled={!subLoading && !canEdit}
            >
              <Plus className="w-3.5 h-3.5" /> Novo Recebimento
            </Button>
          </div>
        }
      />

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/20">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
            <Input placeholder="Buscar cliente ou categoria..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 h-7 text-xs bg-background" />
          </div>
          <span className="text-[11px] text-muted-foreground ml-auto">{filtered.length} resultado(s)</span>
        </div>

        {filtered.length === 0
          ? <EmptyState title="Nenhum recebimento" description="Cadastre seu primeiro recebimento." />
          : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border">
                    <TableHead className="text-[10px] font-semibold uppercase py-2.5">Status</TableHead>
                    <TableHead className="text-[10px] font-semibold uppercase py-2.5">Cliente</TableHead>
                    <TableHead className="text-[10px] font-semibold uppercase py-2.5">Categoria</TableHead>
                    <TableHead className="text-[10px] font-semibold uppercase py-2.5">Valor Parcela</TableHead>
                    <TableHead className="text-[10px] font-semibold uppercase py-2.5">Vencimento</TableHead>
                    <TableHead className="text-[10px] font-semibold uppercase py-2.5">Recebido</TableHead>
                    <TableHead className="text-[10px] font-semibold uppercase py-2.5"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(item => (
                    <TableRow key={item.id} className="border-b border-border/50 group hover:bg-muted/30">
                      <TableCell className="py-2.5">
                        <Badge variant="outline" className={`text-[10px] font-semibold py-0.5 ${STATUS[item.status] || STATUS["Ativo"]}`}>{item.status}</Badge>
                      </TableCell>
                      <TableCell className="text-[12px] font-medium text-foreground py-2.5">{item.cliente}</TableCell>
                      <TableCell className="text-[11px] text-muted-foreground py-2.5">{item.categoria}</TableCell>
                      <TableCell className="text-[12px] font-bold text-foreground py-2.5">{formatCurrency(item.valor_mensal)}</TableCell>
                      <TableCell className="text-[11px] text-muted-foreground py-2.5">
                        {item.vencimento ? format(new Date(item.vencimento + "T00:00:00"), "dd/MM/yy") : "—"}
                      </TableCell>
                      <TableCell className="py-2.5">
                        <Switch checked={!!item.pago} onCheckedChange={() => togglePago(item)} className="scale-[0.7] origin-left" />
                      </TableCell>
                      <TableCell className="py-2.5 w-14">
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setEditing(item); setShowForm(true); }} className="p-1 hover:bg-muted rounded-md"><Pencil className="w-3 h-3 text-muted-foreground" /></button>
                          <button onClick={() => deleteM.mutate(item.id)} className="p-1 hover:bg-red-50 rounded-md"><Trash2 className="w-3 h-3 text-red-400" /></button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )
        }
      </div>

      <EntradaForm 
        open={showForm} 
        onClose={closeForm} 
        onSave={handleSave} 
        onSaveMulti={handleSaveMulti}
        initialData={editing} 
        saving={createM.isPending || updateM.isPending || ownerLoading} 
      />
    </div>
  );
}
