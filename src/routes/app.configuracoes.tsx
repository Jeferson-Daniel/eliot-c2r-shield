import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { Avatar } from "@/components/eliot/Sidebar";
import { currentUser, levelProgress } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  ShieldCheck, 
  Smartphone, 
  Key, 
  Monitor, 
  Laptop, 
  BellRing, 
  UserCircle, 
  History, 
  ShieldAlert, 
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/app/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — ELIOT" }] }),
  component: Settings,
});

function Settings() {
  const [hasChanges, setHasChanges] = useState(false);
  const prog = levelProgress(currentUser.xp);

  const simulateChange = () => setHasChanges(true);

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 md:p-8 space-y-10 animate-in fade-in duration-500 pb-28 relative">
      <PageHeader 
        eyebrow="Configurações" 
        title="Central da Conta" 
        description="Gerencie sua identidade institucional, preferências de notificação e níveis de segurança." 
      />

      {/* Header Institucional Forte */}
      <div className="relative rounded-[1.5rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 sm:p-8 overflow-hidden shadow-sm transition-all hover:border-primary/30">
        <div className="absolute -top-20 -right-20 size-64 bg-primary/20 blur-[70px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative shrink-0">
            <Avatar name={currentUser.name} size={84} />
            <div className="absolute -bottom-2 -right-2 rounded-full bg-success text-success-foreground p-1.5 ring-4 ring-background shadow-md">
              <ShieldCheck className="size-4" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h2 className="font-display text-2xl font-bold tracking-tight truncate">{currentUser.name}</h2>
              <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-primary ring-1 ring-inset ring-primary/30">
                {currentUser.department}
              </span>
            </div>
            <div className="text-sm font-medium text-muted-foreground/90">{currentUser.role}</div>
            
            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-success">
                <CheckCircle2 className="size-4" />
                <span>Conta Verificada</span>
              </div>
              <div className="flex items-center gap-1.5 text-primary">
                <Smartphone className="size-4" />
                <span>MFA Ativo</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground">
                <History className="size-4" />
                <span>Último acesso seguro há 2h</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-6 sm:gap-2 bg-card/60 sm:bg-transparent rounded-2xl p-5 sm:p-0 border sm:border-none border-border/50 w-full sm:w-auto shrink-0 mt-2 sm:mt-0 shadow-inner sm:shadow-none">
            <div className="text-left sm:text-right flex-1 sm:flex-none">
              <div className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">Nível Institucional</div>
              <div className="font-display text-xl font-bold text-foreground">{prog.current.name}</div>
            </div>
            <div className="text-left sm:text-right flex-1 sm:flex-none">
              <div className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary/80 mb-1">Pontuação</div>
              <div className="font-display text-xl font-bold text-primary">+{currentUser.xp.toLocaleString("pt-BR")} pontos</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-10 lg:gap-12">
        {/* Seção Perfil Institucional */}
        <section className="space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
            <UserCircle className="size-5 text-primary" />
            <h3 className="font-display text-lg font-semibold tracking-tight">Perfil Institucional</h3>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 bg-card rounded-[1.5rem] border border-border/80 p-6 sm:p-8 shadow-sm transition-all hover:border-primary/20">
            <div className="space-y-2.5 group">
              <Label className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted-foreground/80 group-focus-within:text-primary transition-colors ml-1">Nome Completo</Label>
              <Input 
                defaultValue={currentUser.name} 
                onChange={simulateChange}
                className="h-11 bg-secondary/30 border-border/80 focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/10 hover:border-primary/40 transition-all font-medium" 
              />
            </div>
            <div className="space-y-2.5 group">
              <Label className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted-foreground/80 transition-colors ml-1">E-mail Institucional</Label>
              <Input 
                defaultValue="paulo.anjos@ifam.edu.br" 
                disabled
                className="h-11 bg-secondary/50 border-border/40 opacity-80 cursor-not-allowed font-medium text-muted-foreground" 
              />
              <div className="text-[0.65rem] font-medium text-muted-foreground/80 ml-1">O e-mail institucional não pode ser alterado.</div>
            </div>
            <div className="space-y-2.5 group">
              <Label className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted-foreground/80 group-focus-within:text-primary transition-colors ml-1">Cargo</Label>
              <Input 
                defaultValue={currentUser.role} 
                onChange={simulateChange}
                className="h-11 bg-secondary/30 border-border/80 focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/10 hover:border-primary/40 transition-all font-medium" 
              />
            </div>
            <div className="space-y-2.5 group">
              <Label className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted-foreground/80 group-focus-within:text-primary transition-colors ml-1">Setor / Departamento</Label>
              <Input 
                defaultValue={currentUser.department} 
                onChange={simulateChange}
                className="h-11 bg-secondary/30 border-border/80 focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/10 hover:border-primary/40 transition-all font-medium" 
              />
            </div>
          </div>
        </section>

        {/* Seção Segurança da Conta */}
        <section className="space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
            <ShieldAlert className="size-5 text-primary" />
            <h3 className="font-display text-lg font-semibold tracking-tight">Segurança da Conta</h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Autenticação MFA */}
            <div className="rounded-[1.5rem] border border-success/30 bg-success/5 p-6 flex flex-col justify-between group transition-all duration-300 hover:border-success/50 hover:shadow-md hover:shadow-success/10 hover:-translate-y-1">
              <div>
                <div className="flex items-start justify-between mb-5">
                  <div className="grid size-12 place-items-center rounded-2xl bg-success/15 text-success ring-1 ring-inset ring-success/30 shadow-inner group-hover:scale-105 transition-transform">
                    <Smartphone className="size-6" />
                  </div>
                  <div className="inline-flex items-center rounded-full bg-success/15 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-success ring-1 ring-inset ring-success/30">
                    MFA Ativo
                  </div>
                </div>
                <h4 className="font-semibold text-lg mb-1.5 group-hover:text-success transition-colors tracking-tight">2 Fatores (MFA)</h4>
                <p className="text-sm text-foreground/80 leading-relaxed">Sua conta exige um código de segurança no celular para garantir o acesso.</p>
              </div>
              <Button variant="outline" className="mt-6 w-full h-11 text-xs font-bold bg-background hover:bg-success hover:text-success-foreground hover:border-success transition-all shadow-sm">
                Gerenciar MFA
              </Button>
            </div>

            {/* Senha */}
            <div className="rounded-[1.5rem] border border-border/80 bg-card p-6 flex flex-col justify-between group transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-1">
              <div>
                <div className="flex items-start justify-between mb-5">
                  <div className="grid size-12 place-items-center rounded-2xl bg-secondary/80 text-muted-foreground ring-1 ring-inset ring-border/50 group-hover:bg-primary/10 group-hover:text-primary group-hover:ring-primary/30 transition-all group-hover:scale-105 shadow-inner">
                    <Key className="size-6" />
                  </div>
                </div>
                <h4 className="font-semibold text-lg mb-1.5 group-hover:text-primary transition-colors tracking-tight">Senha Institucional</h4>
                <p className="text-sm text-muted-foreground/90 leading-relaxed">Última alteração realizada há 4 meses através do portal central.</p>
              </div>
              <Button variant="outline" className="mt-6 w-full h-11 text-xs font-bold bg-secondary/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm">
                Alterar Senha
              </Button>
            </div>

            {/* Sessões */}
            <div className="rounded-[1.5rem] border border-border/80 bg-card p-6 flex flex-col justify-between group transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-start justify-between mb-5">
                  <div className="grid size-12 place-items-center rounded-2xl bg-secondary/80 text-muted-foreground ring-1 ring-inset ring-border/50 group-hover:bg-primary/10 group-hover:text-primary group-hover:ring-primary/30 transition-all group-hover:scale-105 shadow-inner">
                    <Monitor className="size-6" />
                  </div>
                  <div className="inline-flex items-center px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-muted-foreground bg-secondary/60 rounded-md">
                    2 ativas
                  </div>
                </div>
                <h4 className="font-semibold text-lg mb-1.5 group-hover:text-primary transition-colors tracking-tight">Sessões Ativas</h4>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground/90 mt-3 bg-secondary/50 px-3 py-2 rounded-lg w-fit border border-border/60 shadow-sm">
                  <Laptop className="size-3.5 text-primary" /> Mac OS · Manaus (Atual)
                </div>
              </div>
              <Button variant="outline" className="mt-6 w-full h-11 text-xs font-bold bg-secondary/30 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all shadow-sm">
                Encerrar outras sessões
              </Button>
            </div>
          </div>
        </section>

        {/* Seção Preferências de Notificações */}
        <section className="space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
            <BellRing className="size-5 text-primary" />
            <h3 className="font-display text-lg font-semibold tracking-tight">Preferências de Notificações</h3>
          </div>

          <div className="rounded-[1.5rem] border border-border/80 bg-card divide-y divide-border/60 overflow-hidden shadow-sm transition-all hover:border-primary/20">
            {[
              { t: "Alertas institucionais críticos", d: "Avisos emergenciais quando um incidente crítico for reportado no seu setor.", on: true },
              { t: "Atualizações dos meus reportes", d: "Avisar imediatamente quando um reporte seu for validado ou respondido pela equipe.", on: true },
              { t: "Novas trilhas de capacitação", d: "Receba um convite quando novos módulos de segurança forem publicados.", on: false },
              { t: "Resumo semanal de segurança", d: "Receba um e-mail com dicas e um resumo das ameaças neutralizadas na semana.", on: false },
            ].map((it, idx) => (
              <NotificationRow key={idx} item={it} onChange={simulateChange} />
            ))}
          </div>
        </section>
      </div>

      {/* Footer Sticky de Ações */}
      {hasChanges && (
        <div className="fixed sm:sticky bottom-4 sm:bottom-8 inset-x-4 sm:inset-x-0 z-40 sm:mt-12 pointer-events-none">
          <div className="mx-auto max-w-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[1.25rem] border border-border/60 bg-background/85 px-4 py-4 sm:px-6 sm:py-5 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-bottom-8 duration-500 pointer-events-auto ring-1 ring-border/20">
            <div className="flex items-center gap-3.5">
              <div className="grid size-9 shrink-0 place-items-center rounded-full bg-warning/20 text-warning ring-1 ring-inset ring-warning/30 shadow-inner">
                <div className="size-2.5 rounded-full bg-warning animate-pulse" />
              </div>
              <div>
                <div className="text-sm font-bold">Alterações não salvas</div>
                <div className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted-foreground hidden sm:block mt-0.5">
                  Você tem modificações pendentes no perfil.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button 
                variant="ghost" 
                onClick={() => { setHasChanges(false); toast("Ação cancelada"); }} 
                className="h-10 flex-1 sm:flex-none px-4 text-xs font-bold hover:bg-secondary/80 border border-transparent hover:border-border/50 transition-all"
              >
                Cancelar
              </Button>
              <Button 
                onClick={() => { setHasChanges(false); toast.success("Configurações salvas com sucesso!"); }} 
                className="h-10 flex-1 sm:flex-none px-6 text-xs font-bold shadow-md transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
              >
                Salvar alterações
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationRow({ item, onChange }: { item: any, onChange: () => void }) {
  const [checked, setChecked] = useState(item.on);
  return (
    <label 
      className={cn(
        "flex items-center justify-between gap-6 p-5 sm:p-6 cursor-pointer transition-colors hover:bg-secondary/30 group",
        checked ? "bg-primary/[0.02]" : ""
      )}
    >
      <div className="flex-1">
        <div className={cn("text-base font-semibold transition-colors tracking-tight", checked ? "text-primary" : "text-foreground group-hover:text-primary")}>
          {item.t}
        </div>
        <div className="text-sm text-muted-foreground/90 mt-1.5 leading-relaxed max-w-xl">
          {item.d}
        </div>
      </div>
      <Switch 
        checked={checked} 
        onCheckedChange={(v) => { setChecked(v); onChange(); }} 
      />
    </label>
  );
}
