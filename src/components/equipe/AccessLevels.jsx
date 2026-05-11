import { Card } from "@/components/ui/card";
import { CheckCircle2, Lock } from "lucide-react";

export default function AccessLevels() {
  const levels = [
    {
      name: "Usuário",
      description: "Acesso completo aos dados",
      permissions: [
        "Visualizar e editar registros",
        "Criar novos projetos",
        "Acessar relatórios",
      ],
    },
    {
      name: "Admin",
      description: "Gerencia equipe e acessos",
      permissions: [
        "Tudo que Usuário pode fazer",
        "Convidar e remover membros",
        "Alterar níveis de acesso",
      ],
    },
  ];

  return (
    <div className="space-y-3">
      <div className="mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3">Níveis de Acesso</h3>
      </div>
      {levels.map((level) => (
        <Card key={level.name} className="p-4 border border-border bg-card">
          <h4 className="font-semibold text-sm text-foreground mb-1">{level.name}</h4>
          <p className="text-xs text-muted-foreground mb-3">{level.description}</p>
          <ul className="space-y-2">
            {level.permissions.map((perm) => (
              <li key={perm} className="flex items-start gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                {perm}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
