"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ReportsHistoryPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the new main reports page
    router.replace("/reports")
  }, [router])

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="text-center">
        <p className="text-gray-600">Redirecting to reports...</p>
      </div>
    </div>
  )
}