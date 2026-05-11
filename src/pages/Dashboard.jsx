import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/apiService";
import { useAuth } from "@/lib/AuthContext";
import { useOfficeOwner } from "@/hooks/useOfficeOwner";
import { DollarSign, TrendingDown, TrendingUp, Users, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  ComposedChart, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar
} from "recharts";
import { formatCurrency, formatPercent, MESES, getAnoAtual } from "../lib/formatters";

const CHART_COLORS = {
  primary: "#2d6a4f",
  accent: "#d97706",
  red: "#ef4444",
  blue: "#3b82f6",
  amber: "#f59e0b",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-xl text-xs">
      <p className="font-semibold text-foreground mb-2.5 text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center justify-between gap-6 mb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
            <span className="text-muted-foreground">{p.name}</span>
          </div>
          <span className="font-bold text-foreground">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

const KpiCard = ({ title, value, subtitle, icon: Icon, colorClass, trend, trendPositive }) => (
  <div className="bg-card border border-border rounded-2xl px-5 py-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colorClass}`}>
        <Icon className="w-4 h-4" />
      </div>
      {trend && (
        <div className={`flex items-center gap-0.5 text-[11px] font-semibold ${trendPositive ? "text-emerald-600" : "text-red-500"}`}>
          {trendPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          {trend}
        </div>
      )}
    </div>
    <div>
      <p className="text-[22px] font-bold text-foreground leading-none tracking-tight">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1.5 font-medium">{title}</p>
      {subtitle && <p className="text-[10px] text-muted-foreground/60 mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const { officeOwner } = useOfficeOwner();
  const { data: entradas = [] } = useQuery({ queryKey: ["caixa-entrada", officeOwner], queryFn: () => api.entities.CaixaEntrada.filter({ office_owner: officeOwner }), enabled: !!officeOwner });
  const { data: saidas = [] } = useQuery({ queryKey: ["caixa-saida", officeOwner], queryFn: () => api.entities.CaixaSaida.filter({ office_owner: officeOwner }), enabled: !!officeOwner });
  const { data: comercial = [] } = useQuery({ queryKey: ["comercial", officeOwner], queryFn: () => api.entities.Commercial.filter({ office_owner: officeOwner }), enabled: !!officeOwner });
  const { data: metas = [] } = useQuery({ queryKey: ["metas", officeOwner], queryFn: () => api.entities.MetaAnual.filter({ office_owner: officeOwner }), enabled: !!officeOwner });

  const mesAtual = MESES[new Date().getMonth()];
  const mesAnterior = MESES[new Date().getMonth() > 0 ? new Date().getMonth() - 1 : 11];
  const anoAtual = getAnoAtual();

  const receitaMes = entradas.filter(e => e.competencia === mesAtual && (e.status === "Ativo" || e.status === "Finalizado")).reduce((s, e) => s + (e.valor_mensal || 0), 0);
  const receitaMesAnterior = entradas.filter(e => e.competencia === mesAnterior && (e.status === "Ativo" || e.status === "Finalizado")).reduce((s, e) => s + (e.valor_mensal || 0), 0);
  const despesaMes = saidas.filter(s => s.competencia === mesAtual).reduce((s, e) => s + (e.valor || 0), 0);
  const lucroLiquido = receitaMes - despesaMes;
  const margemLucro = receitaMes > 0 ? (lucroLiquido / receitaMes) * 100 : 0;
  const variacaoReceita = receitaMesAnterior > 0 ? ((receitaMes - receitaMesAnterior) / receitaMesAnterior) * 100 : 0;

  const clientesFechados = comercial.filter(c => c.status === "Fechou").length;
  const taxaConversao = comercial.length > 0 ? (clientesFechados / comercial.length) * 100 : 0;

  const faturamentoAcumulado = entradas.filter(e => e.status !== "Cancelado").reduce((s, e) => s + (e.valor_mensal || 0), 0);
  const metaAtual = metas.find(m => m.ano === anoAtual);
  const metaIdeal = metaAtual?.meta_ideal || 600000;
  const metaRealista = metaAtual?.meta_realista || 400000;
  const metaPessimista = metaAtual?.meta_pessimista || 250000;

  const cashflowData = MESES.map(mes => {
    const rec = entradas.filter(e => e.competencia === mes && (e.status === "Ativo" || e.status === "Finalizado")).reduce((s, e) => s + (e.valor_mensal || 0), 0);
    const desp = saidas.filter(s => s.competencia === mes).reduce((s, e) => s + (e.valor || 0), 0);
    return { mes: mes.substring(0, 3), Receita: rec, Despesa: desp, Lucro: rec - desp };
  });

  const pipelineData = [
    { name: "Fechou", value: comercial.filter(c => c.status === "Fechou").length, color: CHART_COLORS.primary },
    { name: "Aguardando", value: comercial.filter(c => c.status === "Aguardando").length, color: CHART_COLORS.amber },
    { name: "Não Fechou", value: comercial.filter(c => c.status === "Não Fechou").length, color: "#e2e8f0" },
  ];

  const despCat = {};
  saidas.forEach(s => { despCat[s.categoria] = (despCat[s.categoria] || 0) + s.valor; });
  const despCatData = Object.entries(despCat).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value }));

  const recentesFechados = comercial.filter(c => c.status === "Fechou").slice(0, 6);

  const metas3 = [
    { label: "Ideal", value: metaIdeal, color: "bg-emerald-500", track: "bg-emerald-100" },
    { label: "Realista", value: metaRealista, color: "bg-blue-500", track: "bg-blue-100" },
    { label: "Pessimista", value: metaPessimista, color: "bg-amber-400", track: "bg-amber-100" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      
      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <h2 className="text-lg font-bold text-[#1a3d2b] mr-4">Painel de Gestão</h2>
        {[
          { label: "Novo Cliente", icon: Users, link: "/comercial" },
          { label: "Registrar Obra", icon: Target, link: "/projetos-execucao" },
          { label: "Caixa Entrada", icon: TrendingUp, link: "/caixa-entrada" },
          { label: "Caixa Saída", icon: TrendingDown, link: "/caixa-saida" },
        ].map(action => (
          <a 
            key={action.label}
            href={action.link}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-100 rounded-xl text-xs font-semibold text-stone-600 hover:text-[#276a4d] hover:border-[#276a4d]/20 transition-all shadow-sm hover:shadow-md"
          >
            <action.icon className="w-3.5 h-3.5" />
            {action.label}
          </a>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div className="hover-lift">
          <KpiCard title="Receita do Mês" value={formatCurrency(receitaMes)} icon={TrendingUp}
            subtitle={`vs. ${mesAnterior}: ${receitaMesAnterior > 0 ? formatCurrency(receitaMesAnterior) : "—"}`}
            trend={`${variacaoReceita >= 0 ? "+" : ""}${variacaoReceita.toFixed(1)}%`}
            trendPositive={variacaoReceita >= 0} colorClass="bg-emerald-50 text-emerald-600" />
        </div>
        <div className="hover-lift">
          <KpiCard title="Despesas do Mês" value={formatCurrency(despesaMes)} icon={TrendingDown}
            subtitle={`${saidas.filter(s => s.competencia === mesAtual && !s.pago).length} pendentes`}
            colorClass="bg-red-50 text-red-500" />
        </div>
        <div className="hover-lift">
          <KpiCard title="Lucro Líquido" value={formatCurrency(lucroLiquido)} icon={DollarSign}
            subtitle={`Margem: ${margemLucro.toFixed(1)}%`}
            trendPositive={lucroLiquido >= 0} colorClass="bg-primary/10 text-primary" />
        </div>
        <div className="hover-lift">
          <KpiCard title="Conversão Comercial" value={`${taxaConversao.toFixed(0)}%`} icon={Users}
            subtitle={`${clientesFechados} de ${comercial.length} propostas`}
            colorClass="bg-blue-50 text-blue-600" />
        </div>
        <div className="hover-lift">
          <KpiCard title="Meta Ideal" value={`${Math.min((faturamentoAcumulado / metaIdeal) * 100, 100).toFixed(0)}%`} icon={Target}
            subtitle={`${formatCurrency(faturamentoAcumulado)} de ${formatCurrency(metaIdeal)}`}
            colorClass="bg-amber-50 text-amber-600" />
        </div>
      </div>

      {/* Row 1: Cashflow + Pipeline */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Cashflow */}
        <div className="xl:col-span-2 bg-card border border-border rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[13px] font-semibold text-foreground">Fluxo de Caixa — {anoAtual}</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Receitas, despesas e lucro mensal</p>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-3 h-[2px] rounded bg-emerald-500 inline-block" />Receita</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-[2px] rounded bg-red-400 inline-block" />Despesa</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary/30 inline-block" />Lucro</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={cashflowData} margin={{ top: 5, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gRec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gDesp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(218,18%,93%)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} width={36} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(218,18%,90%)", strokeWidth: 1 }} />
              <Bar dataKey="Lucro" radius={[3, 3, 0, 0]}
                shape={(props) => {
                  const { x, y, width, height, value } = props;
                  const isNeg = value < 0;
                  const fill = isNeg ? "#fca5a5" : "#2d6a4f40";
                  return <rect x={x} y={isNeg ? y + height : y} width={width} height={Math.abs(height)} fill={fill} rx={3} />;
                }}
              />
              <Area type="monotone" dataKey="Receita" stroke="#2d6a4f" strokeWidth={2} fill="url(#gRec)" dot={false} activeDot={{ r: 4, fill: "#2d6a4f", strokeWidth: 0 }} />
              <Area type="monotone" dataKey="Despesa" stroke="#ef4444" strokeWidth={2} fill="url(#gDesp)" dot={false} activeDot={{ r: 4, fill: "#ef4444", strokeWidth: 0 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Pipeline */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-5">
          <h3 className="text-[13px] font-semibold text-foreground">Pipeline Comercial</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 mb-3">{comercial.length} propostas no total</p>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={pipelineData} cx="50%" cy="50%" innerRadius={44} outerRadius={64} paddingAngle={3} dataKey="value" strokeWidth={0}>
                  {pipelineData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ fontSize: 11, borderRadius: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2.5 mt-2">
            {pipelineData.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="text-[12px] text-muted-foreground">{s.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-bold text-foreground">{s.value}</span>
                  <span className="text-[10px] text-muted-foreground/60 w-8 text-right">{comercial.length > 0 ? ((s.value / comercial.length) * 100).toFixed(0) : 0}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Despesas + Metas + Fechamentos */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Top despesas */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-5">
          <h3 className="text-[13px] font-semibold text-foreground">Top Categorias de Despesa</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 mb-4">Acumulado anual</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={despCatData} layout="vertical" margin={{ top: 0, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(218,18%,93%)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} width={82} />
              <Tooltip formatter={v => [formatCurrency(v), "Total"]} contentStyle={{ fontSize: 11, borderRadius: 10 }} />
              <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Metas */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-5">
          <h3 className="text-[13px] font-semibold text-foreground">Progresso de Metas {anoAtual}</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 mb-5">Faturado: {formatCurrency(faturamentoAcumulado)}</p>
          <div className="space-y-5">
            {metas3.map(meta => {
              const pct = Math.min((faturamentoAcumulado / meta.value) * 100, 100);
              return (
                <div key={meta.label}>
                  <div className="flex justify-between text-[11px] mb-2">
                    <span className="font-medium text-muted-foreground">Meta {meta.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{pct.toFixed(0)}%</span>
                      <span className="text-muted-foreground/50">{formatCurrency(meta.value)}</span>
                    </div>
                  </div>
                  <div className={`h-2 rounded-full ${meta.track} overflow-hidden`}>
                    <div className={`h-full rounded-full ${meta.color} transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Últimos fechamentos */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-5">
          <h3 className="text-[13px] font-semibold text-foreground">Últimos Fechamentos</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 mb-4">Negócios convertidos</p>
          {recentesFechados.length === 0 ? (
            <p className="text-[12px] text-muted-foreground text-center py-8">Nenhum fechamento</p>
          ) : (
            <div className="space-y-3">
              {recentesFechados.map((c, i) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-emerald-600">{String(c.numero || i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-foreground truncate leading-tight">{c.nome_cliente}</p>
                    <p className="text-[10px] text-muted-foreground">{c.tipo_projeto} · {c.mes}</p>
                  </div>
                  <p className="text-[12px] font-bold text-emerald-600 flex-shrink-0">{c.proposta1 ? formatCurrency(c.proposta1) : "—"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
