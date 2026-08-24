import type { MetadataRoute } from "next"
import { getPublishedProducts, getPublishedProjects } from "@/lib/content"
import { isMomentsProductSlug } from "@/lib/product-presentation"
import { getPublicPortfolioProjects } from "@/lib/project-portfolio"
import { siteConfig } from "@/config/site"

const baseUrl = siteConfig.url

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, products] = await Promise.all([
    getPublishedProjects(),
    getPublishedProducts(),
  ])

  const publicProjects = getPublicPortfolioProjects(projects)

  const staticRoutes = [
    "",
    "/work",
    "/services",
    "/products",
    "/moments",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))

  const projectRoutes = publicProjects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: project.updatedAt ?? new Date(project.year, 0, 1),
  }))

  const productRoutes = products
    .filter((product) => !isMomentsProductSlug(product.slug))
    .map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.updatedAt ?? new Date(),
    }))

  return [...staticRoutes, ...projectRoutes, ...productRoutes]
}
