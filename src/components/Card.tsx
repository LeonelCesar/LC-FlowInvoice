import React, { ReactNode } from "react";

type CardProps = { 
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-neutral-900 border border-border rounded-2xl ${className}`}
    >
      {children}
    </div>
  );
}
