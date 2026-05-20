type Profile = {
  emoji: string
  title: string
  description: string
}

type ArtistImage = {
  id: string
  name: string
  images?: {
    url: string
  }[]
}

type Props = {
  profile: Profile
  artists: ArtistImage[]
}

const imageClassName =
  "h-full w-full object-cover opacity-30 transition duration-700 group-hover:scale-110 group-hover:opacity-110"

export function ProfileImageCard({ profile, artists }: Props) {
  const visibleArtists = artists.slice(0, 4)

  function renderGrid() {
    if (visibleArtists.length === 1) {
      return (
        <img
          src={visibleArtists[0].images?.[0]?.url}
          alt={visibleArtists[0].name}
          className={imageClassName}
        />
      )
    }

    if (visibleArtists.length === 2) {
      return (
        <div className="grid h-full grid-cols-2">
          {visibleArtists.map((artist) => (
            <img
              key={artist.id}
              src={artist.images?.[0]?.url}
              alt={artist.name}
              className={imageClassName}
            />
          ))}
        </div>
      )
    }

    if (visibleArtists.length === 3) {
      return (
        <div className="grid h-full grid-cols-2 grid-rows-2">
          <img
            src={visibleArtists[0].images?.[0]?.url}
            alt={visibleArtists[0].name}
            className={`row-span-2 ${imageClassName}`}
          />

          <img
            src={visibleArtists[1].images?.[0]?.url}
            alt={visibleArtists[1].name}
            className={imageClassName}
          />

          <img
            src={visibleArtists[2].images?.[0]?.url}
            alt={visibleArtists[2].name}
            className={imageClassName}
          />
        </div>
      )
    }

    return (
      <div className="grid h-full grid-cols-2 grid-rows-2">
        {visibleArtists.map((artist) => (
          <img
            key={artist.id}
            src={artist.images?.[0]?.url}
            alt={artist.name}
            className={imageClassName}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="group relative min-h-[180px] overflow-hidden rounded-2xl bg-zinc-900 p-5 transition duration-300 hover:-translate-y-1 hover:bg-zinc-800">
      <div className="absolute inset-0">
        {renderGrid()}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30 transition duration-500 group-hover:via-black/60 group-hover:to-black/10" />

      <div className="relative z-10 flex h-full flex-col justify-end">
        <p className="mb-2 text-sm text-zinc-300">
          Perfil del oyente
        </p>

        <h2 className="text-3xl font-bold">
          {profile.emoji} {profile.title}
        </h2>

        <p className="mt-2 text-sm text-zinc-300">
          {profile.description}
        </p>
      </div>
    </div>
  )
}