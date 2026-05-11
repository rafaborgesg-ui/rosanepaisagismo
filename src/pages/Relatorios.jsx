import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/apiService";
import { useAuth } from "@/lib/AuthContext";
import { useOfficeOwner } from "@/hooks/useOfficeOwner";
import { FileSpreadsheet, TrendingUp, TrendingDown, DollarSign, BarChart3, Download, Clock, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, MESES, getAnoAtual } from "../lib/formatters";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";

const STATUS_BADGE = {
  "Ativo":      "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Finalizado": "bg-slate-100 text-slate-600 border-slate-200",
  "Pendente":   "bg-amber-50 text-amber-700 border-amber-200",
  "Cancelado":  "bg-red-50 text-red-600 border-red-200",
};

const KpiCard = ({ label, value, sub, icon: Icon, iconColorClass, borderClass }) => (
  <div className={`rounded-2xl border px-4 py-3.5 flex flex-col gap-1.5 ${borderClass}`}>
    <div className="flex items-center gap-1.5">
      <Icon className={`w-3.5 h-3.5 ${iconColorClass}`} />
      <p className="text-[11px] font-semibold text-muted-foreground">{label}</p>
    </div>
    <p className={`text-[20px] font-bold leading-none tracking-tight ${iconColorClass}`}>{value}</p>
    <p className="text-[10px] text-muted-foreground/70">{sub}</p>
  </div>
);

export default function Relatorios() {
  const { user } = useAuth();
  const { officeOwner } = useOfficeOwner();
  const [mes, setMes] = useState(MESES[new Date().getMonth()]);

  const { data: entradas = [] } = useQuery({ queryKey: ["caixa-entrada", officeOwner], queryFn: () => api.entities.CaixaEntrada.filter({ office_owner: officeOwner }), enabled: !!officeOwner });
  const { data: saidas = [] } = useQuery({ queryKey: ["caixa-saida", officeOwner], queryFn: () => api.entities.CaixaSaida.filter({ office_owner: officeOwner }), enabled: !!officeOwner });
  const { data: comercial = [] } = useQuery({ queryKey: ["comercial", officeOwner], queryFn: () => api.entities.Commercial.filter({ office_owner: officeOwner }), enabled: !!officeOwner });

  const isTodos = mes === "Todos";
  const entradasMes = entradas.filter(e => isTodos || e.competencia === mes);
  const saidasMes = saidas.filter(s => isTodos || s.competencia === mes);
  const comercialMes = comercial.filter(c => isTodos || c.mes === mes);

  // Entradas pagas (recebidas)
  const entradasPagas = entradasMes.filter(e => e.pago);
  // Entradas não pagas (a receber)
  const entradasAReceber = entradasMes.filter(e => !e.pago && (e.status === "Ativo" || e.status === "Pendente"));
  // Saídas pagas
  const saidasPagas = saidasMes.filter(s => s.pago);
  // Saídas não pagas (a pagar)
  const saidasAPagar = saidasMes.filter(s => !s.pago);

  const totalReceitas = entradasPagas.reduce((s, e) => s + (e.valor_mensal || 0), 0);
  const totalDespesas = saidasPagas.reduce((s, e) => s + (e.valor || 0), 0);
  const totalAReceber = entradasAReceber.reduce((s, e) => s + (e.valor_mensal || 0), 0);
  const totalAPagar = saidasAPagar.reduce((s, e) => s + (e.valor || 0), 0);
  // Resultado do período = (recebido + a receber) - (pago + a pagar)
  const lucro = (totalReceitas + totalAReceber) - (totalDespesas + totalAPagar);
  const totalEntradas = totalReceitas + totalAReceber;
  const margem = totalEntradas > 0 ? (lucro / totalEntradas) * 100 : 0;

  const despCat = {};
  saidasMes.forEach(s => { despCat[s.categoria] = (despCat[s.categoria] || 0) + s.valor; });
  const despCatData = Object.entries(despCat).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  const exportCSV = (data, filename) => {
    if (!data.length) return;
    const keys = Object.keys(data[0]).filter(k => k !== "id" && !k.startsWith("created_") && !k.startsWith("updated_"));
    const csv = [keys.join(";"), ...data.map(r => keys.map(k => r[k] ?? "").join(";"))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${filename}_${mes}_${getAnoAtual()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const lucroPositive = lucro >= 0;

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[18px] font-bold text-foreground leading-tight">Relatórios</h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">Análise mensal de resultados</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={mes} onValueChange={setMes}>
            <SelectTrigger className="h-9 w-36 text-xs bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos os meses</SelectItem>
              {MESES.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs" onClick={() => exportCSV(entradasMes, "receitas")}>
            <Download className="w-3.5 h-3.5" /> Exportar
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="bg-card border border-border rounded-2xl px-5 py-4">
        <h2 className="text-base font-bold text-foreground mb-1">Financeiro</h2>
        <p className="text-xs text-muted-foreground mb-4">Controle completo de entradas, saídas e fluxo de caixa</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <KpiCard label="Entradas" value={formatCurrency(totalReceitas)} sub="Somente recebidos"
            icon={TrendingUp} iconColorClass="text-emerald-600" borderClass="border-emerald-100 bg-emerald-50/50" />
          <KpiCard label="Saídas" value={formatCurrency(totalDespesas)} sub="Somente pagos"
            icon={TrendingDown} iconColorClass="text-red-500" borderClass="border-red-100 bg-red-50/50" />
          <KpiCard label="A Receber" value={formatCurrency(entradasAReceber.reduce((s,e)=>s+(e.valor_mensal||0),0))} sub={`${entradasAReceber.length} pendente(s)`}
            icon={Clock} iconColorClass="text-amber-500" borderClass="border-amber-100 bg-amber-50/50" />
          <KpiCard label="A Pagar" value={formatCurrency(saidasAPagar.reduce((a,s)=>a+(s.valor||0),0))} sub={`${saidasAPagar.length} pendente(s)`}
            icon={Wallet} iconColorClass="text-orange-500" borderClass="border-orange-100 bg-orange-50/50" />
          <KpiCard label="Resultado do Período" value={formatCurrency(lucro)} sub={`Entradas - Saídas · Margem: ${margem.toFixed(0)}%`}
            icon={BarChart3} iconColorClass={lucroPositive ? "text-primary" : "text-red-500"} borderClass={lucroPositive ? "border-primary/10 bg-primary/5" : "border-red-100 bg-red-50/50"} />
          <KpiCard label="Saldo Real" value={formatCurrency(totalReceitas - totalDespesas)} sub="Recebido - pago"
            icon={DollarSign} iconColorClass="text-slate-600" borderClass="border-slate-200 bg-slate-50/50" />
          <KpiCard label="Comercial" value={`${comercialMes.filter(c=>c.status==="Fechou").length}/${comercialMes.length}`}
            sub="fechados / total" icon={BarChart3} iconColorClass="text-blue-600" borderClass="border-blue-100 bg-blue-50/50" />
        </div>
      </div>

      {/* Export actions */}
      <div className="flex flex-wrap items-center gap-2 px-5 py-3 bg-card border border-border rounded-2xl">
        <span className="text-[11px] font-semibold text-muted-foreground mr-1 flex items-center gap-1.5">
          <FileSpreadsheet className="w-3.5 h-3.5" /> Exportar dados de {mes}:
        </span>
        {[
          { label: "Receitas", data: entradasMes, key: "receitas" },
          { label: "Despesas", data: saidasMes, key: "despesas" },
          { label: "Comercial", data: comercialMes, key: "comercial" },
        ].map(e => (
          <Button key={e.key} variant="outline" size="sm" onClick={() => exportCSV(e.data, e.key)} className="h-7 text-xs gap-1.5 px-3 bg-background">
            {e.label}
          </Button>
        ))}
      </div>

      {/* Receitas chart — full width */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[13px] font-semibold text-foreground">Receitas por Cliente</span>
          </div>
          <span className="text-[11px] text-muted-foreground font-medium">{formatCurrency(totalReceitas)}</span>
        </div>
        <div className="p-5">
          {(() => {
            const recCatData = Object.entries(
              entradasMes.reduce((acc, e) => { acc[e.cliente] = (acc[e.cliente] || 0) + (e.valor_mensal || 0); return acc; }, {})
            ).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
            const chartHeight = Math.max(220, recCatData.length * 40);
            const yAxisWidth = Math.min(200, Math.max(100, Math.max(...recCatData.map(d => d.name?.length || 0)) * 7));
            return recCatData.length > 0 ? (
              <ResponsiveContainer width="100%" height={chartHeight}>
                <BarChart data={recCatData} layout="vertical" margin={{ top: 0, right: 60, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(218,18%,93%)" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(1)}k`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} width={yAxisWidth} />
                  <Tooltip formatter={v => [formatCurrency(v), "Valor"]} contentStyle={{ fontSize: 11, borderRadius: 10 }} />
                  <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]}>
                    <LabelList dataKey="value" position="right" style={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }}
                      formatter={v => totalReceitas > 0 ? `${((v / totalReceitas) * 100).toFixed(1)}%` : ""} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-[12px] text-muted-foreground">Sem receitas em {mes}</div>
            );
          })()}
        </div>
      </div>

      {/* Receitas table — full width */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[13px] font-semibold text-foreground">Receitas — {mes}</span>
          </div>
          <span className="text-[11px] text-muted-foreground font-medium">{formatCurrency(totalReceitas)}</span>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20 border-b border-border">
                {["Cliente", "Categoria", "Vlr Total", "Vlr Mensal", "Status"].map(h => (
                  <TableHead key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 py-3">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {entradasMes.length === 0
                ? <TableRow><TableCell colSpan={5} className="text-center text-[12px] text-muted-foreground py-14">Sem receitas em {mes}</TableCell></TableRow>
                : entradasMes.map(e => (
                  <TableRow key={e.id} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
                    <TableCell className="text-[12px] font-semibold text-foreground py-3">{e.cliente}</TableCell>
                    <TableCell className="text-[11px] text-muted-foreground py-3">{e.categoria}</TableCell>
                    <TableCell className="text-[12px] font-bold text-foreground py-3 whitespace-nowrap">{formatCurrency(e.valor_total)}</TableCell>
                    <TableCell className="text-[12px] font-semibold text-emerald-700 py-3 whitespace-nowrap">{formatCurrency(e.valor_mensal)}</TableCell>
                    <TableCell className="py-3">
                      <Badge variant="outline" className={`text-[10px] py-0.5 ${STATUS_BADGE[e.status] || ""}`}>{e.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Despesas chart — full width */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[13px] font-semibold text-foreground">Despesas por Categoria</span>
          </div>
          <span className="text-[11px] text-muted-foreground font-medium">{formatCurrency(totalDespesas)}</span>
        </div>
        <div className="p-5">
          {despCatData.length > 0 ? (() => {
            const despHeight = Math.max(220, despCatData.length * 40);
            const despYAxisWidth = Math.min(200, Math.max(100, Math.max(...despCatData.map(d => d.name?.length || 0)) * 7));
            return (
            <ResponsiveContainer width="100%" height={despHeight}>
              <BarChart data={despCatData} layout="vertical" margin={{ top: 0, right: 60, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(218,18%,93%)" />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(1)}k`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} width={despYAxisWidth} />
                <Tooltip formatter={v => [formatCurrency(v), "Total"]} contentStyle={{ fontSize: 11, borderRadius: 10 }} />
                <Bar dataKey="value" fill="#ef4444" radius={[0, 4, 4, 0]}>
                  <LabelList dataKey="value" position="right" style={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }}
                    formatter={v => totalDespesas > 0 ? `${((v / totalDespesas) * 100).toFixed(1)}%` : ""} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            );
          })() : (
            <div className="h-[220px] flex items-center justify-center text-[12px] text-muted-foreground">Sem despesas em {mes}</div>
          )}
        </div>
      </div>

      {/* Despesas detail table */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[13px] font-semibold text-foreground">Detalhamento de Despesas — {mes}</span>
          </div>
          <span className="text-[11px] text-muted-foreground">{saidasMes.length} lançamentos</span>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20 border-b border-border">
                {["Tipo", "Categoria", "Descrição", "Valor", "Status"].map(h => (
                  <TableHead key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 py-3">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {saidasMes.length === 0
                ? <TableRow><TableCell colSpan={5} className="text-center text-[12px] text-muted-foreground py-14">Sem despesas em {mes}</TableCell></TableRow>
                : saidasMes.map(s => (
                  <TableRow key={s.id} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
                    <TableCell className="py-3">
                      <Badge variant="outline" className={`text-[10px] py-0.5 ${s.tipo === "Fixa" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-violet-50 text-violet-700 border-violet-200"}`}>{s.tipo}</Badge>
                    </TableCell>
                    <TableCell className="text-[12px] font-medium text-foreground py-3">{s.categoria}</TableCell>
                    <TableCell className="text-[11px] text-muted-foreground py-3">{s.descricao}</TableCell>
                    <TableCell className="text-[12px] font-bold text-foreground py-3 whitespace-nowrap">{formatCurrency(s.valor)}</TableCell>
                    <TableCell className="py-3">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${s.pago ? "text-emerald-600" : "text-amber-600"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.pago ? "bg-emerald-500" : "bg-amber-400"}`} />
                        {s.pago ? "Pago" : "Pendente"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
