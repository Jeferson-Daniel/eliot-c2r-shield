import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { adminKpis, monthlyVolume, typeDistribution } from "@/data/mock";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertOctagon, CheckCircle2, Clock, Smartphone, XCircle, ShieldAlert, ShieldCheck, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "Painel Executivo — ELIOT" }] }),
  component: AdminWrapper,
});

const COLORS = ["oklch(0.82 0.14 210)", "oklch(0.73 0.17 150)", "oklch(0.78 0.16 290)", "oklch(0.82 0.15 80)", "oklch(0.66 0.21 25)"];

function AdminWrapper() {
  const location = useLocation();
  // No TanStack Router, se o arquivo se chama "app.admin.tsx", ele atua como Layout (parent route) 
  // para tudo que vem depois de /app/admin/*. Precisamos esconder o conteúdo do painel se estivermos na sub-rota.
  const isIndex = location.pathname === "/app/admin" || location.pathname === "/app/admin/";

  if (!isIndex) {
    return <Outlet />; // Renderiza a página filha (Gestão Operacional) limpa
  }

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Painel Executivo"
        title="Visão Geral Institucional"
        description="Acompanhamento consolidado do volume, tipos e severidade de incidentes da universidade."
        actions={
          <Button asChild className="gap-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow">
            <Link to="/app/admin/analytics"><ListFilter className="size-4" /> Gestão Operacional</Link>
          </Button>
        }
      />

      {/* Grid de KPIs principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Incidentes Resolvidos" value={adminKpis.completed} tone="success" Icon={CheckCircle2} />
        <Kpi label="Tempo Médio de Resposta" value={adminKpis.mttr} tone="primary" Icon={Clock} />
        <Kpi label="Adoção de MFA" value={adminKpis.mfaAdoption} tone="info" Icon={Smartphone} />
        <Kpi label="Taxa de Falsos Positivos" value={adminKpis.falsePositivesRate} tone="warning" Icon={XCircle} />
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:shadow hover:border-border flex flex-col group">
          <div className="mb-6">
            <h3 className="font-semibold tracking-tight text-base sm:text-lg">Volume de Notificações</h3>
            <p className="text-sm text-muted-foreground mt-1">Evolução dos chamados reportados nos últimos 12 meses.</p>
          </div>
          <div className="flex-1 min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyVolume} margin={{ left: -10, right: 0, top: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="month" stroke="oklch(0.7 0.02 250)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.7 0.02 250)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.028 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 10, fontSize: 12, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="oklch(0.82 0.14 210)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:shadow hover:border-border flex flex-col">
          <div className="mb-2">
            <h3 className="font-semibold tracking-tight text-base sm:text-lg">Distribuição por Categoria</h3>
            <p className="text-sm text-muted-foreground mt-1">Tipos mais reportados.</p>
          </div>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={typeDistribution} dataKey="value" nameKey="name" innerRadius={60} outerRadius={85} paddingAngle={2} stroke="oklch(0.17 0.025 258)">
                  {typeDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "oklch(0.22 0.028 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 10, fontSize: 12, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-4 space-y-2">
            {typeDistribution.map((t, i) => (
              <li key={t.name} className="flex items-center justify-between text-xs font-medium px-1">
                <span className="flex items-center gap-2.5"><span className="size-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} /> {t.name}</span>
                <span className="tabular-nums text-muted-foreground">{t.value}%</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SeverityCard label="Ameaças Leves" value={adminKpis.light} tone="info" />
        <SeverityCard label="Ameaças Moderadas" value={adminKpis.moderate} tone="warning" />
        <SeverityCard label="Ameaças Críticas" value={adminKpis.critical} tone="destructive" />
        
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:shadow hover:border-border flex flex-col justify-center">
          <div className="grid size-11 place-items-center rounded-xl bg-success/10 text-success ring-1 ring-inset ring-success/25 mb-4"><ShieldCheck className="size-5" /></div>
          <div className="font-display text-3xl font-bold tabular-nums tracking-tight">{adminKpis.resolutionRate}%</div>
          <div className="text-sm text-muted-foreground mt-1 font-medium">Taxa de Resolução Global</div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value, tone, Icon }: { label: string; value: React.ReactNode; tone: "warning" | "success" | "destructive" | "primary" | "info"; Icon: React.ComponentType<{ className?: string }> }) {
  const styles = {
    primary: { text: "text-primary", bg: "bg-primary/10", ring: "ring-primary/25", border: "border-primary/20" },
    success: { text: "text-success", bg: "bg-success/10", ring: "ring-success/25", border: "border-success/20" },
    warning: { text: "text-warning", bg: "bg-warning/10", ring: "ring-warning/25", border: "border-warning/20" },
    info: { text: "text-info", bg: "bg-info/10", ring: "ring-info/25", border: "border-info/20" },
    destructive: { text: "text-destructive", bg: "bg-destructive/10", ring: "ring-destructive/25", border: "border-destructive/20" },
  };
  const s = styles[tone];
  
  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5 group border-border/80`}>
      <div className={`absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 ${s.text}`}>
        <Icon className="size-24" />
      </div>
      <div className={`grid size-10 place-items-center rounded-xl ring-1 ring-inset shadow-sm transition-colors duration-300 group-hover:bg-opacity-20 ${s.bg} ${s.text} ${s.ring}`}>
        <Icon className="size-5" />
      </div>
      <div className="mt-5 font-display text-3xl font-bold tracking-tight tabular-nums">{value}</div>
      <div className="text-sm text-muted-foreground mt-1 font-medium">{label}</div>
    </div>
  );
}

function SeverityCard({ label, value, tone }: { label: string; value: number; tone: "info" | "warning" | "destructive" }) {
  const styles = {
    info: { text: "text-info", bg: "bg-info/10", ring: "ring-info/25" },
    warning: { text: "text-warning", bg: "bg-warning/10", ring: "ring-warning/25" },
    destructive: { text: "text-destructive", bg: "bg-destructive/10", ring: "ring-destructive/25" },
  };
  const s = styles[tone];

  return (
    <div className={`relative rounded-2xl border border-border/80 bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5 group`}>
      <div className={`grid size-10 place-items-center rounded-xl ring-1 ring-inset shadow-sm transition-colors duration-300 group-hover:bg-opacity-20 ${s.bg} ${s.text} ${s.ring}`}>
        <ShieldAlert className="size-5" />
      </div>
      <div className="mt-4 font-display text-2xl font-bold tabular-nums tracking-tight">{value}</div>
      <div className="text-sm text-muted-foreground mt-1 font-medium">{label}</div>
    </div>
  );
}
