"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Gamepad2, Wifi, Monitor, Cpu, Zap, Users } from "lucide-react"
import { GlitchText } from "@/components/glitch-text"
import { AnimatedCounter } from "@/components/animated-counter"
import { TiltCard } from "@/components/tilt-card"

interface HeroSectionProps {
  onScrollToBooking: () => void
}

export function HeroSection({ onScrollToBooking }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[128px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent/30 rounded-full blur-[128px] animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />
      
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          style={{
            animation: 'scan-line 6s linear infinite',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* Floating logo */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="relative">
            <div className="w-20 h-20 ultra-glass rounded-2xl flex items-center justify-center neon-border">
              <Gamepad2 className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute -inset-2 bg-primary/20 rounded-3xl blur-xl animate-pulse -z-10" />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 ultra-glass rounded-full text-sm mb-10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
          </span>
          <span className="text-muted-foreground">Онлайн-бронирование открыто 24/7</span>
        </div>
        
        {/* Main heading with glitch effect */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8">
          <span className="text-foreground">CYBER</span>
          <GlitchText text="ZONE" className="text-primary" />
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-14 text-balance leading-relaxed">
          Премиальный киберспортивный клуб нового поколения.
          <span className="text-foreground font-medium"> Топовое железо. Идеальные условия. </span>
          Забронируй место в один клик.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
          <Button 
            size="lg" 
            onClick={onScrollToBooking}
            className="relative h-16 px-10 text-lg font-bold overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Забронировать сейчас
              <Zap className="w-5 h-5 group-hover:animate-pulse" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-border-dance opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="h-16 px-10 text-lg font-semibold ultra-glass border-border/50 hover:border-primary/50 bg-transparent"
          >
            <Monitor className="w-5 h-5 mr-2" />
            Посмотреть тарифы
          </Button>
        </div>

        {/* Stats with animated counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <TiltCard>
            <StatCard 
              icon={Monitor} 
              value={24} 
              suffix="+" 
              label="Игровых ПК"
              color="primary"
            />
          </TiltCard>
          <TiltCard>
            <StatCard 
              icon={Cpu} 
              value={4080} 
              prefix="RTX " 
              label="Топовое железо"
              color="accent"
            />
          </TiltCard>
          <TiltCard>
            <StatCard 
              icon={Wifi} 
              value={1} 
              suffix=" Гбит" 
              label="Скорость сети"
              color="primary"
            />
          </TiltCard>
          <TiltCard>
            <StatCard 
              icon={Users} 
              value={10000} 
              suffix="+" 
              label="Довольных игроков"
              color="accent"
            />
          </TiltCard>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <button 
          onClick={onScrollToBooking}
          className="flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300 group"
        >
          <span className="text-sm tracking-wider uppercase">Листай вниз</span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  )
}

function StatCard({ 
  icon: Icon, 
  value, 
  label, 
  suffix = "", 
  prefix = "",
  color
}: { 
  icon: typeof Monitor
  value: number
  label: string
  suffix?: string
  prefix?: string
  color: "primary" | "accent"
}) {
  return (
    <div className="ultra-glass rounded-3xl p-6 md:p-8 text-center hover:neon-glow transition-all duration-500 group">
      <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
        color === "primary" ? "bg-primary/20" : "bg-accent/20"
      }`}>
        <Icon className={`w-7 h-7 ${color === "primary" ? "text-primary" : "text-accent"}`} />
      </div>
      <div className={`text-3xl md:text-4xl font-black mb-2 ${
        color === "primary" ? "text-primary" : "text-accent"
      }`}>
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </div>
  )
}
