"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const reportTypes = ["Campaign", "Customer", "Abandoned Cart", "Revenue", "Engagement", "Deliverability"]

export function BasicInfoTab({ 
  selectedReportType, 
  onReportTypeChange 
}: { 
  selectedReportType: string; 
  onReportTypeChange: (value: string) => void; 
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Basic Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="config-name">Configuration Name *</Label>
          <Input id="config-name" placeholder="e.g., Weekly Campaign Performance" />
        </div>

        <div>
          <Label htmlFor="report-type">Report Type *</Label>
          <Select value={selectedReportType} onValueChange={onReportTypeChange}>
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
        <Label htmlFor="config-description">Description</Label>
        <Textarea id="config-description" placeholder="Brief description of what this report includes..." rows={3} />
      </div>
    </div>
  )
}
