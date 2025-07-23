"use client"
import { CampaignSelectionTable } from "./campaign-selection-table"

export function DataSelectionTab({
  selectedCampaigns,
  campaignSearchQuery,
  onCampaignSearchChange,
  onCampaignToggle,
  onSelectAllCampaigns,
}: {
  selectedCampaigns: string[];
  campaignSearchQuery: string;
  onCampaignSearchChange: (value: string) => void;
  onCampaignToggle: (campaignId: string) => void;
  onSelectAllCampaigns: (campaigns: { id: number }[]) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Data Selection</h3>

      <CampaignSelectionTable
        selectedCampaigns={selectedCampaigns}
        campaignSearchQuery={campaignSearchQuery}
        onCampaignSearchChange={onCampaignSearchChange}
        onCampaignToggle={onCampaignToggle}
        onSelectAllCampaigns={onSelectAllCampaigns}
      />
    </div>
  )
}
