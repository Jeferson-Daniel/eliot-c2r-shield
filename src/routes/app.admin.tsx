import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { StatusBadge, SeverityPill, CategoryChip } from "@/components/eliot/StatusBits";
import { incidents } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, BarChart3, MoreVertical, MessageSquare, Check, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import type { Incident } from "@/types/eliot";
import { toast } from "sonner";
import { Avatar } from "@/components/eliot/Sidebar";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "Painel administrativo — ELIOT" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [selected, setSelected] = useState<Incident | null>(null);
  const [query, setQuery] = useState("");

  const filtered = incidents.filter((i) =>
    [i.title, i.category, i.reporterName, i.id].join(" ").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl p-5 md:p-8 space-y-6">
      <PageHeader
        eyebrow="Administração"
        title="Central de análise de incidentes"
        description="Triagem, classificação e validação de notificações recebidas pela plataforma."
        actions={
          <Button asChild variant="outline" className="gap-1.5"><Link to="/app/admin/analytics"><BarChart3 className="size-4" /> Ver analytics</Link></Button>
        }
      />

      <div className="rounded-2xl border border-border bg-card ring-soft">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-border">
          <div className="relative flex-1 min-w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por título, ID, categoria, denunciante…" className="pl-9" />
          </div>
          <Button variant="outline" className="gap-1.5"><Filter className="size-4" /> Filtros</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-secondary/30">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Incidente</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Denunciante</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Data</th>
                <th className="text-left px-4 py-3 font-medium">Severidade</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => setSelected(inc)}
                  className="border-t border-border hover:bg-secondary/30 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{inc.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                      <span>{inc.id}</span> · <CategoryChip category={inc.category} />
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Avatar name={inc.reporterName} size={26} />
                      <div className="text-sm">
                        <div className="leading-none">{inc.reporterName}</div>
                        <div className="text-xs text-muted-foreground mt-1">{inc.reporterRole}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">
                    {new Date(inc.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3"><SeverityPill severity={inc.severity} /></td>
                  <td className="px-4 py-3"><StatusBadge status={inc.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground"><MoreVertical className="size-4" /></td>
                </tr>
              ))}
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
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto p-0">
        {incident && (
          <>
            <SheetHeader className="px-6 pt-6">
              <div className="text-xs text-muted-foreground">{incident.id}</div>
              <SheetTitle className="font-display text-xl">{incident.title}</SheetTitle>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <CategoryChip category={incident.category} />
                <SeverityPill severity={incident.severity} />
                <StatusBadge status={incident.status} />
              </div>
            </SheetHeader>

            <div className="px-6 py-6 space-y-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Descrição</div>
                <p className="text-sm leading-relaxed">{incident.description}</p>
              </div>

              {incident.link && (
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Link suspeito</div>
                  <code className="block break-all rounded-lg border border-border bg-secondary/40 p-3 text-xs">{incident.link}</code>
                </div>
              )}

              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Denunciante</div>
                <div className="flex items-center gap-3">
                  <Avatar name={incident.reporterName} size={36} />
                  <div>
                    <div className="text-sm font-medium">{incident.reporterName}</div>
                    <div className="text-xs text-muted-foreground">{incident.reporterRole} · reportado em {new Date(incident.createdAt).toLocaleDateString("pt-BR")}</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5"><MessageSquare className="size-3.5" /> Mensagem ao denunciante</div>
                <Textarea rows={3} placeholder="Envie uma mensagem para esclarecer ou agradecer o reporte." />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant="outline" className="gap-1.5" onClick={() => { toast.message("Reporte arquivado"); onClose(); }}>
                  <X className="size-4" /> Arquivar
                </Button>
                <Button className="gap-1.5" onClick={() => { toast.success("Reporte validado", { description: "+150 pontos atribuídos ao denunciante." }); onClose(); }}>
                  <Check className="size-4" /> Validar reporte
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
