"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ArrowLeft, Save } from "lucide-react"
import { BasicInfoTab } from "./dialog-tabs/basic-info-tab"
import { DataSelectionTab } from "./dialog-tabs/data-selection-tab"
import { ScheduleTab } from "./dialog-tabs/schedule-tab"
import { DeliveryTab } from "./dialog-tabs/delivery-tab"

export default function CreateConfigurationForm({ 
  onBack, 
  onSave 
}: { 
  onBack: () => void;
  onSave: () => void;
}) {
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
    setSelectedCampaigns(prev =>
      prev.includes(campaignId)
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    )
  }

  const selectAllCampaigns = () => {
    // Add logic for selecting all campaigns
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Reports
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Report Configuration</h1>
        <p className="text-gray-600">
          Set up a new report configuration with automated or manual delivery
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="data">Data Selection</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-6">
              <BasicInfoTab 
                selectedReportType={selectedReportType}
                onReportTypeChange={setSelectedReportType}
              />
            </TabsContent>
            
            <TabsContent value="data" className="space-y-6">
              <DataSelectionTab
                selectedCampaigns={selectedCampaigns}
                campaignSearchQuery={campaignSearchQuery}
                onCampaignSearchChange={setCampaignSearchQuery}
                onCampaignToggle={handleCampaignToggle}
                onSelectAllCampaigns={selectAllCampaigns}
              />
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-6">
              <ScheduleTab />
            </TabsContent>
            
            <TabsContent value="delivery" className="space-y-6">
              <DeliveryTab
                deliveryMethod={deliveryMethod}
                onDeliveryMethodChange={setDeliveryMethod}
                emailRecipients={emailRecipients}
                onUpdateEmailRecipient={updateEmailRecipient}
                onAddEmailRecipient={addEmailRecipient}
                onRemoveEmailRecipient={removeEmailRecipient}
                isTestingConnection={isTestingConnection}
                connectionStatus={connectionStatus}
                onTestConnection={handleTestConnection}
              />
            </TabsContent>
          </Tabs>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button onClick={onSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
