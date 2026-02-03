"use client"

import { Cpu, MonitorPlay, Headphones, Zap, Shield, Clock, Sparkles } from "lucide-react"
import { TiltCard } from "@/components/tilt-card"

const features = [
  { 
    icon: Cpu, 
    title: "Мощное железо", 
    description: "RTX 4060 - 4080, Intel i5 - i9 последнего поколения",
    accent: "primary",
    badge: "TOP"
  },
  { 
    icon: MonitorPlay, 
    title: "240Hz мониторы", 
    description: "Профессиональные игровые мониторы без разрывов",
    accent: "accent",
    badge: null
  },
  { 
    icon: Headphones, 
    title: "Про-периферия", 
    description: "HyperX, Logitech, Razer - топовые девайсы",
    accent: "primary",
    badge: null
  },
  { 
    icon: Zap, 
    title: "Гигабитный интернет", 
    description: "Минимальный пинг для онлайн-игр",
    accent: "accent",
    badge: "FAST"
  },
  { 
    icon: Shield, 
    title: "Комфорт и чистота", 
    description: "Кондиционирование, шумоизоляция, санитарная обработка",
    accent: "primary",
    badge: null
  },
  { 
    icon: Clock, 
    title: "Работаем допоздна", 
    description: "Ежедневно с 10:00 до 02:00 - играй сколько хочешь",
    accent: "accent",
    badge: "24/7"
  },
]

export function FeaturesSection() {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 ultra-glass rounded-full text-sm mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Почему выбирают нас</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="text-foreground">Всё для </span>
            <span className="text-primary text-glow">победы</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Создаём идеальные условия для геймеров любого уровня
          </p>
        </div>

        {/* Features grid - bento style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <TiltCard key={feature.title}>
              <div 
                className={`relative ultra-glass rounded-3xl p-8 h-full hover:neon-glow transition-all duration-500 group overflow-hidden ${
                  index === 0 ? "lg:col-span-2 lg:row-span-1" : ""
                }`}
              >
                {/* Accent glow */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${
                  feature.accent === 'primary' ? 'bg-primary' : 'bg-accent'
                }`} />
                
                {/* Badge */}
                {feature.badge && (
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                    feature.accent === 'primary' 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-accent/20 text-accent'
                  }`}>
                    {feature.badge}
                  </div>
                )}
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  feature.accent === 'primary' 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-accent/10 text-accent'
                }`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
