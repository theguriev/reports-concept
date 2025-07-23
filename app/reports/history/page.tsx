"use client"

import { useRouter } from "next/navigation"
import ReportHistory from "@/components/report-history"

export default function AllReportsHistoryPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/reports")
  }

  return (
    <ReportHistory 
      configId={null} 
      configName={null} 
      onBack={handleBack} 
    />
  )
}
