type Artist = {
  genres?: string[]
}

export function getTopGenres(artists: Artist[], limit = 6) {
  const counter = new Map<string, number>()

  artists.forEach((artist) => {
    artist.genres?.forEach((genre) => {
      counter.set(genre, (counter.get(genre) || 0) + 1)
    })
  })

  const total = Array.from(counter.values()).reduce(
    (sum, value) => sum + value,
    0
  )

  return Array.from(counter.entries())
    .map(([name, count]) => ({
      name,
      count,
      percentage: total ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}