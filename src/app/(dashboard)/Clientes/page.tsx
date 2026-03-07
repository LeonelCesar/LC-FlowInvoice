import { MetricCard } from "../../../components/MetricCard";

import { Container } from "../../../components/Container/Container";
import ClienteTable from "./ClienteTable";

console.log('Leonel Helder');

export default function Dashboard() {

  return (
    <Container>
      <section className="py-6">
        <MetricCard />
        <ClienteTable />
      </section>
    </Container>
  );
}
