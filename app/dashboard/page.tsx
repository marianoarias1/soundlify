import { getSpotifyData } from "@/lib/spotify"
import { getListenerProfile } from "@/lib/listenerProfile"
import { TimeRangeSelector } from "@/components/TimeRangeSelector"
import { StatImageCard } from "@/components/StatImageCard"
import { ProfileImageCard } from "@/components/ProfileImageCard"
import { MotionFadeIn } from "@/components/MotionFadeIn"
import { getMusicInsights } from "@/lib/musicInsights"
import { getTopGenres } from "@/lib/genre"
import { TopGenresChart } from "@/components/TopGenresChart"
import { enrichArtistsWithLastFmGenres } from "@/lib/lastfm"
import { TopArtistsGrid } from "@/components/TopArtistsGrid"
import { TopTracksList } from "@/components/TopTracksList"
import { SpotifyPlayerProvider } from "@/components/SpotifyPlayerProvider"
import { FloatingPlayer } from "@/components/FloatingPlayer"
import { ShareCardGenerator } from "@/components/ShareCardGenerator"

const validRanges = ["short_term", "medium_term", "long_term"] as const

type TimeRange = (typeof validRanges)[number]

type DashboardPageProps = {
    searchParams: Promise<{
        range?: string
    }>
}

function getValidRange(range?: string): TimeRange {
    if (validRanges.includes(range as TimeRange)) {
        return range as TimeRange
    }

    return "long_term"
}

export default async function DashboardPage({
    searchParams,
}: DashboardPageProps) {
    const params = await searchParams
    const timeRange = getValidRange(params.range)

    const profile = await getSpotifyData("me")
    const isPremium = profile.product === "premium"
    const topArtists = await getSpotifyData(
        `me/top/artists?limit=10&time_range=${timeRange}`
    )

    const topTracks = await getSpotifyData(
        `me/top/tracks?limit=10&time_range=${timeRange}`
    )




    const artistsForInsights = await enrichArtistsWithLastFmGenres(topArtists.items)
    const allGenres = artistsForInsights.flatMap(
        (artist: any) => artist.genres || []
    )

    const listenerProfile = getListenerProfile(allGenres)
    const musicInsights = getMusicInsights(artistsForInsights)
    const topGenres = getTopGenres(artistsForInsights)
    const topArtist = topArtists.items[0]
    const topTrack = topTracks.items[0]
    const profileArtistImages = topArtists.items
        .filter((artist: any) => artist.images?.[0]?.url)
        .slice(0, 4)
    const insightsGridClassName =
        musicInsights.length === 1
            ? "grid grid-cols-1 gap-4"
            : musicInsights.length === 2
                ? "grid grid-cols-1 gap-4 md:grid-cols-2"
                : musicInsights.length === 3
                    ? "grid grid-cols-1 gap-4 md:grid-cols-3"
                    : "grid grid-cols-1 gap-4 md:grid-cols-2"

    const timeRangeLabel = {
        short_term: "Last 4 weeks",
        medium_term: "Last 6 months",
        long_term: "All time",
    }[timeRange]

    const generatedDate = new Intl.DateTimeFormat("en", {
        month: "long",
        year: "numeric",
    }).format(new Date())
    const topTrackArtistId = topTrack?.artists?.[0]?.id

    const topTrackArtist = artistsForInsights.find(
        (artist: any) => artist.id === topTrackArtistId
    )

    const topTrackArtistImage = topTrackArtist?.images?.[0]?.url

    return (
        <main className="min-h-screen bg-black text-white p-8">
            <SpotifyPlayerProvider isPremium={isPremium}>
                <FloatingPlayer />
                <div className="max-w-6xl mx-auto">
                    <MotionFadeIn>
                        <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="flex min-w-0 items-center gap-4">
                                {profile.images?.[0]?.url && (
                                    <img
                                        src={profile.images[0].url}
                                        alt={profile.display_name}
                                        className="h-16 w-16 shrink-0 rounded-full object-cover md:h-20 md:w-20"
                                    />
                                )}

                                <div className="min-w-0">
                                    <h1 className="truncate text-3xl font-bold md:text-4xl">
                                        {profile.display_name}
                                    </h1>

                                    <p className="text-sm text-zinc-400 md:text-base">
                                        Spotify Dashboard
                                    </p>
                                </div>
                            </div>

                            <a
                                href="/api/auth/logout"
                                className="w-fit rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                            >
                                Cerrar sesión
                            </a>
                        </header>
                    </MotionFadeIn>

                    <MotionFadeIn>

                        <TimeRangeSelector activeRange={timeRange} />
                    </MotionFadeIn>

                    <MotionFadeIn>

                        <section className="grid md:grid-cols-3 gap-4 mb-12">
                            <StatImageCard
                                label="Top Artist"
                                title={topArtist?.name}
                                imageUrl={topArtist?.images?.[0]?.url}
                                imageAlt={topArtist?.name}
                            />

                            <StatImageCard
                                label="Top Track"
                                title={topTrack?.name}
                                subtitle={topTrack?.artists
                                    ?.map((artist: any) => artist.name)
                                    .join(", ")}
                                imageUrl={topTrack?.album?.images?.[0]?.url}
                                imageAlt={topTrack?.name}
                            />

                            <ProfileImageCard
                                profile={listenerProfile}
                                artists={profileArtistImages}
                            />
                        </section>
                    </MotionFadeIn>
                    <MotionFadeIn>
                        <section className="mb-12">
                            <h2 className="mb-4 text-2xl font-bold">
                                Your Music Vibe
                            </h2>

                            <div className={insightsGridClassName}>
                                {musicInsights.map((insight) => (
                                    <div
                                        key={insight.title}
                                        className="relative min-h-[160px] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
                                    >
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1db95422,transparent_40%)]" />

                                        <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-3xl">
                                                {insight.emoji}
                                            </div>

                                            <div>
                                                <h3 className="mb-2 text-xl font-bold">
                                                    {insight.title}
                                                </h3>

                                                <p className="text-sm leading-relaxed text-zinc-400">
                                                    {insight.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </MotionFadeIn>
                    <MotionFadeIn>
                        <TopGenresChart genres={topGenres} />
                    </MotionFadeIn>
                    <MotionFadeIn>
                        <TopArtistsGrid artists={topArtists.items} artistsForInsights={artistsForInsights} />
                    </MotionFadeIn>

                    <MotionFadeIn>
                        <TopTracksList tracks={topTracks.items} />
                    </MotionFadeIn>

                    <MotionFadeIn>
                        <ShareCardGenerator
                            topArtistName={topArtist?.name}
                            topArtistImage={topArtist?.images?.[0]?.url}
                            topTrackName={topTrack?.name}
                            vibeTitle={listenerProfile.title}
                            vibeEmoji={listenerProfile.emoji}
                            genres={topGenres.map((genre) => genre.name)}
                            genreStats={topGenres}
                            timeRangeLabel={timeRangeLabel}
                            generatedDate={generatedDate}
                            topTrackArtistName={topTrack?.artists?.[0]?.name}
                            topTrackArtistImage={topTrackArtistImage}
                            topTrackImage={topTrack?.album?.images?.[0]?.url}
                            vibeImages={profileArtistImages
                                .map((artist: any) => artist.images?.[0]?.url)
                                .filter(Boolean)}
                        />
                    </MotionFadeIn>
                </div>
            </SpotifyPlayerProvider>

        </main>
    )
}