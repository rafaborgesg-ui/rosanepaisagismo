import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Printer, Mail } from "lucide-react";

const MAINTENANCE_ITEMS = [
  { id: "rega", label: "Sistema de Rega", defaultText: "Regar as plantas 3 vezes por semana, preferencialmente no início da manhã ou final da tarde." },
  { id: "poda", label: "Cronograma de Podas", defaultText: "Realizar podas de limpeza mensalmente para remover folhas secas e estimular o crescimento." },
  { id: "adubacao", label: "Adubação e Nutrição", defaultText: "Aplicar adubo NPK 10-10-10 a cada 3 meses durante a primavera e o verão." },
  { id: "pragas", label: "Controle de Pragas", defaultText: "Verificar semanalmente a presença de pulgões ou cochonilhas. Se necessário, aplicar óleo de neem." },
];

export default function GuiaManutencaoModal({ open, onClose, projetoNome, clienteNome }) {
  const [selectedItems, setSelectedItems] = useState(MAINTENANCE_ITEMS.map(i => i.id));
  const [customTexts, setCustomTexts] = useState(
    MAINTENANCE_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: item.defaultText }), {})
  );

  const toggleItem = (id) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleTextChange = (id, text) => {
    setCustomTexts(prev => ({ ...acc, [id]: text }));
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const content = `
      <html>
        <head>
          <title>Guia de Manutenção - ${projetoNome}</title>
          <style>
            body { font-family: 'Arial', sans-serif; color: #333; max-width: 800px; margin: 40px auto; line-height: 1.6; }
            h1 { color: #1a3d2b; border-bottom: 2px solid #276a4d; padding-bottom: 10px; }
            h2 { color: #276a4d; font-size: 1.2em; margin-top: 30px; }
            .header { margin-bottom: 40px; }
            .item { margin-bottom: 25px; page-break-inside: avoid; }
            .footer { margin-top: 50px; font-size: 0.8em; color: #777; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Guia de Manutenção de Paisagismo</h1>
            <p><strong>Projeto:</strong> ${projetoNome}</p>
            <p><strong>Cliente:</strong> ${clienteNome}</p>
            <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
          </div>
          ${MAINTENANCE_ITEMS.filter(i => selectedItems.includes(i.id)).map(item => `
            <div class="item">
              <h2>${item.label}</h2>
              <p>${customTexts[item.id]}</p>
            </div>
          `).join('')}
          <div class="footer">
            <p>Rosane Paisagismo - Transformando espaços em santuários.</p>
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#276a4d]" />
            Gerar Guia de Manutenção
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <p className="text-sm text-muted-foreground">
            Selecione os tópicos que deseja incluir no guia para <strong>{clienteNome}</strong>.
          </p>

          <div className="space-y-4">
            {MAINTENANCE_ITEMS.map(item => (
              <div key={item.id} className="border rounded-lg p-4 space-y-3 bg-stone-50/50">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    id={item.id} 
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <Label htmlFor={item.id} className="font-bold text-stone-700">{item.label}</Label>
                </div>
                {selectedItems.includes(item.id) && (
                  <Textarea 
                    value={customTexts[item.id]} 
                    onChange={(e) => handleTextChange(item.id, e.target.value)}
                    className="min-h-[80px] bg-white text-sm"
                    placeholder="Instruções personalizadas..."
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} size="sm">Cancelar</Button>
          <Button onClick={handlePrint} className="bg-[#276a4d] hover:bg-[#1a3d2b] gap-2" size="sm">
            <Printer className="w-4 h-4" />
            Gerar e Imprimir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
