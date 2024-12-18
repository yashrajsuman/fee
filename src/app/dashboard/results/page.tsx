import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { DashboardShell } from "@/components/dashboard-shell"
import { ResultsOverview } from "@/components/results-overview"
import { SemesterResults } from "@/components/semester-results"

export default function ResultsPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <div className="flex-1">
        <DashboardHeader />
        <DashboardShell>
          <div className="grid gap-8">
            <ResultsOverview />
            <SemesterResults />
          </div>
        </DashboardShell>
      </div>
    </div>
  )
}

