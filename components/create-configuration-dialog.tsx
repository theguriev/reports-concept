"use client"

import { useState } from "react"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BasicInfoTab } from "./dialog-tabs/basic-info-tab"
import { DataSelectionTab } from "./dialog-tabs/data-selection-tab"
import { ScheduleTab } from "./dialog-tabs/schedule-tab"
import { DeliveryTab } from "./dialog-tabs/delivery-tab"

export function CreateConfigurationDialog({ onClose }: { onClose: () => void }) {
  const [selectedReportType, setSelectedReportType] = useState("")
  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [emailRecipients, setEmailRecipients] = useState([""])
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null)
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])
  const [campaignSearchQuery, setCampaignSearchQuery] = useState("")

  const addEmailRecipient = () => {
    if (emailRecipients.length < 5) {
      setEmailRecipients([...emailRecipients, ""])
    }
  }

  const updateEmailRecipient = (index: number, value: string) => {
    const updated = [...emailRecipients]
    updated[index] = value
    setEmailRecipients(updated)
  }

  const removeEmailRecipient = (index: number) => {
    setEmailRecipients(emailRecipients.filter((_, i) => i !== index))
  }

  const handleTestConnection = () => {
    setIsTestingConnection(true)
    setTimeout(() => {
      setIsTestingConnection(false)
      setConnectionStatus("success")
    }, 2000)
  }

  const handleCampaignToggle = (campaignId: string) => {
    setSelectedCampaigns((prev) =>
      prev.includes(campaignId) ? prev.filter((id) => id !== campaignId) : [...prev, campaignId],
    )
  }

  const handleSelectAllCampaigns = (campaigns: { id: number }[]) => {
    if (selectedCampaigns.length === campaigns.length) {
      setSelectedCampaigns([])
    } else {
      setSelectedCampaigns(campaigns.map((c) => c.id.toString()))
    }
  }

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto max-w-6xl sm:max-w-5xl">
      <DialogHeader>
        <DialogTitle>Create Report Configuration</DialogTitle>
        <DialogDescription>
          Configure a comprehensive report with metrics, scheduling, and delivery options.
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="data">Data Selection</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6">
          <BasicInfoTab selectedReportType={selectedReportType} onReportTypeChange={setSelectedReportType} />
        </TabsContent>

        <TabsContent value="data" className="mt-6">
          <DataSelectionTab
            selectedCampaigns={selectedCampaigns}
            campaignSearchQuery={campaignSearchQuery}
            onCampaignSearchChange={setCampaignSearchQuery}
            onCampaignToggle={handleCampaignToggle}
            onSelectAllCampaigns={handleSelectAllCampaigns}
          />
        </TabsContent>

        <TabsContent value="schedule" className="mt-6">
          <ScheduleTab />
        </TabsContent>

        <TabsContent value="delivery" className="mt-6">
          <DeliveryTab
            deliveryMethod={deliveryMethod}
            onDeliveryMethodChange={setDeliveryMethod}
            emailRecipients={emailRecipients}
            onAddEmailRecipient={addEmailRecipient}
            onUpdateEmailRecipient={updateEmailRecipient}
            onRemoveEmailRecipient={removeEmailRecipient}
            isTestingConnection={isTestingConnection}
            connectionStatus={connectionStatus}
            onTestConnection={handleTestConnection}
          />
        </TabsContent>
      </Tabs>

      <DialogFooter className="mt-6">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>Create Configuration</Button>
      </DialogFooter>
    </DialogContent>
  )
}
