import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { BADGES, currentUser } from "@/data/mock";
import { Lock, Sparkles, Shield, Star, ShieldCheck, Zap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/badges")({
  head: () => ({ meta: [{ title: "Reconhecimentos — ELIOT" }] }),
  component: BadgesPage,
});

const badgeMetadata: Record<string, { type: "Participação" | "Prevenção" | "Destaque"; points: number; Icon: React.ElementType }> = {
  "primeiro-reporte": { type: "Participação", points: 50, Icon: Shield },
  "cacador-phishing": { type: "Prevenção", points: 300, Icon: ShieldCheck },
  "alerta-preventivo": { type: "Destaque", points: 500, Icon: Zap },
  "colaborador-ativo": { type: "Participação", points: 150, Icon: Star },
  "guardiao-seguranca": { type: "Destaque", points: 1000, Icon: ShieldCheck },
  "olhar-clinico": { type: "Prevenção", points: 250, Icon: Sparkles },
  "mentor-digital": { type: "Destaque", points: 800, Icon: Award },
  "resposta-rapida": { type: "Prevenção", points: 200, Icon: Zap },
  "sentinela-noturna": { type: "Participação", points: 100, Icon: Star },
  "guardiao-dados": { type: "Destaque", points: 750, Icon: Shield },
};

function BadgesPage() {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-8 space-y-6 md:space-y-10 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Reconhecimento"
        title="Reconhecimentos Institucionais"
        description="Cada reconhecimento representa uma conquista real na proteção e fortalecimento da nossa cultura de segurança cibernética."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {BADGES.map((b) => {
          const earned = currentUser.badges.includes(b.slug);
          const meta = badgeMetadata[b.slug] || { type: "Participação", points: 50, Icon: Award };
          const Icon = meta.Icon;

          return (
            <div
              key={b.slug}
              className={cn(
                "relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border p-6 transition-all duration-500 group",
                earned
                  ? "bg-secondary/20 border-primary/20 shadow-sm hover:bg-card hover:shadow-md hover:-translate-y-1 hover:border-primary/40"
                  : "bg-secondary/10 border-border/40 opacity-80 hover:opacity-100"
              )}
            >
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={cn(
                      "grid size-14 place-items-center rounded-2xl ring-1 ring-inset transition-colors duration-500",
                      earned
                        ? "bg-background text-primary ring-border/50 shadow-inner group-hover:bg-primary/10 group-hover:ring-primary/20"
                        : "bg-secondary/50 text-muted-foreground/60 ring-border/50"
                    )}
                  >
                    {earned ? <Icon className="size-6" /> : <Lock className="size-5 opacity-50" />}
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <TypeBadge type={meta.type} earned={earned} />
                    <div className={cn("text-[0.65rem] font-bold uppercase tracking-wider", earned ? "text-muted-foreground/80" : "text-muted-foreground/50")}>
                      +{meta.points} pontos
                    </div>
                  </div>
                </div>

                <h3 className={cn("font-display text-lg font-semibold tracking-tight", earned ? "text-foreground group-hover:text-primary transition-colors" : "text-muted-foreground")}>
                  {b.name}
                </h3>
                <p className={cn("mt-2 text-sm leading-relaxed", earned ? "text-muted-foreground" : "text-muted-foreground/60")}>
                  {b.description}
                </p>
              </div>

              <div className="relative mt-8 border-t border-border/40 pt-4">
                <div className="flex items-center justify-between">
                  {earned ? (
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <Sparkles className="size-3.5" />
                      <span>Concedido</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground/60">
                      <Lock className="size-3.5" />
                      <span>Pendente</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TypeBadge({ type, earned }: { type: string; earned: boolean }) {
  const style = earned 
    ? "bg-secondary text-secondary-foreground ring-border/50" 
    : "bg-secondary/30 text-muted-foreground/50 ring-border/30";

  return (
    <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest ring-1 ring-inset", style)}>
      {type}
    </div>
  );
}
