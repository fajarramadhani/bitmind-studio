import { cn } from "@/lib/utils"

type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
  as?: "section" | "div"
}

export function Section({
  children,
  className,
  id,
  as: Component = "section",
}: SectionProps) {
  return (
    <Component id={id} className={cn("py-16 md:py-24", className)}>
      {children}
    </Component>
  )
}
