import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, AlertOctagon, ListChecks, GraduationCap, Trophy,
  Award, ShieldCheck, Settings, LogOut,
} from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { currentUser } from "@/data/mock";

export const NAV = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/reportar", label: "Reportar incidente", icon: AlertOctagon },
  { to: "/app/meus-reportes", label: "Meus reportes", icon: ListChecks },
  { to: "/app/capacitacao", label: "Capacitação", icon: GraduationCap },
  { to: "/app/ranking", label: "Ranking", icon: Trophy },
  { to: "/app/badges", label: "Badges", icon: Award },
] as const;

export const ADMIN_NAV = [
  { to: "/app/admin", label: "Painel admin", icon: ShieldCheck },
  { to: "/app/admin/analytics", label: "Analytics", icon: LayoutDashboard },
] as const;

export function DesktopSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) =>
    to === "/app/admin" ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar sticky top-0 h-screen">
      <div className="px-5 h-16 flex items-center border-b border-sidebar-border">
        <Link to="/app/dashboard"><Logo /></Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        <NavGroup label="Plataforma" items={NAV} isActive={isActive} />
        <NavGroup label="Administração" items={ADMIN_NAV} isActive={isActive} />
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Link
          to="/app/configuracoes"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-sidebar-accent",
            "text-sidebar-foreground/80 hover:text-sidebar-foreground"
          )}
        >
          <Avatar name={currentUser.name} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{currentUser.name}</div>
            <div className="truncate text-xs text-muted-foreground">{currentUser.role}</div>
          </div>
          <Settings className="size-4 text-muted-foreground" />
        </Link>
        <Link
          to="/"
          className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
        >
          <LogOut className="size-4" /> Sair
        </Link>
      </div>
    </aside>
  );
}

function NavGroup({
  label,
  items,
  isActive,
}: {
  label: string;
  items: readonly { to: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
  isActive: (to: string) => boolean;
}) {
  return (
    <div>
      <div className="px-3 mb-2 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
        {label}
      </div>
      <ul className="space-y-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  active
                    ? "bg-sidebar-accent text-sidebar-foreground ring-1 ring-inset ring-primary/25 shadow-[inset_2px_0_0_var(--color-primary)]"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                )}
              >
                <Icon className={cn("size-4 shrink-0", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                <span className="truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  return (
    <div
      className="grid place-items-center rounded-full text-xs font-semibold text-primary-foreground"
      style={{
        width: size, height: size,
        background: "linear-gradient(135deg, oklch(0.82 0.14 210), oklch(0.66 0.16 240))",
        boxShadow: "inset 0 0 0 1px oklch(1 0 0 / 0.12)",
      }}
    >
      {initials}
    </div>
  );
}

export function MobileBottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = [
    { to: "/app/dashboard", label: "Início", icon: LayoutDashboard },
    { to: "/app/reportar", label: "Reportar", icon: AlertOctagon },
    { to: "/app/capacitacao", label: "Trilhas", icon: GraduationCap },
    { to: "/app/ranking", label: "Ranking", icon: Trophy },
  ] as const;
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-sidebar/95 backdrop-blur px-2 pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-4">
        {items.map((it) => {
          const Icon = it.icon;
          const active = pathname === it.to;
          return (
            <li key={it.to}>
              <Link
                to={it.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[0.65rem] font-medium",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="size-5" />
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
