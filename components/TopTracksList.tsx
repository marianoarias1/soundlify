"use client"
import { useSpotifyPlayer } from "@/components/SpotifyPlayerProvider"

type Track = {
    id: string
    name: string
    uri: string
    external_urls?: {
        spotify?: string
    }
    album: {
        images?: {
            url: string
        }[]
    }
    artists: {
        name: string
    }[]
}

type Props = {
    tracks: Track[]
}

export function TopTracksList({ tracks }: Props) {
    const { playTrack, isPremium, isReady, deviceId } = useSpotifyPlayer()

    console.log({ isPremium, isReady, deviceId })
    return (
        <section>
            <h2 className="mb-4 text-2xl font-bold">
                Top Tracks
            </h2>

            <div className="space-y-3">
                {tracks.map((track, index) => (
                    <button
                        key={track.id}
                        type="button"
                        onClick={() =>
                            playTrack({
                                uri: track.uri,
                                externalUrl: track.external_urls?.spotify,
                            })
                        }
                        className="group flex w-full items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-left transition duration-300 hover:border-zinc-700 hover:bg-zinc-800"
                    >
                        <span className="w-6 text-zinc-500">{index + 1}</span>

                        <img
                            src={track.album.images?.[0]?.url}
                            alt={track.name}
                            className="h-16 w-16 rounded-xl object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div className="min-w-0 flex-1">
                            <h3 className="truncate font-semibold">{track.name}</h3>

                            <p className="truncate text-sm text-zinc-400">
                                {track.artists.map((artist) => artist.name).join(", ")}
                            </p>
                        </div>

                        <span className="shrink-0 rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                            {isPremium && isReady ? "Play" : "Open"}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    )
}