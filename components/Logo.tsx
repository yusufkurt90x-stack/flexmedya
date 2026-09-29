import { site } from "@/lib/site";

// 4 pikselden oluşan gradyan ikon
export function LogoMark({ className = "size-6" }: { className?: string }) {
  return (
    <span className={`grid grid-cols-2 gap-[3px] ${className}`} aria-hidden>
      <span className="rounded-[3px] bg-orange-400" />
      <span className="rounded-[3px] bg-rose-400" />
      <span className="rounded-[3px] bg-rose-400/70" />
      <span className="rounded-[3px] bg-fuchsia-400" />
    </span>
  );
}

export function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5" aria-label={`${site.name} ana sayfa`}>
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-tight">{site.name}</span>
    </a>
  );
}
