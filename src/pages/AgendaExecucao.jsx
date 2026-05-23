import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/apiService";
import { useAuth } from "@/lib/AuthContext";
import { useOfficeOwner } from "@/hooks/useOfficeOwner";
import { Calendar, CheckCircle } from "lucide-react";
import PageHeader from "../components/shared/PageHeader";
import EmptyState from "../components/shared/EmptyState";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getMonth, getYear, isToday, isSameDay, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const ATIVIDADE_CORES = {
  "Pedido de Plantas": "bg-blue-50 text-blue-700 border-blue-200",
  "Compra de Materiais": "bg-purple-50 text-purple-700 border-purple-200",
  "Preparação do Terreno": "bg-amber-50 text-amber-700 border-amber-200",
  "Plantio": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Manutenção": "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Entrega do Projeto": "bg-green-50 text-green-700 border-green-200",
};

export default function AgendaExecucao() {
  const { user } = useAuth();
  const { officeOwner } = useOfficeOwner();
  const [currentDate, setCurrentDate] = useState(new Date());
  const qc = useQueryClient();

  const { data: projetos = [] } = useQuery({
    queryKey: ["projetos-execucao", officeOwner],
    queryFn: () => api.entities.ProjetoExecucao.filter({ office_owner: officeOwner }),
    enabled: !!officeOwner,
  });

  const { data: cronogramas = [] } = useQuery({
    queryKey: ["cronogramas-execucao", officeOwner],
    queryFn: async () => {
      const projectIds = projetos.map(p => p.id);
      const all = await api.entities.CronogramaExecucao.list();
      return all.filter(c => projectIds.includes(c.projeto_id));
    },
    enabled: !!officeOwner && projetos.length > 0,
  });

  const projetoMap = Object.fromEntries(projetos.map(p => [p.id, p]));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getCronogramasForDay = (day) => {
    const cronogramItems = cronogramas.filter(c => {
      const inicio = parseISO(c.data_inicio);
      const fim = parseISO(c.data_fim);
      return (isSameDay(day, inicio) || isSameDay(day, fim) || 
              (day > inicio && day < fim));
    });

    // Também mostrar projetos que não têm cronogramas
    const projetoItems = projetos.filter(p => {
      if (!cronogramas.some(c => c.projeto_id === p.id)) {
        const inicio = parseISO(p.data_inicio);
        const fim = parseISO(p.data_prevista_termino);
        return (isSameDay(day, inicio) || isSameDay(day, fim) || 
                (day > inicio && day < fim));
      }
      return false;
    }).map(p => ({
      id: `projeto-${p.id}`,
      projeto_id: p.id,
      tipo_atividade: p.nome_projeto,
      data_inicio: p.data_inicio,
      data_fim: p.data_prevista_termino,
      isProject: true
    }));

    return [...cronogramItems, ...projetoItems];
  };

  const proximos = [
    ...cronogramas.map(c => ({
      ...c,
      tipo: 'cronograma',
      data: parseISO(c.data_inicio)
    })),
    ...projetos.map(p => ({
      ...p,
      tipo: 'projeto',
      tipo_atividade: p.nome_projeto,
      data_inicio: p.data_inicio,
      data_fim: p.data_prevista_termino,
      data: parseISO(p.data_inicio)
    }))
  ]
    .filter(c => c.data >= new Date())
    .sort((a, b) => a.data - b.data)
    .slice(0, 8);

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <PageHeader
        title="Agenda de Execução"
        subtitle="Cronograma de obras e atividades"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">
              {format(currentDate, "MMMM yyyy", { locale: ptBR })}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentDate(new Date(getYear(currentDate), getMonth(currentDate) - 1, 1))}
                className="px-3 py-1 text-sm hover:bg-muted rounded-lg transition-colors"
              >
                ← Anterior
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm hover:bg-muted rounded-lg transition-colors"
              >
                Hoje
              </button>
              <button
                onClick={() => setCurrentDate(new Date(getYear(currentDate), getMonth(currentDate) + 1, 1))}
                className="px-3 py-1 text-sm hover:bg-muted rounded-lg transition-colors"
              >
                Próximo →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map(day => (
              <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map(day => {
              const dayEvents = getCronogramasForDay(day);
              const isDayToday = isToday(day);
              const isCurrentMonth = getMonth(day) === getMonth(currentDate);

              return (
                <div
                  key={day.toString()}
                  className={`min-h-24 p-2 border rounded-lg text-xs transition-colors ${
                    isDayToday
                      ? "bg-primary/10 border-primary"
                      : isCurrentMonth
                      ? "bg-background border-border hover:bg-muted/40"
                      : "bg-muted/20 border-border/50"
                  }`}
                >
                  <div className={`font-semibold mb-1 ${isDayToday ? "text-primary" : ""}`}>
                    {format(day, "d")}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 2).map(event => {
                       const projeto = projetoMap[event.projeto_id];
                       const cores = event.isProject ? "bg-blue-50 text-blue-700" : (ATIVIDADE_CORES[event.tipo_atividade] || "bg-gray-50 text-gray-700");
                       return (
                         <div
                           key={event.id}
                           className={`px-1.5 py-0.5 rounded text-[10px] font-medium truncate ${cores} border`}
                           title={`${event.tipo_atividade} - ${projeto?.nome_projeto || "Projeto"}`}
                         >
                           {event.isProject ? event.tipo_atividade.substring(0, 10) : event.tipo_atividade.split(" ")[0]}
                         </div>
                       );
                     })}
                    {dayEvents.length > 2 && (
                      <div className="text-[10px] text-muted-foreground font-medium px-1.5">
                        +{dayEvents.length - 2} mais
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-4">Próximas Atividades</h2>
            {proximos.length === 0 ? (
              <EmptyState title="Sem atividades" description="Nenhuma atividade agendada." />
            ) : (
              <div className="space-y-3">
                {proximos.map(item => {
                  const projeto = projetoMap[item.projeto_id];
                  const cores = item.tipo === 'projeto' ? "bg-blue-50 text-blue-700" : (ATIVIDADE_CORES[item.tipo_atividade] || "bg-gray-50 text-gray-700");
                  return (
                    <div key={item.id} className={`rounded-lg border p-3 ${cores}`}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{item.tipo_atividade}</p>
                          <p className="text-xs opacity-80 mt-0.5">{projeto?.nome_projeto || item.nome_projeto || "Projeto"}</p>
                        </div>
                        {item.status === "Concluída" && (
                          <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs opacity-75">
                        <Calendar className="w-3 h-3" />
                        <span>{format(parseISO(item.data_inicio), "dd/MM")}</span>
                        {item.data_fim !== item.data_inicio && (
                          <>
                            <span>→</span>
                            <span>{format(parseISO(item.data_fim), "dd/MM")}</span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
