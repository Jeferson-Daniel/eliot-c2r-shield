import { Outlet, Link, useNavigate } from "@tanstack/react-router";
import { Bell, Search, ShieldAlert, Menu, X, User, Settings, LogOut, CheckCircle2, BookOpen, AlertTriangle } from "lucide-react";
import { DesktopSidebar, MobileBottomNav, NAV, ADMIN_NAV, Avatar } from "./Sidebar";
import { Logo } from "./Logo";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/data/mock";

// Hook utilitário para clique fora do menu
function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export function AppShell() {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  // Estados para Topbar
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  useClickOutside(searchRef, () => setSearchOpen(false));

  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  useClickOutside(notifRef, () => setNotifOpen(false));

  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  useClickOutside(userRef, () => setUserOpen(false));

  // Simulação de busca
  const isSearching = searchQuery.trim().length > 0;
  const hasResults = searchQuery.toLowerCase().includes("phi") || searchQuery.toLowerCase().includes("tri");
  const mockSearchResults = hasResults ? [
    { type: "Incidente", title: "Phishing institucional", icon: AlertTriangle, color: "text-warning bg-warning/10" },
    { type: "Trilha", title: "Prevenção de Engenharia Social", icon: BookOpen, color: "text-primary bg-primary/10" },
  ] : [];

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar para desktop */}
      <DesktopSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Cabeçalho superior (Header Institucional) */}
        <header className="sticky top-0 z-30 h-16 flex items-center gap-3 border-b border-border/80 bg-background/85 backdrop-blur-md px-4 md:px-6 shadow-sm">
          <button
            onClick={() => setOpenMenu(true)}
            className="md:hidden -ml-1 grid size-9 place-items-center rounded-lg hover:bg-secondary/80 transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </button>
          <div className="md:hidden">
            <Logo size={22} />
          </div>

          {/* Busca Global */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md relative" ref={searchRef}>
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Buscar ocorrências, trilhas, usuários…"
                className="w-full h-9 rounded-lg bg-secondary/40 border border-border/50 pl-9 pr-3 text-sm font-medium placeholder:text-muted-foreground/60 outline-none focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
              />
            </div>

            {/* Dropdown de Busca */}
            {searchOpen && isSearching && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/80 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                <div className="px-3 py-2 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground bg-secondary/30 border-b border-border/50">
                  Resultados da Busca
                </div>
                <div className="p-2">
                  {!hasResults ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      Nenhum resultado encontrado para <span className="font-semibold">"{searchQuery}"</span>
                    </div>
                  ) : (
                    <ul className="space-y-1">
                      {mockSearchResults.map((res, i) => (
                        <li key={i}>
                          <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors text-left">
                            <div className={cn("grid size-8 place-items-center rounded-md shrink-0", res.color)}>
                              <res.icon className="size-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold truncate text-foreground">{res.title}</div>
                              <div className="text-xs font-medium text-muted-foreground">{res.type}</div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Ações e Perfil */}
          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <Button asChild size="sm" className="hidden sm:inline-flex gap-2 shadow-sm shadow-primary/20 hover:-translate-y-0.5 transition-all font-bold tracking-tight">
              <Link to="/app/reportar">
                <ShieldAlert className="size-4" /> Registrar ocorrência
              </Link>
            </Button>

            {/* Notificações */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setNotifOpen(!notifOpen)}
                className={cn("relative grid size-9 place-items-center rounded-lg transition-colors", notifOpen ? "bg-secondary text-foreground" : "hover:bg-secondary/80 text-muted-foreground hover:text-foreground")}
                aria-label="Notificações"
              >
                <Bell className="size-4.5" />
                <span className="absolute top-2 right-2 size-2 rounded-full bg-primary ring-2 ring-background animate-pulse" />
              </button>

              {/* Dropdown Notificações */}
              {notifOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border/80 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                  <div className="flex items-center justify-between px-4 py-3 bg-secondary/30 border-b border-border/50">
                    <span className="text-sm font-bold tracking-tight">Notificações</span>
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">2 Novas</span>
                  </div>
                  <ul className="max-h-80 overflow-y-auto divide-y divide-border/40">
                    <li className="flex gap-3 p-4 hover:bg-secondary/20 transition-colors cursor-pointer group">
                      <div className="grid size-8 shrink-0 place-items-center rounded-full bg-success/10 text-success ring-1 ring-inset ring-success/20 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="size-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold leading-none mb-1">Reporte Validado</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">Sua ocorrência foi analisada pela equipe. +150 XP.</div>
                        <div className="text-[0.65rem] font-semibold text-muted-foreground/60 mt-1.5">Há 10 min</div>
                      </div>
                    </li>
                    <li className="flex gap-3 p-4 hover:bg-secondary/20 transition-colors cursor-pointer group">
                      <div className="grid size-8 shrink-0 place-items-center rounded-full bg-info/10 text-info ring-1 ring-inset ring-info/20 group-hover:scale-110 transition-transform">
                        <BookOpen className="size-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold leading-none mb-1">Nova Trilha de Capacitação</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">Módulo de Engenharia Social liberado.</div>
                        <div className="text-[0.65rem] font-semibold text-muted-foreground/60 mt-1.5">Há 2 horas</div>
                      </div>
                    </li>
                  </ul>
                  <div className="p-2 border-t border-border/50 bg-secondary/10">
                    <button className="w-full text-xs font-bold text-muted-foreground hover:text-foreground transition-colors py-1.5 text-center">
                      Marcar todas como lidas
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Menu do Usuário */}
            <div className="relative hidden md:block" ref={userRef}>
              <button 
                onClick={() => setUserOpen(!userOpen)}
                className="flex items-center gap-2 rounded-full ring-2 ring-transparent hover:ring-primary/20 focus:ring-primary/30 transition-all outline-none"
              >
                <Avatar name={currentUser.name} size={36} />
              </button>

              {/* Dropdown Usuário */}
              {userOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border/80 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50 p-1.5">
                  <div className="px-3 py-2.5 mb-1 border-b border-border/40">
                    <div className="text-sm font-bold truncate">{currentUser.name}</div>
                    <div className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground truncate mt-0.5">{currentUser.role}</div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => { setUserOpen(false); navigate({ to: "/app/dashboard" }); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold rounded-lg hover:bg-secondary/60 transition-colors text-foreground">
                      <User className="size-4 text-muted-foreground" /> Minha Conta
                    </button>
                    <button onClick={() => { setUserOpen(false); navigate({ to: "/app/configuracoes" }); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold rounded-lg hover:bg-secondary/60 transition-colors text-foreground">
                      <Settings className="size-4 text-muted-foreground" /> Configurações
                    </button>
                    <div className="h-px bg-border/40 my-1" />
                    <button onClick={() => { setUserOpen(false); navigate({ to: "/" }); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
                      <LogOut className="size-4" /> Sair com Segurança
                    </button>
                  </div>
                </div>
              )}
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
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
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
          <div className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary/80">{eyebrow}</div>
        )}
        <h1 className="font-display text-2xl md:text-[1.75rem] font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1.5 text-sm md:text-[0.95rem] text-muted-foreground max-w-2xl font-medium leading-relaxed">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
