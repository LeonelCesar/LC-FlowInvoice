// components/metrics/MetricCard.tsx
import { Card } from "../ui/Card";

interface Props {
  label: string
  value: number
}

export function MetricCard({ label, value }: Props) {
  return (
    <Card>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900">
        {value.toLocaleString("pt-PT")}
      </p>
    </Card>
  )
}
