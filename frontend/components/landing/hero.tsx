"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Dna, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.45 0.12 200 / 0.08) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.45 0.12 200 / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Soft decorative shapes */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Healthcare</span>
        </div>
        
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-balance">
          <span className="text-foreground">Fighting Antibiotic</span>
          <br />
          <span className="text-primary">
            Resistance with AI
          </span>
        </h1>
        
        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
          ResistAI leverages advanced machine learning to predict antibiotic resistance patterns,
          helping healthcare professionals make smarter treatment decisions and combat the global
          threat of antimicrobial resistance.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 text-base px-8"
            >
              <Zap className="mr-2 h-5 w-5" />
              Get Started
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-border bg-card hover:bg-muted transition-all duration-300 hover:scale-105 text-base px-8"
          >
            <Dna className="mr-2 h-5 w-5" />
            View Demo
          </Button>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: "99.2%", label: "Prediction Accuracy" },
            { value: "500K+", label: "Analyses Performed" },
            { value: "150+", label: "Healthcare Partners" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
