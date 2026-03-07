"use client";

import { Container } from "@/components/Container/Container";
import { CardGraficos } from "./CardGraficos";

export function CardGraficoGrid() {
  return (
    <Container>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <CardGraficos
          title="Receita Bruta"
          value={120054.24}
          percentage={12.75}
          trend="up"
          period="Jan – Jul 2024"
          data={[100, 120, 90, 140, 130, 150, 160]}
        />

        <CardGraficos
          title="Trimestre Atual"
          value={34067.12}
          percentage={0.4}
          trend="down"
          period="Últimos 90 dias"
          data={[150, 140, 135, 130, 120, 110, 100]}
        />

        <CardGraficos
          title="Faturação Anual"
          value={456456.34}
          percentage={74.95}
          trend="up"
          period="Últimos 365 dias"
          data={[200, 240, 260, 280, 300, 340, 380]}
        />
      </section>
    </Container>
  );
}
