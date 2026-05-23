import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/eliot/AppShell";
import { Avatar } from "@/components/eliot/Sidebar";
import { users as mockUsers, levelProgress } from "@/data/mock";
import { Crown, Medal, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { api } from "@/services/api";

export const Route = createFileRoute("/app/ranking")({
  head: () => ({ meta: [{ title: "Ranking Institucional — ELIOT" }] }),
  component: RankingPage,
});

function RankingPage() {
  const [rankingData, setRankingData] = useState(mockUsers);

  useEffect(() => {
    api.getRanking()
      .then((data) => {
        if (data && data.length > 0) {
          setRankingData(data);
        }
      })
      .catch((err) => {
        console.warn("Usando mock devido a falha na API de ranking:", err);
      });
  }, []);

  const sorted = [...rankingData].sort((a, b) => b.xp - a.xp);
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 md:p-8 space-y-8 md:space-y-10 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Quadro de Honra"
        title="Ranking Institucional"
        description="Reconhecimento para a comunidade que se destaca na proteção e identificação de ameaças."
      />

      {/* Podium */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-end pt-4 sm:pt-12 pb-2">
        {top3.map((u, i) => {
          if (!u) return null;
          const rank = i + 1;
          const isFirst = rank === 1;
          const prog = levelProgress(u.xp);

          return (
            <div
              key={u.id}
              className={cn(
                "relative flex flex-col items-center rounded-[1.5rem] border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1",
                isFirst
                  ? "order-1 sm:order-2 z-10 border-yellow-500/40 shadow-2xl shadow-yellow-500/10 bg-gradient-to-b from-card to-yellow-500/5 sm:scale-110 mb-4 sm:mb-0"
                  : rank === 2
                  ? "order-2 sm:order-1 border-border/80 shadow-lg shadow-black/5 bg-gradient-to-b from-card to-slate-500/5"
                  : "order-3 sm:order-3 border-border/80 shadow-md shadow-black/5 bg-gradient-to-b from-card to-amber-700/5"
              )}
            >
              {isFirst && (
                <div className="absolute -top-4 sm:-top-5 inset-x-0 mx-auto w-fit rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 px-3.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-yellow-950 shadow-md shadow-yellow-500/20 whitespace-nowrap">
                  Top Defensor
                </div>
              )}

              {/* Decorative background glow for 1st */}
              {isFirst && <div className="absolute top-10 size-32 bg-yellow-500/10 blur-[20px] rounded-full pointer-events-none" />}

              <div className="relative mx-auto w-fit mt-2 sm:mt-0">
                <Avatar name={u.name} size={isFirst ? 84 : 64} />
                <div
                  className={cn(
                    "absolute grid place-items-center rounded-full ring-4 ring-card",
                    rank === 1
                      ? "-top-3 -right-3 size-10 bg-gradient-to-br from-yellow-300 to-yellow-600 text-yellow-950 shadow-lg shadow-yellow-500/40"
                      : rank === 2
                      ? "-top-2 -right-2 size-8 bg-gradient-to-br from-slate-200 to-slate-400 text-slate-800 shadow-md shadow-slate-400/30"
                      : "-top-2 -right-2 size-8 bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md shadow-amber-600/30"
                  )}
                >
                  {isFirst ? <Crown className="size-5" /> : <Medal className="size-4" />}
                </div>
              </div>

              <div className="mt-4 sm:mt-5 font-semibold text-sm sm:text-base leading-tight">{u.name}</div>
              <div className="text-[0.65rem] sm:text-xs text-muted-foreground mt-0.5">{u.role}</div>

              <div className="mt-4 font-display text-2xl sm:text-3xl font-bold tabular-nums tracking-tight">
                {u.xp.toLocaleString("pt-BR")}
              </div>
              
              {/* Emblemas preview */}
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {u.badges.slice(0, 3).map((_, idx) => (
                  <div key={idx} className="grid size-5 place-items-center rounded-full bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                    <ShieldCheck className="size-3" />
                  </div>
                ))}
                {u.badges.length > 3 && (
                  <div className="grid size-5 place-items-center rounded-full bg-secondary text-[0.6rem] font-bold text-muted-foreground ring-1 ring-inset ring-border">
                    +{u.badges.length - 3}
                  </div>
                )}
              </div>

              {/* Progress bar */}
              <div className="mt-6 w-full hidden sm:block">
                <div className="flex justify-between text-[0.65rem] font-medium text-muted-foreground mb-1.5 px-1">
                  <span className="truncate mr-2">{prog.current.name}</span>
                  <span>{prog.pct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-secondary/80 overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all duration-1000", isFirst ? "bg-yellow-500" : "bg-primary")} style={{ width: `${prog.pct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-[1.5rem] border border-border/80 bg-card shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-secondary/20">
            <tr>
              <th className="text-left px-5 sm:px-6 py-4 font-semibold w-16">Pos</th>
              <th className="text-left px-5 sm:px-6 py-4 font-semibold">Participante</th>
              <th className="text-left px-6 py-4 font-semibold hidden md:table-cell">Nível Institucional</th>
              <th className="text-right px-5 sm:px-6 py-4 font-semibold">Pontuação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rest.map((u, i) => {
              const rank = i + 4;
              const prog = levelProgress(u.xp);
              return (
                <tr key={u.id} className="hover:bg-muted/40 transition-colors group">
                  <td className="px-5 sm:px-6 py-4 text-muted-foreground font-mono font-medium text-sm">
                    {rank}º
                  </td>
                  <td className="px-5 sm:px-6 py-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Avatar name={u.name} size={36} />
                      <div>
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">{u.name}</div>
                        <div className="text-[0.65rem] text-muted-foreground mt-0.5">{u.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">{prog.current.name}</div>
                    <div className="text-[0.65rem] text-muted-foreground/60 mt-0.5">
                      Faltam {prog.toNext.toLocaleString("pt-BR")} pontos para o próximo nível
                    </div>
                  </td>
                  <td className="px-5 sm:px-6 py-4 text-right">
                    <div className="font-display text-lg font-semibold tabular-nums tracking-tight">{u.xp.toLocaleString("pt-BR")}</div>
                    <div className="text-[0.65rem] font-bold text-muted-foreground uppercase tracking-widest">pontos</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
