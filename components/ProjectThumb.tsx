/* eslint-disable @next/next/no-img-element -- yüklenen görseller /api/uploads üzerinden geliyor */
import { hostname, imageUrl } from "@/lib/project-url";

// Görsel yoksa alan adının baş harfiyle gradyan bir yer tutucu gösterir.
export function ProjectThumb({
  image,
  url,
  title,
  className = "",
}: {
  image: string | null;
  url: string;
  title: string;
  className?: string;
}) {
  if (image) {
    return (
      <img
        src={imageUrl(image)}
        alt={`${title} ekran görüntüsü`}
        loading="lazy"
        className={`size-full object-cover object-top ${className}`}
      />
    );
  }
  return (
    <div
      className={`relative grid size-full place-items-center overflow-hidden bg-gradient-to-br from-orange-400/25 via-rose-400/20 to-fuchsia-500/25 ${className}`}
    >
      <div className="pixel-grid absolute inset-0 [mask-image:none]" />
      <span className="text-gradient relative text-5xl font-bold tracking-tighter uppercase">
        {hostname(url).charAt(0)}
      </span>
    </div>
  );
}
