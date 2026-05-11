import { useLocation } from "react-router-dom";
import { ChevronRight, Crown } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSubscription } from "@/hooks/useSubscription";

const breadcrumbs = {
  "/": ["Dashboard"],
  "/comercial": ["Financeiro", "Comercial"],
  "/caixa-entrada": ["Financeiro", "Caixa Entrada"],
  "/caixa-saida": ["Financeiro", "Caixa Saída"],
  "/metas": ["Análise", "Metas"],
  "/relatorios": ["Análise", "Relatórios"]
};

export default function TopBar() {
  const location = useLocation();
  const crumbs = breadcrumbs[location.pathname] || ["Página"];
  const today = format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  const { isPremium } = useSubscription();

  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur-md flex items-center px-6 gap-4 sticky top-0 z-30">
      {/* Breadcrumb */}
      <div className="flex-1 min-w-0 flex items-center gap-1.5">
        {crumbs.map((c, i) =>
        <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground/30 flex-shrink-0" />}
            <span className={
          i === crumbs.length - 1 ?
          "text-[13px] font-semibold text-foreground" :
          "text-[13px] text-muted-foreground/50 font-medium"
          }>{c}</span>
          </span>
        )}
      </div>

      {/* Date */}
      <span className="text-[11px] text-muted-foreground/50 capitalize hidden lg:block">{today}</span>

      

      {/* User */}
      












      
    </header>);

}
