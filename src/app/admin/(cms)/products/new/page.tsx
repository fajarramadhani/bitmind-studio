import { ProductForm } from "@/components/admin/ProductForm"
import { AdminNotice } from "@/components/admin/AdminNotice"

export default async function NewProductPage() { return <><AdminNotice/><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Products</p><h1 className="mb-8 mt-2 text-3xl font-semibold">New Product</h1><ProductForm/></> }
