"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Download,
  Search,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Mail,
  Server,
  Webhook,
  User,
  Calendar,
  FileText,
  BarChart3,
} from "lucide-react"

// Update the reportHistoryData with more comprehensive test data for all configurations

const reportHistoryData = {
  "1": {
    configName: "Daily Campaign Summary",
    configType: "Campaign",
    deliveryMethod: "email",
    reports: [
      {
        id: 1,
        generatedAt: "Nov 1, 2024 9:00 AM",
        status: "delivered",
        deliveryMethod: "email",
        recipients: ["marketing@company.com"],
        fileSize: "2.4 MB",
        format: "PDF",
        downloadUrl: "#",
        deliveryTime: "9:02 AM",
        campaigns: ["Welcome Series", "Newsletter - October"],
        metrics: ["Opens", "Clicks", "Conversions", "Revenue"],
      },
      {
        id: 2,
        generatedAt: "Oct 31, 2024 9:00 AM",
        status: "delivered",
        deliveryMethod: "email",
        recipients: ["marketing@company.com"],
        fileSize: "2.1 MB",
        format: "PDF",
        downloadUrl: "#",
        deliveryTime: "9:01 AM",
        campaigns: ["Welcome Series", "Newsletter - October"],
        metrics: ["Opens", "Clicks", "Conversions", "Revenue"],
      },
      {
        id: 3,
        generatedAt: "Oct 30, 2024 9:00 AM",
        status: "failed",
        deliveryMethod: "email",
        recipients: ["marketing@company.com"],
        error: "SMTP connection timeout",
        retryCount: 2,
        campaigns: ["Welcome Series", "Newsletter - October"],
        metrics: ["Opens", "Clicks", "Conversions", "Revenue"],
      },
      {
        id: 4,
        generatedAt: "Oct 29, 2024 9:00 AM",
        status: "partial",
        deliveryMethod: "email",
        recipients: ["marketing@company.com"],
        fileSize: "1.8 MB",
        format: "PDF",
        downloadUrl: "#",
        deliveryTime: "9:03 AM",
        warning: "Some campaign data unavailable",
        campaigns: ["Welcome Series"],
        metrics: ["Opens", "Clicks", "Conversions"],
      },
      {
        id: 5,
        generatedAt: "Oct 28, 2024 9:00 AM",
        status: "delivered",
        deliveryMethod: "email",
        recipients: ["marketing@company.com"],
        fileSize: "2.3 MB",
        format: "PDF",
        downloadUrl: "#",
        deliveryTime: "9:01 AM",
        campaigns: ["Welcome Series", "Newsletter - October"],
        metrics: ["Opens", "Clicks", "Conversions", "Revenue"],
      },
      {
        id: 6,
        generatedAt: "Oct 27, 2024 9:00 AM",
        status: "delivered",
        deliveryMethod: "email",
        recipients: ["marketing@company.com"],
        fileSize: "2.5 MB",
        format: "PDF",
        downloadUrl: "#",
        deliveryTime: "9:02 AM",
        campaigns: ["Welcome Series", "Newsletter - October", "Black Friday Promotion"],
        metrics: ["Opens", "Clicks", "Conversions", "Revenue"],
      },
      {
        id: 7,
        generatedAt: "Oct 26, 2024 9:00 AM",
        status: "delivered",
        deliveryMethod: "email",
        recipients: ["marketing@company.com"],
        fileSize: "2.2 MB",
        format: "PDF",
        downloadUrl: "#",
        deliveryTime: "9:01 AM",
        campaigns: ["Welcome Series", "Newsletter - October"],
        metrics: ["Opens", "Clicks", "Conversions", "Revenue"],
      },
    ],
  },
  "2": {
    configName: "Weekly Abandoned Cart Report",
    configType: "Abandoned Cart",
    deliveryMethod: "sftp",
    reports: [
      {
        id: 8,
        generatedAt: "Oct 30, 2024 6:00 AM",
        status: "delivered",
        deliveryMethod: "sftp",
        server: "reports.company.com",
        fileSize: "1.2 MB",
        format: "CSV",
        downloadUrl: "#",
        deliveryTime: "6:03 AM",
        campaigns: ["Abandoned Cart Recovery"],
        metrics: ["Cart Value", "Recovery Rate", "Revenue"],
      },
      {
        id: 9,
        generatedAt: "Oct 23, 2024 6:00 AM",
        status: "delivered",
        deliveryMethod: "sftp",
        server: "reports.company.com",
        fileSize: "1.1 MB",
        format: "CSV",
        downloadUrl: "#",
        deliveryTime: "6:02 AM",
        campaigns: ["Abandoned Cart Recovery"],
        metrics: ["Cart Value", "Recovery Rate", "Revenue"],
      },
      {
        id: 10,
        generatedAt: "Oct 16, 2024 6:00 AM",
        status: "failed",
        deliveryMethod: "sftp",
        server: "reports.company.com",
        error: "SFTP authentication failed",
        retryCount: 3,
        campaigns: ["Abandoned Cart Recovery"],
        metrics: ["Cart Value", "Recovery Rate", "Revenue"],
      },
      {
        id: 11,
        generatedAt: "Oct 9, 2024 6:00 AM",
        status: "delivered",
        deliveryMethod: "sftp",
        server: "reports.company.com",
        fileSize: "1.3 MB",
        format: "CSV",
        downloadUrl: "#",
        deliveryTime: "6:01 AM",
        campaigns: ["Abandoned Cart Recovery"],
        metrics: ["Cart Value", "Recovery Rate", "Revenue"],
      },
    ],
  },
  "3": {
    configName: "Monthly Performance Report",
    configType: "Customer",
    deliveryMethod: "webhook",
    reports: [
      {
        id: 12,
        generatedAt: "Sep 1, 2024 8:00 AM",
        status: "delivered",
        deliveryMethod: "webhook",
        webhookUrl: "https://api.company.com/reports/webhook",
        fileSize: "3.8 MB",
        format: "JSON",
        downloadUrl: "#",
        deliveryTime: "8:05 AM",
        campaigns: ["Welcome Series", "Newsletter - August", "Product Launch"],
        metrics: ["Customer Lifetime Value", "Engagement Score", "Churn Rate"],
      },
      {
        id: 13,
        generatedAt: "Aug 1, 2024 8:00 AM",
        status: "delivered",
        deliveryMethod: "webhook",
        webhookUrl: "https://api.company.com/reports/webhook",
        fileSize: "3.5 MB",
        format: "JSON",
        downloadUrl: "#",
        deliveryTime: "8:03 AM",
        campaigns: ["Welcome Series", "Newsletter - July", "Summer Sale"],
        metrics: ["Customer Lifetime Value", "Engagement Score", "Churn Rate"],
      },
      {
        id: 14,
        generatedAt: "Jul 1, 2024 8:00 AM",
        status: "partial",
        deliveryMethod: "webhook",
        webhookUrl: "https://api.company.com/reports/webhook",
        fileSize: "2.9 MB",
        format: "JSON",
        downloadUrl: "#",
        deliveryTime: "8:07 AM",
        warning: "Customer segmentation data incomplete",
        campaigns: ["Welcome Series", "Newsletter - June"],
        metrics: ["Customer Lifetime Value", "Engagement Score"],
      },
      {
        id: 15,
        generatedAt: "Jun 1, 2024 8:00 AM",
        status: "failed",
        deliveryMethod: "webhook",
        webhookUrl: "https://api.company.com/reports/webhook",
        error: "Webhook endpoint returned 500 error",
        retryCount: 2,
        campaigns: ["Welcome Series", "Newsletter - May", "Spring Campaign"],
        metrics: ["Customer Lifetime Value", "Engagement Score", "Churn Rate"],
      },
    ],
  },
  "4": {
    configName: "Customer Engagement Analysis",
    configType: "Customer",
    deliveryMethod: "manual",
    reports: [
      {
        id: 16,
        generatedAt: "Oct 28, 2024 2:30 PM",
        status: "downloaded",
        deliveryMethod: "manual",
        fileSize: "3.1 MB",
        format: "Excel",
        downloadUrl: "#",
        generatedBy: "john@company.com",
        campaigns: ["All campaigns"],
        metrics: ["Engagement Score", "Click Rate", "Open Rate"],
      },
      {
        id: 17,
        generatedAt: "Oct 25, 2024 11:15 AM",
        status: "downloaded",
        deliveryMethod: "manual",
        fileSize: "2.9 MB",
        format: "Excel",
        downloadUrl: "#",
        generatedBy: "sarah@company.com",
        campaigns: ["Welcome Series", "Product Launch"],
        metrics: ["Engagement Score", "Click Rate", "Open Rate"],
      },
      {
        id: 18,
        generatedAt: "Oct 22, 2024 4:45 PM",
        status: "downloaded",
        deliveryMethod: "manual",
        fileSize: "3.3 MB",
        format: "Excel",
        downloadUrl: "#",
        generatedBy: "mike@company.com",
        campaigns: ["Newsletter - October", "Black Friday Promotion"],
        metrics: ["Engagement Score", "Click Rate", "Open Rate"],
      },
      {
        id: 19,
        generatedAt: "Oct 18, 2024 9:20 AM",
        status: "downloaded",
        deliveryMethod: "manual",
        fileSize: "2.7 MB",
        format: "Excel",
        downloadUrl: "#",
        generatedBy: "lisa@company.com",
        campaigns: ["Welcome Series", "Abandoned Cart Recovery"],
        metrics: ["Engagement Score", "Click Rate", "Open Rate"],
      },
      {
        id: 20,
        generatedAt: "Oct 15, 2024 1:10 PM",
        status: "downloaded",
        deliveryMethod: "manual",
        fileSize: "3.0 MB",
        format: "Excel",
        downloadUrl: "#",
        generatedBy: "david@company.com",
        campaigns: ["All campaigns"],
        metrics: ["Engagement Score", "Click Rate", "Open Rate"],
      },
      {
        id: 21,
        generatedAt: "Oct 12, 2024 3:25 PM",
        status: "downloaded",
        deliveryMethod: "manual",
        fileSize: "2.8 MB",
        format: "Excel",
        downloadUrl: "#",
        generatedBy: "anna@company.com",
        campaigns: ["Newsletter - October", "Product Launch"],
        metrics: ["Engagement Score", "Click Rate", "Open Rate"],
      },
    ],
  },
  "5": {
    configName: "Revenue Dashboard Export",
    configType: "Revenue",
    deliveryMethod: "manual",
    reports: [
      {
        id: 22,
        generatedAt: "Oct 30, 2024 11:15 AM",
        status: "downloaded",
        deliveryMethod: "manual",
        fileSize: "4.2 MB",
        format: "PDF",
        downloadUrl: "#",
        generatedBy: "finance@company.com",
        campaigns: ["All campaigns"],
        metrics: ["Revenue", "Conversions", "ROI"],
      },
      {
        id: 23,
        generatedAt: "Oct 29, 2024 2:45 PM",
        status: "downloaded",
        deliveryMethod: "manual",
        fileSize: "4.0 MB",
        format: "PDF",
        downloadUrl: "#",
        generatedBy: "john@company.com",
        campaigns: ["Black Friday Promotion", "Newsletter - October"],
        metrics: ["Revenue", "Conversions", "ROI"],
      },
      {
        id: 24,
        generatedAt: "Oct 25, 2024 10:30 AM",
        status: "downloaded",
        deliveryMethod: "manual",
        fileSize: "3.8 MB",
        format: "PDF",
        downloadUrl: "#",
        generatedBy: "sarah@company.com",
        campaigns: ["Product Launch", "Welcome Series"],
        metrics: ["Revenue", "Conversions", "ROI"],
      },
      {
        id: 25,
        generatedAt: "Oct 20, 2024 4:20 PM",
        status: "downloaded",
        deliveryMethod: "manual",
        fileSize: "4.1 MB",
        format: "PDF",
        downloadUrl: "#",
        generatedBy: "mike@company.com",
        campaigns: ["All campaigns"],
        metrics: ["Revenue", "Conversions", "ROI"],
      },
      {
        id: 26,
        generatedAt: "Oct 15, 2024 9:00 AM",
        status: "downloaded",
        deliveryMethod: "manual",
        fileSize: "3.9 MB",
        format: "PDF",
        downloadUrl: "#",
        generatedBy: "finance@company.com",
        campaigns: ["Newsletter - October", "Abandoned Cart Recovery"],
        metrics: ["Revenue", "Conversions", "ROI"],
      },
    ],
  },
}

export default function ReportHistory({ 
  configId, 
  configName, 
  onBack 
}: {
  configId: string | null;
  configName: string | null;
  onBack: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [configFilter, setConfigFilter] = useState("all") // Always start with "all" for the filter dropdown

  // Get all reports from all configurations
  const getAllReports = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allReports: any[] = []
    Object.entries(reportHistoryData).forEach(([id, data]) => {
      data.reports.forEach(report => {
        allReports.push({
          ...report,
          configId: id,
          configName: data.configName,
          configType: data.configType,
          deliveryMethod: data.deliveryMethod
        })
      })
    })
    return allReports.sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime())
  }

  // Convert configId to string to match data keys, and ensure fallback data
  const configIdStr = configId?.toString()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const historyData = configIdStr && (reportHistoryData as any)[configIdStr] 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (reportHistoryData as any)[configIdStr]
    : configId 
      ? { reports: [], configName: configName || "Unknown Configuration", configType: "Unknown", deliveryMethod: "unknown" }
      : { reports: getAllReports() }
  const { configName: singleConfigName, configType, deliveryMethod, reports } = historyData

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredReports = reports.filter((report: any) => {
    const matchesSearch = report.generatedAt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (report.configName && report.configName.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    
    // For specific config pages, we don't need to filter by config since all reports are already from that config
    // For all reports page, we filter by configId
    const matchesConfig = configId ? true : (configFilter === "all" || report.configId === configFilter)
    
    return matchesSearch && matchesStatus && matchesConfig
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
      case "downloaded":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "generating":
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      delivered: "bg-green-100 text-green-800",
      downloaded: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      partial: "bg-yellow-100 text-yellow-800",
      generating: "bg-blue-100 text-blue-800",
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (colors as any)[status] || "bg-gray-100 text-gray-800"
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
        return <FileText className="h-4 w-4" />
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDownload = (report: any) => {
    // Simulate download
    const link = document.createElement("a")
    link.href = report.downloadUrl
    link.download = `${configName}_${report.generatedAt.replace(/[^a-zA-Z0-9]/g, "_")}.${report.format.toLowerCase()}`
    link.click()
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Reports
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {configId ? "Report History" : "All Reports History"}
        </h1>
        {configId ? (
          <div className="flex items-center gap-2 text-gray-600">
            <span>{configName || singleConfigName}</span>
            <span>•</span>
            <Badge variant="outline">{configType}</Badge>
            <span>•</span>
            <div className="flex items-center gap-1">
              {getDeliveryIcon(deliveryMethod)}
              <span className="capitalize">{deliveryMethod}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">
            View delivery history for all report configurations
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={configId ? "Search by date..." : "Search by date or configuration..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {!configId && (
          <Select value={configFilter} onValueChange={setConfigFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by configuration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Configurations</SelectItem>
              {Object.entries(reportHistoryData).map(([id, data]) => (
                <SelectItem key={id} value={id}>
                  {data.configName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="downloaded">Downloaded</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="partial">Partial</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {filteredReports.map((report: any) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {getStatusIcon(report.status)}
                  <div>
                    <CardTitle className="text-lg">{report.generatedAt}</CardTitle>
                    {!configId && report.configName && (
                      <p className="text-sm text-gray-600 mt-1">{report.configName}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusBadge(report.status)}>{report.status}</Badge>
                      {report.format && (
                        <Badge variant="outline" className="text-xs">
                          {report.format}
                        </Badge>
                      )}
                      {report.fileSize && <span className="text-sm text-gray-500">{report.fileSize}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {(report.status === "delivered" || report.status === "downloaded" || report.status === "partial") && (
                    <Button variant="outline" size="sm" onClick={() => handleDownload(report)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                  {report.status === "failed" && (
                    <Button variant="outline" size="sm">
                      Retry
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                {/* Delivery Info */}
                <div className="flex items-center gap-2">
                  {getDeliveryIcon(report.deliveryMethod)}
                  <div>
                    <p className="font-medium">Delivery</p>
                    {report.deliveryMethod === "email" && (
                      <p className="text-gray-600">{report.recipients?.join(", ")}</p>
                    )}
                    {report.deliveryMethod === "manual" && (
                      <p className="text-gray-600">Generated by {report.generatedBy}</p>
                    )}
                    {report.deliveryTime && <p className="text-gray-500 text-xs">Delivered at {report.deliveryTime}</p>}
                  </div>
                </div>

                {/* Campaigns */}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Campaigns</p>
                    <p className="text-gray-600">{report.campaigns?.length || 0} campaigns</p>
                    <p className="text-gray-500 text-xs">{report.campaigns?.slice(0, 2).join(", ")}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Metrics</p>
                    <p className="text-gray-600">{report.metrics?.length || 0} metrics</p>
                    <p className="text-gray-500 text-xs">{report.metrics?.slice(0, 2).join(", ")}</p>
                  </div>
                </div>

                {/* Status Details */}
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Details</p>
                    {report.error && <p className="text-red-600 text-xs">{report.error}</p>}
                    {report.warning && <p className="text-yellow-600 text-xs">{report.warning}</p>}
                    {report.retryCount && <p className="text-gray-500 text-xs">Retried {report.retryCount} times</p>}
                    {!report.error && !report.warning && !report.retryCount && (
                      <p className="text-green-600 text-xs">Success</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery || statusFilter !== "all" ? "No reports found" : "No reports generated yet"}
            </h3>
            <p className="text-gray-600">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Reports will appear here once they are generated"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      {reports.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
                <p className="text-sm text-gray-600">Total Reports</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {reports.filter((r: any) => r.status === "delivered" || r.status === "downloaded").length}
                </p>
                <p className="text-sm text-gray-600">Successful</p>
              </div>
              <div>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <p className="text-2xl font-bold text-red-600">{reports.filter((r: any) => r.status === "failed").length}</p>
                <p className="text-sm text-gray-600">Failed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {reports.filter((r: any) => r.status === "partial").length}
                </p>
                <p className="text-sm text-gray-600">Partial</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
