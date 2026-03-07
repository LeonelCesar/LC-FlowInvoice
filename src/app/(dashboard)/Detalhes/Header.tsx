"use client"

import { ReactNode } from "react"

type Props = {
  title: string
  subtitle?: string
  actions?: ReactNode
}

export function DetailsHeader({ title, subtitle, actions }: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      {actions}
    </div>
  )
}