"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, createSession, destroySession, requireAdmin } from "@/lib/auth";
import {
  IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  createProject,
  deleteProject,
  getProject,
  moveProject,
  saveImage,
  updateProject,
  type ProjectInput,
} from "@/lib/projects";

export type FormState = {
  ok?: boolean;
  error?: string;
  message?: string;
  // Hata durumunda React formu sıfırladığı için girilen değerler geri gönderilir.
  values?: Record<string, string>;
};

function valuesOf(formData: FormData) {
  const keys = ["title", "url", "category", "description", "visible"];
  return Object.fromEntries(keys.map((k) => [k, String(formData.get(k) ?? "")]));
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin");
}

// ---- Oturum ----

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  if (!process.env.ADMIN_PASSWORD) {
    return { error: "ADMIN_PASSWORD .env.local dosyasında tanımlı değil." };
  }
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 600)); // kaba kuvvet denemelerini yavaşlat
    return { error: "Şifre hatalı." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/giris");
}

// ---- Projeler ----

function normalizeUrl(raw: string) {
  const value = raw.trim();
  if (!value) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

type Parsed = { input: ProjectInput; image: File | null } | { error: string };

function parse(formData: FormData): Parsed {
  const title = String(formData.get("title") ?? "").trim();
  const url = normalizeUrl(String(formData.get("url") ?? ""));
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const file = formData.get("image");
  const image = file instanceof File && file.size > 0 ? file : null;

  if (!title) return { error: "Proje adı zorunlu." };
  if (title.length > 80) return { error: "Proje adı en fazla 80 karakter olabilir." };
  if (!url) return { error: "Geçerli bir site adresi girin (ör. kafebulut.com)." };
  if (category.length > 40) return { error: "Kategori en fazla 40 karakter olabilir." };
  if (description.length > 240) return { error: "Açıklama en fazla 240 karakter olabilir." };
  if (image && !IMAGE_TYPES[image.type]) return { error: "Görsel PNG, JPG, WEBP, AVIF veya GIF olmalı." };
  if (image && image.size > MAX_IMAGE_BYTES) return { error: "Görsel en fazla 4 MB olabilir." };

  return {
    input: { title, url, category, description, visible: formData.get("visible") === "on" },
    image,
  };
}

export async function addProject(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error, values: valuesOf(formData) };
  const image = parsed.image ? await saveImage(parsed.image) : null;
  await createProject(parsed.input, image);
  refresh();
  return { ok: true, message: `“${parsed.input.title}” eklendi.` };
}

export async function editProject(id: string, _: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const existing = await getProject(id);
  if (!existing) return { error: "Proje bulunamadı." };
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error, values: valuesOf(formData) };

  let image = existing.image;
  if (parsed.image) image = await saveImage(parsed.image);
  else if (formData.get("removeImage") === "on") image = null;

  await updateProject(id, { ...parsed.input, image });
  refresh();
  redirect("/admin");
}

export async function removeProject(id: string) {
  await requireAdmin();
  await deleteProject(id);
  refresh();
}

export async function toggleProject(id: string) {
  await requireAdmin();
  const project = await getProject(id);
  if (!project) return;
  await updateProject(id, { visible: !project.visible });
  refresh();
}

export async function reorderProject(id: string, direction: -1 | 1) {
  await requireAdmin();
  await moveProject(id, direction);
  refresh();
}
