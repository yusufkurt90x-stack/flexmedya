// Deterministik sözde-rastgele değerler: SSR ile istemci aynı çıktıyı üretir.
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export function Meteors({ count = 20 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="meteor absolute size-0.5 [transform:rotate(215deg)] rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10] will-change-transform animate-meteor"
          style={{
            top: `${Math.floor(rand(i + 1) * 30) - 10}%`,
            left: `${Math.floor(rand(i + 101) * 110)}%`,
            animationDelay: `${(rand(i + 201) * 6).toFixed(2)}s`,
            animationDuration: `${(5 + rand(i + 301) * 4).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}
