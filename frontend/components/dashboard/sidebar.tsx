"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Shield, 
  User, 
  Users, 
  Brain, 
  Bell, 
  AlertTriangle, 
  CreditCard, 
  Calendar,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardSidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

const navItems = [
  { href: "/dashboard", icon: User, label: "Profile" },
  { href: "/dashboard/patients", icon: Users, label: "Your Patients" },
  { href: "/dashboard/resistai", icon: Brain, label: "ResistAI" },
  { href: "/dashboard/alerts", icon: Bell, label: "Alerts" },
  { href: "/dashboard/sos", icon: AlertTriangle, label: "SOS" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
  { href: "/dashboard/appointments", icon: Calendar, label: "Appointments" },
]

export function DashboardSidebar({ isCollapsed, onToggle }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-card border-r border-border z-40 transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-primary">
                ResistAI
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  isCollapsed && "justify-center px-2"
                )}>
                  <item.icon className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive && "text-primary"
                  )} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn(
              "w-full justify-center text-muted-foreground hover:text-foreground",
              !isCollapsed && "justify-start"
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5 mr-2" />
                Collapse
              </>
            )}
          </Button>
        </div>
      </div>
    </aside>
  )
}
