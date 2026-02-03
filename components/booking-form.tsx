"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, User, Phone, Mail, Monitor, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { cn } from "@/lib/utils"
import type { PC } from "./pc-seat-map"

interface BookingFormProps {
  selectedPC: PC | null
  onSubmit: (data: BookingData) => void
  isSubmitting: boolean
}

export interface BookingData {
  pcId: number
  date: Date
  startTime: string
  duration: number
  name: string
  phone: string
  email: string
}

const timeSlots = [
  "10:00", "11:00", "12:00", "13:00", "14:00", 
  "15:00", "16:00", "17:00", "18:00", "19:00", 
  "20:00", "21:00", "22:00", "23:00"
]

const durations = [
  { value: 1, label: "1 час" },
  { value: 2, label: "2 часа" },
  { value: 3, label: "3 часа" },
  { value: 4, label: "4 часа" },
  { value: 5, label: "5 часов" },
]

export function BookingForm({ selectedPC, onSubmit, isSubmitting }: BookingFormProps) {
  const [date, setDate] = useState<Date>()
  const [startTime, setStartTime] = useState<string>("")
  const [duration, setDuration] = useState<number>(1)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  const totalPrice = selectedPC ? selectedPC.pricePerHour * duration : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPC || !date || !startTime) return

    onSubmit({
      pcId: selectedPC.id,
      date,
      startTime,
      duration,
      name,
      phone,
      email,
    })
  }

  const isFormValid = selectedPC && date && startTime && name && phone && email

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Selected PC */}
      <div className={cn(
        "glass rounded-xl p-5 transition-all duration-300",
        selectedPC && "neon-glow"
      )}>
        <div className="flex items-center gap-3 mb-3">
          <Monitor className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Выбранный ПК</h3>
        </div>
        {selectedPC ? (
          <div className="space-y-1">
            <p className="text-xl font-bold text-primary">{selectedPC.name}</p>
            <p className="text-sm text-muted-foreground">{selectedPC.specs}</p>
            <p className="text-sm font-medium text-primary">{selectedPC.pricePerHour} ₽/час</p>
          </div>
        ) : (
          <p className="text-muted-foreground">Выберите место на карте слева</p>
        )}
      </div>

      {/* Date & Time */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-foreground flex items-center gap-2 text-sm">
            <CalendarIcon className="w-4 h-4 text-primary" />
            Дата
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-input border-border",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "d MMMM yyyy", { locale: ru }) : "Выберите дату"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 glass" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                locale={ru}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-foreground flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              Время
            </Label>
            <Select value={startTime} onValueChange={setStartTime}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Выбрать" />
              </SelectTrigger>
              <SelectContent className="glass">
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground text-sm">Длительность</Label>
            <Select value={duration.toString()} onValueChange={(v) => setDuration(Number(v))}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass">
                {durations.map((d) => (
                  <SelectItem key={d.value} value={d.value.toString()}>{d.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="font-semibold text-foreground text-sm">Контактные данные</h3>
        
        <div className="space-y-2">
          <Label className="text-foreground flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-primary" />
            Имя
          </Label>
          <Input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            className="bg-input border-border"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-foreground flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-primary" />
            Телефон
          </Label>
          <Input 
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (999) 123-45-67"
            className="bg-input border-border"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-foreground flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-primary" />
            Email
          </Label>
          <Input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.ru"
            className="bg-input border-border"
            required
          />
        </div>
      </div>

      {/* Total */}
      {selectedPC && date && startTime && (
        <div className="glass rounded-xl p-5 neon-glow">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Итого к оплате:</span>
            <span className="text-3xl font-bold text-primary text-glow">{totalPrice} ₽</span>
          </div>
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full h-14 text-lg font-semibold neon-glow"
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Бронируем...
          </>
        ) : (
          "Забронировать"
        )}
      </Button>
    </form>
  )
}
