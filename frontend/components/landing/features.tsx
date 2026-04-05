"use client"

import { Brain, Shield, Activity, Database } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning models trained on millions of resistance patterns for accurate predictions.",
    color: "bg-primary"
  },
  {
    icon: Shield,
    title: "Resistance Detection",
    description: "Identify resistant bacterial strains early and optimize antibiotic selection for better outcomes.",
    color: "bg-blue"
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Track resistance trends and receive instant alerts on emerging patterns in your facility.",
    color: "bg-accent"
  },
  {
    icon: Database,
    title: "Comprehensive Database",
    description: "Access a vast repository of antibiotic resistance data from healthcare institutions worldwide.",
    color: "bg-green"
  }
]

export function Features() {
  return (
    <section className="py-24 px-6 relative bg-muted/30">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Powerful Features for{" "}
            <span className="text-primary">
              Modern Healthcare
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our platform combines cutting-edge AI technology with clinical expertise
            to deliver actionable insights for healthcare professionals.
          </p>
        </div>
        
        {/* Feature cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg rounded-2xl overflow-hidden bg-card border-border"
            >
              <CardContent className="p-6">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${feature.color} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-full h-full text-primary-foreground" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
