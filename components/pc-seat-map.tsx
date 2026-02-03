"use client"

import React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Monitor, Sparkles, Crown, Zap, Star, Gamepad2, Tv, Users } from "lucide-react"

export type FloorType = 1 | 2 | 3
export type ZoneType = "vip" | "standard" | "bootcamp" | "console" | "vip-lounge"

export interface PC {
  id: number
  name: string
  specs: string
  pricePerHour: number
  row: number
  col: number
  tier: "standard" | "pro" | "vip"
  floor: FloorType
  zone: ZoneType
}

interface PCSeatMapProps {
  pcs: PC[]
  selectedPC: number | null
  bookedPCs: number[]
  onSelectPC: (id: number) => void
}

const floorConfig = {
  1: {
    name: "1 этаж",
    subtitle: "VIP Зона",
    icon: Crown,
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
    zones: ["vip"],
  },
  2: {
    name: "2 этаж",
    subtitle: "Основной зал",
    icon: Monitor,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    zones: ["standard", "pro"],
  },
  3: {
    name: "3 этаж",
    subtitle: "Буткемпы & Консоли",
    icon: Gamepad2,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    borderColor: "border-chart-3/30",
    zones: ["bootcamp", "console", "vip-lounge"],
  },
}

export function PCSeatMap({ pcs, selectedPC, bookedPCs, onSelectPC }: PCSeatMapProps) {
  const [activeFloor, setActiveFloor] = useState<FloorType>(1)

  const floorPCs = pcs.filter(pc => pc.floor === activeFloor)
  
  // Calculate available seats per floor
  const getFloorStats = (floor: FloorType) => {
    const floorPCsList = pcs.filter(pc => pc.floor === floor)
    const bookedCount = floorPCsList.filter(pc => bookedPCs.includes(pc.id)).length
    return {
      total: floorPCsList.length,
      available: floorPCsList.length - bookedCount,
    }
  }

  const currentFloorStats = getFloorStats(activeFloor)
  const totalAvailable = pcs.length - bookedPCs.length

  const rows = floorPCs.length > 0 ? Math.max(...floorPCs.map(pc => pc.row)) + 1 : 0
  const cols = floorPCs.length > 0 ? Math.max(...floorPCs.map(pc => pc.col)) + 1 : 0

  const grid: (PC | null)[][] = Array(rows).fill(null).map(() => Array(cols).fill(null))
  floorPCs.forEach(pc => {
    grid[pc.row][pc.col] = pc
  })

  const getTierStyles = (tier: string, zone: ZoneType, isSelected: boolean, isBooked: boolean) => {
    if (isBooked) return {
      bg: "bg-destructive/10",
      border: "border-destructive/30",
      icon: "text-destructive/50",
      text: "text-destructive/50"
    }
    if (isSelected) return {
      bg: "bg-primary/30",
      border: "border-primary",
      icon: "text-primary",
      text: "text-primary"
    }
    
    if (zone === "bootcamp") return {
      bg: "bg-chart-3/10 hover:bg-chart-3/20",
      border: "border-chart-3/30 hover:border-chart-3",
      icon: "text-chart-3",
      text: "text-chart-3"
    }
    if (zone === "console") return {
      bg: "bg-chart-4/10 hover:bg-chart-4/20",
      border: "border-chart-4/30 hover:border-chart-4",
      icon: "text-chart-4",
      text: "text-chart-4"
    }
    if (zone === "vip-lounge") return {
      bg: "bg-accent/10 hover:bg-accent/20",
      border: "border-accent/30 hover:border-accent",
      icon: "text-accent",
      text: "text-accent"
    }
    
    switch (tier) {
      case "vip": return {
        bg: "bg-accent/10 hover:bg-accent/20",
        border: "border-accent/30 hover:border-accent",
        icon: "text-accent",
        text: "text-accent"
      }
      case "pro": return {
        bg: "bg-primary/10 hover:bg-primary/20",
        border: "border-primary/30 hover:border-primary",
        icon: "text-primary",
        text: "text-primary"
      }
      default: return {
        bg: "bg-muted/50 hover:bg-muted",
        border: "border-border hover:border-muted-foreground",
        icon: "text-muted-foreground",
        text: "text-foreground"
      }
    }
  }

  const getZoneIcon = (zone: ZoneType) => {
    switch (zone) {
      case "vip": case "vip-lounge": return Crown
      case "bootcamp": return Users
      case "console": return Gamepad2
      default: return Monitor
    }
  }

  const getZoneLabel = (zone: ZoneType) => {
    switch (zone) {
      case "vip": return "VIP"
      case "vip-lounge": return "VIP Lounge"
      case "bootcamp": return "Буткемп"
      case "console": return "Консоль"
      default: return "Стандарт"
    }
  }

  return (
    <div className="space-y-6">
      {/* Floor Selector with Stats */}
      <div className="flex flex-col gap-4">
        {/* Total Available Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 ultra-glass rounded-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="text-sm text-muted-foreground">Всего свободно:</span>
            <span className="text-lg font-bold text-primary">{totalAvailable}</span>
            <span className="text-sm text-muted-foreground">из {pcs.length}</span>
          </div>
        </div>

        {/* Floor Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {([1, 2, 3] as FloorType[]).map(floor => {
            const config = floorConfig[floor]
            const stats = getFloorStats(floor)
            const Icon = config.icon
            const isActive = activeFloor === floor

            return (
              <button
                key={floor}
                onClick={() => setActiveFloor(floor)}
                className={cn(
                  "relative flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 border-2",
                  isActive 
                    ? `${config.bgColor} ${config.borderColor} scale-105 shadow-lg` 
                    : "bg-secondary/50 border-border hover:bg-secondary"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  isActive ? config.bgColor : "bg-muted"
                )}>
                  <Icon className={cn("w-5 h-5", isActive ? config.color : "text-muted-foreground")} />
                </div>
                <div className="text-left">
                  <div className={cn(
                    "font-bold text-sm",
                    isActive ? config.color : "text-foreground"
                  )}>
                    {config.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{config.subtitle}</div>
                </div>
                {/* Available count badge */}
                <div className={cn(
                  "flex flex-col items-center px-3 py-1 rounded-xl",
                  isActive ? "bg-background/50" : "bg-background/30"
                )}>
                  <span className={cn(
                    "text-lg font-bold leading-none",
                    stats.available > 0 ? (isActive ? config.color : "text-primary") : "text-destructive"
                  )}>
                    {stats.available}
                  </span>
                  <span className="text-[10px] text-muted-foreground">своб.</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Legend for current floor */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
        {activeFloor === 1 && (
          <LegendItem color="bg-accent/10 border-accent/30" label="VIP" icon={Crown} />
        )}
        {activeFloor === 2 && (
          <>
            <LegendItem color="bg-muted/50 border-border" label="Стандарт" icon={Star} />
            <LegendItem color="bg-primary/10 border-primary/30" label="Про" icon={Zap} />
          </>
        )}
        {activeFloor === 3 && (
          <>
            <LegendItem color="bg-chart-3/10 border-chart-3/30" label="Буткемп" icon={Users} />
            <LegendItem color="bg-chart-4/10 border-chart-4/30" label="Консоль" icon={Gamepad2} />
            <LegendItem color="bg-accent/10 border-accent/30" label="VIP Lounge" icon={Crown} />
          </>
        )}
        <div className="w-px h-4 bg-border" />
        <LegendItem color="bg-primary/30 border-primary" label="Выбрано" />
        <LegendItem color="bg-destructive/10 border-destructive/30" label="Занято" />
      </div>

      {/* Floor Stats Bar */}
      <div className="flex items-center gap-2 px-4">
        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${(currentFloorStats.available / currentFloorStats.total) * 100}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {currentFloorStats.available}/{currentFloorStats.total} свободно
        </span>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* Main stage/screen */}
        <div className="relative w-full max-w-lg">
          <div className="ultra-glass rounded-2xl py-3 px-6 text-center relative overflow-hidden">
            <div className={cn(
              "absolute inset-0 animate-border-dance",
              activeFloor === 1 ? "bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10" :
              activeFloor === 2 ? "bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10" :
              "bg-gradient-to-r from-chart-3/10 via-chart-4/10 to-chart-3/10"
            )} />
            <span className="relative text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground">
              {activeFloor === 1 ? "VIP Экран 240Hz" : activeFloor === 2 ? "Главный экран" : "Зона турниров"}
            </span>
          </div>
          <div className={cn(
            "absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-6 blur-xl rounded-full",
            activeFloor === 1 ? "bg-accent/30" : activeFloor === 2 ? "bg-primary/30" : "bg-chart-3/30"
          )} />
        </div>
        
        {/* PC Grid */}
        <div 
          className="grid gap-3"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {grid.flat().map((pc, index) => {
            if (!pc) return <div key={index} className="w-20 h-24 md:w-24 md:h-28" />
            
            const isBooked = bookedPCs.includes(pc.id)
            const isSelected = selectedPC === pc.id
            const styles = getTierStyles(pc.tier, pc.zone, isSelected, isBooked)
            const ZoneIcon = getZoneIcon(pc.zone)
            
            return (
              <button
                key={pc.id}
                onClick={() => !isBooked && onSelectPC(pc.id)}
                disabled={isBooked}
                className={cn(
                  "relative w-20 h-24 md:w-24 md:h-28 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border-2 overflow-hidden group",
                  styles.bg,
                  styles.border,
                  isBooked && "cursor-not-allowed opacity-60",
                  isSelected && "scale-105 shadow-xl shadow-primary/30",
                  !isBooked && !isSelected && "cursor-pointer hover:scale-105 hover:shadow-lg"
                )}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                )}
                
                {(pc.zone === "vip" || pc.zone === "vip-lounge") && !isBooked && (
                  <Sparkles className="absolute top-1.5 right-1.5 w-3 h-3 text-accent" />
                )}
                
                <div className={cn(
                  "relative w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center",
                  isSelected ? "bg-primary/20" : styles.bg.replace("hover:bg-", "bg-").split(" ")[0]
                )}>
                  <ZoneIcon className={cn("w-4 h-4 md:w-5 md:h-5", styles.icon)} />
                </div>
                
                <div className="text-center relative">
                  <span className={cn("text-xs md:text-sm font-bold block", styles.text)}>
                    {pc.name}
                  </span>
                  <span className="text-[10px] md:text-xs text-muted-foreground">
                    {pc.pricePerHour}₽/ч
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function LegendItem({ color, label, icon: Icon }: { color: string; label: string; icon?: React.ElementType }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={cn("w-4 h-4 rounded-md border-2 flex items-center justify-center", color)}>
        {Icon && <Icon className="w-2.5 h-2.5 text-inherit" />}
      </div>
      <span className="text-muted-foreground">{label}</span>
    </div>
  )
}
