import "server-only"

import { cache } from "react"
import { products as localProducts } from "@/data/products"
import { createClient } from "@/lib/supabase/server"
import { getContentSource } from "@/lib/content/config"
import { getStorageReference, resolveMediaUrl } from "@/lib/content/media"
import { mapProduct, mapProductMedia } from "@/lib/content/mappers"
import type { Product } from "@/types"
import type { ProductMediaRow, ProductRow } from "@/types/database"

function localPublishedProducts(): Product[] {
  return localProducts.map((product, index) => ({
    ...product,
    publishStatus: "published",
    sortOrder: product.sortOrder ?? index,
    currency: product.currency ?? "IDR",
  }))
}

async function hydrateRows(rows: ProductRow[]) {
  if (!rows.length) return []
  const supabase = await createClient()
  const ids = rows.map((row) => row.id)
  const { data: mediaData, error } = await supabase
    .from("product_media")
    .select("*")
    .in("product_id", ids)
    .order("sort_order")

  if (error) throw new Error("Unable to load published product media.")
  const mediaRows = (mediaData ?? []) as ProductMediaRow[]

  return Promise.all(
    rows.map(async (row) => {
      const productMedia = mediaRows.filter((item) => item.product_id === row.id)
      const gallery = await Promise.all(
        productMedia.map(async (item) =>
          mapProductMedia(
            item,
            await resolveMediaUrl("product-media", item.storage_path)
          )
        )
      )
      const product = mapProduct(row, gallery)

      const cover = gallery.find((item) => item.layout === "cover")
      if (!product.coverImage && cover) product.coverImage = cover.src
      if (!product.thumbnail && cover) product.thumbnail = cover.src

      for (const field of ["thumbnail", "coverImage"] as const) {
        const ref = getStorageReference(product[field] ?? null, "product-media")
        if (ref) product[field] = await resolveMediaUrl("product-media", ref)
      }

      return product
    })
  )
}

export const getPublishedProducts = cache(async (): Promise<Product[]> => {
  if (getContentSource() === "local") return localPublishedProducts()

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("publish_status", "published")
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false })

  if (error) throw new Error("Unable to load published products.")
  return hydrateRows((data ?? []) as ProductRow[])
})

export const getFeaturedProducts = cache(async () =>
  (await getPublishedProducts()).filter((product) => product.featured)
)

export const getProductBySlug = cache(async (slug: string) => {
  const products = await getPublishedProducts()
  return products.find((product) => product.slug === slug) ?? null
})
