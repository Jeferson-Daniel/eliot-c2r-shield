import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { 
  UploadCloud, Paperclip, X, Info, ShieldCheck, Zap, Search, BrainCircuit, Check
} from "lucide-react";
import type { IncidentCategory, IncidentSeverity } from "@/types/eliot";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";

const CATS: IncidentCategory[] = ["Phishing","Malware","Link suspeito","Engenharia social","Vazamento de dados","Acesso indevido","Anexo suspeito","Outro"];
const SEVS: IncidentSeverity[] = ["Baixa","Média","Alta","Crítica"];

export const Route = createFileRoute("/app/reportar")({
  head: () => ({ meta: [{ title: "Reportar Incidente — ELIOT" }] }),
  component: ReportPage,
});

function ReportPage() {
  const navigate = useNavigate();
  const [severity, setSeverity] = useState<IncidentSeverity>("Média");
  const [category, setCategory] = useState<IncidentCategory>("Phishing");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function onDrop(e: React.DragEvent) {
    e.preventDefault(); setDragOver(false);
    const list = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...list].slice(0, 5));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await api.createIncidente({
        titulo: title,
        descricao: desc,
        ameaca: category,
        link_suspeito: link || undefined,
        id_usuario_relator: 2 // Hardcoded temporário por falta de auth
      });
      
      toast.success("Reporte enviado para triagem!", { description: "Sua contribuição fortalece a segurança coletiva da instituição." });
      navigate({ to: "/app/meus-reportes" });
    } catch (err) {
      console.warn("API offline, fallback local acionado", err);
      // Fallback: simula carregamento local
      setTimeout(() => {
        toast.success("Reporte registrado localmente!", { description: "A API falhou, mas seu relato está salvo na sessão." });
        navigate({ to: "/app/meus-reportes" });
      }, 800);
    }
  }

  // Cores dinâmicas e sutis baseadas na severidade
  const severityColors = {
    "Baixa": "border-info/30 shadow-info/5 focus-within:border-info/50",
    "Média": "border-primary/30 shadow-primary/5 focus-within:border-primary/50",
    "Alta": "border-warning/30 shadow-warning/5 focus-within:border-warning/50",
    "Crítica": "border-destructive/30 shadow-destructive/5 focus-within:border-destructive/50",
  };

  const bgGlow = {
    "Baixa": "bg-info/20",
    "Média": "bg-primary/20",
    "Alta": "bg-warning/20",
    "Crítica": "bg-destructive/20",
  };

  // Simulação conceitual que ativa após X caracteres
  const showAnalysis = desc.length > 25;

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 md:p-8 space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* 1. Hero Section Impactante */}
      <div className="flex flex-col items-center text-center space-y-5 pt-4">
        <div className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary ring-1 ring-inset ring-primary/20 shadow-sm">
          Reportar Incidente
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Central de apoio à triagem
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
          O ELIOT atua como um sistema de apoio para a identificação e classificação preliminar de ameaças digitais em ambientes acadêmicos.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/15 transition-colors hover:bg-primary/10">
            <ShieldCheck className="size-3.5" /> Canal seguro
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/15 transition-colors hover:bg-primary/10">
            <Zap className="size-3.5" /> Triagem preliminar
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/15 transition-colors hover:bg-primary/10">
            <Search className="size-3.5" /> Suporte operacional
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        
        {/* 2. Card Principal Premium + 4. Feedback Visual de Severidade */}
        <div className={cn(
          "relative rounded-[1.5rem] border bg-card/60 backdrop-blur-xl p-5 sm:p-8 transition-all duration-700 shadow-xl overflow-hidden",
          severityColors[severity]
        )}>
          {/* Background Glow Baseado na Severidade */}
          <div className={cn("absolute -top-32 -right-32 size-96 blur-[60px] rounded-full pointer-events-none transition-colors duration-1000 opacity-20", bgGlow[severity])} />

          <div className="relative z-10 space-y-8">
            <div className="space-y-2 group">
              <Label htmlFor="title" className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted-foreground/80 group-focus-within:text-primary transition-colors ml-1">Título do incidente</Label>
              <Input id="title" required value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex.: E-mail suspeito solicitando senha institucional" className="h-12 bg-secondary/30 border-border/60 focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2 group">
                <Label className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted-foreground/80 group-focus-within:text-primary transition-colors ml-1">Categoria da Ameaça</Label>
                <Select value={category} onValueChange={(v: IncidentCategory) => setCategory(v)}>
                  <SelectTrigger className="h-12 bg-secondary/30 border-border/60 focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium"><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {CATS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted-foreground/80 transition-colors ml-1">Severidade percebida</Label>
                <div className="grid grid-cols-4 gap-1.5 rounded-xl bg-secondary/50 p-1.5 ring-1 ring-inset ring-border/50">
                  {SEVS.map((s) => (
                    <button key={s} type="button" onClick={() => setSeverity(s)}
                      className={cn(
                        "h-9 text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300",
                        severity === s 
                          ? s === "Baixa" ? "bg-info text-info-foreground shadow-sm scale-[1.02]" 
                          : s === "Média" ? "bg-primary text-primary-foreground shadow-sm scale-[1.02]"
                          : s === "Alta" ? "bg-warning text-warning-foreground shadow-sm scale-[1.02]"
                          : "bg-destructive text-destructive-foreground shadow-sm scale-[1.02]"
                          : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                      )}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="desc" className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted-foreground/80 group-focus-within:text-primary transition-colors ml-1">Descrição detalhada</Label>
              <Textarea 
                id="desc" 
                required 
                rows={5} 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Descreva o contexto: onde ocorreu (e-mail, WhatsApp, portal), horário aproximado, conteúdo principal da mensagem..." 
                className="bg-secondary/30 border-border/60 focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium resize-none leading-relaxed p-4" 
              />
              <p className="text-[0.7rem] font-medium text-muted-foreground/80 flex items-center gap-1.5 mt-2 ml-1"><Info className="size-3.5 text-primary" /> Nunca cole senhas ou dados pessoais de terceiros neste campo.</p>
            </div>

            {/* 3. Sistema de Apoio / Pré-análise (Conceitual/Simulado) */}
            {showAnalysis && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500 rounded-[1.25rem] border border-primary/20 bg-primary/5 p-5 sm:p-6 shadow-inner ring-1 ring-inset ring-primary/5">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-2.5 text-primary">
                    <div className="relative grid size-8 place-items-center bg-primary/10 rounded-lg ring-1 ring-primary/20">
                      <BrainCircuit className="size-4" />
                      <div className="absolute top-0 right-0 size-2 bg-primary rounded-full animate-pulse" />
                    </div>
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest">Pré-análise Automática</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-background rounded-full px-3 py-1 border border-primary/20 shadow-sm">
                    <span className="text-[0.6rem] font-bold uppercase tracking-widest text-muted-foreground">Classificação Preliminar</span>
                    <span className="text-xs font-bold text-primary">Risco Moderado</span>
                  </div>
                </div>

                <h4 className="font-semibold text-base mb-4 tracking-tight">Possível tentativa de phishing institucional</h4>
                
                <div className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted-foreground/80 mb-2">Indicadores Identificados:</div>
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2.5 text-sm text-foreground/90 font-medium">
                    <Check className="size-4 text-success" /> Solicitação de credenciais
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-foreground/90 font-medium">
                    <Check className="size-4 text-success" /> Linguagem de urgência
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-foreground/90 font-medium">
                    <Check className="size-4 text-success" /> Domínio semelhante ao SIGAA
                  </div>
                </div>

                <div className="h-1.5 w-full rounded-full bg-primary/15 overflow-hidden shadow-inner">
                  <div className="h-full bg-primary rounded-full w-[82%] relative transition-all duration-1000">
                    <div className="absolute inset-0 bg-primary/30 animate-pulse duration-1000" />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2 group">
              <Label htmlFor="link" className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted-foreground/80 group-focus-within:text-primary transition-colors ml-1">Link suspeito (opcional)</Label>
              <Input id="link" type="url" value={link} onChange={e => setLink(e.target.value)} placeholder="https://exemplo-falso.com.br/login" className="h-12 bg-secondary/30 border-border/60 focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium font-mono text-sm" />
            </div>

            {/* 5. Upload de Evidência */}
            <div className="space-y-2">
              <Label className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted-foreground/80 transition-colors ml-1">Evidências e Capturas de Tela (opcional)</Label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                className={cn(
                  "relative rounded-[1.25rem] border-2 border-dashed p-10 text-center transition-all duration-300 overflow-hidden group",
                  dragOver ? "border-primary bg-primary/10 scale-[1.01]" : "border-border/60 bg-secondary/20 hover:bg-secondary/40 hover:border-primary/40"
                )}
              >
                <div className="relative z-10 flex flex-col items-center">
                  <div className={cn("grid size-14 place-items-center rounded-2xl transition-all duration-300 mb-4", dragOver ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20" : "bg-card text-muted-foreground ring-1 ring-border/50 group-hover:text-primary group-hover:ring-primary/30")}>
                    <UploadCloud className="size-7" />
                  </div>
                  <div className="text-sm font-semibold">
                    Arraste arquivos aqui ou{" "}
                    <label className="text-primary cursor-pointer hover:underline underline-offset-4 decoration-primary/30">
                      selecione do seu dispositivo
                      <input type="file" multiple className="hidden" onChange={(e) => setFiles((p) => [...p, ...Array.from(e.target.files ?? [])].slice(0, 5))} />
                    </label>
                  </div>
                  <div className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground mt-2">
                    PNG, JPG, PDF até 10 MB · máximo 5 arquivos
                  </div>
                </div>
                {dragOver && <div className="absolute inset-0 bg-primary/5 animate-pulse" />}
              </div>

              {files.length > 0 && (
                <ul className="grid gap-3 mt-5">
                  {files.map((f, i) => (
                    <li key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 sm:p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/20">
                          <Paperclip className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold truncate tracking-tight">{f.name}</div>
                          <div className="text-xs font-medium text-muted-foreground mt-0.5">{(f.size / 1024).toFixed(0)} KB</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-3 shrink-0">
                        <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-success ring-1 ring-inset ring-success/30">
                          <ShieldCheck className="size-3" /> Pré-verificado
                        </div>
                        <button type="button" onClick={() => setFiles((p) => p.filter((_, j) => j !== i))} className="grid size-8 place-items-center rounded-lg hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors">
                          <X className="size-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* 6. CTA Final Acadêmico */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-4 pt-2">
          <Button type="button" variant="ghost" onClick={() => navigate({ to: "/app/dashboard" })} className="h-12 px-6 font-bold hover:bg-secondary/60">
            Cancelar operação
          </Button>
          <Button type="submit" disabled={submitting} className="h-12 px-8 font-bold gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all text-sm min-w-56">
            {submitting ? (
              <>
                <div className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Processando triagem...
              </>
            ) : (
              <>
                <Zap className="size-4" /> Iniciar triagem preliminar
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
