"use client"

import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">{text}</span>
      <span 
        className="absolute inset-0 text-primary opacity-80 z-0" 
        style={{ 
          clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
          transform: "translate(-2px, -1px)",
          animation: "glitch-top 2.5s infinite linear alternate-reverse"
        }}
        aria-hidden="true"
      >
        {text}
      </span>
      <span 
        className="absolute inset-0 text-accent opacity-80 z-0" 
        style={{ 
          clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
          transform: "translate(2px, 1px)",
          animation: "glitch-bottom 3s infinite linear alternate-reverse"
        }}
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  )
}
