import { cn } from "@/lib/utils";
import type { IncidentSeverity, IncidentStatus } from "@/types/eliot";
import { CheckCircle2, Clock3, AlertTriangle, XCircle, Loader2 } from "lucide-react";

export function StatusBadge({ status }: { status: IncidentStatus }) {
  const map: Record<IncidentStatus, { cls: string; Icon: typeof CheckCircle2 }> = {
    "Pendente":    { cls: "bg-warning/15 text-warning ring-warning/25", Icon: Clock3 },
    "Em análise":  { cls: "bg-info/15 text-info ring-info/25", Icon: Loader2 },
    "Validado":    { cls: "bg-primary/15 text-primary ring-primary/25", Icon: CheckCircle2 },
    "Rejeitado":   { cls: "bg-destructive/15 text-destructive ring-destructive/25", Icon: XCircle },
    "Concluído":   { cls: "bg-success/15 text-success ring-success/30", Icon: CheckCircle2 },
  };
  const { cls, Icon } = map[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset", cls)}>
      <Icon className="size-3.5" /> {status}
    </span>
  );
}

export function SeverityPill({ severity }: { severity: IncidentSeverity }) {
  const map: Record<IncidentSeverity, string> = {
    "Baixa":   "bg-muted text-muted-foreground ring-border",
    "Média":   "bg-warning/15 text-warning ring-warning/25",
    "Alta":    "bg-orange-500/15 text-orange-300 ring-orange-500/25",
    "Crítica": "bg-destructive/15 text-destructive ring-destructive/30",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset", map[severity])}>
      <AlertTriangle className="size-3.5" /> {severity}
    </span>
  );
}

export function CategoryChip({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-secondary/70 px-2 py-0.5 text-xs text-muted-foreground ring-1 ring-inset ring-border">
      {category}
    </span>
  );
}
