import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const DEFAULT = { nome: "", telefone: "", email: "", endereco: "", cidade: "", observacoes: "" };

export default function ClienteForm({ open, onClose, onSave, initialData }) {
  const [form, setForm] = useState(DEFAULT);

  useEffect(() => {
    setForm(initialData ? { ...DEFAULT, ...initialData } : { ...DEFAULT });
  }, [initialData, open]);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Cliente" : "Novo Cliente"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Nome *</Label>
            <Input value={form.nome} onChange={e => update("nome", e.target.value)} required placeholder="Nome completo ou empresa" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Telefone</Label>
              <Input value={form.telefone} onChange={e => update("telefone", e.target.value)} placeholder="(00) 00000-0000" />
            </div>
            <div>
              <Label>E-mail</Label>
              <Input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="cliente@email.com" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Label>Endereço</Label>
              <Input value={form.endereco} onChange={e => update("endereco", e.target.value)} placeholder="Rua, número, bairro" />
            </div>
            <div>
              <Label>Cidade</Label>
              <Input value={form.cidade} onChange={e => update("cidade", e.target.value)} placeholder="Cidade" />
            </div>
          </div>
          <div>
            <Label>Observações</Label>
            <Textarea value={form.observacoes} onChange={e => update("observacoes", e.target.value)} rows={2} />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
