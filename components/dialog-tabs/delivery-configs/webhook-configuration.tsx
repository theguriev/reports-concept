"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Webhook, TestTube } from "lucide-react"

export function WebhookConfiguration({ isTestingConnection, connectionStatus, onTestConnection }) {
  return (
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
        <Button onClick={onTestConnection} disabled={isTestingConnection} variant="outline" size="sm">
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
  )
}
