"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  ArrowLeft,
  Pause,
  Play,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Download,
  Eye,
  Clock,
  Mail,
  Calendar,
  BarChart3,
} from "lucide-react"

const reportDetail = {
  id: 1,
  name: "Daily Campaign Summary",
  status: "active",
  schedule: {
    frequency: "Daily at 9:00 AM EST",
    dateRange: "Previous day",
    nextRun: "Tomorrow 9:00 AM EST",
  },
  includedData: [
    { name: "Campaign performance metrics", included: true },
    { name: "Customer engagement stats", included: true },
    { name: "Revenue data", included: true },
    { name: "Individual message details", included: false },
  ],
  delivery: {
    method: "email",
    recipients: ["marketing@company.com", "analytics@company.com"],
    format: "PDF",
  },
  recentRuns: [
    {
      date: "Oct 31, 9:00 AM",
      status: "delivered",
      downloadUrl: "#",
    },
    {
      date: "Oct 30, 9:00 AM",
      status: "delivered",
      downloadUrl: "#",
    },
    {
      date: "Oct 29, 9:00 AM",
      status: "partial",
      error: "Some campaign data unavailable",
      downloadUrl: "#",
    },
  ],
}

export default function ScheduledReportDetail({ onBack }) {
  const [reportStatus, setReportStatus] = useState(reportDetail.status)
  const [isRunning, setIsRunning] = useState(false)

  const handleToggleStatus = () => {
    setReportStatus(reportStatus === "active" ? "paused" : "active")
  }

  const handleRunNow = () => {
    setIsRunning(true)
    // Simulate report generation
    setTimeout(() => {
      setIsRunning(false)
    }, 3000)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Scheduled Reports
        </Button>
      </div>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{reportDetail.name}</h1>
          <div className="flex items-center gap-2">
            <Badge className={reportStatus === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
              {reportStatus === "active" ? "Active ✓" : "Paused"}
            </Badge>
            <span className="text-gray-600">Next run: {reportDetail.schedule.nextRun}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleToggleStatus}>
            {reportStatus === "active" ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Resume
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleRunNow} disabled={isRunning}>
            {isRunning ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Now
              </>
            )}
          </Button>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Schedule
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Scheduled Report</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this scheduled report? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schedule Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium text-gray-900">Frequency</p>
              <p className="text-gray-600">{reportDetail.schedule.frequency}</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">Date Range</p>
              <p className="text-gray-600">{reportDetail.schedule.dateRange}</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">Status</p>
              <Badge
                className={reportStatus === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
              >
                {reportStatus === "active" ? "Active ✓" : "Paused"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Delivery Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium text-gray-900 mb-2">Email Recipients</p>
              <div className="space-y-1">
                {reportDetail.delivery.recipients.map((email, index) => (
                  <p key={index} className="text-gray-600 text-sm">
                    • {email}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Format</p>
              <p className="text-gray-600">{reportDetail.delivery.format}</p>
            </div>
          </CardContent>
        </Card>

        {/* Included Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Included Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportDetail.includedData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.included ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 border border-gray-300 rounded"></div>
                  )}
                  <span className={item.included ? "text-gray-900" : "text-gray-500"}>{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Runs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Runs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportDetail.recentRuns.map((run, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(run.status)}
                    <div>
                      <p className="font-medium text-gray-900">{run.date}</p>
                      {run.status === "delivered" && <p className="text-sm text-green-600">✓ Delivered</p>}
                      {run.status === "partial" && (
                        <p className="text-sm text-yellow-600">Partial data - {run.error}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {run.status === "partial" && (
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
