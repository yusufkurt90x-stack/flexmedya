import { del, get, put } from "@vercel/blob";
import { randomUUID } from "node:crypto";

const DB_FILE = "data/projects.json";

export type Project = {
  id: string;
  title: string;
  url: string;
  category: string;
  description: string;
  image: string | null;
  visible: boolean;
  createdAt: string;
};

export type ProjectInput = Pick<
  Project,
  "title" | "url" | "category" | "description" | "visible"
>;

async function readProjects(): Promise<Project[]> {
  try {
    const result = await get(DB_FILE, {
      access: "public",
      useCache: false,
    });

    if (!result) return [];

    const text = await new Response(result.stream).text();
    return JSON.parse(text) as Project[];
  } catch (err) {
    const message = String(err);

    if (
      message.includes("not found") ||
      message.includes("BlobNotFound") ||
      message.includes("404")
    ) {
      return [];
    }

    throw err;
  }
}

export async function getProjects(): Promise<Project[]> {
  return readProjects();
}

export async function getVisibleProjects() {
  return (await getProjects()).filter((p) => p.visible);
}

export async function getProject(id: string) {
  return (await getProjects()).find((p) => p.id === id) ?? null;
}

async function save(projects: Project[]) {
  await put(DB_FILE, JSON.stringify(projects, null, 2), {
    access: "public",
    allowOverwrite: true,
  });
}

export async function createProject(
  input: ProjectInput,
  image: string | null
) {
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

export async function updateProject(
  id: string,
  patch: Partial<Omit<Project, "id" | "createdAt">>
) {
  const projects = await getProjects();

  const i = projects.findIndex((p) => p.id === id);

  if (i === -1) return null;

  const previous = projects[i];

  projects[i] = {
    ...previous,
    ...patch,
  };

  await save(projects);

  if (
    previous.image &&
    previous.image !== projects[i].image
  ) {
    await removeImage(previous.image);
  }

  return projects[i];
}

export async function deleteProject(id: string) {
  const projects = await getProjects();

  const project = projects.find((p) => p.id === id);

  if (!project) return;

  await save(projects.filter((p) => p.id !== id));

  if (project.image) {
    await removeImage(project.image);
  }
}

export async function moveProject(
  id: string,
  direction: -1 | 1
) {
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

export const IMAGE_NAME_RE =
  /^[a-f0-9-]{36}\.(png|jpg|webp|avif|gif)$/;

export async function saveImage(file: File) {
  const ext = IMAGE_TYPES[file.type];

  if (!ext) {
    throw new Error("Desteklenmeyen görsel türü.");
  }

  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Görsel en fazla 4 MB olabilir.");
  }

  const name = `uploads/${randomUUID()}.${ext}`;

  const blob = await put(name, file, {
    access: "public",
  });

  return blob.url;
}

async function removeImage(url: string) {
  if (!url.startsWith("http")) return;

  await del(url).catch(() => {});
}