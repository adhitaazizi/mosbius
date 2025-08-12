"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, ArrowLeft, MapPin, Clock, Star, Filter, Search } from "lucide-react"

export default function CityFeaturePage({ data, config, user, urbanId, onNavigateBack }) {
  const [items, setItems] = useState(data)
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [newItem, setNewItem] = useState({})

  // Initialize form fields
  const initializeForm = () => {
    const initialForm = {}
    config.fields.forEach((field) => {
      initialForm[field.key] = ""
    })
    setNewItem(initialForm)
  }

  const handleAddItem = () => {
    // Validate required fields
    const missingFields = config.fields.filter((field) => field.required && !newItem[field.key])
    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.map((f) => f.label).join(", ")}`)
      return
    }

    const item = {
      id: Date.now(),
      ...newItem,
      status: "active",
      addedBy: user.displayName,
      dateAdded: new Date().toISOString().split("T")[0],
    }

    setItems([...items, item])
    setNewItem({})
    setShowAddForm(false)
  }

  const handleRequestItem = () => {
    // In a real app, this would send a request to administrators
    alert(`Request for new ${config.itemName} has been submitted for review.`)
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterType === "all" ||
      (item.type && item.type.toLowerCase() === filterType.toLowerCase()) ||
      (item.category && item.category.toLowerCase() === filterType.toLowerCase())
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
      case "open":
      case "available":
      case "upcoming":
        return "bg-green-500/20 text-green-400"
      case "maintenance":
      case "occupied":
        return "bg-yellow-500/20 text-yellow-400"
      case "inactive":
      case "closed":
      case "completed":
        return "bg-gray-500/20 text-gray-400"
      default:
        return "bg-blue-500/20 text-blue-400"
    }
  }

  const renderFormField = (field) => {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            value={newItem[field.key] || ""}
            onChange={(e) => setNewItem({ ...newItem, [field.key]: e.target.value })}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            className="bg-gray-800/50 border-purple-500/20 text-white"
          />
        )
      case "select":
        return (
          <Select
            value={newItem[field.key] || ""}
            onValueChange={(value) => setNewItem({ ...newItem, [field.key]: value })}
          >
            <SelectTrigger className="bg-gray-800/50 border-purple-500/20 text-white">
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-purple-500/20">
              {field.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      default:
        return (
          <Input
            type={field.type}
            value={newItem[field.key] || ""}
            onChange={(e) => setNewItem({ ...newItem, [field.key]: e.target.value })}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            className="bg-gray-800/50 border-purple-500/20 text-white"
          />
        )
    }
  }

  return (
    <div className="min-h-screen space-gradient">
      {/* Header */}
      <header className="border-b border-purple-500/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onNavigateBack} className="text-purple-400 hover:text-purple-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-mono font-bold text-glow">{config.title}</h1>
                <p className="text-sm text-gray-400">{config.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {user.role === "developer" ? (
                <Button
                  onClick={() => {
                    initializeForm()
                    setShowAddForm(!showAddForm)
                  }}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {config.addButtonText}
                </Button>
              ) : (
                <Button
                  onClick={handleRequestItem}
                  variant="outline"
                  className="border-purple-500/20 text-purple-400 hover:bg-purple-500/20 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {config.requestButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${config.title.toLowerCase()}...`}
              className="pl-10 bg-gray-800/50 border-purple-500/20 text-white"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48 bg-gray-800/50 border-purple-500/20 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-purple-500/20">
              <SelectItem value="all">All Types</SelectItem>
              {/* Dynamic filter options based on data */}
              {[...new Set(items.map((item) => item.type || item.category).filter(Boolean))].map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Add Form */}
        {showAddForm && user.role === "developer" && (
          <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-white">{config.addButtonText}</CardTitle>
              <CardDescription>Add a new {config.itemName} to the city</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {config.fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      {field.label} {field.required && <span className="text-red-400">*</span>}
                    </label>
                    {renderFormField(field)}
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddItem} className="bg-purple-600 hover:bg-purple-700">
                  Add {config.itemName}
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

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                  <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
                </div>
                <CardDescription className="text-gray-300">{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {item.location && (
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      {item.location}
                    </div>
                  )}
                  {item.hours && (
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      {item.hours}
                    </div>
                  )}
                  {item.rating && (
                    <div className="flex items-center text-sm text-yellow-400">
                      <Star className="w-4 h-4 mr-2 fill-current" />
                      {item.rating}/5
                    </div>
                  )}
                  {(item.price || item.pricing || item.ticketPrice || item.membership) && (
                    <div className="text-sm text-green-400 font-medium">
                      {item.price || item.pricing || item.ticketPrice || item.membership}
                    </div>
                  )}
                  {(item.type || item.category) && (
                    <Badge variant="outline" className="border-purple-500/20 text-purple-400">
                      {item.type || item.category}
                    </Badge>
                  )}
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No {config.title.toLowerCase()} found matching your criteria.</p>
            {user.role === "developer" && (
              <Button
                onClick={() => {
                  initializeForm()
                  setShowAddForm(true)
                }}
                className="mt-4 bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First {config.itemName}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
