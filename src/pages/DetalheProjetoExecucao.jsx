import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/apiService";
import { Plus, Trash2, Edit2, ChevronLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHeader from "../components/shared/PageHeader";
import CronogramaForm from "../components/projetos/CronogramaForm";
import GuiaManutencaoModal from "../components/projetos/GuiaManutencaoModal";
import { format, parseISO } from "date-fns";

const ATIVIDADE_CORES = {
  "Pedido de Plantas": "bg-blue-50 text-blue-700 border-blue-200",
  "Compra de Materiais": "bg-purple-50 text-purple-700 border-purple-200",
  "Preparação do Terreno": "bg-amber-50 text-amber-700 border-amber-200",
  "Plantio": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Manutenção": "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Entrega do Projeto": "bg-green-50 text-green-700 border-green-200",
};

const STATUS_CORES = {
  "Pendente": "bg-slate-50 text-slate-700 border-slate-200",
  "Em Andamento": "bg-amber-50 text-amber-700 border-amber-200",
  "Concluída": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function DetalheProjetoExecucao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [showCronForm, setShowCronForm] = useState(false);
  const [showGuia, setShowGuia] = useState(false);
  const [editingCron, setEditingCron] = useState(null);

  const { data: projeto } = useQuery({
    queryKey: ["projeto", id],
    queryFn: () => api.entities.ProjetoExecucao.get(id),
    enabled: !!id,
  });

  const { data: cronogramas = [] } = useQuery({
    queryKey: ["cronogramas", id],
    queryFn: () => api.entities.CronogramaExecucao.filter({ projeto_id: id }),
    enabled: !!id,
  });

  const createCronM = useMutation({
    mutationFn: d => api.entities.CronogramaExecucao.create({ ...d, projeto_id: id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cronogramas"] }),
  });

  const updateCronM = useMutation({
    mutationFn: ({ id: cronId, data }) => api.entities.CronogramaExecucao.update(cronId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cronogramas"] }),
  });

  const deleteCronM = useMutation({
    mutationFn: cronId => api.entities.CronogramaExecucao.delete(cronId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cronogramas"] }),
  });

  const handleSaveCron = (data) => {
    if (editingCron) {
      updateCronM.mutate({ id: editingCron.id, data });
    } else {
      createCronM.mutate(data);
    }
    setEditingCron(null);
    setShowCronForm(false);
  };

  if (!projeto) return <div>Carregando...</div>;

  const cronOrdenado = [...cronogramas].sort((a, b) => 
    parseISO(a.data_inicio) - parseISO(b.data_inicio)
  );

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate("/projetos-execucao")}
          className="p-1 hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <PageHeader
          title={projeto.nome_projeto}
          subtitle={`${projeto.cliente} • ${projeto.endereco}`}
          actions={
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-[#276a4d] border-[#276a4d] hover:bg-[#276a4d] hover:text-white transition-all"
              onClick={() => setShowGuia(true)}
            >
              <FileText className="w-4 h-4" />
              Gerar Guia de Manutenção
            </Button>
          }
        />
      </div>

      {/* Informações do Projeto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Informações Básicas</h3>
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-muted-foreground">Status</p>
              <Badge className={`mt-1 text-[10px]`}>{projeto.status}</Badge>
            </div>
            <div>
              <p className="text-muted-foreground">Início</p>
              <p className="font-medium">{projeto.data_inicio ? format(parseISO(projeto.data_inicio), "dd/MM/yyyy") : "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Previsão de Término</p>
              <p className="font-medium">{projeto.data_prevista_termino ? format(parseISO(projeto.data_prevista_termino), "dd/MM/yyyy") : "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Responsável</p>
              <p className="font-medium">{projeto.responsavel || "—"}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Observações</h3>
          <p className="text-sm text-muted-foreground">{projeto.observacoes || "Sem observações"}</p>
        </div>
      </div>

      {/* Cronogramas */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Cronograma de Atividades</h3>
          <Button
            onClick={() => { setEditingCron(null); setShowCronForm(true); }}
            size="sm"
            className="gap-1.5 h-8 text-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Adicionar Atividade
          </Button>
        </div>

        {cronOrdenado.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhuma atividade no cronograma</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cronOrdenado.map(cron => {
              const atividadeCores = ATIVIDADE_CORES[cron.tipo_atividade] || "bg-gray-50 text-gray-700";
              const statusCores = STATUS_CORES[cron.status] || "bg-slate-50 text-slate-700";
              return (
                <div key={cron.id} className={`border rounded-lg p-4 ${atividadeCores}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-sm">{cron.tipo_atividade}</p>
                        <Badge variant="outline" className={`text-[10px] ${statusCores}`}>{cron.status}</Badge>
                      </div>
                      {cron.descricao && <p className="text-sm opacity-80 mb-2">{cron.descricao}</p>}
                      <div className="flex items-center gap-4 text-xs opacity-75">
                        <span>{format(parseISO(cron.data_inicio), "dd/MM")} → {format(parseISO(cron.data_fim), "dd/MM")}</span>
                        {cron.responsavel && <span>Resp: {cron.responsavel}</span>}
                        {cron.percentual_conclusao !== undefined && <span>{cron.percentual_conclusao}% concluído</span>}
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity group">
                      <button
                        onClick={() => { setEditingCron(cron); setShowCronForm(true); }}
                        className="p-1.5 hover:bg-black/10 rounded-md"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => deleteCronM.mutate(cron.id)}
                        className="p-1.5 hover:bg-red-600/10 rounded-md"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <CronogramaForm
        open={showCronForm}
        onClose={() => { setShowCronForm(false); setEditingCron(null); }}
        onSave={handleSaveCron}
        initialData={editingCron}
      />

      <GuiaManutencaoModal
        open={showGuia}
        onClose={() => setShowGuia(false)}
        projetoNome={projeto.nome_projeto}
        clienteNome={projeto.cliente}
      />
    </div>
  );
}
