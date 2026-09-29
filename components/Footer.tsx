import { Logo } from "./Logo";
import { site, whatsappUrl } from "@/lib/site";

const links = [
  { href: "#", label: "Gizlilik Politikası" },
  { href: "#", label: "KVKK Aydınlatma Metni" },
  { href: "#", label: "Çerez Politikası" },
  { href: `mailto:${site.email}`, label: "İletişim" },
  { href: whatsappUrl(), label: "WhatsApp" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6">
        <Logo />
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-subtle transition hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-subtle">
          © {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
