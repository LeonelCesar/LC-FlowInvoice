"use client";

import React, { useState, useEffect, ReactNode, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

/* -----------------------------
   Types
------------------------------*/

type Period = "hoje" | "semana" | "mes";

type ChartData = {
  name: string;
  v: number;
};

type DataSets = Record<Period, ChartData[]>;

type CardWrapperProps = {
  title: string;
  value: string;
  loading: boolean;
  children: ReactNode;
};

/* -----------------------------
   Dados simulados
------------------------------*/

const dataSets: DataSets = {
  hoje: [
    { name: "08h", v: 100 },
    { name: "12h", v: 300 },
    { name: "16h", v: 200 },
    { name: "20h", v: 500 },
  ],
  semana: [
    { name: "Seg", v: 400 },
    { name: "Ter", v: 700 },
    { name: "Qua", v: 500 },
    { name: "Qui", v: 900 },
    { name: "Sex", v: 600 },
  ],
  mes: [
    { name: "Sem 1", v: 2000 },
    { name: "Sem 2", v: 4500 },
    { name: "Sem 3", v: 3800 },
    { name: "Sem 4", v: 5200 },
  ],
};

const periods: Period[] = ["hoje", "semana", "mes"];

/* -----------------------------
   Card Component
------------------------------*/

const CardWrapper: React.FC<CardWrapperProps> = ({
  title,
  value,
  loading,
  children,
}) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-400 text-xs uppercase tracking-wider font-semibold">
            {title}
          </h3>

          <p className="text-3xl font-black text-gray-800">
            {loading ? "..." : value}
          </p>
        </div>

        <div className="bg-blue-50 text-blue-600 p-2 rounded-lg text-xs font-bold">
          +12%
        </div>
      </div>

      <div className="h-40 w-full mt-4">
        {loading ? (
          <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl" />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

/* -----------------------------
   Main Component
------------------------------*/

const InteractiveDashboard: React.FC = () => {
  const [periodo, setPeriodo] = useState<Period>("semana");
  const [loading, setLoading] = useState<boolean>(true);

  /* Simulação de loading */

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [periodo]);

  /* Memo para evitar recomputação */

  const chartData = useMemo(() => {
    return dataSets[periodo];
  }, [periodo]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl font-bold text-slate-800">Analytics Pro</h1>

          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  periodo === p
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Receita */}

          <CardWrapper title="Receita" value="R$ 45.210" loading={loading}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="name" hide />

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#colorBlue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardWrapper>

          {/* Atividade */}

          <CardWrapper title="Atividade" value="892h" loading={loading}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" hide />

                <Tooltip cursor={{ fill: "transparent" }} />

                <Bar
                  dataKey="v"
                  fill="#f59e0b"
                  radius={[6, 6, 6, 6]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardWrapper>

          {/* Conversão */}

          <CardWrapper title="Conversão" value="4.8%" loading={loading}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" hide />

                <Tooltip />

                <Line
                  type="stepAfter"
                  dataKey="v"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardWrapper>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDashboard;
