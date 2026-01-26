// app/(dashboard)/dashboard/page.tsx
import { getDashboardMetrics } from "../../services/service"
import { MetricsGrid } from "../../components/Metrics/MetricsGrid";
import { DashboardHeader } from "../../components/DashboardHeader";

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics()

  return (
    <section className="space-y-8">
      <DashboardHeader />

      <MetricsGrid metrics={metrics} />
    </section>
  )
}
