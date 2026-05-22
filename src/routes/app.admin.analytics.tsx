import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { StatusBadge, SeverityPill, CategoryChip } from "@/components/eliot/StatusBits";
import { incidents } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreVertical, MessageSquare, Check, X, ArrowLeft } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import type { Incident } from "@/types/eliot";
import { toast } from "sonner";
import { api } from "@/services/api";
import { Avatar } from "@/components/eliot/Sidebar";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/app/admin/analytics")({
  head: () => ({ meta: [{ title: "Gestão Operacional — ELIOT" }] }),
  component: AnalyticsOperationalPage,
});

function AnalyticsOperationalPage() {
  const [selected, setSelected] = useState<Incident | null>(null);
  const [query, setQuery] = useState("");
  const [liveIncidents, setLiveIncidents] = useState<Incident[]>(incidents);

  useEffect(() => {
    api.getIncidentes()
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          const mapped: Incident[] = data.map((inc: any) => ({
            id: `INC-${inc.id_incidente}`,
            title: inc.titulo || "Sem Título",
            description: inc.descricao || "",
            category: inc.ameaca || "Outro",
            severity: ["Malware", "Vazamento"].includes(inc.ameaca) ? "Crítica" : (inc.ameaca === "Phishing" ? "Alta" : "Média"),
            status: inc.status_validacao || "Pendente",
            reporterName: inc.usuario_incidente_id_usuario_relatorTousuario?.nome || `Usuário #${inc.id_usuario_relator}`,
            reporterRole: inc.usuario_incidente_id_usuario_relatorTousuario?.cargo || "Membro Institucional",
            createdAt: inc.data_criacao || new Date().toISOString(),
            link: inc.link_suspeito || undefined,
          }));
          setLiveIncidents(mapped);
        }
      })
      .catch(err => console.warn("Usando mock para analytics devido a falha na API:", err));
  }, []);

  const [filterStatus, setFilterStatus] = useState("Todos");
  const [filterSeverity, setFilterSeverity] = useState("Todas");
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [sortBy, setSortBy] = useState("Mais recentes");

  const resetFilters = () => {
    setFilterStatus("Todos");
    setFilterSeverity("Todas");
    setFilterCategory("Todas");
    setSortBy("Mais recentes");
  };

  const activeFiltersCount =
    (filterStatus !== "Todos" ? 1 : 0) +
    (filterSeverity !== "Todas" ? 1 : 0) +
    (filterCategory !== "Todas" ? 1 : 0);

  const filtered = liveIncidents
    .filter((i) => {
      const matchQuery = [i.title, i.category, i.reporterName, i.id]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchStatus = filterStatus === "Todos" || i.status === filterStatus;
      const matchSeverity = filterSeverity === "Todas" || i.severity === filterSeverity;
      const matchCategory = filterCategory === "Todas" || i.category === filterCategory;
      return matchQuery && matchStatus && matchSeverity && matchCategory;
    })
    .sort((a, b) => {
      if (sortBy === "Mais recentes") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "Mais antigos") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === "Maior severidade") {
        const sevOrder: Record<string, number> = { "Crítica": 3, "Alta": 2, "Média": 1, "Baixa": 0 };
        return (sevOrder[b.severity] || 0) - (sevOrder[a.severity] || 0);
      }
      return 0;
    });

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
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título, ID, categoria ou denunciante…"
              className="pl-10 h-10 bg-background shadow-sm"
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 h-10 shrink-0 relative transition-colors">
                <Filter className="size-4" /> Filtros Avançados
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[0.6rem] font-bold text-primary-foreground ring-2 ring-background">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-5 space-y-5 rounded-2xl border-border/80 shadow-xl bg-card">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm tracking-tight">Filtros Avançados</h4>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="h-auto p-0 px-2 py-1 text-xs text-muted-foreground hover:text-foreground">
                    Limpar todos
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Status do incidente</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="h-9 bg-background"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Todos", "Pendente", "Em análise", "Validado", "Rejeitado", "Concluído"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Severidade</Label>
                  <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                    <SelectTrigger className="h-9 bg-background"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Todas", "Baixa", "Média", "Alta", "Crítica"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Categoria</Label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="h-9 bg-background"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Todas", "Phishing", "Malware", "Link suspeito", "Engenharia social", "Vazamento de dados", "Acesso indevido", "Anexo suspeito", "Outro"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 pt-2 border-t border-border/60">
                  <Label className="text-xs text-muted-foreground">Ordenação</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-9 bg-background"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Mais recentes", "Mais antigos", "Maior severidade"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
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
                      <Filter className="size-8 text-muted-foreground/50" />
                      <p>Nenhum incidente encontrado para os filtros selecionados.</p>
                      {activeFiltersCount > 0 && (
                        <Button variant="link" onClick={resetFilters} className="mt-2 text-primary">
                          Limpar filtros
                        </Button>
                      )}
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
