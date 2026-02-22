"use client";

import { memo, useMemo } from "react";

interface SparklineProps {
  data: number[];
  color: string;
}

export const Sparkline = memo(function Sparkline({
  data,
  color,
}: SparklineProps) {
  const path = useMemo(() => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const width = 100;
    const height = 40;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    });

    return `M ${points.join(" L ")}`;
  }, [data]);

  return (
    <svg
      viewBox="0 0 100 40"
      className="h-12 w-full"
      preserveAspectRatio="none"
    >
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
});
