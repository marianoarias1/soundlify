"use client"
import { useState } from "react"
import { ArtistDetailsModal } from "./ArtistDetailsModal"

type Artist = {
    id: string
    name: string
    images?: {
        url: string
    }[]
    genres?: string[]

}

type Props = {
    artists: Artist[]
    artistsForInsights: any[]
}

export function TopArtistsGrid({ artists, artistsForInsights }: Props) {
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)
    return (
        <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold">
                Top Artists
            </h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                {artists.map((artist) => {
                    const artistGenre = artistsForInsights.find(
                        (item: any) => item.id === artist.id
                    )?.genres?.[0]
                    return (

                        <button
                            key={artist.id}
                            type="button"
                            onClick={() => setSelectedArtist(artist)}
                            className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 text-left transition duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-800"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={artist.images?.[0]?.url}
                                    alt={artist.name}
                                    className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110"
                                />
                            </div>

                            <div className="p-4">
                                <h3 className="truncate font-semibold">
                                    {artist.name}
                                </h3>

                                <p className="mt-1 truncate text-sm text-zinc-400">
                                    {artistGenre || "Sin género"}
                                </p>
                            </div>
                        </button>
                    )
                })}
            </div>
            <ArtistDetailsModal
                artist={selectedArtist}
                onClose={() => setSelectedArtist(null)}
            />
        </section>
    )
}