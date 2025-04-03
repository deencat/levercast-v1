import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormErrorProps {
  message?: string | null
  className?: string
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null

  return (
    <div 
      className={cn(
        "flex items-center text-sm font-medium text-red-500 dark:text-red-400 mt-1", 
        className
      )}
    >
      <AlertCircle className="h-4 w-4 mr-1" />
      <span>{message}</span>
    </div>
  )
} 