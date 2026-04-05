"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, AlertTriangle, Info, CheckCircle, Clock, Filter, MoreHorizontal, Send, Smartphone } from "lucide-react"
import { toast } from "sonner"

const alerts = [
  {
    id: 1,
    type: "critical",
    title: "High Resistance Pattern Detected",
    description: "Patient P-2024-001 shows multi-drug resistant E. coli strain. Immediate review recommended.",
    time: "10 minutes ago",
    read: false
  },
  {
    id: 2,
    type: "warning",
    title: "Culture Results Ready",
    description: "Lab results for patient P-2024-003 are now available. Sensitivity testing complete.",
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    type: "info",
    title: "New AI Model Update",
    description: "ResistAI prediction model v2.4 has been deployed with improved accuracy for gram-negative bacteria.",
    time: "2 hours ago",
    read: true
  },
  {
    id: 4,
    type: "success",
    title: "Treatment Success Confirmed",
    description: "Patient P-2024-002 shows positive response to recommended antibiotic therapy.",
    time: "4 hours ago",
    read: true
  },
  {
    id: 5,
    type: "warning",
    title: "Antibiotic Interaction Alert",
    description: "Potential drug interaction detected for patient P-2024-005. Review current medications.",
    time: "5 hours ago",
    read: false
  },
  {
    id: 6,
    type: "info",
    title: "Weekly Resistance Report",
    description: "Your weekly antibiotic resistance summary is ready for review.",
    time: "1 day ago",
    read: true
  },
  {
    id: 7,
    type: "critical",
    title: "Outbreak Alert",
    description: "Increased MRSA cases detected in ICU ward. Enhanced precautions recommended.",
    time: "2 days ago",
    read: true
  }
]

const typeConfig = {
  critical: {
    icon: AlertTriangle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    badge: "bg-destructive/10 text-destructive border-destructive/30"
  },
  warning: {
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    badge: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
  },
  info: {
    icon: Info,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    badge: "bg-primary/10 text-primary border-primary/30"
  },
  success: {
    icon: CheckCircle,
    color: "text-green",
    bg: "bg-green/10",
    border: "border-green/30",
    badge: "bg-green/10 text-green border-green/30"
  }
}

export default function AlertsPage() {
  const unreadCount = alerts.filter(a => !a.read).length
  const [mobileNumber, setMobileNumber] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleSendNotification = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      toast.error("Please enter a valid mobile number")
      return
    }

    setIsSending(true)
    // Simulate API call
    setTimeout(() => {
      setIsSending(false)
      toast.success(`Notifications sent successfully to ${mobileNumber}`)
      setMobileNumber("")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Bell className="w-7 h-7 text-primary" />
            Alerts & Notifications
          </h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `You have ${unreadCount} unread alerts` : 'All caught up!'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border bg-card">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-border bg-card">
            Mark All Read
          </Button>
        </div>
      </div>

      {/* SMS Feature Card */}
      <Card className="bg-card border-border rounded-2xl bg-gradient-to-br from-primary/10 via-background to-background">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground flex items-center gap-2 text-lg">
            <Smartphone className="w-5 h-5 text-primary" />
            SMS Alert Notifications
          </CardTitle>
          <CardDescription>Get critical alerts and patient updates directly on your phone.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="space-y-2 flex-1 max-w-sm">
              <label className="text-sm font-medium text-foreground">Mobile Number</label>
              <Input 
                type="tel" 
                placeholder="e.g. +1 234 567 8900" 
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="h-11 bg-muted border-border rounded-xl"
              />
            </div>
            <Button 
              onClick={handleSendNotification}
              disabled={isSending}
              className="h-11 bg-primary text-primary-foreground hover:bg-primary/90 px-6 rounded-xl transition-all duration-300 w-full sm:w-auto"
            >
              {isSending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Notifications
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alerts list */}
      <Card className="bg-card border-border rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground">Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert) => {
            const config = typeConfig[alert.type as keyof typeof typeConfig]
            const Icon = config.icon

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md cursor-pointer ${
                  alert.read 
                    ? 'bg-muted/30 border-border' 
                    : `${config.bg} ${config.border}`
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`font-medium ${alert.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                            {alert.title}
                          </h3>
                          {!alert.read && (
                            <span className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className={`text-sm mt-1 ${alert.read ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                          {alert.description}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                      <Badge variant="outline" className={`text-xs capitalize ${config.badge}`}>
                        {alert.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
