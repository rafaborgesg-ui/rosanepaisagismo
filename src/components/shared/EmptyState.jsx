import { Leaf } from "lucide-react";

export default function EmptyState({ title = "Nenhum registro", description = "Adicione seu primeiro registro para começar." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <Leaf className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-heading font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
    </div>
  );
}
