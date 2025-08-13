"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, X, Zap, Shield, Globe, Users, BarChart3, Cpu } from "lucide-react"
import Link from "next/link"
import CityBackground from "@/components/city-background"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Urban Network Visualization",
      description: "Interactive 3D visualization of city infrastructure and connections",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Advanced traffic, parking, and resource analysis with AI insights",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Role-based Access",
      description: "Separate developer and user interfaces with customizable features",
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "AI-Powered Chatbot",
      description: "Intelligent assistant that can navigate and control system features",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Platform",
      description: "Enterprise-grade security with Firebase authentication",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Updates",
      description: "Live data synchronization across all urban systems",
    },
  ]

  return (
    <div className="min-h-screen space-gradient">
      {/* Header */}
      <header className="relative z-50 border-b border-blue-500/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-mono font-bold text-glow">MOSBIUS</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-300 hover:text-blue-400 transition-colors">
                Features
              </Link>
              <Link href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">
                About
              </Link>
              <Link href="/networks" className="text-gray-300 hover:text-blue-400 transition-colors">
                Networks
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent"
                >
                  Login
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-blue-500/20">
              <div className="flex flex-col space-y-4 pt-4">
                <Link href="#features" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Features
                </Link>
                <Link href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  About
                </Link>
                <Link href="/networks" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Networks
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white w-full bg-transparent"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <CityBackground />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-mono font-bold mb-6 text-glow">MOSBIUS</h1>
          <h2 className="text-xl md:text-2xl text-blue-300 mb-8 font-sans">Urban Intelligent System Dev Platform</h2>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Build, manage, and optimize smart city infrastructure with our advanced AI-powered platform. Connect urban
            systems, analyze data, and create intelligent solutions for tomorrow's cities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 city-glow">
                Start for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4 text-glow">Platform Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive tools for urban intelligence and smart city management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="text-blue-400 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-blue-500/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-6 text-glow">Choose Your Role</h2>
          <p className="text-xl text-gray-300 mb-12">Access the platform based on your needs and responsibilities</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card className="bg-gray-900/50 border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Cpu className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-4 text-white">Developer</h3>
                <p className="text-gray-300 mb-6">
                  Full access to system administration, analytics, and feature development
                </p>
                <Link href="/signup?role=developer">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full city-glow">
                    Start as Developer
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-4 text-white">User</h3>
                <p className="text-gray-300 mb-6">Access to urban services, information, and community features</p>
                <Link href="/signup?role=user">
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white w-full bg-transparent"
                  >
                    Start as User
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-500/20 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-mono font-bold text-glow">MOSBIUS</span>
              </div>
              <p className="text-gray-400">Advanced urban intelligence platform for smart city management</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/networks" className="hover:text-blue-400 transition-colors">
                    Networks
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-blue-400 transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-blue-400 transition-colors">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <span className="hover:text-blue-400 transition-colors">Analytics</span>
                </li>
                <li>
                  <span className="hover:text-blue-400 transition-colors">AI Chatbot</span>
                </li>
                <li>
                  <span className="hover:text-blue-400 transition-colors">Real-time Data</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <span className="hover:text-blue-400 transition-colors">Documentation</span>
                </li>
                <li>
                  <span className="hover:text-blue-400 transition-colors">API Reference</span>
                </li>
                <li>
                  <span className="hover:text-blue-400 transition-colors">Contact</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-500/20 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mosbius. All rights reserved. Built for the future of urban intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
