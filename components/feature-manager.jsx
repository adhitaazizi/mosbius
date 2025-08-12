"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Settings, Eye, EyeOff, Trash2 } from "lucide-react"

const initialFeatures = [
  {
    id: 1,
    name: "Traffic Monitoring",
    description: "Real-time traffic flow analysis and congestion alerts",
    visibility: "user",
    status: "active",
    category: "traffic",
  },
  {
    id: 2,
    name: "Parking Finder",
    description: "Find available parking spots in real-time",
    visibility: "user",
    status: "active",
    category: "parking",
  },
  {
    id: 3,
    name: "Emergency Alerts",
    description: "Critical emergency notifications and evacuation routes",
    visibility: "user",
    status: "active",
    category: "emergency",
  },
  {
    id: 4,
    name: "System Diagnostics",
    description: "Advanced system monitoring and diagnostic tools",
    visibility: "developer",
    status: "active",
    category: "system",
  },
  {
    id: 5,
    name: "Air Quality Monitor",
    description: "Real-time air quality measurements and health recommendations",
    visibility: "user",
    status: "maintenance",
    category: "environment",
  },
]

export default function FeatureManager({ urbanId }) {
  const [features, setFeatures] = useState(initialFeatures)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newFeature, setNewFeature] = useState({
    name: "",
    description: "",
    visibility: "user",
    category: "general",
  })

  const handleAddFeature = () => {
    if (!newFeature.name || !newFeature.description) return

    const feature = {
      id: Date.now(),
      ...newFeature,
      status: "active",
    }

    setFeatures([...features, feature])
    setNewFeature({ name: "", description: "", visibility: "user", category: "general" })
    setShowAddForm(false)
  }

  const toggleFeatureStatus = (id) => {
    setFeatures(
      features.map((feature) =>
        feature.id === id ? { ...feature, status: feature.status === "active" ? "inactive" : "active" } : feature,
      ),
    )
  }

  const toggleFeatureVisibility = (id) => {
    setFeatures(
      features.map((feature) =>
        feature.id === id ? { ...feature, visibility: feature.visibility === "user" ? "developer" : "user" } : feature,
      ),
    )
  }

  const deleteFeature = (id) => {
    setFeatures(features.filter((feature) => feature.id !== id))
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400"
      case "inactive":
        return "bg-gray-500/20 text-gray-400"
      case "maintenance":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getVisibilityBadge = (visibility) => {
    return visibility === "user" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Feature Manager</h2>
          <p className="text-gray-400">Manage and configure urban system features</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Feature
        </Button>
      </div>

      {/* Add Feature Form */}
      {showAddForm && (
        <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Add New Feature</CardTitle>
            <CardDescription>Create a new feature for the urban system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Feature Name</label>
                <Input
                  value={newFeature.name}
                  onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                  placeholder="Enter feature name"
                  className="bg-gray-800/50 border-purple-500/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Category</label>
                <Select
                  value={newFeature.category}
                  onValueChange={(value) => setNewFeature({ ...newFeature, category: value })}
                >
                  <SelectTrigger className="bg-gray-800/50 border-purple-500/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-purple-500/20">
                    <SelectItem value="traffic">Traffic</SelectItem>
                    <SelectItem value="parking">Parking</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Description</label>
              <Textarea
                value={newFeature.description}
                onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                placeholder="Describe the feature functionality"
                className="bg-gray-800/50 border-purple-500/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Visibility</label>
              <Select
                value={newFeature.visibility}
                onValueChange={(value) => setNewFeature({ ...newFeature, visibility: value })}
              >
                <SelectTrigger className="bg-gray-800/50 border-purple-500/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-500/20">
                  <SelectItem value="user">User Visible</SelectItem>
                  <SelectItem value="developer">Developer Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddFeature} className="bg-purple-600 hover:bg-purple-700">
                Add Feature
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddForm(false)}
                className="border-purple-500/20 text-purple-400 bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features List */}
      <div className="grid gap-4">
        {features.map((feature) => (
          <Card key={feature.id} className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
                    <Badge className={getStatusBadge(feature.status)}>{feature.status}</Badge>
                    <Badge className={getVisibilityBadge(feature.visibility)}>
                      {feature.visibility === "user" ? "User Visible" : "Developer Only"}
                    </Badge>
                    <Badge variant="outline" className="border-purple-500/20 text-purple-400">
                      {feature.category}
                    </Badge>
                  </div>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFeatureStatus(feature.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFeatureVisibility(feature.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    {feature.visibility === "user" ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteFeature(feature.id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistics */}
      <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Feature Statistics</CardTitle>
          <CardDescription>Overview of feature usage and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{features.length}</p>
              <p className="text-sm text-gray-400">Total Features</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                {features.filter((f) => f.status === "active").length}
              </p>
              <p className="text-sm text-gray-400">Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">
                {features.filter((f) => f.visibility === "user").length}
              </p>
              <p className="text-sm text-gray-400">User Visible</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">
                {features.filter((f) => f.visibility === "developer").length}
              </p>
              <p className="text-sm text-gray-400">Developer Only</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
