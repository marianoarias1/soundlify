import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

type NormalizedTrack = {
  id: string
  name: string
  artistName?: string
  imageUrl?: string
  externalUrl?: string
  source: "spotify" | "lastfm"
}

async function getSpotifyTopTracks(artistId: string, token?: string) {
  if (!token) return []

  const spotifyRes = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  if (!spotifyRes.ok) {
    const errorData = await spotifyRes.json().catch(() => null)

    console.warn("Spotify artist top tracks failed:", {
      status: spotifyRes.status,
      errorData,
    })

    return []
  }

  const data = await spotifyRes.json()

  return (data.tracks || []).slice(0, 5).map((track: any) => ({
    id: track.id,
    name: track.name,
    artistName: track.artists?.map((artist: any) => artist.name).join(", "),
    imageUrl: track.album?.images?.[0]?.url,
    externalUrl: track.external_urls?.spotify,
    source: "spotify",
  })) as NormalizedTrack[]
}

async function getLastFmArtistInfo(artistName: string) {
  const params = new URLSearchParams({
    method: "artist.getinfo",
    artist: artistName,
    api_key: process.env.LASTFM_API_KEY!,
    format: "json",
    autocorrect: "1",
  })

  const res = await fetch(
    `https://ws.audioscrobbler.com/2.0/?${params.toString()}`,
    {
      next: { revalidate: 60 * 60 * 24 },
    }
  )

  if (!res.ok) return null

  const data = await res.json()

  return data.artist || null
}

async function getLastFmTopTracks(artistName: string) {
  const params = new URLSearchParams({
    method: "artist.gettoptracks",
    artist: artistName,
    api_key: process.env.LASTFM_API_KEY!,
    format: "json",
    autocorrect: "1",
    limit: "5",
  })

  const res = await fetch(
    `https://ws.audioscrobbler.com/2.0/?${params.toString()}`,
    {
      next: { revalidate: 60 * 60 * 24 },
    }
  )

  if (!res.ok) return []

  const data = await res.json()
  const tracks = data.toptracks?.track || []

  return tracks.slice(0, 5).map((track: any) => ({
    id: track.mbid || `${artistName}-${track.name}`,
    name: track.name,
    artistName: track.artist?.name || artistName,
    imageUrl: track.image?.find((img: any) => img.size === "large")?.["#text"],
    externalUrl: track.url,
    source: "lastfm",
  })) as NormalizedTrack[]
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get("spotify_access_token")?.value

  const artistId = req.nextUrl.searchParams.get("id")
  const artistName = req.nextUrl.searchParams.get("name")

  if (!artistId || !artistName) {
    return NextResponse.json({ error: "Missing artist data" }, { status: 400 })
  }

  const [lastFmInfo, spotifyTopTracks] = await Promise.all([
    getLastFmArtistInfo(artistName),
    getSpotifyTopTracks(artistId, token),
  ])

  const lastFmTopTracks =
    spotifyTopTracks.length > 0
      ? []
      : await getLastFmTopTracks(artistName)

  const topTracks =
    spotifyTopTracks.length > 0
      ? spotifyTopTracks
      : lastFmTopTracks

  return NextResponse.json({
    topTracks,
    bio: lastFmInfo?.bio?.summary || null,
    tags:
      lastFmInfo?.tags?.tag
        ?.map((tag: any) => tag.name)
        .slice(0, 5) || [],
    url: lastFmInfo?.url || null,
  })
}