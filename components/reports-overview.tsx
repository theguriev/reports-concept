"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Download, Calendar, BarChart3, FileText, Clock, TrendingUp, Users, Mail } from "lucide-react"

const quickStats = [
  {
    title: "Reports Generated",
    value: "47",
    subtitle: "This month",
    icon: FileText,
    trend: "+12%",
  },
  {
    title: "Active Schedules",
    value: "8",
    subtitle: "Running automatically",
    icon: Clock,
    trend: "+2",
  },
  {
    title: "Data Points",
    value: "2.4M",
    subtitle: "Processed this week",
    icon: BarChart3,
    trend: "+18%",
  },
  {
    title: "Recipients",
    value: "23",
    subtitle: "Receiving reports",
    icon: Users,
    trend: "+5",
  },
]

const recentReports = [
  {
    name: "Daily Campaign Summary",
    type: "Campaign",
    generated: "2 hours ago",
    status: "delivered",
    downloadUrl: "#",
  },
  {
    name: "Weekly Abandoned Cart Report",
    type: "Abandoned Cart",
    generated: "1 day ago",
    status: "delivered",
    downloadUrl: "#",
  },
  {
    name: "Monthly Performance Report",
    type: "Customer",
    generated: "3 days ago",
    status: "delivered",
    downloadUrl: "#",
  },
  {
    name: "Revenue Analysis",
    type: "Revenue",
    generated: "5 days ago",
    status: "delivered",
    downloadUrl: "#",
  },
]

export default function ReportsOverview() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports Overview</h1>
          <p className="text-gray-600 mt-2">Monitor your reporting activity and generate new insights</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Create Template
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
                <div className="flex flex-col items-end">
                  <stat.icon className="h-8 w-8 text-gray-400 mb-2" />
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    {stat.trend}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Reports
              </span>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{report.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                        <span>•</span>
                        <span>{report.generated}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Generate Campaign Report
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Create New Template
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Configure SFTP
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
