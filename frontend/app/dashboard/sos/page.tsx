"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, Phone, MapPin, Clock, CheckCircle } from "lucide-react"

export default function SOSPage() {
  const [isActivated, setIsActivated] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  const handleSOSClick = () => {
    if (!isConfirming) {
      setIsConfirming(true)
    } else {
      setIsActivated(true)
      // In a real app, this would trigger emergency protocols
    }
  }

  const handleCancel = () => {
    setIsConfirming(false)
    setIsActivated(false)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-7 h-7 text-destructive" />
          Emergency SOS
        </h1>
        <p className="text-muted-foreground">Immediate assistance for critical situations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SOS Button Section */}
        <Card className="bg-card border-border rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-foreground">Emergency Alert</CardTitle>
            <CardDescription>
              Press the button below to send an immediate alert to the emergency response team
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6 py-8">
            {isActivated ? (
              <>
                {/* Activated state */}
                <div className="w-48 h-48 rounded-full bg-green/20 flex items-center justify-center animate-pulse">
                  <div className="w-40 h-40 rounded-full bg-green/30 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-green flex items-center justify-center">
                      <CheckCircle className="w-16 h-16 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-green">Alert Sent Successfully</h3>
                  <p className="text-muted-foreground mt-2">Emergency team has been notified</p>
                  <p className="text-sm text-muted-foreground mt-1">Help is on the way</p>
                </div>
                <Button 
                  onClick={handleCancel}
                  variant="outline"
                  className="border-border"
                >
                  Cancel Emergency
                </Button>
              </>
            ) : (
              <>
                {/* SOS Button with pulsing animation */}
                <button
                  onClick={handleSOSClick}
                  className={`
                    w-48 h-48 rounded-full transition-all duration-300
                    ${isConfirming 
                      ? 'bg-destructive scale-110 animate-pulse-glow' 
                      : 'bg-destructive/80 hover:bg-destructive hover:scale-105'
                    }
                    flex items-center justify-center
                    focus:outline-none focus:ring-4 focus:ring-destructive/50
                  `}
                >
                  <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-destructive-foreground mx-auto" />
                    <span className="text-2xl font-bold text-destructive-foreground mt-2 block">
                      {isConfirming ? 'CONFIRM' : 'SOS'}
                    </span>
                  </div>
                </button>

                <p className="text-center text-muted-foreground max-w-xs">
                  {isConfirming 
                    ? "Press again to confirm emergency alert"
                    : "Press and hold to activate emergency protocol"
                  }
                </p>

                {isConfirming && (
                  <Button 
                    onClick={handleCancel}
                    variant="ghost"
                    className="text-muted-foreground"
                  >
                    Cancel
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Emergency Information */}
        <div className="space-y-6">
          {/* Quick Contact */}
          <Card className="bg-card border-border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                <p className="text-sm text-muted-foreground">Hospital Emergency</p>
                <p className="text-xl font-bold text-foreground">+1 (555) 911-0000</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground">On-Call Supervisor</p>
                <p className="text-lg font-medium text-foreground">+1 (555) 234-5678</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground">Infection Control Team</p>
                <p className="text-lg font-medium text-foreground">+1 (555) 345-6789</p>
              </div>
            </CardContent>
          </Card>

          {/* Location & Status */}
          <Card className="bg-card border-border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Your Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground">Current Location</Label>
                <Input 
                  value="Building A, Floor 3, Room 312"
                  readOnly
                  className="bg-muted border-border rounded-xl"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Last updated: Just now</span>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card className="bg-card border-border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-foreground text-base">Emergency Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Add any additional information for the response team..."
                className="min-h-[100px] bg-muted border-border rounded-xl resize-none"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
