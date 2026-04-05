"use client"

import { Upload, Cpu, FileCheck, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Input Data",
    description: "Upload patient samples, bacterial cultures, or genomic data through our secure interface.",
    color: "bg-primary",
    textColor: "text-primary"
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description: "Our advanced algorithms process the data using multiple prediction models simultaneously.",
    color: "bg-accent",
    textColor: "text-accent"
  },
  {
    icon: FileCheck,
    title: "Smart Recommendation",
    description: "Receive actionable insights with antibiotic recommendations ranked by effectiveness.",
    color: "bg-green",
    textColor: "text-green"
  }
]

export function HowItWorks() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Subtle divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            How{" "}
            <span className="text-primary">
              ResistAI
            </span>
            {" "}Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
            A simple three-step process to get AI-powered antibiotic resistance predictions.
          </p>
        </div>
        
        {/* Steps */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4 lg:gap-2">
              {/* Step card */}
              <div className="flex flex-col items-center text-center max-w-xs">
                {/* Step number */}
                <div className="text-sm font-medium text-muted-foreground mb-4">
                  Step {index + 1}
                </div>
                
                {/* Icon container */}
                <div className={`
                  w-20 h-20 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center mb-6
                  transition-all duration-300 hover:scale-110 hover:shadow-md
                `}>
                  <step.icon className={`w-10 h-10 ${step.textColor}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Arrow (not after last step) */}
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block w-8 h-8 text-border flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
