"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ParkingCircle, MapPin, Clock, TrendingDown, DollarSign } from "lucide-react"

const parkingData = {
  overview: {
    totalSpaces: 12450,
    occupiedSpaces: 4234,
    availableSpaces: 8216,
    occupancyRate: 34,
  },
  zones: [
    { id: 1, name: "Downtown Core", total: 2500, occupied: 2125, rate: 85, price: "$3/hour" },
    { id: 2, name: "Shopping District", total: 1800, occupied: 1260, rate: 70, price: "$2/hour" },
    { id: 3, name: "Business Quarter", total: 2200, occupied: 1540, rate: 70, price: "$2.50/hour" },
    { id: 4, name: "Residential North", total: 3200, occupied: 960, rate: 30, price: "$1/hour" },
    { id: 5, name: "Tech Campus", total: 1500, occupied: 225, rate: 15, price: "$1.50/hour" },
    { id: 6, name: "Harbor Area", total: 1250, occupied: 125, rate: 10, price: "$1/hour" },
  ],
  predictions: [
    { time: "Next Hour", occupancy: 38, trend: "up" },
    { time: "Peak Hours (5-7 PM)", occupancy: 78, trend: "up" },
    { time: "Evening (8-10 PM)", occupancy: 45, trend: "down" },
    { time: "Late Night (11 PM+)", occupancy: 15, trend: "down" },
  ],
}

export default function ParkingAnalysis({ urbanId }) {
  const getOccupancyColor = (rate) => {
    if (rate >= 80) return "text-red-400"
    if (rate >= 60) return "text-yellow-400"
    return "text-green-400"
  }

  const getOccupancyBadge = (rate) => {
    if (rate >= 80) return "bg-red-500/20 text-red-400"
    if (rate >= 60) return "bg-yellow-500/20 text-yellow-400"
    return "bg-green-500/20 text-green-400"
  }

  return (
    <div className="space-y-6">
      {/* Parking Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Spaces</p>
                <p className="text-2xl font-bold text-white">{parkingData.overview.totalSpaces.toLocaleString()}</p>
              </div>
              <ParkingCircle className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Available</p>
                <p className="text-2xl font-bold text-green-400">
                  {parkingData.overview.availableSpaces.toLocaleString()}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Occupied</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {parkingData.overview.occupiedSpaces.toLocaleString()}
                </p>
              </div>
              <ParkingCircle className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Occupancy Rate</p>
                <p className={`text-2xl font-bold ${getOccupancyColor(parkingData.overview.occupancyRate)}`}>
                  {parkingData.overview.occupancyRate}%
                </p>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Parking Zones */}
      <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Parking Zones Analysis</CardTitle>
          <CardDescription>Real-time occupancy by district</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parkingData.zones.map((zone) => (
              <Card key={zone.id} className="bg-gray-800/30 border-purple-500/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center justify-between text-lg">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-purple-400" />
                      {zone.name}
                    </div>
                    <Badge className={getOccupancyBadge(zone.rate)}>{zone.rate}%</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Occupancy</span>
                        <span className="text-white">
                          {zone.occupied}/{zone.total}
                        </span>
                      </div>
                      <Progress value={zone.rate} className="h-2" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Rate</span>
                      <span className="text-green-400 flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {zone.price}
                      </span>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                      View Zone Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Predictions */}
      <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="w-5 h-5 mr-2 text-purple-400" />
            Occupancy Predictions
          </CardTitle>
          <CardDescription>AI-powered parking demand forecasting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {parkingData.predictions.map((prediction, index) => (
              <Card key={index} className="bg-gray-800/30 border-purple-500/10">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-2">{prediction.time}</p>
                    <p className={`text-2xl font-bold mb-2 ${getOccupancyColor(prediction.occupancy)}`}>
                      {prediction.occupancy}%
                    </p>
                    <Badge
                      className={
                        prediction.trend === "up" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                      }
                    >
                      {prediction.trend === "up" ? "↗ Increasing" : "↘ Decreasing"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Management Actions */}
      <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Parking Management</CardTitle>
          <CardDescription>Administrative controls and optimization tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Actions</h4>
              <div className="space-y-2">
                <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                  Adjust Pricing Strategy
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-500/20 text-purple-400 bg-transparent"
                  size="sm"
                >
                  Send Availability Alerts
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-500/20 text-purple-400 bg-transparent"
                  size="sm"
                >
                  Generate Usage Report
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Optimization</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Revenue Today</span>
                  <span className="text-green-400">$12,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Avg Duration</span>
                  <span className="text-white">2.3 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Peak Efficiency</span>
                  <span className="text-purple-400">87%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
