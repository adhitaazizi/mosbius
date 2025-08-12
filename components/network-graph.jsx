"use client"

import { useEffect, useRef, useState } from "react"

export default function NetworkGraph({ data, onNodeSelect, selectedNode }) {
  const canvasRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [nodes, setNodes] = useState([])
  const [hoveredNode, setHoveredNode] = useState(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.parentElement.getBoundingClientRect()
        setDimensions({ width: rect.width, height: Math.max(400, rect.width * 0.6) })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    // Initialize node positions
    const initialNodes = data.nodes.map((node, index) => {
      const angle = (index / data.nodes.length) * 2 * Math.PI
      const radius = Math.min(dimensions.width, dimensions.height) * 0.3
      return {
        ...node,
        x: dimensions.width / 2 + Math.cos(angle) * radius,
        y: dimensions.height / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
      }
    })
    setNodes(initialNodes)
  }, [data.nodes, dimensions])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw edges
      ctx.strokeStyle = "rgba(147, 51, 234, 0.3)"
      ctx.lineWidth = 1
      data.edges.forEach((edge) => {
        const fromNode = nodes.find((n) => n.id === edge.from)
        const toNode = nodes.find((n) => n.id === edge.to)
        if (fromNode && toNode) {
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)
          ctx.stroke()

          // Draw connection strength
          const strength = edge.strength || 0.5
          ctx.strokeStyle = `rgba(147, 51, 234, ${strength * 0.8})`
          ctx.lineWidth = strength * 3
          ctx.stroke()
          ctx.strokeStyle = "rgba(147, 51, 234, 0.3)"
          ctx.lineWidth = 1
        }
      })

      // Draw nodes
      nodes.forEach((node) => {
        const isSelected = selectedNode && selectedNode.id === node.id
        const isHovered = hoveredNode && hoveredNode.id === node.id

        // Node circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, isSelected || isHovered ? 25 : 20, 0, 2 * Math.PI)

        // Node color based on status
        if (node.status === "active") {
          ctx.fillStyle = isSelected ? "#9333ea" : isHovered ? "#7c3aed" : "#6366f1"
        } else if (node.status === "warning") {
          ctx.fillStyle = isSelected ? "#f59e0b" : isHovered ? "#d97706" : "#eab308"
        } else {
          ctx.fillStyle = isSelected ? "#ef4444" : isHovered ? "#dc2626" : "#f87171"
        }

        ctx.fill()

        // Node border
        ctx.strokeStyle = isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.3)"
        ctx.lineWidth = isSelected ? 3 : 1
        ctx.stroke()

        // Node label
        ctx.fillStyle = "#ffffff"
        ctx.font = "12px Inter"
        ctx.textAlign = "center"
        ctx.fillText(node.label.split(" ")[0], node.x, node.y - 35)

        // Connection count
        ctx.fillStyle = "rgba(147, 51, 234, 0.8)"
        ctx.font = "10px Inter"
        ctx.fillText(node.connections.toString(), node.x, node.y + 5)
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [nodes, selectedNode, hoveredNode, data.edges, dimensions])

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const clickedNode = nodes.find((node) => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2)
      return distance <= 25
    })

    if (clickedNode) {
      onNodeSelect(clickedNode)
    }
  }

  const handleCanvasMouseMove = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const hoveredNode = nodes.find((node) => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2)
      return distance <= 25
    })

    setHoveredNode(hoveredNode)
    canvas.style.cursor = hoveredNode ? "pointer" : "default"
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        className="w-full border border-purple-500/20 rounded-lg bg-gray-950/50"
        style={{ height: dimensions.height }}
      />
      <div className="absolute top-4 left-4 text-xs text-gray-400">
        Click nodes to view details • Hover for interaction
      </div>
    </div>
  )
}
