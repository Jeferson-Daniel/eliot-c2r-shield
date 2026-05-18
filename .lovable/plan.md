
# ELIOT — Plataforma C2R (Capacitar, Conscientizar, Reportar)

Plataforma web responsiva (não-mobile-nativo) com aparência de produto SaaS real de cibersegurança, inspirada em Linear / Vercel / Stripe / Cloudflare. Dark mode institucional, tipografia Inter/Geist, microinterações discretas. MVP totalmente navegável com dados mockados, estrutura pronta para Lovable Cloud no futuro.

> Observação técnica: o template usa **TanStack Start + Vite + Tailwind v4 + shadcn/ui** (não Next.js). Mantém todos os benefícios pedidos (React moderno, SSR, file-based routing, componentes shadcn, Tailwind). Os screenshots atuais serão usados apenas como referência funcional — a UI será redesenhada por completo.

---

## 1. Identidade visual & design system

Atualizar `src/styles.css` com tokens semânticos (oklch) baseados na paleta proposta:

- `--background` #0B1120 · `--sidebar` #111827 · `--card` #1E293B
- `--primary` ciano #22D3EE (uso pontual, destaque) · `--success` #22C55E · `--destructive` #EF4444
- `--muted-foreground` cinza suave · bordas sutis `oklch(1 0 0 / 8%)`
- Gradientes muito discretos, sem glow/neon; sombras suaves e elevação por camadas
- Tipografia: Inter (corpo) + Geist (display/títulos) via Google Fonts
- Radius 12–16px, espaçamento generoso (escala 4/8/12/16/24/32)
- Componentes base shadcn customizados (button, card, badge, dialog, table, tabs, dropdown, sonner, sheet/drawer, progress, chart)

Sidebar shadcn colapsável; no mobile vira **drawer** + **bottom nav** com 4 ações principais.

---

## 2. Estrutura de rotas (TanStack Start)

Layout institucional público vs. layout autenticado (app shell com sidebar).

```
src/routes/
  __root.tsx              Shell + QueryClientProvider + Toaster
  index.tsx               Landing institucional
  login.tsx               Login (mock — qualquer credencial entra)
  _app.tsx                Layout autenticado (sidebar + topbar + Outlet)
  _app/dashboard.tsx      Dashboard do usuário
  _app/reportar.tsx       Reporte de incidente (wizard/form)
  _app/meus-reportes.tsx  Histórico do usuário
  _app/capacitacao.tsx    Trilhas e módulos
  _app/capacitacao.$moduloId.tsx  Detalhe do módulo
  _app/ranking.tsx        Ranking + top 3
  _app/badges.tsx         Conquistas
  _app/admin.tsx          Painel admin (lista + filtros + drawer de detalhe)
  _app/admin.analytics.tsx  Dashboard analítico
  _app/configuracoes.tsx  Perfil / preferências
```

Cada rota define seu próprio `head()` (title, description, og). Erros e 404 já existentes em `__root.tsx` reaproveitados.

---

## 3. Páginas — escopo visual

**Landing (`/`)** — hero com proposta C2R, bloco explicando os 3 pilares (Capacitar/Conscientizar/Reportar), seção “para instituições públicas de ensino”, bloco sobre phishing/incidentes, prova social institucional, CTA “Acessar plataforma”. Visual editorial sóbrio, sem partículas.

**Login (`/login`)** — split screen: lado esquerdo branding ELIOT + frase institucional, lado direito card de login (email + senha + “entrar com SSO institucional” mock).

**Dashboard do usuário** — saudação personalizada, card de nível + XP + barra de progresso, grid: badges recentes, mini-ranking, últimos reportes, dicas rápidas (carrossel), notificações.

**Reportar incidente** — formulário em coluna única, generoso: título, categoria (select com 8 categorias), severidade (segmented), descrição (textarea), link suspeito, **dropzone** drag-and-drop para evidências, botão primário cheio, toast de sucesso + redirecionamento para “Meus Reportes”.

**Meus reportes** — lista em cards (não tabela densa) com status colorido (Pendente/Em análise/Validado/Rejeitado/Concluído), filtros por status e categoria.

**Painel Admin** — tabela moderna shadcn com filtros (status, severidade, categoria, data), busca, drawer lateral ao clicar em linha com detalhes do incidente, ações: Validar / Rejeitar / Classificar severidade / Atribuir pontos / Mensagem ao denunciante.

**Dashboard Analítico** — KPIs (Pendentes / Concluídas / Descartadas / Pontos distribuídos), gráfico de barras “Volume últimos 12 meses”, donut de tipos, cards de severidade, taxa de resolução. Usar **Recharts** (já disponível via `chart.tsx` shadcn).

**Ranking** — pódio com top 3 (cards destacados), lista paginada com avatar, nível, pontos, badge atual.

**Badges** — grid de conquistas (obtidas vs. bloqueadas com lock), tooltip com descrição.

**Capacitação** — grid de trilhas (Phishing, Engenharia social, Senhas, Links suspeitos, Anexos, Como reportar), cada card com progresso. Página de módulo com conteúdo textual + quiz simples opcional.

---

## 4. Dados mockados

`src/data/mock.ts` exportando:

- `currentUser` (nome, cargo, avatar, xp, nivel, badges)
- `users[]` para ranking (12+ entradas)
- `incidents[]` (~25 itens variando categoria/severidade/status/data)
- `badges[]` (10 badges com slug, nome, descrição, ícone Lucide)
- `levels[]` (Observador Digital → Guardião Institucional, com faixas de XP)
- `notifications[]`, `trainings[]`, `monthlyVolume[]`, `typeDistribution[]`

Tipos centralizados em `src/types/eliot.ts`. Estrutura pronta para troca por `createServerFn` + Supabase no futuro.

---

## 5. Componentes reutilizáveis

`src/components/eliot/`:

- `AppShell` (sidebar + topbar + container)
- `Sidebar` (desktop) + `MobileNav` (bottom bar + drawer)
- `StatCard`, `KpiTile`, `LevelProgress`, `BadgeChip`, `RankRow`, `PodiumCard`
- `IncidentCard`, `IncidentStatusBadge`, `SeverityPill`
- `ReportForm` + `EvidenceDropzone`
- `IncidentTable` + `IncidentDetailDrawer`
- `VolumeBarChart`, `TypeDonutChart`, `AnimatedCounter`
- `TrainingCard`, `ModuleProgress`
- `PageHeader`, `EmptyState`, `SectionHeading`

Animações com Tailwind `animate-fade-in` / `animate-scale-in` já configuradas, mais transições suaves de hover (sem neon).

---

## 6. Gamificação

- XP por ação (reportar +50, reporte validado +100/+150 conforme severidade)
- Níveis: Observador Digital (0) → Guardião Inicial (500) → Sentinela Cibernético (1500) → Analista Colaborador (4000) → Guardião Institucional (10000)
- Badges: Primeiro Reporte, Caçador de Phishing, Alerta Preventivo, Colaborador Ativo, Guardião da Segurança (+ outras 5)
- Tudo simulado em mock; helpers `getLevel(xp)`, `getNextLevel(xp)`, `xpProgress(xp)`

---

## 7. Acessibilidade & responsividade

- Contraste AA em todos os tokens
- Foco visível (`--ring`), navegação por teclado
- Cor + ícone + label em status/severidade
- Breakpoints: mobile (bottom nav), tablet (sidebar colapsada), desktop (sidebar completa)
- Tabelas viram cards no mobile

---

## 8. Entregáveis técnicos

1. Tokens e fontes em `src/styles.css`
2. Mocks + tipos
3. Componentes `eliot/`
4. Todas as rotas listadas
5. Landing + Login + 8 telas do app, todas conectadas via sidebar/bottom nav
6. Sem backend — `console.log` + `sonner` toasts simulam ações

---

## Fora do escopo desta entrega

- Backend real / autenticação real (estrutura preparada, mas não conectada)
- Upload real de arquivos (apenas UI de dropzone com preview local)
- Quizzes interativos completos na capacitação (placeholder textual em módulos)
- E-mails, notificações push, SSO real

Posso confirmar e implementar tudo de uma vez ao aprovar o plano.
