// components/metrics/MetricsGrid.tsx
import { DashboardMetrics } from "../../types/dashboard";
import { MetricCard } from "../../components/Metrics/MetricsCard";

interface Props {
  metrics: DashboardMetrics
}

export function MetricsGrid({ metrics }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <MetricCard label="Faturamento" value={metrics.totalRevenue} />
      <MetricCard label="Pendentes" value={metrics.pendingInvoices} />
      <MetricCard label="Pagas" value={metrics.paidInvoices} />
      <MetricCard label="Em atraso" value={metrics.overdueInvoices} />
    </div>
  )
}
