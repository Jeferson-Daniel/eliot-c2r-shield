import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { trainings } from "@/data/mock";
import { Clock, GraduationCap, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/app/capacitacao")({
  head: () => ({ meta: [{ title: "Capacitação — ELIOT" }] }),
  component: Capacitacao,
});

function Capacitacao() {
  return (
    <div className="mx-auto max-w-6xl p-5 md:p-8 space-y-8">
      <PageHeader
        eyebrow="Capacitação"
        title="Trilhas curtas, aplicadas à rotina acadêmica"
        description="Conteúdos diretos sobre phishing, engenharia social, senhas, links suspeitos e boas práticas."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trainings.map((t) => (
          <article key={t.id} className="group rounded-2xl border border-border bg-card p-5 ring-soft transition-all hover:-translate-y-0.5 hover:border-primary/30">
            <div className="flex items-start justify-between gap-3">
              <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/25">
                <GraduationCap className="size-5" />
              </div>
              <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">{t.category}</span>
            </div>
            <h3 className="mt-4 font-medium leading-snug">{t.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{t.description}</p>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" /> {t.durationMin} min</span>
                <span className="tabular-nums">{t.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${t.progress}%` }} />
              </div>
            </div>

            <button className="mt-5 w-full inline-flex items-center justify-between rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm font-medium hover:bg-secondary group-hover:border-primary/30 transition-colors">
              {t.progress === 0 ? "Começar trilha" : t.progress === 100 ? "Revisar" : "Continuar"}
              <ArrowRight className="size-4" />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
