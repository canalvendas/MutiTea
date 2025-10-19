import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Calendar, FileText, CheckCircle, ArrowRight, Star } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex items-center">
            <Logo />
          </div>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <a href="#features" className="transition-colors hover:text-primary">Recursos</a>
            <a href="#testimonials" className="transition-colors hover:text-primary">Depoimentos</a>
            <a href="#pricing" className="transition-colors hover:text-primary">Preços</a>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild className="shadow-md hover:shadow-lg transition-shadow">
              <Link to="/login">Comece Agora</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="container flex flex-col items-center justify-center space-y-8 py-20 text-center md:py-32">
            <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,#17494D22,transparent)]"></div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Otimize sua prática, transforme vidas
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              MultiTea é a plataforma completa para terapeutas do TEA. Centralize a gestão de pacientes, agendamentos e documentação para focar no que realmente importa.
            </p>
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/login">Começar Teste Gratuito <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline">
                Ver Demonstração
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Junte-se a mais de 500 terapeutas que confiam no MultiTea.</p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container space-y-16 py-12 md:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Recursos pensados para você</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Tudo que você precisa para uma gestão eficiente e humanizada, em um só lugar.
            </p>
          </div>
          <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="text-2xl font-bold">Gestão Completa de Pacientes</h3>
              <p className="mt-4 text-muted-foreground">
                Mantenha um prontuário eletrônico detalhado, com histórico de sessões, documentos e planos terapêuticos individualizados. Acesse tudo de forma rápida e segura.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Anamneses e evoluções personalizáveis.</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Armazenamento seguro de documentos.</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Acompanhamento visual do progresso.</li>
              </ul>
            </div>
            <div className="flex h-full items-center justify-center rounded-lg bg-muted p-8">
              <Users className="h-32 w-32 text-primary" />
            </div>
          </div>
          <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
            <div className="flex h-full items-center justify-center rounded-lg bg-muted p-8 md:order-last">
              <Calendar className="h-32 w-32 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Agenda Inteligente e Flexível</h3>
              <p className="mt-4 text-muted-foreground">
                Organize seus atendimentos com uma agenda visual e intuitiva. Evite conflitos de horário, gerencie remarcações e tenha uma visão clara do seu dia e da sua semana.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Visualização diária, semanal e mensal.</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Lembretes automáticos para pacientes.</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bloqueio de horários e gestão de recorrências.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-muted py-12 md:py-24">
          <div className="container">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Amado por terapeutas em todo o Brasil</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Veja o que os profissionais estão dizendo sobre como o MultiTea transformou suas rotinas.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic">"O MultiTea revolucionou minha organização. Consigo dedicar muito mais tempo aos meus pacientes e menos tempo à burocracia. Os modelos de relatório são fantásticos!"</p>
                  <div className="mt-4 font-semibold">Juliana Oliveira</div>
                  <div className="text-sm text-muted-foreground">Psicóloga</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic">"Como terapeuta ocupacional, a funcionalidade de registro de evolução com sugestões é uma mão na roda. Agiliza meu trabalho e garante que nada importante seja esquecido."</p>
                  <div className="mt-4 font-semibold">Carlos Ferreira</div>
                  <div className="text-sm text-muted-foreground">Terapeuta Ocupacional</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic">"A melhor plataforma que já usei. É intuitiva, completa e o suporte é muito atencioso. Recomendo para todos os colegas da área de fonoaudiologia."</p>
                  <div className="mt-4 font-semibold">Fernanda Costa</div>
                  <div className="text-sm text-muted-foreground">Fonoaudióloga</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="container py-12 md:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Um plano para cada etapa da sua carreira</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Comece gratuitamente e escolha o plano que melhor se adapta às suas necessidades.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Iniciante</CardTitle>
                <CardDescription>Para quem está começando</CardDescription>
                <div className="text-4xl font-bold mt-4">R$ 49<span className="text-lg font-normal text-muted-foreground">/mês</span></div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Até 10 pacientes</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Agenda e prontuários</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Suporte por email</li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full" variant="outline">Começar</Button>
              </div>
            </Card>
            <Card className="flex flex-col border-primary shadow-lg">
              <CardHeader>
                <CardTitle>Profissional</CardTitle>
                <CardDescription>O mais popular para terapeutas</CardDescription>
                <div className="text-4xl font-bold mt-4">R$ 99<span className="text-lg font-normal text-muted-foreground">/mês</span></div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Pacientes ilimitados</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Relatórios avançados</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Modelos de documentos IA</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Suporte prioritário</li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full">Escolher Plano</Button>
              </div>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Clínica</CardTitle>
                <CardDescription>Para equipes e clínicas</CardDescription>
                <div className="text-4xl font-bold mt-4">Contato</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Múltiplos terapeutas</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Gestão de permissões</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Faturamento integrado</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Suporte dedicado</li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full" variant="outline">Fale Conosco</Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container py-12 md:py-24">
          <div className="mx-auto max-w-4xl rounded-lg bg-primary/10 p-8 text-center">
            <h2 className="text-3xl font-bold">Pronto para transformar sua prática?</h2>
            <p className="mt-4 text-muted-foreground">
              Comece seu teste gratuito de 14 dias. Sem cartão de crédito, sem compromisso.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/login">Começar Agora Gratuitamente</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Logo size="sm" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} MultiTea. Todos os direitos reservados.
            </p>
          </div>
          <nav className="flex gap-4">
            <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Termos</Link>
            <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Privacidade</Link>
            <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Contato</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Landing;