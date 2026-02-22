// components/dashboard/MetricCard.tsx
"use client";

import { memo, useMemo } from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { Sparkline } from "./SparkLine";

export type Trend = "up" | "down";

interface MetricCardProps {
  title: string;
  value: number;
  percentage: number;
  trend: Trend;
  period: string;
  data: number[];
}

export const CardGraficos = memo(function MetricCard({
  title,
  value,
  percentage,
  trend,
  period,
  data,
}: MetricCardProps) {
  const animated = useAnimatedNumber(value);

  const formatted = useMemo(() => {
    return animated.toLocaleString("pt-PT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    });
  }, [animated]);

  const isUp = trend === "up";

  return (
    <article className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <header className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-slate-500">{title}</h3>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {formatted}
          </p>
        </div>

        <span
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
            isUp
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {isUp ? <FiTrendingUp size={16} /> : <FiTrendingDown size={16} />}
          {percentage}%
        </span>
      </header>

      {/* Sparkline */}
      <div className="mt-6">
        <Sparkline data={data} color={isUp ? "#10b981" : "#ef4444"} />
      </div>

      {/* Footer */}
      <footer className="mt-4 text-xs text-slate-400">{period}</footer>
    </article>
  );
});
