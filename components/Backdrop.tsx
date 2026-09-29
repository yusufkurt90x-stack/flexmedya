// Pixel-grid + 3 bulanık renk küresi. Hero ve CTA arka planında kullanılır.
export function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="pixel-grid absolute inset-0 animate-pixel-fade" />
      <div className="absolute -top-40 left-[-10%] size-[32rem] rounded-full bg-orange-400/20 blur-[100px] will-change-transform animate-blob-drift [animation-duration:16s]" />
      <div className="absolute -top-20 right-[-10%] size-[30rem] rounded-full bg-fuchsia-500/20 blur-[110px] will-change-transform animate-blob-drift [animation-delay:-4s] [animation-duration:18s]" />
      <div className="absolute top-1/2 left-1/3 size-[26rem] rounded-full bg-rose-400/15 blur-[100px] will-change-transform animate-blob-drift [animation-delay:-8s] [animation-duration:20s]" />
    </div>
  );
}
