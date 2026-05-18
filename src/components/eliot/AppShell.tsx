import { Outlet, Link } from "@tanstack/react-router";
import { Bell, Search, ShieldAlert, Menu, X } from "lucide-react";
import { DesktopSidebar, MobileBottomNav, NAV, ADMIN_NAV, Avatar } from "./Sidebar";
import { Logo } from "./Logo";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/data/mock";

export function AppShell() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar para desktop */}
      <DesktopSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Cabeçalho superior (Header) */}
        <header className="sticky top-0 z-30 h-16 flex items-center gap-3 border-b border-border bg-background/85 backdrop-blur px-4 md:px-6">
          <button
            onClick={() => setOpenMenu(true)}
            className="md:hidden -ml-1 grid size-9 place-items-center rounded-lg hover:bg-accent"
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </button>
          <div className="md:hidden">
            <Logo size={22} />
          </div>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                placeholder="Buscar incidentes, usuários, trilhas…"
                className="w-full h-9 rounded-lg bg-secondary/60 pl-9 pr-3 text-sm placeholder:text-muted-foreground/70 outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex gap-1.5">
              <Link to="/app/reportar">
                <ShieldAlert className="size-4" /> Notificar ameaça
              </Link>
            </Button>
            <button className="relative grid size-9 place-items-center rounded-lg hover:bg-accent" aria-label="Notificações">
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-primary" />
            </button>
            <div className="hidden md:block">
              <Avatar name={currentUser.name} size={32} />
            </div>
          </div>
        </header>

        {/* Área principal de conteúdo das rotas */}
        <main className="flex-1 min-w-0 pb-24 md:pb-10">
          <Outlet />
        </main>
      </div>

      {/* Navegação inferior para mobile */}
      <MobileBottomNav />

      {/* Mobile drawer */}
      {openMenu && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setOpenMenu(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-sidebar border-r border-sidebar-border p-4 animate-slide-in-right" style={{ animationName: "slide-in-right" }}>
            <div className="flex items-center justify-between mb-6">
              <Logo />
              <button onClick={() => setOpenMenu(false)} className="grid size-9 place-items-center rounded-lg hover:bg-accent">
                <X className="size-4" />
              </button>
            </div>
            <nav className="space-y-1">
              {[...NAV, ...ADMIN_NAV].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpenMenu(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export function PageHeader({
  eyebrow, title, description, actions,
}: { eyebrow?: string; title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <div className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-primary/80">{eyebrow}</div>
        )}
        <h1 className="font-display text-2xl md:text-[1.75rem] font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1.5 text-sm md:text-[0.95rem] text-muted-foreground max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
