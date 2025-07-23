"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Server, CheckCircle, AlertTriangle, TestTube } from "lucide-react"

export default function SftpConfiguration() {
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null)

  const handleTestConnection = () => {
    setIsTestingConnection(true)
    // Simulate connection test
    setTimeout(() => {
      setIsTestingConnection(false)
      setConnectionStatus("success") // or "error"
    }, 2000)
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SFTP Configuration</h1>
        <p className="text-gray-600">Configure secure file transfer settings for report delivery</p>
      </div>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="settings">Connection Settings</TabsTrigger>
          <TabsTrigger value="templates">File Templates</TabsTrigger>
          <TabsTrigger value="history">Transfer History</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                SFTP Server Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Connection Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="host">Host *</Label>
                  <Input id="host" placeholder="reports.company.com" />
                </div>
                <div>
                  <Label htmlFor="port">Port</Label>
                  <Input id="port" defaultValue="22" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Username *</Label>
                  <Input id="username" placeholder="reports_user" />
                </div>
                <div>
                  <Label htmlFor="auth-method">Authentication Method</Label>
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
                <Label htmlFor="password">Password *</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>

              <div>
                <Label htmlFor="directory">Directory Path</Label>
                <Input id="directory" placeholder="/reports/" defaultValue="/reports/" />
              </div>

              {/* File Naming */}
              <div>
                <Label htmlFor="file-naming">File Naming Pattern</Label>
                <Input id="file-naming" placeholder="report_2024-01-01.csv" defaultValue="report_{{date}}.csv" />
                <p className="text-sm text-gray-500 mt-1">
                  Available variables: {`{{date}}, {{time}}, {{report_name}}, {{type}}`}
                </p>
              </div>

              {/* Test Connection */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <Button onClick={handleTestConnection} disabled={isTestingConnection} variant="outline">
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
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Connection successful</span>
                  </div>
                )}

                {connectionStatus === "error" && (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">Connection failed</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline">Cancel</Button>
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>File Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Daily Campaign Report</h4>
                    <Badge variant="secondary">CSV</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">daily_campaign_2024-01-01.csv</p>
                  <p className="text-xs text-gray-500">Includes: Opens, Clicks, Conversions, Revenue</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Weekly Summary</h4>
                    <Badge variant="secondary">Excel</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">weekly_summary_2024-01-01.xlsx</p>
                  <p className="text-xs text-gray-500">Includes: Campaign performance, Customer metrics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    file: "daily_campaign_2024-10-31.csv",
                    date: "Oct 31, 9:15 AM",
                    status: "success",
                    size: "2.4 MB",
                  },
                  {
                    file: "weekly_summary_2024-10-30.xlsx",
                    date: "Oct 30, 6:05 AM",
                    status: "success",
                    size: "5.1 MB",
                  },
                  {
                    file: "daily_campaign_2024-10-30.csv",
                    date: "Oct 30, 9:15 AM",
                    status: "failed",
                    error: "Connection timeout",
                  },
                ].map((transfer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {transfer.status === "success" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{transfer.file}</p>
                        <p className="text-sm text-gray-500">
                          {transfer.date} {transfer.size && `• ${transfer.size}`}
                          {transfer.error && `• ${transfer.error}`}
                        </p>
                      </div>
                    </div>
                    {transfer.status === "failed" && (
                      <Button variant="outline" size="sm">
                        Retry
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
