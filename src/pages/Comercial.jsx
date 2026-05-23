import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/apiService";
import { useCanEdit } from "@/hooks/useCanEdit";
import { useOfficeOwner } from "@/hooks/useOfficeOwner";
import { Plus, Pencil, Trash2, Search, Paperclip, Crown, ChevronDown, Check } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageHeader from "../components/shared/PageHeader";
import EmptyState from "../components/shared/EmptyState";
import ComercialForm from "../components/comercial/ComercialForm";
import { formatCurrency } from "../lib/formatters";

const STATUS = {
  "Fechou":     { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  "Aguardando": { badge: "bg-amber-50 text-amber-700 border-amber-200",       dot: "bg-amber-400" },
  "Não Fechou": { badge: "bg-red-50 text-red-600 border-red-200",             dot: "bg-red-400" },
};

const MESES_ORDER = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

function isAguardandoAtrasado(item) {
  if (item.status !== "Aguardando") return false;
  // usa mes_data se disponível, senão tenta derivar de mes
  if (item.mes_data) {
    const d = new Date(item.mes_data + "T00:00:00");
    const now = new Date();
    return d.getFullYear() < now.getFullYear() || (d.getFullYear() === now.getFullYear() && d.getMonth() < now.getMonth());
  }
  const idx = MESES_ORDER.indexOf(item.mes);
  return idx !== -1 && idx < new Date().getMonth();
}

export default function Comercial() {
  const { canEdit, loading: subLoading } = useCanEdit();
  const { officeOwner, isLoading: ownerLoading } = useOfficeOwner();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState(["Aguardando"]);
  const [filterMes, setFilterMes] = useState([]);
  const [filterAno, setFilterAno] = useState([]);
  const [activeCard, setActiveCard] = useState("Aguardando");
  const qc = useQueryClient();

  const { data: items = [] } = useQuery({
    queryKey: ["comercial", officeOwner],
    queryFn: () => api.entities.Commercial.filter({ office_owner: officeOwner }),
    enabled: !!officeOwner,
  });

  const closeForm = () => { setShowForm(false); setEditing(null); };
  const changeStatus = (item, status) => updateM.mutate({ id: item.id, data: { ...item, status } });
  const createM = useMutation({ mutationFn: d => api.entities.Commercial.create(d), onSuccess: () => { qc.invalidateQueries({ queryKey: ["comercial"] }); closeForm(); } });
  const updateM = useMutation({ mutationFn: ({ id, data }) => api.entities.Commercial.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["comercial"] }); closeForm(); } });
  const deleteM = useMutation({ mutationFn: id => api.entities.Commercial.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["comercial"] }) });

  const nextNumero = items.length > 0 ? Math.max(...items.map(i => i.numero || 0)) + 1 : 1;

  const handleSave = (data) => {
    if (!officeOwner) return;
    // Garante que mes sempre reflita mes_data
    const mes = data.mes_data
      ? MESES_ORDER[new Date(data.mes_data + "T00:00:00").getMonth()]
      : data.mes || "";
    const payload = { ...data, mes };
    if (editing) {
      updateM.mutate({ id: editing.id, data: payload });
    } else {
      createM.mutate({ ...payload, numero: nextNumero, office_owner: officeOwner });
    }
  };

  const toggle = (setter, val) => setter(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  const handleCardClick = (statusVal) => {
    if (activeCard === statusVal) {
      setActiveCard(null);
      setFilterStatus([]);
    } else {
      setActiveCard(statusVal);
      setFilterStatus([statusVal]);
    }
  };

  const meses = MESES_ORDER.filter(m => items.some(i => i.mes === m));
  const anos = [...new Set(items.map(i => {
    if (i.mes_data) return new Date(i.mes_data + "T00:00:00").getFullYear();
    return null;
  }).filter(Boolean))].sort((a, b) => b - a);

  const filtered = items.filter(i => {
    const searchOk = i.nome_cliente?.toLowerCase().includes(search.toLowerCase()) || i.servico_orcado?.toLowerCase().includes(search.toLowerCase());
    const statusOk = filterStatus.length === 0 || filterStatus.includes(i.status);
    const mesOk = filterMes.length === 0 || filterMes.includes(i.mes);
    const anoOk = filterAno.length === 0 || (i.mes_data && filterAno.includes(String(new Date(i.mes_data + "T00:00:00").getFullYear())));
    return searchOk && statusOk && mesOk && anoOk;
  }).sort((a, b) => {
    const da = a.mes_data ? new Date(a.mes_data + "T00:00:00").getTime() : (a.numero || 0);
    const db = b.mes_data ? new Date(b.mes_data + "T00:00:00").getTime() : (b.numero || 0);
    return da - db;
  });

  const totalFechado = filtered.filter(i => i.status === "Fechou").reduce((s, i) => s + (i.proposta2 || i.proposta1 || 0), 0);
  const taxa = filtered.length > 0 ? ((filtered.filter(i => i.status === "Fechou").length / filtered.length) * 100).toFixed(0) : 0;

  const cards = [
    {
      id: "Fechou",
      label: "Fechados",
      count: filtered.filter(i => i.status === "Fechou").length,
      sub: formatCurrency(totalFechado),
      dot: "bg-emerald-500",
      base: "border-emerald-100 bg-emerald-50/60",
      active: "ring-2 ring-emerald-400",
    },
    {
      id: "Aguardando",
      label: "Aguardando",
      count: filtered.filter(i => i.status === "Aguardando").length,
      sub: "em negociação",
      dot: "bg-amber-400",
      base: "border-amber-100 bg-amber-50/60",
      active: "ring-2 ring-amber-400",
    },
    {
      id: "Não Fechou",
      label: "Não Fechou",
      count: filtered.filter(i => i.status === "Não Fechou").length,
      sub: "perdidos",
      dot: "bg-red-400",
      base: "border-red-100 bg-red-50/60",
      active: "ring-2 ring-red-400",
    },
  ];

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-4">
      <PageHeader
        title="Pipeline Comercial"
        subtitle={`${filtered.length} propostas · Taxa de conversão: ${taxa}%`}
        actions={
          <div className="flex items-center gap-2">
            {!subLoading && !canEdit && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 text-xs text-amber-700">
                <Crown className="w-3.5 h-3.5" />
                <span>Limite do plano atingido — <a href="/pricing" className="underline font-medium">Fazer upgrade</a></span>
              </div>
            )}
            <Button
              onClick={() => { setEditing(null); setShowForm(true); }}
              size="sm"
              className="bg-primary text-primary-foreground h-8 text-xs gap-1.5 px-3"
              disabled={!officeOwner || (!subLoading && !canEdit)}
            >
              <Plus className="w-3.5 h-3.5" /> Nova Proposta
            </Button>
          </div>
        }
      />

      {/* Stats strip - clicáveis */}
      <div className="grid grid-cols-3 gap-3">
        {cards.map(s => (
          <div
            key={s.id}
            onClick={() => handleCardClick(s.id)}
            className={`rounded-xl border px-4 py-3 cursor-pointer transition-all ${s.base} ${activeCard === s.id ? s.active : "hover:shadow-sm"}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{s.label}</p>
            </div>
            <p className="text-[22px] font-bold text-foreground leading-none">{s.count}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/20">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
            <Input placeholder="Buscar cliente ou serviço..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 h-7 text-xs bg-background" />
          </div>

          {/* Filtro Ano */}
          {anos.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-md border text-xs bg-background hover:bg-muted transition-colors ${filterAno.length > 0 ? "border-primary text-primary font-semibold" : "border-input text-muted-foreground"}`}>
                  Ano{filterAno.length > 0 ? ` (${filterAno.length})` : ""} <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[110px] p-1">
                {anos.map(a => (
                  <button key={a} onClick={() => toggle(setFilterAno, String(a))} className="flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded hover:bg-muted transition-colors">
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${filterAno.includes(String(a)) ? "bg-primary border-primary" : "border-input"}`}>
                      {filterAno.includes(String(a)) && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                    </div>
                    {a}
                  </button>
                ))}
                {filterAno.length > 0 && <button onClick={() => setFilterAno([])} className="w-full text-xs text-muted-foreground hover:text-foreground mt-1 py-1 border-t border-border">Limpar</button>}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Filtro Mês */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-md border text-xs bg-background hover:bg-muted transition-colors ${filterMes.length > 0 ? "border-primary text-primary font-semibold" : "border-input text-muted-foreground"}`}>
                Mês{filterMes.length > 0 ? ` (${filterMes.length})` : ""} <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[140px] p-1 max-h-60 overflow-y-auto">
              {meses.map(m => (
                <button key={m} onClick={() => toggle(setFilterMes, m)} className="flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded hover:bg-muted transition-colors">
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${filterMes.includes(m) ? "bg-primary border-primary" : "border-input"}`}>
                    {filterMes.includes(m) && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                  </div>
                  {m}
                </button>
              ))}
              {filterMes.length > 0 && <button onClick={() => setFilterMes([])} className="w-full text-xs text-muted-foreground hover:text-foreground mt-1 py-1 border-t border-border">Limpar</button>}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filtro Status */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-md border text-xs bg-background hover:bg-muted transition-colors ${filterStatus.length > 0 ? "border-primary text-primary font-semibold" : "border-input text-muted-foreground"}`}>
                Status{filterStatus.length > 0 ? ` (${filterStatus.length})` : ""} <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[130px] p-1">
              {["Fechou", "Aguardando", "Não Fechou"].map(s => (
                <button key={s} onClick={() => { toggle(setFilterStatus, s); setActiveCard(null); }} className="flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded hover:bg-muted transition-colors">
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${filterStatus.includes(s) ? "bg-primary border-primary" : "border-input"}`}>
                    {filterStatus.includes(s) && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                  </div>
                  {s}
                </button>
              ))}
              {filterStatus.length > 0 && <button onClick={() => { setFilterStatus([]); setActiveCard(null); }} className="w-full text-xs text-muted-foreground hover:text-foreground mt-1 py-1 border-t border-border">Limpar</button>}
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="text-[11px] text-muted-foreground ml-auto">{filtered.length} resultado(s)</span>
        </div>

        {filtered.length === 0
          ? <EmptyState title="Nenhuma proposta" description="Crie uma nova proposta ou ajuste os filtros." />
          : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border">
                    {["#", "Data", "Mês", "Cliente", "Serviço", "Tipo", "Proposta 1", "Proposta 2", "Status", "Fonte", ""].map(h => (
                      <TableHead key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 py-2.5">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(item => {
                    const cfg = STATUS[item.status] || STATUS["Aguardando"];
                    const atrasado = isAguardandoAtrasado(item);
                    return (
                      <TableRow key={item.id} className={`border-b border-border/50 group transition-colors ${atrasado ? "bg-amber-50/30 hover:bg-amber-50/50" : "hover:bg-muted/30"}`}>
                        <TableCell className="text-[11px] text-muted-foreground/60 w-8 py-2.5">{item.numero}</TableCell>
                        <TableCell className="text-[11px] text-muted-foreground py-2.5 whitespace-nowrap">
                          <span className={atrasado ? "text-amber-600 font-semibold" : ""}>
                            {item.mes_data ? new Date(item.mes_data + "T00:00:00").toLocaleDateString("pt-BR") : "—"}
                          </span>
                        </TableCell>
                        <TableCell className="text-[11px] text-muted-foreground py-2.5 whitespace-nowrap">
                         {item.mes || (item.mes_data ? MESES_ORDER[new Date(item.mes_data + "T00:00:00").getMonth()] : "—")}
                        </TableCell>
                        <TableCell className="text-[12px] font-semibold text-foreground py-2.5 whitespace-nowrap">{item.nome_cliente}</TableCell>
                        <TableCell className="text-[11px] text-muted-foreground py-2.5 max-w-[200px] truncate">{item.servico_orcado}</TableCell>
                        <TableCell className="text-[11px] text-muted-foreground py-2.5 whitespace-nowrap">{item.tipo_projeto}</TableCell>
                        <TableCell className="text-[12px] font-semibold text-foreground py-2.5 whitespace-nowrap text-right">{item.proposta1 ? formatCurrency(item.proposta1) : <span className="text-muted-foreground/40">—</span>}</TableCell>
                        <TableCell className="text-[11px] text-muted-foreground py-2.5 whitespace-nowrap text-right">{item.proposta2 ? formatCurrency(item.proposta2) : <span className="text-muted-foreground/40">—</span>}</TableCell>
                        <TableCell className="py-2.5">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold cursor-pointer hover:opacity-80 transition-opacity ${cfg.badge}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />{item.status}<ChevronDown className="w-2.5 h-2.5 opacity-60" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="min-w-[130px]">
                              {["Fechou","Aguardando","Não Fechou"].map(s => (
                                <DropdownMenuItem key={s} onClick={() => changeStatus(item, s)} className={`text-xs ${item.status === s ? "font-semibold" : ""}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full mr-2 ${STATUS[s]?.dot}`} />{s}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                          {item.arquivo_url && (
                            <a href={item.arquivo_url} target="_blank" rel="noopener noreferrer" title={item.arquivo_nome || "Baixar anexo"} onClick={e => e.stopPropagation()}>
                              <Paperclip className="w-3 h-3 text-muted-foreground hover:text-primary inline-block ml-1 cursor-pointer transition-colors" />
                            </a>
                          )}
                        </TableCell>
                        <TableCell className="text-[11px] text-muted-foreground py-2.5">{item.fonte}</TableCell>
                        <TableCell className="py-2.5 w-14">
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditing(item); setShowForm(true); }} className="p-1 hover:bg-muted rounded-md transition-colors"><Pencil className="w-3 h-3 text-muted-foreground" /></button>
                            <button onClick={() => deleteM.mutate(item.id)} className="p-1 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="w-3 h-3 text-red-400" /></button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )
        }
      </div>
      <ComercialForm open={showForm} onClose={closeForm} onSave={handleSave} initialData={editing} nextNumero={nextNumero} saving={createM.isPending || updateM.isPending || ownerLoading} />
    </div>
  );
}
