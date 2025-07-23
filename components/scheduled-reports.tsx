"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MoreHorizontal,
  Search,
  Play,
  Pause,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Mail,
  Server,
  User,
  Webhook,
  XCircle,
  Eye,
} from "lucide-react"

const scheduledReports = [
  {
    id: 1,
    name: "Daily Campaign Summary",
    status: "active",
    nextRun: "Tomorrow 9:00 AM EST",
    lastRun: {
      date: "Today 9:00 AM",
      status: "delivered",
    },
    delivery: {
      method: "email",
      target: "marketing@company.com",
    },
  },
  {
    id: 2,
    name: "Weekly Abandoned Cart Report",
    status: "active",
    nextRun: "Monday 6:00 AM EST",
    lastRun: {
      date: "Oct 30",
      status: "delivered",
    },
    delivery: {
      method: "sftp",
      target: "SFTP server",
    },
  },
  {
    id: 3,
    name: "Monthly Performance Report",
    status: "paused",
    nextRun: null,
    lastRun: {
      date: "Sep 1",
      status: "delivered",
    },
    delivery: {
      method: "email",
      target: "3 recipients",
    },
  },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ScheduledReports({ onViewDetail }: { onViewDetail: any }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [reports, setReports] = useState(scheduledReports)

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || report.status === activeTab
    return matchesSearch && matchesTab
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getStatusIcon = (status: any) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "paused":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getDeliveryIcon = (method: any) => {
    switch (method) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sftp":
        return <Server className="h-4 w-4" />
      case "webhook":
        return <Webhook className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleToggleStatus = (id: any) => {
    setReports(
      reports.map((report) =>
        report.id === id ? { ...report, status: report.status === "active" ? "paused" : "active" } : report,
      ),
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeleteReport = (id: any) => {
    setReports(reports.filter((report) => report.id !== id))
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Scheduled Reports</h1>
        <p className="text-gray-600">Manage your automated report deliveries</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1" onClick={() => onViewDetail?.(report.id)}>
                  {getStatusIcon(report.status)}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{report.name}</h3>
                      {report.status === "paused" && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          PAUSED
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      {report.nextRun ? (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Next run: {report.nextRun}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Pause className="h-4 w-4" />
                          <span>PAUSED - Last run: {report.lastRun.date}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Last run: {report.lastRun.date} ✓ Delivered</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {getDeliveryIcon(report.delivery.method)}
                        <span>Delivers to: {report.delivery.target}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onViewDetail?.(report.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleToggleStatus(report.id)}>
                        {report.status === "active" ? (
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
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteReport(report.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? "No reports found" : "No scheduled reports"}
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Create a report template to get started with scheduled reports"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
