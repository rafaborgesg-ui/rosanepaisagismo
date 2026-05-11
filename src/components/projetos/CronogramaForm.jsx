import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const DEFAULT_DATA = {
  tipo_atividade: "",
  descricao: "",
  data_inicio: "",
  data_fim: "",
  responsavel: "",
  status: "Pendente",
  percentual_conclusao: 0,
};

export default function CronogramaForm({ open, onClose, onSave, initialData }) {
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
    onSave(formData);
    setFormData(DEFAULT_DATA);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Atividade" : "Nova Atividade"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-xs">Tipo de Atividade *</Label>
            <Select value={formData.tipo_atividade} onValueChange={v => handleChange("tipo_atividade", v)}>
              <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Pedido de Plantas">Pedido de Plantas</SelectItem>
                <SelectItem value="Compra de Materiais">Compra de Materiais</SelectItem>
                <SelectItem value="Preparação do Terreno">Preparação do Terreno</SelectItem>
                <SelectItem value="Plantio">Plantio</SelectItem>
                <SelectItem value="Manutenção">Manutenção</SelectItem>
                <SelectItem value="Entrega do Projeto">Entrega do Projeto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Descrição</Label>
            <Textarea
              value={formData.descricao}
              onChange={e => handleChange("descricao", e.target.value)}
              placeholder="Detalhes da atividade"
              className="h-20 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Data de Início *</Label>
              <Input
                type="date"
                value={formData.data_inicio}
                onChange={e => handleChange("data_inicio", e.target.value)}
                required
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Data de Término *</Label>
              <Input
                type="date"
                value={formData.data_fim}
                onChange={e => handleChange("data_fim", e.target.value)}
                required
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
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Concluída">Concluída</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Responsável</Label>
              <Input
                value={formData.responsavel}
                onChange={e => handleChange("responsavel", e.target.value)}
                placeholder="Nome"
                className="h-8 text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">Percentual de Conclusão</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={formData.percentual_conclusao}
              onChange={e => handleChange("percentual_conclusao", parseInt(e.target.value) || 0)}
              className="h-8 text-sm"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="h-8 text-sm">
              Cancelar
            </Button>
            <Button type="submit" className="h-8 text-sm">
              {initialData ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
