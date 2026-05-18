import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* HERO */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <span className="inline-block mb-4 rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
              Plataforma de Gestão Financeira
            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
              Controle total das suas faturas.
              <span className="block text-yellow-300">
                Sem planilhas, sem complicação.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              O LC-FlowInvoice centraliza faturamento, status de pagamento,
              relatórios e previsões de fluxo de caixa em uma única
              plataforma intuitiva.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-lg bg-yellow-400 px-8 py-3 text-base font-semibold text-gray-900 shadow-lg transition-all duration-200 hover:bg-yellow-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                Começar gratuitamente
              </Link>

              <Link
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-8 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10"
              >
                Ver funcionalidades
              </Link>
            </div>

            <div className="mt-10 text-sm text-white/80">
              ✔ Sem cartão de crédito &nbsp;&nbsp; ✔ Setup em menos de 2 minutos
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="bg-gray-50 py-24"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tudo o que você precisa para gerenciar seu fluxo financeiro
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-16">
            Automatize tarefas repetitivas, acompanhe pagamentos em tempo real
            e tome decisões baseadas em dados.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              title="Gestão de Faturas"
              description="Crie, edite e acompanhe o status das faturas em segundos."
            />

            <FeatureCard
              title="Relatórios Inteligentes"
              description="Visualize métricas financeiras e previsão de fluxo de caixa."
            />

            <FeatureCard
              title="Controle de Pagamentos"
              description="Monitore pagamentos pendentes, pagos e vencidos com clareza."
            />
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Reduza atrasos e aumente previsibilidade
            </h2>

            <ul className="space-y-4 text-gray-600">
              <li>✔ Alertas de vencimento automáticos</li>
              <li>✔ Visão consolidada do fluxo de caixa</li>
              <li>✔ Histórico completo de faturamento</li>
              <li>✔ Interface simples e focada em produtividade</li>
            </ul>
          </div>

          <div className="bg-gray-100 rounded-2xl p-10 shadow-inner">
            <p className="text-gray-700 text-lg italic">
              “Desde que começamos a usar o LC-FlowInvoice,
              reduzimos em 35% os atrasos de pagamento.”
            </p>
            <div className="mt-4 font-semibold text-gray-900">
              — Cliente SaaS Alberto da Costa César
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-indigo-600 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Pronto para organizar seu financeiro?
        </h2>

        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-lg bg-yellow-400 px-8 py-3 text-base font-semibold text-gray-900 shadow-lg transition-all duration-200 hover:bg-yellow-500 hover:shadow-xl"
        >
          Criar conta agora
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center text-sm">
        © {new Date().getFullYear()} LC-FlowInvoice. Todos os direitos reservados. <br />
        © {new Date().getFullYear()} leonelcesar62@gmail.com
      </footer>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-left hover:shadow-md transition">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
