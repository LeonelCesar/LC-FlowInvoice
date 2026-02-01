/* import { StartCard } from "../../components/StartCard";

 export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-1 sm:px-6 lg:px-2 py-0 border">
      <StartCard />
    </div>
  );
} */

"use client";

// Dashboard = apenas composição de blocos (boa prática)
import { MetricCard } from "../../components/MetricCard";
import { QuickActions } from "../../components/ui/QuickAction";
import { TableCard } from "../../components/TableCard";

import { clients } from "../../data/Clients/clients.data";
import { invoices } from "../../data/invoices/invoices.data";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Total Faturado" value="€ 125.430,00" highlight />
        <MetricCard title="Pendentes" value="€ 18.200,00" />
        <MetricCard title="Pagas" value="€ 107.230,00" />
      </div>

      {/* Botões de ação rápida */}
      <QuickActions />

      {/* Tabelas informativas */}
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
    </div>
  );
}
