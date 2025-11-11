import { FormEvent, ReactNode, useState } from "react";
import { ArrowRight, Car, Clock, Lock, Mail, ShieldCheck } from "lucide-react";

type AuthMode = "login" | "recover";

const LoginPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Integração de autenticação será implementada na conexão com o backend.
  };

  const handleRecoverSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Integração de recuperação será implementada com o serviço de e-mail.
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-gradient-ajh blur-3xl opacity-60" />
      <div className="absolute inset-0 -z-10 bg-slate-950/95 backdrop-blur-lg">
        <div className="bg-grid h-full w-full" />
      </div>

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-10 lg:flex-row lg:items-center lg:justify-between">
        <section className="flex flex-1 flex-col gap-10 text-slate-100">
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span>GTSystem • Gestão Inteligente de Estacionamentos</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Controle total do seu estacionamento em um só lugar.
            </h1>
            <p className="max-w-xl text-lg text-slate-300">
              Simplifique a entrada de transportadoras, organize vagas em tempo real e automatize processos
              críticos. Conecte equipes, clientes e parceiros com segurança e eficiência.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5 text-emerald-400" />}
              title="Segurança reforçada"
              description="Autenticação com tokens e rastreabilidade completa do acesso."
            />
            <FeatureCard
              icon={<Clock className="h-5 w-5 text-sky-400" />}
              title="Operação 24/7"
              description="Dashboards em tempo real para decisões instantâneas."
            />
          </div>
        </section>

        <section className="flex w-full max-w-md flex-col">
          <div className="relative rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-[0_25px_70px_-30px_rgba(15,23,42,0.9)] backdrop-blur-xl lg:p-10">
            <div className="mb-8 flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Acesso ao sistema
              </span>
              <h2 className="text-2xl font-semibold text-white">Bem-vindo de volta</h2>
              <p className="text-sm text-slate-400">
                {mode === "login"
                  ? "Entre com suas credenciais corporativas para gerenciar operações."
                  : "Informe o e-mail corporativo cadastrado para receber a redefinição."}
              </p>
            </div>

            <div className="mb-8 grid grid-cols-2 gap-2 rounded-full bg-white/5 p-1">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  mode === "login"
                    ? "bg-white/90 text-slate-900 shadow-lg shadow-primary/20"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => setMode("recover")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  mode === "recover"
                    ? "bg-white/90 text-slate-900 shadow-lg shadow-primary/20"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                Recuperar acesso
              </button>
            </div>

            {mode === "login" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-200">
                    E-mail corporativo
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nome@empresa.com"
                      autoComplete="email"
                      required
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 pl-11 text-sm text-slate-100 outline-none transition focus:border-primary/50 focus:bg-slate-900/60 focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-slate-200">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Digite sua senha"
                      autoComplete="current-password"
                      required
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 pl-11 text-sm text-slate-100 outline-none transition focus:border-primary/50 focus:bg-slate-900/60 focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-400">
                  <label htmlFor="remember" className="flex items-center gap-2">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-primary focus:ring-primary/70"
                    />
                    <span>Lembrar de mim</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setMode("recover")}
                    className="font-medium text-primary transition hover:text-primary/80"
                  >
                    Esqueci minha senha
                  </button>
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Acessar painel
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-xs text-slate-500">
                  Este acesso é exclusivo para equipes credenciadas. Buscando parceria?{" "}
                  <a href="mailto:contato@gtsystem.com" className="font-medium text-slate-200 underline">
                    Fale conosco
                  </a>
                  .
                </p>
              </form>
            ) : (
              <form onSubmit={handleRecoverSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="recovery-email" className="text-sm font-medium text-slate-200">
                    E-mail cadastrado
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                    <input
                      id="recovery-email"
                      name="recovery-email"
                      type="email"
                      placeholder="nome@empresa.com"
                      autoComplete="email"
                      required
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 pl-11 text-sm text-slate-100 outline-none transition focus:border-primary/50 focus:bg-slate-900/60 focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                <div className="space-y-4 rounded-2xl border border-dashed border-primary/40 bg-primary/10 p-4 text-sm text-primary-foreground/80">
                  <div className="flex items-center gap-3 text-slate-200">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span className="font-medium">Passos para recuperar o acesso</span>
                  </div>
                  <ol className="list-decimal space-y-2 pl-5 text-slate-300">
                    <li>Envie o e-mail cadastrado para receber o link de redefinição.</li>
                    <li>Verifique sua caixa de entrada (e o spam) e siga as instruções.</li>
                    <li>Defina uma nova senha segura com pelo menos 8 caracteres.</li>
                  </ol>
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/95 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
                >
                  Enviar link de recuperação
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="w-full text-sm font-medium text-slate-300 transition hover:text-slate-100"
                >
                  Voltar ao login
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
            <span>© {new Date().getFullYear()} GTSystem. Todos os direitos reservados.</span>
            <div className="flex items-center gap-3">
              <span>LGPD ready</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 p-5 shadow-inner shadow-slate-900/40 backdrop-blur-sm">
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/60">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
};

export default LoginPage;
