"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";
import { login } from "@/app/admin/actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, {});

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Şifre</span>
        <div className="relative">
          <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-subtle" />
          <input
            type="password"
            name="password"
            required
            autoFocus
            autoComplete="current-password"
            className="w-full rounded-xl border border-line bg-bg/60 py-2.5 pr-3.5 pl-10 text-sm outline-none transition focus:border-orange-400/60 focus:ring-2 focus:ring-orange-400/20"
          />
        </div>
      </label>
      {state.error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-300">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:brightness-110 disabled:opacity-60"
      >
        {pending && <Loader2 className="size-4 animate-spin" />}
        Giriş Yap
      </button>
    </form>
  );
}
