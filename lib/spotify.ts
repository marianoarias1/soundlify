import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type RefreshResponse = {
    ok: boolean
    access_token: string
    expires_in: number
}

async function refreshSpotifyToken() {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:3000"

    const cookieStore = await cookies()
    const cookieHeader = cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ")

    const response = await fetch(`${appUrl}/api/auth/refresh`, {
        method: "GET",
        headers: {
            Cookie: cookieHeader,
        },
        cache: "no-store",
    })

    if (!response.ok) {
        throw new Error("Failed to refresh Spotify token")
    }

    return response.json() as Promise<RefreshResponse>
}

export async function getSpotifyData(endpoint: string) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("spotify_access_token")?.value

    if (!accessToken) {
        redirect("/api/auth/login")
    }

    async function requestSpotify(token: string) {
        return fetch(`https://api.spotify.com/v1/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        })
    }

    let response = await requestSpotify(accessToken)

    if (response.status === 401) {
        const refreshed = await refreshSpotifyToken()

        response = await requestSpotify(refreshed.access_token)
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => null)

        if (process.env.NODE_ENV !== "production") {
            console.warn("Spotify API warning:", {
                endpoint,
                status: response.status,
                errorData,
            })
        }

        throw new Error("Failed to fetch Spotify data")
    }

    return response.json()
}