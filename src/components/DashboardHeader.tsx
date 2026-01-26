// app/(dashboard)/dashboard/components/DashboardHeader.tsx
import { Button } from "../components/ui/ButtonVariantProp";

export function DashboardHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Título */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Visão geral do seu faturamento
        </p>
      </div>

      {/* Ações */}
      <div className="flex gap-2">
        <Button variant="ghost">
          Exportar
        </Button>

        <Button>
          Nova fatura
        </Button>
      </div>
    </header>
  )
}
