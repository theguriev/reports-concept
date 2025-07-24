"use client"

import { useRouter } from "next/navigation"
import CreateConfigurationForm from "@/components/create-configuration-form"

export default function CreateReportPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/reports")
  }

  const handleSave = () => {
    // Handle save logic here
    console.log("Configuration saved")
    router.push("/reports")
  }

  return (
    <CreateConfigurationForm 
      onBack={handleBack}
      onSave={handleSave}
    />
  )
}
