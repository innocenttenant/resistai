"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, Filter, Users } from "lucide-react"
import Link from "next/link"

const patients = [
  { id: "P-2024-001", name: "John Mitchell", age: 67, condition: "UTI", status: "critical", lastUpdate: "2 hours ago", doctor: "Dr. Chen" },
  { id: "P-2024-002", name: "Maria Garcia", age: 45, condition: "Pneumonia", status: "stable", lastUpdate: "4 hours ago", doctor: "Dr. Chen" },
  { id: "P-2024-003", name: "Robert Chen", age: 52, condition: "Sepsis", status: "improving", lastUpdate: "1 hour ago", doctor: "Dr. Chen" },
  { id: "P-2024-004", name: "Emily Johnson", age: 34, condition: "Skin Infection", status: "stable", lastUpdate: "6 hours ago", doctor: "Dr. Chen" },
  { id: "P-2024-005", name: "David Brown", age: 71, condition: "Respiratory", status: "critical", lastUpdate: "30 mins ago", doctor: "Dr. Chen" },
  { id: "P-2024-006", name: "Lisa Wong", age: 29, condition: "Wound Infection", status: "improving", lastUpdate: "3 hours ago", doctor: "Dr. Chen" },
  { id: "P-2024-007", name: "Michael Adams", age: 58, condition: "UTI", status: "stable", lastUpdate: "5 hours ago", doctor: "Dr. Chen" },
  { id: "P-2024-008", name: "Sarah Miller", age: 42, condition: "Bacteremia", status: "improving", lastUpdate: "1 day ago", doctor: "Dr. Chen" },
]

const statusColors = {
  critical: "bg-destructive/10 text-destructive border-destructive/30",
  stable: "bg-primary/10 text-primary border-primary/30",
  improving: "bg-green/10 text-green border-green/30"
}

const LiveEcgGraph = () => (
  <div className="w-full h-12 mt-4 relative overflow-hidden rounded-lg bg-destructive/5 border border-destructive/20 flex items-center">
    <div className="absolute inset-y-0 left-0 w-[200%] flex animate-ecg text-destructive/80 drop-shadow-[0_0_2px_rgba(239,68,68,0.8)]">
      <svg className="h-full w-1/2" viewBox="0 0 100 24" preserveAspectRatio="none">
         <polyline fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" points="0,12 10,12 15,12 18,4 22,20 26,12 40,12 45,12 48,4 52,20 56,12 70,12 75,12 78,4 82,20 86,12 100,12" />
      </svg>
      <svg className="h-full w-1/2" viewBox="0 0 100 24" preserveAspectRatio="none">
         <polyline fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" points="0,12 10,12 15,12 18,4 22,20 26,12 40,12 45,12 48,4 52,20 56,12 70,12 75,12 78,4 82,20 86,12 100,12" />
      </svg>
    </div>
    <div className="absolute top-1 right-2 flex items-center gap-1 z-10 bg-background/50 px-1 rounded">
      <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
      <span className="text-[10px] text-destructive font-mono font-bold tracking-widest opacity-90">LIVE</span>
    </div>
  </div>
)

export default function PatientsPage() {
  return (
    <div className="space-y-6">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ecg {
          animation: slide-left 2s linear infinite;
        }
      `}} />
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Your Patients</h1>
          <p className="text-muted-foreground">Manage and monitor your patient cases</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search patients by name or ID..." 
            className="pl-9 h-11 bg-muted border-border rounded-xl"
          />
        </div>
        <Button variant="outline" className="border-border bg-card">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Patient list */}
      <Card className="bg-card border-border rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Users className="w-5 h-5 text-primary" />
            All Patients ({patients.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {patients.map((patient) => (
              <Link key={patient.id} href={`/dashboard/patients/${patient.id}`}>
                <div className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 hover:bg-muted transition-all duration-300 hover:shadow-md cursor-pointer group h-full">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12 border border-border">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                          {patient.name}
                        </h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {patient.id} - Age {patient.age}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{patient.condition}</p>
                      <Badge 
                        variant="outline" 
                        className={`text-xs capitalize ${statusColors[patient.status as keyof typeof statusColors]}`}
                      >
                        {patient.status}
                      </Badge>
                    </div>
                    {patient.status === 'critical' && <LiveEcgGraph />}
                    <p className="text-xs text-muted-foreground/70 mt-3">
                      Updated {patient.lastUpdate}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
