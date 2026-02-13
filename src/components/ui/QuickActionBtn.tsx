import { Button } from "./Button";
import { Plus, UserPlus } from "lucide-react";
import { Container } from "../Container/Container";

export function QuickActionBtn() {
  return (
    <Container>
      <div className="flex w-full gap-4 mt-4">
        <Button className="gap-2">
          <UserPlus size={18} />
          Novo Cliente
        </Button>

        <Button variant="secondary" className=" gap-2">
          <Plus size={18} />
          Nova Fatura
        </Button>
      </div>
    </Container>
  );
}
