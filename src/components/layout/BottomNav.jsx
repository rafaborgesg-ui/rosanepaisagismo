import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard, Users, TrendingUp, TrendingDown,
  Target, FileBarChart2, Hammer, Calendar, ContactRound, Truck, UserCog, MoreHorizontal, X, Leaf, LogOut, Crown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";

// Primary 5 items in bottom bar
const primaryItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/comercial", label: "Comercial", icon: Users },
  { path: "/caixa-entrada", label: "Entradas", icon: TrendingUp },
  { path: "/caixa-saida", label: "Saídas", icon: TrendingDown },
  { label: "Mais", icon: MoreHorizontal, isMore: true },
];

// All items for the drawer
const allGroups = [
  {
    group: "Financeiro",
    items: [
      { path: "/clientes", label: "Clientes", icon: ContactRound },
      { path: "/metas", label: "Metas", icon: Target },
      { path: "/relatorios", label: "Relatórios", icon: FileBarChart2 },
    ]
  },
  {
    group: "Projetos",
    items: [
      { path: "/projetos", label: "Projetos", icon: Hammer },
      { path: "/projetos-execucao", label: "Obras em Execução", icon: Hammer },
      { path: "/agenda-execucao", label: "Agenda de Execução", icon: Calendar },
    ]
  },
  {
    group: "Configurações",
    items: [
      { path: "/fornecedores", label: "Fornecedores", icon: Truck },
      { path: "/equipe", label: "Equipe", icon: UserCog },
    ]
  },
];

export default function BottomNav() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isPremium } = useSubscription();

  const isMoreActive = !primaryItems.slice(0, 4).some(i => i.path === location.pathname);

  return (
    <>
      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-sidebar border-t border-sidebar-border md:hidden">
        <div className="flex items-stretch h-16 safe-area-pb">
          {primaryItems.map((item) => {
            if (item.isMore) {
              const active = isMoreActive || drawerOpen;
              return (
                <button
                  key="more"
                  onClick={() => setDrawerOpen(v => !v)}
                  className={cn(
                    "flex-1 flex flex-col items-center justify-center gap-1 transition-all",
                    active ? "text-sidebar-primary" : "text-sidebar-foreground/40"
                  )}
                >
                  {drawerOpen
                    ? <X className="w-5 h-5" />
                    : <MoreHorizontal className="w-5 h-5" />
                  }
                  <span className="text-[9px] font-semibold tracking-wide">Mais</span>
                </button>
              );
            }
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-1 transition-all",
                  isActive ? "text-sidebar-primary" : "text-sidebar-foreground/40"
                )}
              >
                <div className={cn(
                  "relative flex items-center justify-center w-9 h-6 rounded-full transition-all",
                  isActive && "bg-sidebar-primary/15"
                )}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-semibold tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div className={cn(
        "fixed bottom-16 left-0 right-0 z-50 bg-sidebar rounded-t-2xl border-t border-sidebar-border md:hidden",
        "transition-transform duration-300 ease-out",
        drawerOpen ? "translate-y-0 visible" : "translate-y-full invisible pointer-events-none"
      )}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-sidebar-border" />
        </div>

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-3 px-5 py-3 border-b border-sidebar-border/50">
            <div className="w-9 h-9 rounded-full bg-sidebar-primary/20 flex items-center justify-center flex-shrink-0 relative">
              <span className="text-[13px] font-bold text-sidebar-primary">{(user.full_name || user.email || "U")[0].toUpperCase()}</span>
              {isPremium && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-sidebar-primary rounded-full flex items-center justify-center">
                  <Crown className="w-2 h-2 text-sidebar-background" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-sidebar-foreground/80 truncate">{user.full_name || user.email}</p>
              <p className="text-[10px] text-sidebar-foreground/40">{isPremium ? "✦ Premium" : "Plano Gratuito"}</p>
            </div>
            <div className="w-7 h-7 rounded-xl bg-sidebar-primary/20 flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-sidebar-primary" />
            </div>
          </div>
        )}

        {/* Nav Groups */}
        <div className="overflow-y-auto max-h-[50vh] px-4 py-3 space-y-4">
          {allGroups.map(({ group, items }) => (
            <div key={group}>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-sidebar-foreground/25 px-1 mb-2">{group}</p>
              <div className="grid grid-cols-3 gap-2">
                {items.map(item => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setDrawerOpen(false)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-xl py-3 px-2 transition-all",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "bg-sidebar-accent/40 text-sidebar-foreground/50 active:bg-sidebar-accent"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-[10px] font-semibold text-center leading-tight">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div className="px-4 py-3 border-t border-sidebar-border/50">
          <button
            onClick={() => { setDrawerOpen(false); logout(); }}
            className="flex items-center w-full gap-3 px-4 py-3 rounded-xl text-red-400 bg-red-500/10 active:bg-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-[13px] font-semibold">Sair</span>
          </button>
        </div>

        {/* Safe area spacer */}
        <div className="h-2" />
      </div>
    </>
  );
}
