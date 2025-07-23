"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmailConfiguration } from "./delivery-configs/email-configuration"
import { SftpConfiguration } from "./delivery-configs/sftp-configuration"
import { WebhookConfiguration } from "./delivery-configs/webhook-configuration"

export function DeliveryTab({
  deliveryMethod,
  onDeliveryMethodChange,
  emailRecipients,
  onAddEmailRecipient,
  onUpdateEmailRecipient,
  onRemoveEmailRecipient,
  isTestingConnection,
  connectionStatus,
  onTestConnection,
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Delivery Options</h3>

      <div>
        <Label htmlFor="delivery-method">Delivery Method *</Label>
        <Select value={deliveryMethod} onValueChange={onDeliveryMethodChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select delivery method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="sftp">SFTP</SelectItem>
            <SelectItem value="webhook">Webhook</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {deliveryMethod === "email" && (
        <EmailConfiguration
          emailRecipients={emailRecipients}
          onAddEmailRecipient={onAddEmailRecipient}
          onUpdateEmailRecipient={onUpdateEmailRecipient}
          onRemoveEmailRecipient={onRemoveEmailRecipient}
        />
      )}

      {deliveryMethod === "sftp" && (
        <SftpConfiguration
          isTestingConnection={isTestingConnection}
          connectionStatus={connectionStatus}
          onTestConnection={onTestConnection}
        />
      )}

      {deliveryMethod === "webhook" && (
        <WebhookConfiguration
          isTestingConnection={isTestingConnection}
          connectionStatus={connectionStatus}
          onTestConnection={onTestConnection}
        />
      )}
    </div>
  )
}
