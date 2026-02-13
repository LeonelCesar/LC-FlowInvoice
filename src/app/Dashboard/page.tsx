"use client";

import { QuickActionBtn } from "../../components/ui/QuickActionBtn";
/* import { TableCard } from "../../components/TableCard"; */

/* import { clientsMock } from "../../mocks/clients.mock";
import { invoicesMock } from "../../mocks/invoices.mock";
import { Star } from "lucide-react"; */
import { MetricCard } from "../../components/MetricCard";
import { Container } from "@/components/Container/Container";
import Table from "../Dashboard/Table";

export default function Dashboard() {
  return (
    <Container>
      <section className="py-6">
        <MetricCard />
        {/* <QuickActionBtn /> */}
        <Table />
      </section>
    </Container>
  );
}
