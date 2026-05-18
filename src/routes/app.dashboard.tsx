import { createFileRoute, Link } from "@tanstack/react-router";
import { Avatar } from "@/components/eliot/Sidebar";
import { StatusBadge, SeverityPill } from "@/components/eliot/StatusBits";
import { currentUser, levelProgress, myIncidents, notifications, users, BADGES } from "@/data/mock";
import { 
  Award, ArrowUpRight, Bell, Sparkles, TrendingUp, ShieldAlert, CheckCircle2, 
  Shield, Clock, Zap, Activity, ShieldCheck, Search, Lightbulb, AlertTriangle, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Centro Operacional — ELIOT" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { pct, current, next, toNext } = levelProgress(currentUser.xp);
  const ranking = [...users].sort((a, b) => b.xp - a.xp).slice(0, 5);
  const myBadges = BADGES.filter((b) => currentUser.badges.includes(b.slug)).slice(0, 4);

  // Dicas reescritas como Radar Operacional
  const radarItems = [
    { title: "Verificação de Remetente", desc: "Sempre inspecione os cabeçalhos de e-mails suspeitos antes de clicar.", icon: Search, priority: "Alta" },
    { title: "Comportamento de Anexos", desc: "Bloqueio preventivo ativado para extensões executáveis (.exe, .scr).", icon: ShieldCheck, priority: "Crítica" },
    { title: "Campanhas de Phishing", desc: "Aumento de 12% em fraudes envolvendo solicitações financeiras.", icon: AlertTriangle, priority: "Moderada" },
  ];

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-8 space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* 1. Hero Principal Mais Forte */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between border-b border-border/60 pb-6">
        <div>
           <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary ring-1 ring-inset ring-primary/20 shadow-sm mb-4">
             <Activity className="size-3.5" /> Centro Operacional
           </div>
           <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
             Painel Institucional de Segurança
           </h1>
           <p className="max-w-2xl text-muted-foreground/90 mt-2 text-sm sm:text-base leading-relaxed">
             Monitore ameaças reportadas, acompanhe indicadores operacionais e fortaleça a cultura de segurança digital da instituição.
           </p>
           
           <div className="flex flex-wrap items-center gap-3 pt-5">
             <div className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-success ring-1 ring-inset ring-success/20 transition-all hover:bg-success/20">
               <ShieldCheck className="size-3.5" /> 4 Incidentes validados
             </div>
             <div className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-warning ring-1 ring-inset ring-warning/20 transition-all hover:bg-warning/20">
               <Zap className="size-3.5" /> 1 Ocorrência em análise
             </div>
             <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-primary ring-1 ring-inset ring-primary/20 transition-all hover:bg-primary/20">
               <TrendingUp className="size-3.5" /> Engajamento crescente
             </div>
           </div>
        </div>
        <Button asChild size="lg" className="h-12 px-6 gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all w-full sm:w-auto font-bold shrink-0">
           <Link to="/app/reportar"><ShieldAlert className="size-4" /> Registrar Ocorrência</Link>
        </Button>
      </div>

      {/* 2. Card Principal do Usuário (Operacional) */}
      <div className="relative overflow-hidden rounded-[1.5rem] border border-primary/20 bg-card/60 backdrop-blur-xl shadow-lg ring-soft group">
        <div className="absolute -top-40 -left-40 size-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none transition-opacity duration-1000 group-hover:opacity-70" />
        <div className="relative p-6 md:p-8 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full lg:w-auto">
            <div className="relative shrink-0">
              <Avatar name={currentUser.name} size={96} />
              <div className="absolute -bottom-2 -right-2 rounded-full border-[3px] border-card bg-primary p-1.5 text-primary-foreground shadow-md ring-2 ring-primary/20">
                 <Shield className="size-5" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0 text-center sm:text-left mt-2 sm:mt-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
                <h2 className="font-display text-2xl font-bold tracking-tight">{currentUser.name}</h2>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] rounded-full bg-primary/10 text-primary px-2.5 py-1 ring-1 ring-inset ring-primary/25 shadow-sm">
                  Nível Operacional: {current.name}
                </span>
              </div>
              <p className="text-sm font-medium text-muted-foreground/90 mb-5">{currentUser.role} · {currentUser.department}</p>
              
              <div className="max-w-md w-full mx-auto sm:mx-0">
                <div className="flex items-center justify-between text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  <span className="text-primary">{currentUser.xp.toLocaleString("pt-BR")} XP Acumulado</span>
                  <span>Meta: {next ? toNext.toLocaleString("pt-BR") : 0} XP</span>
                </div>
                <div className="h-2.5 rounded-full bg-secondary/60 overflow-hidden ring-1 ring-inset ring-border/60 shadow-inner">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-info relative transition-[width] duration-1000 ease-out" style={{ width: `${pct}%` }}>
                     <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full lg:w-auto shrink-0">
             <div className="flex flex-col justify-center rounded-2xl bg-secondary/30 border border-border/60 p-4 text-center transition-all hover:bg-secondary/50 hover:border-border hover:-translate-y-0.5 shadow-sm">
               <div className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1">Meus Reportes</div>
               <div className="text-3xl font-display font-bold text-foreground">{myIncidents.length}</div>
             </div>
             <div className="flex flex-col justify-center rounded-2xl bg-success/5 border border-success/20 p-4 text-center transition-all hover:bg-success/10 hover:-translate-y-0.5 shadow-sm">
               <div className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-success/80 mb-1">Ameaças Validadas</div>
               <div className="text-3xl font-display font-bold text-success">{myIncidents.filter(i => i.status === "Validado" || i.status === "Concluído").length}</div>
             </div>
             <div className="flex flex-col justify-center rounded-2xl bg-primary/5 border border-primary/20 p-4 text-center transition-all hover:bg-primary/10 hover:-translate-y-0.5 shadow-sm">
               <div className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-primary/80 mb-1">Posição Global</div>
               <div className="text-3xl font-display font-bold text-primary">#{users.sort((a,b)=>b.xp-a.xp).findIndex(u=>u.id===currentUser.id)+1}</div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Coluna Principal: 2/3 da largura no desktop */}
        <div className="xl:col-span-2 flex flex-col gap-6 lg:gap-8">
          
          {/* 3. Meus Reportes Recentes */}
          <Panel
            className="flex-1"
            title="Histórico Operacional Recente"
            icon={<Activity className="size-4.5 text-primary" />}
            action={<Link to="/app/meus-reportes" className="text-[0.7rem] font-bold uppercase tracking-widest text-primary hover:underline flex items-center gap-1 group">Ver histórico completo <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>}
          >
            <ul className="space-y-3 mt-2">
              {myIncidents.slice(0, 5).map((inc) => {
                const color = 
                  inc.category === "Phishing" ? "bg-info border-info/20 text-info" :
                  inc.category === "Malware" ? "bg-warning border-warning/20 text-warning" :
                  inc.category === "Vazamento de dados" ? "bg-destructive border-destructive/20 text-destructive" :
                  "bg-primary border-primary/20 text-primary";

                return (
                  <li key={inc.id} className="relative group flex flex-col sm:flex-row sm:items-center gap-4 rounded-[1.25rem] border border-border/60 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5">
                    {/* Indicador lateral colorido */}
                    <div className={cn("absolute left-0 top-4 bottom-4 w-1 rounded-r-full opacity-70 group-hover:opacity-100 transition-opacity", color.split(' ')[0])} />
                    
                    <div className="flex-1 min-w-0 pl-3">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="text-sm font-bold truncate tracking-tight text-foreground group-hover:text-primary transition-colors">{inc.title}</div>
                        <div className="shrink-0 text-xs font-medium text-muted-foreground">
                          {new Date(inc.createdAt).toLocaleDateString("pt-BR", { day: '2-digit', month: 'short' })}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest ring-1 ring-inset", color.split(' ')[0].replace('bg', 'bg-opacity-10'), color.split(' ')[1], color.split(' ')[2])}>
                          {inc.category}
                        </span>
                        <SeverityPill severity={inc.severity} />
                        <StatusBadge status={inc.status} />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* 6. Radar de Segurança */}
            <Panel title="Radar de Segurança" icon={<Search className="size-4.5 text-primary" />}>
              <div className="space-y-4 mt-2">
                {radarItems.map((item, idx) => (
                  <div key={idx} className="group relative rounded-2xl border border-border/80 bg-secondary/20 p-4 transition-all duration-300 hover:bg-card hover:border-primary/30 hover:shadow-md">
                    <div className="flex items-start justify-between mb-2">
                      <div className="grid size-8 place-items-center rounded-lg bg-background ring-1 ring-inset ring-border/50 text-primary group-hover:scale-110 transition-transform">
                        <item.icon className="size-4" />
                      </div>
                      <div className={cn("text-[0.6rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md", 
                        item.priority === "Alta" ? "bg-warning/10 text-warning" : 
                        item.priority === "Crítica" ? "bg-destructive/10 text-destructive" : 
                        "bg-info/10 text-info"
                      )}>
                        Prioridade {item.priority}
                      </div>
                    </div>
                    <div className="text-sm font-bold tracking-tight mt-3">{item.title}</div>
                    <div className="text-xs text-muted-foreground/90 mt-1.5 leading-relaxed">{item.desc}</div>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                  </div>
                ))}
              </div>
            </Panel>

            {/* 7. Emblemas Conquistados */}
            <Panel title="Inventário de Emblemas" icon={<Award className="size-4.5 text-primary" />} action={<Link to="/app/badges" className="text-[0.7rem] font-bold uppercase tracking-widest text-primary hover:underline">Ver acervo</Link>}>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {myBadges.map((b) => (
                  <div key={b.slug} className="group relative flex flex-col items-center justify-center rounded-[1.25rem] border border-border/80 bg-secondary/20 p-5 transition-all duration-300 hover:bg-card hover:border-primary/30 hover:shadow-sm overflow-hidden text-center">
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="grid size-12 place-items-center rounded-2xl bg-background text-primary ring-1 ring-inset ring-border/50 mb-3 shadow-inner group-hover:bg-primary/10 group-hover:ring-primary/20 transition-colors mx-auto">
                        <Award className="size-6" />
                      </div>
                      <div className="text-xs font-bold tracking-tight">{b.name}</div>
                      <div className="text-[0.6rem] font-semibold text-muted-foreground/80 mt-1">Conquista Institucional</div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>

        {/* Coluna Lateral: 1/3 da largura no desktop */}
        <div className="flex flex-col gap-6 lg:gap-8">
          
          {/* 4. Top Engajamento */}
          <Panel title="Top Engajamento" icon={<TrendingUp className="size-4.5 text-primary" />} action={<Link to="/app/ranking" className="text-[0.7rem] font-bold uppercase tracking-widest text-primary hover:underline">Ranking Geral</Link>}>
            <ol className="space-y-3 mt-2">
              {ranking.map((u, i) => {
                const isTop1 = i === 0;
                return (
                  <li key={u.id} className={cn(
                    "group relative flex items-center gap-3.5 rounded-2xl border p-3 transition-all",
                    isTop1 ? "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50 hover:bg-amber-500/10 hover:shadow-md hover:shadow-amber-500/10" : "border-border/60 bg-card hover:border-primary/30 hover:shadow-sm"
                  )}>
                    <div className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-all group-hover:scale-110 shadow-inner",
                      i === 0 ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-amber-500/40 ring-2 ring-amber-500/20" : 
                      i === 1 ? "bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-slate-500/40 ring-1 ring-slate-400/20" :
                      i === 2 ? "bg-gradient-to-br from-orange-600 to-orange-800 text-white shadow-orange-700/40 ring-1 ring-orange-700/20" : 
                      "bg-secondary text-muted-foreground ring-1 ring-border"
                    )}>
                      {i + 1}
                    </div>
                    <Avatar name={u.name} size={36} />
                    <div className="flex-1 min-w-0">
                      <div className={cn("text-sm font-bold truncate transition-colors", isTop1 ? "text-amber-500 group-hover:text-amber-600" : "group-hover:text-primary")}>{u.name}</div>
                      <div className="text-xs font-semibold text-muted-foreground truncate">{u.xp.toLocaleString()} XP</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Panel>

          {/* 5. Alertas Institucionais (Feed Operacional) */}
          <Panel className="flex-1" title="Feed Operacional" icon={<Bell className="size-4.5 text-primary" />}>
            <ul className="space-y-5 mt-3">
              {[
                { title: "Nova campanha de phishing identificada", body: "Disparos usando identidade da biblioteca bloqueados.", kind: "critical", time: "há 3 min" },
                { title: "Seu reporte foi validado", body: "Recompensa de +150 XP creditada no seu perfil.", kind: "success", time: "há 20 min" },
                { title: "Módulo de segurança atualizado", body: "Nova trilha sobre Engenharia Social disponível.", kind: "info", time: "há 1 h" },
                { title: "Tentativa de acesso bloqueada", body: "Login suspeito impedido pelo MFA.", kind: "warning", time: "há 2 h" },
              ].map((n, idx) => (
                <li key={idx} className="group relative flex gap-4 cursor-default">
                  <div className="relative mt-1 flex flex-col items-center">
                    <div className="relative flex size-3 shrink-0">
                      {n.kind === "critical" && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />}
                      <span className={cn(
                        "relative inline-flex size-3 rounded-full shadow-inner",
                        n.kind === "success" ? "bg-success" :
                        n.kind === "warning" ? "bg-warning" :
                        n.kind === "critical" ? "bg-destructive" : "bg-info"
                      )} />
                    </div>
                    {/* Linha conectora se não for o último */}
                    {idx < 3 && <div className="w-0.5 h-full bg-border/60 absolute top-4 bottom-[-16px] rounded-full group-hover:bg-primary/20 transition-colors" />}
                  </div>
                  
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className={cn(
                        "text-[0.6rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md",
                        n.kind === "critical" ? "text-destructive bg-destructive/10" :
                        n.kind === "success" ? "text-success bg-success/10" :
                        n.kind === "warning" ? "text-warning bg-warning/10" : "text-info bg-info/10"
                      )}>
                        {n.kind === "critical" ? "Urgente" : n.kind === "success" ? "Sistema" : n.kind === "warning" ? "Alerta" : "Info"}
                      </div>
                      <div className="text-[0.65rem] font-medium text-muted-foreground whitespace-nowrap">{n.time}</div>
                    </div>
                    <div className="text-sm font-bold tracking-tight leading-tight group-hover:text-primary transition-colors">{n.title}</div>
                    <div className="text-xs text-muted-foreground/90 mt-1 leading-relaxed">{n.body}</div>
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

function Panel({ title, icon, action, children, className }: { title: string; icon?: React.ReactNode; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-[1.5rem] border border-border/80 bg-card/60 backdrop-blur-xl p-5 sm:p-7 shadow-sm transition-all hover:shadow-lg hover:border-primary/30 flex flex-col group/panel relative overflow-hidden", className)}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover/panel:opacity-100 transition-opacity duration-700" />
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon && <div className="grid place-items-center size-9 rounded-xl bg-secondary/80 ring-1 ring-inset ring-border/50 shadow-inner transition-transform group-hover/panel:scale-110 group-hover/panel:bg-primary/10 group-hover/panel:ring-primary/20">{icon}</div>}
          <h3 className="font-display font-semibold tracking-tight text-lg">{title}</h3>
        </div>
        {action}
      </div>
      <div className="relative z-10 flex-1">
        {children}
      </div>
    </section>
  );
}
