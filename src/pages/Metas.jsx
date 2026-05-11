import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useOfficeOwner } from "@/hooks/useOfficeOwner";
import { Target, TrendingUp, Award, Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "../components/shared/PageHeader";
import { formatCurrency, formatPercent, getAnoAtual, MESES } from "../lib/formatters";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

export default function Metas() {
  const anoAtual = getAnoAtual();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ meta_ideal: 600000, meta_realista: 400000, meta_pessimista: 250000 });

  const { user } = useAuth();
  const { officeOwner } = useOfficeOwner();
  const { data: metas = [] } = useQuery({ queryKey: ["metas", officeOwner], queryFn: () => base44.entities.MetaAnual.filter({ office_owner: officeOwner }), enabled: !!officeOwner });
  const { data: entradas = [] } = useQuery({ queryKey: ["caixa-entrada", officeOwner], queryFn: () => base44.entities.CaixaEntrada.filter({ office_owner: officeOwner }), enabled: !!officeOwner });

  const metaAtual = metas.find(m => m.ano === anoAtual);
  useEffect(() => {
    if (metaAtual) setForm({ meta_ideal: metaAtual.meta_ideal || 600000, meta_realista: metaAtual.meta_realista || 400000, meta_pessimista: metaAtual.meta_pessimista || 250000 });
  }, [metaAtual]);

  const createM = useMutation({ mutationFn: d => base44.entities.MetaAnual.create(d), onSuccess: () => { qc.invalidateQueries({ queryKey: ["metas"] }); setEditing(false); } });
  const updateM = useMutation({ mutationFn: ({ id, data }) => base44.entities.MetaAnual.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["metas"] }); setEditing(false); } });

  const handleSave = () => {
    const data = { ano: anoAtual, meta_ideal: Number(form.meta_ideal), meta_realista: Number(form.meta_realista), meta_pessimista: Number(form.meta_pessimista) };
    metaAtual ? updateM.mutate({ id: metaAtual.id, data }) : createM.mutate({ ...data, office_owner: officeOwner });
  };

  const mi = metaAtual?.meta_ideal || form.meta_ideal;
  const mr = metaAtual?.meta_realista || form.meta_realista;
  const mp = metaAtual?.meta_pessimista || form.meta_pessimista;

  const faturado = entradas.filter(e => e.status !== "Cancelado").reduce((s, e) => s + (e.valor_mensal || 0), 0);

  // Acumulado por mês
  let acc = 0;
  const chartData = MESES.map(mes => {
    const val = entradas.filter(e => e.competencia === mes && e.status !== "Cancelado").reduce((s, e) => s + (e.valor_mensal || 0), 0);
    acc += val;
    return { mes: mes.substring(0, 3), acumulado: acc };
  });

  const metasConfig = [
    { label: "Meta Ideal", value: mi, color: "bg-emerald-500", track: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200 bg-emerald-50/50", icon: Award },
    { label: "Meta Realista", value: mr, color: "bg-blue-500", track: "bg-blue-100", text: "text-blue-700", border: "border-blue-200 bg-blue-50/50", icon: Target },
    { label: "Meta Pessimista", value: mp, color: "bg-amber-500", track: "bg-amber-100", text: "text-amber-700", border: "border-amber-200 bg-amber-50/50", icon: TrendingUp },
  ];

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      <PageHeader
        title={`Metas Anuais — ${anoAtual}`}
        subtitle="Acompanhamento de performance e objetivos"
        actions={
          editing ? (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditing(false)} className="h-8 text-xs gap-1.5 px-3"><X className="w-3 h-3" />Cancelar</Button>
              <Button size="sm" onClick={handleSave} className="bg-primary text-primary-foreground h-8 text-xs gap-1.5 px-3"><Save className="w-3 h-3" />Salvar Metas</Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)} className="h-8 text-xs gap-1.5 px-3"><Edit2 className="w-3 h-3" />Editar Metas</Button>
          )
        }
      />

      {/* Edit form */}
      {editing && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Configurar Metas {anoAtual}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[["meta_ideal", "Meta Ideal (R$)"], ["meta_realista", "Meta Realista (R$)"], ["meta_pessimista", "Meta Pessimista (R$)"]].map(([k, l]) => (
              <div key={k}>
                <Label className="text-[11px] font-semibold text-muted-foreground">{l}</Label>
                <Input type="number" value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} className="mt-1 h-8 text-sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hero faturamento */}
      <div className="bg-primary rounded-xl px-6 py-5 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] text-primary-foreground/60 font-semibold uppercase tracking-wider mb-1">Faturamento Acumulado {anoAtual}</p>
          <p className="text-[32px] font-bold text-primary-foreground leading-none">{formatCurrency(faturado)}</p>
          <p className="text-[12px] text-primary-foreground/60 mt-2">{formatPercent(Math.min((faturado / mi) * 100, 100))} da meta ideal atingido</p>
        </div>
        <div className="hidden sm:flex w-14 h-14 rounded-xl bg-primary-foreground/10 items-center justify-center">
          <TrendingUp className="w-7 h-7 text-primary-foreground/80" />
        </div>
      </div>

      {/* Meta cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metasConfig.map(m => {
          const pct = Math.min((faturado / m.value) * 100, 100);
          const falta = Math.max(0, m.value - faturado);
          return (
            <div key={m.label} className={`rounded-xl border px-5 py-5 space-y-4 ${m.border}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <m.icon className={`w-4 h-4 ${m.text}`} />
                  <p className={`text-[13px] font-semibold ${m.text}`}>{m.label}</p>
                </div>
                <p className={`text-[22px] font-bold leading-none ${m.text}`}>{pct.toFixed(0)}%</p>
              </div>
              <div className={`h-2 rounded-full ${m.track} overflow-hidden`}>
                <div className={`h-full rounded-full ${m.color} transition-all duration-700`} style={{ width: `${pct}%` }} />
              </div>
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <div>
                  <p className="text-muted-foreground">Meta</p>
                  <p className="font-bold text-foreground">{formatCurrency(m.value)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Faturado</p>
                  <p className={`font-bold ${m.text}`}>{formatCurrency(faturado)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Falta</p>
                  <p className="font-bold text-foreground">{formatCurrency(falta)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Evolution chart */}
      <Card className="border-border rounded-xl shadow-sm">
        <CardHeader className="px-5 pt-5 pb-2">
          <CardTitle className="text-[13px] font-semibold">Evolução do Faturamento Acumulado</CardTitle>
          <p className="text-[11px] text-muted-foreground">Comparado às metas anuais</p>
        </CardHeader>
        <CardContent className="px-1 pb-4">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData} margin={{ top: 10, right: 60, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gAcum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(218,18%,91%)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} width={36} />
              <Tooltip formatter={v => [formatCurrency(v), "Faturamento"]} contentStyle={{ fontSize: 11 }} />
              <ReferenceLine y={mi} stroke="#10b981" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: "Ideal", position: "insideRight", fontSize: 10, fill: "#10b981", dx: 4 }} />
              <ReferenceLine y={mr} stroke="#3b82f6" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: "Realista", position: "insideRight", fontSize: 10, fill: "#3b82f6", dx: 4 }} />
              <ReferenceLine y={mp} stroke="#f59e0b" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: "Pessimista", position: "insideRight", fontSize: 10, fill: "#f59e0b", dx: 4 }} />
              <Area type="monotone" dataKey="acumulado" stroke="#2d6a4f" strokeWidth={2.5} fill="url(#gAcum)" name="Faturamento" dot={false} activeDot={{ r: 4, fill: "#2d6a4f", strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}