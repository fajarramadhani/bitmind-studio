import type { MetadataRoute } from "next"
import { getPublishedProducts, getPublishedProjects } from "@/lib/content"
import { siteConfig } from "@/config/site"

const baseUrl = siteConfig.url

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, products] = await Promise.all([
    getPublishedProjects(),
    getPublishedProducts(),
  ])
  const staticRoutes = ["", "/work", "/services", "/products", "/about", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })
  )

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: project.updatedAt ?? new Date(project.year, 0, 1),
  }))

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt ?? new Date(),
  }))

  return [...staticRoutes, ...projectRoutes, ...productRoutes]
}
