import { Button } from "./Button";
import { Plus, UserPlus } from "lucide-react";

export function QuickActionBtn() {
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
  );
}
