"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Clock, Video, User, MapPin } from "lucide-react"

const appointments = [
  {
    id: 1,
    title: "Patient Review - John Mitchell",
    patient: "P-2024-001",
    type: "in-person",
    date: "Today",
    time: "09:00 AM",
    duration: "30 min",
    location: "Room 312",
    status: "upcoming"
  },
  {
    id: 2,
    title: "AI Analysis Review Session",
    patient: null,
    type: "virtual",
    date: "Today",
    time: "10:30 AM",
    duration: "45 min",
    location: "Zoom Meeting",
    status: "upcoming"
  },
  {
    id: 3,
    title: "Lab Results Discussion - Maria Garcia",
    patient: "P-2024-002",
    type: "in-person",
    date: "Today",
    time: "02:00 PM",
    duration: "20 min",
    location: "Room 305",
    status: "upcoming"
  },
  {
    id: 4,
    title: "Team Consultation",
    patient: null,
    type: "virtual",
    date: "Today",
    time: "04:00 PM",
    duration: "1 hour",
    location: "Microsoft Teams",
    status: "upcoming"
  },
  {
    id: 5,
    title: "Follow-up - Robert Chen",
    patient: "P-2024-003",
    type: "in-person",
    date: "Tomorrow",
    time: "09:30 AM",
    duration: "30 min",
    location: "Room 312",
    status: "scheduled"
  },
  {
    id: 6,
    title: "Weekly Department Meeting",
    patient: null,
    type: "virtual",
    date: "Tomorrow",
    time: "11:00 AM",
    duration: "1 hour",
    location: "Conference Room A",
    status: "scheduled"
  }
]

const statusConfig = {
  upcoming: { color: "bg-primary/10 text-primary border-primary/30", label: "Upcoming" },
  scheduled: { color: "bg-blue/10 text-blue border-blue/30", label: "Scheduled" },
  completed: { color: "bg-green/10 text-green border-green/30", label: "Completed" },
  cancelled: { color: "bg-muted text-muted-foreground border-border", label: "Cancelled" }
}

export default function AppointmentsPage() {
  const todayAppointments = appointments.filter(a => a.date === "Today")
  const upcomingAppointments = appointments.filter(a => a.date !== "Today")

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Calendar className="w-7 h-7 text-primary" />
            Appointments
          </h1>
          <p className="text-muted-foreground">Manage your schedule and patient appointments</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Today's appointments */}
      <Card className="bg-card border-border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            {"Today's Schedule"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {todayAppointments.map((apt) => (
            <div 
              key={apt.id}
              className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Time */}
                <div className="w-24 flex-shrink-0">
                  <p className="text-lg font-semibold text-primary">{apt.time}</p>
                  <p className="text-sm text-muted-foreground">{apt.duration}</p>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px h-12 bg-border" />

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-foreground">{apt.title}</h3>
                      {apt.patient && (
                        <p className="text-sm text-muted-foreground">Patient ID: {apt.patient}</p>
                      )}
                    </div>
                    <Badge variant="outline" className={statusConfig[apt.status as keyof typeof statusConfig].color}>
                      {statusConfig[apt.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      {apt.type === 'virtual' ? (
                        <Video className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <span className="capitalize">{apt.type}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{apt.location}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {apt.type === 'virtual' && (
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Join
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="border-border">
                    Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming appointments */}
      <Card className="bg-card border-border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-foreground">Upcoming</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingAppointments.map((apt) => (
            <div 
              key={apt.id}
              className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Date & Time */}
                <div className="w-24 flex-shrink-0">
                  <p className="text-sm font-medium text-foreground">{apt.date}</p>
                  <p className="text-lg font-semibold text-primary">{apt.time}</p>
                  <p className="text-sm text-muted-foreground">{apt.duration}</p>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px h-12 bg-border" />

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-foreground">{apt.title}</h3>
                      {apt.patient && (
                        <p className="text-sm text-muted-foreground">Patient ID: {apt.patient}</p>
                      )}
                    </div>
                    <Badge variant="outline" className={statusConfig[apt.status as keyof typeof statusConfig].color}>
                      {statusConfig[apt.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      {apt.type === 'virtual' ? (
                        <Video className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <span className="capitalize">{apt.type}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{apt.location}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-border">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm" className="border-border">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
