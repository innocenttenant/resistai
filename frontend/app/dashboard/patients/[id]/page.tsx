"use client"

import { use } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Activity, 
  FileText, 
  Brain,
  Clock,
  AlertTriangle
} from "lucide-react"

// Mock patient data
const patientData: Record<string, {
  id: string
  name: string
  age: number
  gender: string
  condition: string
  status: "critical" | "stable" | "improving"
  admissionDate: string
  doctor: string
  room: string
  diagnosis: string
  history: { date: string; event: string }[]
  medications: { name: string; dosage: string; frequency: string }[]
}> = {
  "P-2024-001": {
    id: "P-2024-001",
    name: "John Mitchell",
    age: 67,
    gender: "Male",
    condition: "UTI",
    status: "critical",
    admissionDate: "Mar 15, 2024",
    doctor: "Dr. Sarah Chen",
    room: "Room 312",
    diagnosis: "Multi-drug resistant E. coli urinary tract infection",
    history: [
      { date: "Mar 20", event: "AI resistance prediction completed" },
      { date: "Mar 19", event: "Culture results received" },
      { date: "Mar 17", event: "Initial antibiotics started" },
      { date: "Mar 15", event: "Patient admitted" }
    ],
    medications: [
      { name: "Piperacillin-Tazobactam", dosage: "4.5g", frequency: "Every 6 hours" },
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" }
    ]
  }
}

const statusColors = {
  critical: "bg-destructive/10 text-destructive border-destructive/30",
  stable: "bg-primary/10 text-primary border-primary/30",
  improving: "bg-green/10 text-green border-green/30"
}

export default function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const patient = patientData[id] || {
    id,
    name: "Unknown Patient",
    age: 0,
    gender: "Unknown",
    condition: "Unknown",
    status: "stable" as const,
    admissionDate: "N/A",
    doctor: "N/A",
    room: "N/A",
    diagnosis: "No diagnosis available",
    history: [],
    medications: []
  }

  return (
    <div className="space-y-6">
      {/* Back button and header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/patients">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Patient Details</h1>
          <p className="text-muted-foreground">{patient.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Info - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <Card className="bg-card border-border rounded-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <Avatar className="w-20 h-20 border-2 border-primary/30">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-2xl font-bold text-foreground">{patient.name}</h2>
                    <Badge 
                      variant="outline" 
                      className={`capitalize ${statusColors[patient.status]}`}
                    >
                      {patient.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1">
                    {patient.age} years old - {patient.gender}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Condition</p>
                      <p className="text-sm font-medium text-foreground">{patient.condition}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Room</p>
                      <p className="text-sm font-medium text-foreground">{patient.room}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Admitted</p>
                      <p className="text-sm font-medium text-foreground">{patient.admissionDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Doctor</p>
                      <p className="text-sm font-medium text-foreground">{patient.doctor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Diagnosis */}
          <Card className="bg-card border-border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Diagnosis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{patient.diagnosis}</p>
              <div className="mt-4">
                <Link href="/dashboard/resistai">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Brain className="w-4 h-4 mr-2" />
                    Run AI Analysis
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Medications */}
          <Card className="bg-card border-border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Activity className="w-5 h-5 text-green" />
                Current Medications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {patient.medications.map((med, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-muted/50 border border-border"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{med.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {med.dosage} - {med.frequency}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-card border-border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-border">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start border-border">
                <FileText className="w-4 h-4 mr-2" />
                Add Notes
              </Button>
              <Button variant="outline" className="w-full justify-start border-border">
                <User className="w-4 h-4 mr-2" />
                Contact Family
              </Button>
              <Link href="/dashboard/sos" className="block">
                <Button variant="outline" className="w-full justify-start border-destructive/50 text-destructive hover:bg-destructive/10">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Emergency Alert
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="bg-card border-border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.history.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {index < patient.history.length - 1 && (
                        <div className="w-px h-full bg-border my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                      <p className="text-sm text-foreground">{event.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
