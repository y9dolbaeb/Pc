"use client"

import { useRef, useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { PricingSection } from "@/components/pricing-section"
import { PCSeatMap, type PC } from "@/components/pc-seat-map"
import { BookingForm, type BookingData } from "@/components/booking-form"
import { BookingSuccessDialog } from "@/components/booking-success-dialog"
import { Footer } from "@/components/footer"
import { ParticleBackground } from "@/components/particle-background"
import { Monitor, Sparkles } from "lucide-react"

const pcs: PC[] = [
  // Floor 1 - VIP Zone (8 seats)
  { id: 1, name: "VIP-1", specs: "RTX 4090 | i9-14900K | 64GB", pricePerHour: 300, row: 0, col: 0, tier: "vip", floor: 1, zone: "vip" },
  { id: 2, name: "VIP-2", specs: "RTX 4090 | i9-14900K | 64GB", pricePerHour: 300, row: 0, col: 1, tier: "vip", floor: 1, zone: "vip" },
  { id: 3, name: "VIP-3", specs: "RTX 4090 | i9-14900K | 64GB", pricePerHour: 300, row: 0, col: 2, tier: "vip", floor: 1, zone: "vip" },
  { id: 4, name: "VIP-4", specs: "RTX 4090 | i9-14900K | 64GB", pricePerHour: 300, row: 0, col: 3, tier: "vip", floor: 1, zone: "vip" },
  { id: 5, name: "VIP-5", specs: "RTX 4090 | i9-14900K | 64GB", pricePerHour: 300, row: 1, col: 0, tier: "vip", floor: 1, zone: "vip" },
  { id: 6, name: "VIP-6", specs: "RTX 4090 | i9-14900K | 64GB", pricePerHour: 300, row: 1, col: 1, tier: "vip", floor: 1, zone: "vip" },
  { id: 7, name: "VIP-7", specs: "RTX 4090 | i9-14900K | 64GB", pricePerHour: 300, row: 1, col: 2, tier: "vip", floor: 1, zone: "vip" },
  { id: 8, name: "VIP-8", specs: "RTX 4090 | i9-14900K | 64GB", pricePerHour: 300, row: 1, col: 3, tier: "vip", floor: 1, zone: "vip" },

  // Floor 2 - Main Hall (16 seats: 8 standard + 8 pro)
  { id: 9, name: "STD-1", specs: "RTX 4060 | i5-13600K | 16GB", pricePerHour: 100, row: 0, col: 0, tier: "standard", floor: 2, zone: "standard" },
  { id: 10, name: "STD-2", specs: "RTX 4060 | i5-13600K | 16GB", pricePerHour: 100, row: 0, col: 1, tier: "standard", floor: 2, zone: "standard" },
  { id: 11, name: "STD-3", specs: "RTX 4060 | i5-13600K | 16GB", pricePerHour: 100, row: 0, col: 2, tier: "standard", floor: 2, zone: "standard" },
  { id: 12, name: "STD-4", specs: "RTX 4060 | i5-13600K | 16GB", pricePerHour: 100, row: 0, col: 3, tier: "standard", floor: 2, zone: "standard" },
  { id: 13, name: "STD-5", specs: "RTX 4060 | i5-13600K | 16GB", pricePerHour: 100, row: 1, col: 0, tier: "standard", floor: 2, zone: "standard" },
  { id: 14, name: "STD-6", specs: "RTX 4060 | i5-13600K | 16GB", pricePerHour: 100, row: 1, col: 1, tier: "standard", floor: 2, zone: "standard" },
  { id: 15, name: "STD-7", specs: "RTX 4060 | i5-13600K | 16GB", pricePerHour: 100, row: 1, col: 2, tier: "standard", floor: 2, zone: "standard" },
  { id: 16, name: "STD-8", specs: "RTX 4060 | i5-13600K | 16GB", pricePerHour: 100, row: 1, col: 3, tier: "standard", floor: 2, zone: "standard" },
  { id: 17, name: "PRO-1", specs: "RTX 4070 | i7-13700K | 32GB", pricePerHour: 150, row: 2, col: 0, tier: "pro", floor: 2, zone: "standard" },
  { id: 18, name: "PRO-2", specs: "RTX 4070 | i7-13700K | 32GB", pricePerHour: 150, row: 2, col: 1, tier: "pro", floor: 2, zone: "standard" },
  { id: 19, name: "PRO-3", specs: "RTX 4070 | i7-13700K | 32GB", pricePerHour: 150, row: 2, col: 2, tier: "pro", floor: 2, zone: "standard" },
  { id: 20, name: "PRO-4", specs: "RTX 4070 | i7-13700K | 32GB", pricePerHour: 150, row: 2, col: 3, tier: "pro", floor: 2, zone: "standard" },
  { id: 21, name: "PRO-5", specs: "RTX 4070 | i7-13700K | 32GB", pricePerHour: 150, row: 3, col: 0, tier: "pro", floor: 2, zone: "standard" },
  { id: 22, name: "PRO-6", specs: "RTX 4070 | i7-13700K | 32GB", pricePerHour: 150, row: 3, col: 1, tier: "pro", floor: 2, zone: "standard" },
  { id: 23, name: "PRO-7", specs: "RTX 4070 | i7-13700K | 32GB", pricePerHour: 150, row: 3, col: 2, tier: "pro", floor: 2, zone: "standard" },
  { id: 24, name: "PRO-8", specs: "RTX 4070 | i7-13700K | 32GB", pricePerHour: 150, row: 3, col: 3, tier: "pro", floor: 2, zone: "standard" },

  // Floor 3 - Bootcamps, Consoles, VIP Lounge (15 seats)
  // Bootcamp zone (5 seats for teams)
  { id: 25, name: "BOOT-1", specs: "RTX 4080 | i9-13900K | 32GB", pricePerHour: 250, row: 0, col: 0, tier: "pro", floor: 3, zone: "bootcamp" },
  { id: 26, name: "BOOT-2", specs: "RTX 4080 | i9-13900K | 32GB", pricePerHour: 250, row: 0, col: 1, tier: "pro", floor: 3, zone: "bootcamp" },
  { id: 27, name: "BOOT-3", specs: "RTX 4080 | i9-13900K | 32GB", pricePerHour: 250, row: 0, col: 2, tier: "pro", floor: 3, zone: "bootcamp" },
  { id: 28, name: "BOOT-4", specs: "RTX 4080 | i9-13900K | 32GB", pricePerHour: 250, row: 0, col: 3, tier: "pro", floor: 3, zone: "bootcamp" },
  { id: 29, name: "BOOT-5", specs: "RTX 4080 | i9-13900K | 32GB", pricePerHour: 250, row: 0, col: 4, tier: "pro", floor: 3, zone: "bootcamp" },
  // Console zone (6 seats)
  { id: 30, name: "PS5-1", specs: "PlayStation 5 | 4K TV", pricePerHour: 150, row: 1, col: 0, tier: "standard", floor: 3, zone: "console" },
  { id: 31, name: "PS5-2", specs: "PlayStation 5 | 4K TV", pricePerHour: 150, row: 1, col: 1, tier: "standard", floor: 3, zone: "console" },
  { id: 32, name: "PS5-3", specs: "PlayStation 5 | 4K TV", pricePerHour: 150, row: 1, col: 2, tier: "standard", floor: 3, zone: "console" },
  { id: 33, name: "XBOX-1", specs: "Xbox Series X | 4K TV", pricePerHour: 150, row: 1, col: 3, tier: "standard", floor: 3, zone: "console" },
  { id: 34, name: "XBOX-2", specs: "Xbox Series X | 4K TV", pricePerHour: 150, row: 1, col: 4, tier: "standard", floor: 3, zone: "console" },
  // VIP Lounge (4 premium spots)
  { id: 35, name: "LOUNGE-1", specs: "RTX 4090 | i9-14900K | 64GB | Кресло", pricePerHour: 400, row: 2, col: 0, tier: "vip", floor: 3, zone: "vip-lounge" },
  { id: 36, name: "LOUNGE-2", specs: "RTX 4090 | i9-14900K | 64GB | Кресло", pricePerHour: 400, row: 2, col: 1, tier: "vip", floor: 3, zone: "vip-lounge" },
  { id: 37, name: "LOUNGE-3", specs: "RTX 4090 | i9-14900K | 64GB | Кресло", pricePerHour: 400, row: 2, col: 2, tier: "vip", floor: 3, zone: "vip-lounge" },
  { id: 38, name: "LOUNGE-4", specs: "RTX 4090 | i9-14900K | 64GB | Кресло", pricePerHour: 400, row: 2, col: 3, tier: "vip", floor: 3, zone: "vip-lounge" },
]

// Simulated booked PCs
const bookedPCs = [3, 7, 10, 15, 18, 22, 26, 31, 35]

export default function BookingPage() {
  const bookingRef = useRef<HTMLDivElement>(null)
  const [selectedPCId, setSelectedPCId] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastBooking, setLastBooking] = useState<BookingData | null>(null)

  const selectedPC = pcs.find(pc => pc.id === selectedPCId) || null

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleBooking = async (data: BookingData) => {
    setIsSubmitting(true)
    
    // Simulate server request
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setLastBooking(data)
    setShowSuccess(true)
    setIsSubmitting(false)
    setSelectedPCId(null)
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
    setLastBooking(null)
  }

  // Calculate total available
  const totalAvailable = pcs.length - bookedPCs.length

  return (
    <div className="min-h-screen bg-background relative">
      {/* Particle background */}
      <ParticleBackground />
      
      {/* Header with available seats indicator */}
      <Header onScrollToBooking={scrollToBooking} availableSeats={totalAvailable} />
      
      {/* Hero */}
      <HeroSection onScrollToBooking={scrollToBooking} />
      
      {/* Features */}
      <FeaturesSection />
      
      {/* Pricing */}
      <PricingSection onScrollToBooking={scrollToBooking} />
      
      {/* Booking Section */}
      <section ref={bookingRef} className="py-32 px-4 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute top-1/4 left-0 w-125 h-125 bg-primary/20 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-125 h-125 bg-accent/20 rounded-full blur-[200px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 ultra-glass rounded-full text-sm mb-8">
              <Monitor className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Онлайн-бронирование</span>
              <div className="w-px h-4 bg-border" />
              <span className="text-primary font-bold">{totalAvailable} мест свободно</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
              <span className="text-foreground">Выбери своё </span>
              <span className="text-primary text-glow">место</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              3 этажа, 38 игровых станций. Выбери зону и забронируй на удобное время
            </p>
          </div>

          {/* Booking grid */}
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Seat Map */}
            <div className="lg:col-span-3">
              <div className="ultra-glass rounded-3xl p-4 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Карта зала</h3>
                    <p className="text-xs text-muted-foreground">Выбери этаж и место</p>
                  </div>
                </div>
                <PCSeatMap 
                  pcs={pcs}
                  selectedPC={selectedPCId}
                  bookedPCs={bookedPCs}
                  onSelectPC={setSelectedPCId}
                />
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              <div className="ultra-glass rounded-3xl p-6 md:p-8 neon-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Monitor className="w-5 h-5 text-primary" />
                    </div>
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Оформление брони</h3>
                    <p className="text-xs text-muted-foreground">Заполни данные для бронирования</p>
                  </div>
                </div>
                <BookingForm 
                  selectedPC={selectedPC}
                  onSubmit={handleBooking}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Success Dialog */}
      <BookingSuccessDialog 
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        booking={lastBooking}
        pc={lastBooking ? pcs.find(pc => pc.id === lastBooking.pcId) || null : null}
      />
    </div>
  )
}
