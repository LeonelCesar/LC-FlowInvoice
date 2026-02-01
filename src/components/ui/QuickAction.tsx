import { Button } from "../../components/ui/Button";
import { Plus, UserPlus } from 'lucide-react'

/**
 * Botões de ação rápida
 * Ações mais comuns do dashboard
 */
export function QuickActions() {
  return (
    <div className="flex gap-4">
      <Button className="gap-2">
        <UserPlus size={18} />
        Novo Cliente
      </Button>

      <Button variant="secondary" className="gap-2">
        <Plus size={18} />
        Nova Fatura
      </Button>
    </div>
  )
}
