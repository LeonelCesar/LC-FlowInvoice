import { Container } from "../../../components/Container/Container";
import { CardGraficoGrid } from "./CardGraficoGrid";
import InvoicesTable from "./InvoicesTable";

export default function Faturas() {
  return (
    <Container>
      <main className="py-6">
        <CardGraficoGrid />
        <InvoicesTable />
      </main>
    </Container>
  );
}
