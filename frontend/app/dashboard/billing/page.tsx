"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, Check, Zap } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "For small clinics",
    features: ["100 AI predictions/month", "Basic reporting", "Email support", "1 user"],
    current: false
  },
  {
    name: "Professional",
    price: "$299",
    period: "/month",
    description: "For growing practices",
    features: ["Unlimited predictions", "Advanced analytics", "Priority support", "5 users", "API access"],
    current: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large institutions",
    features: ["Custom limits", "Dedicated support", "On-premise option", "Unlimited users", "Custom integrations"],
    current: false
  }
]

const invoices = [
  { id: "INV-2024-003", date: "Mar 1, 2024", amount: "$299.00", status: "paid" },
  { id: "INV-2024-002", date: "Feb 1, 2024", amount: "$299.00", status: "paid" },
  { id: "INV-2024-001", date: "Jan 1, 2024", amount: "$299.00", status: "paid" },
]

export default function BillingPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <CreditCard className="w-7 h-7 text-primary" />
          Billing & Subscription
        </h1>
        <p className="text-muted-foreground">Manage your subscription and payment methods</p>
      </div>

      {/* Current Plan */}
      <Card className="bg-card border-border rounded-2xl shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">Professional Plan</h3>
                <Badge className="bg-primary/10 text-primary border-primary/30">Active</Badge>
              </div>
              <p className="text-muted-foreground mt-1">Your subscription renews on April 1, 2024</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-border">
                Change Plan
              </Button>
              <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans comparison */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`bg-card border-border rounded-2xl transition-all duration-300 hover:shadow-lg ${
                plan.current ? 'border-primary shadow-md' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">{plan.name}</CardTitle>
                  {plan.current && (
                    <Badge className="bg-primary/10 text-primary border-primary/30">Current</Badge>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-green" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.current 
                      ? 'bg-muted text-muted-foreground cursor-default' 
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <Card className="bg-card border-border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-foreground">Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 rounded bg-blue flex items-center justify-center">
                <span className="text-xs font-bold text-white">VISA</span>
              </div>
              <div>
                <p className="font-medium text-foreground">**** **** **** 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-border">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card className="bg-card border-border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-foreground">Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div 
                key={invoice.id}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-foreground">{invoice.amount}</span>
                  <Badge className="bg-green/10 text-green border-green/30 capitalize">
                    {invoice.status}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
