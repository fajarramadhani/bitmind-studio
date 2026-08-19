import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.brand.name,
    short_name: siteConfig.brand.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F6F6F3",
    theme_color: siteConfig.brand.primaryColor,
    icons: [
      {
        src: "/brand/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
