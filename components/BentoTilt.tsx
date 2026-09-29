"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Clock, Search, Smartphone, Zap, type LucideIcon } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const MAX_TILT = 7;
const spring = { stiffness: 150, damping: 20 };

type TiltCardProps = {
  icon: LucideIcon;
  title: string;
  text: string;
  className?: string;
  children?: React.ReactNode;
};

function TiltCard({ icon: Icon, title, text, className = "", children }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, rgba(251,146,60,0.10), transparent 70%)`;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mx.set(x);
    my.set(y);
    if (reduced) return;
    rotateY.set((x / rect.width - 0.5) * 2 * MAX_TILT);
    rotateX.set(-(y / rect.height - 0.5) * 2 * MAX_TILT);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div variants={fadeUp} className={`group relative [perspective:1000px] ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full rounded-2xl border border-line bg-card p-7 transition-colors duration-300 will-change-transform group-hover:border-orange-400/30"
      >
        <motion.div
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div className="relative flex h-full flex-col [transform-style:preserve-3d]">
          <span className="grid size-11 place-items-center rounded-xl border border-line bg-orange-400/10 text-orange-500 [transform:translateZ(40px)] dark:text-orange-300">
            <Icon className="size-5" />
          </span>
          <h3 className="mt-6 text-xl font-semibold tracking-tight [transform:translateZ(30px)]">{title}</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted [transform:translateZ(20px)]">
            {text}
          </p>
          {children && <div className="mt-auto pt-8 [transform:translateZ(25px)]">{children}</div>}
        </div>
      </motion.div>
    </motion.div>
  );
}

function SpeedVisual() {
  const scores = [
    { label: "Performans", value: 100 },
    { label: "Erişilebilirlik", value: 98 },
    { label: "SEO", value: 100 },
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {scores.map((s) => (
        <div key={s.label} className="rounded-xl border border-line bg-bg/40 p-3">
          <div className="text-2xl font-bold tracking-tight">{s.value}</div>
          <div className="mt-1 text-xs text-subtle">{s.label}</div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-fg/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400"
              style={{ width: `${s.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TimelineVisual() {
  const days = ["Gün 1", "Gün 2", "Gün 4", "Gün 7"];
  const labels = ["Tanışma", "Örnek tasarım", "Revizyon", "Yayında 🚀"];
  return (
    <div className="relative">
      <div className="absolute top-2 right-2 left-2 h-px bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400" />
      <div className="relative grid grid-cols-4 gap-2">
        {days.map((d, i) => (
          <div key={d}>
            <span className="block size-4 rounded-full border-2 border-orange-400 bg-bg" />
            <div className="mt-3 text-xs font-semibold">{d}</div>
            <div className="text-xs text-subtle">{labels[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BentoTilt() {
  return (
    <section id="neden-biz" className="border-b border-line py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Neden Biz"
          title="Güzel görünmek yetmez, çalışmalı."
          description="Her site hız, görünürlük ve dönüşüm için baştan tasarlanır."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-16 grid gap-4 md:grid-cols-3"
        >
          <TiltCard
            className="md:col-span-2"
            icon={Zap}
            title="Işık hızında sayfalar"
            text="Modern altyapı ile sayfalarınız 1 saniyenin altında açılır. Ziyaretçi beklemez, siz müşteri kaybetmezsiniz."
          >
            <SpeedVisual />
          </TiltCard>
          <TiltCard
            icon={Smartphone}
            title="Mobilde kusursuz"
            text="Müşterilerinizin %80'i telefondan gelir. Her ekran boyutu için ayrı ayrı test ediyoruz."
          />
          <TiltCard
            icon={Search}
            title="Google'da görünür"
            text="Teknik SEO, Google İşletme Profili entegrasyonu ve yerel aramalarda üst sıralar."
          />
          <TiltCard
            className="md:col-span-2"
            icon={Clock}
            title="7 günde yayında, sonra da yanınızdayız"
            text="Uzun ajans süreçleri yok. Yayından sonra da güncellemeler, bakım ve destek bizde."
          >
            <TimelineVisual />
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
