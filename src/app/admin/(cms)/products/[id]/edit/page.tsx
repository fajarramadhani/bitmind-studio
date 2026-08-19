import { notFound } from "next/navigation"
import { AdminNotice } from "@/components/admin/AdminNotice"
import { MediaManager } from "@/components/admin/MediaManager"
import { ProductForm } from "@/components/admin/ProductForm"
import { getAdminProductById } from "@/lib/admin/queries"

export default async function EditProductPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) { const { id } = await params; let result; try { result = await getAdminProductById(id) } catch { notFound() }; const query = await searchParams; return <><AdminNotice searchParams={query}/><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Products</p><h1 className="mb-8 mt-2 text-3xl font-semibold">Edit Product</h1><ProductForm product={result.product}/><MediaManager entityType="product" entityId={id} media={result.media}/></> }
