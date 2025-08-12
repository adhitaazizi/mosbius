"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import CityFeaturePage from "@/components/city-feature-page"

const sportData = [
  {
    id: 1,
    title: "Quantum Sports Complex",
    description: "Multi-sport facility with AR training and smart equipment",
    location: "Sports District, Arena Plaza",
    type: "Sports Complex",
    facilities: ["Basketball", "Tennis", "Swimming", "Gym", "AR Training"],
    hours: "5:00 AM - 11:00 PM",
    membership: "$89/month",
    features: ["AR Coaching", "Biometric Tracking", "Smart Equipment"],
    status: "active",
  },
  {
    id: 2,
    title: "Cyber Stadium",
    description: "Esports arena and traditional sports venue with holographic displays",
    location: "Entertainment District, Stadium Row",
    type: "Stadium",
    facilities: ["Esports Arena", "Football Field", "Track", "Holographic Displays"],
    hours: "Event Based",
    membership: "Event Tickets",
    features: ["Holographic Replay", "VR Experience", "Live Streaming"],
    status: "active",
  },
  {
    id: 3,
    title: "Vertical Climbing Center",
    description: "Indoor rock climbing with dynamic routes and safety AI",
    location: "Adventure District, Climb Tower",
    type: "Climbing Gym",
    facilities: ["Indoor Climbing", "Bouldering", "Training Area", "Equipment Rental"],
    hours: "6:00 AM - 10:00 PM",
    membership: "$65/month",
    features: ["Dynamic Routes", "Safety AI", "Progress Tracking"],
    status: "active",
  },
]

export default function SportPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="min-h-screen space-gradient flex items-center justify-center">Loading...</div>
  }

  const pageConfig = {
    title: "Sports & Recreation",
    description: "Find sports facilities, gyms, and recreational activities",
    addButtonText: "Add Sports Facility",
    requestButtonText: "Request Sports Facility",
    itemName: "sports facility",
    fields: [
      { key: "title", label: "Facility Name", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "location", label: "Location", type: "text", required: true },
      {
        key: "type",
        label: "Type",
        type: "select",
        options: ["Gym", "Stadium", "Sports Complex", "Pool", "Court", "Track"],
        required: true,
      },
      { key: "hours", label: "Operating Hours", type: "text", required: true },
      { key: "membership", label: "Membership/Pricing", type: "text", required: true },
    ],
  }

  return (
    <CityFeaturePage
      data={sportData}
      config={pageConfig}
      user={user}
      urbanId={params.urban_id}
      onNavigateBack={() => router.push(`/urban/${params.urban_id}/dashboard`)}
    />
  )
}
