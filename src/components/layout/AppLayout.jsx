import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-background overflow-hidden font-body">
      {/* Sidebar: hidden on mobile */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TopBar: hidden on mobile */}
        <div className="hidden md:block">
          <TopBar />
        </div>
        {/* Mobile header */}
        <div className="flex md:hidden items-center justify-between px-4 h-14 bg-sidebar border-b border-sidebar-border flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-sidebar-primary flex items-center justify-center shadow-lg shadow-sidebar-primary/30">
              <svg className="w-3.5 h-3.5 text-sidebar-background" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 5.03-8 8.69-8 12a8 8 0 0016 0c0-3.31-3.03-6.97-8-12z"/>
              </svg>
            </div>
            <div>
              <p className="font-heading text-[13px] font-bold text-white leading-tight">Rosane Borges</p>
              <p className="text-[9px] text-sidebar-foreground/40 uppercase tracking-[0.15em]">Paisagista</p>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <Outlet />
        </main>
      </div>
      {/* Bottom Nav: only on mobile */}
      <BottomNav />
    </div>
  );
}
