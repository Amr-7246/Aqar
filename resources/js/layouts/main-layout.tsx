import { AppHeader } from '@/components/app-header'
import React, { ReactNode } from 'react'

export default function MainLayout({children}: {children:ReactNode}) {
  return (
    <div className="min-h-screen">
      {/* //& Nav Bar */}
        <AppHeader/>
      {/* //& Content */}
        <main className="">
            {children}
        </main>
    </div>
  )
}