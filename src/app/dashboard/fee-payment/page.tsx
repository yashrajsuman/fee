import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { DashboardShell } from "@/components/dashboard-shell"
import { FeePaymentForm } from "@/components/fee-payment-form"
import { FeeStatus } from "@/components/fee-status"

export default function FeePaymentPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <div className="flex-1">
        <DashboardHeader />
        <DashboardShell>
          <div className="grid gap-8">
            <FeeStatus />
            <FeePaymentForm />
          </div>
        </DashboardShell>
      </div>
    </div>
  )
}

