import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useCanEdit } from "@/hooks/useCanEdit";
import { useOfficeOwner } from "@/hooks/useOfficeOwner";
import { Plus, Pencil, Trash2, Search, AlertTriangle, RefreshCw, Paperclip, Crown, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import PageHeader from "../components/shared/PageHeader";
import EmptyState from "../components/shared/EmptyState";
import SaidaForm from "../components/caixa/SaidaForm";
import { formatCurrency } from "../lib/formatters";
import { format, isPast, isWithinInterval, addDays } from "date-fns";

const TIPO = {
  "Fixa":     "bg-blue-50 text-blue-700 border-blue-200",
  "Variável": "bg-violet-50 text-violet-700 border-violet-200",
};

export default function CaixaSaida() {
  const { user } = useAuth();
  const { canEdit, loading: subLoading } = useCanEdit();
  const { officeOwner, isLoading: ownerLoading } = useOfficeOwner();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState([]);
  const [filterComp, setFilterComp] = useState([]);
  const [filterPago, setFilterPago] = useState([]);
  const [filterAno, setFilterAno] = useState([]);
  const [sortKey, setSortKey] = useState("vencimento");
  const [sortDir, setSortDir] = useState("asc");
  const [activeCard, setActiveCard] = useState(null);
  const [filterVenc, setFilterVenc] = useState("proximos30");
  const qc = useQueryClient();

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const { data: items = [] } = useQuery({
    queryKey: ["caixa-saida", officeOwner],
    queryFn: () => base44.entities.CaixaSaida.filter({ office_owner: officeOwner }),
    enabled: !!officeOwner && !ownerLoading,
  });
  const closeForm = () => { setShowForm(false); setEditing(null); };
  const createM = useMutation({ mutationFn: d => base44.entities.CaixaSaida.create(d), onSuccess: () => { qc.invalidateQueries({ queryKey: ["caixa-saida"] }); closeForm(); } });
  const updateM = useMutation({ mutationFn: ({ id, data }) => base44.entities.CaixaSaida.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["caixa-saida"] }); closeForm(); } });
  const deleteM = useMutation({ mutationFn: id => base44.entities.CaixaSaida.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["caixa-saida"] }) });

  const handleSave = async (d) => {
    if (editing) {
      updateM.mutate({ id: editing.id, data: d });
      return;
    }
    if (d.recorrente) {
      const MESES_ORDER = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
      const mesInicio = d.competencia ? MESES_ORDER.indexOf(d.competencia) : 0;
      const anoAtual = new Date().getFullYear();
      const registros = MESES_ORDER.slice(mesInicio).map((mes, i) => {
        const mesIdx = mesInicio + i;
        let vencimento = d.vencimento;
        if (vencimento) {
          const diaVenc = new Date(vencimento).getUTCDate();
          const novaData = new Date(anoAtual, mesIdx, diaVenc);
          vencimento = novaData.toISOString().split("T")[0];
        }
        return { ...d, competencia: mes, vencimento, office_owner: officeOwner };
      });
      await base44.entities.CaixaSaida.bulkCreate(registros);
      qc.invalidateQueries({ queryKey: ["caixa-saida"] });
      closeForm();
    } else {
      createM.mutate({ ...d, office_owner: officeOwner });
    }
  };
  const togglePago = item => updateM.mutate({ id: item.id, data: { ...item, pago: !item.pago } });

  const MESES_ORDER = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

  const isVencido = (v, p, competencia) => {
    if (p) return false;
    // Se tem data de vencimento, usa ela
    if (v) {
      const d = new Date(v);
      d.setHours(23, 59, 59, 999);
      return isPast(d);
    }
    // Fallback: usa competência (mês anterior ao atual = vencido)
    if (competencia) {
      const idx = MESES_ORDER.indexOf(competencia);
      return idx !== -1 && idx < new Date().getMonth();
    }
    return false;
  };
  const isProximo = (v, p) => {
    if (!v || p) return false;
    const d = new Date(v); return !isPast(d) && isWithinInterval(d, { start: new Date(), end: addDays(new Date(), 7) });
  };


  const competencias = MESES_ORDER.filter(m => items.some(i => i.competencia === m));
  const anos = [...new Set(items.map(i => i.vencimento ? new Date(i.vencimento).getFullYear() : null).filter(Boolean))].sort((a,b) => b - a);

  const toggle = (setter, val) => setter(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  const now = new Date();
  const in30 = addDays(now, 30);

  const vencFilter = (i) => {
    if (filterVenc !== "proximos30") return true;
    if (i.pago) return false;
    if (i.vencimento) {
      const d = new Date(i.vencimento);
      return isPast(d) || isWithinInterval(d, { start: now, end: in30 });
    }
    // fallback: competência do mês atual ou anterior
    const idx = MESES_ORDER.indexOf(i.competencia);
    return idx !== -1 && idx <= now.getMonth();
  };

  const filtered = items.filter(i => {
    const m = i.categoria?.toLowerCase().includes(search.toLowerCase()) || i.descricao?.toLowerCase().includes(search.toLowerCase());
    const tipoOk = filterTipo.length === 0 || filterTipo.includes(i.tipo);
    const compOk = filterComp.length === 0 || filterComp.includes(i.competencia);
    const pagoOk = filterPago.length === 0 || filterPago.includes(i.pago ? "pago" : "pendente");
    const anoOk = filterAno.length === 0 || (i.vencimento && filterAno.includes(String(new Date(i.vencimento).getFullYear())));
    const cardOk = !activeCard
      || (activeCard === "pago" && i.pago)
      || (activeCard === "apagar" && !i.pago)
      || (activeCard === "vencidos" && isVencido(i.vencimento, i.pago, i.competencia));
    return m && tipoOk && compOk && pagoOk && anoOk && cardOk && vencFilter(i);
  }).sort((a, b) => {
    if (!sortKey) return 0;
    if (sortKey === "competencia") {
      const ai = MESES_ORDER.indexOf(a.competencia ?? "");
      const bi = MESES_ORDER.indexOf(b.competencia ?? "");
      return sortDir === "asc" ? ai - bi : bi - ai;
    }
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
    return sortDir === "asc" ? cmp : -cmp;
  });

  const vencidos = filtered.filter(i => isVencido(i.vencimento, i.pago, i.competencia)).length;
  const valorVencidos = filtered.filter(i => isVencido(i.vencimento, i.pago, i.competencia)).reduce((s, i) => s + (i.valor || 0), 0);

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-4">
      <PageHeader
        title="Caixa Saída"
        subtitle="Controle de despesas e pagamentos"
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
              disabled={!subLoading && !canEdit}
            >
              <Plus className="w-3.5 h-3.5" /> Nova Despesa
            </Button>
          </div>
        }
      />

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: null, label: "Total Despesas", value: formatCurrency(filtered.reduce((s, i) => s + (i.valor || 0), 0)), sub: `${filtered.length} lançamentos`, base: "border-border bg-card", active: "ring-2 ring-foreground/30" },
          { id: "pago", label: "Pago", value: formatCurrency(filtered.filter(i => i.pago).reduce((s, i) => s + (i.valor || 0), 0)), sub: `${filtered.filter(i => i.pago).length} itens`, base: "border-emerald-100 bg-emerald-50/60", active: "ring-2 ring-emerald-400" },
          { id: "apagar", label: "A Pagar", value: formatCurrency(filtered.filter(i => !i.pago).reduce((s, i) => s + (i.valor || 0), 0)), sub: `${filtered.filter(i => !i.pago).length} itens`, base: "border-amber-100 bg-amber-50/60", active: "ring-2 ring-amber-400" },
        ].map(s => (
          <div
            key={s.label}
            onClick={() => setActiveCard(prev => prev === s.id ? null : s.id)}
            className={`rounded-xl border px-4 py-3 cursor-pointer transition-all ${s.base} ${activeCard === s.id ? s.active : "hover:shadow-sm"}`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">{s.label}</p>
            <p className="text-[20px] font-bold text-foreground leading-none">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
        {/* Card Vencidos */}
        <div
          onClick={() => setActiveCard(prev => prev === "vencidos" ? null : "vencidos")}
          className={`rounded-2xl border px-5 py-4 cursor-pointer transition-all ${vencidos > 0 ? "border-red-200 bg-red-50/60" : "border-border bg-card"} ${activeCard === "vencidos" ? "ring-2 ring-red-400" : "hover:shadow-sm"}`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Vencidos</p>
          <p className={`text-[22px] font-bold leading-none tracking-tight ${vencidos > 0 ? "text-red-600" : "text-foreground"}`}>{formatCurrency(valorVencidos)}</p>
          <p className="text-[11px] text-muted-foreground mt-1.5">{vencidos} {vencidos === 1 ? "item" : "itens"} não pago(s)</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/20">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
            <Input placeholder="Buscar categoria ou descrição..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 h-7 text-xs bg-background" />
          </div>

          {/* Filtro Ano */}
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

          {/* Filtro Competência */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-md border text-xs bg-background hover:bg-muted transition-colors ${filterComp.length > 0 ? "border-primary text-primary font-semibold" : "border-input text-muted-foreground"}`}>
                Mês{filterComp.length > 0 ? ` (${filterComp.length})` : ""} <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[140px] p-1 max-h-60 overflow-y-auto">
              {competencias.map(c => (
                <button key={c} onClick={() => toggle(setFilterComp, c)} className="flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded hover:bg-muted transition-colors">
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${filterComp.includes(c) ? "bg-primary border-primary" : "border-input"}`}>
                    {filterComp.includes(c) && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                  </div>
                  {c}
                </button>
              ))}
              {filterComp.length > 0 && <button onClick={() => setFilterComp([])} className="w-full text-xs text-muted-foreground hover:text-foreground mt-1 py-1 border-t border-border">Limpar</button>}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filtro Tipo */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-md border text-xs bg-background hover:bg-muted transition-colors ${filterTipo.length > 0 ? "border-primary text-primary font-semibold" : "border-input text-muted-foreground"}`}>
                Tipo{filterTipo.length > 0 ? ` (${filterTipo.length})` : ""} <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[120px] p-1">
              {["Fixa", "Variável"].map(t => (
                <button key={t} onClick={() => toggle(setFilterTipo, t)} className="flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded hover:bg-muted transition-colors">
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${filterTipo.includes(t) ? "bg-primary border-primary" : "border-input"}`}>
                    {filterTipo.includes(t) && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                  </div>
                  {t}
                </button>
              ))}
              {filterTipo.length > 0 && <button onClick={() => setFilterTipo([])} className="w-full text-xs text-muted-foreground hover:text-foreground mt-1 py-1 border-t border-border">Limpar</button>}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filtro Status Pago */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-md border text-xs bg-background hover:bg-muted transition-colors ${filterPago.length > 0 ? "border-primary text-primary font-semibold" : "border-input text-muted-foreground"}`}>
                Status{filterPago.length > 0 ? ` (${filterPago.length})` : ""} <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[120px] p-1">
              {[{val:"pago",label:"Pago"},{val:"pendente",label:"Não Pago"}].map(o => (
                <button key={o.val} onClick={() => toggle(setFilterPago, o.val)} className="flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded hover:bg-muted transition-colors">
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${filterPago.includes(o.val) ? "bg-primary border-primary" : "border-input"}`}>
                    {filterPago.includes(o.val) && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                  </div>
                  {o.label}
                </button>
              ))}
              {filterPago.length > 0 && <button onClick={() => setFilterPago([])} className="w-full text-xs text-muted-foreground hover:text-foreground mt-1 py-1 border-t border-border">Limpar</button>}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => setFilterVenc(v => v === "proximos30" ? "todos" : "proximos30")}
            className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-md border text-xs transition-colors ${filterVenc === "proximos30" ? "border-primary bg-primary/10 text-primary font-semibold" : "border-input bg-background text-muted-foreground hover:bg-muted"}`}
          >
            {filterVenc === "proximos30" ? "Vencidos + 30 dias ✕" : "Vencidos + 30 dias"}
          </button>
          <span className="text-[11px] text-muted-foreground ml-auto">{filtered.length} resultado(s)</span>
        </div>

        {filtered.length === 0
          ? <EmptyState title="Nenhuma despesa" description="Cadastre sua primeira despesa." />
          : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border">
                    {[
                      { label: "Tipo", key: "tipo" },
                      { label: "Categoria", key: "categoria" },
                      { label: "Descrição", key: "descricao" },
                      { label: "Valor", key: "valor" },
                      { label: "Vencimento", key: "vencimento" },
                      { label: "Competência", key: "competencia" },
                      { label: "Rec.", key: null },
                      { label: "Pago", key: "pago" },
                      { label: "Responsável", key: "responsavel" },
                      { label: "", key: null },
                    ].map(({ label, key }) => (
                      <TableHead
                        key={label}
                        className={`text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 py-2.5 ${key ? "cursor-pointer select-none hover:text-foreground" : ""}`}
                        onClick={() => key && handleSort(key)}
                      >
                        {label}{key && sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(item => {
                    const venc = isVencido(item.vencimento, item.pago, item.competencia);
                    const prox = isProximo(item.vencimento, item.pago);
                    return (
                      <TableRow key={item.id} className={`border-b border-border/50 group transition-colors ${venc ? "bg-red-50/30 hover:bg-red-50/50" : "hover:bg-muted/30"}`}>
                        <TableCell className="py-2.5">
                          <Badge variant="outline" className={`text-[10px] font-semibold py-0.5 ${TIPO[item.tipo] || TIPO["Variável"]}`}>{item.tipo}</Badge>
                        </TableCell>
                        <TableCell className="text-[12px] font-medium text-foreground py-2.5 whitespace-nowrap">{item.categoria}</TableCell>
                        <TableCell className="text-[11px] text-muted-foreground py-2.5 max-w-[180px] truncate">{item.descricao}</TableCell>
                        <TableCell className="text-[12px] font-bold text-foreground py-2.5 whitespace-nowrap">{formatCurrency(item.valor)}</TableCell>
                        <TableCell className="py-2.5 whitespace-nowrap">
                          <span className={`text-[11px] flex items-center gap-1 ${venc ? "text-red-600 font-semibold" : prox ? "text-amber-600 font-medium" : "text-muted-foreground"}`}>
                            {item.vencimento ? format(new Date(item.vencimento + "T00:00:00"), "dd/MM/yy") : "—"}
                            {(venc || prox) && <AlertTriangle className="w-3 h-3 flex-shrink-0" />}
                          </span>
                        </TableCell>
                        <TableCell className="text-[11px] text-muted-foreground py-2.5">{item.competencia}</TableCell>
                        <TableCell className="py-2.5">{item.recorrente ? <RefreshCw className="w-3 h-3 text-primary/70" /> : <span className="text-muted-foreground/30 text-xs">—</span>}</TableCell>
                        <TableCell className="py-2.5">
                          <Switch checked={!!item.pago} onCheckedChange={() => togglePago(item)} className="scale-[0.7] origin-left" />
                        </TableCell>
                        <TableCell className="text-[11px] text-muted-foreground py-2.5">
                          <span className="flex items-center gap-1">
                            {item.responsavel}
                            {item.arquivo_url && (
                              <a href={item.arquivo_url} target="_blank" rel="noopener noreferrer" title={item.arquivo_nome || "Baixar anexo"} onClick={e => e.stopPropagation()}>
                                <Paperclip className="w-3 h-3 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                              </a>
                            )}
                          </span>
                        </TableCell>
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
          )
        }
      </div>

      <SaidaForm open={showForm} onClose={closeForm} onSave={handleSave} initialData={editing} saving={createM.isPending || updateM.isPending || ownerLoading} />
    </div>
  );
}