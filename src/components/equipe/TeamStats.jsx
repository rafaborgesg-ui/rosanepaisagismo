import { Users, Mail, AlertCircle } from "lucide-react";

export default function TeamStats({ activeCount, invitedCount, planLimit, isPremium, atLimit }) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-card border border-border rounded-xl px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Membros Ativos</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{activeCount + 1}</p>
        <p className="text-xs text-muted-foreground mt-1">de {planLimit === 999 ? "∞" : planLimit}</p>
      </div>
      
      <div className="bg-card border border-border rounded-xl px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          <Mail className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Convites Pendentes</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{invitedCount}</p>
        <p className="text-xs text-muted-foreground mt-1">aguardando aceitação</p>
      </div>

      {atLimit && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Limite Atingido</span>
          </div>
          <p className="text-xs text-amber-600 mt-2">Upgrade para convidar mais membros</p>
          <a href="/pricing" className="text-xs font-semibold text-amber-700 underline hover:no-underline mt-2 inline-block">
            Ver Planos →
          </a>
        </div>
      )}
    </div>
  );
}