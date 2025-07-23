"use client"

import { useState } from "react"
import ReportConfiguration from "./report-configuration"
import ReportHistory from "./report-history"

export default function ReportsNavigation() {
  const [currentView, setCurrentView] = useState("configuration")
  const [selectedConfigId, setSelectedConfigId] = useState(null)
  const [selectedConfigName, setSelectedConfigName] = useState(null)

  const handleViewHistory = (configId, configName) => {
    setSelectedConfigId(configId)
    setSelectedConfigName(configName)
    setCurrentView("history")
  }

  const handleBackToConfiguration = () => {
    setCurrentView("configuration")
    setSelectedConfigId(null)
    setSelectedConfigName(null)
  }

  if (currentView === "history") {
    return <ReportHistory configId={selectedConfigId} configName={selectedConfigName} onBack={handleBackToConfiguration} />
  }

  return (
    <div className="min-h-screen">

      <ReportConfiguration onViewHistory={handleViewHistory} />
    </div>
  )
}
