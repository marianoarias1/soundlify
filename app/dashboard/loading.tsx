export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-10 flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-zinc-800" />

          <div>
            <div className="mb-2 h-8 w-48 rounded bg-zinc-800" />
            <div className="h-4 w-32 rounded bg-zinc-900" />
          </div>
        </div>

        <div className="mb-8 flex gap-3">
          <div className="h-10 w-36 rounded-full bg-zinc-900" />
          <div className="h-10 w-36 rounded-full bg-zinc-900" />
          <div className="h-10 w-36 rounded-full bg-zinc-900" />
        </div>

        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[180px] rounded-2xl bg-zinc-900"
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl bg-zinc-900 p-4"
            >
              <div className="mb-3 aspect-square rounded-lg bg-zinc-800" />
              <div className="mb-2 h-4 rounded bg-zinc-800" />
              <div className="h-3 w-2/3 rounded bg-zinc-900" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}