"use client"

import { Check, Sparkles, Crown, Zap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiltCard } from "@/components/tilt-card"
import { AnimatedCounter } from "@/components/animated-counter"

const plans = [
  {
    name: "Стандарт",
    price: 100,
    specs: "RTX 4060 | i5-13600K | 16GB",
    icon: Star,
    features: [
      "Full HD 144Hz монитор",
      "Базовая периферия",
      "Комфортное кресло",
      "Наушники",
    ],
    popular: false,
    color: "muted",
  },
  {
    name: "Про",
    price: 150,
    specs: "RTX 4070 | i7-13700K | 32GB",
    icon: Zap,
    features: [
      "2K 165Hz монитор",
      "Премиум периферия Logitech",
      "Эргономичное кресло",
      "Гарнитура HyperX",
      "Приоритетная поддержка",
    ],
    popular: true,
    color: "primary",
  },
  {
    name: "VIP",
    price: 200,
    specs: "RTX 4080 | i9-13900K | 32GB",
    icon: Crown,
    features: [
      "4K 240Hz монитор",
      "Топовая периферия Razer",
      "Игровое кресло DXRacer",
      "Премиум гарнитура",
      "Отдельная VIP-зона",
      "Напитки включены",
    ],
    popular: false,
    color: "accent",
  },
]

interface PricingSectionProps {
  onScrollToBooking: () => void
}

export function PricingSection({ onScrollToBooking }: PricingSectionProps) {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 ultra-glass rounded-full text-sm mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">Тарифные планы</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="text-foreground">Выбери свой </span>
            <span className="text-accent text-glow">уровень</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            От казуального гейминга до профессиональных тренировок
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {plans.map((plan) => (
            <TiltCard key={plan.name} glareEnabled={plan.popular}>
              <div 
                className={`relative ultra-glass rounded-3xl p-8 md:p-10 flex flex-col h-full ${
                  plan.popular ? 'neon-border' : ''
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary to-accent text-background text-sm font-bold rounded-full shadow-lg shadow-primary/30">
                      <Sparkles className="w-4 h-4" />
                      Популярный выбор
                    </span>
                  </div>
                )}
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  plan.color === "primary" ? "bg-primary/20" :
                  plan.color === "accent" ? "bg-accent/20" : "bg-muted"
                }`}>
                  <plan.icon className={`w-8 h-8 ${
                    plan.color === "primary" ? "text-primary" :
                    plan.color === "accent" ? "text-accent" : "text-muted-foreground"
                  }`} />
                </div>
                
                {/* Plan name & price */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-6xl font-black ${
                      plan.color === "primary" ? "text-primary" :
                      plan.color === "accent" ? "text-accent" : "text-foreground"
                    }`}>
                      <AnimatedCounter value={plan.price} duration={1500} />
                    </span>
                    <span className="text-xl text-muted-foreground">₽/час</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">{plan.specs}</p>
                </div>
                
                {/* Features */}
                <ul className="space-y-4 flex-1 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.color === "primary" ? "bg-primary/20" :
                        plan.color === "accent" ? "bg-accent/20" : "bg-muted"
                      }`}>
                        <Check className={`w-4 h-4 ${
                          plan.color === "primary" ? "text-primary" :
                          plan.color === "accent" ? "text-accent" : "text-muted-foreground"
                        }`} />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <Button 
                  onClick={onScrollToBooking}
                  size="lg"
                  className={`w-full h-14 font-bold text-lg ${
                    plan.popular 
                      ? "bg-gradient-to-r from-primary to-accent hover:opacity-90 text-background" 
                      : plan.color === "accent"
                        ? "bg-accent hover:bg-accent/90 text-background"
                        : "bg-transparent"
                  }`}
                  variant={plan.popular || plan.color === "accent" ? "default" : "outline"}
                >
                  Забронировать
                </Button>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
