"use client"

import { useRouter, useParams, useSearchParams } from "next/navigation"
import ReportHistory from "@/components/report-history"

export default function ConfigurationHistoryPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  
  const configId = params.configId as string
  const configName = searchParams.get("name")

  const handleBack = () => {
    router.push(`/reports/configurations/${configId}`)
  }

  const handleViewConfiguration = (configIdParam: string) => {
    router.push(`/reports/configurations/${configIdParam}`)
  }

  return (
    <ReportHistory 
      configId={configId} 
      configName={configName} 
      onBack={handleBack}
      showBackButton={true}
      onViewConfiguration={handleViewConfiguration}
    />
  )
}
