"use client"

import { useState } from "react"

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function SlugFields({
  title = "",
  slug = "",
}: {
  title?: string
  slug?: string
}) {
  const [currentTitle, setCurrentTitle] = useState(title)
  const [currentSlug, setCurrentSlug] = useState(slug)
  const [slugEdited, setSlugEdited] = useState(Boolean(slug))

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <label className="grid gap-2 text-sm font-medium">
        Title
        <input
          required
          name="title"
          value={currentTitle}
          onChange={(event) => {
            setCurrentTitle(event.target.value)
            if (!slugEdited) setCurrentSlug(slugify(event.target.value))
          }}
          className="admin-input"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Slug
        <input
          required
          name="slug"
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          value={currentSlug}
          onChange={(event) => {
            setSlugEdited(true)
            setCurrentSlug(slugify(event.target.value))
          }}
          className="admin-input"
        />
        <span className="text-xs font-normal text-muted-foreground">
          Changing this slug changes the public URL.
        </span>
      </label>
    </div>
  )
}
