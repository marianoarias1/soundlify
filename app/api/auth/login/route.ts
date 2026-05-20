import { NextResponse } from "next/server"

const scopes = [
  "user-read-email",
  "user-read-private",
  "user-top-read",
  "streaming",
  "user-read-playback-state",
  "user-modify-playback-state",
]

export async function GET() {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    scope: scopes.join(" "),
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    show_dialog: "true",
  })

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${params.toString()}`

  return NextResponse.redirect(spotifyAuthUrl)
}