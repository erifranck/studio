"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface FormWizardStepProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function FormWizardStep({ title, children, className }: FormWizardStepProps) {
  return (
    <div className={cn("h-full", className)}>
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  )
} 