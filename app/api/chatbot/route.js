"use client"

import { NextResponse } from "next/server"

// This would normally import and run the Python script
// For demo purposes, we'll simulate the Python LangGraph responses
const simulatePythonChatbot = (query, userRole, urbanId) => {
  const queryLower = query.toLowerCase()

  // Simulate the Python LangGraph agent responses
  if (queryLower.includes("apartments") && queryLower.includes("area y")) {
    return {
      success: true,
      message:
        "I found 3 apartments near Area Y: Skyline Apartments ($2,800/month), Green Valley Condos ($2,200/month). Let me show you the living page with detailed information.",
      action: "navigate",
      page: `/urban/${urbanId}/living`,
      filter_params: { area: "area-y" },
    }
  }

  if (queryLower.includes("traffic")) {
    if (userRole === "developer") {
      return {
        success: true,
        message:
          "Current traffic status is moderate with 68% congestion level. Main congestion areas: Highway 101, Downtown Core. I can show you the detailed traffic analysis dashboard.",
        action: "navigate",
        page: `/urban/${urbanId}/dashboard`,
        feature: "traffic-analysis",
      }
    } else {
      return {
        success: true,
        message:
          "Current traffic status is moderate with 68% congestion level. Main congestion areas: Highway 101, Downtown Core. Would you like to see the urban view for more details?",
        action: "info",
        data: { status: "moderate", congestion_level: 68 },
      }
    }
  }

  if (queryLower.includes("parking")) {
    if (userRole === "developer") {
      return {
        success: true,
        message:
          "Current parking availability: 34% occupied. Available zones: Downtown Core, Shopping District, Business Quarter. I can show you the detailed parking analysis dashboard.",
        action: "navigate",
        page: `/urban/${urbanId}/dashboard`,
        feature: "parking-analysis",
      }
    } else {
      return {
        success: true,
        message:
          "Current parking availability: 34% occupied. Let me show you the urban view for real-time parking information.",
        action: "navigate",
        page: `/urban/${urbanId}/dashboard`,
        feature: "urban-view",
      }
    }
  }

  if (queryLower.includes("events")) {
    return {
      success: true,
      message:
        "Upcoming events in the city: Tech Innovation Summit, Urban Green Festival, Cultural Heritage Night. Let me show you the events page for detailed information.",
      action: "navigate",
      page: `/urban/${urbanId}/event`,
    }
  }

  if (queryLower.includes("restaurants") || queryLower.includes("food")) {
    return {
      success: true,
      message:
        "Popular restaurants in the city: Quantum Bistro, Neon Noodle House, Vertical Farm Cafe. Let me show you the food page for detailed information and locations.",
      action: "navigate",
      page: `/urban/${urbanId}/food`,
    }
  }

  if (queryLower.includes("go to") || queryLower.includes("navigate to")) {
    const pageMapping = {
      dashboard: `/urban/${urbanId}/dashboard`,
      living: `/urban/${urbanId}/living`,
      events: `/urban/${urbanId}/event`,
      food: `/urban/${urbanId}/food`,
      entertainment: `/urban/${urbanId}/entertainment`,
      health: `/urban/${urbanId}/health`,
      sports: `/urban/${urbanId}/sport`,
      community: `/urban/${urbanId}/community`,
      wellness: `/urban/${urbanId}/reflexing`,
      networks: "/networks",
    }

    for (const [key, page] of Object.entries(pageMapping)) {
      if (queryLower.includes(key)) {
        return {
          success: true,
          message: `Taking you to the ${key} page.`,
          action: "navigate",
          page: page,
        }
      }
    }
  }

  // Default response
  return {
    success: true,
    message: `I'm your urban intelligence assistant! I can help you with:

🏠 **Housing**: "apartments near area Y", "find housing"
🚗 **Traffic**: "traffic status", "road conditions"  
🅿️ **Parking**: "parking availability", "find parking"
📅 **Events**: "upcoming events", "what's happening"
🍽️ **Food**: "restaurants near downtown", "japanese food"
🎯 **Navigation**: "go to dashboard", "show events page"

I can also navigate you directly to different sections of the city system. What would you like to know about?`,
    action: "info",
  }
}

export async function POST(request) {
  try {
    const { query, userRole, urbanId } = await request.json()

    if (!query) {
      return NextResponse.json({ success: false, message: "Query is required" }, { status: 400 })
    }

    // In a real implementation, this would call the Python script
    // For now, we simulate the LangGraph agent response
    const response = simulatePythonChatbot(query, userRole || "user", urbanId || "demo-city")

    return NextResponse.json(response)
  } catch (error) {
    console.error("Chatbot API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "I encountered an error processing your request. Please try again.",
        action: "info",
      },
      { status: 500 },
    )
  }
}
