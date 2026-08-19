import { ProductForm } from "@/components/admin/ProductForm"
import { AdminNotice } from "@/components/admin/AdminNotice"

export default async function NewProductPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) { const params = await searchParams; return <><AdminNotice searchParams={params}/><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Products</p><h1 className="mb-8 mt-2 text-3xl font-semibold">New Product</h1><ProductForm/></> }
