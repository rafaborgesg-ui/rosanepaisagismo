import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({ title, value, icon: Icon, subtitle, trend, trendPositive, colorClass = "bg-primary/10 text-primary", borderColor = "" }) {
  return (
    <div className={cn(
      "bg-card rounded-xl p-5 flex flex-col gap-3 border border-border hover:shadow-md hover:-translate-y-px transition-all duration-200 cursor-default",
      borderColor
    )}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground leading-tight">{title}</p>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", colorClass)}>
          <Icon className="w-[15px] h-[15px]" />
        </div>
      </div>
      <div>
        <p className="text-[22px] font-bold text-foreground tracking-tight leading-none">{value}</p>
        {subtitle && <p className="text-[11px] text-muted-foreground mt-1.5 truncate">{subtitle}</p>}
      </div>
      {trend !== undefined && (
        <div className={cn("flex items-center gap-1 text-[11px] font-semibold", trendPositive ? "text-emerald-600" : "text-red-500")}>
          {trendPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}