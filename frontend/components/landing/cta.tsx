"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto relative">
        {/* Card */}
        <div className="relative bg-card rounded-3xl p-12 text-center border border-border shadow-lg">
          {/* Soft decorative elements */}
          <div className="absolute top-4 right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
          <div className="absolute bottom-4 left-4 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Start Free Trial</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Ready to Transform Your
              <br />
              <span className="text-primary">
                Clinical Decision Making?
              </span>
            </h2>
            
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-pretty">
              Join hundreds of healthcare institutions already using ResistAI to combat
              antibiotic resistance and improve patient outcomes.
            </p>
            
            <Link href="/login">
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 text-base px-8"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
