"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Video, User } from "lucide-react"

const appointments = [
  {
    time: "09:00 AM",
    title: "Patient Review - J. Mitchell",
    type: "in-person",
    duration: "30 min"
  },
  {
    time: "10:30 AM",
    title: "AI Analysis Review",
    type: "virtual",
    duration: "45 min"
  },
  {
    time: "02:00 PM",
    title: "Lab Results - M. Garcia",
    type: "in-person",
    duration: "20 min"
  },
  {
    time: "04:00 PM",
    title: "Team Consultation",
    type: "virtual",
    duration: "1 hour"
  }
]

const notes = [
  "Review MRSA treatment protocol updates",
  "Check on P-2024-001 culture results",
  "Prepare weekly resistance report"
]

export function SchedulePanel() {
  return (
    <div className="space-y-4">
      {/* Today's Schedule */}
      <Card className="bg-card border-border rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-foreground text-lg">
            <Calendar className="w-5 h-5 text-primary" />
            {"Today's Schedule"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {appointments.map((apt, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-16 text-center flex-shrink-0">
                <p className="text-sm font-medium text-primary">{apt.time}</p>
                <p className="text-xs text-muted-foreground">{apt.duration}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{apt.title}</p>
                <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                  {apt.type === 'virtual' ? (
                    <Video className="w-3 h-3" />
                  ) : (
                    <User className="w-3 h-3" />
                  )}
                  <span className="text-xs capitalize">{apt.type}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Notes */}
      <Card className="bg-card border-border rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-foreground text-lg">
            <Clock className="w-5 h-5 text-accent" />
            Quick Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {notes.map((note, index) => (
              <li 
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                {note}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
