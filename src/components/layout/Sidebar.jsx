import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, TrendingUp, TrendingDown,
  Target, FileBarChart2, Leaf, ChevronLeft, ChevronRight, LogOut, Crown, UserCog, Truck, Hammer, Calendar, ContactRound
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Visão Geral" },
  { path: "/comercial", label: "Comercial", icon: Users, group: "Financeiro" },
  { path: "/clientes", label: "Clientes", icon: ContactRound, group: "Financeiro" },
  { path: "/caixa-entrada", label: "Caixa Entrada", icon: TrendingUp, group: "Financeiro" },
  { path: "/caixa-saida", label: "Caixa Saída", icon: TrendingDown, group: "Financeiro" },
  { path: "/projetos", label: "Projetos", icon: Hammer, group: "Projetos" },
  { path: "/projetos-execucao", label: "Obras em Execução", icon: Hammer, group: "Projetos" },
  { path: "/agenda-execucao", label: "Agenda de Execução", icon: Calendar, group: "Projetos" },
  { path: "/metas", label: "Metas", icon: Target, group: "Análise" },
  { path: "/relatorios", label: "Relatórios", icon: FileBarChart2, group: "Análise" },
  { path: "/fornecedores", label: "Fornecedores", icon: Truck, group: "Configurações" },
  { path: "/equipe", label: "Equipe", icon: UserCog, group: "Configurações" },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const { isPremium } = useSubscription();
  const groups = [...new Set(navItems.map(i => i.group))];

  return (
    <aside className={cn(
      "h-screen bg-sidebar flex flex-col sticky top-0 z-40 border-r border-sidebar-border",
      "transition-[width] duration-300 ease-in-out",
      collapsed ? "w-[60px]" : "w-[220px]"
    )}>
      {/* Brand */}
      <div className={cn(
        "flex items-center border-b border-sidebar-border flex-shrink-0",
        collapsed ? "justify-center px-2 h-16" : "px-5 gap-3 h-16"
      )}>
        <div className="w-8 h-8 rounded-xl bg-sidebar-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-sidebar-primary/30">
          <Leaf className="w-4 h-4 text-sidebar-background" />
        </div>
        {!collapsed && (
          <div className="min-w-0 overflow-hidden">
            <p className="font-heading text-[13px] font-bold text-white leading-tight tracking-tight">Rosane Borges</p>
            <p className="text-[9px] text-sidebar-foreground/40 uppercase tracking-[0.2em] mt-0.5">Paisagista</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-5 px-2">
        {groups.map(group => (
          <div key={group}>
            {!collapsed && (
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-sidebar-foreground/25 px-3 mb-2">{group}</p>
            )}
            {collapsed && <div className="h-px bg-sidebar-border/50 mx-2 mb-2 mt-1" />}
            <div className="space-y-0.5">
              {navItems.filter(i => i.group === group).map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg text-[12.5px] font-medium transition-all duration-150 group relative",
                      collapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5",
                      isActive
                        ? "bg-sidebar-accent text-white"
                        : "text-sidebar-foreground/45 hover:text-sidebar-foreground/80 hover:bg-sidebar-accent/40"
                    )}
                  >
                    {isActive && !collapsed && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-sidebar-primary rounded-r-full" />
                    )}
                    <item.icon className={cn(
                      "flex-shrink-0 w-[17px] h-[17px] transition-colors",
                      isActive ? "text-sidebar-primary" : "text-sidebar-foreground/35 group-hover:text-sidebar-foreground/60"
                    )} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-sidebar-border/50 px-2 py-3 space-y-1">
        {!collapsed && user && (
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-sidebar-primary/20 flex items-center justify-center flex-shrink-0 relative">
              <span className="text-[10px] font-bold text-sidebar-primary">{(user.full_name || user.email || "U")[0].toUpperCase()}</span>
              {isPremium && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-sidebar-primary rounded-full flex items-center justify-center shadow-sm">
                  <Crown className="w-1.5 h-1.5 text-sidebar-background" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="text-[11px] font-semibold text-sidebar-foreground/70 truncate leading-tight">{user.full_name || user.email}</p>
              <p className="text-[9px] text-sidebar-foreground/30 truncate">{isPremium ? 'Premium' : user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => logout()}
          title="Sair"
          className={cn(
            "flex items-center w-full rounded-lg py-2 text-sidebar-foreground/30 hover:text-red-400 hover:bg-red-500/10 transition-all",
            collapsed ? "justify-center" : "px-3 gap-2.5"
          )}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="text-[11px]">Sair</span>}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expandir menu" : "Recolher menu"}
          className={cn(
            "flex items-center w-full rounded-lg py-2 text-sidebar-foreground/30 hover:text-sidebar-foreground/60 hover:bg-sidebar-accent/40 transition-all",
            collapsed ? "justify-center" : "px-3 gap-2.5"
          )}
        >
          {collapsed
            ? <ChevronRight className="w-4 h-4" />
            : <><ChevronLeft className="w-4 h-4 flex-shrink-0" /><span className="text-[11px]">Recolher</span></>
          }
        </button>
      </div>
    </aside>
  );
}