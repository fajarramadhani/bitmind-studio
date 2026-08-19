import { ProjectForm } from "@/components/admin/ProjectForm"
import { AdminNotice } from "@/components/admin/AdminNotice"

export default async function NewProjectPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  return <><AdminNotice searchParams={params}/><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Projects</p><h1 className="mb-8 mt-2 text-3xl font-semibold">New Project</h1><ProjectForm/></>
}
