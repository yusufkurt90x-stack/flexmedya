"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { LogoMark } from "./Logo";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

export function MacbookScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const scaleX = useTransform(scrollYProgress, [0, 0.3], [1.2, 1.5]);
  const scaleY = useTransform(scrollYProgress, [0, 0.3], [0.6, 1.5]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  const rotate = useTransform(scrollYProgress, [0, 0.12], [-28, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section id="demo" className="relative overflow-hidden border-b border-line">
      <motion.div
        style={reduced ? undefined : { opacity: titleOpacity }}
        className="mx-auto max-w-3xl px-4 pt-24 text-center sm:px-6 md:pt-28"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
          Canlı Önizleme
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tighter text-balance sm:text-5xl">
          İşletmeniz internette <span className="text-gradient">böyle görünecek.</span>
        </h2>
      </motion.div>

      <div
        ref={ref}
        className="isolate -mb-64 flex min-h-[70vh] origin-top scale-[0.35] flex-col items-center pt-10 [perspective:800px] sm:-mb-40 sm:min-h-[100vh] sm:scale-50 md:mb-0 md:min-h-[150vh] md:scale-100 md:pt-20"
      >
        <Lid
          scaleX={scaleX}
          scaleY={scaleY}
          rotate={rotate}
          translate={translate}
          reduced={reduced}
        />
        <Base />
      </div>
    </section>
  );
}

function Lid({
  scaleX,
  scaleY,
  rotate,
  translate,
  reduced,
}: {
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  reduced: boolean;
}) {
  return (
    <div className="relative [perspective:800px]">
      {/* Kapağın arka yüzü — başlangıçta ~25° eğik */}
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div
          style={{ boxShadow: "0px 2px 0px 2px #171717 inset" }}
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
        >
          <LogoMark className="size-7 opacity-60" />
        </div>
      </div>

      {/* Ekran katmanı: açılır, büyür ve aşağı kayar */}
      <motion.div
        style={
          reduced
            ? { transformOrigin: "top" }
            : {
                scaleX,
                scaleY,
                rotateX: rotate,
                translateY: translate,
                transformStyle: "preserve-3d",
                transformOrigin: "top",
              }
        }
        className="absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div className="absolute inset-0 rounded-lg bg-[#272729]" />
        <ScreenMockup />
      </motion.div>
    </div>
  );
}

// Ekrandaki sahte web sitesi
function ScreenMockup() {
  return (
    <div className="absolute inset-2 overflow-hidden rounded-lg bg-[#0b0d24] text-white">
      <div className="absolute -top-16 left-1/4 size-48 rounded-full bg-orange-400/20 blur-3xl" />
      <div className="absolute -top-10 right-6 size-40 rounded-full bg-fuchsia-500/20 blur-3xl" />

      {/* Üst bar */}
      <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-[3px] bg-gradient-to-br from-orange-400 to-fuchsia-400" />
          <span className="h-1.5 w-12 rounded-full bg-gradient-to-r from-orange-400 to-fuchsia-400" />
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1 w-6 rounded-full bg-white/25" />
          <span className="h-1 w-6 rounded-full bg-white/25" />
          <span className="h-1 w-6 rounded-full bg-white/25" />
          <span className="ml-1 flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[6px] font-medium text-emerald-300">
            <span className="size-1 animate-pulse rounded-full bg-emerald-400" />
            Canlı
          </span>
        </div>
      </div>

      {/* Hero alanı */}
      <div className="relative flex flex-col items-center px-6 pt-8">
        <span className="h-1.5 w-20 rounded-full bg-white/15" />
        <span className="mt-3 h-4 w-56 rounded-md bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400" />
        <span className="mt-2 h-4 w-40 rounded-md bg-white/80" />
        <span className="mt-3 h-1.5 w-48 rounded-full bg-white/15" />
        <span className="mt-1.5 h-1.5 w-36 rounded-full bg-white/15" />
        <span className="mt-4 h-5 w-24 rounded-full bg-gradient-to-r from-orange-400 to-fuchsia-400 shadow-[0_0_20px_-4px_rgba(251,146,60,0.8)]" />
      </div>

      {/* 3 kart önizlemesi */}
      <div className="relative mt-7 grid grid-cols-3 gap-2.5 px-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md border border-white/10 bg-white/[0.03] p-2">
            <span className="block size-4 rounded bg-orange-400/20" />
            <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-white/40" />
            <span className="mt-1 block h-1 w-full rounded-full bg-white/10" />
            <span className="mt-1 block h-1 w-2/3 rounded-full bg-white/10" />
          </div>
        ))}
      </div>

      {/* Terminal imleci */}
      <div className="absolute bottom-3 left-4 font-mono text-[9px] text-orange-300">
        &gt; <span className="animate-caret">▍</span>
      </div>
    </div>
  );
}

function Base() {
  return (
    <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-[#272729]">
      {/* Menteşe bölgesi */}
      <div className="relative h-10 w-full">
        <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
      </div>
      <div className="relative flex">
        <div className="mx-auto h-full w-[10%] overflow-hidden">
          <SpeakerGrid />
        </div>
        <div className="mx-auto h-full w-[80%]">
          <Keypad />
        </div>
        <div className="mx-auto h-full w-[10%] overflow-hidden">
          <SpeakerGrid />
        </div>
      </div>
      <Trackpad />
      <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-[20%] rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
      {/* Alt kenar gradyan glow */}
      <div className="absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
      <div className="absolute inset-x-24 bottom-0 h-1 bg-gradient-to-r from-transparent via-fuchsia-400/70 to-transparent blur-sm" />
    </div>
  );
}

function Trackpad() {
  return (
    <div
      className="mx-auto my-1 h-32 w-[40%] rounded-xl"
      style={{ boxShadow: "0px 0px 1px 1px #00000020 inset" }}
    />
  );
}

function SpeakerGrid() {
  return (
    <div
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
      style={{
        backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    />
  );
}

function Key({
  children,
  className = "w-6",
  align = "center",
}: {
  children?: React.ReactNode;
  className?: string;
  align?: "center" | "start" | "end";
}) {
  const justify = { center: "justify-center", start: "justify-start", end: "justify-end" }[align];
  return (
    <div className={`rounded-[4px] p-[0.5px] ${className}`}>
      <div
        className={`flex h-6 w-full items-center ${justify} overflow-hidden rounded-[3.5px] bg-[#0A090D] px-[2px] text-[5px] leading-none text-neutral-200`}
        style={{
          boxShadow: "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
        }}
      >
        {children}
      </div>
    </div>
  );
}

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">{children}</div>
);

function Dual({ s }: { s: string }) {
  return s.length === 2 ? (
    <span className="flex flex-col items-center gap-[1px]">
      <span>{s[0]}</span>
      <span>{s[1]}</span>
    </span>
  ) : (
    <span>{s}</span>
  );
}

function Keypad() {
  const fKeys = Array.from({ length: 12 }, (_, i) => `F${i + 1}`);
  const numbers = ["~`", "!1", "@2", "#3", "$4", "%5", "^6", "&7", "*8", "(9", ")0", "_-", "+="];
  const qwerty = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{[", "}]", "|\\"];
  const asdf = ["A", "S", "D", "F", "G", "H", "J", "K", "L", ":;", `"'`];
  const zxcv = ["Z", "X", "C", "V", "B", "N", "M", "<,", ">.", "?/"];

  return (
    <div className="mx-auto h-full rounded-md bg-[#050505] p-1">
      <Row>
        <Key className="w-10" align="start">esc</Key>
        {fKeys.map((k) => (
          <Key key={k}>{k}</Key>
        ))}
        <Key>
          <span className="size-2 rounded-full border border-neutral-600" />
        </Key>
      </Row>
      <Row>
        {numbers.map((k) => (
          <Key key={k}>
            <Dual s={k} />
          </Key>
        ))}
        <Key className="w-10" align="end">delete</Key>
      </Row>
      <Row>
        <Key className="w-10" align="start">tab</Key>
        {qwerty.map((k) => (
          <Key key={k}>
            <Dual s={k} />
          </Key>
        ))}
      </Row>
      <Row>
        <Key className="w-[2.8rem]" align="start">caps lock</Key>
        {asdf.map((k) => (
          <Key key={k}>
            <Dual s={k} />
          </Key>
        ))}
        <Key className="w-[2.85rem]" align="end">return</Key>
      </Row>
      <Row>
        <Key className="w-[3.65rem]" align="start">shift</Key>
        {zxcv.map((k) => (
          <Key key={k}>
            <Dual s={k} />
          </Key>
        ))}
        <Key className="w-[3.65rem]" align="end">shift</Key>
      </Row>
      <Row>
        <Key align="start">fn</Key>
        <Key align="start">control</Key>
        <Key align="start">option</Key>
        <Key className="w-8" align="start">command</Key>
        <Key className="w-[8rem]" />
        <Key className="w-8" align="start">command</Key>
        <Key align="start">option</Key>
        <div className="flex w-[4.9rem] gap-[2px]">
          <Key>◀</Key>
          <div className="flex w-6 flex-col gap-[1px]">
            <div className="flex h-[11.5px] items-center justify-center rounded-[3px] bg-[#0A090D] text-[4px] text-neutral-200">
              ▲
            </div>
            <div className="flex h-[11.5px] items-center justify-center rounded-[3px] bg-[#0A090D] text-[4px] text-neutral-200">
              ▼
            </div>
          </div>
          <Key>▶</Key>
        </div>
      </Row>
    </div>
  );
}
