"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
  fullScreen?: boolean
}

export function Loader({ 
  className, 
  size = 24, 
  fullScreen = false,
  ...props 
}: LoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fullScreen && "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
        className
      )}
      {...props}
    >
      <Loader2 
        className="animate-spin text-yellow-400" 
        size={size} 
      />
    </div>
  )
} 