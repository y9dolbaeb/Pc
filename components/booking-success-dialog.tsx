"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Clock, Monitor, User, Copy, PartyPopper } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import type { BookingData } from "./booking-form"
import type { PC } from "./pc-seat-map"

interface BookingSuccessDialogProps {
  isOpen: boolean
  onClose: () => void
  booking: BookingData | null
  pc: PC | null
}

export function BookingSuccessDialog({ isOpen, onClose, booking, pc }: BookingSuccessDialogProps) {
  if (!booking || !pc) return null

  const totalPrice = pc.pricePerHour * booking.duration
  const bookingCode = `CZ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass border-primary/20">
        <DialogHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 neon-glow">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <DialogTitle className="text-2xl text-foreground flex items-center justify-center gap-2">
            Бронирование подтверждено
            <PartyPopper className="w-6 h-6 text-accent" />
          </DialogTitle>
          <DialogDescription>
            Ваше место успешно забронировано. Ждём вас в CYBERZONE!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Booking code */}
          <div className="glass rounded-xl p-4 text-center neon-glow">
            <p className="text-xs text-muted-foreground mb-1">Код бронирования</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl font-mono font-bold text-primary text-glow tracking-wider">
                {bookingCode}
              </span>
              <button 
                className="p-1.5 hover:bg-primary/20 rounded-lg transition-colors"
                onClick={() => navigator.clipboard.writeText(bookingCode)}
              >
                <Copy className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Booking details */}
          <div className="glass rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Monitor className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Место</p>
                <p className="font-semibold text-foreground">{pc.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Дата</p>
                <p className="font-semibold text-foreground">
                  {format(booking.date, "d MMMM yyyy", { locale: ru })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Время</p>
                <p className="font-semibold text-foreground">
                  {booking.startTime} — {booking.duration} ч.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Гость</p>
                <p className="font-semibold text-foreground">{booking.name}</p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center p-5 glass rounded-xl neon-glow">
            <span className="text-muted-foreground">К оплате на месте:</span>
            <span className="text-3xl font-bold text-primary text-glow">{totalPrice} ₽</span>
          </div>
        </div>

        <Button onClick={onClose} className="w-full h-12 font-semibold neon-glow">
          Отлично!
        </Button>
      </DialogContent>
    </Dialog>
  )
}
