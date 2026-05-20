import Link from "next/link"
import { MotionFadeIn } from "@/components/MotionFadeIn"

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1db95422,transparent_40%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
            Soundlify
          </div>

          <h1 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
            Tus hábitos musicales,
            <span className="block text-green-500">
              convertidos en visuales.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
            Explorá tus artistas favoritos, canciones más escuchadas y el perfil
            musical que define cómo escuchás Spotify.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/api/auth/login"
              className="rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-green-400"
            >
              Conectar Spotify
            </Link>

            <a
              href="#preview"
              className="rounded-full border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900"
            >
              Ver preview
            </a>
          </div>
        </div>
        <MotionFadeIn delay={0.2}>
          <section
            id="preview"
            className="mt-24 grid gap-4 md:grid-cols-3"
          >
            <div className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 p-6">
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop"
                alt="Artist"
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />

              <div className="relative z-10 flex h-[220px] flex-col justify-end">
                <p className="text-sm text-zinc-300 mb-2">
                  Top Artist
                </p>

                <h2 className="text-3xl font-bold">
                  Arctic Monkeys
                </h2>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 p-6">
              <img
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop"
                alt="Track"
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />

              <div className="relative z-10 flex h-[220px] flex-col justify-end">
                <p className="text-sm text-zinc-300 mb-2">
                  Top Track
                </p>

                <h2 className="text-3xl font-bold">
                  Sweater Weather
                </h2>

                <p className="text-sm text-zinc-300 mt-1">
                  The Neighbourhood
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 p-6">
              <div className="absolute inset-0 grid grid-cols-2">
                <img
                  src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop"
                  alt=""
                  className="h-full w-full object-cover opacity-25"
                />

                <img
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop"
                  alt=""
                  className="h-full w-full object-cover opacity-25"
                />

                <img
                  src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop"
                  alt=""
                  className="h-full w-full object-cover opacity-25"
                />

                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop"
                  alt=""
                  className="h-full w-full object-cover opacity-25"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />

              <div className="relative z-10 flex h-[220px] flex-col justify-end">
                <p className="text-sm text-zinc-300 mb-2">
                  Perfil del oyente
                </p>

                <h2 className="text-3xl font-bold">
                  🌎 Todo Terreno
                </h2>

                <p className="mt-2 text-sm text-zinc-300">
                  Escuchás un poco de todo y cambiás mucho según el momento.
                </p>
              </div>
            </div>
          </section>
        </MotionFadeIn>

      </div>
    </main>
  )
}