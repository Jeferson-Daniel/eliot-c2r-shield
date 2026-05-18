import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { BADGES, currentUser } from "@/data/mock";
import { Lock, Sparkles, Shield, Star, ShieldCheck, Zap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/badges")({
  head: () => ({ meta: [{ title: "Emblemas — ELIOT" }] }),
  component: BadgesPage,
});

const badgeMetadata: Record<string, { rarity: "Comum" | "Raro" | "Épico"; points: number; Icon: React.ElementType }> = {
  "primeiro-reporte": { rarity: "Comum", points: 50, Icon: Shield },
  "cacador-phishing": { rarity: "Raro", points: 300, Icon: ShieldCheck },
  "alerta-preventivo": { rarity: "Épico", points: 500, Icon: Zap },
  "colaborador-ativo": { rarity: "Comum", points: 150, Icon: Star },
  "guardiao-seguranca": { rarity: "Épico", points: 1000, Icon: ShieldCheck },
  "olhar-clinico": { rarity: "Raro", points: 250, Icon: Sparkles },
  "mentor-digital": { rarity: "Épico", points: 800, Icon: Award },
  "resposta-rapida": { rarity: "Raro", points: 200, Icon: Zap },
  "sentinela-noturna": { rarity: "Comum", points: 100, Icon: Star },
  "guardiao-dados": { rarity: "Épico", points: 750, Icon: Shield },
};

function BadgesPage() {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-8 space-y-6 md:space-y-10 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Reconhecimento"
        title="Emblemas institucionais"
        description="Cada emblema representa uma conquista real na proteção e fortalecimento da nossa cultura de segurança cibernética."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {BADGES.map((b) => {
          const earned = currentUser.badges.includes(b.slug);
          const meta = badgeMetadata[b.slug] || { rarity: "Comum", points: 50, Icon: Award };
          const Icon = meta.Icon;

          return (
            <div
              key={b.slug}
              className={cn(
                "relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border p-6 transition-all duration-500 group",
                earned
                  ? "bg-gradient-to-br from-card to-card/50 border-primary/30 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/50"
                  : "bg-secondary/10 border-border/40 opacity-80 saturate-[0.6] hover:opacity-100 hover:saturate-100"
              )}
            >
              {/* Background Glow for earned badges */}
              {earned && (
                <div className="absolute -top-24 -right-24 size-48 bg-primary/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors duration-500" />
              )}

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={cn(
                      "grid size-14 place-items-center rounded-2xl ring-1 ring-inset transition-transform duration-500",
                      earned
                        ? "bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-primary/40 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20"
                        : "bg-secondary/50 text-muted-foreground/60 ring-border/50"
                    )}
                  >
                    {earned ? <Icon className="size-7" /> : <Lock className="size-6 opacity-50" />}
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <RarityBadge rarity={meta.rarity} earned={earned} />
                    <div className={cn("text-[0.65rem] font-bold uppercase tracking-wider", earned ? "text-muted-foreground/80" : "text-muted-foreground/50")}>
                      +{meta.points} XP
                    </div>
                  </div>
                </div>

                <h3 className={cn("font-display text-lg font-semibold tracking-tight", earned ? "text-foreground" : "text-muted-foreground")}>
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
                      <span>Conquistado</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground/60">
                      <Lock className="size-3.5" />
                      <span>Bloqueado</span>
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

function RarityBadge({ rarity, earned }: { rarity: "Comum" | "Raro" | "Épico"; earned: boolean }) {
  const styles = {
    "Comum": earned ? "bg-secondary text-secondary-foreground ring-border/50" : "bg-secondary/30 text-muted-foreground/50 ring-border/30",
    "Raro": earned ? "bg-info/10 text-info ring-info/30 shadow-sm shadow-info/20" : "bg-info/5 text-info/50 ring-info/10",
    "Épico": earned ? "bg-primary/10 text-primary ring-primary/30 shadow-md shadow-primary/20" : "bg-primary/5 text-primary/50 ring-primary/10",
  };

  return (
    <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest ring-1 ring-inset", styles[rarity])}>
      {rarity}
    </div>
  );
}
