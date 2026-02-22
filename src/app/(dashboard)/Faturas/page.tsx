import { Container } from "../../../components/Container/Container";
import { CardGraficoGrid } from "../Faturas/CardGraficoGrid";
import InvoicesTable from "../Faturas/InvoicesTable";

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
