"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tabs as DialogTabs,
  TabsContent,
  TabsList as DialogTabsList,
  TabsTrigger as DialogTabsTrigger,
} from "@/components/ui/tabs"
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Server,
  Calendar,
  BarChart3,
  TestTube,
  Webhook,
  Download,
  Play,
  Pause,
  Search,
  Clock,
  User,
} from "lucide-react"

// Sample data for report templates with status
const reportTemplates = [
  {
    id: 1,
    name: "Daily Campaign Summary",
    description: "Daily overview of all active campaigns",
    reportType: "Campaign",
    status: "active",
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
    nextRun: "Tomorrow 9:00 AM EST",
    lastRun: {
      date: "Today 9:00 AM",
      status: "delivered",
    },
  },
  {
    id: 2,
    name: "Weekly Abandoned Cart Report",
    description: "Weekly analysis of abandoned cart recovery campaigns",
    reportType: "Abandoned Cart",
    status: "active",
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
    nextRun: "Monday 6:00 AM EST",
    lastRun: {
      date: "Oct 30",
      status: "delivered",
    },
  },
  {
    id: 3,
    name: "Monthly Performance Report",
    description: "Comprehensive monthly performance analysis",
    reportType: "Customer",
    status: "paused",
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
    nextRun: null,
    lastRun: {
      date: "Sep 1",
      status: "delivered",
    },
  },
  {
    id: 4,
    name: "Customer Engagement Analysis",
    description: "Manual report for customer engagement metrics",
    reportType: "Customer",
    status: "manual",
    metrics: ["Engagement Score", "Click Rate", "Open Rate"],
    filters: {
      segments: ["All customers"],
      dateRange: "Custom",
    },
    delivery: {
      method: "manual",
      format: "Excel",
    },
    lastGenerated: "Oct 28, 2:30 PM",
  },
  {
    id: 5,
    name: "Revenue Dashboard Export",
    description: "On-demand revenue and conversion metrics",
    reportType: "Revenue",
    status: "manual",
    metrics: ["Revenue", "Conversions", "ROI"],
    filters: {
      campaigns: ["All campaigns"],
      dateRange: "Last 30 days",
    },
    delivery: {
      method: "manual",
      format: "PDF",
    },
    lastGenerated: "Oct 30, 11:15 AM",
  },
]

const reportTypes = ["Campaign", "Customer", "Abandoned Cart", "Revenue", "Engagement", "Deliverability"]

const availableMetrics = [
  "Opens",
  "Clicks",
  "Conversions",
  "Revenue",
  "Cart Value",
  "Recovery Rate",
  "Customer Lifetime Value",
  "Engagement Score",
  "Churn Rate",
  "Bounce Rate",
  "Unsubscribe Rate",
  "ROI",
  "Delivery Rate",
  "Spam Rate",
]

export default function ReportTemplates() {
  const [templates, setTemplates] = useState(reportTemplates)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [generatingReports, setGeneratingReports] = useState(new Set())

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || template.status === activeTab
    return matchesSearch && matchesTab
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

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "manual":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFrequencyBadgeColor = (frequency) => {
    if (frequency?.includes("Daily")) return "bg-green-100 text-green-800"
    if (frequency?.includes("Weekly")) return "bg-blue-100 text-blue-800"
    if (frequency?.includes("Monthly")) return "bg-purple-100 text-purple-800"
    return "bg-gray-100 text-gray-800"
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

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter((template) => template.id !== id))
  }

  const handleToggleStatus = (id) => {
    setTemplates(
      templates.map((template) =>
        template.id === id ? { ...template, status: template.status === "active" ? "paused" : "active" } : template,
      ),
    )
  }

  const handleGenerateReport = (templateId) => {
    setGeneratingReports((prev) => new Set([...prev, templateId]))

    // Simulate report generation
    setTimeout(() => {
      setGeneratingReports((prev) => {
        const newSet = new Set(prev)
        newSet.delete(templateId)
        return newSet
      })

      // Update last generated time for manual reports
      setTemplates(
        templates.map((template) =>
          template.id === templateId && template.status === "manual"
            ? { ...template, lastGenerated: new Date().toLocaleString() }
            : template,
        ),
      )

      // Simulate download
      const link = document.createElement("a")
      link.href = "#"
      link.download = `report_${templateId}_${Date.now()}.pdf`
      link.click()
    }, 2000)
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Report Templates</h1>
          <p className="text-gray-600 mt-2">Create and manage report templates with scheduled or manual delivery</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Template
            </Button>
          </DialogTrigger>
          <CreateTemplateDialog onClose={() => setIsCreateDialogOpen(false)} />
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">{template.name}</CardTitle>
                    <Badge className={getStatusBadgeColor(template.status)}>
                      {template.status === "manual" ? "Manual" : template.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-base mb-3">{template.description}</CardDescription>
                </div>

                <div className="flex items-center gap-2">
                  {/* Manual Download Button */}
                  {template.status === "manual" && (
                    <Button
                      onClick={() => handleGenerateReport(template.id)}
                      disabled={generatingReports.has(template.id)}
                      className="flex items-center gap-2"
                    >
                      {generatingReports.has(template.id) ? (
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
                      {template.status !== "manual" && (
                        <DropdownMenuItem onClick={() => handleToggleStatus(template.id)}>
                          {template.status === "active" ? (
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
                      )}
                      <DropdownMenuItem onClick={() => setEditingTemplate(template)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteTemplate(template.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {/* Schedule/Status */}
                <div className="flex items-center gap-2">
                  {template.status === "manual" ? (
                    <User className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Calendar className="h-4 w-4 text-gray-500" />
                  )}
                  <div>
                    <p className="font-medium">{template.status === "manual" ? "Type" : "Frequency"}</p>
                    {template.status === "manual" ? (
                      <Badge className="bg-blue-100 text-blue-800">Manual</Badge>
                    ) : (
                      <Badge className={getFrequencyBadgeColor(template.schedule?.frequency)}>
                        {template.schedule?.frequency}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Delivery */}
                <div className="flex items-center gap-2">
                  {getDeliveryIcon(template.delivery.method)}
                  <div>
                    <p className="font-medium">Delivery</p>
                    <p className="text-gray-600">{getDeliveryDescription(template.delivery, template.status)}</p>
                  </div>
                </div>

                {/* Last Run/Generated */}
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{template.status === "manual" ? "Last Generated" : "Last Run"}</p>
                    <p className="text-gray-600">
                      {template.status === "manual" ? template.lastGenerated || "Never" : template.lastRun?.date}
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Run for scheduled reports */}
              {template.status === "active" && template.nextRun && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span className="text-green-600 font-medium">Next run: {template.nextRun}</span>
                  </div>
                </div>
              )}

              {/* Paused status */}
              {template.status === "paused" && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Pause className="h-4 w-4 text-yellow-500" />
                    <span className="text-yellow-600 font-medium">Paused - Last run: {template.lastRun?.date}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredTemplates.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? "No templates found" : "No report templates yet"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Create your first report template to get started"}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function CreateTemplateDialog({ onClose }) {
  const [selectedMetrics, setSelectedMetrics] = useState([])
  const [selectedReportType, setSelectedReportType] = useState("")
  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [emailRecipients, setEmailRecipients] = useState([""])
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState(null)

  const [selectedCampaigns, setSelectedCampaigns] = useState([])
  const [campaignSearchQuery, setCampaignSearchQuery] = useState("")

  // Sample campaign data
  const campaigns = [
    {
      id: 1,
      name: "Welcome Series",
      description: "Automated welcome sequence for new subscribers",
      status: "active",
      created: "Oct 15, 2024",
      messageCount: "5",
      openRate: "68%",
      tags: ["automation", "welcome"],
    },
    {
      id: 2,
      name: "Black Friday Promotion",
      description: "Special discount campaign for Black Friday",
      status: "active",
      created: "Oct 20, 2024",
      messageCount: "3",
      openRate: "45%",
      tags: ["promotion", "seasonal"],
    },
    {
      id: 3,
      name: "Product Launch Announcement",
      description: "Announcing our new product line",
      status: "completed",
      created: "Sep 30, 2024",
      messageCount: "2",
      openRate: "72%",
      tags: ["product", "announcement"],
    },
    {
      id: 4,
      name: "Newsletter - October",
      description: "Monthly newsletter with company updates",
      status: "active",
      created: "Oct 1, 2024",
      messageCount: "1",
      openRate: "55%",
      tags: ["newsletter", "monthly"],
    },
    {
      id: 5,
      name: "Abandoned Cart Recovery",
      description: "Recover abandoned shopping carts",
      status: "active",
      created: "Oct 10, 2024",
      messageCount: "4",
      openRate: "38%",
      tags: ["automation", "recovery"],
    },
    {
      id: 6,
      name: "Customer Feedback Survey",
      description: "Quarterly customer satisfaction survey",
      status: "paused",
      created: "Sep 15, 2024",
      messageCount: "2",
      openRate: "42%",
      tags: ["survey", "feedback"],
    },
  ]

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(campaignSearchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(campaignSearchQuery.toLowerCase()) ||
      campaign.tags.some((tag) => tag.toLowerCase().includes(campaignSearchQuery.toLowerCase())),
  )

  const handleCampaignToggle = (campaignId) => {
    setSelectedCampaigns((prev) =>
      prev.includes(campaignId) ? prev.filter((id) => id !== campaignId) : [...prev, campaignId],
    )
  }

  const handleSelectAllCampaigns = () => {
    if (selectedCampaigns.length === campaigns.length) {
      setSelectedCampaigns([])
    } else {
      setSelectedCampaigns(campaigns.map((c) => c.id))
    }
  }

  const handleMetricToggle = (metric) => {
    setSelectedMetrics((prev) => (prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]))
  }

  const addEmailRecipient = () => {
    if (emailRecipients.length < 5) {
      setEmailRecipients([...emailRecipients, ""])
    }
  }

  const updateEmailRecipient = (index, value) => {
    const updated = [...emailRecipients]
    updated[index] = value
    setEmailRecipients(updated)
  }

  const removeEmailRecipient = (index) => {
    setEmailRecipients(emailRecipients.filter((_, i) => i !== index))
  }

  const handleTestConnection = () => {
    setIsTestingConnection(true)
    setTimeout(() => {
      setIsTestingConnection(false)
      setConnectionStatus("success")
    }, 2000)
  }

  return (
    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Create Report Template</DialogTitle>
        <DialogDescription>
          Configure a comprehensive report template with metrics, scheduling, and delivery options.
        </DialogDescription>
      </DialogHeader>

      <DialogTabs defaultValue="basic" className="w-full">
        <DialogTabsList className="grid w-full grid-cols-4">
          <DialogTabsTrigger value="basic">Basic Info</DialogTabsTrigger>
          <DialogTabsTrigger value="data">Data Selection</DialogTabsTrigger>
          <DialogTabsTrigger value="schedule">Schedule</DialogTabsTrigger>
          <DialogTabsTrigger value="delivery">Delivery</DialogTabsTrigger>
        </DialogTabsList>

        <div className="mt-6">
          {/* 1. Basic Info */}
          <TabsContent value="basic" className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="template-name">Template Name *</Label>
                <Input id="template-name" placeholder="e.g., Weekly Campaign Performance" />
              </div>

              <div>
                <Label htmlFor="report-type">Report Type *</Label>
                <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="template-description">Description</Label>
              <Textarea
                id="template-description"
                placeholder="Brief description of what this report includes..."
                rows={3}
              />
            </div>
          </TabsContent>

          {/* 2. Data Selection */}
          <TabsContent value="data" className="space-y-4">
            <h3 className="text-lg font-semibold">Data Selection</h3>

            {/* Metrics */}
            <div>
              <Label className="text-base font-medium">Metrics to Include *</Label>
              <p className="text-sm text-gray-600 mb-3">Choose which metrics to include in this report</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto border rounded-md p-4">
                {availableMetrics.map((metric) => (
                  <div key={metric} className="flex items-center space-x-2">
                    <Checkbox
                      id={metric}
                      checked={selectedMetrics.includes(metric)}
                      onCheckedChange={() => handleMetricToggle(metric)}
                    />
                    <Label htmlFor={metric} className="text-sm font-normal">
                      {metric}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Selection Table */}
            <div>
              <Label className="text-base font-medium">Campaign Selection *</Label>
              <p className="text-sm text-gray-600 mb-3">Select which campaigns to include in this report</p>

              <div className="border rounded-lg">
                {/* Table Header */}
                <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="select-all-campaigns"
                      checked={selectedCampaigns.length === campaigns.length}
                      onCheckedChange={handleSelectAllCampaigns}
                    />
                    <Label htmlFor="select-all-campaigns" className="font-medium">
                      Select All ({selectedCampaigns.length}/{campaigns.length})
                    </Label>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search campaigns..."
                      value={campaignSearchQuery}
                      onChange={(e) => setCampaignSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>

                {/* Table Content */}
                <div className="max-h-80 overflow-y-auto">
                  {filteredCampaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`campaign-${campaign.id}`}
                          checked={selectedCampaigns.includes(campaign.id)}
                          onCheckedChange={() => handleCampaignToggle(campaign.id)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`campaign-${campaign.id}`} className="font-medium text-gray-900">
                              {campaign.name}
                            </Label>
                            <Badge variant={campaign.status === "active" ? "default" : "secondary"} className="text-xs">
                              {campaign.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{campaign.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>Created: {campaign.created}</span>
                            <span>•</span>
                            <span>Messages: {campaign.messageCount}</span>
                            <span>•</span>
                            <span>Opens: {campaign.openRate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {campaign.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {filteredCampaigns.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">No campaigns found matching your search.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Segments */}
            <div>
              <Label htmlFor="customer-segments">Customer Segments</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="high-value">High-Value Customers</SelectItem>
                  <SelectItem value="new">New Subscribers</SelectItem>
                  <SelectItem value="engaged">Highly Engaged</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          {/* 3. Schedule */}
          <TabsContent value="schedule" className="space-y-4">
            <h3 className="text-lg font-semibold">Schedule</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="frequency">Frequency *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual (On-demand)</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" defaultValue="09:00" />
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">EST</SelectItem>
                    <SelectItem value="pst">PST</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="cet">CET</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="date-range">Date Range Logic</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-24h">Last 24 hours</SelectItem>
                  <SelectItem value="last-7d">Last 7 days</SelectItem>
                  <SelectItem value="last-30d">Last 30 days</SelectItem>
                  <SelectItem value="previous-week">Previous week</SelectItem>
                  <SelectItem value="previous-month">Previous month</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          {/* 4. Delivery */}
          <TabsContent value="delivery" className="space-y-6">
            <h3 className="text-lg font-semibold">Delivery Options</h3>

            <div>
              <Label htmlFor="delivery-method">Delivery Method *</Label>
              <Select value={deliveryMethod} onValueChange={setDeliveryMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual Download</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sftp">SFTP</SelectItem>
                  <SelectItem value="webhook">Webhook</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Manual Download Configuration */}
            {deliveryMethod === "manual" && (
              <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
                <h4 className="font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Manual Download Configuration
                </h4>

                <div>
                  <Label htmlFor="manual-format">File Format</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-3 bg-blue-100 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>Manual reports</strong> can be generated on-demand by clicking the "Download" button.
                    Perfect for ad-hoc analysis and custom date ranges.
                  </p>
                </div>
              </div>
            )}

            {/* Email Configuration */}
            {deliveryMethod === "email" && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <h4 className="font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Configuration
                </h4>

                <div>
                  <Label className="text-base font-medium">Email Recipients (up to 5)</Label>
                  <div className="space-y-2 mt-2">
                    {emailRecipients.map((email, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="email@company.com"
                          value={email}
                          onChange={(e) => updateEmailRecipient(index, e.target.value)}
                        />
                        {emailRecipients.length > 1 && (
                          <Button type="button" variant="outline" size="sm" onClick={() => removeEmailRecipient(index)}>
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    {emailRecipients.length < 5 && (
                      <Button type="button" variant="outline" size="sm" onClick={addEmailRecipient}>
                        Add Recipient
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email-format">File Format</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* SFTP Configuration */}
            {deliveryMethod === "sftp" && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <h4 className="font-medium flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  SFTP Configuration
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sftp-host">Host *</Label>
                    <Input id="sftp-host" placeholder="reports.company.com" />
                  </div>
                  <div>
                    <Label htmlFor="sftp-port">Port</Label>
                    <Input id="sftp-port" defaultValue="22" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sftp-username">Username *</Label>
                    <Input id="sftp-username" placeholder="reports_user" />
                  </div>
                  <div>
                    <Label htmlFor="sftp-auth">Authentication</Label>
                    <Select defaultValue="password">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="password">Password</SelectItem>
                        <SelectItem value="ssh-key">SSH Key</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="sftp-password">Password *</Label>
                  <Input id="sftp-password" type="password" placeholder="••••••••" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sftp-path">Directory Path</Label>
                    <Input id="sftp-path" placeholder="/reports/" defaultValue="/reports/" />
                  </div>
                  <div>
                    <Label htmlFor="sftp-format">File Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="sftp-filename">File Naming Pattern</Label>
                  <Input id="sftp-filename" placeholder="report_{{date}}.csv" defaultValue="report_{{date}}.csv" />
                  <p className="text-sm text-gray-500 mt-1">
                    Available variables: {`{{date}}, {{time}}, {{report_name}}, {{type}}`}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                  <Button onClick={handleTestConnection} disabled={isTestingConnection} variant="outline" size="sm">
                    {isTestingConnection ? (
                      <>
                        <TestTube className="h-4 w-4 mr-2 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <TestTube className="h-4 w-4 mr-2" />
                        Test Connection
                      </>
                    )}
                  </Button>

                  {connectionStatus === "success" && (
                    <div className="flex items-center gap-2 text-green-600">
                      <span className="text-sm">✓ Connection successful</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Webhook Configuration */}
            {deliveryMethod === "webhook" && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <h4 className="font-medium flex items-center gap-2">
                  <Webhook className="h-4 w-4" />
                  Webhook Configuration
                </h4>

                <div>
                  <Label htmlFor="webhook-url">Webhook URL *</Label>
                  <Input id="webhook-url" placeholder="https://api.company.com/reports/webhook" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="webhook-method">HTTP Method</Label>
                    <Select defaultValue="post">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="post">POST</SelectItem>
                        <SelectItem value="put">PUT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="webhook-format">Data Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="xml">XML</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="webhook-headers">Custom Headers (Optional)</Label>
                  <Textarea id="webhook-headers" placeholder="Authorization: Bearer token123" rows={3} />
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                  <Button onClick={handleTestConnection} disabled={isTestingConnection} variant="outline" size="sm">
                    {isTestingConnection ? (
                      <>
                        <TestTube className="h-4 w-4 mr-2 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <TestTube className="h-4 w-4 mr-2" />
                        Test Webhook
                      </>
                    )}
                  </Button>

                  {connectionStatus === "success" && (
                    <div className="flex items-center gap-2 text-green-600">
                      <span className="text-sm">✓ Webhook test successful</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </div>
      </DialogTabs>

      <DialogFooter className="mt-6">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>Create Template</Button>
      </DialogFooter>
    </DialogContent>
  )
}
