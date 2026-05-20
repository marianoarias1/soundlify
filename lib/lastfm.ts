type SpotifyArtist = {
  id: string
  name: string
  genres?: string[]
}

type LastFmTag = {
  name: string
  count: number
}

type ArtistWithGenres = SpotifyArtist & {
  genres: string[]
}

const blockedTags = new Set([
  "seen live",
  "favorites",
  "favourite",
  "favorite",
  "my favorite",
  "spotify",
])

function normalizeTag(tag: string) {
  return tag.trim().toLowerCase()
}

export async function enrichArtistsWithLastFmGenres(
  artists: SpotifyArtist[]
): Promise<ArtistWithGenres[]> {
  const apiKey = process.env.LASTFM_API_KEY

  if (!apiKey) {
    return artists.map((artist) => ({
      ...artist,
      genres: artist.genres || [],
    }))
  }

  const enrichedArtists = await Promise.all(
    artists.map(async (artist) => {
      const currentGenres = artist.genres || []

      if (currentGenres.length > 0) {
        return {
          ...artist,
          genres: currentGenres,
        }
      }

      const params = new URLSearchParams({
        method: "artist.gettoptags",
        artist: artist.name,
        api_key: apiKey,
        format: "json",
        autocorrect: "1",
      })

      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?${params.toString()}`,
        {
          cache: "force-cache",
          next: {
            revalidate: 60 * 60 * 24,
          },
        }
      )

      if (!response.ok) {
        return {
          ...artist,
          genres: [],
        }
      }

      const data = await response.json()

      const tags = ((data.toptags?.tag || []) as LastFmTag[])
        .map((tag) => normalizeTag(tag.name))
        .filter((tag) => tag && !blockedTags.has(tag))
        .slice(0, 5)

      return {
        ...artist,
        genres: tags,
      }
    })
  )

  return enrichedArtists
}