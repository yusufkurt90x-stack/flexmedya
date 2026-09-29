"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { whatsappUrl } from "@/lib/site";

type Plan = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Temel",
    price: "₺990",
    period: "/ay",
    description: "İnternette profesyonel bir vitrin isteyen işletmeler için.",
    features: ["Tek sayfalık modern site", "Mobil uyumlu tasarım", "Alan adı + SSL", "WhatsApp butonu", "Aylık bakım"],
    cta: "Başlayalım",
    href: whatsappUrl("Merhaba, Temel paket hakkında bilgi almak istiyorum."),
  },
  {
    name: "Profesyonel",
    price: "₺1.990",
    period: "/ay",
    description: "Müşteri kazanmak ve Google'da öne çıkmak isteyenler için.",
    features: [
      "5 sayfaya kadar site",
      "Google İşletme Profili kurulumu",
      "Teknik SEO & hız optimizasyonu",
      "Online randevu / rezervasyon",
      "Aylık ziyaretçi raporu",
      "Öncelikli destek",
    ],
    cta: "Ücretsiz Örnek İste",
    href: whatsappUrl("Merhaba, Profesyonel paket için ücretsiz örnek istiyorum."),
    featured: true,
  },
  {
    name: "Özel Proje",
    price: "Teklif",
    description: "E-ticaret, çok dilli site ya da özel entegrasyon ihtiyaçları için.",
    features: ["Sınırsız sayfa", "E-ticaret altyapısı", "Çok dilli içerik", "Özel entegrasyonlar", "Proje yöneticisi"],
    cta: "WhatsApp'tan Konuşalım",
    href: whatsappUrl("Merhaba, özel bir proje için görüşmek istiyorum."),
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const body = (
    <div className={`flex h-full flex-col rounded-2xl p-8 ${plan.featured ? "bg-elev" : "border border-line bg-card transition hover:border-line-strong"}`}>
      <h3 className="text-lg font-semibold">{plan.name}</h3>
      <p className="mt-2 text-sm text-muted">{plan.description}</p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-5xl font-bold tracking-tighter">{plan.price}</span>
        {plan.period && <span className="text-sm text-subtle">{plan.period}</span>}
      </div>
      <ul className="mt-8 mb-10 flex flex-col gap-3 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Check className="mt-0.5 size-4 shrink-0 text-orange-600 dark:text-orange-400" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={plan.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto block rounded-full px-5 py-3 text-center text-sm font-semibold transition ${
          plan.featured
            ? "bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400 text-zinc-950 shadow-[0_0_40px_-12px_rgba(251,146,60,0.8)] hover:brightness-110"
            : "bg-fg text-bg hover:opacity-90"
        }`}
      >
        {plan.cta}
      </a>
    </div>
  );

  if (!plan.featured) return <motion.div variants={fadeUp}>{body}</motion.div>;

  return (
    <motion.div variants={fadeUp} className="relative md:-translate-y-4 md:scale-105">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-orange-400 via-rose-400 to-fuchsia-400 opacity-70 blur-lg" />
      <div className="relative h-full rounded-2xl bg-gradient-to-br from-orange-400 via-rose-400 to-fuchsia-400 p-px">
        {body}
      </div>
      <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-orange-400 to-fuchsia-400 px-3 py-1 text-xs font-semibold text-zinc-950">
        En çok tercih edilen
      </span>
    </motion.div>
  );
}

export function Pricing() {
  return (
    <section id="fiyatlandirma" className="border-b border-line py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Fiyatlandırma"
          title="Şeffaf fiyatlar, sürpriz yok."
          description="Kurulum ücreti yok. İstediğiniz zaman iptal edebilirsiniz."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-16 grid items-stretch gap-6 md:grid-cols-3"
        >
          {plans.map((p) => (
            <PlanCard key={p.name} plan={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
