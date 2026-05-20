import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get("spotify_access_token")?.value

  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 })
  }

  const { uri, deviceId } = await req.json()

  if (!uri || !deviceId) {
    return NextResponse.json(
      { error: "Missing uri or deviceId" },
      { status: 400 }
    )
  }

  const response = await fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: [uri],
      }),
    }
  )

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)

    return NextResponse.json(
      {
        error: "Playback failed",
        status: response.status,
        errorData,
      },
      { status: response.status }
    )
  }

  return NextResponse.json({ ok: true })
}