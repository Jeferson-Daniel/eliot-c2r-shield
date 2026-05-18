import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { Avatar } from "@/components/eliot/Sidebar";
import { StatusBadge, SeverityPill } from "@/components/eliot/StatusBits";
import { currentUser, levelProgress, myIncidents, notifications, users, BADGES } from "@/data/mock";
import { Award, ArrowUpRight, Bell, Sparkles, TrendingUp, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — ELIOT" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { pct, current, next, toNext } = levelProgress(currentUser.xp);
  const ranking = [...users].sort((a, b) => b.xp - a.xp).slice(0, 5);
  const myBadges = BADGES.filter((b) => currentUser.badges.includes(b.slug)).slice(0, 4);
  const tips = [
    "Sempre verifique o remetente antes de clicar em links recebidos por e-mail.",
    "Senhas fortes têm 4 palavras incomuns combinadas. Use um gerenciador.",
    "Anexos .exe, .scr e .iso são quase sempre maliciosos no contexto acadêmico.",
  ];

  return (
    <div className="mx-auto max-w-7xl p-5 md:p-8 space-y-8">
      <PageHeader
        eyebrow={`Olá, ${currentUser.name.split(" ")[0]}`}
        title="Sua central de cibersegurança institucional"
        description="Acompanhe seu progresso, veja alertas e mantenha sua comunidade protegida."
        actions={
          <Button asChild className="gap-1.5"><Link to="/app/reportar"><ShieldAlert className="size-4" /> Reportar incidente</Link></Button>
        }
      />

      {/* Level + KPIs */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 ring-soft">
          <div className="flex items-center gap-4">
            <Avatar name={currentUser.name} size={56} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-semibold truncate">{currentUser.name}</h2>
                <span className="text-xs rounded-full bg-primary/10 text-primary px-2 py-0.5 ring-1 ring-inset ring-primary/25">
                  {current.name}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">{currentUser.role} · {currentUser.department}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-2xl">{currentUser.xp.toLocaleString("pt-BR")}</div>
              <div className="text-xs text-muted-foreground">pontos C2R</div>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Progresso para <span className="text-foreground">{next?.name ?? "nível máximo"}</span></span>
              <span>{next ? `Faltam ${toNext.toLocaleString("pt-BR")} pts` : "Concluído"}</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-info transition-[width]" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Kpi label="Reportes ativos" value={myIncidents.filter(i => i.status !== "Concluído" && i.status !== "Rejeitado").length} tone="primary" Icon={ShieldAlert} />
          <Kpi label="Validados" value={myIncidents.filter(i => i.status === "Validado" || i.status === "Concluído").length} tone="success" Icon={TrendingUp} />
          <Kpi label="Badges" value={currentUser.badges.length} tone="info" Icon={Award} />
          <Kpi label="Posição no ranking" value={`#${users.sort((a,b)=>b.xp-a.xp).findIndex(u=>u.id===currentUser.id)+1}`} tone="warning" Icon={Sparkles} />
        </div>
      </div>

      {/* Recent incidents + ranking */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Meus reportes recentes"
          action={<Link to="/app/meus-reportes" className="text-xs text-primary hover:underline inline-flex items-center gap-1">Ver todos <ArrowUpRight className="size-3.5" /></Link>}
        >
          <ul className="divide-y divide-border">
            {myIncidents.slice(0, 5).map((inc) => (
              <li key={inc.id} className="py-3 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{inc.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {inc.category} · {new Date(inc.createdAt).toLocaleDateString("pt-BR")}
                  </div>
                </div>
                <SeverityPill severity={inc.severity} />
                <StatusBadge status={inc.status} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Mini ranking" action={<Link to="/app/ranking" className="text-xs text-primary hover:underline inline-flex items-center gap-1">Ranking completo <ArrowUpRight className="size-3.5" /></Link>}>
          <ol className="space-y-2.5">
            {ranking.map((u, i) => (
              <li key={u.id} className="flex items-center gap-3">
                <span className="w-5 text-xs text-muted-foreground tabular-nums">{i + 1}</span>
                <Avatar name={u.name} size={28} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{u.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{u.role}</div>
                </div>
                <div className="text-sm font-medium tabular-nums">{u.xp.toLocaleString("pt-BR")}</div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>

      {/* Badges + notifications + tips */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Badges recentes" action={<Link to="/app/badges" className="text-xs text-primary hover:underline">Ver todas</Link>}>
          <div className="grid grid-cols-2 gap-3">
            {myBadges.map((b) => (
              <div key={b.slug} className="rounded-xl border border-border p-3 bg-secondary/30">
                <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/25 mb-2">
                  <Award className="size-4" />
                </div>
                <div className="text-sm font-medium">{b.name}</div>
                <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{b.description}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Notificações">
          <ul className="space-y-3">
            {notifications.slice(0, 4).map((n) => (
              <li key={n.id} className="flex gap-3">
                <div className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg ring-1 ring-inset ${
                  n.kind === "success" ? "bg-success/10 text-success ring-success/25" :
                  n.kind === "warning" ? "bg-warning/10 text-warning ring-warning/25" :
                  n.kind === "critical" ? "bg-destructive/10 text-destructive ring-destructive/25" :
                  "bg-info/10 text-info ring-info/25"
                }`}>
                  <Bell className="size-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.body}</div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Dicas rápidas">
          <ul className="space-y-3">
            {tips.map((t, i) => (
              <li key={i} className="rounded-xl border border-border bg-secondary/30 p-3 text-sm text-muted-foreground">
                <Sparkles className="size-4 inline mr-2 text-primary" /> {t}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Kpi({ label, value, tone, Icon }: { label: string; value: React.ReactNode; tone: "primary" | "success" | "warning" | "info"; Icon: React.ComponentType<{ className?: string }> }) {
  const tones = {
    primary: "text-primary bg-primary/10 ring-primary/25",
    success: "text-success bg-success/10 ring-success/25",
    warning: "text-warning bg-warning/10 ring-warning/25",
    info: "text-info bg-info/10 ring-info/25",
  } as const;
  return (
    <div className="rounded-2xl border border-border bg-card p-4 ring-soft">
      <div className={`grid size-9 place-items-center rounded-lg ring-1 ring-inset ${tones[tone]}`}><Icon className="size-4" /></div>
      <div className="mt-4 font-display text-2xl tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function Panel({ title, action, children, className }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-border bg-card p-5 ring-soft ${className ?? ""}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}
