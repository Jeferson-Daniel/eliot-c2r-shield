import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Building2, Lock, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/eliot/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — ELIOT" },
      { name: "description", content: "Acesse sua conta institucional na plataforma ELIOT." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <aside className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden border-r border-border surface-1">
        <div className="absolute inset-0 bg-radial-glow opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)] pointer-events-none" />
        <div className="relative">
          <Logo size={32} />
        </div>
        <div className="relative">
          <div className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-primary/80 mb-4">
            Plataforma C2R
          </div>
          <h2 className="font-display text-3xl xl:text-4xl font-semibold leading-tight tracking-tight">
            Transforme atenção <br/> em proteção institucional.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            ELIOT centraliza capacitação, conscientização e reporte de incidentes para fortalecer
            a cultura de segurança da informação da sua universidade.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              { Icon: ShieldCheck, t: "Reporte de incidentes em poucos cliques" },
              { Icon: Lock,        t: "Privacidade por padrão e trilha de auditoria" },
              { Icon: Building2,   t: "Pensado para instituições públicas de ensino" },
            ].map(({ Icon, t }) => (
              <li key={t} className="flex items-center gap-3 text-muted-foreground">
                <Icon className="size-4 text-primary" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative text-xs text-muted-foreground">
          © {new Date().getFullYear()} ELIOT · Uso institucional
        </div>
      </aside>

      <main className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Entrar no ELIOT</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Use suas credenciais institucionais para continuar.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => {
                toast.success("Bem-vindo de volta", { description: "Sessão iniciada na plataforma ELIOT." });
                navigate({ to: "/app/dashboard" });
              }, 600);
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail institucional</Label>
              <Input id="email" type="email" placeholder="nome.sobrenome@ifam.edu.br" required defaultValue="paulo.anjos@ifam.edu.br" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <a className="text-xs text-muted-foreground hover:text-foreground" href="#">Esqueci minha senha</a>
              </div>
              <Input id="password" type="password" placeholder="••••••••" required defaultValue="demo1234" />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-10 gap-2">
              {loading ? "Entrando…" : "Entrar"} <ArrowRight className="size-4" />
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">ou</span></div>
            </div>

            <Button type="button" variant="outline" className="w-full h-10">
              <Building2 className="size-4 mr-2" /> Entrar com SSO institucional
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Ao continuar, você concorda com as políticas de uso e privacidade.{" "}
            <Link to="/" className="text-foreground hover:underline">Voltar à página inicial</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
