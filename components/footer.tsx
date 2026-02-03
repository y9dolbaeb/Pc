"use client"

import { Gamepad2, MapPin, Clock, Phone, Mail, Instagram, MessageCircle, Send, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Top CTA Section */}
      <div className="border-t border-border py-20 px-4 relative">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[150px]" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="text-foreground">Готов к </span>
            <span className="text-primary text-glow">игре</span>
            <span className="text-foreground">?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Забронируй место прямо сейчас и получи первый час со скидкой 20%
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex w-full max-w-md">
              <Input 
                placeholder="Введи свой email" 
                className="rounded-r-none bg-secondary/50 border-r-0 h-14 text-lg"
              />
              <Button className="rounded-l-none h-14 px-6 font-bold gap-2">
                <Send className="w-5 h-5" />
                Подписаться
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="border-t border-border py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <Gamepad2 className="w-7 h-7 text-primary" />
                  </div>
                  <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-md -z-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-foreground tracking-tight">
                    CYBER<span className="text-primary">ZONE</span>
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Премиальный киберспортивный клуб с топовым железом и идеальными условиями для геймеров.
              </p>
              {/* Social */}
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="w-12 h-12 ultra-glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-glow transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 ultra-glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-accent hover:neon-glow transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 ultra-glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-glow transition-all"
                >
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Навигация</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <Zap className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Тарифы
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <Zap className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Бронирование
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <Zap className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    О клубе
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <Zap className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Турниры
                  </a>
                </li>
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Контакты</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3 hover:text-foreground transition-colors">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>г. Москва,<br />ул. Игровая, 42</span>
                </li>
                <li className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <span>Ежедневно 10:00 — 02:00</span>
                </li>
                <li className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span>+7 (999) 123-45-67</span>
                </li>
                <li className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span>info@cyberzone.ru</span>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Информация</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Политика конфиденциальности
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Пользовательское соглашение
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Правила клуба
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Возврат средств
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>2026 CYBERZONE. Все права защищены.</p>
            <p className="flex items-center gap-2">
              Сделано с <span className="text-primary">любовью</span> для геймеров
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
