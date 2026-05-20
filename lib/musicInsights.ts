type Artist = {
  genres?: string[]
  popularity?: number
}

type Insight = {
  title: string
  description: string
  emoji: string
}

export function getMusicInsights(artists: Artist[]): Insight[] {
  const genres = artists.flatMap((artist) => artist.genres || [])

  const text = genres.join(" ").toLowerCase()

  const insights: Insight[] = []

  const hasIndie =
    text.includes("indie") || text.includes("alternative")

  const hasPop =
    text.includes("pop") || text.includes("dance")

  const hasRock =
    text.includes("rock") || text.includes("metal")

  const hasLatin =
    text.includes("latin") ||
    text.includes("reggaeton") ||
    text.includes("trap")

  const hasChill =
    text.includes("jazz") ||
    text.includes("lo-fi") ||
    text.includes("acoustic") ||
    text.includes("soul")

  const averagePopularity =
    artists.reduce(
      (total, artist) => total + (artist.popularity || 0),
      0
    ) / artists.length

  if (hasIndie) {
    insights.push({
      emoji: "🧭",
      title: "Explorador musical",
      description:
        "Tu perfil muestra una fuerte presencia de sonidos alternativos e indie.",
    })
  }

  if (hasPop && averagePopularity > 75) {
    insights.push({
      emoji: "🔥",
      title: "Mainstream energy",
      description:
        "Tus artistas favoritos dominan rankings y tendencias globales.",
    })
  }

  if (hasRock) {
    insights.push({
      emoji: "⚡",
      title: "Alta intensidad",
      description:
        "Tu música tiene bastante energía, guitarras fuertes y presencia potente.",
    })
  }

  if (hasLatin) {
    insights.push({
      emoji: "🪩",
      title: "Mood fiestero",
      description:
        "Tus géneros principales tienen mucha influencia latina y urbana.",
    })
  }

  if (hasChill) {
    insights.push({
      emoji: "🌙",
      title: "Vibes relajadas",
      description:
        "Tus artistas transmiten una energía tranquila y atmosférica.",
    })
  }

  if (averagePopularity < 55) {
    insights.push({
      emoji: "💎",
      title: "Taste oculto",
      description:
        "Escuchás artistas menos masivos y más fuera del circuito mainstream.",
    })
  }

  return insights.slice(0, 3)
}