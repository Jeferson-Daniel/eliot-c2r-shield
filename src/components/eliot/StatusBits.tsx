import { cn } from "@/lib/utils";
import type { IncidentSeverity, IncidentStatus } from "@/types/eliot";
import { CheckCircle2, Clock3, AlertTriangle, XCircle, Loader2 } from "lucide-react";

export function StatusBadge({ status }: { status: string }) {
  const normalizeStatus = (s: string): IncidentStatus => {
    if (!s) return "Pendente";
    const low = s.toLowerCase().trim();
    if (low === "em análise" || low === "em analise" || low === "em_analise") return "Em análise";
    if (low === "validado") return "Validado";
    if (low === "concluído" || low === "concluido") return "Concluído";
    if (low === "rejeitado") return "Rejeitado";
    return "Pendente";
  };

  const map: Record<IncidentStatus, { cls: string; Icon: typeof CheckCircle2 }> = {
    "Pendente":    { cls: "bg-warning/15 text-warning ring-warning/25", Icon: Clock3 },
    "Em análise":  { cls: "bg-info/15 text-info ring-info/25", Icon: Loader2 },
    "Validado":    { cls: "bg-primary/15 text-primary ring-primary/25", Icon: CheckCircle2 },
    "Rejeitado":   { cls: "bg-destructive/15 text-destructive ring-destructive/25", Icon: XCircle },
    "Concluído":   { cls: "bg-success/15 text-success ring-success/30", Icon: CheckCircle2 },
  };

  const normStatus = normalizeStatus(status);
  const fallbackNeutro = { cls: "bg-muted/10 text-muted-foreground ring-border", Icon: Clock3 };
  const config = map[normStatus] ?? map["Pendente"] ?? fallbackNeutro;
  const { cls, Icon } = config;

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset", cls)}>
      <Icon className="size-3.5" /> {status || "Pendente"}
    </span>
  );
}

export function SeverityPill({ severity }: { severity: string }) {
  const normalizeSeverity = (s: string): IncidentSeverity => {
    if (!s) return "Baixa";
    const low = s.toLowerCase().trim();
    if (low === "média" || low === "media") return "Média";
    if (low === "alta") return "Alta";
    if (low === "crítica" || low === "critica") return "Crítica";
    return "Baixa";
  };

  const map: Record<IncidentSeverity, string> = {
    "Baixa":   "bg-muted text-muted-foreground ring-border",
    "Média":   "bg-warning/15 text-warning ring-warning/25",
    "Alta":    "bg-orange-500/15 text-orange-300 ring-orange-500/25",
    "Crítica": "bg-destructive/15 text-destructive ring-destructive/30",
  };

  const normSev = normalizeSeverity(severity);
  const cls = map[normSev] ?? map["Baixa"] ?? "bg-muted text-muted-foreground ring-border";

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset", cls)}>
      <AlertTriangle className="size-3.5" /> {severity || "Baixa"}
    </span>
  );
}

export function CategoryChip({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-[#07111f] px-2 py-0.5 text-xs text-slate-300 ring-1 ring-inset ring-cyan-500/20">
      {category}
    </span>
  );
}
