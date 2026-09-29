"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Backdrop } from "./Backdrop";
import { Meteors } from "./Meteors";
import { LogoMark } from "./Logo";
import { fadeUp, stagger } from "@/lib/motion";
import { whatsappUrl } from "@/lib/site";

const lines = Array.from({ length: 14 }, (_, i) => {
  const y = 10 + i * 29;
  const a = 10 + (i % 3) * 7;
  return {
    d: `M -150 ${y} C -80 ${y - a}, -20 ${y + a}, 50 ${y} S 180 ${y - a}, 250 ${y} S 380 ${y + a}, 450 ${y} S 580 ${y - a}, 650 ${y}`,
    duration: 2.4 + ((i * 7) % 5) * 0.55,
    delay: -((i * 3) % 7) * 0.4,
    dash: 40 + ((i * 5) % 4) * 20,
  };
});

function FlowPanel() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-card">
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <linearGradient id="flow-grad" x1="-150" y1="0" x2="650" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
        </defs>
        <g transform="rotate(-32 200 200)" fill="none" stroke="url(#flow-grad)" strokeLinecap="round">
          {lines.map((l, i) => (
            <g key={i}>
              <path d={l.d} strokeWidth={0.75} opacity={0.14} />
              <path
                d={l.d}
                strokeWidth={1.25}
                strokeDasharray={`${l.dash} ${400 - l.dash}`}
                className="animate-flow will-change-[stroke-dashoffset]"
                style={
                  {
                    "--flow-duration": `${l.duration}s`,
                    animationDelay: `${l.delay}s`,
                  } as React.CSSProperties
                }
              />
            </g>
          ))}
        </g>
      </svg>
      {/* Kenar solması */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,var(--bg)_100%)] opacity-70" />
      {/* Ortadaki logo rozeti */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative">
          <div className="absolute inset-0 -m-6 rounded-full bg-orange-400/25 blur-2xl" />
          <div className="relative grid size-24 place-items-center rounded-full border border-line-strong bg-bg/80 shadow-[0_0_60px_-10px_rgba(251,146,60,0.6)] backdrop-blur">
            <LogoMark className="size-9" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <Backdrop />
      <Meteors />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/5 px-3 py-1 text-xs font-medium text-orange-600 dark:text-orange-300"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-orange-400" />
            </span>
            Bu ay 5 işletmeye ücretsiz örnek
          </motion.div>

          <h1 className="mt-6 text-5xl leading-[1.02] font-bold tracking-tighter sm:text-6xl lg:text-7xl">
            <motion.span variants={fadeUp} className="block">
              İşletmenizi
            </motion.span>
            <motion.span variants={fadeUp} className="block">
              internete
            </motion.span>
            <motion.span variants={fadeUp} className="text-gradient block pb-1">
              hızla taşıyın.
            </motion.span>
          </h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Kafe, kuaför, klinik ya da atölye — sektörünüze özel, mobil uyumlu ve Google&apos;da
            bulunabilir bir web sitesini 7 gün içinde yayına alıyoruz.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-[0_0_40px_-10px_rgba(251,146,60,0.7)] transition hover:brightness-110"
            >
              Ücretsiz Örnek İste
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#nasil-calisir"
              className="inline-flex items-center rounded-full border border-line-strong px-6 py-3 text-sm font-semibold transition hover:bg-fg/5"
            >
              Nasıl Çalışır?
            </a>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-sm text-subtle">
            Kredi kartı gerekmez · Beğenmezseniz hiçbir ücret ödemezsiniz
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <FlowPanel />
        </motion.div>
      </div>
    </section>
  );
}
