import { notFound } from "next/navigation"
import { AdminNotice } from "@/components/admin/AdminNotice"
import { MediaManager } from "@/components/admin/MediaManager"
import { ProductForm } from "@/components/admin/ProductForm"
import { getAdminProductById } from "@/lib/admin/queries"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; let result; try { result = await getAdminProductById(id) } catch { notFound() }; return <><AdminNotice/><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Products</p><h1 className="mb-8 mt-2 text-3xl font-semibold">Edit Product</h1><ProductForm product={result.product}/><MediaManager entityType="product" entityId={id} media={result.media}/></> }
