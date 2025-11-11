import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  BellRing,
  CarFront,
  ShieldCheck,
  SmartphoneNfc,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Informe seu e-mail corporativo." })
    .min(1, "Informe seu e-mail corporativo.")
    .email("E-mail inválido."),
  password: z
    .string({ required_error: "Informe sua senha." })
    .min(1, "Informe sua senha."),
  remember: z.boolean().default(false).optional(),
});

const recoverySchema = z.object({
  recoveryEmail: z
    .string({ required_error: "Informe o e-mail cadastrado." })
    .min(1, "Informe o e-mail cadastrado.")
    .email("E-mail inválido."),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RecoveryFormData = z.infer<typeof recoverySchema>;

const featureHighlights = [
  {
    icon: CarFront,
    title: "Gestão inteligente",
    description:
      "Controle de vagas, fluxo de veículos e dashboards em tempo real para toda a operação.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança reforçada",
    description:
      "Autenticação multi-nível, políticas de acesso por perfil e registros detalhados de auditoria.",
  },
  {
    icon: BellRing,
    title: "Alertas proativos",
    description:
      "Notificações automáticas sobre reservas, check-ins pendentes e ocupação acima do previsto.",
  },
  {
    icon: SmartphoneNfc,
    title: "Experiência mobile",
    description:
      "Aplicação responsiva para equipes em campo e transportadoras que precisam de agilidade.",
  },
];

export function LoginPage() {
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSendingRecovery, setIsSendingRecovery] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors: loginErrors },
    reset: resetLoginForm,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const {
    register: registerRecovery,
    handleSubmit: handleRecoverySubmit,
    formState: { errors: recoveryErrors },
    reset: resetRecoveryForm,
  } = useForm<RecoveryFormData>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      recoveryEmail: "",
    },
  });

  const onSubmitLogin = async (data: LoginFormData) => {
    setIsAuthenticating(true);
    try {
      // TODO: integrar com serviço real de autenticação
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.info("[login] credenciais submetidas", {
        ...data,
        password: "******",
      });
      resetLoginForm({ ...data, password: "" });
    } finally {
      setIsAuthenticating(false);
    }
  };

  const onSubmitRecovery = async (data: RecoveryFormData) => {
    setIsSendingRecovery(true);
    setRecoverySent(false);
    try {
      // TODO: integrar com serviço real de recuperação de senha
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.info("[recovery] solicitação enviada", data);
      setRecoverySent(true);
      resetRecoveryForm();
    } finally {
      setIsSendingRecovery(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-1 flex-col bg-gradient-to-br from-[#020817] via-[#030712] to-[#020617]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-72 w-72 rounded-full bg-primary/30 blur-[120px] md:h-[420px] md:w-[420px]" />
        <div className="absolute bottom-10 right-10 h-52 w-52 rounded-full bg-ajh-secondary/30 blur-[120px] md:h-80 md:w-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1D4ED8_0%,transparent_55%)] opacity-40" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col-reverse gap-16 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12 lg:px-20">
        <aside className="mx-auto flex w-full max-w-2xl flex-col gap-10 text-slate-200 md:mx-0 md:max-w-lg">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-primary/90">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/50 bg-primary/10 font-semibold">
              GT
            </span>
            <span>Sistema de Estacionamentos</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
              Conecte transportadoras, estacionamentos e operações em um único
              painel.
            </h1>
            <p className="text-base text-slate-300 md:text-lg">
              Acesse o GTSystem para acompanhar a ocupação em tempo real, gerir
              contratos e otimizar o fluxo de veículos em toda a rede.
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {featureHighlights.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-xl border border-slate-700/60 bg-white/5 p-4 backdrop-blur transition hover:border-primary/40 hover:bg-primary/10"
              >
                <div className="mb-3 flex items-center gap-2 text-primary/80">
                  <span className="rounded-md bg-primary/20 p-2 text-primary group-hover:bg-primary/30">
                    <Icon className="h-5 w-5" />
                  </span>
                  <dt className="font-medium text-slate-100">{title}</dt>
                </div>
                <dd className="text-sm text-slate-300/90">{description}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <main className="mx-auto w-full max-w-md md:mx-0">
          <Card className="border-slate-700/60 bg-slate-950/60 shadow-2xl shadow-primary/10">
            <CardHeader className="gap-3">
              <CardTitle className="text-2xl text-white">
                Acesse sua conta
              </CardTitle>
              <CardDescription className="text-slate-300">
                Utilize seu e-mail corporativo e senha para entrar na plataforma
                GTSystem.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form
                className="space-y-5"
                onSubmit={handleSubmit(onSubmitLogin)}
              >
                <div className="space-y-2">
                  <Label htmlFor="email" required>
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="nome.sobrenome@empresa.com"
                    {...register("email")}
                    aria-invalid={Boolean(loginErrors.email)}
                  />
                  {loginErrors.email && (
                    <p className="text-sm text-red-400" role="alert">
                      {loginErrors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" required>
                      Senha
                    </Label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsRecoveryOpen((prev) => !prev);
                        setRecoverySent(false);
                      }}
                      className="text-sm font-medium text-primary transition hover:text-primary/80"
                    >
                      Esqueci minha senha
                    </button>
                  </div>

                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...register("password")}
                    aria-invalid={Boolean(loginErrors.password)}
                  />
                  {loginErrors.password && (
                    <p className="text-sm text-red-400" role="alert">
                      {loginErrors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border border-slate-600 bg-transparent text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                      {...register("remember")}
                    />
                    Manter conectado
                  </label>
                  <span className="text-slate-500">
                    Ambiente seguro e criptografado
                  </span>
                </div>

                <Button
                  type="submit"
                  className="w-full gap-2"
                  disabled={isAuthenticating}
                >
                  <span>{isAuthenticating ? "Entrando..." : "Entrar"}</span>
                  {!isAuthenticating && <ArrowRight className="h-4 w-4" />}
                </Button>
              </form>

              <section
                className={cn(
                  "grid grid-rows-[0fr] gap-0 transition-all duration-300",
                  {
                    "grid-rows-[1fr] gap-4": isRecoveryOpen,
                  },
                )}
                aria-live="polite"
              >
                <div className="overflow-hidden">
                  <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-sm font-semibold text-slate-100">
                          Recuperar acesso
                        </h2>
                        <p className="mt-1 text-xs text-slate-300">
                          Informe o e-mail corporativo. Enviaremos um link para
                          redefinição da senha.
                        </p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setIsRecoveryOpen(false);
                          setRecoverySent(false);
                          resetRecoveryForm();
                        }}
                      >
                        Fechar
                      </Button>
                    </div>

                    <form
                      className="mt-4 space-y-4"
                      onSubmit={handleRecoverySubmit(onSubmitRecovery)}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="recoveryEmail" required>
                          E-mail cadastrado
                        </Label>
                        <Input
                          id="recoveryEmail"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="contato@empresa.com"
                          {...registerRecovery("recoveryEmail")}
                          aria-invalid={Boolean(recoveryErrors.recoveryEmail)}
                        />
                        {recoveryErrors.recoveryEmail && (
                          <p className="text-sm text-red-400" role="alert">
                            {recoveryErrors.recoveryEmail.message}
                          </p>
                        )}
                        {recoverySent && (
                          <p className="text-sm text-emerald-400">
                            Link de recuperação enviado! Verifique sua caixa de
                            entrada.
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          type="submit"
                          size="sm"
                          disabled={isSendingRecovery}
                        >
                          {isSendingRecovery
                            ? "Enviando..."
                            : "Enviar link de recuperação"}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setIsRecoveryOpen(false);
                            setRecoverySent(false);
                            resetRecoveryForm();
                          }}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </CardContent>

            <CardFooter className="flex-col items-start gap-3 text-xs text-slate-400">
              <p>
                Precisa de ajuda? Envie um e-mail para{" "}
                <a
                  href="mailto:suporte@gtsystem.com"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  suporte@gtsystem.com
                </a>
              </p>
              <div className="flex gap-2 text-xs text-slate-500">
                <span>© {new Date().getFullYear()} GTSystem.</span>
                <span>Todos os direitos reservados.</span>
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
