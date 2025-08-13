"use client"

export default function CityBackground() {
  return (
    <div className="absolute inset-0 opacity-40">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/city-background.webp')",
          filter: "brightness(0.7) contrast(1.1)",
        }}
      />
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/60" />
    </div>
  )
}
