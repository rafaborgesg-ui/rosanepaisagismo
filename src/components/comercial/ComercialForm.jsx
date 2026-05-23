import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ResponsiveFormDialog from "@/components/shared/ResponsiveFormDialog";
const MESES_ORDER = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
import { FileUp, X } from "lucide-react";
import { api } from "@/api/apiService";
import { useQuery } from "@tanstack/react-query";
import { useOfficeOwner } from "@/hooks/useOfficeOwner";
import ClienteSearch from "@/components/clientes/ClienteSearch";

const TIPOS_PROJETO = ["Projeto Paisagístico", "Manutenção", "Consultoria", "Implantação", "Reforma", "Outro"];
const STATUS_OPTIONS = ["Fechou", "Não Fechou", "Aguardando"];

export default function ComercialForm({ open, onClose, onSave, initialData, nextNumero, saving }) {
  const today = new Date().toISOString().split("T")[0];
  const todayMes = MESES_ORDER[new Date().getMonth()];

  const DEFAULT = {
    mes: todayMes, mes_data: today, numero: "", nome_cliente: "", telefone: "", email_cliente: "",
    endereco: "", cidade: "", servico_orcado: "",
    tipo_projeto: "", proposta1: "", proposta2: "", status: "Aguardando",
    fonte: "", observacoes: "", arquivo_url: "", arquivo_nome: ""
  };

  const handleMesDataChange = (dateStr) => {
    const mes = dateStr ? (MESES_ORDER[parseInt(dateStr.split("-")[1], 10) - 1] || "") : "";
    setForm(prev => ({ ...prev, mes_data: dateStr, mes }));
  };

  const { officeOwner } = useOfficeOwner();
  const [form, setForm] = useState(DEFAULT);
  const [uploading, setUploading] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const { data: clientes = [] } = useQuery({
    queryKey: ["clientes", officeOwner],
    queryFn: () => api.entities.Cliente.filter({ office_owner: officeOwner }),
    enabled: !!officeOwner && open,
  });

  useEffect(() => {
    setForm(initialData ? { ...DEFAULT, ...initialData } : { ...DEFAULT });
    setClienteSelecionado(null);
  }, [initialData, open]);

  const handleClienteSelect = (cliente) => {
    setClienteSelecionado(cliente);
    setForm(prev => ({
      ...prev,
      nome_cliente: cliente.nome,
      telefone: cliente.telefone || "",
      email_cliente: cliente.email || "",
      endereco: cliente.endereco || "",
      cidade: cliente.cidade || "",
    }));
  };

  const handleClienteClear = () => {
    setClienteSelecionado(null);
    setForm(prev => ({ ...prev, nome_cliente: "", telefone: "", email_cliente: "", endereco: "", cidade: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      proposta1: form.proposta1 ? Number(form.proposta1) : null,
      proposta2: form.proposta2 ? Number(form.proposta2) : null,
      numero: form.numero ? Number(form.numero) : null,
    });
  };

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
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
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    update("arquivo_url", "");
    update("arquivo_nome", "");
  };

  return (
    <ResponsiveFormDialog 
      open={open} 
      onOpenChange={onClose}
      title={`${initialData ? "Editar" : "Nova"} Proposta Comercial`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Data</Label>
              <Input type="date" value={form.mes_data} onChange={(e) => handleMesDataChange(e.target.value)} />
              {form.mes && <p className="text-[11px] text-muted-foreground mt-1">Competência: {form.mes}</p>}
            </div>
            <div>
              <Label>Número</Label>
              <div className="flex h-9 w-full items-center rounded-md border border-input bg-muted/40 px-3 text-sm text-muted-foreground">
                {form.numero || nextNumero}
              </div>
            </div>
          </div>
          {/* Cliente */}
          <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cliente</p>
            <div>
              <Label>Buscar cliente cadastrado</Label>
              <ClienteSearch
                clientes={clientes}
                onSelect={handleClienteSelect}
                selectedNome={clienteSelecionado?.nome}
                onClear={handleClienteClear}
                autoFocus
              />
            </div>
            <div>
              <Label>Nome do Cliente *</Label>
              <Input value={form.nome_cliente} onChange={(e) => update("nome_cliente", e.target.value)} required placeholder="Nome do cliente" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Telefone</Label>
                <Input value={form.telefone} onChange={(e) => update("telefone", e.target.value)} placeholder="(00) 00000-0000" />
              </div>
              <div>
                <Label>E-mail</Label>
                <Input type="email" value={form.email_cliente} onChange={(e) => update("email_cliente", e.target.value)} placeholder="cliente@email.com" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <Label>Endereço</Label>
                <Input value={form.endereco} onChange={(e) => update("endereco", e.target.value)} placeholder="Rua, número, bairro" />
              </div>
              <div>
                <Label>Cidade</Label>
                <Input value={form.cidade} onChange={(e) => update("cidade", e.target.value)} placeholder="Cidade" />
              </div>
            </div>
          </div>

          <div>
            <Label>Serviço Orçado *</Label>
            <Input value={form.servico_orcado} onChange={(e) => update("servico_orcado", e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tipo Projeto</Label>
              <Select value={form.tipo_projeto} onValueChange={(v) => update("tipo_projeto", v)}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>{TIPOS_PROJETO.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => update("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{STATUS_OPTIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Proposta 1 (R$)</Label>
              <Input type="number" step="0.01" value={form.proposta1} onChange={(e) => update("proposta1", e.target.value)} />
            </div>
            <div>
              <Label>Proposta 2 (R$)</Label>
              <Input type="number" step="0.01" value={form.proposta2} onChange={(e) => update("proposta2", e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Fonte</Label>
            <Input value={form.fonte} onChange={(e) => update("fonte", e.target.value)} placeholder="Instagram, indicação, etc." />
          </div>
          <div>
            <Label>Observações</Label>
            <Textarea value={form.observacoes} onChange={(e) => update("observacoes", e.target.value)} rows={3} />
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
                  className="text-muted-foreground hover:text-destructive transition-colors"
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
