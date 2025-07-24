"use client"

import { useRouter, useParams, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function ConfigReportHistoryPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  
  const configId = params.configId as string
  const configName = searchParams.get("name")

  useEffect(() => {
    // Redirect to the new configuration history page
    const newUrl = `/reports/configurations/${configId}/history${configName ? `?name=${encodeURIComponent(configName)}` : ''}`
    router.replace(newUrl)
  }, [router, configId, configName])

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="text-center">
        <p className="text-gray-600">Redirecting to configuration history...</p>
      </div>
    </div>
  )
}
