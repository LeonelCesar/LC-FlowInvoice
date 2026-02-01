import { Card } from "../components/Card";
import { CardContent } from "../components/CardContent";

/**
 * Card de métrica numérica
 * Usado para valores importantes do negócio
 */
type MetricCardProps = {
  title: string
  value: string
  highlight?: boolean
}

export function MetricCard({ title, value, highlight }: MetricCardProps) {
  return (
    <Card
      className={`rounded-2xl shadow-sm ${
        highlight ? 'border-primary' : ''
      }`}
    >
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h2 className="text-2xl font-semibold mt-2">{value}</h2>
      </CardContent>
    </Card>
  )
}
