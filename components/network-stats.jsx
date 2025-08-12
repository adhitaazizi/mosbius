"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Activity, Zap } from "lucide-react"

export default function NetworkStats({ data }) {
  const totalNodes = data.nodes.length
  const totalEdges = data.edges.length
  const activeNodes = data.nodes.filter((n) => n.status === "active").length
  const warningNodes = data.nodes.filter((n) => n.status === "warning").length

  const systemTypes = data.nodes.reduce((acc, node) => {
    acc[node.type] = (acc[node.type] || 0) + 1
    return acc
  }, {})

  const avgConnections = data.nodes.reduce((sum, node) => sum + node.connections, 0) / totalNodes

  const networkHealth = (activeNodes / totalNodes) * 100

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Network Overview */}
      <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
            Network Overview
          </CardTitle>
          <CardDescription>System statistics and health metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Total Systems</span>
            <Badge className="bg-purple-500/20 text-purple-400">{totalNodes}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Active Connections</span>
            <Badge className="bg-blue-500/20 text-blue-400">{totalEdges}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Avg Connections</span>
            <span className="text-white">{avgConnections.toFixed(1)}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Network Health</span>
              <span className="text-white">{networkHealth.toFixed(0)}%</span>
            </div>
            <Progress value={networkHealth} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-400" />
            System Status
          </CardTitle>
          <CardDescription>Real-time operational status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Operational</span>
            <Badge className="bg-green-500/20 text-green-400">{activeNodes}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Warning</span>
            <Badge className="bg-yellow-500/20 text-yellow-400">{warningNodes}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Critical</span>
            <Badge className="bg-red-500/20 text-red-400">0</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Uptime</span>
              <span className="text-green-400">99.8%</span>
            </div>
            <Progress value={99.8} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
            Performance
          </CardTitle>
          <CardDescription>Network performance indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Latency</span>
            <span className="text-green-400">12ms</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Throughput</span>
            <span className="text-blue-400">2.4 GB/s</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Load</span>
            <span className="text-yellow-400">68%</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Efficiency</span>
              <span className="text-white">94.2%</span>
            </div>
            <Progress value={94.2} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* System Distribution */}
      <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-5 h-5 mr-2 text-purple-400" />
            System Distribution
          </CardTitle>
          <CardDescription>Breakdown of urban system types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(systemTypes).map(([type, count]) => (
              <div key={type} className="text-center p-4 bg-gray-800/30 rounded-lg border border-purple-500/10">
                <div className="text-2xl font-bold text-purple-400 mb-1">{count}</div>
                <div className="text-sm text-gray-300 capitalize">{type}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
