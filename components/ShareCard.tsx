type Props = {
    topArtistName?: string
    topArtistImage?: string
    topTrackName?: string
    vibeTitle?: string
    vibeEmoji?: string
    genres?: string[],
    genreStats?: {
        name: string
        percentage: number
    }[]
    timeRangeLabel?: string
    generatedDate?: string
    variant?: "wrapped" | "artist" | "track" | "vibe"
    title?: string
    topTrackArtistName?: string
    topTrackImage?: string
    topTrackArtistImage?: string
    vibeImages?: string[]
}

const vibeThemes: Record<
    string,
    {
        accent: string
        glow: string
        gradient: string
        bar: string
    }
> = {
    Explorador: {
        accent: "text-cyan-300",
        glow: "bg-cyan-400/25",
        gradient: "from-black via-emerald-950/80 to-cyan-950/60",
        bar: "bg-cyan-300",
    },
    "Hit Lover": {
        accent: "text-green-300",
        glow: "bg-green-400/30",
        gradient: "from-black via-green-950/80 to-yellow-950/50",
        bar: "bg-green-400",
    },
    Fiestero: {
        accent: "text-fuchsia-300",
        glow: "bg-fuchsia-400/25",
        gradient: "from-black via-fuchsia-950/70 to-orange-950/50",
        bar: "bg-fuchsia-300",
    },
    Chill: {
        accent: "text-indigo-300",
        glow: "bg-indigo-400/25",
        gradient: "from-black via-indigo-950/70 to-blue-950/50",
        bar: "bg-indigo-300",
    },
    "Todo Terreno": {
        accent: "text-emerald-300",
        glow: "bg-emerald-400/25",
        gradient: "from-black via-zinc-950/80 to-emerald-950/60",
        bar: "bg-emerald-400",
    },
}

function getVibeTheme(vibeTitle?: string) {
    return vibeThemes[vibeTitle || ""] || vibeThemes["Todo Terreno"]
}

export function ShareCard({
    topArtistName,
    topArtistImage,
    topTrackName,
    vibeTitle,
    vibeEmoji,
    genres = [],
    genreStats = [],
    timeRangeLabel,
    generatedDate,
    variant = "wrapped",
    title = "My music snapshot",
    topTrackArtistName,
    topTrackImage,
    vibeImages = [],
    topTrackArtistImage,
}: Props) {
    const theme = getVibeTheme(vibeTitle)

    if (variant === "artist") {
        return (
            <div className="relative h-[640px] w-[360px] overflow-hidden rounded-[2rem] bg-black p-6 text-white">
                {topArtistImage && (
                    <img
                        crossOrigin="anonymous"
                        src={topArtistImage}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

                <div
                    className={`absolute -right-16 top-20 h-72 w-72 rounded-full ${theme.glow} blur-3xl`}
                />

                <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                        <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${theme.accent}`}>
                            Soundlify
                        </p>

                        {timeRangeLabel && (
                            <p className="mt-3 w-fit rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-200 backdrop-blur-xl">
                                {timeRangeLabel}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-zinc-300">
                            Your #1 Artist
                        </p>

                        <h1 className="text-6xl font-black leading-[0.9]">
                            {topArtistName}
                        </h1>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {genres.slice(0, 4).map((genre) => (
                                <span
                                    key={genre}
                                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-zinc-200 backdrop-blur-xl"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-zinc-400">
                            Generated {generatedDate}
                        </p>

                        <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm backdrop-blur-xl">
                            {vibeEmoji} {vibeTitle}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if (variant === "track") {
        return (
            <div className="relative h-[640px] w-[360px] overflow-hidden rounded-[2rem] bg-black p-6 text-white">
                {topTrackImage && (
                    <img
                        crossOrigin="anonymous"
                        src={topTrackImage}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-90"
                    />
                )}

                <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradient}`} />

                <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-center justify-between">
                        <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${theme.accent}`}>
                            Soundlify
                        </p>

                        <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs backdrop-blur-xl">
                            Top Track
                        </div>
                    </div>
                    <div className="mb-5 flex items-center gap-3">
                        {topTrackArtistImage && (
                            <img
                                crossOrigin="anonymous"
                                src={topTrackArtistImage}
                                alt={topTrackArtistName}
                                className="
        h-14 w-14 rounded-2xl
        object-cover
        border border-white/10
        shadow-2xl
      "
                            />
                        )}

                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                                Artist
                            </p>

                            <p className="text-sm font-medium text-white">
                                {topTrackArtistName}
                            </p>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
                            <p className="text-sm text-zinc-300">
                                Most played song
                            </p>

                            <h1 className="mt-3 text-5xl font-black leading-none">
                                {topTrackName}
                            </h1>

                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm text-zinc-400">
                                    {topTrackArtistName}
                                </p>

                                <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs">
                                    {vibeTitle}
                                </div>
                            </div>
                        </div>

                        <p className="mt-5 text-xs text-zinc-500">
                            Generated {generatedDate} • Soundlify
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === "vibe") {
        return (
            <div className="relative h-[640px] w-[360px] overflow-hidden rounded-[2rem] bg-black p-6 text-white">
                {vibeImages.length > 0 && (
                    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                        {vibeImages?.slice(0, 4).map((image, index) => (
                            <img
                                key={`${image}-${index}`}
                                crossOrigin="anonymous"
                                src={image}
                                alt=""
                                className="h-full w-full object-cover opacity-70"
                            />
                        ))}
                    </div>
                )}

                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-90`} />

                <div
                    className={`absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full ${theme.glow} blur-3xl opacity-80`}
                />

                <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-center justify-between">
                        <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${theme.accent}`}>
                            Soundlify
                        </p>

                        <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs backdrop-blur-xl">
                            Music Vibe
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                        <div className="text-8xl">
                            {vibeEmoji}
                        </div>

                        <h1 className="mt-6 text-5xl font-black">
                            {vibeTitle}
                        </h1>

                        <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-zinc-300">
                            Your listening habits reveal a strong emotional and stylistic identity.
                        </p>

                        <div className="mt-8 w-full max-w-[260px] space-y-3">
                            {genreStats.slice(0, 3).map((genre) => (
                                <div key={genre.name}>
                                    <div className="mb-1 flex items-center justify-between text-xs text-zinc-300">
                                        <span>{genre.name}</span>
                                        <span>{genre.percentage}%</span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                        <div
                                            className={`h-full rounded-full ${theme.bar}`}
                                            style={{ width: `${genre.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-center text-xs text-zinc-500">
                        Generated {generatedDate}
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="relative h-[640px] w-[360px] overflow-hidden rounded-[2rem] bg-black p-6 text-white">
            {topArtistImage && (
                <img
                    crossOrigin="anonymous"
                    src={topArtistImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-90"
                />
            )}

            <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient}`} />

            <div
                className={`absolute -right-20 -top-20 h-72 w-72 rounded-full ${theme.glow} blur-3xl`}
            />

            <div
                className={`absolute -left-24 bottom-20 h-56 w-56 rounded-full ${theme.glow} blur-3xl opacity-60`}
            />

            <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                    <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${theme.accent}`}>
                        Soundlify
                    </p>
                    {timeRangeLabel && (
                        <p className="mt-3 w-fit rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-200 backdrop-blur-xl">
                            {timeRangeLabel}
                        </p>
                    )}
                    <h2 className="mt-4 text-4xl font-black leading-none">
                        {title}
                    </h2>
                </div>

                <div className="space-y-5">
                    <div>
                        <p className="mb-1 text-sm text-zinc-400">Top Artist</p>
                        <h3 className="text-4xl font-black leading-none">
                            {topArtistName}
                        </h3>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                        <p className="text-sm text-zinc-300">Top Track</p>
                        <p className="mt-1 text-xl font-bold">
                            {topTrackName}
                        </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                        <p className="text-sm text-zinc-300">Vibe</p>
                        <p className="mt-1 text-2xl font-black">
                            {vibeEmoji} {vibeTitle}
                        </p>
                    </div>

                    {genreStats.length > 0 && (
                        <div className="space-y-2">
                            {genreStats.slice(0, 3).map((genre) => (
                                <div key={genre.name}>
                                    <div className="mb-1 flex items-center justify-between text-xs text-zinc-300">
                                        <span className="capitalize">{genre.name}</span>
                                        <span>{genre.percentage}%</span>
                                    </div>

                                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                                        <div
                                            className={`h-full rounded-full ${theme.bar}`}
                                            style={{ width: `${genre.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <p className="text-xs text-zinc-500">
                    Generated {generatedDate || "with Soundlify"} • Soundlify
                </p>
            </div>
        </div>
    )
}