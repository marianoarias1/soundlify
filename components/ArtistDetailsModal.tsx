"use client"

import { useEffect, useState } from "react"

type Artist = {
    id: string
    name: string
    images?: { url: string }[]
    genres?: string[]
}

type Track = {
    id: string
    name: string
    artistName?: string
    imageUrl?: string
    externalUrl?: string
    source: "spotify" | "lastfm"
}

type ArtistDetails = {
    bio: string | null
    tags: string[]
    topTracks: Track[]
    url: string | null
}

type Props = {
    artist: Artist | null
    onClose: () => void
}

function cleanBio(html: string | null) {
    if (!html) return null

    return html
        .replace(/<a\b[^>]*>(.*?)<\/a>/gi, "$1")
        .replace(/<[^>]+>/g, "")
}

export function ArtistDetailsModal({ artist, onClose }: Props) {
    const [details, setDetails] = useState<ArtistDetails | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!artist) return

        const selectedArtist = artist

        async function getDetails() {
            
            setLoading(true)
            setDetails(null)

            const params = new URLSearchParams({
                id: selectedArtist.id,
                name: selectedArtist.name,
            })

            const response = await fetch(`/api/artist/details?${params.toString()}`)
            const data = await response.json()

            setDetails(data)
            setLoading(false)
        }
        getDetails()
    }, [artist])

    if (!artist) return null

    const imageUrl = artist.images?.[0]?.url
    const bio = cleanBio(details?.bio || null)
    const tags = details?.tags?.length ? details.tags : artist.genres || []

    return (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-xl md:items-center md:p-4">
            <div
                className="
    relative
    h-[92vh]
    w-full
    overflow-hidden
    rounded-t-[2rem]
    border border-white/10
    bg-zinc-950
    text-white
    shadow-2xl

    md:h-auto
    md:max-h-[90vh]
    md:max-w-3xl
    md:rounded-[2rem]
  "
            >
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={artist.name}
                        className="absolute inset-0 h-full w-full object-cover opacity-20"
                    />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/50" />

                <div className="custom-scrollbar relative z-10 h-full overflow-y-auto p-5 pb-28 md:overflow-hidden md:p-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-zinc-300 backdrop-blur-xl transition hover:bg-black/60 hover:text-white"
                    >
                        ✕
                    </button>

                    <div className="flex flex-col gap-6 md:flex-row md:items-end">
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt={artist.name}
                                className="h-36 w-36 rounded-3xl object-cover shadow-2xl"
                            />
                        )}

                        <div>
                            <p className="mb-2 text-sm text-zinc-400">Artist details</p>
                            <h2 className="text-4xl font-black md:text-5xl">
                                {artist.name}
                            </h2>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {tags.slice(0, 5).map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-6 md:grid md:grid-cols-[1.2fr_0.8fr]">
                        <section className="min-h-0 overflow-hidden">
                            <h3 className="mb-3 text-xl font-bold">Bio</h3>

                            {loading ? (
                                <div className="space-y-3 animate-pulse">
                                    <div className="h-4 rounded bg-zinc-800" />
                                    <div className="h-4 w-5/6 rounded bg-zinc-800" />
                                    <div className="h-4 w-2/3 rounded bg-zinc-800" />
                                </div>
                            ) : (
                                <p className="text-sm leading-relaxed text-zinc-300">
                                    {bio || "No encontramos una descripción disponible para este artista."}
                                </p>
                            )}
                        </section>

                        <section>
                            <h3 className="mb-3 text-xl font-bold">Popular tracks</h3>

                            {loading ? (
                                <div className="space-y-3 animate-pulse">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <div key={index} className="h-12 rounded-xl bg-zinc-800" />
                                    ))}
                                </div>
                            ) : details?.topTracks?.length ? (
                                <div className="max-h-[280px] space-y-2 overflow-y-auto pr-2">
                                    {details.topTracks.map((track, index) => (
                                        <a
                                            key={track.id}
                                            href={track.externalUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-3 rounded-2xl bg-white/5 p-3 transition hover:bg-white/10"
                                        >
                                            <span className="w-5 text-sm text-zinc-500">
                                                {index + 1}
                                            </span>

                                            {track.imageUrl ? (
                                                <img
                                                    src={track.imageUrl}
                                                    alt={track.name}
                                                    className="h-10 w-10 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-xs text-zinc-500">
                                                    ♪
                                                </div>
                                            )}

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium">
                                                    {track.name}
                                                </p>

                                                <p className="truncate text-xs text-zinc-500">
                                                    {track.artistName}
                                                </p>
                                            </div>

                                            <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-wide text-zinc-500">
                                                {track.source}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-zinc-400">
                                    No pudimos cargar canciones populares desde Spotify.
                                </p>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}