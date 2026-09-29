import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/Header";
import { LogoMark } from "@/components/Logo";
import { requireAdmin } from "@/lib/auth";
import { site } from "@/lib/site";
import { logout } from "../actions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-50 border-b border-line bg-bg/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/admin" className="flex min-w-0 items-center gap-2.5">
            <LogoMark />
            <span className="truncate text-[15px] font-semibold tracking-tight">{site.name}</span>
            <span className="rounded-full border border-orange-400/30 bg-orange-400/10 px-2 py-0.5 text-[11px] font-medium text-orange-600 dark:text-orange-300">
              Yönetim
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <a
              href="/"
              target="_blank"
              className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-3 text-sm text-muted transition hover:border-line-strong hover:text-fg"
              aria-label="Siteyi gör"
            >
              <ExternalLink className="size-4" />
              <span className="hidden sm:inline">Siteyi gör</span>
            </a>
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex h-9 items-center gap-2 rounded-full bg-fg px-3 text-sm font-medium text-bg transition hover:opacity-90"
                aria-label="Çıkış yap"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Çıkış</span>
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">{children}</main>
    </div>
  );
}
