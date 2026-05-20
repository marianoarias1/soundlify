"use client"

type Genre = {
  name: string
  count: number
  percentage: number
}

type Props = {
  genres: Genre[]
}

export function TopGenresChart({ genres }: Props) {
    console.log(genres)
  if (!genres.length) return null

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-bold">
        Genre Distribution
      </h2>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="space-y-5">
          {genres.map((genre) => (
            <div key={genre.name}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <p className="truncate text-sm font-medium text-zinc-200">
                  {genre.name}
                </p>

                <p className="text-sm text-zinc-500">
                  {genre.percentage}%
                </p>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-zinc-900">
                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-700"
                  style={{ width: `${genre.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}