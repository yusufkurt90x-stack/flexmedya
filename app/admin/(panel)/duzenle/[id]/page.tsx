import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { requireAdmin } from "@/lib/auth";
import { getProject } from "@/lib/projects";
import { editProject } from "../../../actions";

export default async function EditPage({ params }: PageProps<"/admin/duzenle/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-xl">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-subtle transition hover:text-fg">
        <ArrowLeft className="size-4" />
        Projelere dön
      </Link>
      <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-orange-600 uppercase dark:text-orange-400">
        Düzenle
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tighter">{project.title}</h1>
      <div className="mt-6 rounded-2xl border border-line bg-card p-5 sm:p-6">
        <ProjectForm action={editProject.bind(null, project.id)} project={project} submitLabel="Değişiklikleri Kaydet" />
      </div>
    </div>
  );
}
