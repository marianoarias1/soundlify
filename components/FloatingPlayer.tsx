"use client"

import { useSpotifyPlayer } from "@/components/SpotifyPlayerProvider"

function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export function FloatingPlayer() {
    const {
        currentTrack,
        isPlayerOpen,
        isPaused,
        positionMs,
        durationMs,
        togglePlay,
        closePlayer,
    } = useSpotifyPlayer()
    if (!isPlayerOpen || !currentTrack) return null

    const progress = durationMs
        ? Math.min((positionMs / durationMs) * 100, 100)
        : 0

    return (
        <div
            className="
    fixed
    bottom-4
    left-1/2
    z-50
    w-[calc(100%-24px)]
    max-w-[340px]
    -translate-x-1/2
    overflow-hidden
    rounded-3xl
    border border-zinc-800
    bg-zinc-950/90
    p-4
    text-white
    shadow-2xl
    backdrop-blur-xl

    md:bottom-5
    md:left-auto
    md:right-5
    md:translate-x-0
  "
        >
            <div className="flex items-center gap-4">
                {currentTrack.imageUrl && (
                    <img
                        src={currentTrack.imageUrl}
                        alt={currentTrack.name}
                        className="absolute inset-0 h-full w-full object-cover opacity-25"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/2 to-black/1" />
                <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold">
                        {currentTrack.name}
                    </h3>

                    <p className="truncate text-sm text-zinc-400">
                        {currentTrack.artistName}
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                    <div
                        className="h-full rounded-full bg-green-500 transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-between text-xs text-zinc-500">
                    <span>{formatTime(positionMs)}</span>
                    <span>{formatTime(durationMs)}</span>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={closePlayer}
                    className="
    absolute right-2 top-2
    flex h-8 w-8 items-center justify-center
    rounded-full
    border border-white/10
    bg-black/30
    text-sm text-zinc-300
    backdrop-blur-xl
    transition duration-300
    hover:bg-black/50
    hover:text-white
    cursor-pointer
  "
                >
                    ✕
                </button>
                <button
                    type="button"
                    onClick={togglePlay}
                    className="
    group
    relative
    flex h-14 w-14 items-center justify-center
    rounded-full
    transition-all duration-300
    hover:scale-105
    active:scale-95
  "
                >
                    {/* glow externo */}
                    <div
                        className="
      absolute inset-0
      rounded-full
      bg-green-400/20
      blur-xl
      opacity-70
      transition duration-300
      group-hover:opacity-100
    "
                    />

                    {/* borde glass */}
                    <div
                        className="
      absolute inset-0
      rounded-full
      border border-white/20
      bg-white/[0.04]
      backdrop-blur-2xl
      shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]
    "
                    />

                    {/* borde verde sutil */}
                    <div
                        className="
      absolute inset-0
      rounded-full
      bg-[radial-gradient(circle,transparent_58%,rgba(34,197,94,0.45)_100%)]
      opacity-90
    "
                    />

                    {/* reflejo */}
                    <div
                        className="
      absolute
      left-[18%]
      top-[12%]
      h-[28%]
      w-[40%]
      rounded-full
      bg-white/20
      blur-md
    "
                    />

                    {/* icon */}
                    <span className="relative z-10 text-lg text-white">

                        {isPaused ? "▶" : "❚❚"}
                    </span>
                </button>

            </div>
        </div>
    )
}