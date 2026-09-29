import Link from "next/link";
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Plus, Trash2, ExternalLink } from "lucide-react";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { RowButton } from "@/components/admin/RowButton";
import { ProjectThumb } from "@/components/ProjectThumb";
import { requireAdmin } from "@/lib/auth";
import { hostname } from "@/lib/project-url";
import { getProjects, type Project } from "@/lib/projects";
import { addProject, removeProject, reorderProject, toggleProject } from "../actions";

export default async function AdminPage() {
  await requireAdmin();
  const projects = await getProjects();
  const live = projects.filter((p) => p.visible).length;

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-orange-600 uppercase dark:text-orange-400">
            Yönetim Paneli
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tighter sm:text-4xl">Projeler</h1>
          <p className="mt-2 text-sm text-muted">
            Buraya eklediğiniz siteler ana sayfadaki “Projeler” bölümünde görünür.
          </p>
        </div>
        <div className="flex gap-2">
          <Stat label="Toplam" value={projects.length} />
          <Stat label="Yayında" value={live} accent />
          <Stat label="Gizli" value={projects.length - live} />
        </div>
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Mobilde form üstte, masaüstünde sağda sabit */}
        <section className="rounded-2xl border border-line bg-card p-5 sm:p-6 lg:sticky lg:top-24 lg:order-last">
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="grid size-7 place-items-center rounded-lg bg-orange-400/10 text-orange-600 dark:text-orange-300">
              <Plus className="size-4" />
            </span>
            Yeni proje ekle
          </h2>
          <div className="mt-5">
            <ProjectForm action={addProject} submitLabel="Projeyi Ekle" />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          {projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line-strong p-10 text-center">
              <p className="font-medium">Henüz proje yok</p>
              <p className="mt-1 text-sm text-muted">Formu doldurarak ilk sitenizi ekleyin.</p>
            </div>
          ) : (
            projects.map((p, i) => (
              <ProjectRow key={p.id} project={p} first={i === 0} last={i === projects.length - 1} />
            ))
          )}
        </section>
      </div>
    </>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="min-w-20 rounded-xl border border-line bg-card px-4 py-2.5">
      <div className={`text-xl font-bold tracking-tight ${accent ? "text-gradient" : ""}`}>{value}</div>
      <div className="text-xs text-subtle">{label}</div>
    </div>
  );
}

function ProjectRow({ project: p, first, last }: { project: Project; first: boolean; last: boolean }) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border border-line bg-card p-3 transition hover:border-line-strong sm:flex-row sm:items-center sm:p-4 ${
        p.visible ? "" : "opacity-70"
      }`}
    >
      <div className="flex min-w-0 flex-1 gap-4">
        <div className="aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-lg border border-line sm:w-36">
          <ProjectThumb image={p.image} url={p.url} title={p.title} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-semibold tracking-tight">{p.title}</h3>
            {p.visible ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                Yayında
              </span>
            ) : (
              <span className="rounded-full border border-line px-2 py-0.5 text-[11px] font-medium text-subtle">
                Gizli
              </span>
            )}
          </div>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex max-w-full items-center gap-1 text-sm text-orange-600 hover:underline dark:text-orange-400"
          >
            <span className="truncate">{hostname(p.url)}</span>
            <ExternalLink className="size-3 shrink-0" />
          </a>
          {(p.category || p.description) && (
            <p className="mt-1 line-clamp-2 text-xs text-muted">
              {p.category && <span className="font-medium text-fg/80">{p.category}</span>}
              {p.category && p.description && " · "}
              {p.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 border-t border-line pt-3 sm:border-0 sm:pt-0">
        <form action={reorderProject.bind(null, p.id, -1)}>
          <RowButton label="Yukarı taşı" disabled={first}>
            <ArrowUp className="size-4" />
          </RowButton>
        </form>
        <form action={reorderProject.bind(null, p.id, 1)}>
          <RowButton label="Aşağı taşı" disabled={last}>
            <ArrowDown className="size-4" />
          </RowButton>
        </form>
        <form action={toggleProject.bind(null, p.id)}>
          <RowButton label={p.visible ? "Sitede gizle" : "Sitede göster"}>
            {p.visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </RowButton>
        </form>
        <Link
          href={`/admin/duzenle/${p.id}`}
          title="Düzenle"
          aria-label="Düzenle"
          className="grid size-9 place-items-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-fg"
        >
          <Pencil className="size-4" />
        </Link>
        <form action={removeProject.bind(null, p.id)}>
          <RowButton label="Sil" danger confirmText={`“${p.title}” silinsin mi? Bu işlem geri alınamaz.`}>
            <Trash2 className="size-4" />
          </RowButton>
        </form>
      </div>
    </article>
  );
}
