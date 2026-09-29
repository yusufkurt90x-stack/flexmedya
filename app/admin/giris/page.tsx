import Link from "next/link";
import { redirect } from "next/navigation";
import { Backdrop } from "@/components/Backdrop";
import { LogoMark } from "@/components/Logo";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAdmin } from "@/lib/auth";
import { site } from "@/lib/site";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="relative isolate grid min-h-dvh place-items-center overflow-hidden px-4 py-16">
      <Backdrop />
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="grid size-14 place-items-center rounded-2xl border border-line bg-elev shadow-[0_0_50px_-12px_rgba(251,146,60,0.7)]">
            <LogoMark className="size-7" />
          </div>
          <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-orange-600 uppercase dark:text-orange-400">
            {site.name} · Yönetim
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tighter">Tekrar hoş geldiniz</h1>
          <p className="mt-2 text-sm text-muted">Projelerinizi yönetmek için giriş yapın.</p>
        </div>
        <div className="rounded-2xl border border-line bg-card p-6 backdrop-blur-xl">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-subtle transition hover:text-fg">
            ← Siteye dön
          </Link>
        </p>
      </div>
    </main>
  );
}
