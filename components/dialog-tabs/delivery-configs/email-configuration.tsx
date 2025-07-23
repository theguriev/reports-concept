"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail } from "lucide-react"

export function EmailConfiguration({
  emailRecipients,
  onAddEmailRecipient,
  onUpdateEmailRecipient,
  onRemoveEmailRecipient,
}) {
  return (
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
                onChange={(e) => onUpdateEmailRecipient(index, e.target.value)}
              />
              {emailRecipients.length > 1 && (
                <Button type="button" variant="outline" size="sm" onClick={() => onRemoveEmailRecipient(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
          {emailRecipients.length < 5 && (
            <Button type="button" variant="outline" size="sm" onClick={onAddEmailRecipient}>
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
  )
}
