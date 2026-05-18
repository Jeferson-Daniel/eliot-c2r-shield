import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { StatusBadge, SeverityPill, CategoryChip } from "@/components/eliot/StatusBits";
import { incidents } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreVertical, MessageSquare, Check, X, ArrowLeft } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import type { Incident } from "@/types/eliot";
import { toast } from "sonner";
import { Avatar } from "@/components/eliot/Sidebar";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/app/admin/analytics")({
  head: () => ({ meta: [{ title: "Gestão Operacional — ELIOT" }] }),
  component: AnalyticsOperationalPage,
});

function AnalyticsOperationalPage() {
  const [selected, setSelected] = useState<Incident | null>(null);
  const [query, setQuery] = useState("");

  const filtered = incidents.filter((i) =>
    [i.title, i.category, i.reporterName, i.id].join(" ").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Triagem e Análise"
        title="Gestão Operacional de Incidentes"
        description="Lista completa, filtros, severidade e fluxo de resolução das notificações reportadas."
        actions={
          <Button asChild variant="outline" className="gap-2 transition-all hover:bg-secondary/60">
            <Link to="/app/admin"><ArrowLeft className="size-4" /> Voltar ao Painel Executivo</Link>
          </Button>
        }
      />

      <div className="rounded-2xl border border-border/80 bg-card shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-5 border-b border-border bg-card/50">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por título, ID, categoria ou denunciante…" className="pl-10 h-10 bg-background shadow-sm" />
          </div>
          <Button variant="outline" className="gap-2 h-10 shrink-0"><Filter className="size-4" /> Filtros Avançados</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-secondary/20">
              <tr>
                <th className="text-left px-5 py-4 font-semibold">Incidente</th>
                <th className="text-left px-5 py-4 font-semibold hidden md:table-cell">Denunciante</th>
                <th className="text-left px-5 py-4 font-semibold hidden lg:table-cell">Data</th>
                <th className="text-left px-5 py-4 font-semibold">Severidade</th>
                <th className="text-left px-5 py-4 font-semibold">Status</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => setSelected(inc)}
                  className="hover:bg-muted/40 cursor-pointer transition-colors group"
                >
                  <td className="px-5 py-4">
                    <div className="font-medium text-foreground group-hover:text-primary transition-colors">{inc.title}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                      <span className="font-mono">{inc.id}</span>
                      <span className="size-1 rounded-full bg-border" />
                      <CategoryChip category={inc.category} />
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={inc.reporterName} size={28} />
                      <div>
                        <div className="font-medium leading-none">{inc.reporterName}</div>
                        <div className="text-[0.65rem] text-muted-foreground mt-1">{inc.reporterRole}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-muted-foreground">
                    {new Date(inc.createdAt).toLocaleDateString("pt-BR", { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-4"><SeverityPill severity={inc.severity} /></td>
                  <td className="px-5 py-4"><StatusBadge status={inc.status} /></td>
                  <td className="px-5 py-4 text-muted-foreground group-hover:text-foreground transition-colors"><MoreVertical className="size-4" /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="size-8 text-muted-foreground/50" />
                      <p>Nenhum incidente encontrado para esta busca.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <IncidentDrawer incident={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function IncidentDrawer({ incident, onClose }: { incident: Incident | null; onClose: () => void }) {
  return (
    <Sheet open={!!incident} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto p-0 border-l border-border/60">
        {incident && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <SheetHeader className="px-6 py-6 border-b border-border/60 bg-secondary/10">
              <div className="text-xs font-mono font-medium text-muted-foreground mb-1">{incident.id}</div>
              <SheetTitle className="font-display text-2xl font-semibold">{incident.title}</SheetTitle>
              <div className="flex flex-wrap items-center gap-2 pt-3">
                <CategoryChip category={incident.category} />
                <SeverityPill severity={incident.severity} />
                <StatusBadge status={incident.status} />
              </div>
            </SheetHeader>

            <div className="p-6 space-y-8">
              <section>
                <div className="text-[0.65rem] font-bold uppercase tracking-widest text-primary/80 mb-3">Descrição do Reporte</div>
                <p className="text-sm leading-relaxed text-muted-foreground">{incident.description}</p>
              </section>

              {incident.link && (
                <section>
                  <div className="text-[0.65rem] font-bold uppercase tracking-widest text-primary/80 mb-3">Link Suspeito Anexado</div>
                  <div className="relative group/link">
                    <code className="block break-all rounded-xl border border-warning/20 bg-warning/5 p-3 text-sm font-mono text-warning-foreground">
                      {incident.link}
                    </code>
                  </div>
                </section>
              )}

              <section className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
                <div className="text-[0.65rem] font-bold uppercase tracking-widest text-primary/80 mb-4">Informações do Denunciante</div>
                <div className="flex items-center gap-4">
                  <Avatar name={incident.reporterName} size={42} />
                  <div>
                    <div className="font-medium">{incident.reporterName}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{incident.reporterRole} · Reportado em {new Date(incident.createdAt).toLocaleDateString("pt-BR")}</div>
                  </div>
                </div>
              </section>

              <section>
                <div className="text-[0.65rem] font-bold uppercase tracking-widest text-primary/80 mb-3 flex items-center gap-1.5"><MessageSquare className="size-3.5" /> Comunicação Interna</div>
                <Textarea className="resize-none bg-background focus-visible:ring-primary/30" rows={3} placeholder="Deixe uma anotação ou envie uma mensagem ao denunciante..." />
              </section>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/60">
                <Button variant="outline" className="gap-2 h-11" onClick={() => { toast.message("Reporte arquivado", { description: "Nenhuma ação foi necessária." }); onClose(); }}>
                  <X className="size-4" /> Arquivar
                </Button>
                <Button className="gap-2 h-11 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5" onClick={() => { toast.success("Reporte validado!", { description: "150 pontos foram atribuídos ao usuário." }); onClose(); }}>
                  <Check className="size-4" /> Validar Incidente
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
