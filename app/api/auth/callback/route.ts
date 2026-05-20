import { NextRequest, NextResponse } from "next/server"

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  sameSite: "lax" as const,
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code")

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 })
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
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
    return NextResponse.json(data, { status: 400 })
  }

  const res = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`)

  res.cookies.set("spotify_access_token", data.access_token, {
    ...COOKIE_OPTIONS,
    maxAge: data.expires_in,
  })

  res.cookies.set("spotify_refresh_token", data.refresh_token, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 30,
  })

  return res
}