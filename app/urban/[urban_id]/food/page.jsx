"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import CityFeaturePage from "@/components/city-feature-page"

const foodData = [
  {
    id: 1,
    title: "Quantum Bistro",
    description: "Fusion cuisine with molecular gastronomy and smart ordering system",
    location: "Tech Quarter, Level 42",
    cuisine: "Fusion",
    priceRange: "$$$",
    rating: 4.8,
    hours: "11:00 AM - 11:00 PM",
    features: ["Smart Ordering", "VR Dining", "Sustainable Ingredients"],
    status: "open",
  },
  {
    id: 2,
    title: "Neon Noodle House",
    description: "Traditional ramen with a cyberpunk atmosphere",
    location: "Downtown Core, Neon District",
    cuisine: "Japanese",
    priceRange: "$$",
    rating: 4.6,
    hours: "12:00 PM - 2:00 AM",
    features: ["24/7 Service", "Robot Servers", "Authentic Recipes"],
    status: "open",
  },
  {
    id: 3,
    title: "Vertical Farm Cafe",
    description: "Farm-to-table dining with ingredients grown on-site",
    location: "Green District, Sky Garden",
    cuisine: "Organic",
    priceRange: "$$",
    rating: 4.7,
    hours: "08:00 AM - 10:00 PM",
    features: ["Vertical Farm", "Zero Waste", "Solar Powered"],
    status: "open",
  },
]

export default function FoodPage() {
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
    title: "Food & Dining",
    description: "Discover restaurants, cafes, and dining experiences",
    addButtonText: "Add Restaurant",
    requestButtonText: "Request Restaurant",
    itemName: "restaurant",
    fields: [
      { key: "title", label: "Restaurant Name", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "location", label: "Location", type: "text", required: true },
      { key: "cuisine", label: "Cuisine Type", type: "text", required: true },
      { key: "priceRange", label: "Price Range", type: "select", options: ["$", "$$", "$$$", "$$$$"], required: true },
      { key: "hours", label: "Operating Hours", type: "text", required: true },
    ],
  }

  return (
    <CityFeaturePage
      data={foodData}
      config={pageConfig}
      user={user}
      urbanId={params.urban_id}
      onNavigateBack={() => router.push(`/urban/${params.urban_id}/dashboard`)}
    />
  )
}
