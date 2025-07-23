"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Server, TestTube } from "lucide-react"

export function SftpConfiguration({ 
  isTestingConnection, 
  connectionStatus, 
  onTestConnection 
}: {
  isTestingConnection: boolean;
  connectionStatus: string | null;
  onTestConnection: () => void;
}) {
  return (
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
        <Button onClick={onTestConnection} disabled={isTestingConnection} variant="outline" size="sm">
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
  )
}
