"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import DashboardLayout from "@/components/dashboard-layout"
import UrbanView from "@/components/urban-view"
import TrafficAnalysis from "@/components/traffic-analysis"
import ParkingAnalysis from "@/components/parking-analysis"
import FeatureManager from "@/components/feature-manager"
import UserFeatures from "@/components/user-features"
import { Cpu } from "lucide-react"

export default function DashboardPage() {
  const [activeFeature, setActiveFeature] = useState("urban-view")
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    setLoading(false)
  }, [user, router])

  if (loading) {
    return (
      <div className="min-h-screen space-gradient flex items-center justify-center">
        <div className="text-center">
          <Cpu className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const renderActiveFeature = () => {
    switch (activeFeature) {
      case "urban-view":
        return <UrbanView urbanId={params.urban_id} />
      case "traffic-analysis":
        return user.role === "developer" ? <TrafficAnalysis urbanId={params.urban_id} /> : <UserFeatures />
      case "parking-analysis":
        return user.role === "developer" ? <ParkingAnalysis urbanId={params.urban_id} /> : <UserFeatures />
      case "feature-manager":
        return user.role === "developer" ? <FeatureManager urbanId={params.urban_id} /> : <UserFeatures />
      case "user-features":
        return <UserFeatures urbanId={params.urban_id} />
      default:
        return <UrbanView urbanId={params.urban_id} />
    }
  }

  return (
    <DashboardLayout
      user={user}
      urbanId={params.urban_id}
      activeFeature={activeFeature}
      onFeatureChange={setActiveFeature}
    >
      {renderActiveFeature()}
    </DashboardLayout>
  )
}
