"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ScheduleTab() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Schedule</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="frequency">Frequency *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
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
    </div>
  )
}
