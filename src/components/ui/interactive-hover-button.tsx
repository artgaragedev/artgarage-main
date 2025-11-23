import React, { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "glass" | "gradient"
  type ButtonSize = "sm" | "md" | "lg"

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

export function InteractiveHoverButton({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth,
  loading,
  iconLeft,
  iconRight,
  ...props
}: InteractiveHoverButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMouseMove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty("--x", `${x}px`)
    el.style.setProperty("--y", `${y}px`)
  }

  const variantClasses = {
    primary: "bg-[#EA3C23] text-white border-transparent shadow-lg shadow-[#EA3C23]/30 hover:brightness-[1.03]",
    secondary: "bg-black text-white border-transparent hover:brightness-[1.05] dark:bg-white dark:text-black",
    outline: "bg-white text-black border border-black hover:bg-gray-50 dark:bg-transparent dark:text-white dark:border-white",
    ghost: "bg-transparent text-black hover:bg-black/5 dark:text-white hover:dark:bg-white/10 border border-transparent",
    glass: "backdrop-blur-md bg-white/10 text-white border border-white/20 hover:bg-white/20",
    gradient: "bg-gradient-to-r from-[#FF5A3C] via-[#EA3C23] to-[#FF9A3C] text-white border-0 hover:brightness-105"
  } as const

  const sizeClasses = {
    sm: "h-12 px-6 text-sm",
    md: "h-14 px-8 text-base",
    lg: "h-16 px-10 text-lg"
  } as const

  const widthClass = fullWidth ? "w-full" : "w-auto"

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      aria-busy={loading ? true : undefined}
      disabled={loading || props.disabled}
      className={cn(
        "group relative inline-flex items-center justify-center cursor-pointer rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-hidden active:scale-[0.98]",
        widthClass,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(120px circle at var(--x) var(--y), rgba(255,255,255,0.25), transparent 60%)"
        }}
      />
      <span className="relative flex items-center justify-center gap-2 w-full">
        {iconLeft && (
          <span className="flex-shrink-0">
            {iconLeft}
          </span>
        )}
        <span className={cn("flex-shrink-0", loading ? "opacity-70" : "")}>{children}</span>
        <span className="flex items-center justify-center overflow-hidden transition-all duration-300 opacity-0 w-0 group-hover:w-4 group-hover:opacity-100">
          {iconRight ?? <ArrowRight className="h-4 w-4 flex-shrink-0" />}
        </span>
      </span>
      {loading && (
        <span className="absolute inset-0 grid place-items-center">
          <svg className="h-5 w-5 animate-spin text-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" opacity="0.75" />
          </svg>
        </span>
      )}
    </button>
  )
}
