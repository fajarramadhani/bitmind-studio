"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export type InquiryFormState = {
  status: "idle" | "loading" | "success" | "error"
  message: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitInquiry(
  _prev: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const whatsapp = String(formData.get("whatsapp") ?? "").trim()
  const company = String(formData.get("company") ?? "").trim()
  const projectType = String(formData.get("projectType") ?? "").trim()
  const budget = String(formData.get("budget") ?? "").trim()
  const timeline = String(formData.get("timeline") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()
  const reference = String(formData.get("reference") ?? "").trim()

  if (!name || name.length < 2) {
    return { status: "error", message: "Name is required (minimum 2 characters)." }
  }
  if (!email || !EMAIL_RE.test(email)) {
    return { status: "error", message: "Please provide a valid email address." }
  }
  if (!projectType) {
    return { status: "error", message: "Please select a project type." }
  }
  if (!budget) {
    return { status: "error", message: "Please select an estimated budget." }
  }
  if (!timeline) {
    return { status: "error", message: "Please select a target timeline." }
  }
  if (!description || description.length < 10) {
    return {
      status: "error",
      message: "Project description is required (minimum 10 characters).",
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.from("inquiries").insert({
    name,
    email,
    whatsapp: whatsapp || null,
    company: company || null,
    project_type: projectType,
    budget,
    timeline,
    description,
    reference: reference || null,
    status: "new",
  })

  if (error) {
    console.error("Inquiry submission error:", error)
    return {
      status: "error",
      message:
        "Something went wrong while submitting your inquiry. Please try again or contact us directly.",
    }
  }

  revalidatePath("/contact")

  return {
    status: "success",
    message:
      "Thank you! Your inquiry has been received. We will review it and get back to you shortly.",
  }
}
