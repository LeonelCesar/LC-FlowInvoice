"use client";

import { useEffect, useMemo, useState } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Container } from "./Container/Container";

/*  Hook: anima valor (pulse) */

function usePulseCurrency(value: string) {
  const baseValue = useMemo(() => {
    return Number(value.replace(/[^0-9.-]+/g, ""));
  }, [value]);

  const [animated, setAnimated] = useState(baseValue);

  useEffect(() => {
    const peak = baseValue * 1.05;
    const duration = 1200;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const value =
        progress <= 0.5
          ? baseValue + (peak - baseValue) * (eased * 2)
          : peak - (peak - baseValue) * ((eased - 0.5) * 2);

      setAnimated(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimated(baseValue);
      }
    }

    requestAnimationFrame(animate);
  }, [baseValue]);

  return animated.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

/* StartCard (GRID REAL) */

export const MetricCard = () => {
  const sparklineData = [
    { value: 100 },
    { value: 120 },
    { value: 90 },
    { value: 140 },
    { value: 130 },
    { value: 150 },
    { value: 160 },
  ];

  return (
    <Container>
      <section className="px-1 py-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            title="Gross Revenue"
            value="$120,054.24"
            pillText="2.75%"
            trend="up"
            period="From Jan 1st - Jul 31st"
            sparklineData={sparklineData}
          />
          <Card
            title="Avg Order"
            value="$34,067.12"
            pillText="0.10%"
            trend="down"
            period="From Dec 3rd - Feb 12th"
            sparklineData={sparklineData}
          />
          <Card
            title="Trailing Year"
            value="$456,456.34"
            pillText="74.95%"
            trend="up"
            period="Previous 365 days"
            sparklineData={sparklineData}
          />
        </div>
      </section>
    </Container>
  );
};

/* Card (CARD DE VERDADE) */

const Card = ({
  title,
  value,
  pillText,
  trend,
  period,
  sparklineData,
}: {
  title: string;
  value: string;
  pillText: string;
  trend: "up" | "down";
  period: string;
  sparklineData: { value: number }[];
}) => {
  const animatedValue = usePulseCurrency(value);

  return (
    <div className="bg-white rounded-2xl border p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-slate-500 mb-1">{title}</h3>

          {/* Valor (azul marinho → azul céu) */}
          <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-sky-500">
            {animatedValue}
          </p>
        </div>

        {/* Badge */}
        <span
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
            trend === "up"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
          {pillText}
        </span>
      </div>

      {/* Sparkline */}
      <div className="w-full h-14 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparklineData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0ea5e9" // azul céu
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Periodo */}
      <p
        className="text-sm text-slate-500 cursor-help"
        data-tooltip-content={`This shows the trend for ${period}`}
      >
        {period}
      </p>

      <ReactTooltip />
    </div>
  );
};
