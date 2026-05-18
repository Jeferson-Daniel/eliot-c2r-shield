import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { UploadCloud, Paperclip, X, Info } from "lucide-react";
import type { IncidentCategory, IncidentSeverity } from "@/types/eliot";
import { cn } from "@/lib/utils";

const CATS: IncidentCategory[] = ["Phishing","Malware","Link suspeito","Engenharia social","Vazamento de dados","Acesso indevido","Anexo suspeito","Outro"];
const SEVS: IncidentSeverity[] = ["Baixa","Média","Alta","Crítica"];

export const Route = createFileRoute("/app/reportar")({
  head: () => ({ meta: [{ title: "Reportar incidente — ELIOT" }] }),
  component: ReportPage,
});

function ReportPage() {
  const navigate = useNavigate();
  const [severity, setSeverity] = useState<IncidentSeverity>("Média");
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function onDrop(e: React.DragEvent) {
    e.preventDefault(); setDragOver(false);
    const list = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...list].slice(0, 5));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Reporte enviado com sucesso", { description: "Sua contribuição fortalece a segurança coletiva." });
      navigate({ to: "/app/meus-reportes" });
    }, 700);
  }

  return (
    <div className="mx-auto max-w-4xl p-5 md:p-8 space-y-8">
      <PageHeader
        eyebrow="Reportar"
        title="Notifique uma nova ameaça"
        description="Reporte com calma — quanto mais contexto, mais rápido nossa equipe consegue agir."
      />

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 ring-soft space-y-6">
          <div className="space-y-1.5">
            <Label htmlFor="title">Título do incidente</Label>
            <Input id="title" required placeholder="Ex.: E-mail suspeito solicitando senha do SIGAA" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Select defaultValue="Phishing">
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {CATS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Severidade percebida</Label>
              <div className="grid grid-cols-4 gap-1.5 rounded-lg bg-secondary/60 p-1">
                {SEVS.map((s) => (
                  <button key={s} type="button" onClick={() => setSeverity(s)}
                    className={cn(
                      "h-8 text-xs rounded-md transition-all",
                      severity === s ? "bg-card text-foreground ring-1 ring-inset ring-primary/40 shadow-sm" : "text-muted-foreground hover:text-foreground"
                    )}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="desc">Descrição detalhada</Label>
            <Textarea id="desc" required rows={5} placeholder="Descreva o que aconteceu: canal (e-mail, WhatsApp), horário aproximado, conteúdo da mensagem e qualquer dado relevante." />
            <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Info className="size-3.5" /> Nunca cole senhas ou dados pessoais de terceiros aqui.</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="link">Link suspeito (opcional)</Label>
            <Input id="link" type="url" placeholder="https://..." />
          </div>

          <div className="space-y-2">
            <Label>Evidências (opcional)</Label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              className={cn(
                "rounded-xl border-2 border-dashed p-8 text-center transition-colors",
                dragOver ? "border-primary/60 bg-primary/5" : "border-border bg-secondary/30 hover:bg-secondary/50"
              )}
            >
              <UploadCloud className="size-7 text-muted-foreground mx-auto" />
              <div className="mt-3 text-sm">Arraste arquivos aqui ou{" "}
                <label className="text-primary cursor-pointer hover:underline">
                  selecione do seu dispositivo
                  <input type="file" multiple className="hidden" onChange={(e) => setFiles((p) => [...p, ...Array.from(e.target.files ?? [])].slice(0, 5))} />
                </label>
              </div>
              <div className="text-xs text-muted-foreground mt-1">PNG, JPG, PDF até 10 MB · máximo 5 arquivos</div>
            </div>
            {files.length > 0 && (
              <ul className="grid gap-2 mt-3">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm">
                    <Paperclip className="size-4 text-muted-foreground" />
                    <span className="flex-1 truncate">{f.name}</span>
                    <span className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(0)} KB</span>
                    <button type="button" onClick={() => setFiles((p) => p.filter((_, j) => j !== i))} className="hover:text-destructive"><X className="size-4" /></button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate({ to: "/app/dashboard" })}>Cancelar</Button>
          <Button type="submit" disabled={submitting} className="min-w-40">
            {submitting ? "Enviando…" : "Enviar reporte"}
          </Button>
        </div>
      </form>
    </div>
  );
}
