"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, AlertCircle, CheckCircle, Activity } from "lucide-react"

const stats = [
  {
    title: "Total Predictions",
    value: "1,284",
    change: "+12%",
    changeType: "positive" as const,
    icon: Activity,
    color: "bg-primary"
  },
  {
    title: "Most Resistant",
    value: "MRSA",
    subtitle: "Methicillin-resistant S. aureus",
    icon: AlertCircle,
    color: "bg-accent"
  },
  {
    title: "AI Success Rate",
    value: "94.7%",
    change: "+2.3%",
    changeType: "positive" as const,
    icon: CheckCircle,
    color: "bg-green"
  },
  {
    title: "Active Alerts",
    value: "7",
    change: "-3",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "bg-blue"
  }
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="bg-card border-border rounded-2xl hover:shadow-lg transition-all duration-300 group cursor-pointer"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                {stat.subtitle && (
                  <p className="text-xs text-muted-foreground mt-1 truncate">{stat.subtitle}</p>
                )}
                {stat.change && (
                  <p className={`text-sm mt-2 ${stat.changeType === 'positive' ? 'text-green' : 'text-destructive'}`}>
                    {stat.change} from last month
                  </p>
                )}
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
