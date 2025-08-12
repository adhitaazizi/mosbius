"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import CityFeaturePage from "@/components/city-feature-page"

const healthData = [
  {
    id: 1,
    title: "Central Medical Complex",
    description: "Advanced medical facility with AI diagnostics and telemedicine",
    location: "Medical District, Health Plaza",
    type: "Hospital",
    services: ["Emergency Care", "AI Diagnostics", "Telemedicine", "Surgery"],
    hours: "24/7",
    contact: "emergency@mosbius-health.city",
    specialties: ["Cardiology", "Neurology", "Oncology", "Pediatrics"],
    status: "active",
  },
  {
    id: 2,
    title: "Wellness & Biometric Center",
    description: "Preventive healthcare with continuous health monitoring",
    location: "Green District, Wellness Hub",
    type: "Wellness Center",
    services: ["Health Monitoring", "Fitness Assessment", "Nutrition Counseling", "Mental Health"],
    hours: "6:00 AM - 10:00 PM",
    contact: "wellness@mosbius-health.city",
    specialties: ["Preventive Care", "Mental Health", "Nutrition", "Fitness"],
    status: "active",
  },
  {
    id: 3,
    title: "Digital Pharmacy Network",
    description: "Automated pharmacy with drone delivery and smart prescriptions",
    location: "Multiple Locations",
    type: "Pharmacy",
    services: ["Prescription Delivery", "Health Consultations", "Medication Management", "Emergency Supplies"],
    hours: "24/7 Delivery",
    contact: "pharmacy@mosbius-health.city",
    specialties: ["Prescription Services", "Health Products", "Consultations"],
    status: "active",
  },
]

export default function HealthPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="min-h-screen space-gradient flex items-center justify-center">Loading...</div>
  }

  const pageConfig = {
    title: "Health & Medical",
    description: "Access healthcare facilities, services, and medical information",
    addButtonText: "Add Medical Facility",
    requestButtonText: "Request Medical Service",
    itemName: "medical facility",
    fields: [
      { key: "title", label: "Facility Name", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "location", label: "Location", type: "text", required: true },
      {
        key: "type",
        label: "Type",
        type: "select",
        options: ["Hospital", "Clinic", "Pharmacy", "Wellness Center", "Emergency"],
        required: true,
      },
      { key: "hours", label: "Operating Hours", type: "text", required: true },
      { key: "contact", label: "Contact", type: "email", required: true },
    ],
  }

  return (
    <CityFeaturePage
      data={healthData}
      config={pageConfig}
      user={user}
      urbanId={params.urban_id}
      onNavigateBack={() => router.push(`/urban/${params.urban_id}/dashboard`)}
    />
  )
}
