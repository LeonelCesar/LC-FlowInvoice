import React, { ReactNode } from "react";

type CardProps = { 
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl ${className}`}
    >
      {children}
    </div>
  );
}
