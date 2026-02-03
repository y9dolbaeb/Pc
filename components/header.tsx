"use client"

import { Gamepad2, MapPin, Clock, Phone, Menu, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

interface HeaderProps {
  onScrollToBooking: () => void;
  availableSeats: number;
}

export function Header({ onScrollToBooking }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div className="max-w-7xl mx-auto ultra-glass rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-md -z-10" />
              </div>
              <div>
                <h1 className="text-xl font-black text-foreground tracking-tight">
                  CYBER<span className="text-primary">ZONE</span>
                </h1>
              </div>
            </div>
            
            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              <nav className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors font-medium">
                  Тарифы
                </a>
                <a href="#" className="hover:text-foreground transition-colors font-medium">
                  О нас
                </a>
                <a href="#" className="hover:text-foreground transition-colors font-medium">
                  Контакты
                </a>
              </nav>
              
              <div className="h-6 w-px bg-border" />
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>10:00 — 02:00</span>
                </div>
                <div className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+7 (999) 123-45-67</span>
                </div>
              </div>
              
              <Button onClick={onScrollToBooking} className="font-bold gap-2">
                <Zap className="w-4 h-4" />
                Забронировать
              </Button>
            </div>

            {/* Mobile nav */}
            <div className="flex lg:hidden items-center gap-3">
              <Button onClick={onScrollToBooking} size="sm" className="font-bold gap-2">
                <Zap className="w-4 h-4" />
                Бронь
              </Button>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="bg-transparent">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="ultra-glass border-l-border w-80">
                  <div className="flex flex-col gap-8 mt-8">
                    {/* Logo in sheet */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Gamepad2 className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-xl font-black text-foreground tracking-tight">
                        CYBER<span className="text-primary">ZONE</span>
                      </h2>
                    </div>
                    
                    {/* Nav links */}
                    <nav className="flex flex-col gap-4">
                      <a href="#" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                        Тарифы
                      </a>
                      <a href="#" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                        О нас
                      </a>
                      <a href="#" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                        Контакты
                      </a>
                    </nav>
                    
                    <div className="h-px bg-border" />
                    
                    {/* Contact info */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span>ул. Игровая, 42</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="w-5 h-5 text-primary" />
                        <span>10:00 — 02:00</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Phone className="w-5 h-5 text-primary" />
                        <span>+7 (999) 123-45-67</span>
                      </div>
                    </div>
                    
                    <Button onClick={onScrollToBooking} size="lg" className="mt-4 font-bold gap-2">
                      <Zap className="w-5 h-5" />
                      Забронировать
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
