import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { StatusBadge, SeverityPill, CategoryChip } from "@/components/eliot/StatusBits";
import { myIncidents } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Link as LinkIcon } from "lucide-react";

export const Route = createFileRoute("/app/meus-reportes")({
  head: () => ({ meta: [{ title: "Meus reportes — ELIOT" }] }),
  component: MyReports,
});

function MyReports() {
  return (
    <div className="mx-auto max-w-6xl p-5 md:p-8 space-y-8">
      <PageHeader
        eyebrow="Meus reportes"
        title="Histórico dos incidentes que você reportou"
        description="Acompanhe o status de cada notificação e o impacto que você gerou na comunidade."
        actions={<Button asChild className="gap-1.5"><Link to="/app/reportar"><Plus className="size-4" /> Novo reporte</Link></Button>}
      />

      <div className="grid gap-3">
        {myIncidents.map((inc) => (
          <article key={inc.id} className="group rounded-2xl border border-border bg-card p-5 ring-soft transition-colors hover:border-primary/30">
            <div className="flex flex-wrap items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium">{inc.title}</h3>
                  <span className="text-xs text-muted-foreground">· {inc.id}</span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{inc.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5" /> {new Date(inc.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</span>
                  <CategoryChip category={inc.category} />
                  {inc.link && (
                    <span className="inline-flex items-center gap-1.5 truncate max-w-xs">
                      <LinkIcon className="size-3.5" />
                      <span className="truncate">{inc.link}</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <SeverityPill severity={inc.severity} />
                  <StatusBadge status={inc.status} />
                </div>
                {inc.points && <div className="text-xs text-success font-medium">+{inc.points} pontos</div>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
