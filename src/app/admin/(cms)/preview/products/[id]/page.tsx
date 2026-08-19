import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/layout/Container"
import { Badge } from "@/components/ui/Badge"
import { getAdminProductById } from "@/lib/admin/queries"
import { createClient } from "@/lib/supabase/server"
import { mapProduct, mapProductMedia } from "@/lib/content/mappers"

export default async function ProductPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { product: row, media } = await getAdminProductById(id)
  const adminClient = await createClient()
  const gallery = await Promise.all(
    media.map(async (item) => {
      const { data } = await adminClient.storage
        .from("product-media")
        .createSignedUrl(item.storage_path, 900)
      return mapProductMedia(item, data?.signedUrl ?? "")
    })
  )
  const product = mapProduct(row, gallery)
  const cover = gallery.find((item) => item.layout === "cover")

  return (
    <div className="-m-5 min-h-dvh bg-background p-5 sm:-m-8 sm:p-8 lg:-m-10 lg:p-10">
      <Container>
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Secure Draft Preview
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              This page is not public and does not publish content.
            </p>
          </div>
          <Link href={`/admin/products/${id}/edit`} className="admin-button-secondary">
            Back to Editor
          </Link>
        </div>
        <article className="grid gap-12 py-16 md:grid-cols-2 md:py-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
            {cover?.src ? (
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : null}
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="accent">{product.category}</Badge>
              <Badge variant="outline">{product.status}</Badge>
              <Badge variant="outline">{product.publishStatus}</Badge>
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
              {product.title}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
              {product.description ?? product.shortDescription}
            </p>
          </div>
        </article>
      </Container>
    </div>
  )
}
