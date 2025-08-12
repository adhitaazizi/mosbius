"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Car,
  ParkingCircle,
  Zap,
  Droplets,
  Users,
  Building,
  AlertTriangle,
  TrendingUp,
  MapPin,
} from "lucide-react"

// Dummy urban data
const urbanData = {
  overview: {
    population: 2847392,
    area: "1,572 km²",
    districts: 12,
    activeServices: 156,
  },
  realTimeStats: {
    traffic: { status: "moderate", level: 68, trend: "up" },
    parking: { status: "available", level: 34, trend: "down" },
    power: { status: "optimal", level: 92, trend: "stable" },
    water: { status: "good", level: 87, trend: "stable" },
    emergency: { status: "normal", level: 12, trend: "down" },
  },
  alerts: [
    { id: 1, type: "traffic", message: "Heavy congestion on Highway 101", severity: "medium", time: "5 min ago" },
    { id: 2, type: "parking", message: "Downtown parking 85% full", severity: "low", time: "12 min ago" },
    { id: 3, type: "power", message: "Scheduled maintenance in District 7", severity: "low", time: "1 hour ago" },
  ],
  districts: [
    { id: 1, name: "Downtown", population: 245000, status: "active", services: 23 },
    { id: 2, name: "Tech Quarter", population: 189000, status: "active", services: 18 },
    { id: 3, name: "Residential North", population: 312000, status: "active", services: 15 },
    { id: 4, name: "Industrial Zone", population: 98000, status: "maintenance", services: 12 },
    { id: 5, name: "Green District", population: 156000, status: "active", services: 14 },
    { id: 6, name: "Harbor Area", population: 134000, status: "active", services: 11 },
  ],
}

export default function UrbanView({ urbanId }) {
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status) => {
    switch (status) {
      case "optimal":
      case "good":
      case "normal":
      case "active":
        return "text-green-400"
      case "moderate":
      case "available":
        return "text-yellow-400"
      case "maintenance":
        return "text-orange-400"
      default:
        return "text-red-400"
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "optimal":
      case "good":
      case "normal":
      case "active":
        return "bg-green-500/20 text-green-400"
      case "moderate":
      case "available":
        return "bg-yellow-500/20 text-yellow-400"
      case "maintenance":
        return "bg-orange-500/20 text-orange-400"
      default:
        return "bg-red-500/20 text-red-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Urban Overview Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Population</p>
                <p className="text-2xl font-bold text-white">{urbanData.overview.population.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Area</p>
                <p className="text-2xl font-bold text-white">{urbanData.overview.area}</p>
              </div>
              <MapPin className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Districts</p>
                <p className="text-2xl font-bold text-white">{urbanData.overview.districts}</p>
              </div>
              <Building className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Services</p>
                <p className="text-2xl font-bold text-white">{urbanData.overview.activeServices}</p>
              </div>
              <Activity className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-900/50 border-purple-500/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
            System Overview
          </TabsTrigger>
          <TabsTrigger value="districts" className="data-[state=active]:bg-purple-600">
            District View
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-purple-600">
            Active Alerts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Real-time System Status */}
            {Object.entries(urbanData.realTimeStats).map(([system, data]) => {
              const icons = {
                traffic: Car,
                parking: ParkingCircle,
                power: Zap,
                water: Droplets,
                emergency: AlertTriangle,
              }
              const IconComponent = icons[system] || Activity

              return (
                <Card key={system} className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white flex items-center text-lg">
                      <IconComponent className="w-5 h-5 mr-2 text-purple-400" />
                      {system.charAt(0).toUpperCase() + system.slice(1)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Status</span>
                        <Badge className={getStatusBadge(data.status)}>{data.status}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Level</span>
                        <span className="text-white">{data.level}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Trend</span>
                        <span className={`flex items-center ${getStatusColor(data.status)}`}>
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {data.trend}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="districts" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {urbanData.districts.map((district) => (
              <Card
                key={district.id}
                className={`bg-gray-900/50 border-purple-500/20 backdrop-blur-sm cursor-pointer transition-all duration-200 ${
                  selectedDistrict?.id === district.id
                    ? "border-purple-500/60 bg-purple-500/10"
                    : "hover:border-purple-500/40"
                }`}
                onClick={() => setSelectedDistrict(district)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center justify-between">
                    {district.name}
                    <Badge className={getStatusBadge(district.status)}>{district.status}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Population</span>
                      <span className="text-white">{district.population.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Services</span>
                      <span className="text-purple-400">{district.services}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedDistrict && (
            <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">{selectedDistrict.name} - Detailed View</CardTitle>
                <CardDescription>Comprehensive district information and controls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">District Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Population Density</span>
                        <span className="text-white">2,847 per km²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Active Services</span>
                        <span className="text-green-400">{selectedDistrict.services}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Infrastructure Score</span>
                        <span className="text-purple-400">8.7/10</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                        View Traffic Data
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-purple-500/20 text-purple-400 bg-transparent"
                        size="sm"
                      >
                        Parking Analysis
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-purple-500/20 text-purple-400 bg-transparent"
                        size="sm"
                      >
                        Service Reports
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          {urbanData.alerts.map((alert) => (
            <Card key={alert.id} className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle
                      className={`w-5 h-5 ${
                        alert.severity === "high"
                          ? "text-red-400"
                          : alert.severity === "medium"
                            ? "text-yellow-400"
                            : "text-blue-400"
                      }`}
                    />
                    <div>
                      <p className="text-white font-medium">{alert.message}</p>
                      <p className="text-sm text-gray-400">{alert.time}</p>
                    </div>
                  </div>
                  <Badge
                    className={
                      alert.severity === "high"
                        ? "bg-red-500/20 text-red-400"
                        : alert.severity === "medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                    }
                  >
                    {alert.severity}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
