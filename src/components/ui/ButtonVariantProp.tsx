// src/components/ui/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/cn"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost"
  children: ReactNode
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition",
        variant === "primary" &&
          "bg-gray-900 text-white hover:bg-gray-800",
        variant === "ghost" &&
          "border border-gray-200 text-gray-700 hover:bg-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
