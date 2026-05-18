import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { BADGES, currentUser } from "@/data/mock";
import { Award, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/badges")({
  head: () => ({ meta: [{ title: "Badges — ELIOT" }] }),
  component: BadgesPage,
});

function BadgesPage() {
  return (
    <div className="mx-auto max-w-6xl p-5 md:p-8 space-y-8">
      <PageHeader
        eyebrow="Conquistas"
        title="Badges institucionais"
        description="Cada badge reconhece um comportamento que fortalece a segurança coletiva."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {BADGES.map((b) => {
          const earned = currentUser.badges.includes(b.slug);
          return (
            <div key={b.slug} className={cn(
              "rounded-2xl border bg-card p-5 ring-soft transition-all",
              earned ? "border-primary/30" : "border-border opacity-80"
            )}>
              <div className={cn(
                "grid size-12 place-items-center rounded-xl",
                earned ? "bg-primary/15 text-primary ring-1 ring-inset ring-primary/30" : "bg-secondary text-muted-foreground"
              )}>
                {earned ? <Award className="size-6" /> : <Lock className="size-5" />}
              </div>
              <div className="mt-4 font-medium">{b.name}</div>
              <p className="mt-1.5 text-sm text-muted-foreground">{b.description}</p>
              <div className={cn("mt-4 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
                earned ? "bg-success/10 text-success ring-success/25" : "bg-secondary text-muted-foreground ring-border")}>
                {earned ? "Conquistada" : "Bloqueada"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
