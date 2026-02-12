"use client";

import { Card } from "../components/Card";
import { CardContent } from "../components/CardContent";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type MetricCardProps = {
  title: string;
  value: number;
  previousValue?: number; // para calcular trend
  highlight?: boolean;
};

export function MetricCard({
  title,
  value,
  previousValue,
  highlight,
}: MetricCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  // Count-up animation
  useEffect(() => {
    let start = 0;
    const duration = 800; // ms
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(counter);
      }
      setAnimatedValue(Math.round(start));
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  // Trend logic
  const trend =
    previousValue !== undefined
      ? value > previousValue
        ? "up"
        : value < previousValue
          ? "down"
          : "neutral"
      : "neutral";

  const trendColor =
    trend === "up"
      ? "text-green-500"
      : trend === "down"
        ? "text-red-500"
        : "text-gray-400";
  const trendSymbol = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";

  return (
    <Card
      className={`rounded-2xl shadow-sm transition-transform hover:scale-[1.02] duration-300 ${
        highlight ? "border-primary" : ""
      }`}
    >
      <CardContent className="p-6">
        <p className="text-xl text-gray-500">{title}</p>

        <div className="flex items-baseline space-x-2 mt-2">
          <motion.h2
            animate={{
              scale: [1.1, 1],
              y: [2, 0],
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-2xl font-bold mt-2 text-gray-500"
          >
            {animatedValue.toLocaleString("pt-PT", {
              style: "currency",
              currency: "EUR",
            })}
          </motion.h2>

          {trend !== "neutral" && (
            <AnimatePresence>
              <motion.span
                key={trendSymbol}
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`font-bold ${trendColor}`}
              >
                {trendSymbol}
              </motion.span>
            </AnimatePresence>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
