import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, X } from "lucide-react";
import { MESES } from "../../lib/formatters";
import ResponsiveFormDialog from "@/components/shared/ResponsiveFormDialog";

const vencimentoToCompetencia = (dateStr) => {
  if (!dateStr) return "";
  const [, month] = dateStr.split("-");
  return MESES[parseInt(month, 10) - 1] || "";
};
import { api } from "@/api/apiService";

const CATEGORIAS = ["Aluguel", "Salários", "Material", "Transporte", "Marketing", "Software", "Impostos", "Fornecedores", "Água/Luz", "Internet/Telefone", "Contador", "Outro"];

const DEFAULT_FORM = {
  tipo: "Fixa", categoria: "", descricao: "", valor: "",
  vencimento: "", recorrente: false, pago: false, responsavel: "", competencia: "",
  arquivo_url: "", arquivo_nome: "", observacoes: ""
};

export default function SaidaForm({ open, onClose, onSave, initialData, saving }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(initialData ? { ...DEFAULT_FORM, ...initialData } : { ...DEFAULT_FORM });
    }
  }, [open, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, valor: Number(form.valor) || 0, competencia: vencimentoToCompetencia(form.vencimento) });
  };

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

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
      update("arquivo_url", response.file_url);
      update("arquivo_nome", file.name);
    } catch (error) {
      alert('Erro ao fazer upload do arquivo');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => { update("arquivo_url", ""); update("arquivo_nome", ""); };

  return (
    <ResponsiveFormDialog 
      open={open} 
      onOpenChange={onClose}
      title={`${initialData ? "Editar" : "Nova"} Despesa`}
      className="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tipo</Label>
              <Select value={form.tipo} onValueChange={(v) => update("tipo", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fixa">Fixa</SelectItem>
                  <SelectItem value="Variável">Variável</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Categoria *</Label>
              <Select value={form.categoria} onValueChange={(v) => update("categoria", v)}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>{CATEGORIAS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Descrição</Label>
            <Input value={form.descricao} onChange={(e) => update("descricao", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Valor (R$) *</Label>
              <Input type="number" step="0.01" value={form.valor} onChange={(e) => update("valor", e.target.value)} required />
            </div>
            <div>
              <Label>Vencimento</Label>
              <Input type="date" value={form.vencimento} onChange={(e) => update("vencimento", e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Responsável</Label>
            <Input value={form.responsavel} onChange={(e) => update("responsavel", e.target.value)} />
          </div>
          <div className="flex items-center gap-8 pt-2">
            <div className="flex items-center gap-3">
              <Switch checked={form.recorrente} onCheckedChange={(v) => update("recorrente", v)} />
              <Label>Recorrente</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.pago} onCheckedChange={(v) => update("pago", v)} />
              <Label>Pago</Label>
            </div>
          </div>
          <div>
            <Label>Observações</Label>
            <Textarea value={form.observacoes} onChange={(e) => update("observacoes", e.target.value)} rows={3} placeholder="Anotações adicionais..." />
          </div>
          <div>
            <Label>Comprovante de Pagamento (PDF ou Planilha)</Label>
            <label className="block cursor-pointer mt-1">
              <div className="flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <FileUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {uploading ? "Enviando..." : "Clique para selecionar arquivo"}
                </span>
                <input type="file" accept=".pdf,.xls,.xlsx" onChange={handleFileUpload} disabled={uploading} className="hidden" />
              </div>
            </label>
            {form.arquivo_nome && (
              <div className="mt-2 flex items-center justify-between bg-muted/30 p-3 rounded-lg border border-border">
                <a
                  href={form.arquivo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary underline underline-offset-2 truncate hover:opacity-80 transition-opacity"
                >
                  {form.arquivo_nome}
                </a>
                <button type="button" onClick={removeFile} className="text-muted-foreground hover:text-destructive transition-colors ml-2">
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
