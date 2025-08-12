"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import CityFeaturePage from "@/components/city-feature-page"

const entertainmentData = [
  {
    id: 1,
    title: "Holographic Cinema Complex",
    description: "Next-generation movie experience with 360° holographic projection",
    location: "Entertainment District, Level 5",
    type: "Cinema",
    capacity: 300,
    features: ["Holographic Display", "Immersive Audio", "VR Integration"],
    hours: "10:00 AM - 12:00 AM",
    ticketPrice: "$25",
    status: "open",
  },
  {
    id: 2,
    title: "Neon Arcade & Gaming Lounge",
    description: "Retro-futuristic gaming center with classic and modern games",
    location: "Tech Quarter, Gaming Hub",
    type: "Gaming",
    capacity: 150,
    features: ["VR Gaming", "Esports Arena", "Retro Arcade"],
    hours: "2:00 PM - 2:00 AM",
    ticketPrice: "$15/hour",
    status: "open",
  },
  {
    id: 3,
    title: "Sky Lounge & Observatory",
    description: "Rooftop bar with panoramic city views and stargazing",
    location: "Downtown Core, Sky Tower",
    type: "Lounge",
    capacity: 200,
    features: ["City Views", "Telescope Access", "Live Music"],
    hours: "6:00 PM - 3:00 AM",
    ticketPrice: "$30 cover",
    status: "open",
  },
]

export default function EntertainmentPage() {
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
    title: "Entertainment",
    description: "Explore entertainment venues, activities, and nightlife",
    addButtonText: "Add Venue",
    requestButtonText: "Request Venue",
    itemName: "venue",
    fields: [
      { key: "title", label: "Venue Name", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "location", label: "Location", type: "text", required: true },
      {
        key: "type",
        label: "Type",
        type: "select",
        options: ["Cinema", "Gaming", "Lounge", "Club", "Theater", "Museum"],
        required: true,
      },
      { key: "capacity", label: "Capacity", type: "number", required: true },
      { key: "hours", label: "Operating Hours", type: "text", required: true },
      { key: "ticketPrice", label: "Ticket Price", type: "text", required: true },
    ],
  }

  return (
    <CityFeaturePage
      data={entertainmentData}
      config={pageConfig}
      user={user}
      urbanId={params.urban_id}
      onNavigateBack={() => router.push(`/urban/${params.urban_id}/dashboard`)}
    />
  )
}
