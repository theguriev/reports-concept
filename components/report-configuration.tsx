"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Server,
  Calendar,
  BarChart3,
  Webhook,
  Download,
  Search,
  Clock,
  User,
  History,
} from "lucide-react"
import { CreateConfigurationDialog } from "./create-configuration-dialog"

// Sample data for report configurations with status
const reportConfigurations = [
  {
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
    lastRun: {
      date: "Today 9:00 AM",
      status: "delivered",
    },
    totalReports: 45,
  },
  {
    id: 2,
    name: "Weekly Abandoned Cart Report",
    description: "Weekly analysis of abandoned cart recovery campaigns",
    reportType: "Abandoned Cart",
    metrics: ["Cart Value", "Recovery Rate", "Revenue"],
    filters: {
      campaigns: ["Abandoned cart sequences"],
      dateRange: "Previous 7 days",
    },
    schedule: {
      frequency: "Weekly",
      time: "6:00 AM",
      timezone: "EST",
    },
    delivery: {
      method: "sftp",
      server: "reports.company.com",
      format: "CSV",
      path: "/reports/",
      filename: "abandoned_cart_{{date}}.csv",
    },
    lastRun: {
      date: "Oct 30",
      status: "delivered",
    },
    totalReports: 12,
  },
  {
    id: 3,
    name: "Monthly Performance Report",
    description: "Comprehensive monthly performance analysis",
    reportType: "Customer",
    metrics: ["Customer Lifetime Value", "Engagement Score", "Churn Rate"],
    filters: {
      segments: ["High-value customers", "New subscribers"],
      dateRange: "Previous month",
    },
    schedule: {
      frequency: "Monthly",
      time: "8:00 AM",
      timezone: "EST",
    },
    delivery: {
      method: "webhook",
      url: "https://api.company.com/reports/webhook",
      format: "JSON",
    },
    lastRun: {
      date: "Sep 1",
      status: "delivered",
    },
    totalReports: 8,
  },
  {
    id: 4,
    name: "Customer Engagement Analysis",
    description: "Manual report for customer engagement metrics",
    reportType: "Customer",
    metrics: ["Engagement Score", "Click Rate", "Open Rate"],
    filters: {
      segments: ["All customers"],
      dateRange: "Custom",
    },
    schedule: {
      frequency: "Immediate",
    },
    delivery: {
      method: "manual",
      format: "Excel",
    },
    lastGenerated: "Oct 28, 2:30 PM",
    totalReports: 23,
  },
  {
    id: 5,
    name: "Revenue Dashboard Export",
    description: "On-demand revenue and conversion metrics",
    reportType: "Revenue",
    metrics: ["Revenue", "Conversions", "ROI"],
    filters: {
      campaigns: ["All campaigns"],
      dateRange: "Last 30 days",
    },
    schedule: {
      frequency: "Immediate",
    },
    delivery: {
      method: "manual",
      format: "PDF",
    },
    lastGenerated: "Oct 30, 11:15 AM",
    totalReports: 15,
  },
]

export default function ReportConfiguration({ onViewHistory }) {
  const [configurations, setConfigurations] = useState(reportConfigurations)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingConfiguration, setEditingConfiguration] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date-desc")
  const [generatingReports, setGeneratingReports] = useState(new Set())

  const filteredAndSortedConfigurations = configurations
    .filter((config) => config.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.lastRun?.date || b.lastGenerated || 0) - new Date(a.lastRun?.date || a.lastGenerated || 0)
        case "date-asc":
          return new Date(a.lastRun?.date || a.lastGenerated || 0) - new Date(b.lastRun?.date || b.lastGenerated || 0)
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

  const getDeliveryIcon = (type) => {
    switch (type) {
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

  const getDeliveryDescription = (delivery, status) => {
    if (status === "manual") {
      return `Manual download (${delivery.format})`
    }

    switch (delivery.method) {
      case "email":
        return `Email to ${delivery.recipients?.length || 0} recipient(s)`
      case "sftp":
        return `SFTP to ${delivery.server}`
      case "webhook":
        return `Webhook to ${delivery.url}`
      default:
        return delivery.method
    }
  }

  const handleDeleteConfiguration = (id) => {
    setConfigurations(configurations.filter((config) => config.id !== id))
  }

  const handleGenerateReport = (configId) => {
    setGeneratingReports((prev) => new Set([...prev, configId]))

    // Simulate report generation
    setTimeout(() => {
      setGeneratingReports((prev) => {
        const newSet = new Set(prev)
        newSet.delete(configId)
        return newSet
      })

      // Update last generated time for manual reports
      setConfigurations(
        configurations.map((config) =>
          config.id === configId && config.delivery.method === "manual"
            ? { ...config, lastGenerated: new Date().toLocaleString(), totalReports: config.totalReports + 1 }
            : config,
        ),
      )

      // Simulate download
      const link = document.createElement("a")
      link.href = "#"
      link.download = `report_${configId}_${Date.now()}.pdf`
      link.click()
    }, 2000)
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Report Configuration</h1>
          <p className="text-gray-600 mt-2">
            Create and manage report configurations with scheduled or manual delivery
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Configuration
            </Button>
          </DialogTrigger>
          <CreateConfigurationDialog onClose={() => setIsCreateDialogOpen(false)} />
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Date (Newest first)</SelectItem>
              <SelectItem value="date-asc">Date (Oldest first)</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search configurations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Configurations Grid */}
      <div className="grid gap-6">
        {filteredAndSortedConfigurations.map((config) => (
          <Card key={config.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">{config.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base mb-3">{config.description}</CardDescription>
                </div>

                <div className="flex items-center gap-2">
                  {/* Manual Download Button */}
                  {config.delivery.method === "manual" && (
                    <Button
                      onClick={() => handleGenerateReport(config.id)}
                      disabled={generatingReports.has(config.id)}
                      className="flex items-center gap-2"
                    >
                      {generatingReports.has(config.id) ? (
                        <>
                          <Clock className="h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          Download
                        </>
                      )}
                    </Button>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewHistory?.(config.id, config.name)}>
                        <History className="h-4 w-4 mr-2" />
                        View History
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditingConfiguration(config)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteConfiguration(config.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                {/* Schedule/Status */}
                <div className="flex items-center gap-2">
                  {config.delivery.method === "manual" ? (
                    <User className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Calendar className="h-4 w-4 text-gray-500" />
                  )}
                  <div>
                    <p className="font-medium">Frequency</p>
                    <p className="text-gray-600">
                      {config.delivery.method === "manual" ? "On-demand" : config.schedule?.frequency}
                    </p>
                  </div>
                </div>

                {/* Delivery */}
                <div className="flex items-center gap-2">
                  {getDeliveryIcon(config.delivery.method)}
                  <div>
                    <p className="font-medium">Delivery</p>
                    <p className="text-gray-600">{getDeliveryDescription(config.delivery, config.delivery.method)}</p>
                  </div>
                </div>

                {/* Last Run/Generated */}
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{config.delivery.method === "manual" ? "Last Generated" : "Last Run"}</p>
                    <p className="text-gray-600">
                      {config.delivery.method === "manual" ? config.lastGenerated || "Never" : config.lastRun?.date}
                    </p>
                  </div>
                </div>

                {/* Total Reports */}
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Total Reports</p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-600 hover:text-blue-800"
                      onClick={() => onViewHistory?.(config.id, config.name)}
                    >
                      {config.totalReports} reports
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredAndSortedConfigurations.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? "No configurations found" : "No report configurations yet"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Create your first report configuration to get started"}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Configuration
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
