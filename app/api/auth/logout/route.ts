import { NextResponse } from "next/server"

export async function GET() {
  const res = NextResponse.redirect(
    process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:3000"
  )

  res.cookies.delete("spotify_access_token")
  res.cookies.delete("spotify_refresh_token")

  return res
}