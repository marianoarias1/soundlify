type ListenerProfile = {
  title: string
  description: string
  emoji: string
}

const profiles: Record<string, ListenerProfile> = {
  energetic: {
    title: "Energético",
    description: "Tu música suele tener potencia, guitarras, intensidad o mucho ritmo.",
    emoji: "⚡",
  },
  hitLover: {
    title: "Hit Lover",
    description: "Tenés una fuerte conexión con canciones populares, pop, dance y sonidos actuales.",
    emoji: "🔥",
  },
  explorer: {
    title: "Explorador",
    description: "Te gusta moverte por sonidos alternativos, indie o menos obvios.",
    emoji: "🧭",
  },
  party: {
    title: "Fiestero",
    description: "Tu música tiene mucha presencia latina, urbana o ritmos para levantar el mood.",
    emoji: "🪩",
  },
  chill: {
    title: "Chill",
    description: "Tu perfil va más por sonidos relajados, acústicos, soul, jazz o vibes tranquilas.",
    emoji: "🌙",
  },
  balanced: {
    title: "Todo Terreno",
    description: "Escuchás un poco de todo, sin casarte demasiado con un solo estilo.",
    emoji: "🌎",
  },
}

export function getListenerProfile(genres: string[]): ListenerProfile {
  const text = genres.join(" ").toLowerCase()

  const scores = {
    energetic: countMatches(text, ["rock", "metal", "punk", "hardcore", "grunge"]),
    hitLover: countMatches(text, ["pop", "dance", "edm", "house", "electropop"]),
    explorer: countMatches(text, ["indie", "alternative", "experimental", "shoegaze"]),
    party: countMatches(text, ["reggaeton", "latin", "trap", "urbano", "cumbia", "salsa"]),
    chill: countMatches(text, ["jazz", "soul", "acoustic", "lo-fi", "r&b", "chill"]),
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const [topProfile, topScore] = sorted[0]

  if (topScore === 0) {
    return profiles.balanced
  }

  return profiles[topProfile]
}

function countMatches(text: string, keywords: string[]) {
  return keywords.reduce((total, keyword) => {
    return text.includes(keyword) ? total + 1 : total
  }, 0)
}