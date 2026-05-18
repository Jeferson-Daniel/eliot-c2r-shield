import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { trainings, currentUser, levelProgress } from "@/data/mock";
import { Clock, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/capacitacao")({
  head: () => ({ meta: [{ title: "Capacitação — ELIOT" }] }),
  component: CapacitacaoPage,
});

const trainingMetadata: Record<string, { difficulty: "Básico" | "Intermediário" | "Avançado"; xp: number }> = {
  "t-phishing": { difficulty: "Básico", xp: 150 },
  "t-links": { difficulty: "Intermediário", xp: 200 },
  "t-senhas": { difficulty: "Básico", xp: 100 },
  "t-engsocial": { difficulty: "Avançado", xp: 350 },
  "t-anexos": { difficulty: "Intermediário", xp: 250 },
  "t-reportar": { difficulty: "Básico", xp: 120 },
};

function CapacitacaoPage() {
  const completedCount = trainings.filter((t) => t.progress === 100).length;
  const totalCount = trainings.length;
  const overallPct = Math.round((trainings.reduce((acc, t) => acc + t.progress, 0) / (totalCount * 100)) * 100);
  const prog = levelProgress(currentUser.xp);

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-8 space-y-8 md:space-y-10 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Capacitação"
        title="Trilhas de Microlearning"
        description="Aprenda na prática a se defender das ameaças mais comuns do ambiente acadêmico e institucional."
      />

      {/* Painel de Progresso Geral */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2 rounded-[1.5rem] bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-6 flex flex-col justify-center relative overflow-hidden transition-all hover:border-primary/40">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h3 className="text-[0.65rem] font-bold text-primary uppercase tracking-[0.2em] mb-1.5">Progresso Geral</h3>
              <div className="font-display text-3xl font-bold tracking-tight text-foreground">
                {overallPct}% <span className="text-sm text-muted-foreground font-medium tracking-normal">concluído</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold tabular-nums">{completedCount} <span className="text-sm font-medium text-muted-foreground">/ {totalCount}</span></div>
              <div className="text-[0.65rem] font-bold text-muted-foreground/80 uppercase tracking-widest mt-0.5">Trilhas Completas</div>
            </div>
          </div>
          <div className="relative z-10 h-2 w-full mt-5 bg-background/60 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${overallPct}%` }} />
          </div>
          <div className="absolute -right-10 -bottom-10 size-48 bg-primary/5 blur-[30px] rounded-full pointer-events-none" />
        </div>

        <div className="rounded-[1.5rem] border border-border/80 bg-card p-6 flex flex-col justify-center transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-border">
          <div className="text-[0.65rem] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1.5">Nível Institucional</div>
          <div className="font-display text-2xl font-bold tracking-tight truncate text-foreground">{prog.current.name}</div>
          <div className="text-xs font-medium text-muted-foreground mt-2">
            Faltam <span className="tabular-nums font-semibold">{prog.toNext.toLocaleString("pt-BR")}</span> pontos pro próximo
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-border/80 bg-card p-6 flex flex-col justify-center transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-border relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-[0.65rem] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1.5">Pontuação Total</div>
            <div className="font-display text-2xl font-bold tracking-tight text-primary tabular-nums">{currentUser.xp.toLocaleString("pt-BR")} pontos</div>
            <div className="text-xs font-medium text-muted-foreground mt-2">Acumulados nesta jornada</div>
          </div>
        </div>
      </section>

      {/* Grid de Trilhas */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {trainings.map((t) => {
          const meta = trainingMetadata[t.id] || { difficulty: "Básico", xp: 100 };
          const isCompleted = t.progress === 100;
          const isInProgress = t.progress > 0 && t.progress < 100;
          const notStarted = t.progress === 0;

          return (
            <article
              key={t.id}
              className={cn(
                "group relative flex flex-col justify-between rounded-[1.5rem] border p-6 transition-all duration-500 overflow-hidden hover:-translate-y-1",
                isCompleted
                  ? "bg-gradient-to-br from-card to-success/5 border-success/30 shadow-md shadow-success/5 hover:shadow-lg hover:shadow-success/20 hover:border-success/50"
                  : isInProgress
                  ? "bg-card border-primary/40 shadow-md shadow-primary/5 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/60"
                  : "bg-secondary/20 border-border/50 opacity-90 saturate-[0.85] hover:opacity-100 hover:saturate-100"
              )}
            >
              {/* Decorative Glows */}
              {isCompleted && <div className="absolute -top-20 -right-20 size-48 bg-success/10 blur-[30px] rounded-full pointer-events-none transition-colors duration-500 group-hover:bg-success/20" />}
              {isInProgress && <div className="absolute -top-20 -right-20 size-48 bg-primary/10 blur-[30px] rounded-full pointer-events-none transition-colors duration-500 group-hover:bg-primary/20" />}

              <div className="relative">
                <div className="flex items-start justify-between mb-5 gap-4">
                  <div
                    className={cn(
                      "grid size-12 shrink-0 place-items-center rounded-2xl ring-1 ring-inset transition-transform duration-500 group-hover:scale-110",
                      isCompleted
                        ? "bg-success/15 text-success ring-success/30 shadow-inner group-hover:shadow-success/20"
                        : isInProgress
                        ? "bg-primary/15 text-primary ring-primary/30 shadow-inner group-hover:shadow-primary/20"
                        : "bg-secondary text-muted-foreground ring-border/50"
                    )}
                  >
                    {isCompleted ? <CheckCircle2 className="size-6" /> : <GraduationCap className="size-6" />}
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <DifficultyBadge level={meta.difficulty} />
                    <div className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground/80">
                      +{meta.xp} pontos
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center rounded-full bg-secondary/80 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-muted-foreground ring-1 ring-inset ring-border/50 mb-3">
                  {t.category}
                </div>

                <h3
                  className={cn(
                    "font-display text-lg font-semibold tracking-tight leading-snug",
                    notStarted ? "text-muted-foreground" : "text-foreground"
                  )}
                >
                  {t.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground/80 line-clamp-2">
                  {t.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-border/40 relative">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" /> {t.durationMin} min estimados
                  </span>
                  <span className={cn("tabular-nums font-bold", isCompleted && "text-success", isInProgress && "text-primary")}>
                    {t.progress}%
                  </span>
                </div>
                
                <div className="h-1.5 w-full rounded-full bg-secondary/80 overflow-hidden shadow-inner">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      isCompleted ? "bg-success" : isInProgress ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${t.progress}%` }}
                  />
                </div>

                <button
                  className={cn(
                    "mt-5 w-full inline-flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ring-1 ring-inset",
                    isCompleted
                      ? "bg-success/10 text-success ring-success/20 hover:bg-success/20 hover:ring-success/30"
                      : isInProgress
                      ? "bg-primary text-primary-foreground ring-primary hover:bg-primary/90 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                      : "bg-secondary text-muted-foreground ring-border/50 hover:bg-secondary/80 hover:text-foreground"
                  )}
                >
                  {isCompleted ? "Revisar conteúdo" : isInProgress ? "Continuar trilha" : "Iniciar trilha"}
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function DifficultyBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    "Básico": "text-info ring-info/30 bg-info/10",
    "Intermediário": "text-warning ring-warning/30 bg-warning/10",
    "Avançado": "text-destructive ring-destructive/30 bg-destructive/10",
  };

  const style = styles[level] || "text-muted-foreground ring-border/50 bg-secondary";

  return (
    <div className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] ring-1 ring-inset", style)}>
      {level}
    </div>
  );
}
