import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { DashboardShell } from "@/components/dashboard-shell"
import { StudentInfo } from "@/components/student-info"
import { StudentStats } from "@/components/student-status"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <div className="flex-1">
        <DashboardHeader />
        <DashboardShell>
          <StudentInfo />
          <StudentStats />
        </DashboardShell>
      </div>
    </div>
  )
}

