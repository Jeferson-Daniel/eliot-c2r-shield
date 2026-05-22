import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { StatusBadge, SeverityPill, CategoryChip } from "@/components/eliot/StatusBits";
import { myIncidents } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Link as LinkIcon, Activity, CheckCircle2, ShieldAlert, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import type { Incident } from "@/types/eliot";
import { api } from "@/services/api";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const Route = createFileRoute("/app/meus-reportes")({
  head: () => ({ meta: [{ title: "Meus Reportes — ELIOT" }] }),
  component: MyReports,
});

const REALISTIC_DESCRIPTIONS: Record<string, string> = {
  "E-mail suspeito solicitando senha": "Recebi um e-mail com a identidade visual da biblioteca solicitando a renovação urgente do meu cadastro. O link direcionava para um domínio estrangeiro não oficial, o que levantou suspeitas imediatas.",
  "Link encurtado recebido por WhatsApp": "Mensagem recebida em um grupo acadêmico promovendo um suposto curso gratuito de extensão com certificação imediata. O link usava um encurtador desconhecido e pedia dados pessoais.",
  "Anexo .exe em mensagem institucional": "Um remetente desconhecido se passando por um colega me enviou um 'relatório', mas o anexo era um arquivo executável (.exe) oculto dentro de um arquivo ZIP, em vez de um documento padrão.",
  "Tentativa de login fora do horário": "Recebi uma notificação automatizada informando uma tentativa de login malsucedida na minha conta institucional às 03:45 da manhã, originada de um IP de fora do estado.",
  "Página falsa do SIGAA": "Ao buscar o portal acadêmico na internet, o resultado patrocinado levava a uma cópia quase idêntica do sistema de login, mas a URL apresentava erros de digitação e não usava HTTPS seguro.",
  "Pedido de PIX por suposto chefe": "Mensagem recebida via aplicativo se passando pelo chefe do meu setor, alegando estar com problemas no banco e solicitando uma transferência PIX urgente para um fornecedor terceirizado.",
};

const FLOW_STEPS = ["Reportado", "Em análise", "Triagem", "Concluído"];

function MyReports() {
  const [selected, setSelected] = useState<Incident | null>(null);
  const [liveIncidents, setLiveIncidents] = useState<Incident[]>(myIncidents);

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
            points: inc.pontos_atribuidos || 0,
          }));
          setLiveIncidents(mapped);
        }
      })
      .catch(err => console.warn("Usando mock para meus-reportes devido a falha na API:", err));
  }, []);

  const totalSent = liveIncidents.length;
  const completed = liveIncidents.filter(i => ["Validado", "Concluído"].includes(i.status)).length;
  const inAnalysis = liveIncidents.filter(i => i.status === "Em análise").length;
  const pointsEarned = liveIncidents.reduce((acc, i) => acc + (i.points || 0), 0);

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Sticky Header */}
      <div className="sticky top-16 z-20 -mx-4 px-4 py-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 bg-background/80 backdrop-blur-xl border-b border-border/60 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
        <PageHeader
          eyebrow="Acompanhamento"
          title="Histórico de Ocorrências"
          description="Monitore o status das suas notificações e veja o impacto gerado na segurança da rede."
        />
        <Button asChild className="gap-2 shadow-sm transition-all hover:-translate-y-0.5 whitespace-nowrap shrink-0">
          <Link to="/app/reportar"><Plus className="size-4" /> Novo reporte</Link>
        </Button>
      </div>

      {/* Painel Superior de Resumo */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-border/80 bg-card p-5 flex flex-col justify-center transition-all hover:border-border hover:shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <ShieldAlert className="size-4" />
            <span className="text-[0.65rem] font-bold uppercase tracking-widest">Enviados</span>
          </div>
          <div className="font-display text-3xl font-bold">{totalSent}</div>
        </div>
        <div className="rounded-2xl border border-border/80 bg-card p-5 flex flex-col justify-center transition-all hover:border-border hover:shadow-sm">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Activity className="size-4" />
            <span className="text-[0.65rem] font-bold uppercase tracking-widest">Em Análise</span>
          </div>
          <div className="font-display text-3xl font-bold text-primary">{inAnalysis}</div>
        </div>
        <div className="rounded-2xl border border-border/80 bg-card p-5 flex flex-col justify-center transition-all hover:border-border hover:shadow-sm">
          <div className="flex items-center gap-2 text-success mb-2">
            <CheckCircle2 className="size-4" />
            <span className="text-[0.65rem] font-bold uppercase tracking-widest">Concluídos</span>
          </div>
          <div className="font-display text-3xl font-bold">{completed}</div>
        </div>
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 flex flex-col justify-center transition-all hover:border-primary/40 hover:shadow-sm">
          <div className="flex items-center gap-2 text-primary mb-2">
            <span className="text-[0.65rem] font-bold uppercase tracking-widest">Pontuação Recebida</span>
          </div>
          <div className="font-display text-3xl font-bold text-primary">+{pointsEarned}</div>
        </div>
      </div>

      {/* Lista de Incidentes ou Empty State */}
      {liveIncidents.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-border/60 bg-card/50 py-16 px-6 text-center animate-in fade-in">
          <div className="grid size-12 place-items-center rounded-full bg-secondary/80 text-muted-foreground mb-5">
            <ShieldAlert className="size-5" />
          </div>
          <h3 className="font-display text-lg font-semibold tracking-tight">Nenhum reporte registrado</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
            Você ainda não notificou nenhuma ocorrência. Contribua ativamente para a segurança da nossa instituição reportando e-mails, links ou comportamentos suspeitos.
          </p>
          <Button asChild className="gap-2 shadow-sm">
            <Link to="/app/reportar"><Plus className="size-4" /> Registrar primeiro reporte</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-5">
          {liveIncidents.map((inc) => {
            const desc = REALISTIC_DESCRIPTIONS[inc.title] || inc.description;
            
            // Lógica de estado visual
            const isPending = inc.status === "Pendente";
            const isAnalysis = inc.status === "Em análise";
            const isDone = inc.status === "Validado" || inc.status === "Concluído";
            const isRejected = inc.status === "Rejeitado";

            return (
              <article 
                key={inc.id} 
                onClick={() => setSelected(inc)}
                className={cn(
                  "cursor-pointer group relative flex flex-col rounded-[1.5rem] border bg-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1",
                  isPending && "border-warning/30 hover:border-warning/50 hover:shadow-md hover:shadow-warning/5",
                  isAnalysis && "border-info/30 hover:border-info/50 hover:shadow-md hover:shadow-info/5 bg-info/[0.02]",
                  isDone && "border-success/30 hover:border-success/50 hover:shadow-md hover:shadow-success/5",
                  isRejected && "border-destructive/20 hover:border-destructive/40 bg-secondary/10 opacity-85 hover:opacity-100",
                  !isPending && !isAnalysis && !isDone && !isRejected && "border-border/80 hover:border-primary/30 hover:shadow-sm"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  
                  {/* Meta-info Lateral */}
                  <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:w-32 shrink-0">
                    <div className="text-[0.65rem] font-mono font-bold text-muted-foreground/80 bg-secondary/60 px-2.5 py-1 rounded-md">{inc.id}</div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Clock className="size-3.5" /> 
                      {new Date(inc.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                    </div>
                  </div>

                  {/* Corpo do Reporte */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <h3 className="font-display text-lg font-semibold tracking-tight leading-snug group-hover:text-primary transition-colors">{inc.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {inc.points && (
                          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-0.5 ring-1 ring-inset ring-success/30 mr-1">
                            <span className="text-[0.6rem] font-bold uppercase tracking-widest text-success/80">Recompensa</span>
                            <span className="text-xs font-bold text-success">+{inc.points} pontos</span>
                          </div>
                        )}
                        <SeverityPill severity={inc.severity} />
                        <StatusBadge status={inc.status} />
                      </div>
                    </div>

                    <p className="text-sm text-foreground/80 leading-relaxed mb-5">{desc}</p>
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <CategoryChip category={inc.category} />
                      {inc.link && (
                        <span 
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 max-w-[200px] sm:max-w-xs ring-1 ring-primary/15 hover:ring-primary/40 hover:bg-primary/10 text-primary transition-colors"
                          onClick={(e) => { e.stopPropagation(); /* Interação de link simulada */ }}
                        >
                          <LinkIcon className="size-3 shrink-0 opacity-70" />
                          <span className="truncate font-medium">{inc.link}</span>
                        </span>
                      )}
                      {inc.points && (
                        <div className="sm:hidden inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-0.5 ring-1 ring-inset ring-success/30">
                          <span className="text-[0.6rem] font-bold uppercase tracking-widest text-success/80">Recompensa</span>
                          <span className="text-[0.65rem] font-bold text-success">+{inc.points} pontos</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Barra de Fluxo */}
                <IncidentFlow status={inc.status} />
              </article>
            );
          })}
        </div>
      )}

      <IncidentDrawer incident={selected} onClose={() => setSelected(null)} realisticDescriptions={REALISTIC_DESCRIPTIONS} />
    </div>
  );
}

function IncidentFlow({ status }: { status: string }) {
  const currentIndex = 
    status === "Pendente" ? 0 : 
    status === "Em análise" ? 1 : 
    (status === "Validado" || status === "Rejeitado") ? 2 : 
    status === "Concluído" ? 3 : 0;

  const isRejected = status === "Rejeitado";

  return (
    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/40 w-full">
      {FLOW_STEPS.map((step, idx) => {
        const isActive = idx <= currentIndex;
        const isCurrent = idx === currentIndex;
        
        const displayStep = (isRejected && idx === 2) ? "Rejeitado" : step;
        const colorClass = isActive 
          ? ((isRejected && idx >= 2) ? "bg-destructive" : "bg-primary") 
          : "bg-secondary";

        const textClass = isCurrent 
          ? ((isRejected && idx === 2) ? "text-destructive font-bold" : "text-primary font-bold") 
          : isActive ? "text-foreground/80 font-semibold" : "text-muted-foreground/50 font-medium";

        return (
          <div key={idx} className="flex flex-col gap-2 flex-1 relative">
            <div className={cn("h-1 w-full rounded-full transition-colors relative overflow-hidden", colorClass)}>
              {/* Micro-animação: Pulse muito suave apenas na barra atual indicando atividade */}
              {isCurrent && !isRejected && (
                <div className="absolute inset-0 bg-white/40 animate-pulse" />
              )}
            </div>
            <span className={cn("text-[0.6rem] uppercase tracking-[0.1em] text-center hidden sm:block transition-colors", textClass)}>
              {displayStep}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function IncidentDrawer({ incident, onClose, realisticDescriptions }: { incident: Incident | null; onClose: () => void; realisticDescriptions: Record<string, string> }) {
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
                <div className="text-[0.65rem] font-bold uppercase tracking-widest text-primary/80 mb-3">Descrição Registrada</div>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {realisticDescriptions[incident.title] || incident.description}
                </p>
              </section>

              {incident.link && (
                <section>
                  <div className="text-[0.65rem] font-bold uppercase tracking-widest text-primary/80 mb-3">Link/Evidência Anexada</div>
                  <div className="relative">
                    <code className="block break-all rounded-xl border border-primary/15 bg-primary/5 p-4 text-sm font-mono text-primary font-medium ring-1 ring-inset ring-primary/5">
                      {incident.link}
                    </code>
                  </div>
                </section>
              )}

              <section className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
                <div className="text-[0.65rem] font-bold uppercase tracking-widest text-primary/80 mb-4">Evolução do Fluxo</div>
                <IncidentFlow status={incident.status} />
              </section>

              {incident.points && (
                <section className="rounded-2xl bg-success/10 border border-success/20 p-5 flex items-center justify-between">
                  <div>
                    <div className="text-[0.65rem] font-bold uppercase tracking-widest text-success/80 mb-1">Recompensa Recebida</div>
                    <div className="text-sm font-medium text-success">Você ajudou a proteger a instituição.</div>
                  </div>
                  <div className="font-display text-3xl font-bold text-success">+{incident.points} pontos</div>
                </section>
              )}

              {(incident.status === "Validado" || incident.status === "Concluído" || incident.status === "Rejeitado") && (
                <section>
                  <div className="text-[0.65rem] font-bold uppercase tracking-widest text-primary/80 mb-3 flex items-center gap-1.5"><MessageSquare className="size-3.5" /> Retorno da Equipe de Análise</div>
                  <div className="rounded-xl bg-secondary/40 border border-border p-4 text-sm text-foreground/80 italic">
                    {incident.status === "Rejeitado" 
                      ? "Este reporte foi classificado como inconclusivo ou comportamento esperado do sistema. Nenhuma ação extra foi necessária, mas agradecemos a vigilância contínua."
                      : "Ameaça confirmada e contida pela equipe de segurança. O remetente foi bloqueado no gateway de e-mail institucional e usuários afetados foram notificados."}
                  </div>
                </section>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
