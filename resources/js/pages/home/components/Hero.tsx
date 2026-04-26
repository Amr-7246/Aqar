import { Input } from "@/components/ui/input"
import { homeText } from "@/index"
import { PersonStanding, HandshakeIcon, Building2Icon, Search } from "lucide-react"
import React from "react"
import HeroAnimatedLayout from "./HeroAnimatedLayout"
import { HeroProps } from "../types"

export default function Hero({ propertiesCount, clientsCount, dealCount }: HeroProps) {
  const statistics = [
    {
      key: homeText.statistics.clients,
      value: clientsCount,
      icon: <PersonStanding className="w-5 h-5" />,
    },
    {
      key: homeText.statistics.properties,
      value: propertiesCount,
      icon: <Building2Icon className="w-5 h-5" />,
    },
    {
      key: homeText.statistics.deals,
      value: dealCount,
      icon: <HandshakeIcon className="w-5 h-5" />,
    },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <HeroAnimatedLayout />

      <div className="z-10 relative w-full max-w-6xl mx-auto flex flex-col items-center text-center gap-12">

        {/* Search + Intro Hook */}
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-premium via-white to-secondary bg-clip-text text-transparent pb-2">
            {homeText["hook-intro"]}
          </h1>
          <div className="w-full max-w-md relative group">
            <Input
              icon= {<Search/>}
              className="bg-white/10 border-white/20 backdrop-blur-md text-white h-14 px-6 rounded-full focus:ring-premium"
              placeholder="Search properties..."
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {statistics.map((s, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-transform "
            >
              <p className="text-4xl font-bold text-white mb-2">{s.value}</p>
              <div className="flex items-center gap-2 text-white/60">
                <p className="text-sm font-medium uppercase tracking-widest">{s.key}</p>
                <span className="text-premium">{s.icon}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
