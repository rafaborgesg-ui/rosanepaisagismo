import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const DEFAULT_DATA = {
  nome_projeto: "",
  cliente: "",
  endereco: "",
  data_inicio: "",
  data_prevista_termino: "",
  status: "Planejamento",
  responsavel: "",
  observacoes: "",
};

export default function ProjetoForm({ open, onClose, onSave, initialData, saving = false }) {
  const [formData, setFormData] = useState(DEFAULT_DATA);

  useEffect(() => {
    if (open) {
      setFormData(initialData || DEFAULT_DATA);
    }
  }, [open, initialData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nome_projeto || !formData.cliente) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Projeto" : "Novo Projeto"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Nome do Projeto *</Label>
              <Input
                value={formData.nome_projeto}
                onChange={e => handleChange("nome_projeto", e.target.value)}
                placeholder="Nome da obra"
                required
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Cliente *</Label>
              <Input
                value={formData.cliente}
                onChange={e => handleChange("cliente", e.target.value)}
                placeholder="Nome do cliente"
                required
                className="h-8 text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">Endereço</Label>
            <Input
              value={formData.endereco}
              onChange={e => handleChange("endereco", e.target.value)}
              placeholder="Endereço da obra"
              className="h-8 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Data de Início</Label>
              <Input
                type="date"
                value={formData.data_inicio}
                onChange={e => handleChange("data_inicio", e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Previsão de Término</Label>
              <Input
                type="date"
                value={formData.data_prevista_termino}
                onChange={e => handleChange("data_prevista_termino", e.target.value)}
                className="h-8 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Status</Label>
              <Select value={formData.status} onValueChange={v => handleChange("status", v)}>
                <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planejamento">Planejamento</SelectItem>
                  <SelectItem value="Em Execução">Em Execução</SelectItem>
                  <SelectItem value="Finalizada">Finalizada</SelectItem>
                  <SelectItem value="Pausada">Pausada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Responsável</Label>
              <Input
                value={formData.responsavel}
                onChange={e => handleChange("responsavel", e.target.value)}
                placeholder="Nome da pessoa"
                className="h-8 text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">Observações</Label>
            <Textarea
              value={formData.observacoes}
              onChange={e => handleChange("observacoes", e.target.value)}
              placeholder="Notas gerais sobre o projeto"
              className="h-20 text-sm"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="h-8 text-sm" disabled={saving}>
              Cancelar
            </Button>
            <Button type="submit" className="h-8 text-sm" disabled={saving}>
              {saving ? "Salvando..." : initialData ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}