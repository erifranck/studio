"use client"

import * as React from "react"
import { useSwipeable } from "react-swipeable"
import { ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { ScrollArea } from "./scroll-area"

interface FormWizardProps {
  children: React.ReactNode[]
  className?: string
  onComplete?: () => void
}

export function FormWizard({ children, className, onComplete }: FormWizardProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const totalSteps = React.Children.count(children)

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1)
      }
    },
    onSwipedRight: () => {
      if (currentStep > 0) {
        setCurrentStep(prev => prev - 1)
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true
  })

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    } else if (onComplete) {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div className={cn("flex h-full w-full", className)}>
      {/* Sidebar Navigation */}
      <div 
        className={cn(
          "border-r bg-muted/50 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-48" : "w-0"
        )}
      >
        <div className={cn(
          "h-full transition-opacity duration-300",
          isSidebarOpen ? "opacity-100" : "opacity-0"
        )}>
          <ScrollArea className="h-full max-w-full">
            <nav className="space-y-2 p-4">
              {React.Children.map(children, (child, index) => {
                if (!React.isValidElement(child)) return null
                const title = child.props.title || `Step ${index + 1}`
                return (
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md transition-colors text-sm",
                      currentStep === index
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    {title}
                  </button>
                )
              })}
            </nav>
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between p-2 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="h-8 w-8"
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeftOpen className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div {...handlers} className="flex-1 overflow-hidden">
          <div
            className="h-full transition-transform duration-300 ease-in-out max-w-full"
            style={{
              transform: `translateX(-${currentStep * 100}%)`,
              display: "flex"
            }}
          >
            {React.Children.map(children, (child) => (
              <div className="w-full h-full flex-shrink-0 p-4">
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between p-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1 && !onComplete}
          >
            {currentStep === totalSteps - 1 ? "Complete" : "Next"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 