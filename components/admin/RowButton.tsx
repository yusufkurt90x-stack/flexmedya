"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

// Satır aksiyonlarında (sırala, gizle, sil) kullanılan küçük ikon butonu.
export function RowButton({
  label,
  children,
  danger,
  disabled,
  confirmText,
}: {
  label: string;
  children: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  confirmText?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      title={label}
      aria-label={label}
      disabled={disabled || pending}
      onClick={(e) => {
        if (confirmText && !window.confirm(confirmText)) e.preventDefault();
      }}
      className={`grid size-9 place-items-center rounded-full border border-line text-muted transition enabled:hover:border-line-strong enabled:hover:text-fg disabled:opacity-35 ${
        danger ? "enabled:hover:border-red-500/40 enabled:hover:bg-red-500/10 enabled:hover:text-red-500" : ""
      }`}
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : children}
    </button>
  );
}
