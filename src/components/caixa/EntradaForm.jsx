import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, FileUp, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { MESES } from "../../lib/formatters";
import { api } from "@/api/apiService";
import { useQuery } from "@tanstack/react-query";
import { useOfficeOwner } from "@/hooks/useOfficeOwner";
import ClienteSmartInput from "@/components/clientes/ClienteSmartInput";
import ResponsiveFormDialog from "@/components/shared/ResponsiveFormDialog";

const TIPOS = ["Projeto Paisagístico", "Manutenção", "Consultoria", "Implantação", "Reforma", "Outro"];
const CATEGORIAS = ["Projeto", "Manutenção Mensal", "Consultoria", "Implantação", "Venda de Plantas", "Outro"];
const STATUS_OPTIONS = ["Ativo", "Finalizado", "Cancelado", "Pendente"];

const MESES_ORDER = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

const DEFAULT = {
  cliente: "", tipo_projeto: "", categoria: "", status: "Ativo",
  valor_total: "", competencia: "", mes_inicio: "", valor_mensal: "", parcelas: "",
  vencimento: "", arquivo_url: "", arquivo_nome: "", observacoes: ""
};

const mesDoVencimento = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return MESES_ORDER[d.getUTCMonth()] || "";
};

// Single-record mode: one month, one value (used for editing existing records)
export default function EntradaForm({ open, onClose, onSave, onSaveMulti, initialData, saving }) {
  const { officeOwner } = useOfficeOwner();
  const [form, setForm] = useState(DEFAULT);
  // Multi-parcela mode: array of {vencimento, valor}
  const [parcelas, setParcelas] = useState([{ vencimento: "", valor: "" }]);
  const [isMulti, setIsMulti] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { data: clientes = [] } = useQuery({
    queryKey: ["clientes", officeOwner],
    queryFn: () => api.entities.Cliente.filter({ office_owner: officeOwner }),
    enabled: !!officeOwner && open,
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({ ...DEFAULT, ...initialData });
        setIsMulti(false);
      } else {
        setForm({ ...DEFAULT });
        setParcelas([{ vencimento: "", valor: "" }]);
        setIsMulti(false);
      }
    }
  }, [open, initialData]);

  const update = (fields, value) => {
    if (typeof fields === "string") {
      setForm(prev => ({ ...prev, [fields]: value }));
    } else {
      // fields is an object of key-value pairs
      setForm(prev => ({ ...prev, ...fields }));
    }
  };

  const updateParcela = (idx, field, value) => {
    setParcelas(prev => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  const addParcela = () => setParcelas(prev => [...prev, { vencimento: "", valor: "" }]);
  const removeParcela = (idx) => setParcelas(prev => prev.filter((_, i) => i !== idx));

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor, envie um arquivo PDF ou planilha (Excel)');
      return;
    }

    setUploading(true);
    try {
      const response = await api.integrations.Core.UploadFile({ file });
      update({ arquivo_url: response.file_url, arquivo_nome: file.name });
    } catch (error) {
      alert('Erro ao fazer upload do arquivo');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => update({ arquivo_url: "", arquivo_nome: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isMulti) {
      const valid = parcelas.filter(p => p.vencimento && p.valor);
        const valorTotal = valid.reduce((s, p) => s + (Number(p.valor) || 0), 0);
        const records = valid.map(p => ({
          ...form,
          valor_total: valorTotal,
          parcelas: valid.length,
          vencimento: p.vencimento,
          competencia: mesDoVencimento(p.vencimento),
          mes_inicio: mesDoVencimento(p.vencimento),
          valor_mensal: Number(p.valor) || 0,
        }));
      if (onSaveMulti) { onSaveMulti(records); }
    } else {
      // Competência deriva do vencimento, mas se vencimento vazio preserva o que já está no form
      const competenciaDerived = form.vencimento ? mesDoVencimento(form.vencimento) : "";
      const competencia = competenciaDerived || form.competencia;
      onSave({
        ...form,
        competencia,
        mes_inicio: competencia,
        valor_total: Number(form.valor_total) || 0,
        parcelas: Number(form.parcelas) || 1,
        valor_mensal: Number(form.valor_mensal) || 0,
      });
    }
  };

  const totalMulti = parcelas.reduce((s, p) => s + (Number(p.valor) || 0), 0);

  return (
    <ResponsiveFormDialog 
      open={open} 
      onOpenChange={onClose}
      title={`${initialData ? "Editar" : "Nova"} Receita`}
      className="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cliente */}
          <div>
            <Label>Cliente *</Label>
            <ClienteSmartInput
              value={form.cliente}
              onChange={(v) => update("cliente", v)}
              clientes={clientes}
              officeOwner={officeOwner}
              autoFocus
            />
          </div>

          {/* Tipo + Categoria */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tipo Projeto</Label>
              <Select value={form.tipo_projeto || undefined} onValueChange={(v) => update("tipo_projeto", v)}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>{TIPOS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Categoria</Label>
              <Select value={form.categoria || undefined} onValueChange={(v) => update("categoria", v)}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>{CATEGORIAS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          {/* Status */}
          <div>
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(v) => update("status", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{STATUS_OPTIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          {/* Toggle modo parcelas — só para criação */}
          {!initialData && (
            <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg border border-border">
              <button
                type="button"
                onClick={() => setIsMulti(false)}
                className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-colors ${!isMulti ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
              >
                Entrada única
              </button>
              <button
                type="button"
                onClick={() => setIsMulti(true)}
                className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-colors ${isMulti ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
              >
                Múltiplas parcelas
              </button>
            </div>
          )}

          {/* MODO ÚNICO */}
          {!isMulti && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Vencimento</Label>
                  <Input
                    type="date"
                    value={form.vencimento || ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      const mes = mesDoVencimento(v);
                      if (mes) {
                        update({ vencimento: v, competencia: mes, mes_inicio: mes });
                      } else {
                        update("vencimento", v);
                      }
                    }}
                  />
                  {form.competencia && (
                    <p className="text-[10px] text-muted-foreground mt-1">Competência: <span className="font-medium text-foreground">{form.competencia}</span></p>
                  )}
                </div>
                <div>
                  <Label>Valor (R$) *</Label>
                  <Input type="number" step="0.01" value={form.valor_mensal} onChange={(e) => update({ valor_mensal: e.target.value, valor_total: e.target.value })} required />
                </div>
              </div>
            </>
          )}

          {/* MODO MÚLTIPLAS PARCELAS */}
          {isMulti && (
            <div className="space-y-2">
              <Label>Parcelas (vencimento + valor)</Label>
              {parcelas.map((p, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    type="date"
                    className="flex-1"
                    value={p.vencimento || ""}
                    onChange={(e) => updateParcela(idx, "vencimento", e.target.value)}
                  />
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">R$</span>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      className="pl-8"
                      value={p.valor}
                      onChange={(e) => updateParcela(idx, "valor", e.target.value)}
                    />
                  </div>
                  {parcelas.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:bg-destructive/10" onClick={() => removeParcela(idx)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" className="w-full gap-1.5 text-xs mt-1" onClick={addParcela}>
                <Plus className="w-3.5 h-3.5" /> Adicionar parcela
              </Button>
              {totalMulti > 0 && (
                <div className="text-right text-xs text-muted-foreground pt-1">
                  Total: <span className="font-bold text-foreground">R$ {totalMulti.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </div>
              )}
            </div>
          )}

          <div>
            <Label>Observações</Label>
            <Textarea value={form.observacoes} onChange={(e) => update("observacoes", e.target.value)} rows={3} placeholder="Anotações adicionais..." />
          </div>

          <div>
            <Label>Anexar Arquivo (PDF ou Planilha)</Label>
            <div className="flex items-center gap-3">
              <label className="flex-1 cursor-pointer">
                <div className="flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <FileUp className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {uploading ? "Enviando..." : "Clique para selecionar arquivo"}
                  </span>
                  <input 
                    type="file" 
                    accept=".pdf,.xls,.xlsx" 
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </div>
              </label>
            </div>
            {form.arquivo_nome && (
              <div className="mt-3 flex items-center justify-between bg-muted/30 p-3 rounded-lg border border-border">
                <a
                  href={form.arquivo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary underline underline-offset-2 truncate hover:opacity-80 transition-opacity"
                >
                  {form.arquivo_nome}
                </a>
                <button 
                  type="button"
                  onClick={removeFile}
                  className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={saving || uploading} className="bg-primary text-primary-foreground">{saving ? "Salvando..." : "Salvar"}</Button>
          </div>
        </form>
    </ResponsiveFormDialog>
  );
}
