"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import CityFeaturePage from "@/components/city-feature-page"

const communityData = [
  {
    id: 1,
    title: "Digital Community Center",
    description: "Modern community hub with co-working spaces and digital services",
    location: "Residential North, Community Plaza",
    type: "Community Center",
    services: ["Co-working", "Digital Services", "Meeting Rooms", "Events"],
    hours: "6:00 AM - 10:00 PM",
    contact: "community@mosbius.city",
    capacity: 500,
    status: "active",
  },
  {
    id: 2,
    title: "Makers' Collective",
    description: "Collaborative workspace for creators, inventors, and entrepreneurs",
    location: "Tech Quarter, Innovation Hub",
    type: "Makerspace",
    services: ["3D Printing", "Electronics Lab", "Workshops", "Mentorship"],
    hours: "24/7 Access",
    contact: "makers@mosbius.city",
    capacity: 100,
    status: "active",
  },
  {
    id: 3,
    title: "Green Community Garden",
    description: "Shared urban farming space for residents to grow food together",
    location: "Green District, Community Gardens",
    type: "Garden",
    services: ["Urban Farming", "Workshops", "Tool Library", "Composting"],
    hours: "Dawn to Dusk",
    contact: "garden@mosbius.city",
    capacity: 200,
    status: "active",
  },
]

export default function CommunityPage() {
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
    title: "Community",
    description: "Connect with community centers, groups, and local initiatives",
    addButtonText: "Add Community Space",
    requestButtonText: "Request Community Service",
    itemName: "community space",
    fields: [
      { key: "title", label: "Name", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "location", label: "Location", type: "text", required: true },
      {
        key: "type",
        label: "Type",
        type: "select",
        options: ["Community Center", "Makerspace", "Garden", "Library", "Recreation"],
        required: true,
      },
      { key: "hours", label: "Operating Hours", type: "text", required: true },
      { key: "contact", label: "Contact", type: "email", required: true },
      { key: "capacity", label: "Capacity", type: "number", required: true },
    ],
  }

  return (
    <CityFeaturePage
      data={communityData}
      config={pageConfig}
      user={user}
      urbanId={params.urban_id}
      onNavigateBack={() => router.push(`/urban/${params.urban_id}/dashboard`)}
    />
  )
}
