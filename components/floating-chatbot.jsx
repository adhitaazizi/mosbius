"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Minimize2, X, Send, Bot, User } from "lucide-react"

export default function FloatingChatbot({ isMinimized, onMinimize, onClose, urbanId, user }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: `Hello ${user.displayName}! I'm your urban intelligence assistant powered by advanced AI. I can help you navigate the system, find information about city services, and control various features. Try asking about apartments, traffic, parking, or any city services!`,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const router = useRouter()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentQuery = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      // Call the chatbot API
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: currentQuery,
          userRole: user.role,
          urbanId: urbanId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        const botMessage = {
          id: Date.now() + 1,
          type: "bot",
          content: data.message,
          timestamp: new Date(),
          action: data.action,
          page: data.page,
          feature: data.feature,
          filter_params: data.filter_params,
        }

        setMessages((prev) => [...prev, botMessage])

        // Handle navigation actions
        if (data.action === "navigate" && data.page) {
          setTimeout(() => {
            router.push(data.page)

            // If there's a specific feature to focus on, we could emit an event
            if (data.feature) {
              // In a real app, you might use a global state manager or event system
              window.dispatchEvent(
                new CustomEvent("chatbot-navigate", {
                  detail: { feature: data.feature, filter_params: data.filter_params },
                }),
              )
            }
          }, 1500)
        }
      } else {
        const errorMessage = {
          id: Date.now() + 1,
          type: "bot",
          content: data.message || "I encountered an error processing your request. Please try again.",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch (error) {
      console.error("Chatbot error:", error)
      const errorMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: "I'm having trouble connecting to my AI systems. Please try again in a moment.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const handleQuickAction = (action) => {
    setInputValue(action)
    setTimeout(() => handleSendMessage(), 100)
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onMinimize}
          className="w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg purple-glow relative"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px]">
      <Card className="bg-gray-900/95 border-purple-500/20 backdrop-blur-sm shadow-2xl h-full flex flex-col">
        <CardHeader className="pb-3 border-b border-purple-500/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Bot className="w-5 h-5 mr-2 text-purple-400" />
              AI Assistant
              <Badge className="ml-2 bg-purple-500/20 text-purple-400 text-xs">LangGraph</Badge>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500/20 text-green-400 text-xs">Online</Badge>
              <Button variant="ghost" size="sm" onClick={onMinimize} className="text-gray-400 hover:text-white p-1">
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Quick Actions */}
          <div className="p-3 border-b border-purple-500/20 bg-gray-800/30">
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-xs border-purple-500/20 text-purple-400 bg-transparent hover:bg-purple-500/20"
                onClick={() => handleQuickAction("apartments near area y")}
              >
                Find Apartments
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs border-purple-500/20 text-purple-400 bg-transparent hover:bg-purple-500/20"
                onClick={() => handleQuickAction("traffic status")}
              >
                Traffic Status
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs border-purple-500/20 text-purple-400 bg-transparent hover:bg-purple-500/20"
                onClick={() => handleQuickAction("upcoming events")}
              >
                Events
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800/50 text-gray-100 border border-purple-500/20"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === "bot" && <Bot className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />}
                    {message.type === "user" && <User className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                      {message.action === "navigate" && message.page && (
                        <div className="mt-2 p-2 bg-purple-500/20 rounded text-xs">
                          <span className="text-purple-300">🚀 Navigating to: {message.page}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800/50 text-gray-100 border border-purple-500/20 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-purple-400" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400">AI thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-purple-500/20 p-4">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about city services, navigation, or features..."
                className="flex-1 bg-gray-800/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-purple-600 hover:bg-purple-700 px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by LangGraph AI • Can navigate and control system features
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
