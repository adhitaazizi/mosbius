"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Cpu, Eye, EyeOff, ArrowLeft, Users, Code } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import NavigationGuard from "@/components/navigation-guard"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { signup } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get role from URL params if provided
  const urlRole = searchParams.get("role")

  useState(() => {
    if (urlRole && (urlRole === "developer" || urlRole === "user")) {
      setFormData((prev) => ({ ...prev, role: urlRole }))
    }
  }, [urlRole])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.displayName || !formData.email || !formData.password || !formData.confirmPassword || !formData.role) {
      setError("Please fill in all fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    try {
      setError("")
      setLoading(true)
      await signup(formData.email, formData.password, formData.displayName, formData.role)
      router.push("/networks") // Redirect to networks page after signup
    } catch (error) {
      setError("Failed to create account. Please try again.")
      console.error("Signup error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <NavigationGuard requireAuth={false} redirectTo="/login">
      <div className="min-h-screen space-gradient flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back to home button */}
          <Link
            href="/"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center purple-glow">
                  <Cpu className="w-7 h-7 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-mono text-glow">Join Mosbius</CardTitle>
              <CardDescription className="text-gray-400">
                Create your account to access the urban intelligence platform
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert className="border-red-500/20 bg-red-500/10">
                    <AlertDescription className="text-red-400">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <label htmlFor="displayName" className="text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <Input
                    id="displayName"
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange("displayName", e.target.value)}
                    className="bg-gray-800/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-gray-800/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium text-gray-300">
                    Role
                  </label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                    <SelectTrigger className="bg-gray-800/50 border-purple-500/20 text-white focus:border-purple-500">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-purple-500/20">
                      <SelectItem value="developer" className="text-white hover:bg-purple-500/20">
                        <div className="flex items-center">
                          <Code className="w-4 h-4 mr-2" />
                          Developer
                        </div>
                      </SelectItem>
                      <SelectItem value="user" className="text-white hover:bg-purple-500/20">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          User
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="bg-gray-800/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 pr-10"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="bg-gray-800/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500 pr-10"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white purple-glow"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </NavigationGuard>
  )
}
