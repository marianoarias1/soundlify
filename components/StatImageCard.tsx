type Props = {
    label: string
    title?: string
    subtitle?: string
    imageUrl?: string
    imageAlt?: string
}

export function StatImageCard({
    label,
    title,
    subtitle,
    imageUrl,
    imageAlt,
}: Props) {
    return (
        <div className="group relative min-h-[180px] overflow-hidden rounded-2xl bg-zinc-900 p-5 transition duration-300 hover:-translate-y-1 hover:bg-zinc-800">
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={imageAlt || title || label}
                    className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-700 group-hover:scale-110 group-hover:opacity-110"
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

            <div className="relative z-10 flex h-full flex-col justify-end">
                <p className="text-zinc-300 text-sm mb-2">{label}</p>

                <h2 className="text-3xl font-bold">{title}</h2>

                {subtitle && (
                    <p className="text-zinc-300 text-sm mt-1">{subtitle}</p>
                )}
            </div>
        </div>
    )
}