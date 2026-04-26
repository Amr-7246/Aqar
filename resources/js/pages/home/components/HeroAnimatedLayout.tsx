import { heroLayout } from '@/index'
import React from 'react'

const HeroAnimatedLayout = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <img
        // src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop"
        src={heroLayout}
        alt="Hero Background"
        className="w-full h-full bg-cover"
      />
      <div className="w-full h-full absolute inset-0 bg-black/70" />
    </div>
  )
}

export default HeroAnimatedLayout
