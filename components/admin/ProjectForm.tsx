"use client";

/* eslint-disable @next/next/no-img-element -- yerel önizleme (blob URL) */
import { useActionState, useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import type { FormState } from "@/app/admin/actions";
import type { Project } from "@/lib/projects";
import { imageUrl } from "@/lib/project-url";

type Props = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  project?: Project;
  submitLabel: string;
};

const input =
  "w-full rounded-xl border border-line bg-bg/60 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-subtle focus:border-orange-400/60 focus:ring-2 focus:ring-orange-400/20";

export function ProjectForm({ action, project, submitLabel }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(async (prev: FormState, fd: FormData) => {
    const result = await action(prev, fd);
    // Form her gönderimde sıfırlanır (dosya seçimi dahil); önizlemeyi de temizle.
    setPreview(null);
    return result;
  }, {});
  const [removeImage, setRemoveImage] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const currentImage = project?.image && !removeImage ? imageUrl(project.image) : null;

  useEffect(() => () => void (preview && URL.revokeObjectURL(preview)), [preview]);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : null);
    if (file) setRemoveImage(false);
  }

  function clearImage() {
    if (fileRef.current) fileRef.current.value = "";
    setPreview(null);
    if (project?.image) setRemoveImage(true);
  }

  const shown = preview ?? currentImage;
  const v = state.values;
  const val = (key: "title" | "url" | "category" | "description") => v?.[key] ?? project?.[key];

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field label="Proje adı" required>
        <input name="title" defaultValue={val("title")} required maxLength={80} placeholder="Kafe Bulut" className={input} />
      </Field>
      <Field label="Site adresi" required>
        <input
          name="url"
          defaultValue={val("url")}
          required
          inputMode="url"
          autoCapitalize="none"
          placeholder="kafebulut.com"
          className={input}
        />
      </Field>
      <Field label="Kategori" hint="Ör. Kafe & Restoran">
        <input name="category" defaultValue={val("category")} maxLength={40} placeholder="Kafe & Restoran" className={input} />
      </Field>
      <Field label="Kısa açıklama" hint="En fazla 240 karakter">
        <textarea
          name="description"
          defaultValue={val("description")}
          maxLength={240}
          rows={3}
          placeholder="Online menü ve rezervasyon sistemiyle 2 haftada yayına aldık."
          className={`${input} resize-none`}
        />
      </Field>

      <Field label="Ekran görüntüsü" hint="PNG, JPG, WEBP · en fazla 4 MB">
        <div className="relative overflow-hidden rounded-xl border border-dashed border-line-strong bg-bg/40">
          {shown ? (
            <div className="relative aspect-[16/10]">
              <img src={shown} alt="Önizleme" className="size-full object-cover object-top" />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-black/70 text-white backdrop-blur transition hover:bg-black"
                aria-label="Görseli kaldır"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor={`image-${project?.id ?? "new"}`}
              className="flex aspect-[16/10] cursor-pointer flex-col items-center justify-center gap-2 text-sm text-muted transition hover:text-fg"
            >
              <ImagePlus className="size-6 text-orange-500 dark:text-orange-400" />
              Görsel seç
            </label>
          )}
          <input
            ref={fileRef}
            id={`image-${project?.id ?? "new"}`}
            name="image"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
            onChange={onFile}
            className="sr-only"
          />
        </div>
        {removeImage && <input type="hidden" name="removeImage" value="on" />}
      </Field>

      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-line bg-bg/40 px-3.5 py-3">
        <span>
          <span className="block text-sm font-medium">Sitede göster</span>
          <span className="block text-xs text-subtle">Kapalıysa yalnızca burada görünür</span>
        </span>
        <input type="checkbox" name="visible" defaultChecked={v ? v.visible === "on" : (project?.visible ?? true)} className="peer sr-only" />
        <span className="relative h-6 w-11 shrink-0 rounded-full bg-fg/15 transition peer-checked:bg-gradient-to-r peer-checked:from-orange-400 peer-checked:to-fuchsia-400 peer-focus-visible:ring-2 peer-focus-visible:ring-orange-400/40 after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5" />
      </label>

      {state.error && (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-600 dark:text-red-300">
          {state.error}
        </p>
      )}
      {state.message && (
        <p role="status" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-sm text-emerald-700 dark:text-emerald-300">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-[0_0_40px_-12px_rgba(251,146,60,0.8)] transition hover:brightness-110 disabled:opacity-60"
      >
        {pending && <Loader2 className="size-4 animate-spin" />}
        {pending ? "Kaydediliyor..." : submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="flex items-baseline justify-between gap-2 text-sm font-medium">
        <span>
          {label}
          {required && <span className="text-orange-500"> *</span>}
        </span>
        {hint && <span className="text-xs font-normal text-subtle">{hint}</span>}
      </span>
      {children}
    </div>
  );
}
