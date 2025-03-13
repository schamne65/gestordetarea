import type React from "react"
import { cn } from "@/lib/utils"

interface TaskButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "add" | "edit" | "delete"
}

export function TaskButton({ children, variant = "add", className, ...props }: TaskButtonProps) {
  return (
    <button
      className={cn(
        variant === "add" && "btn-add",
        variant === "edit" && "btn-edit",
        variant === "delete" && "btn-delete",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}