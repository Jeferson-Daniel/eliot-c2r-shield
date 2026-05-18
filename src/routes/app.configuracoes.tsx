import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { Avatar } from "@/components/eliot/Sidebar";
import { currentUser } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/app/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — ELIOT" }] }),
  component: Settings,
});

function Settings() {
  return (
    <div className="mx-auto max-w-3xl p-5 md:p-8 space-y-8">
      <PageHeader eyebrow="Configurações" title="Sua conta institucional" description="Atualize suas preferências e como recebe notificações da plataforma." />

      <section className="rounded-2xl border border-border bg-card p-6 ring-soft">
        <div className="flex items-center gap-4">
          <Avatar name={currentUser.name} size={56} />
          <div>
            <div className="font-medium">{currentUser.name}</div>
            <div className="text-sm text-muted-foreground">{currentUser.role} · {currentUser.department}</div>
          </div>
        </div>
        <div className="grid gap-4 mt-6 sm:grid-cols-2">
          <div className="space-y-1.5"><Label>Nome</Label><Input defaultValue={currentUser.name} /></div>
          <div className="space-y-1.5"><Label>E-mail institucional</Label><Input defaultValue="paulo.anjos@ifam.edu.br" /></div>
          <div className="space-y-1.5"><Label>Cargo</Label><Input defaultValue={currentUser.role} /></div>
          <div className="space-y-1.5"><Label>Setor</Label><Input defaultValue={currentUser.department} /></div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 ring-soft space-y-4">
        <h3 className="font-medium">Notificações</h3>
        {[
          { t: "Alertas institucionais críticos", d: "Receba avisos quando um incidente crítico for reportado no seu setor.", on: true },
          { t: "Resposta aos meus reportes", d: "Avisar quando um reporte seu for validado ou respondido.", on: true },
          { t: "Novas trilhas de capacitação", d: "Receba um aviso quando novos módulos forem publicados.", on: false },
        ].map((it) => (
          <div key={it.t} className="flex items-center justify-between gap-4 py-2">
            <div>
              <div className="text-sm font-medium">{it.t}</div>
              <div className="text-xs text-muted-foreground">{it.d}</div>
            </div>
            <Switch defaultChecked={it.on} />
          </div>
        ))}
      </section>

      <div className="flex justify-end">
        <Button onClick={() => toast.success("Preferências atualizadas")}>Salvar alterações</Button>
      </div>
    </div>
  );
}
