import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="relative flex h-[calc(100vh-64px)] items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
              Organize suas faturas e fluxos de pagamento
              <span className="block text-yellow-300">
                de forma simples e rápida
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
              O LC-FlowInvoice ajuda você a controlar entradas e saídas,
              automatizar relatórios e focar no que realmente importa: o
              crescimento do seu negócio.
            </p>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-yellow-400 px-8 py-3 text-base font-semibold text-gray-900 shadow-lg transition-all duration-200 hover:bg-yellow-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              Testar grátis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
