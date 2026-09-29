"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#nasil-calisir", label: "Nasıl Çalışır" },
  { href: "#sektorler", label: "Sektörler" },
  { href: "#neden-biz", label: "Neden Biz" },
  { href: "#fiyatlandirma", label: "Fiyatlandırma" },
];

const noop = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Açık temaya geç" : "Koyu temaya geç"}
      className="grid size-9 place-items-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-fg"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export function Header({ showProjects = false }: { showProjects?: boolean }) {
  const items = showProjects ? [{ href: "#projeler", label: "Projeler" }, ...links] : links;
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {items.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted transition hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#iletisim"
            className="rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition hover:opacity-90"
          >
            İletişime Geç
          </a>
        </div>
      </div>
    </header>
  );
}
