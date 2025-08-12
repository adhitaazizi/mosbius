"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Cpu, LayoutDashboard, Car, ParkingCircle, Settings, Users, LogOut, Menu, MessageCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import FloatingChatbot from "@/components/floating-chatbot"

const developerFeatures = [
  { id: "urban-view", label: "Urban Dashboard", icon: LayoutDashboard },
  { id: "traffic-analysis", label: "Traffic Analysis", icon: Car },
  { id: "parking-analysis", label: "Parking Analysis", icon: ParkingCircle },
  { id: "feature-manager", label: "Feature Manager", icon: Settings },
]

const userFeatures = [
  { id: "urban-view", label: "Urban View", icon: LayoutDashboard },
  { id: "user-features", label: "Available Features", icon: Users },
]

export default function DashboardLayout({ children, user, urbanId, activeFeature, onFeatureChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [chatbotMinimized, setChatbotMinimized] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()

  const features = user.role === "developer" ? developerFeatures : userFeatures

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className="min-h-screen space-gradient flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 bg-gray-900/50 border-r border-purple-500/20 backdrop-blur-sm flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-purple-500/20">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-2 ${!sidebarOpen && "justify-center"}`}>
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-lg font-mono font-bold text-glow">MOSBIUS</h1>
                  <p className="text-xs text-gray-400 capitalize">{urbanId.replace("-", " ")}</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* User Info */}
        {sidebarOpen && (
          <div className="p-4 border-b border-purple-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">{user.displayName?.[0]?.toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.displayName}</p>
                <Badge variant="outline" className="text-xs border-purple-500/20 text-purple-400">
                  {user.role}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {features.map((feature) => {
              const IconComponent = feature.icon
              const isActive = activeFeature === feature.id
              return (
                <Button
                  key={feature.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive ? "bg-purple-600 text-white" : "text-gray-300 hover:text-white hover:bg-purple-500/20"
                  } ${!sidebarOpen && "justify-center px-2"}`}
                  onClick={() => onFeatureChange(feature.id)}
                >
                  <IconComponent className={`w-4 h-4 ${sidebarOpen ? "mr-2" : ""}`} />
                  {sidebarOpen && feature.label}
                </Button>
              )
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-purple-500/20">
          <Button
            variant="ghost"
            className={`w-full text-gray-300 hover:text-white hover:bg-red-500/20 ${
              !sidebarOpen && "justify-center px-2"
            }`}
            onClick={handleLogout}
          >
            <LogOut className={`w-4 h-4 ${sidebarOpen ? "mr-2" : ""}`} />
            {sidebarOpen && "Logout"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-gray-900/30 border-b border-purple-500/20 backdrop-blur-sm flex items-center justify-between px-6">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {features.find((f) => f.id === activeFeature)?.label || "Dashboard"}
            </h2>
            <p className="text-sm text-gray-400">Urban Intelligence System</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChatbotOpen(!chatbotOpen)}
              className="border-purple-500/20 text-purple-400 hover:bg-purple-500/20 bg-transparent"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/networks")}
              className="border-purple-500/20 text-purple-400 hover:bg-purple-500/20 bg-transparent"
            >
              Networks
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/urban/${urbanId}/event`)}
              className="border-purple-500/20 text-purple-400 hover:bg-purple-500/20 bg-transparent"
            >
              City Features
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>

      {/* Floating Chatbot */}
      {chatbotOpen && (
        <FloatingChatbot
          isMinimized={chatbotMinimized}
          onMinimize={() => setChatbotMinimized(!chatbotMinimized)}
          onClose={() => setChatbotOpen(false)}
          urbanId={urbanId}
          user={user}
        />
      )}
    </div>
  )
}
