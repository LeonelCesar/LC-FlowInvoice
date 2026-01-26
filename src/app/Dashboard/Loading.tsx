export default function Loading() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />
      ))}
    </div>
  )
}
