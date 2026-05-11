import { Badge } from "@/components/ui/badge";
import { Shield, Zap } from "lucide-react";

export default function OwnerCard({ user, isPremium }) {
  const initials = (nameOrEmail) => (nameOrEmail || "?")[0].toUpperCase();

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-primary">{initials(user?.full_name || user?.email)}</span>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">{user?.full_name || user?.email}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Badge className="bg-primary text-primary-foreground text-[10px] px-2.5 py-0.5 flex items-center gap-1.5 flex-shrink-0">
          <Shield className="w-3 h-3" />
          Proprietário
        </Badge>
      </div>

      {isPremium && (
        <div className="flex items-center gap-2 text-xs bg-white/50 border border-primary/20 rounded-lg px-3 py-2">
          <Zap className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          <span className="text-foreground font-semibold">Plano Premium</span>
          <span className="text-muted-foreground">— Membros ilimitados</span>
        </div>
      )}
    </div>
  );
}
