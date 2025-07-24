"use client"

import { useRouter } from "next/navigation"
import ReportHistory from "@/components/report-history"

export default function ReportsPage() {
  const router = useRouter()

  const handleBack = () => {
    // This is now the main page, so we could go to dashboard or stay here
    router.push("/")
  }

  const handleViewConfiguration = (configId: string) => {
    router.push(`/reports/configurations/${configId}`)
  }

  const handleManageConfigurations = () => {
    router.push("/reports/configurations")
  }

  return (
    <div className="min-h-screen">
      {/* Add navigation header */}
      <div className="border-b bg-white">
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
              <p className="text-gray-600">View all report deliveries and manage configurations</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleManageConfigurations}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Manage Configurations
              </button>
              <button
                onClick={() => router.push("/reports/configurations/create")}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Create New Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content - All reports history */}
      <ReportHistory 
        configId={null}
        configName={null}
        onBack={handleBack}
        showBackButton={false}
        onViewConfiguration={handleViewConfiguration}
      />
    </div>
  )
}