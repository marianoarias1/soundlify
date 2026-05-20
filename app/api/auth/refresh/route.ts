import { NextRequest, NextResponse } from "next/server"

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax" as const,
}

export async function GET(req: NextRequest) {
    const refreshToken = req.cookies.get("spotify_refresh_token")?.value

    if (!refreshToken) {
        return NextResponse.json(
            { error: "No refresh token found" },
            { status: 401 }
        )
    }

    const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
    })

    const basicAuth = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64")

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
    })

    const data = await response.json()

    if (!response.ok || !data.access_token) {
        const res = NextResponse.json(data, { status: 401 })

        res.cookies.delete("spotify_access_token")
        res.cookies.delete("spotify_refresh_token")

        return res
    }

    const res = NextResponse.json({
        ok: true,
        access_token: data.access_token,
        expires_in: data.expires_in,
    })

    res.cookies.set("spotify_access_token", data.access_token, {
        ...COOKIE_OPTIONS,
        maxAge: data.expires_in,
    })

    if (data.refresh_token) {
        res.cookies.set("spotify_refresh_token", data.refresh_token, {
            ...COOKIE_OPTIONS,
            maxAge: 60 * 60 * 24 * 30,
        })
    }

    return res

    return res
}