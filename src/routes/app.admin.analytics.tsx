import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { adminKpis, monthlyVolume, typeDistribution } from "@/data/mock";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertOctagon, CheckCircle2, Coins, XCircle, ShieldAlert, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/app/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — ELIOT" }] }),
  component: Analytics,
});

const COLORS = ["oklch(0.82 0.14 210)", "oklch(0.73 0.17 150)", "oklch(0.78 0.16 290)", "oklch(0.82 0.15 80)", "oklch(0.66 0.21 25)"];

function Analytics() {
  return (
    <div className="mx-auto max-w-7xl p-5 md:p-8 space-y-8">
      <PageHeader
        eyebrow="Analytics"
        title="Monitoramento institucional"
        description="Visão consolidada do volume, tipos e severidade de incidentes notificados pela comunidade."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Pendentes" value={adminKpis.pending} tone="warning" Icon={AlertOctagon} />
        <Kpi label="Concluídas" value={adminKpis.completed} tone="success" Icon={CheckCircle2} />
        <Kpi label="Descartadas" value={adminKpis.rejected} tone="destructive" Icon={XCircle} />
        <Kpi label="Pontos distribuídos" value={adminKpis.pointsDistributed.toLocaleString("pt-BR")} tone="primary" Icon={Coins} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 ring-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium">Volume de notificações</h3>
              <p className="text-xs text-muted-foreground">Últimos 12 meses</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyVolume} margin={{ left: -10, right: 0, top: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="month" stroke="oklch(0.7 0.02 250)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.7 0.02 250)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.028 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 10, fontSize: 12 }} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="oklch(0.82 0.14 210)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 ring-soft">
          <h3 className="font-medium">Tipos de notificações</h3>
          <p className="text-xs text-muted-foreground mb-2">Distribuição por categoria</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={typeDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3} stroke="oklch(0.17 0.025 258)">
                  {typeDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "oklch(0.22 0.028 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 10, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 space-y-1.5">
            {typeDistribution.map((t, i) => (
              <li key={t.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="size-2 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} /> {t.name}</span>
                <span className="tabular-nums text-muted-foreground">{t.value}%</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SeverityCard label="Leves" value={adminKpis.light} tone="info" />
        <SeverityCard label="Moderadas" value={adminKpis.moderate} tone="warning" />
        <SeverityCard label="Críticas" value={adminKpis.critical} tone="destructive" />
        <div className="rounded-2xl border border-border bg-card p-5 ring-soft">
          <div className="grid size-9 place-items-center rounded-lg bg-success/10 text-success ring-1 ring-inset ring-success/25 mb-3"><ShieldCheck className="size-4" /></div>
          <div className="font-display text-2xl tabular-nums">{adminKpis.resolutionRate}%</div>
          <div className="text-xs text-muted-foreground mt-1">Taxa de resolução de problemas</div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value, tone, Icon }: { label: string; value: React.ReactNode; tone: "warning" | "success" | "destructive" | "primary"; Icon: React.ComponentType<{ className?: string }> }) {
  const tones = {
    primary: "text-primary bg-primary/10 ring-primary/25",
    success: "text-success bg-success/10 ring-success/25",
    warning: "text-warning bg-warning/10 ring-warning/25",
    destructive: "text-destructive bg-destructive/10 ring-destructive/25",
  } as const;
  return (
    <div className="rounded-2xl border border-border bg-card p-5 ring-soft">
      <div className={`grid size-9 place-items-center rounded-lg ring-1 ring-inset ${tones[tone]}`}><Icon className="size-4" /></div>
      <div className="mt-4 font-display text-2xl tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function SeverityCard({ label, value, tone }: { label: string; value: number; tone: "info" | "warning" | "destructive" }) {
  const tones = {
    info: "text-info bg-info/10 ring-info/25",
    warning: "text-warning bg-warning/10 ring-warning/25",
    destructive: "text-destructive bg-destructive/10 ring-destructive/25",
  } as const;
  return (
    <div className="rounded-2xl border border-border bg-card p-5 ring-soft">
      <div className={`grid size-9 place-items-center rounded-lg ring-1 ring-inset ${tones[tone]}`}><ShieldAlert className="size-4" /></div>
      <div className="mt-4 font-display text-2xl tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
