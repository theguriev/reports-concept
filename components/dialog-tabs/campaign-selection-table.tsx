"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"

// Sample campaign data
const campaigns = [
  {
    id: 1,
    name: "Welcome Series",
    description: "Automated welcome sequence for new subscribers",
    status: "active",
    created: "Oct 15, 2024",
    messageCount: "5",
    openRate: "68%",
    tags: ["automation", "welcome"],
  },
  {
    id: 2,
    name: "Black Friday Promotion",
    description: "Special discount campaign for Black Friday",
    status: "active",
    created: "Oct 20, 2024",
    messageCount: "3",
    openRate: "45%",
    tags: ["promotion", "seasonal"],
  },
  {
    id: 3,
    name: "Product Launch Announcement",
    description: "Announcing our new product line",
    status: "completed",
    created: "Sep 30, 2024",
    messageCount: "2",
    openRate: "72%",
    tags: ["product", "announcement"],
  },
  {
    id: 4,
    name: "Newsletter - October",
    description: "Monthly newsletter with company updates",
    status: "active",
    created: "Oct 1, 2024",
    messageCount: "1",
    openRate: "55%",
    tags: ["newsletter", "monthly"],
  },
  {
    id: 5,
    name: "Abandoned Cart Recovery",
    description: "Recover abandoned shopping carts",
    status: "active",
    created: "Oct 10, 2024",
    messageCount: "4",
    openRate: "38%",
    tags: ["automation", "recovery"],
  },
  {
    id: 6,
    name: "Customer Feedback Survey",
    description: "Quarterly customer satisfaction survey",
    status: "paused",
    created: "Sep 15, 2024",
    messageCount: "2",
    openRate: "42%",
    tags: ["survey", "feedback"],
  },
]

export function CampaignSelectionTable({
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
  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(campaignSearchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(campaignSearchQuery.toLowerCase()) ||
      campaign.tags.some((tag) => tag.toLowerCase().includes(campaignSearchQuery.toLowerCase())),
  )

  return (
    <div>
      <Label className="text-base font-medium">Campaign Selection *</Label>
      <p className="text-sm text-gray-600 mb-3">Select which campaigns to include in this report</p>

      <div className="border rounded-lg">
        {/* Table Header */}
        <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all-campaigns"
              checked={selectedCampaigns.length === campaigns.length}
              onCheckedChange={() => onSelectAllCampaigns(campaigns)}
            />
            <Label htmlFor="select-all-campaigns" className="font-medium">
              Select All ({selectedCampaigns.length}/{campaigns.length})
            </Label>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search campaigns..."
              value={campaignSearchQuery}
              onChange={(e) => onCampaignSearchChange(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="max-h-80 overflow-y-auto">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`campaign-${campaign.id}`}
                  checked={selectedCampaigns.includes(campaign.id.toString())}
                  onCheckedChange={() => onCampaignToggle(campaign.id.toString())}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`campaign-${campaign.id}`} className="font-medium text-gray-900">
                      {campaign.name}
                    </Label>
                    <Badge variant={campaign.status === "active" ? "default" : "secondary"} className="text-xs">
                      {campaign.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{campaign.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>Created: {campaign.created}</span>
                    <span>•</span>
                    <span>Messages: {campaign.messageCount}</span>
                    <span>•</span>
                    <span>Opens: {campaign.openRate}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {campaign.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCampaigns.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500">No campaigns found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
