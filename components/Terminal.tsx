"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

type Line = { kind: "prompt" | "ok" | "info"; text: string };

const script: Line[] = [
  { kind: "prompt", text: 'proje baslat --isletme "Kafe Bulut"' },
  { kind: "ok", text: "Sektör analizi tamamlandı" },
  { kind: "ok", text: "3 tasarım taslağı hazırlandı" },
  { kind: "ok", text: "Mobil uyumluluk testi: 100/100" },
  { kind: "prompt", text: "yayina-al --alan-adi kafebulut.com" },
  { kind: "ok", text: "SSL sertifikası kuruldu" },
  { kind: "ok", text: "Google İşletme kaydı bağlandı" },
  { kind: "info", text: "Yanıt bekleniyor..." },
];

export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = usePrefersReducedMotion();
  const [pos, setPos] = useState({ line: 0, char: 0 });

  useEffect(() => {
    if (!inView || reduced || pos.line >= script.length) return;
    const current = script[pos.line];
    const typing = current.kind === "prompt" && pos.char < current.text.length;
    const id = setTimeout(
      () =>
        setPos((p) =>
          typing ? { ...p, char: p.char + 1 } : { line: p.line + 1, char: 0 },
        ),
      typing ? 38 : current.kind === "prompt" ? 450 : 320,
    );
    return () => clearTimeout(id);
  }, [inView, reduced, pos]);

  const done = reduced || pos.line >= script.length;
  const visible = done ? script.length : pos.line + (inView ? 1 : 0);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-line bg-[#0b0d24] shadow-2xl shadow-orange-500/5"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-zinc-500">proje — bash</span>
      </div>
      <div className="min-h-[19rem] p-5 font-mono text-[13px] leading-7 text-zinc-300">
        {script.slice(0, visible).map((l, i) => {
          const isCurrent = !done && i === pos.line;
          if (l.kind === "prompt") {
            const text = isCurrent ? l.text.slice(0, pos.char) : l.text;
            return (
              <div key={i} className={i > 0 ? "mt-3" : ""}>
                <span className="text-orange-400">~/proje $</span> <span className="text-zinc-100">{text}</span>
                {isCurrent && <Caret />}
              </div>
            );
          }
          if (isCurrent) return null;
          return l.kind === "ok" ? (
            <div key={i}>
              <span className="text-emerald-400">✓</span> {l.text}
            </div>
          ) : (
            <div key={i} className="text-rose-300">
              → {l.text}
            </div>
          );
        })}
        {done && (
          <div className="mt-3">
            <span className="text-orange-400">~/proje $</span> <Caret block />
          </div>
        )}
      </div>
    </div>
  );
}

function Caret({ block }: { block?: boolean }) {
  return (
    <span
      className={`ml-0.5 inline-block animate-caret bg-orange-300 align-middle ${block ? "h-4 w-2" : "h-4 w-[2px]"}`}
    />
  );
}
