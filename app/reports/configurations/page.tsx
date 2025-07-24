"use client"

import { useRouter } from "next/navigation"
import ReportConfiguration from "@/components/report-configuration"

export default function ConfigurationsPage() {
  const router = useRouter()

  const handleViewHistory = (configId: string | number, configName: string) => {
    router.push(`/reports/configurations/${configId.toString()}/history?name=${encodeURIComponent(configName)}`)
  }

  const handleCreateConfiguration = () => {
    router.push("/reports/configurations/create")
  }

  const handleBack = () => {
    router.push("/reports")
  }

  return (
    <div className="min-h-screen">
      {/* Navigation header */}
      <div className="border-b bg-white">
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Report Configurations</h1>
              <p className="text-gray-600">Manage automated and manual report configurations</p>
            </div>
          </div>
        </div>
      </div>
      
      <ReportConfiguration 
        onViewHistory={handleViewHistory}
        onCreateConfiguration={handleCreateConfiguration}
      />
    </div>
  )
}
