import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle2, Clock, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function TeamMemberCard({ member, isOwner, onRemove, loading }) {
  const initials = (nameOrEmail) => (nameOrEmail || "?")[0].toUpperCase();

  const statusConfig = {
    "Aceito": { icon: CheckCircle2, bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", label: "Ativo" },
    "Enviado": { icon: Clock, bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", label: "Convite Pendente" },
    "Cancelado": { icon: XCircle, bg: "bg-red-50", border: "border-red-200", text: "text-red-700", label: "Removido" },
  };

  const config = statusConfig[member.status] || statusConfig["Enviado"];
  const StatusIcon = config.icon;

  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border ${config.bg} ${config.border}`}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center flex-shrink-0 border border-white/80 shadow-sm">
          <span className="text-sm font-bold text-primary">{initials(member.invited_name || member.invited_email)}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{member.invited_name || member.invited_email}</p>
          <p className="text-xs text-muted-foreground truncate">{member.invited_email}</p>
        </div>

        <div className="flex items-center gap-2">
          <StatusIcon className="w-4 h-4" />
          <Badge variant="outline" className={`text-[10px] font-semibold px-2.5 py-0.5 ${config.text} border-current`}>
            {config.label}
          </Badge>

          <Badge variant="outline" className={`text-[10px] font-semibold px-2.5 py-0.5 ${
            member.role === "admin" 
              ? "text-amber-700 border-amber-200 bg-amber-50" 
              : "text-slate-600 border-slate-200 bg-slate-50"
          }`}>
            {member.role === "admin" ? "Admin" : "Usuário"}
          </Badge>

          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {member.created_date ? format(new Date(member.created_date), "dd MMM", { locale: ptBR }) : "—"}
          </span>
        </div>
      </div>

      {!isOwner && member.status !== "Cancelado" && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(member.id)}
          disabled={loading}
          className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}