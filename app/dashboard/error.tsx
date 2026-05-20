"use client"

export default function DashboardError() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-center">
        <p className="mb-3 text-4xl">🎧</p>

        <h1 className="text-2xl font-bold">
          No pudimos cargar tu dashboard
        </h1>

        <p className="mt-3 text-sm text-zinc-400">
          Puede que tu sesión haya expirado o que Spotify no haya respondido correctamente.
        </p>

        <a
          href="/api/auth/login"
          className="mt-6 inline-flex rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
        >
          Volver a conectar Spotify
        </a>
      </div>
    </main>
  )
}