"use client";

import { MetricCard } from "../../components/MetricCard";
import { QuickActionBtn } from "../../components/ui/QuickActionBtn";
import { TableCard } from "../../components/TableCard";

import { clientsMock } from "../../mocks/clients.mock";
import { invoicesMock } from "../../mocks/invoices.mock";

// Dados de métricas
const metrics = [
  {
    title: "Total Faturado",
    value: 125430,
    previousValue: 118000,
    highlight: true,
  },
  {
    title: "Pendentes",
    value: 18200,
    previousValue: 20000,
  },
  {
    title: "Pagas",
    value: 107230,
    previousValue: 98000,
  },
];

export default function Dashboard() {
  // Formatação de moeda
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
    }).format(val);

  return (
    <section className="container mx-auto py-6 space-y-6 sm:px-4 lg:px-0">
      
      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            previousValue={metric.previousValue}
            highlight={metric.highlight}
          />
        ))}
      </div>

      {/* Ações rápidas */}
      <QuickActionBtn />

      {/* Tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TableCard
          title="Últimos Clientes"
          headers={["Nome", "Email", "Status"]}
          rows={clientsMock.map((client) => [
            client.name,
            client.email,
            client.status,
          ])}
        />

        <TableCard
          title="Últimas Faturas"
          headers={["Cliente", "Valor", "Estado"]}
          rows={invoicesMock.map((invoice) => [
            clientsMock.find((c) => c.id === invoice.clientId)?.name || "Cliente Desconhecido",
            formatCurrency(invoice.amount),
            invoice.status,
          ])}
        />
      </div>
    </section>
  );
}
