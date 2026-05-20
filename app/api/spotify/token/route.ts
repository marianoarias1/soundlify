import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get("spotify_access_token")?.value

  if (!token) {
    return NextResponse.json(
      { error: "No Spotify access token found" },
      { status: 401 }
    )
  }

  return NextResponse.json({
    access_token: token,
  })
}