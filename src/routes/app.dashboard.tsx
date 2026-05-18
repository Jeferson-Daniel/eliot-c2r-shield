import { createFileRoute, Link } from "@tanstack/react-router";
import { Avatar } from "@/components/eliot/Sidebar";
import { StatusBadge, SeverityPill } from "@/components/eliot/StatusBits";
import { currentUser, levelProgress, myIncidents, notifications, users, BADGES } from "@/data/mock";
import { Award, ArrowUpRight, Bell, Sparkles, TrendingUp, ShieldAlert, CheckCircle2, AlertTriangle, Shield, Clock } from "lucide-react";
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
    "Verifique o remetente antes de clicar em links recebidos por e-mail.",
    "Senhas fortes têm 4 palavras incomuns combinadas. Use um gerenciador.",
    "Anexos .exe e .scr são quase sempre maliciosos no contexto acadêmico.",
  ];

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500">
      {/* Header section com botão de ação principal */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
           <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Painel de Segurança</h1>
           <p className="text-muted-foreground mt-1 text-sm sm:text-base">Bem-vindo(a) de volta, {currentUser.name.split(" ")[0]}. Veja o panorama da sua instituição.</p>
        </div>
        <Button asChild size="lg" className="gap-2 shadow-sm hover:shadow transition-all w-full sm:w-auto">
           <Link to="/app/reportar"><ShieldAlert className="size-4" /> Reportar incidente</Link>
        </Button>
      </div>

      {/* Hero / Overview Panel (Visão Geral) */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-border bg-card ring-soft group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background opacity-50 transition-opacity duration-700 group-hover:opacity-70" />
        <div className="relative p-5 sm:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          
          <div className="flex items-center gap-5 md:gap-6 w-full md:w-auto">
            <div className="relative shrink-0">
              <Avatar name={currentUser.name} size={72} />
              <div className="absolute -bottom-2 -right-2 rounded-full border-[3px] border-card bg-primary/10 p-1 text-primary">
                 <Shield className="size-4" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight truncate">{currentUser.name}</h2>
                <span className="text-xs font-medium rounded-full bg-primary/10 text-primary px-2.5 py-1 ring-1 ring-inset ring-primary/25 shrink-0">
                  Nível {current.name}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 truncate">{currentUser.role} · {currentUser.department}</p>
              
              {/* Barra de Progresso embutida no Hero */}
              <div className="max-w-xs w-full">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5 font-medium">
                  <span>{currentUser.xp.toLocaleString("pt-BR")} XP</span>
                  <span>Faltam {next ? toNext.toLocaleString("pt-BR") : 0} XP para o próximo nível</span>
                </div>
                <div className="h-2 rounded-full bg-secondary/80 overflow-hidden ring-1 ring-inset ring-border/50">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-info transition-[width] duration-1000 ease-out" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex gap-6 divide-x divide-border w-full md:w-auto justify-end">
             <div className="px-6 text-center group/kpi">
               <div className="text-3xl font-display font-semibold tracking-tight transition-transform group-hover/kpi:-translate-y-0.5">{myIncidents.length}</div>
               <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">Seus Reportes</div>
             </div>
             <div className="px-6 text-center group/kpi">
               <div className="text-3xl font-display font-semibold tracking-tight text-success transition-transform group-hover/kpi:-translate-y-0.5">{myIncidents.filter(i => i.status === "Validado" || i.status === "Concluído").length}</div>
               <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">Validados</div>
             </div>
             <div className="px-6 text-center group/kpi">
               <div className="text-3xl font-display font-semibold tracking-tight text-primary transition-transform group-hover/kpi:-translate-y-0.5">#{users.sort((a,b)=>b.xp-a.xp).findIndex(u=>u.id===currentUser.id)+1}</div>
               <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">Ranking</div>
             </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout (Grade Assimétrica) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Coluna Principal: 2/3 da largura no desktop */}
        <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
          
          {/* Quick KPIs Mobile/Tablet (Aparecem quando o Hero os esconde no mobile) */}
          <div className="grid grid-cols-2 lg:hidden gap-4">
             <Kpi label="Total de Reportes" value={myIncidents.length} tone="primary" Icon={AlertTriangle} />
             <Kpi label="Validados" value={myIncidents.filter(i => i.status === "Validado" || i.status === "Concluído").length} tone="success" Icon={CheckCircle2} />
          </div>

          {/* Reportes Recentes - Expandido */}
          <Panel
            className="flex-1"
            title="Meus Reportes Recentes"
            icon={<Clock className="size-4 text-muted-foreground" />}
            action={<Link to="/app/meus-reportes" className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1 group">Ver histórico <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>}
          >
            <ul className="divide-y divide-border/60">
              {myIncidents.slice(0, 5).map((inc) => (
                <li key={inc.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 group transition-colors hover:bg-muted/30 -mx-4 px-4 rounded-lg cursor-default">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate text-foreground group-hover:text-primary transition-colors">{inc.title}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                      <span className="truncate">{inc.category}</span>
                      <span className="size-1 rounded-full bg-border" />
                      <span>{new Date(inc.createdAt).toLocaleDateString("pt-BR", { day: '2-digit', month: 'short' })}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0 shrink-0">
                    <SeverityPill severity={inc.severity} />
                    <StatusBadge status={inc.status} />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          {/* Badges e Dicas (Linha inferior da coluna principal) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Panel title="Conquistas" icon={<Award className="size-4 text-muted-foreground" />} action={<Link to="/app/badges" className="text-xs text-primary hover:underline font-medium">Ver galeria</Link>}>
              <div className="grid grid-cols-2 gap-3 mt-1">
                {myBadges.map((b) => (
                  <div key={b.slug} className="group relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-b from-secondary/40 to-secondary/10 p-3 transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
                    <div className="absolute -top-2 -right-2 p-2 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-300">
                      <Award className="size-16" />
                    </div>
                    <div className="relative">
                      <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 mb-3 shadow-sm group-hover:bg-primary/20 transition-colors">
                        <Award className="size-4" />
                      </div>
                      <div className="text-sm font-semibold tracking-tight">{b.name}</div>
                      <div className="text-[0.65rem] text-muted-foreground line-clamp-2 mt-1 leading-relaxed">{b.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Radar de Segurança" icon={<Sparkles className="size-4 text-muted-foreground" />}>
              <ul className="space-y-3 mt-1">
                {tips.map((t, i) => (
                  <li key={i} className="group flex gap-3 rounded-xl border border-border/50 bg-secondary/20 p-3.5 text-sm text-muted-foreground transition-all hover:bg-secondary/40 hover:text-foreground hover:shadow-sm">
                    <div className="mt-0.5 shrink-0">
                      <Sparkles className="size-4 text-primary/70 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="leading-snug">{t}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>

        {/* Coluna Lateral: 1/3 da largura no desktop */}
        <div className="flex flex-col gap-4 sm:gap-6">
          
          <Panel title="Top Engajamento" icon={<TrendingUp className="size-4 text-muted-foreground" />} action={<Link to="/app/ranking" className="text-xs text-primary hover:underline font-medium">Ver Ranking</Link>}>
            <ol className="space-y-1.5 mt-1">
              {ranking.map((u, i) => (
                <li key={u.id} className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted/40 cursor-default">
                  <div className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all group-hover:scale-110 ${
                    i === 0 ? "bg-amber-500/10 text-amber-500 ring-1 ring-inset ring-amber-500/20" : 
                    i === 1 ? "bg-slate-300/10 text-slate-400 ring-1 ring-inset ring-slate-300/20" :
                    i === 2 ? "bg-orange-700/10 text-orange-600 ring-1 ring-inset ring-orange-700/20" : 
                    "text-muted-foreground font-medium"
                  }`}>
                    {i + 1}
                  </div>
                  <Avatar name={u.name} size={32} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate group-hover:text-primary transition-colors">{u.name}</div>
                    <div className="text-[0.65rem] text-muted-foreground truncate">{u.xp.toLocaleString()} pontos</div>
                  </div>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel className="flex-1" title="Alertas Institucionais" icon={<Bell className="size-4 text-muted-foreground" />}>
            <ul className="space-y-4 mt-1">
              {notifications.slice(0, 4).map((n) => (
                <li key={n.id} className="group flex gap-3 cursor-default">
                  <div className="relative mt-1 flex size-2.5 shrink-0">
                    {n.kind === "critical" && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>}
                    <span className={`relative inline-flex size-2.5 rounded-full ${
                      n.kind === "success" ? "bg-success" :
                      n.kind === "warning" ? "bg-warning" :
                      n.kind === "critical" ? "bg-destructive" :
                      "bg-info"
                    }`}></span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium leading-tight group-hover:text-foreground/90 transition-colors">{n.title}</div>
                    <div className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">{n.body}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value, tone, Icon }: { label: string; value: React.ReactNode; tone: "primary" | "success" | "warning" | "info"; Icon: React.ComponentType<{ className?: string }> }) {
  const styles = {
    primary: { text: "text-primary", bg: "bg-primary/10", ring: "ring-primary/25", border: "border-primary/20" },
    success: { text: "text-success", bg: "bg-success/10", ring: "ring-success/25", border: "border-success/20" },
    warning: { text: "text-warning", bg: "bg-warning/10", ring: "ring-warning/25", border: "border-warning/20" },
    info: { text: "text-info", bg: "bg-info/10", ring: "ring-info/25", border: "border-info/20" },
  };
  const s = styles[tone];
  
  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5 group ${s.border}`}>
      <div className={`absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 group-hover:rotate-12 transition-all duration-300 ${s.text}`}>
        <Icon className="size-24" />
      </div>
      <div className={`grid size-10 place-items-center rounded-xl ring-1 ring-inset shadow-sm transition-colors group-hover:bg-opacity-20 ${s.bg} ${s.text} ${s.ring}`}>
        <Icon className="size-5" />
      </div>
      <div className="mt-5 font-display text-3xl font-bold tracking-tight tabular-nums">{value}</div>
      <div className="text-sm text-muted-foreground mt-1 font-medium">{label}</div>
    </div>
  );
}

function Panel({ title, icon, action, children, className }: { title: string; icon?: React.ReactNode; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm p-5 sm:p-6 shadow-sm transition-all hover:shadow hover:border-border group/panel flex flex-col ${className ?? ""}`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          {icon && <div className="grid place-items-center size-8 rounded-lg bg-muted/50 ring-1 ring-inset ring-border/50 transition-colors group-hover/panel:bg-muted">{icon}</div>}
          <h3 className="font-semibold tracking-tight text-base sm:text-lg">{title}</h3>
        </div>
        {action}
      </div>
      <div className="flex-1">
        {children}
      </div>
    </section>
  );
}
