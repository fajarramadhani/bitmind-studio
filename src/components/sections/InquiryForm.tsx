"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import {
  budgetOptions,
  projectTypeOptions,
  serviceSlugToProjectType,
  timelineOptions,
} from "@/data/inquiry"
import { Button } from "@/components/ui/Button"

type FormData = {
  name: string
  email: string
  whatsapp: string
  company: string
  projectType: string
  budget: string
  timeline: string
  description: string
  reference: string
}

export function InquiryForm() {
  const searchParams = useSearchParams()
  const service = searchParams.get("service")
  const preselected =
    service && serviceSlugToProjectType[service]
      ? serviceSlugToProjectType[service]
      : ""

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    company: "",
    projectType: preselected,
    budget: "",
    timeline: "",
    description: "",
    reference: "",
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {/* Name & Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid min-w-0 gap-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="h-12 w-full min-w-0 rounded-lg border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="Your name"
          />
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="h-12 w-full min-w-0 rounded-lg border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="hello@company.com"
          />
        </div>
      </div>

      {/* WhatsApp & Company */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid min-w-0 gap-2">
          <label htmlFor="whatsapp" className="text-sm font-medium text-foreground">
            WhatsApp (Optional)
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="text"
            value={formData.whatsapp}
            onChange={handleChange}
            className="h-12 w-full min-w-0 rounded-lg border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="Your WhatsApp number"
          />
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor="company" className="text-sm font-medium text-foreground">
            Company / Brand (Optional)
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className="h-12 w-full min-w-0 rounded-lg border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="Company name"
          />
        </div>
      </div>

      {/* Project Type, Budget, Timeline */}
      <div className="grid min-w-0 gap-4 xl:grid-cols-3">
        <div className="grid min-w-0 gap-2">
          <label htmlFor="projectType" className="text-sm font-medium text-foreground">
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
            className="h-12 w-full min-w-0 rounded-lg border border-border bg-surface px-4 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <option value="">Select type</option>
            {projectTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor="budget" className="text-sm font-medium text-foreground">
            Estimated Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            className="h-12 w-full min-w-0 rounded-lg border border-border bg-surface px-4 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <option value="">Select budget</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor="timeline" className="text-sm font-medium text-foreground">
            Target Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            required
            className="h-12 w-full min-w-0 rounded-lg border border-border bg-surface px-4 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <option value="">Select timeline</option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="grid min-w-0 gap-2">
        <label htmlFor="description" className="text-sm font-medium text-foreground">
          Project Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={6}
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full min-w-0 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="Tell us about your project..."
        />
      </div>

      {/* Reference Website */}
      <div className="grid min-w-0 gap-2">
        <label htmlFor="reference" className="text-sm font-medium text-foreground">
          Reference Website (Optional)
        </label>
        <input
          id="reference"
          name="reference"
          type="text"
          value={formData.reference}
          onChange={handleChange}
          className="h-12 w-full min-w-0 rounded-lg border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="https://example.com"
        />
      </div>

      {/* Submit Button */}
      <div className="flex flex-col gap-3 pt-4">
        <Button
          type="submit"
          size="lg"
          disabled
          aria-describedby="inquiry-status"
        >
          Tell Us About Your Project
        </Button>
        <p id="inquiry-status" role="status" className="text-sm text-muted-foreground">
          Online submission is not active yet. The form will be connected to the
          inquiry backend in the integration phase.
        </p>
      </div>
    </form>
  )
}
