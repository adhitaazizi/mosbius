"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import CityFeaturePage from "@/components/city-feature-page"

const livingData = [
  {
    id: 1,
    title: "Skyline Apartments",
    description: "Modern luxury apartments with smart home technology and city views",
    location: "Downtown Core, Area Y",
    price: "$2,800/month",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,200 sq ft",
    amenities: ["Gym", "Pool", "Parking", "Smart Home"],
    status: "available",
  },
  {
    id: 2,
    title: "Green Valley Condos",
    description: "Eco-friendly condominiums with solar panels and green spaces",
    location: "Green District, Area Z",
    price: "$2,200/month",
    type: "Condo",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,400 sq ft",
    amenities: ["Garden", "Solar", "EV Charging", "Community Center"],
    status: "available",
  },
  {
    id: 3,
    title: "Tech Quarter Lofts",
    description: "Industrial-style lofts perfect for young professionals",
    location: "Tech Quarter, Area X",
    price: "$3,200/month",
    type: "Loft",
    bedrooms: 1,
    bathrooms: 1,
    area: "900 sq ft",
    amenities: ["High-speed Internet", "Co-working Space", "Rooftop Terrace"],
    status: "occupied",
  },
]

export default function LivingPage() {
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
    title: "Living",
    description: "Find apartments, condos, and housing options in the city",
    addButtonText: "Add Property",
    requestButtonText: "Request Housing Info",
    itemName: "property",
    fields: [
      { key: "title", label: "Property Name", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "location", label: "Location", type: "text", required: true },
      { key: "price", label: "Price", type: "text", required: true },
      {
        key: "type",
        label: "Type",
        type: "select",
        options: ["Apartment", "Condo", "House", "Loft", "Studio"],
        required: true,
      },
      { key: "bedrooms", label: "Bedrooms", type: "number", required: true },
      { key: "bathrooms", label: "Bathrooms", type: "number", required: true },
      { key: "area", label: "Area", type: "text", required: true },
    ],
  }

  return (
    <CityFeaturePage
      data={livingData}
      config={pageConfig}
      user={user}
      urbanId={params.urban_id}
      onNavigateBack={() => router.push(`/urban/${params.urban_id}/dashboard`)}
    />
  )
}
