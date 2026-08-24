import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { products } from "../src/data/products.ts"
import {
  MOMENTS_PRODUCT_SLUG,
  MONEARA_PRODUCT_SLUG,
  getProductHref,
} from "../src/lib/product-presentation.ts"

const seed = await readFile(
  new URL("../supabase/seed.sql", import.meta.url),
  "utf8"
)

test("local product inventory contains the current public product directions", () => {
  assert.deepEqual(
    products.map((product) => product.slug),
    [MOMENTS_PRODUCT_SLUG, MONEARA_PRODUCT_SLUG]
  )
})

test("seed inventory matches the current local product directions", () => {
  assert.match(seed, /'bitmind-moments'/)
  assert.match(seed, /'moneara'/)
  assert.doesNotMatch(seed, /'bitmind-website-starter'/)
  assert.doesNotMatch(seed, /'landing-page-kit'/)
})

test("moments product resolves to the dedicated /moments route", () => {
  assert.equal(getProductHref(MOMENTS_PRODUCT_SLUG), "/moments")
  assert.equal(getProductHref({ slug: MONEARA_PRODUCT_SLUG }), "/products/moneara")
})
