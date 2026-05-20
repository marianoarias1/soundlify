import Link from "next/link"

const ranges = [
  { label: "Últimas 4 semanas", value: "short_term" },
  { label: "Últimos 6 meses", value: "medium_term" },
  { label: "Todo el tiempo", value: "long_term" },
]

type Props = {
  activeRange: string
}

export function TimeRangeSelector({ activeRange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {ranges.map((range) => {
        const isActive = activeRange === range.value

        return (
          <Link
            key={range.value}
            href={`/dashboard?range=${range.value}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-green-500 text-black"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            {range.label}
          </Link>
        )
      })}
    </div>
  )
}