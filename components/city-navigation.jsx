"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Home, UtensilsCrossed, Music, Users, Heart, Dumbbell, Sparkles, ArrowLeft } from "lucide-react"

const cityFeatures = [
  { id: "event", label: "Events", icon: Calendar, color: "bg-blue-500" },
  { id: "living", label: "Living", icon: Home, color: "bg-green-500" },
  { id: "food", label: "Food", icon: UtensilsCrossed, color: "bg-orange-500" },
  { id: "entertainment", label: "Entertainment", icon: Music, color: "bg-pink-500" },
  { id: "community", label: "Community", icon: Users, color: "bg-indigo-500" },
  { id: "health", label: "Health", icon: Heart, color: "bg-red-500" },
  { id: "sport", label: "Sport", icon: Dumbbell, color: "bg-yellow-500" },
  { id: "reflexing", label: "Reflexing", icon: Sparkles, color: "bg-purple-500" },
]

export default function CityNavigation({ urbanId, currentFeature }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleFeatureClick = (featureId) => {
    router.push(`/urban/${urbanId}/${featureId}`)
  }

  const handleBackToDashboard = () => {
    router.push(`/urban/${urbanId}/dashboard`)
  }

  return (
    <div className="bg-gray-900/30 border-b border-purple-500/20 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToDashboard}
            className="text-gray-300 hover:text-white hover:bg-purple-500/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <div className="h-6 w-px bg-purple-500/20" />
          <h2 className="text-lg font-semibold text-white">City Features</h2>
        </div>
        {currentFeature && (
          <Badge variant="outline" className="border-purple-500/20 text-purple-400">
            {cityFeatures.find((f) => f.id === currentFeature)?.label}
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {cityFeatures.map((feature) => {
          const IconComponent = feature.icon
          const isActive = currentFeature === feature.id
          return (
            <Button
              key={feature.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => handleFeatureClick(feature.id)}
              className={`${
                isActive
                  ? "bg-purple-600 text-white border-purple-600"
                  : "border-purple-500/20 text-purple-400 hover:bg-purple-500/20 bg-transparent"
              }`}
            >
              <IconComponent className="w-4 h-4 mr-2" />
              {feature.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
