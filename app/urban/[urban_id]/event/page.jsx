"use client"

import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import NavigationGuard from "@/components/navigation-guard"
import CityNavigation from "@/components/city-navigation"
import CityFeaturePage from "@/components/city-feature-page"

const eventsData = [
  {
    id: 1,
    title: "Tech Innovation Summit 2024",
    description: "Annual technology conference featuring AI, blockchain, and smart city innovations",
    location: "Convention Center, Downtown",
    date: "2024-03-15",
    time: "09:00 AM",
    category: "Technology",
    organizer: "Tech Quarter Association",
    capacity: 500,
    registered: 342,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Urban Green Festival",
    description: "Celebrating sustainable living and environmental awareness",
    location: "Green District Park",
    date: "2024-03-22",
    time: "10:00 AM",
    category: "Environment",
    organizer: "Green District Council",
    capacity: 1000,
    registered: 756,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Cultural Heritage Night",
    description: "Showcase of local arts, music, and cultural traditions",
    location: "Harbor Area Amphitheater",
    date: "2024-03-08",
    time: "07:00 PM",
    category: "Culture",
    organizer: "Cultural Affairs Department",
    capacity: 800,
    registered: 623,
    status: "completed",
  },
]

export default function EventPage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()

  const pageConfig = {
    title: "Events",
    description: "Discover and manage city events and activities",
    addButtonText: "Create Event",
    requestButtonText: "Request Event",
    itemName: "event",
    fields: [
      { key: "title", label: "Event Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "location", label: "Location", type: "text", required: true },
      { key: "date", label: "Date", type: "date", required: true },
      { key: "time", label: "Time", type: "time", required: true },
      {
        key: "category",
        label: "Category",
        type: "select",
        options: ["Technology", "Culture", "Sports", "Environment", "Community"],
        required: true,
      },
      { key: "capacity", label: "Capacity", type: "number", required: true },
    ],
  }

  return (
    <NavigationGuard requireAuth={true}>
      <div className="min-h-screen space-gradient">
        <CityNavigation urbanId={params.urban_id} currentFeature="event" />
        <CityFeaturePage
          data={eventsData}
          config={pageConfig}
          user={user}
          urbanId={params.urban_id}
          onNavigateBack={() => router.push(`/urban/${params.urban_id}/dashboard`)}
        />
      </div>
    </NavigationGuard>
  )
}
