"use client";

import { MetricCard } from "../../components/MetricCard";
import { QuickActionBtn } from "../../components/ui/QuickActionBtn";
import { TableCard } from "../../components/TableCard";

import { clients } from "../../data/Clients/clients.data";
import { invoices } from "../../data/invoices/invoices.data";

export default function Dashboard() {
  return (
    <section className="container mx-auto py-6 space-y-6 sm:px-4 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Total Faturado" value="€ 125.430,00" highlight />
        <MetricCard title="Pendentes" value="€ 18.200,00" />
        <MetricCard title="Pagas" value="€ 107.230,00" />
      </div>

      <QuickActionBtn />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TableCard
          title="Últimos Clientes"
          headers={["Nome", "Email", "Status"]}
          rows={clients.map((client) => [
            client.name,
            client.email,
            client.status,
          ])}
        />
        <TableCard
          title="Últimas Faturas"
          headers={["Cliente", "Valor", "Estado"]}
          rows={invoices.map((invoice) => [
            invoice.clientName,
            new Intl.NumberFormat("pt-PT", {
              style: "currency",
              currency: "EUR",
            }).format(invoice.amount),
            invoice.status,
          ])}
        />
      </div>
    </section>
  );
}
