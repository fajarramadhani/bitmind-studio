import assert from "node:assert/strict"
import test from "node:test"
import {
  validateProductForm,
  validateProjectForm,
} from "../src/lib/admin/validation.ts"

function projectForm(overrides: Record<string, string> = {}) {
  const form = new FormData()
  const values = {
    title: "Test Project",
    slug: "test-project",
    category: "Corporate Website",
    short_description: "A clear project description.",
    project_kind: "client",
    client: "Test Client",
    publish_status: "draft",
    year: "2026",
    sort_order: "0",
    ...overrides,
  }
  Object.entries(values).forEach(([key, value]) => form.set(key, value))
  return form
}

function productForm(overrides: Record<string, string> = {}) {
  const form = new FormData()
  const values = {
    title: "Test Product",
    slug: "test-product",
    category: "Template",
    short_description: "A clear product description.",
    availability_status: "coming-soon",
    publish_status: "draft",
    sort_order: "0",
    currency: "idr",
    ...overrides,
  }
  Object.entries(values).forEach(([key, value]) => form.set(key, value))
  return form
}

test("concept projects do not require a client", () => {
  const result = validateProjectForm(
    projectForm({ project_kind: "concept", client: "" })
  )
  assert.equal(result.project_kind, "concept")
  assert.equal(result.client, null)
})

test("client projects require a client", () => {
  assert.throws(
    () => validateProjectForm(projectForm({ client: "" })),
    /require a client name/
  )
})

test("invalid project status is rejected", () => {
  assert.throws(
    () =>
      validateProjectForm(projectForm({ publish_status: "public" })),
    /Invalid publish status/
  )
})

test("invalid project URLs are rejected", () => {
  assert.throws(
    () => validateProjectForm(projectForm({ live_url: "javascript:alert(1)" })),
    /HTTP or HTTPS/
  )
})

test("product availability and publication are independent", () => {
  const result = validateProductForm(
    productForm({
      availability_status: "coming-soon",
      publish_status: "published",
    })
  )
  assert.equal(result.availability_status, "coming-soon")
  assert.equal(result.publish_status, "published")
})

test("product currency is normalized", () => {
  assert.equal(validateProductForm(productForm()).currency, "IDR")
})

test("invalid product currency is rejected", () => {
  assert.throws(
    () => validateProductForm(productForm({ currency: "rupiah" })),
    /three-letter ISO code/
  )
})

test("purchase URLs require HTTP or HTTPS", () => {
  assert.throws(
    () => validateProductForm(productForm({ purchase_url: "ftp://example.com" })),
    /HTTP or HTTPS/
  )
})
