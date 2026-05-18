import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { Avatar } from "@/components/eliot/Sidebar";
import { users, getLevel } from "@/data/mock";
import { Crown, Medal } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ranking")({
  head: () => ({ meta: [{ title: "Ranking — ELIOT" }] }),
  component: Ranking,
});

function Ranking() {
  const sorted = [...users].sort((a, b) => b.xp - a.xp);
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);
  const podiumOrder = [top3[1], top3[0], top3[2]]; // 2, 1, 3 visual order

  return (
    <div className="mx-auto max-w-5xl p-5 md:p-8 space-y-8">
      <PageHeader
        eyebrow="Ranking"
        title="Quem mais protege a comunidade"
        description="Reconhecemos servidores, docentes e discentes que mantêm a cultura de segurança viva no dia a dia."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {podiumOrder.map((u, i) => {
          const rank = sorted.findIndex(s => s.id === u.id) + 1;
          const isFirst = rank === 1;
          return (
            <div key={u.id} className={cn(
              "rounded-2xl border bg-card p-6 text-center ring-soft transition-transform",
              isFirst ? "sm:-mt-4 border-primary/40 shadow-[0_0_0_1px_oklch(0.82_0.14_210_/_0.2),0_30px_60px_-30px_oklch(0.82_0.14_210_/_0.4)]" : "border-border"
            )}>
              <div className="relative mx-auto w-fit">
                <Avatar name={u.name} size={isFirst ? 72 : 60} />
                <div className={cn(
                  "absolute -top-2 -right-2 grid size-7 place-items-center rounded-full text-xs font-semibold ring-2 ring-card",
                  rank === 1 ? "bg-warning text-warning-foreground" : rank === 2 ? "bg-secondary text-foreground" : "bg-orange-500/80 text-white"
                )}>
                  {isFirst ? <Crown className="size-3.5" /> : <Medal className="size-3.5" />}
                </div>
              </div>
              <div className="mt-3 font-medium">{u.name}</div>
              <div className="text-xs text-muted-foreground">{u.role}</div>
              <div className="mt-3 font-display text-2xl tabular-nums">{u.xp.toLocaleString("pt-BR")}</div>
              <div className="text-xs text-muted-foreground">{getLevel(u.xp).name}</div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-card ring-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-secondary/40">
            <tr>
              <th className="text-left px-5 py-3 w-12">#</th>
              <th className="text-left px-5 py-3">Pessoa</th>
              <th className="text-left px-5 py-3 hidden md:table-cell">Nível</th>
              <th className="text-right px-5 py-3">Pontos</th>
            </tr>
          </thead>
          <tbody>
            {rest.map((u, i) => (
              <tr key={u.id} className="border-t border-border hover:bg-secondary/30">
                <td className="px-5 py-3 text-muted-foreground tabular-nums">{i + 4}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={u.name} size={32} />
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-xs text-muted-foreground">{u.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">{getLevel(u.xp).name}</td>
                <td className="px-5 py-3 text-right tabular-nums font-medium">{u.xp.toLocaleString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
