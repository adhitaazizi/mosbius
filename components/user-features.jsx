"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, ParkingCircle, AlertTriangle, Activity, Droplets, Zap } from "lucide-react"

const availableFeatures = [
  {
    id: 1,
    name: "Traffic Monitoring",
    description: "View real-time traffic conditions and get route recommendations",
    icon: Car,
    category: "traffic",
    status: "available",
  },
  {
    id: 2,
    name: "Parking Finder",
    description: "Find available parking spots near your destination",
    icon: ParkingCircle,
    category: "parking",
    status: "available",
  },
  {
    id: 3,
    name: "Emergency Alerts",
    description: "Receive important emergency notifications and safety updates",
    icon: AlertTriangle,
    category: "emergency",
    status: "available",
  },
  {
    id: 4,
    name: "Air Quality Monitor",
    description: "Check air quality levels and health recommendations",
    icon: Activity,
    category: "environment",
    status: "maintenance",
  },
  {
    id: 5,
    name: "Water Quality Reports",
    description: "Access water quality data and safety information",
    icon: Droplets,
    category: "utilities",
    status: "available",
  },
  {
    id: 6,
    name: "Power Outage Tracker",
    description: "Monitor power grid status and outage notifications",
    icon: Zap,
    category: "utilities",
    status: "available",
  },
]

export default function UserFeatures({ urbanId }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500/20 text-green-400"
      case "maintenance":
        return "bg-yellow-500/20 text-yellow-400"
      case "unavailable":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "traffic":
        return "border-blue-500/20 text-blue-400"
      case "parking":
        return "border-green-500/20 text-green-400"
      case "emergency":
        return "border-red-500/20 text-red-400"
      case "environment":
        return "border-purple-500/20 text-purple-400"
      case "utilities":
        return "border-yellow-500/20 text-yellow-400"
      default:
        return "border-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Available Features</h2>
        <p className="text-gray-400">Access urban services and information systems</p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableFeatures.map((feature) => {
          const IconComponent = feature.icon
          return (
            <Card
              key={feature.id}
              className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="w-8 h-8 text-purple-400" />
                  <Badge className={getStatusBadge(feature.status)}>{feature.status}</Badge>
                </div>
                <CardTitle className="text-white text-lg">{feature.name}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="outline" className={getCategoryColor(feature.category)}>
                    {feature.category}
                  </Badge>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={feature.status !== "available"}
                  >
                    {feature.status === "available" ? "Access Feature" : "Under Maintenance"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Feature Categories */}
      <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Feature Categories</CardTitle>
          <CardDescription>Browse features by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {["traffic", "parking", "emergency", "environment", "utilities"].map((category) => {
              const count = availableFeatures.filter((f) => f.category === category).length
              return (
                <Card key={category} className="bg-gray-800/30 border-purple-500/10 text-center p-4">
                  <h3 className="text-lg font-semibold text-white capitalize mb-2">{category}</h3>
                  <p className="text-2xl font-bold text-purple-400">{count}</p>
                  <p className="text-sm text-gray-400">Features</p>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Access */}
      <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Quick Access</CardTitle>
          <CardDescription>Frequently used features and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button className="h-16 bg-purple-600 hover:bg-purple-700 flex items-center justify-center space-x-3">
              <Car className="w-6 h-6" />
              <span className="text-lg">Check Traffic</span>
            </Button>
            <Button className="h-16 bg-purple-600 hover:bg-purple-700 flex items-center justify-center space-x-3">
              <ParkingCircle className="w-6 h-6" />
              <span className="text-lg">Find Parking</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
