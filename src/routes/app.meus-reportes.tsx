import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { StatusBadge, SeverityPill, CategoryChip } from "@/components/eliot/StatusBits";
import { myIncidents } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Link as LinkIcon, Activity, CheckCircle2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/meus-reportes")({
  head: () => ({ meta: [{ title: "Meus Reportes — ELIOT" }] }),
  component: MyReports,
});

// Contextos hiper-realistas para substituir as descrições genéricas do mock
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
  const totalSent = myIncidents.length;
  const completed = myIncidents.filter(i => ["Validado", "Concluído"].includes(i.status)).length;
  const inAnalysis = myIncidents.filter(i => i.status === "Em análise").length;
  const pointsEarned = myIncidents.reduce((acc, i) => acc + (i.points || 0), 0);

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Sticky Header com o Botão de Novo Reporte para CTA sempre acessível */}
      <div className="sticky top-16 z-20 -mx-4 px-4 py-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 bg-background/80 backdrop-blur-xl border-b border-border/60 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
        <PageHeader
          eyebrow="Acompanhamento"
          title="Histórico de Ocorrências"
          description="Monitore o status das suas notificações e veja o impacto gerado na segurança da rede."
        />
        <Button asChild className="gap-2 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 whitespace-nowrap shrink-0 h-11 px-5">
          <Link to="/app/reportar"><Plus className="size-4" /> Registrar novo reporte</Link>
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
            <span className="text-[0.65rem] font-bold uppercase tracking-widest">XP Recebida</span>
          </div>
          <div className="font-display text-3xl font-bold text-primary">+{pointsEarned}</div>
        </div>
      </div>

      {/* Lista de Incidentes */}
      <div className="grid gap-5">
        {myIncidents.map((inc) => {
          const desc = REALISTIC_DESCRIPTIONS[inc.title] || inc.description;
          
          // Lógica de estado visual
          const isPending = inc.status === "Pendente";
          const isAnalysis = inc.status === "Em análise";
          const isDone = inc.status === "Validado" || inc.status === "Concluído";
          const isRejected = inc.status === "Rejeitado";

          return (
            <article 
              key={inc.id} 
              className={cn(
                "group relative flex flex-col rounded-[1.5rem] border bg-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1",
                isPending && "border-warning/30 hover:border-warning/50 hover:shadow-md hover:shadow-warning/5",
                isAnalysis && "border-info/30 hover:border-info/50 hover:shadow-md hover:shadow-info/5 bg-info/[0.02]",
                isDone && "border-success/30 hover:border-success/50 hover:shadow-md hover:shadow-success/5",
                isRejected && "border-destructive/20 hover:border-destructive/40 bg-secondary/10 opacity-85 hover:opacity-100",
                !isPending && !isAnalysis && !isDone && !isRejected && "border-border/80 hover:border-primary/30"
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                
                {/* Meta-info Lateral */}
                <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:w-36 shrink-0">
                  <div className="text-xs font-mono font-medium text-muted-foreground bg-secondary/60 px-2 py-1 rounded-md">{inc.id}</div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/80">
                    <Clock className="size-3.5" /> 
                    {new Date(inc.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                  </div>
                </div>

                {/* Corpo do Reporte */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <h3 className="font-display text-lg font-semibold tracking-tight leading-snug">{inc.title}</h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <SeverityPill severity={inc.severity} />
                      <StatusBadge status={inc.status} />
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground/90 leading-relaxed mb-5">{desc}</p>
                  
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <CategoryChip category={inc.category} />
                    {inc.link && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-3 py-1 max-w-[200px] sm:max-w-xs ring-1 ring-border/50">
                        <LinkIcon className="size-3" />
                        <span className="truncate">{inc.link}</span>
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Recompensa */}
                {inc.points && (
                  <div className="flex flex-col items-end sm:items-center justify-center shrink-0 sm:ml-2 mt-4 sm:mt-0">
                    <div className="grid place-items-center rounded-2xl bg-success/10 text-success ring-1 ring-inset ring-success/25 px-4 py-3 shadow-inner">
                      <span className="text-[0.65rem] font-bold uppercase tracking-widest text-success/80 mb-1">Recompensa</span>
                      <span className="font-display text-2xl font-bold tracking-tight">+{inc.points} <span className="text-sm font-medium">XP</span></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Barra de Fluxo (Micro Indicador) */}
              <IncidentFlow status={inc.status} />
            </article>
          );
        })}
      </div>
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
    <div className="flex items-center gap-1.5 mt-6 pt-5 border-t border-border/40 w-full">
      {FLOW_STEPS.map((step, idx) => {
        const isActive = idx <= currentIndex;
        const isCurrent = idx === currentIndex;
        
        const displayStep = (isRejected && idx === 2) ? "Rejeitado" : step;
        const colorClass = isActive 
          ? ((isRejected && idx >= 2) ? "bg-destructive/60" : "bg-primary/80") 
          : "bg-secondary";

        const textClass = isCurrent 
          ? ((isRejected && idx === 2) ? "text-destructive" : "text-primary") 
          : isActive ? "text-muted-foreground" : "text-muted-foreground/30";

        return (
          <div key={idx} className="flex flex-col gap-2 flex-1">
            <div className={cn("h-1 w-full rounded-full transition-colors", colorClass)} />
            <span className={cn("text-[0.55rem] font-bold uppercase tracking-[0.1em] text-center hidden sm:block", textClass)}>
              {displayStep}
            </span>
          </div>
        )
      })}
    </div>
  )
}
