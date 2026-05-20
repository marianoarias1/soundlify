"use client"

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react"

type CurrentTrack = {
    name: string
    imageUrl?: string
    artistName?: string
    durationMs?: number
    positionMs?: number
}
type SpotifyPlayerContextValue = {
    isReady: boolean
    isPremium: boolean
    deviceId: string | null
    currentTrack: CurrentTrack | null
    isPaused: boolean
    positionMs: number
    durationMs: number
    closePlayer: () => Promise<void>
    isPlayerOpen: boolean
    playTrack: (track: {
        uri: string
        externalUrl?: string
    }) => Promise<void>
    togglePlay: () => Promise<void>
    nextTrack: () => Promise<void>
    previousTrack: () => Promise<void>
}

const SpotifyPlayerContext = createContext<SpotifyPlayerContextValue | null>(null)

declare global {
    interface Window {
        Spotify?: any
        onSpotifyWebPlaybackSDKReady?: () => void
    }
}

export function SpotifyPlayerProvider({
    children,
    isPremium,
}: {
    children: ReactNode
    isPremium: boolean
}) {
    const playerRef = useRef<any>(null)
    const [deviceId, setDeviceId] = useState<string | null>(null)
    const [isReady, setIsReady] = useState(false)

    const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null)
    const [isPaused, setIsPaused] = useState(true)
    const [positionMs, setPositionMs] = useState(0)
    const [durationMs, setDurationMs] = useState(0)
    const [isPlayerOpen, setIsPlayerOpen] = useState(false)

    useEffect(() => {
        if (!isPremium) return
        if (window.Spotify) {
            initializePlayer()
            return
        }

        const script = document.createElement("script")
        script.src = "https://sdk.scdn.co/spotify-player.js"
        script.async = true
        document.body.appendChild(script)

        window.onSpotifyWebPlaybackSDKReady = initializePlayer

        function initializePlayer() {
            if (!window.Spotify || playerRef.current) return

            const player = new window.Spotify.Player({
                name: "Spotify Dashboard Player",
                getOAuthToken: async (cb: (token: string) => void) => {
                    const response = await fetch("/api/spotify/token")
                    const data = await response.json()

                    cb(data.access_token)
                },
                volume: 0.6,
            })

            player.addListener("ready", ({ device_id }: { device_id: string }) => {
                setDeviceId(device_id)
                setIsReady(true)
            })

            player.addListener("not_ready", () => {
                setIsReady(false)
            })

            player.addListener("initialization_error", ({ message }: { message: string }) => {
                console.error("Spotify SDK initialization error:", message)
                setIsReady(false)
            })

            player.addListener("authentication_error", ({ message }: { message: string }) => {
                console.error("Spotify SDK authentication error:", message)
                setIsReady(false)
            })

            player.addListener("account_error", ({ message }: { message: string }) => {
                console.error("Spotify SDK account error:", message)
                setIsReady(false)
            })

            player.addListener("playback_error", ({ message }: { message: string }) => {
                console.error("Spotify SDK playback error:", message)
            })

            player.addListener("player_state_changed", (state: any) => {
                if (!state) return

                const track = state.track_window.current_track

                setCurrentTrack({
                    name: track.name,
                    artistName: track.artists?.map((artist: any) => artist.name).join(", "),
                    imageUrl: track.album?.images?.[0]?.url,
                    durationMs: state.duration,
                    positionMs: state.position,
                })

                setIsPaused(state.paused)
                setPositionMs(state.position)
                setDurationMs(state.duration)
            })

            player.connect()
            playerRef.current = player
        }

        return () => {
            playerRef.current?.disconnect()
            playerRef.current = null
        }
    }, [isPremium])

    useEffect(() => {
        if (isPaused || !currentTrack || !durationMs) return

        const interval = window.setInterval(() => {
            setPositionMs((currentPosition) => {
                const nextPosition = currentPosition + 1000

                if (nextPosition >= durationMs) {
                    return durationMs
                }

                return nextPosition
            })
        }, 1000)

        return () => window.clearInterval(interval)
    }, [isPaused, currentTrack, durationMs])

    async function playTrack(track: { uri: string; externalUrl?: string }) {
        if (!isPremium || !deviceId || !isReady) {
            if (track.externalUrl) window.open(track.externalUrl, "_blank", "noreferrer")
            return
        }

        try {
            // Abrimos el player ANTES de pedir reproducción
            setIsPlayerOpen(true)

            const response = await fetch("/api/spotify/play", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uri: track.uri,
                    deviceId,
                }),
            })

            if (!response.ok) {
                throw new Error("Playback failed")
            }
        } catch {
            setIsPlayerOpen(false)

            if (track.externalUrl) {
                window.open(track.externalUrl, "_blank", "noreferrer")
            }
        }
    }

    return (
        <SpotifyPlayerContext.Provider
            value={{
                isReady,
                isPremium,
                deviceId,
                currentTrack,
                isPaused,
                positionMs,
                durationMs,
                playTrack,
                isPlayerOpen,
                togglePlay: async () => {
                    await playerRef.current?.togglePlay()
                },
                nextTrack: async () => {
                    await playerRef.current?.nextTrack()
                },
                previousTrack: async () => {
                    await playerRef.current?.previousTrack()
                },
                closePlayer: async () => {
                    await playerRef.current?.pause()

                    setCurrentTrack(null)
                    setIsPaused(true)
                    setPositionMs(0)
                    setDurationMs(0)
                    setIsPlayerOpen(false)
                },
            }}
        >
            {children}
        </SpotifyPlayerContext.Provider>
    )
}

export function useSpotifyPlayer() {
    const context = useContext(SpotifyPlayerContext)

    if (!context) {
        throw new Error("useSpotifyPlayer must be used inside SpotifyPlayerProvider")
    }

    return context
}