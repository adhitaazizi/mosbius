"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function NavigationGuard({ children, requireAuth = false, redirectTo = "/login" }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        router.push(redirectTo)
      } else if (!requireAuth && user) {
        // If user is logged in and trying to access auth pages, redirect to networks
        if (redirectTo === "/login") {
          router.push("/networks")
        }
      }
    }
  }, [user, loading, requireAuth, redirectTo, router])

  if (loading) {
    return (
      <div className="min-h-screen space-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-400 font-mono">Loading Mosbius...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !user) {
    return null // Will redirect
  }

  if (!requireAuth && user && redirectTo === "/login") {
    return null // Will redirect
  }

  return children
}
