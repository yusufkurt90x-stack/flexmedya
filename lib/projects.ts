import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

// Projeler data/projects.json dosyasında, görseller data/uploads/ klasöründe tutulur.
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "projects.json");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

export type Project = {
  id: string;
  title: string;
  url: string;
  category: string;
  description: string;
  image: string | null; // data/uploads içindeki dosya adı
  visible: boolean;
  createdAt: string;
};

export type ProjectInput = Pick<Project, "title" | "url" | "category" | "description" | "visible">;

export async function getProjects(): Promise<Project[]> {
  try {
    return JSON.parse(await readFile(DB_FILE, "utf8")) as Project[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

export async function getVisibleProjects() {
  return (await getProjects()).filter((p) => p.visible);
}

export async function getProject(id: string) {
  return (await getProjects()).find((p) => p.id === id) ?? null;
}

async function save(projects: Project[]) {
  await mkdir(DATA_DIR, { recursive: true });
  // Önce geçici dosyaya yaz, sonra taşı: yazma yarıda kalırsa veri bozulmaz.
  const tmp = `${DB_FILE}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(projects, null, 2), "utf8");
  await rename(tmp, DB_FILE);
}

export async function createProject(input: ProjectInput, image: string | null) {
  const projects = await getProjects();
  const project: Project = {
    ...input,
    id: randomUUID(),
    image,
    createdAt: new Date().toISOString(),
  };
  await save([project, ...projects]);
  return project;
}

export async function updateProject(id: string, patch: Partial<Omit<Project, "id" | "createdAt">>) {
  const projects = await getProjects();
  const i = projects.findIndex((p) => p.id === id);
  if (i === -1) return null;
  const previous = projects[i];
  projects[i] = { ...previous, ...patch };
  await save(projects);
  if (previous.image && previous.image !== projects[i].image) await removeImage(previous.image);
  return projects[i];
}

export async function deleteProject(id: string) {
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id);
  if (!project) return;
  await save(projects.filter((p) => p.id !== id));
  if (project.image) await removeImage(project.image);
}

export async function moveProject(id: string, direction: -1 | 1) {
  const projects = await getProjects();
  const i = projects.findIndex((p) => p.id === id);
  const j = i + direction;
  if (i === -1 || j < 0 || j >= projects.length) return;
  [projects[i], projects[j]] = [projects[j], projects[i]];
  await save(projects);
}

// ---- Görseller ----

export const IMAGE_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
export const IMAGE_NAME_RE = /^[a-f0-9-]{36}\.(png|jpg|webp|avif|gif)$/;

export async function saveImage(file: File) {
  const ext = IMAGE_TYPES[file.type];
  if (!ext) throw new Error("Desteklenmeyen görsel türü.");
  await mkdir(UPLOAD_DIR, { recursive: true });
  const name = `${randomUUID()}.${ext}`;
  await writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return name;
}

async function removeImage(name: string) {
  if (!IMAGE_NAME_RE.test(name)) return;
  await unlink(path.join(UPLOAD_DIR, name)).catch(() => {});
}
