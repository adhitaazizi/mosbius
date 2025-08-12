"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, AlertTriangle, TrendingUp, Clock, MapPin, BarChart3 } from "lucide-react"

const trafficData = {
  overview: {
    totalVehicles: 45672,
    avgSpeed: 32,
    congestionLevel: 68,
    incidents: 3,
  },
  hotspots: [
    { id: 1, location: "Highway 101 & Main St", congestion: 85, vehicles: 1247, avgSpeed: 15 },
    { id: 2, location: "Downtown Core", congestion: 72, vehicles: 892, avgSpeed: 22 },
    { id: 3, location: "Tech Quarter Bridge", congestion: 64, vehicles: 634, avgSpeed: 28 },
    { id: 4, location: "Industrial Zone Entry", congestion: 45, vehicles: 423, avgSpeed: 35 },
  ],
  incidents: [
    { id: 1, type: "accident", location: "Highway 101 Mile 23", severity: "high", duration: "45 min" },
    { id: 2, type: "construction", location: "Main St Bridge", severity: "medium", duration: "2 hours" },
    { id: 3, type: "event", location: "Stadium District", severity: "low", duration: "1 hour" },
  ],
}

export default function TrafficAnalysis({ urbanId }) {
  const getCongestionColor = (level) => {
    if (level >= 80) return "text-red-400"
    if (level >= 60) return "text-yellow-400"
    return "text-green-400"
  }

  const getCongestionBadge = (level) => {
    if (level >= 80) return "bg-red-500/20 text-red-400"
    if (level >= 60) return "bg-yellow-500/20 text-yellow-400"
    return "bg-green-500/20 text-green-400"
  }

  return (
    <div className="space-y-6">
      {/* Traffic Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Vehicles</p>
                <p className="text-2xl font-bold text-white">{trafficData.overview.totalVehicles.toLocaleString()}</p>
              </div>
              <Car className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Speed</p>
                <p className="text-2xl font-bold text-white">{trafficData.overview.avgSpeed} km/h</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Congestion</p>
                <p className={`text-2xl font-bold ${getCongestionColor(trafficData.overview.congestionLevel)}`}>
                  {trafficData.overview.congestionLevel}%
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Incidents</p>
                <p className="text-2xl font-bold text-red-400">{trafficData.overview.incidents}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="hotspots" className="space-y-6">
        <TabsList className="bg-gray-900/50 border-purple-500/20">
          <TabsTrigger value="hotspots" className="data-[state=active]:bg-purple-600">
            Traffic Hotspots
          </TabsTrigger>
          <TabsTrigger value="incidents" className="data-[state=active]:bg-purple-600">
            Active Incidents
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hotspots" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {trafficData.hotspots.map((hotspot) => (
              <Card key={hotspot.id} className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center justify-between text-lg">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-purple-400" />
                      {hotspot.location}
                    </div>
                    <Badge className={getCongestionBadge(hotspot.congestion)}>{hotspot.congestion}%</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Vehicles</span>
                      <span className="text-white">{hotspot.vehicles}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Avg Speed</span>
                      <span className="text-white">{hotspot.avgSpeed} km/h</span>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4">
          {trafficData.incidents.map((incident) => (
            <Card key={incident.id} className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle
                      className={`w-5 h-5 ${
                        incident.severity === "high"
                          ? "text-red-400"
                          : incident.severity === "medium"
                            ? "text-yellow-400"
                            : "text-blue-400"
                      }`}
                    />
                    <div>
                      <p className="text-white font-medium capitalize">
                        {incident.type} - {incident.location}
                      </p>
                      <p className="text-sm text-gray-400 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Duration: {incident.duration}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      incident.severity === "high"
                        ? "bg-red-500/20 text-red-400"
                        : incident.severity === "medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                    }
                  >
                    {incident.severity}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Traffic Analytics Dashboard</CardTitle>
              <CardDescription>Comprehensive traffic flow analysis and predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Peak Hours Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Morning Peak (7-9 AM)</span>
                      <span className="text-red-400">High Congestion</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Lunch Peak (12-1 PM)</span>
                      <span className="text-yellow-400">Moderate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Evening Peak (5-7 PM)</span>
                      <span className="text-red-400">High Congestion</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Optimization Suggestions</h4>
                  <div className="space-y-2">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                      Optimize Traffic Lights
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-purple-500/20 text-purple-400 bg-transparent"
                      size="sm"
                    >
                      Reroute Suggestions
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-purple-500/20 text-purple-400 bg-transparent"
                      size="sm"
                    >
                      Generate Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
