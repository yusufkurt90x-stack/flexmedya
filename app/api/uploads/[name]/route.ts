import { readFile } from "node:fs/promises";
import path from "node:path";
import { IMAGE_NAME_RE, IMAGE_TYPES, UPLOAD_DIR } from "@/lib/projects";

const MIME = Object.fromEntries(Object.entries(IMAGE_TYPES).map(([mime, ext]) => [ext, mime]));

// public/ klasörüne sonradan eklenen dosyalar production'da sunulmadığı için
// yüklenen görseller bu route üzerinden servis edilir.
export async function GET(_: Request, ctx: RouteContext<"/api/uploads/[name]">) {
  const { name } = await ctx.params;
  if (!IMAGE_NAME_RE.test(name)) return new Response("Not found", { status: 404 });
  try {
    const file = await readFile(path.join(UPLOAD_DIR, name));
    return new Response(file, {
      headers: {
        "Content-Type": MIME[name.split(".").pop()!],
        // Dosya adları benzersiz (UUID) olduğundan kalıcı önbellek güvenli.
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
