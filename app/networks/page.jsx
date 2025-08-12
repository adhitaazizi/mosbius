"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Cpu,
  Car,
  ParkingCircle,
  Zap,
  Droplets,
  Wifi,
  Shield,
  Activity,
  Users,
  Building,
  LogOut,
  Settings,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import NavigationGuard from "@/components/navigation-guard"
import NetworkGraph from "@/components/network-graph"
import NetworkStats from "@/components/network-stats"

// Dummy network data for urban systems
const networkData = {
  nodes: [
    { id: "traffic", label: "Traffic Control", type: "traffic", status: "active", connections: 15 },
    { id: "parking", label: "Parking Management", type: "parking", status: "active", connections: 8 },
    { id: "power", label: "Power Grid", type: "power", status: "active", connections: 22 },
    { id: "water", label: "Water System", type: "water", status: "active", connections: 12 },
    { id: "telecom", label: "Telecommunications", type: "telecom", status: "active", connections: 18 },
    { id: "security", label: "Security Network", type: "security", status: "warning", connections: 10 },
    { id: "emergency", label: "Emergency Services", type: "emergency", status: "active", connections: 14 },
    { id: "transport", label: "Public Transport", type: "transport", status: "active", connections: 16 },
    { id: "waste", label: "Waste Management", type: "waste", status: "active", connections: 6 },
    { id: "lighting", label: "Street Lighting", type: "lighting", status: "active", connections: 25 },
    { id: "air", label: "Air Quality", type: "air", status: "warning", connections: 9 },
    { id: "buildings", label: "Smart Buildings", type: "buildings", status: "active", connections: 20 },
  ],
  edges: [
    { from: "traffic", to: "parking", strength: 0.8 },
    { from: "traffic", to: "transport", strength: 0.9 },
    { from: "traffic", to: "emergency", strength: 0.7 },
    { from: "power", to: "lighting", strength: 0.9 },
    { from: "power", to: "buildings", strength: 0.8 },
    { from: "power", to: "traffic", strength: 0.6 },
    { from: "water", to: "buildings", strength: 0.7 },
    { from: "water", to: "waste", strength: 0.5 },
    { from: "telecom", to: "security", strength: 0.8 },
    { from: "telecom", to: "emergency", strength: 0.9 },
    { from: "telecom", to: "traffic", strength: 0.7 },
    { from: "security", to: "emergency", strength: 0.9 },
    { from: "security", to: "buildings", strength: 0.6 },
    { from: "transport", to: "parking", strength: 0.7 },
    { from: "air", to: "traffic", strength: 0.6 },
    { from: "air", to: "buildings", strength: 0.5 },
    { from: "lighting", to: "security", strength: 0.7 },
    { from: "waste", to: "transport", strength: 0.4 },
  ],
}

const systemIcons = {
  traffic: Car,
  parking: ParkingCircle,
  power: Zap,
  water: Droplets,
  telecom: Wifi,
  security: Shield,
  emergency: Activity,
  transport: Users,
  waste: Building,
  lighting: Zap,
  air: Activity,
  buildings: Building,
}

export default function NetworksPage() {
  const [selectedNode, setSelectedNode] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <NavigationGuard requireAuth={true}>
      <div className="min-h-screen space-gradient">
        {/* Header */}
        <header className="border-b border-purple-500/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-mono font-bold text-glow">MOSBIUS</h1>
                  <p className="text-sm text-gray-400">Urban Network Overview</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-white">{user?.displayName}</p>
                  <Badge variant="outline" className="text-xs border-purple-500/20 text-purple-400">
                    {user?.role}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-purple-500/20 text-purple-400 hover:bg-purple-500/20 bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-mono font-bold mb-2 text-glow">Urban System Networks</h2>
            <p className="text-gray-300">
              Interactive visualization of connected urban infrastructure and intelligent systems
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-gray-900/50 border-purple-500/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
                Network Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
                System Analytics
              </TabsTrigger>
              <TabsTrigger value="management" className="data-[state=active]:bg-purple-600">
                Management
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Network Graph */}
                <div className="lg:col-span-2">
                  <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Network Topology</CardTitle>
                      <CardDescription>Interactive graph of urban system connections</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <NetworkGraph data={networkData} onNodeSelect={setSelectedNode} selectedNode={selectedNode} />
                    </CardContent>
                  </Card>
                </div>

                {/* System Details */}
                <div className="space-y-4">
                  <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">System Status</CardTitle>
                      <CardDescription>Real-time network health</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Active Systems</span>
                          <Badge className="bg-green-500/20 text-green-400">
                            {networkData.nodes.filter((n) => n.status === "active").length}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Warning Systems</span>
                          <Badge className="bg-yellow-500/20 text-yellow-400">
                            {networkData.nodes.filter((n) => n.status === "warning").length}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Total Connections</span>
                          <Badge className="bg-purple-500/20 text-purple-400">{networkData.edges.length}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {selectedNode && (
                    <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          {(() => {
                            const IconComponent = systemIcons[selectedNode.type] || Cpu
                            return <IconComponent className="w-5 h-5 mr-2 text-purple-400" />
                          })()}
                          {selectedNode.label}
                        </CardTitle>
                        <CardDescription>System details and connections</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Status</span>
                            <Badge
                              className={
                                selectedNode.status === "active"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }
                            >
                              {selectedNode.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Connections</span>
                            <span className="text-white">{selectedNode.connections}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Type</span>
                            <span className="text-purple-400 capitalize">{selectedNode.type}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <NetworkStats data={networkData} />
            </TabsContent>

            <TabsContent value="management">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                    <CardDescription>Manage urban systems</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {user?.role === "developer" ? (
                      <>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          <Settings className="w-4 h-4 mr-2" />
                          System Configuration
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-purple-500/20 text-purple-400 bg-transparent"
                        >
                          Add New System
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-purple-500/20 text-purple-400 bg-transparent"
                        >
                          Network Diagnostics
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          <Activity className="w-4 h-4 mr-2" />
                          View System Status
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-purple-500/20 text-purple-400 bg-transparent"
                        >
                          Report Issue
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-purple-500/20 text-purple-400 bg-transparent"
                        >
                          Request Access
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Access Dashboard</CardTitle>
                    <CardDescription>Navigate to urban management interface</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Access the full urban management dashboard with role-based features and real-time monitoring.
                    </p>
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => router.push("/urban/demo-city/dashboard")}
                    >
                      <Building className="w-4 h-4 mr-2" />
                      Open Dashboard
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </NavigationGuard>
  )
}
