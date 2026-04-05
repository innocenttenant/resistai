"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users } from "lucide-react"
import Link from "next/link"

const patients = [
  {
    id: "P-2024-001",
    name: "John Mitchell",
    age: 67,
    condition: "UTI",
    status: "critical",
    lastUpdate: "2 hours ago"
  },
  {
    id: "P-2024-002", 
    name: "Maria Garcia",
    age: 45,
    condition: "Pneumonia",
    status: "stable",
    lastUpdate: "4 hours ago"
  },
  {
    id: "P-2024-003",
    name: "Robert Chen",
    age: 52,
    condition: "Sepsis",
    status: "improving",
    lastUpdate: "1 hour ago"
  },
  {
    id: "P-2024-004",
    name: "Emily Johnson",
    age: 34,
    condition: "Skin Infection",
    status: "stable",
    lastUpdate: "6 hours ago"
  },
  {
    id: "P-2024-005",
    name: "David Brown",
    age: 71,
    condition: "Respiratory",
    status: "critical",
    lastUpdate: "30 mins ago"
  },
  {
    id: "P-2024-006",
    name: "Lisa Wong",
    age: 29,
    condition: "Wound Infection",
    status: "improving",
    lastUpdate: "3 hours ago"
  }
]

const statusColors = {
  critical: "bg-destructive/10 text-destructive border-destructive/30",
  stable: "bg-primary/10 text-primary border-primary/30",
  improving: "bg-green/10 text-green border-green/30"
}

export function PatientCards() {
  return (
    <Card className="bg-card border-border rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="w-5 h-5 text-primary" />
          Recent Patients
        </CardTitle>
        <Link 
          href="/dashboard/patients" 
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          View All
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {patients.map((patient) => (
            <Link key={patient.id} href={`/dashboard/patients/${patient.id}`}>
              <div className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 hover:bg-muted transition-all duration-300 hover:shadow-md cursor-pointer group">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {patient.name}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs capitalize ${statusColors[patient.status as keyof typeof statusColors]}`}
                      >
                        {patient.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {patient.id} - Age {patient.age}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {patient.condition}
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Updated {patient.lastUpdate}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
