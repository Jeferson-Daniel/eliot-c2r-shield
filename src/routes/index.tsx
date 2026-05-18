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
    <div className="min-h-screen bg-background selection:bg-primary/20">
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
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/60 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-6xl flex h-16 items-center justify-between px-5">
        <Logo />
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground/80 font-medium">
          <a href="#metodologia" className="hover:text-foreground transition-colors duration-300">Metodologia</a>
          <a href="#ameacas" className="hover:text-foreground transition-colors duration-300">Ameaças</a>
          <a href="#beneficios" className="hover:text-foreground transition-colors duration-300">Benefícios</a>
          <a href="#plataforma" className="hover:text-foreground transition-colors duration-300">Plataforma</a>
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex hover:bg-accent/50 transition-colors duration-300"><Link to="/login">Entrar</Link></Button>
          <Button asChild size="sm" className="gap-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20">
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
      <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-28 md:pt-32 md:pb-36 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary/30 backdrop-blur-sm px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Metodologia C2R: Capacitar, Conscientizar e Reportar
          </div>
          <h1 className="mt-8 font-display text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
            Cultura de segurança cibernética para o <span className="text-gradient">ensino superior</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground/90 leading-relaxed">
            O ELIOT centraliza as ações de segurança da sua universidade. Uma plataforma simples para treinar equipes, manter a comunidade alerta e gerenciar incidentes com rapidez.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-6 gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20">
              <Link to="/login">Acessar plataforma <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 transition-all duration-300 hover:bg-accent/50 hover:-translate-y-0.5">
              <a href="#metodologia">Conhecer a metodologia</a>
            </Button>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 ease-out fill-mode-both">
          <HeroMock />
        </div>
      </div>
    </section>
  );
}

function HeroMock() {
  return (
    <div className="relative mt-16 mx-auto max-w-5xl group perspective-1000">
      {/* Decorative background glow behind mockup */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative rounded-2xl border border-white/5 bg-card/60 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden transition-transform duration-700 ease-out hover:-translate-y-1">
        {/* Browser header bar */}
        <div className="flex items-center gap-2 border-b border-white/5 bg-secondary/20 px-4 h-10 backdrop-blur-md">
          <span className="size-3 rounded-full bg-destructive/80 shadow-sm" />
          <span className="size-3 rounded-full bg-warning/80 shadow-sm" />
          <span className="size-3 rounded-full bg-success/80 shadow-sm" />
          <div className="mx-auto flex items-center justify-center rounded-md bg-background/40 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground/80 tracking-wide border border-white/5">app.eliot.edu / dashboard</div>
        </div>
        
        {/* Content area */}
        <div className="grid grid-cols-12 gap-5 p-6 bg-gradient-to-b from-background/40 to-background/10 select-none cursor-default">
          <div className="col-span-12 md:col-span-3 space-y-2">
            {["Dashboard", "Reportar", "Meus reportes", "Capacitação", "Ranking", "Painel admin"].map((l, i) => (
              <div key={l} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium ${i === 0 ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20" : "text-muted-foreground/60"}`}>
                <span className="size-1.5 rounded-full bg-current opacity-70" /> {l}
              </div>
            ))}
          </div>
          <div className="col-span-12 md:col-span-9 grid grid-cols-3 gap-4">
            {[
              { l: "Pendentes", v: "14", t: "warning" },
              { l: "Concluídos", v: "722", t: "success" },
              { l: "Pontos distribuídos", v: "28k", t: "primary" },
            ].map((k) => (
              <div key={k.l} className="rounded-xl border border-white/5 bg-background/40 p-4.5 text-left shadow-sm backdrop-blur-sm">
                <div className="text-[0.65rem] uppercase tracking-widest text-muted-foreground/80 font-medium">{k.l}</div>
                <div className="font-display text-2xl mt-2 font-semibold">{k.v}</div>
                <div className={`mt-2.5 h-1.5 rounded-full ${k.t === "warning" ? "bg-warning/20" : k.t === "success" ? "bg-success/20" : "bg-primary/20"} overflow-hidden`}>
                  <div className={`h-full rounded-full ${k.t === "warning" ? "bg-warning" : k.t === "success" ? "bg-success" : "bg-primary"}`} style={{ width: "60%" }} />
                </div>
              </div>
            ))}
            <div className="col-span-3 rounded-xl border border-white/5 bg-background/40 p-5 shadow-sm backdrop-blur-sm">
              <div className="text-xs font-medium text-muted-foreground/80 mb-4 tracking-wide">Volume de notificações — 12 meses</div>
              <div className="flex items-end gap-2 h-24">
                {[40, 55, 60, 70, 82, 92, 70, 65, 78, 88, 84, 99].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm bg-primary/40" style={{ height: `${h}%` }} />
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
    { Icon: GraduationCap, title: "Capacitar", body: "Cursos curtos e objetivos sobre criação de senhas, prevenção de phishing e boas práticas para o dia a dia na universidade." },
    { Icon: Eye,            title: "Conscientizar", body: "Campanhas e dicas pontuais que ajudam a manter a segurança em pauta, sem sobrecarregar a caixa de entrada dos usuários." },
    { Icon: Megaphone,      title: "Reportar", body: "Um canal direto e seguro para que qualquer aluno ou servidor comunique incidentes suspeitos rapidamente à equipe de TI." },
  ];
  return (
    <section id="metodologia" className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <SectionHeader
          eyebrow="Metodologia C2R"
          title="Três passos para uma comunidade mais segura."
          description="O ELIOT estrutura as práticas de segurança em três frentes principais. Nosso foco é criar hábitos reais e proteger os dados da instituição de forma contínua."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map(({ Icon, title, body }) => (
            <div key={title} className="group rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md hover:bg-card/60">
              <div className="grid size-11 place-items-center rounded-lg bg-primary/10 ring-1 ring-inset ring-primary/20 text-primary mb-6 transition-colors group-hover:bg-primary/20">
                <Icon className="size-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2.5 text-sm text-muted-foreground/90 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ThreatsSection() {
  const items = [
    { title: "Phishing", body: "E-mails falsos que simulam comunicados da reitoria, biblioteca ou sistemas internos da instituição." },
    { title: "Engenharia social", body: "Tentativas de manipulação para obter acesso a sistemas, redes e dados restritos." },
    { title: "Arquivos maliciosos", body: "Mensagens com links alterados e anexos infectados enviados para os e-mails da universidade." },
    { title: "Vazamento de dados", body: "Exposição acidental ou criminosa de matrículas, notas, pesquisas e documentos internos." },
  ];
  return (
    <section id="ameacas" className="border-t border-border/40 surface-1 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <SectionHeader
            eyebrow="Ameaças frequentes"
            title="Prevenção contra os riscos mais comuns no setor acadêmico."
            description="Universidades lidam com dados sensíveis de milhares de pessoas todos os dias. O ELIOT ajuda a identificar e mapear os principais pontos de vulnerabilidade do ambiente institucional."
          />
          <ul className="grid gap-4">
            {items.map((it) => (
              <li key={it.title} className="group flex gap-4 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-destructive/20 hover:bg-card/60">
                <div className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-destructive/10 text-destructive ring-1 ring-inset ring-destructive/25 transition-colors group-hover:bg-destructive/20">
                  <AlertOctagon className="size-4.5" />
                </div>
                <div>
                  <div className="font-semibold text-[0.95rem]">{it.title}</div>
                  <div className="text-sm text-muted-foreground/90 mt-1 leading-relaxed">{it.body}</div>
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
    { Icon: ShieldCheck, title: "Gestão de incidentes", body: "Organiza e classifica os chamados de segurança, facilitando o acompanhamento e a resolução pela equipe técnica." },
    { Icon: BarChart3,   title: "Métricas de segurança",  body: "Indicadores claros sobre o volume, a gravidade e o tempo de resolução dos alertas reportados pela comunidade." },
    { Icon: Trophy,      title: "Participação da comunidade",     body: "Incentiva o engajamento dos usuários através de um sistema simples de pontuação e conquistas institucionais." },
    { Icon: Lock,        title: "Respeito à privacidade",       body: "Coleta apenas os dados estritamente necessários e mantém registros detalhados para eventuais auditorias." },
  ];
  return (
    <section id="beneficios" className="border-t border-border/40">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <SectionHeader
          eyebrow="Por que usar o ELIOT"
          title="Desenvolvido para a realidade das universidades públicas."
          description="O ELIOT respeita as características e limitações das instituições de ensino brasileiras, entregando ferramentas diretas e fáceceis de implementar."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ Icon, title, body }) => (
            <div key={title} className="group rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md hover:bg-card/50">
              <Icon className="size-6 text-primary mb-5 opacity-90 transition-opacity group-hover:opacity-100" />
              <h3 className="font-semibold text-base">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground/90 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section id="plataforma" className="border-t border-border/40">
      <div className="mx-auto max-w-5xl px-5 py-24 md:py-32">
        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-card/60 backdrop-blur-lg p-12 md:p-16 text-center shadow-2xl shadow-primary/5">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50 pointer-events-none" />
          <div className="absolute -top-24 -right-24 size-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 size-96 bg-info/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              Comece a estruturar a segurança da sua instituição.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground/90 text-base md:text-lg">
              Acesse a plataforma ou confira a demonstração do nosso painel principal.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-7 gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20">
                <Link to="/login">Acessar plataforma <ArrowRight className="size-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7 transition-all duration-300 hover:bg-accent/50 hover:-translate-y-0.5">
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
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-5 py-12 flex flex-col md:flex-row gap-6 items-center justify-between text-sm font-medium text-muted-foreground/70">
        <Logo size={22} />
        <div>© {new Date().getFullYear()} ELIOT · Plataforma C2R · Uso institucional</div>
        <div className="flex gap-6">
          <a href="#metodologia" className="hover:text-foreground transition-colors duration-300">Metodologia</a>
          <a href="#beneficios" className="hover:text-foreground transition-colors duration-300">Benefícios</a>
          <Link to="/login" className="hover:text-foreground transition-colors duration-300">Acessar</Link>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary/80">{eyebrow}</div>
      <h2 className="mt-3.5 font-display text-3xl md:text-4xl font-semibold tracking-tight leading-tight">{title}</h2>
      {description && <p className="mt-4 text-muted-foreground/90 text-base leading-relaxed">{description}</p>}
    </div>
  );
}
