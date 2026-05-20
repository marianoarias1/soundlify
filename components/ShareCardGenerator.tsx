"use client"

import { useRef, useState } from "react"
import { domToPng } from "modern-screenshot"
import { ShareCard } from "@/components/ShareCard"

type GenreStat = {
    name: string
    percentage: number
}

type Props = {
    topArtistName?: string
    topArtistImage?: string
    topTrackName?: string
    vibeTitle?: string
    vibeEmoji?: string
    genres?: string[]
    genreStats?: GenreStat[]
    timeRangeLabel?: string
    generatedDate?: string
    topTrackArtistName?: string
    topTrackImage?: string
    topTrackArtistImage?: string
    vibeImages?: string[]
}

const variants = [
    {
        id: "wrapped",
        label: "Snapshot",
        title: "My music snapshot",
    },
    {
        id: "artist",
        label: "Artist",
        title: "My top artist",
    },
    {
        id: "track",
        label: "Track",
        title: "My top track",
    },
    {
        id: "vibe",
        label: "Vibe",
        title: "My music vibe",
    },
] as const

type VariantId = (typeof variants)[number]["id"]

function waitForImages(element: HTMLElement) {
    const images = Array.from(element.querySelectorAll("img"))

    return Promise.all(
        images.map((img) => {
            if (img.complete) return Promise.resolve()

            return new Promise<void>((resolve) => {
                img.onload = () => resolve()
                img.onerror = () => resolve()
            })
        })
    )
}

export function ShareCardGenerator(props: Props) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isGenerating, setIsGenerating] = useState(false)

    const activeVariant = variants[activeIndex]

    function goNext() {
        setActiveIndex((current) =>
            current === variants.length - 1 ? 0 : current + 1
        )
    }

    function goPrev() {
        setActiveIndex((current) =>
            current === 0 ? variants.length - 1 : current - 1
        )
    }

    async function handleDownload() {
        if (!cardRef.current) return

        try {
            setIsGenerating(true)

            await waitForImages(cardRef.current)

            const dataUrl = await domToPng(cardRef.current, {
                width: 360,
                height: 640,
                scale: 2,
                backgroundColor: "transparent",
            })

            const link = document.createElement("a")
            link.download = `soundlify-${activeVariant.id}.png`
            link.href = dataUrl
            link.click()
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <section className="mt-12">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Soundlify</h2>
                    <p className="max-w-sm text-sm text-zinc-400">
                        Generate a shareable snapshot from your music profile.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className="w-full rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                >
                    {isGenerating ? "Generating..." : "Download PNG"}
                </button>
            </div>

            <div
                className="
          relative
          overflow-hidden
          bg-zinc-950
          py-8

          md:rounded-3xl
          md:border
          md:border-zinc-800
          md:px-8
          md:py-10
        "
            >
                <div className="mb-6 flex justify-center gap-2">
                    {variants.map((variant, index) => (
                        <button
                            key={variant.id}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={`rounded-full px-4 py-2 text-xs font-medium transition ${index === activeIndex
                                ? "bg-green-500 text-black"
                                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                }`}
                        >
                            {variant.label}
                        </button>
                    ))}
                </div>

                <div className="relative mx-auto h-[600px] w-full max-w-[980px] overflow-hidden md:h-[640px] ">
                    {variants.map((variant, index) => {
                        const offset = index - activeIndex

                        const isActive = offset === 0
                        const isPrev = offset === -1 || offset === variants.length - 1
                        const isNext = offset === 1 || offset === -(variants.length - 1)

                        if (!isActive && !isPrev && !isNext) return null

                        const translateClass = isActive
                            ? "-translate-x-1/2 scale-100 opacity-100 z-30"
                            : isPrev
                                ? "hidden md:block -translate-x-[120%] scale-[0.82] opacity-45 z-10"
                                : "hidden md:block translate-x-[20%] scale-[0.82] opacity-45 z-10"
                        return (
                            <div
                                key={variant.id}
                                className={`
  absolute left-1/2 top-0
  origin-top
  transition-all duration-500 ease-out
  ${translateClass}
`}
                            >
                                <div className="scale-[0.82] md:scale-100">
                                    <div
                                        ref={isActive ? cardRef : null}
                                        className="flex h-[640px] w-[360px] shrink-0"
                                    >
                                        <ShareCard
                                            {...props}
                                            variant={variant.id as VariantId}
                                            title={variant.title}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="relative z-40 mt-4 flex items-center justify-center gap-3 md:mt-6">
                    <button
                        type="button"
                        onClick={goPrev}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl transition hover:bg-white/10"
                    >
                        ←
                    </button>

                    <button
                        type="button"
                        onClick={goNext}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl transition hover:bg-white/10"
                    >
                        →
                    </button>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 md:hidden">
                    {variants.map((variant, index) => (
                        <button
                            key={variant.id}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={`h-2 rounded-full transition-all ${index === activeIndex
                                    ? "w-6 bg-green-400"
                                    : "w-2 bg-zinc-700"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}