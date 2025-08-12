"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import CityFeaturePage from "@/components/city-feature-page"

const reflexingData = [
  {
    id: 1,
    title: "Zen Meditation Pods",
    description: "Individual meditation pods with biofeedback and ambient control",
    location: "Wellness District, Tranquility Center",
    type: "Meditation",
    services: ["Guided Meditation", "Biofeedback", "Ambient Control", "Sound Therapy"],
    hours: "24/7 Access",
    pricing: "$25/session",
    features: ["Noise Cancellation", "Aromatherapy", "Temperature Control"],
    status: "active",
  },
  {
    id: 2,
    title: "Digital Detox Sanctuary",
    description: "Technology-free space for mental restoration and mindfulness",
    location: "Green District, Serenity Gardens",
    type: "Sanctuary",
    services: ["Digital Detox", "Nature Therapy", "Mindfulness Training", "Yoga"],
    hours: "6:00 AM - 9:00 PM",
    pricing: "$40/day pass",
    features: ["No Technology", "Natural Environment", "Guided Programs"],
    status: "active",
  },
  {
    id: 3,
    title: "Holographic Therapy Center",
    description: "Advanced therapy using holographic environments and AI counselors",
    location: "Medical District, Mental Health Hub",
    type: "Therapy",
    services: ["AI Counseling", "Holographic Environments", "Stress Relief", "Cognitive Training"],
    hours: "8:00 AM - 8:00 PM",
    pricing: "$80/session",
    features: ["AI Therapists", "Immersive Environments", "Progress Tracking"],
    status: "active",
  },
]

export default function ReflexingPage() {
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
    title: "Reflexing & Wellness",
    description: "Discover relaxation, meditation, and mental wellness facilities",
    addButtonText: "Add Wellness Facility",
    requestButtonText: "Request Wellness Service",
    itemName: "wellness facility",
    fields: [
      { key: "title", label: "Facility Name", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "location", label: "Location", type: "text", required: true },
      {
        key: "type",
        label: "Type",
        type: "select",
        options: ["Meditation", "Spa", "Therapy", "Sanctuary", "Yoga Studio"],
        required: true,
      },
      { key: "hours", label: "Operating Hours", type: "text", required: true },
      { key: "pricing", label: "Pricing", type: "text", required: true },
    ],
  }

  return (
    <CityFeaturePage
      data={reflexingData}
      config={pageConfig}
      user={user}
      urbanId={params.urban_id}
      onNavigateBack={() => router.push(`/urban/${params.urban_id}/dashboard`)}
    />
  )
}
