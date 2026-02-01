import { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
