import {
  Briefcase,
  Building2,
  Camera,
  Car,
  Coffee,
  Dumbbell,
  Flower2,
  Gem,
  GraduationCap,
  Hammer,
  Hotel,
  PawPrint,
  Pill,
  Scale,
  Scissors,
  ShoppingBag,
  Stethoscope,
  Utensils,
  Wrench,
  House,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

type Sector = { icon: LucideIcon; label: string };

const rowA: Sector[] = [
  { icon: Coffee, label: "Kafe & Restoran" },
  { icon: Scissors, label: "Kuaför & Berber" },
  { icon: Stethoscope, label: "Klinik & Diş" },
  { icon: Dumbbell, label: "Spor Salonu" },
  { icon: Utensils, label: "Pastane" },
  { icon: Hotel, label: "Otel & Pansiyon" },
  { icon: Gem, label: "Kuyumcu" },
  { icon: Car, label: "Oto Servis" },
  { icon: Flower2, label: "Çiçekçi" },
  { icon: Camera, label: "Fotoğraf Stüdyosu" },
];

const rowB: Sector[] = [
  { icon: Scale, label: "Hukuk Bürosu" },
  { icon: House, label: "Emlak" },
  { icon: GraduationCap, label: "Kurs & Eğitim" },
  { icon: PawPrint, label: "Veteriner" },
  { icon: ShoppingBag, label: "Butik Mağaza" },
  { icon: Pill, label: "Eczane" },
  { icon: Wrench, label: "Tesisat & Tamir" },
  { icon: Hammer, label: "Mobilya Atölyesi" },
  { icon: Briefcase, label: "Muhasebe" },
  { icon: Building2, label: "İnşaat" },
];

function SectorPill({ icon: Icon, label }: Sector) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-full border border-line bg-elev py-2 pr-5 pl-2 transition hover:border-orange-400/40 hover:shadow-[0_0_24px_-8px_rgba(251,146,60,0.6)]">
      <span className="grid size-8 place-items-center rounded-full bg-orange-400/10 text-orange-600 dark:text-orange-300">
        <Icon className="size-4" />
      </span>
      <span className="text-sm font-medium whitespace-nowrap">{label}</span>
    </div>
  );
}

function MarqueeRow({ items, duration, reverse }: { items: Sector[]; duration: number; reverse?: boolean }) {
  // İçerik 4 kez kopyalanır; iki özdeş yarı -50% kaydırılarak kesintisiz döngü sağlanır.
  const copies = [0, 1, 2, 3];
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className={`flex w-max animate-marquee gap-3 pr-3 will-change-transform group-hover:[animation-play-state:paused] ${reverse ? "[animation-direction:reverse]" : ""}`}
        style={{ "--duration": `${duration}s` } as React.CSSProperties}
      >
        {copies.map((c) =>
          items.map((s) => <SectorPill key={`${c}-${s.label}`} {...s} />),
        )}
      </div>
    </div>
  );
}

export function SectorMarquee() {
  return (
    <section id="sektorler" className="border-b border-line py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Sektörler"
          title="Her sektöre özel tasarım."
          description="Hazır şablon değil; işinizin diline ve müşterinizin beklentisine göre kurgulanmış siteler."
        />
      </div>
      <div className="mt-14 flex flex-col gap-4">
        <MarqueeRow items={rowA} duration={28} />
        <MarqueeRow items={rowB} duration={32} reverse />
      </div>
    </section>
  );
}
