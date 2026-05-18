import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, GraduationCap, Eye, Megaphone, AlertOctagon, Trophy, BarChart3, Lock, Sparkles } from "lucide-react";
import { Logo } from "@/components/eliot/Logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ELIOT — Plataforma C2R de cibersegurança institucional" },
      { name: "description", content: "Capacitar, conscientizar e reportar ameaças digitais em instituições públicas de ensino superior. Conheça o ELIOT." },
      { property: "og:title", content: "ELIOT — Plataforma C2R" },
      { property: "og:description", content: "Plataforma institucional de cibersegurança baseada na metodologia C2R." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <C2RSection />
      <ThreatsSection />
      <Benefits />
      <CallToAction />
      <Footer />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl flex h-16 items-center justify-between px-5">
        <Logo />
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#metodologia" className="hover:text-foreground transition-colors">Metodologia</a>
          <a href="#ameacas" className="hover:text-foreground transition-colors">Ameaças</a>
          <a href="#beneficios" className="hover:text-foreground transition-colors">Benefícios</a>
          <a href="#plataforma" className="hover:text-foreground transition-colors">Plataforma</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex"><Link to="/login">Entrar</Link></Button>
          <Button asChild size="sm" className="gap-1.5">
            <Link to="/login">Acessar plataforma <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          Metodologia C2R · Capacitar · Conscientizar · Reportar
        </div>
        <h1 className="mt-6 font-display text-4xl md:text-6xl font-semibold tracking-tight">
          Transforme atenção em <span className="text-gradient">proteção</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-muted-foreground">
          ELIOT é a plataforma institucional de cibersegurança que ajuda universidades públicas
          a capacitar pessoas, conscientizar comunidades e reportar ameaças com clareza e rapidez.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="h-11 gap-2 px-5">
            <Link to="/login">Acessar plataforma <ArrowRight className="size-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-11 px-5">
            <a href="#metodologia">Conhecer a metodologia</a>
          </Button>
        </div>

        <HeroMock />
      </div>
    </section>
  );
}

function HeroMock() {
  return (
    <div className="relative mt-14 mx-auto max-w-5xl">
      <div className="rounded-2xl border border-border bg-card/70 backdrop-blur ring-soft overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 h-9">
          <span className="size-2.5 rounded-full bg-destructive/60" />
          <span className="size-2.5 rounded-full bg-warning/60" />
          <span className="size-2.5 rounded-full bg-success/60" />
          <div className="mx-auto text-[0.7rem] text-muted-foreground">app.eliot.edu / dashboard</div>
        </div>
        <div className="grid grid-cols-12 gap-4 p-5">
          <div className="col-span-12 md:col-span-3 space-y-2">
            {["Dashboard", "Reportar", "Meus reportes", "Capacitação", "Ranking", "Painel admin"].map((l, i) => (
              <div key={l} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs ${i === 0 ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/25" : "text-muted-foreground"}`}>
                <span className="size-1.5 rounded-full bg-current opacity-60" /> {l}
              </div>
            ))}
          </div>
          <div className="col-span-12 md:col-span-9 grid grid-cols-3 gap-3">
            {[
              { l: "Pendentes", v: "14", t: "warning" },
              { l: "Concluídos", v: "722", t: "success" },
              { l: "Pontos distribuídos", v: "28k", t: "primary" },
            ].map((k) => (
              <div key={k.l} className="rounded-xl border border-border bg-background/60 p-4 text-left">
                <div className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">{k.l}</div>
                <div className="font-display text-2xl mt-1.5">{k.v}</div>
                <div className={`mt-2 h-1 rounded ${k.t === "warning" ? "bg-warning/30" : k.t === "success" ? "bg-success/30" : "bg-primary/30"}`}>
                  <div className={`h-1 rounded ${k.t === "warning" ? "bg-warning" : k.t === "success" ? "bg-success" : "bg-primary"}`} style={{ width: "60%" }} />
                </div>
              </div>
            ))}
            <div className="col-span-3 rounded-xl border border-border bg-background/60 p-4">
              <div className="text-xs text-muted-foreground mb-3">Volume de notificações — 12 meses</div>
              <div className="flex items-end gap-1.5 h-24">
                {[40, 55, 60, 70, 82, 92, 70, 65, 78, 88, 84, 99].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-primary/70" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function C2RSection() {
  const items = [
    { Icon: GraduationCap, title: "Capacitar", body: "Trilhas curtas e práticas sobre phishing, senhas, engenharia social e boas práticas — feitas para a rotina acadêmica." },
    { Icon: Eye,            title: "Conscientizar", body: "Lembretes, dicas e campanhas internas que mantêm a comunidade atenta sem ruído ou fadiga de alertas." },
    { Icon: Megaphone,      title: "Reportar", body: "Um fluxo simples, rápido e seguro para que qualquer pessoa relate incidentes em poucos cliques." },
  ];
  return (
    <section id="metodologia" className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionHeader
          eyebrow="Metodologia C2R"
          title="Três pilares para uma cultura de segurança que se sustenta."
          description="A metodologia C2R organiza a segurança da informação institucional em três movimentos contínuos: capacitar pessoas, conscientizar comunidades e reportar incidentes. ELIOT é a plataforma que materializa esses pilares."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map(({ Icon, title, body }) => (
            <div key={title} className="group rounded-2xl border border-border bg-card p-6 ring-soft transition-all hover:-translate-y-0.5 hover:border-primary/30">
              <div className="grid size-10 place-items-center rounded-lg bg-primary/10 ring-1 ring-inset ring-primary/20 text-primary mb-5">
                <Icon className="size-5" />
              </div>
              <h3 className="font-display text-lg">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ThreatsSection() {
  const items = [
    { title: "Phishing direcionado", body: "Mensagens forjadas se passando por reitoria, biblioteca e sistemas internos." },
    { title: "Engenharia social", body: "Pressões emocionais e autoridade falsa para extrair informação sensível." },
    { title: "Links e anexos suspeitos", body: "URLs encurtadas, domínios trocados e arquivos com macros maliciosas." },
    { title: "Vazamento de dados", body: "Exposição indevida de matrículas, notas e documentos institucionais." },
  ];
  return (
    <section id="ameacas" className="border-t border-border surface-1">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <SectionHeader
            eyebrow="Ameaças no ensino superior"
            title="A universidade é alvo. ELIOT prepara sua comunidade para responder."
            description="Instituições públicas concentram dados sensíveis, sistemas distribuídos e milhares de usuários. ELIOT dá visibilidade ao que acontece e converte cada alerta em aprendizado coletivo."
          />
          <ul className="grid gap-3">
            {items.map((it) => (
              <li key={it.title} className="flex gap-3 rounded-xl border border-border bg-card/60 p-4">
                <div className="mt-1 grid size-8 place-items-center rounded-lg bg-destructive/10 text-destructive ring-1 ring-inset ring-destructive/25">
                  <AlertOctagon className="size-4" />
                </div>
                <div>
                  <div className="font-medium text-sm">{it.title}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{it.body}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { Icon: ShieldCheck, title: "Resposta institucional rápida", body: "Centraliza incidentes, prioriza pela severidade e acompanha do reporte à conclusão." },
    { Icon: BarChart3,   title: "Decisões baseadas em dados",  body: "Painel analítico com volume, tipos, severidade e tempo médio de resposta." },
    { Icon: Trophy,      title: "Engajamento sustentável",     body: "Gamificação madura, com níveis e badges que valorizam o comportamento seguro." },
    { Icon: Lock,        title: "Privacidade por padrão",       body: "Coleta mínima, papéis claros e trilha completa para auditoria interna." },
  ];
  return (
    <section id="beneficios" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionHeader
          eyebrow="Por que ELIOT"
          title="Pensado para instituições públicas de ensino superior."
          description="Uma plataforma sóbria, acessível e operacional — desenhada para conviver com a realidade das universidades brasileiras."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 ring-soft">
              <Icon className="size-5 text-primary" />
              <h3 className="mt-4 font-medium">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section id="plataforma" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-5 py-20 md:py-28">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-14 text-center ring-soft">
          <div className="absolute inset-0 bg-radial-glow opacity-70 pointer-events-none" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
              Cada alerta fortalece a segurança coletiva.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Entre no ELIOT e comece agora a proteger sua comunidade acadêmica.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="h-11 px-5 gap-2">
                <Link to="/login">Acessar plataforma <ArrowRight className="size-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 px-5">
                <Link to="/app/dashboard">Ver demonstração</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
        <Logo size={22} />
        <div>© {new Date().getFullYear()} ELIOT · Plataforma C2R · Uso institucional</div>
        <div className="flex gap-5">
          <a href="#metodologia" className="hover:text-foreground">Metodologia</a>
          <a href="#beneficios" className="hover:text-foreground">Benefícios</a>
          <Link to="/login" className="hover:text-foreground">Acessar</Link>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-primary/80">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl md:text-[2.25rem] font-semibold tracking-tight leading-tight">{title}</h2>
      {description && <p className="mt-3 text-muted-foreground">{description}</p>}
    </div>
  );
}
