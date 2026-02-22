"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center px-2 py-3 text-lg font-medium focus:outline-none cursor-pointer rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "px-4 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700", // Nova Fatura, Novo Cliente
    secondary:
      "rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100", // Login
    danger:
      "rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-200", // Register
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "A processar..." : children}
    </button>
  );
};
