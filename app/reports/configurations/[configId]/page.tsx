"use client"

import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Mail, Server, Webhook, User, Calendar, BarChart3 } from "lucide-react"

// Sample configuration data - in real app this would come from an API
const configurationData = {
  "1": {
    id: 1,
    name: "Daily Campaign Summary",
    description: "Daily overview of all active campaigns",
    reportType: "Campaign",
    metrics: ["Opens", "Clicks", "Conversions", "Revenue"],
    filters: {
      campaigns: ["Active campaigns", "By tag: newsletter"],
      dateRange: "Last 24 hours",
    },
    schedule: {
      frequency: "Daily",
      time: "9:00 AM",
      timezone: "EST",
    },
    delivery: {
      method: "email",
      recipients: ["marketing@company.com"],
      format: "PDF",
    },
    status: "active",
    totalReports: 45,
  },
  // Add more configurations as needed
}

export default function ConfigurationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const configId = params.configId as string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config = (configurationData as any)[configId]

  const handleBack = () => {
    router.push("/reports/configurations")
  }

  const handleEdit = () => {
    router.push(`/reports/configurations/${configId}/edit`)
  }

  const handleViewHistory = () => {
    router.push(`/reports/configurations/${configId}/history?name=${encodeURIComponent(config.name)}`)
  }

  const getDeliveryIcon = (method: string) => {
    switch (method) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sftp":
        return <Server className="h-4 w-4" />
      case "webhook":
        return <Webhook className="h-4 w-4" />
      case "manual":
        return <User className="h-4 w-4" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  if (!config) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Configuration Not Found</h1>
          <p className="text-gray-600 mb-4">The requested configuration could not be found.</p>
          <Button onClick={handleBack}>Back to Configurations</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Configurations
        </Button>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{config.name}</h1>
            <p className="text-gray-600 mb-4">{config.description}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{config.reportType}</Badge>
              <Badge className={config.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                {config.status}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleViewHistory}>
              View History ({config.totalReports} reports)
            </Button>
            <Button onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Configuration Details */}
      <div className="grid gap-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Report Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Metrics</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {config.metrics.map((metric: string) => (
                  <Badge key={metric} variant="outline">{metric}</Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Filters</label>
              <div className="mt-1 text-sm text-gray-600">
                <p><strong>Campaigns:</strong> {config.filters.campaigns.join(", ")}</p>
                <p><strong>Date Range:</strong> {config.filters.dateRange}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        {config.schedule.frequency !== "Immediate" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Frequency</label>
                  <p className="mt-1 text-sm text-gray-900">{config.schedule.frequency}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Time</label>
                  <p className="mt-1 text-sm text-gray-900">{config.schedule.time}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Timezone</label>
                  <p className="mt-1 text-sm text-gray-900">{config.schedule.timezone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Delivery */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getDeliveryIcon(config.delivery.method)}
              Delivery Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Method</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{config.delivery.method}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Format</label>
                <p className="mt-1 text-sm text-gray-900">{config.delivery.format}</p>
              </div>
              {config.delivery.recipients && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Recipients</label>
                  <p className="mt-1 text-sm text-gray-900">{config.delivery.recipients.join(", ")}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
