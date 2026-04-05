import { StatsCards } from "@/components/dashboard/stats-cards"
import { PatientCards } from "@/components/dashboard/patient-cards"
import { SchedulePanel } from "@/components/dashboard/schedule-panel"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Dr. Chen. Here&apos;s your overview.</p>
      </div>

      {/* Stats Grid */}
      <StatsCards />

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Patients section - 2 columns */}
        <div className="xl:col-span-2">
          <PatientCards />
        </div>

        {/* Schedule panel - 1 column */}
        <div className="xl:col-span-1">
          <SchedulePanel />
        </div>
      </div>
    </div>
  )
}
