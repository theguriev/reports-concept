"use client"

import { useRouter } from "next/navigation"
import ReportConfiguration from "@/components/report-configuration"

export default function ReportsPage() {
  const router = useRouter()

  const handleViewHistory = (configId: string | number, configName: string) => {
    router.push(`/reports/history/${configId.toString()}?name=${encodeURIComponent(configName)}`)
  }

  const handleViewAllHistory = () => {
    router.push("/reports/history")
  }

  return (
    <ReportConfiguration 
      onViewHistory={handleViewHistory} 
      onViewAllHistory={handleViewAllHistory} 
    />
  )
}
