"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader } from "../ui/loader"

interface PageTransitionProps {
  children: React.ReactNode
}

const TRANSITION_DURATION = 300 // in milliseconds

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [pageContent, setPageContent] = useState(children)

  // Track route changes for loading state
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleRouteChangeStart = () => {
      setIsLoading(true)
      
      // Store previous content during transition
      setPageContent(children)
    }

    const handleRouteChangeComplete = () => {
      timeoutId = setTimeout(() => {
        setPageContent(children)
        setIsLoading(false)
      }, TRANSITION_DURATION / 2)
    }

    // Skip initial load
    handleRouteChangeComplete()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [pathname, searchParams, children])

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Loader size={40} className="text-yellow-400" />
        </div>
      )}
      <div
        className={`transition-opacity duration-${TRANSITION_DURATION} ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {pageContent}
      </div>
    </div>
  )
} 