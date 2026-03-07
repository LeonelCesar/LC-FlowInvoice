import { ReactNode } from "react"

type Props = {
  title: string
  children: ReactNode
}

export function DetailsSection({ title, children }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
        {title}
      </h2>
      <div className="bg-gray-50 rounded-xl p-6">{children}</div>
    </section>
  )
}