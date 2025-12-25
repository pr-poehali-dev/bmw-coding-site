import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const services = [
  {
    id: 'chiptuning',
    title: 'Чип-тюнинг',
    description: 'Увеличение мощности двигателя и оптимизация АКПП',
    icon: 'Zap',
    features: ['Stage 1/2/3 тюнинг', 'Оптимизация АКПП', '+30-100 л.с. мощности', 'Снижение расхода топлива'],
    gallery: [
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/ebef2432-92c1-446c-b16d-e514bf71df91.jpg',
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/81949a9a-544b-45d6-8c91-6241328f1c0e.jpg',
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/8d53ffc2-e332-4bea-b692-9aea8eeb44d0.jpg'
    ]
  },
  {
    id: 'coding',
    title: 'Кодирование',
    description: 'Активация скрытых функций BMW через программное обеспечение',
    icon: 'Code2',
    features: ['Складывание зеркал', 'Комфортное открывание', 'Видео в движении', 'Настройка приборной панели'],
    gallery: [
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/fd133bef-33d1-423f-babc-fe8806e44cce.jpg',
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/81949a9a-544b-45d6-8c91-6241328f1c0e.jpg',
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/8d53ffc2-e332-4bea-b692-9aea8eeb44d0.jpg'
    ]
  },
  {
    id: 'equipment',
    title: 'Дооснащение',
    description: 'Установка дополнительного оборудования и модернизация',
    icon: 'Cog',
    features: ['Камеры кругового обзора', 'Парктроники', 'Мультимедиа системы', 'LED оптика'],
    gallery: [
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/5eaa6841-8a8b-4bd2-bb0b-b24429fd34a9.jpg',
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/8d53ffc2-e332-4bea-b692-9aea8eeb44d0.jpg',
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/81949a9a-544b-45d6-8c91-6241328f1c0e.jpg'
    ]
  },
  {
    id: 'russian',
    title: 'Русификация',
    description: 'Полная локализация интерфейса на русский язык',
    icon: 'Languages',
    features: ['Меню на русском', 'Голосовое управление', 'Навигация', 'Приборная панель'],
    gallery: [
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/81949a9a-544b-45d6-8c91-6241328f1c0e.jpg',
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/8d53ffc2-e332-4bea-b692-9aea8eeb44d0.jpg',
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/fd133bef-33d1-423f-babc-fe8806e44cce.jpg'
    ]
  },
  {
    id: 'maps',
    title: 'Навигация',
    description: 'Обновление карт и навигационного ПО до последних версий',
    icon: 'Map',
    features: ['Актуальные карты РФ', 'Обновление ПО', 'Пробки онлайн', 'Точки интереса'],
    gallery: [
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/8d53ffc2-e332-4bea-b692-9aea8eeb44d0.jpg',
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/81949a9a-544b-45d6-8c91-6241328f1c0e.jpg',
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/fd133bef-33d1-423f-babc-fe8806e44cce.jpg'
    ]
  },
  {
    id: 'keys',
    title: 'Изготовление ключей',
    description: 'Программирование и изготовление дополнительных ключей',
    icon: 'Key',
    features: ['Запасной ключ', 'Comfort Access', 'Display Key', 'Восстановление ключей'],
    gallery: [
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/81949a9a-544b-45d6-8c91-6241328f1c0e.jpg',
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/8d53ffc2-e332-4bea-b692-9aea8eeb44d0.jpg',
      'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/ebef2432-92c1-446c-b16d-e514bf71df91.jpg'
    ]
  }
];

const ambientModes = [
  { id: 'ice-blue', name: 'Ice Blue', primary: '0, 153, 255', secondary: '0, 153, 255', icon: 'Droplets' },
  { id: 'orange', name: 'Orange', primary: '255, 120, 60', secondary: '255, 140, 80', icon: 'Flame' },
  { id: 'purple', name: 'Purple', primary: '165, 100, 255', secondary: '180, 120, 255', icon: 'Sparkles' },
  { id: 'mint', name: 'Mint', primary: '100, 200, 180', secondary: '120, 220, 200', icon: 'Leaf' },
  { id: 'red', name: 'Red', primary: '255, 80, 80', secondary: '255, 100, 100', icon: 'Flame' },
  { id: 'dynamic', name: 'Dynamic', primary: '0, 153, 255', secondary: '255, 120, 60', icon: 'Zap' }
];

export default function Index() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [ambientMode, setAmbientMode] = useState('dynamic');

  const currentMode = ambientModes.find(m => m.id === ambientMode) || ambientModes[5];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden perspective-deep">
      <div 
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/81949a9a-544b-45d6-8c91-6241328f1c0e.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.2) blur(8px)'
        }}
      />
      
      <div 
        className="fixed top-0 left-0 right-0 h-2 transition-all duration-1000"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(${currentMode.primary}, 0.8) 50%, transparent 100%)`,
          boxShadow: `0 0 20px rgba(${currentMode.primary}, 0.5)`,
          animation: 'ambient-flow 5s ease-in-out infinite'
        }}
      />
      <div 
        className="fixed bottom-0 left-0 right-0 h-2 transition-all duration-1000"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(${currentMode.secondary}, 0.8) 50%, transparent 100%)`,
          boxShadow: `0 0 20px rgba(${currentMode.secondary}, 0.5)`,
          animation: 'ambient-flow 5s ease-in-out infinite 2s'
        }}
      />
      <div 
        className="fixed left-0 top-0 bottom-0 w-2 transition-all duration-1000"
        style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(${currentMode.primary}, 0.8) 50%, transparent 100%)`,
          boxShadow: `0 0 20px rgba(${currentMode.primary}, 0.5)`,
          animation: 'ambient-flow 5s ease-in-out infinite 1s'
        }}
      />
      <div 
        className="fixed right-0 top-0 bottom-0 w-2 transition-all duration-1000"
        style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(${currentMode.secondary}, 0.8) 50%, transparent 100%)`,
          boxShadow: `0 0 20px rgba(${currentMode.secondary}, 0.5)`,
          animation: 'ambient-flow 5s ease-in-out infinite 3s'
        }}
      />
      
      <div className="fixed top-20 left-20 w-96 h-96 rounded-full blur-3xl floating-3d transition-all duration-1000" style={{ background: `radial-gradient(circle, rgba(${currentMode.primary}, 0.15) 0%, transparent 70%)` }} />
      <div className="fixed bottom-20 right-20 w-[500px] h-[500px] rounded-full blur-3xl floating-3d transition-all duration-1000" style={{ background: `radial-gradient(circle, rgba(${currentMode.secondary}, 0.12) 0%, transparent 70%)`, animationDelay: '2s', animationDuration: '8s' }} />
      <div className="fixed top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl floating-3d transition-all duration-1000" style={{ background: `radial-gradient(circle, rgba(${currentMode.primary}, 0.08) 0%, transparent 70%)`, animationDelay: '3s', animationDuration: '9s' }} />
      <div className="fixed bottom-1/3 left-1/4 w-[450px] h-[450px] rounded-full blur-3xl floating-3d transition-all duration-1000" style={{ background: `radial-gradient(circle, rgba(${currentMode.secondary}, 0.08) 0%, transparent 70%)`, animationDelay: '5s', animationDuration: '11s' }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl floating-3d transition-all duration-1000" style={{ background: `radial-gradient(circle, rgba(${currentMode.primary}, 0.06) 0%, rgba(${currentMode.secondary}, 0.04) 50%, transparent 100%)`, animationDelay: '4s', animationDuration: '12s' }} />
      
      <div className="relative z-10">
        <header className="glass-cockpit nappa-leather rounded-3xl mx-4 mt-4 overflow-hidden cockpit-reflection bmw-3d-panel">
          <div className="container mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="relative group rotate-3d-hover">
                <div className="absolute inset-0 bg-primary/40 blur-3xl group-hover:bg-primary/60 transition-all duration-500 depth-layer-1" />
                <img 
                  src="https://cdn.poehali.dev/files/reborn.jpg" 
                  alt="Reborn Technologies" 
                  className="h-24 md:h-32 w-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(0,149,255,0.9)] depth-layer-2"
                />
              </div>
              <div className="hidden lg:block border-l-2 border-primary/40 pl-8 h-20 depth-layer-1">
                <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2 electric-glow">BMW CODING</h1>
                <p className="text-sm text-primary font-medium tracking-[0.3em]">G-SERIES TECHNOLOGY</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                className="glass-cockpit nappa-leather font-bold rounded-2xl px-6 py-4 gauge-glow hover:scale-105 transition-all duration-500 depth-layer-2 rotate-3d-hover"
                onClick={() => {
                  const currentIndex = ambientModes.findIndex(m => m.id === ambientMode);
                  const nextIndex = (currentIndex + 1) % ambientModes.length;
                  setAmbientMode(ambientModes[nextIndex].id);
                }}
              >
                <Icon name={currentMode.icon as any} className="w-5 h-5" style={{ color: `rgb(${currentMode.primary})` }} />
              </Button>
              <Button 
                className="font-bold rounded-2xl px-10 py-7 gauge-glow hover:scale-105 transition-all duration-500 depth-layer-2 rotate-3d-hover"
                style={{
                  background: `linear-gradient(135deg, rgba(${currentMode.primary}, 1), rgba(${currentMode.secondary}, 1))`,
                  color: 'white'
                }}
              >
                <Icon name="Phone" className="w-6 h-6 mr-3" />
                Связаться
              </Button>
            </div>
          </div>
        </header>

        <div className="fixed top-24 right-4 z-50 glass-cockpit nappa-leather rounded-2xl p-4 cockpit-reflection">
          <p className="text-xs font-bold mb-3 tracking-wide" style={{ color: `rgb(${currentMode.primary})` }}>AMBIENT LIGHT</p>
          <div className="space-y-2">
            {ambientModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setAmbientMode(mode.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 hover:scale-105 ${
                  ambientMode === mode.id ? 'glass-cockpit' : 'hover:bg-white/5'
                }`}
                style={{
                  border: ambientMode === mode.id ? `2px solid rgba(${mode.primary}, 0.6)` : '2px solid transparent',
                  boxShadow: ambientMode === mode.id ? `0 0 20px rgba(${mode.primary}, 0.4)` : 'none'
                }}
              >
                <Icon 
                  name={mode.icon as any} 
                  className="w-5 h-5" 
                  style={{ color: `rgb(${mode.primary})` }}
                />
                <span className="text-sm font-medium">{mode.name}</span>
              </button>
            ))}
          </div>
        </div>

        <section className="container mx-auto px-4 py-32 text-center relative bmw-3d-panel">
          <div 
            className="absolute inset-0 rounded-3xl transition-all duration-1000"
            style={{
              background: `radial-gradient(ellipse at center, rgba(${currentMode.primary}, 0.06) 0%, rgba(${currentMode.secondary}, 0.02) 50%, transparent 100%)`,
              boxShadow: `0 0 100px rgba(${currentMode.primary}, 0.35), 0 0 60px rgba(${currentMode.secondary}, 0.15), inset 0 0 60px rgba(${currentMode.primary}, 0.12)`
            }}
          />
          <div className="animate-slide-in relative">
            <div className="glass-cockpit inline-block rounded-full px-10 py-4 mb-10 cockpit-reflection nappa-leather depth-layer-1">
              <p className="text-sm font-bold uppercase tracking-[0.4em] flex items-center gap-3 justify-center transition-all duration-1000" style={{ color: `rgb(${currentMode.primary})` }}>
                <span 
                  className="w-2 h-2 rounded-full animate-pulse transition-all duration-1000" 
                  style={{ 
                    backgroundColor: `rgb(${currentMode.primary})`,
                    boxShadow: `0 0 10px rgba(${currentMode.primary}, 0.8)`
                  }}
                />
                Активируем за 1 час то, что BMW скрыл в вашем авто
              </p>
            </div>
            <h2 
              className="text-7xl md:text-9xl font-bold mb-10 leading-tight depth-layer-2 transition-all duration-1000" 
              style={{ 
                transform: 'translateZ(40px)',
                textShadow: `0 0 20px rgba(${currentMode.primary}, 0.7), 0 0 40px rgba(${currentMode.primary}, 0.4), 0 0 60px rgba(${currentMode.primary}, 0.2)`
              }}
            >
              +10 СКРЫТЫХ ФУНКЦИЙ<br/>БЕЗ ВИЗИТА В ДИЛЕР
            </h2>
            <p className="text-2xl md:text-3xl text-muted-foreground mb-12 max-w-5xl mx-auto leading-relaxed depth-layer-1">
              Складывание зеркал, видео в движении, русское меню — всё это уже есть в вашем BMW. 
              Просто заблокировано заводом.
            </p>
            <div className="flex flex-col sm:flex-row gap-10 justify-center items-center mb-8">
              <div 
                className="glass-cockpit flex items-center gap-4 px-8 py-4 rounded-2xl nappa-leather cockpit-reflection rotate-3d-hover depth-layer-2 transition-all duration-1000"
                style={{ color: `rgb(${currentMode.primary})` }}
              >
                <Icon name="CheckCircle2" className="w-7 h-7" />
                <span className="font-bold text-lg">Гарантия на работу</span>
              </div>
              <div 
                className="glass-cockpit flex items-center gap-4 px-8 py-4 rounded-2xl nappa-leather cockpit-reflection rotate-3d-hover depth-layer-2 transition-all duration-1000"
                style={{ color: `rgb(${currentMode.secondary})` }}
              >
                <Icon name="Shield" className="w-7 h-7" />
                <span className="font-bold text-lg">Без потери гарантии BMW</span>
              </div>
            </div>
            <div 
              className="glass-cockpit inline-block px-12 py-6 rounded-2xl nappa-leather depth-layer-3 transition-all duration-1000" 
              style={{ 
                transform: 'translateZ(60px)',
                border: `2px solid rgba(${currentMode.primary}, 0.5)`,
                boxShadow: `0 0 25px rgba(${currentMode.primary}, 0.6), 0 0 50px rgba(${currentMode.primary}, 0.35), 0 0 75px rgba(${currentMode.primary}, 0.2), 0 0 100px rgba(${currentMode.secondary}, 0.15), inset 0 0 25px rgba(${currentMode.primary}, 0.15)`
              }}
            >
              <p className="text-2xl font-bold transition-all duration-1000" style={{ color: `rgb(${currentMode.primary})` }}>
                🎁 При заказе сегодня — диагностика всех систем БЕСПЛАТНО (обычно 3000₽)
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 bmw-3d-panel">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="glass-cockpit nappa-leather cursor-pointer group relative overflow-hidden bmw-3d-card cockpit-reflection"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                <div className="holographic absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <CardHeader>
                  <div className="w-28 h-28 bg-gradient-to-br from-primary/40 to-primary/10 rounded-3xl flex items-center justify-center mb-8 gauge-glow mx-auto group-hover:scale-110 transition-transform duration-500 depth-layer-2" style={{ transform: 'translateZ(30px)' }}>
                    <Icon name={service.icon as any} className="w-14 h-14 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-foreground transition-all text-center mb-3 depth-layer-1">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-lg text-center leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className={`space-y-4 transition-all duration-700 ${selectedService === service.id ? 'max-h-[1000px] opacity-100 mb-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="grid grid-cols-3 gap-3 mb-6 perspective-deep">
                      {service.gallery.map((img, idx) => (
                        <div 
                          key={idx}
                          className="aspect-square rounded-2xl overflow-hidden glass-cockpit cursor-pointer group relative bmw-3d-card"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <img 
                            src={img} 
                            alt={`${service.title} ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 gauge-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-base font-bold text-primary mb-4 tracking-wide">Возможности:</p>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-base glass-cockpit p-3 rounded-xl nappa-leather">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse flex-shrink-0 gauge-glow" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full glass-cockpit nappa-leather font-bold rounded-2xl py-7 text-lg hover:scale-105 transition-all duration-500 gauge-glow"
                  >
                    <Icon name="ArrowRight" className="w-6 h-6 mr-3" />
                    {selectedService === service.id ? 'Скрыть детали' : 'Подробнее'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-32 bmw-3d-panel">
          <Card className="glass-cockpit nappa-leather relative overflow-hidden cockpit-reflection bmw-3d-card">
            <div 
              className="absolute inset-0 transition-all duration-1000"
              style={{
                background: `radial-gradient(ellipse at center, rgba(${currentMode.primary}, 0.06) 0%, rgba(${currentMode.secondary}, 0.02) 50%, transparent 100%)`,
                boxShadow: `0 0 100px rgba(${currentMode.primary}, 0.35), 0 0 60px rgba(${currentMode.secondary}, 0.15), inset 0 0 60px rgba(${currentMode.primary}, 0.12)`
              }}
            />
            <CardContent className="p-20 text-center relative z-10">
              <div className="depth-layer-2" style={{ transform: 'translateZ(40px)' }}>
                <h3 
                  className="text-6xl md:text-7xl font-bold mb-8 leading-tight transition-all duration-1000"
                  style={{
                    textShadow: `0 0 20px rgba(${currentMode.primary}, 0.7), 0 0 40px rgba(${currentMode.primary}, 0.4), 0 0 60px rgba(${currentMode.primary}, 0.2)`
                  }}
                >
                  ГОТОВЫ МОДЕРНИЗИРОВАТЬ ВАШ BMW?
                </h3>
              </div>
              <p className="text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed depth-layer-1">
                Свяжитесь с нами для консультации и записи на обслуживание. 
                Работаем со всеми моделями BMW G-серии.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <Button 
                  size="lg" 
                  className="text-white font-bold text-2xl px-16 py-10 rounded-3xl hover:scale-110 transition-all duration-500 depth-layer-3 rotate-3d-hover"
                  style={{
                    background: `linear-gradient(135deg, rgba(${currentMode.primary}, 1), rgba(${currentMode.secondary}, 1))`,
                    boxShadow: `0 0 25px rgba(${currentMode.primary}, 0.6), 0 0 50px rgba(${currentMode.primary}, 0.35), 0 0 75px rgba(${currentMode.primary}, 0.2), 0 0 100px rgba(${currentMode.secondary}, 0.15), inset 0 0 25px rgba(${currentMode.primary}, 0.15)`,
                    border: `2px solid rgba(${currentMode.primary}, 0.5)`
                  }}
                >
                  <Icon name="MessageCircle" className="w-8 h-8 mr-4" />
                  Написать в WhatsApp
                </Button>
                <Button 
                  size="lg" 
                  className="glass-cockpit nappa-leather text-foreground font-bold text-2xl px-16 py-10 rounded-3xl hover:scale-110 transition-all duration-500 depth-layer-3 rotate-3d-hover"
                  style={{
                    border: `2px solid rgba(${currentMode.primary}, 0.5)`,
                    boxShadow: `0 0 25px rgba(${currentMode.primary}, 0.6), 0 0 50px rgba(${currentMode.primary}, 0.35), 0 0 75px rgba(${currentMode.primary}, 0.2), 0 0 100px rgba(${currentMode.secondary}, 0.15), inset 0 0 25px rgba(${currentMode.primary}, 0.15)`
                  }}
                >
                  <Icon name="Phone" className="w-8 h-8 mr-4" />
                  Позвонить
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="glass-cockpit nappa-leather mt-32 mx-4 mb-4 rounded-3xl overflow-hidden cockpit-reflection relative">
          <div className="container mx-auto px-6 py-12 text-center">
            <p className="text-muted-foreground mb-6 text-lg">© 2024 BMW Coding. Профессиональная работа с электроникой BMW G-серии</p>
            <div className="flex justify-center gap-10">
              <a 
                href="#" 
                className="glass-cockpit p-4 rounded-2xl transition-all duration-500 hover:scale-110 rotate-3d-hover"
                style={{
                  color: `rgb(${currentMode.primary})`,
                  border: `2px solid rgba(${currentMode.primary}, 0.3)`,
                  boxShadow: `0 0 20px rgba(${currentMode.primary}, 0.4)`
                }}
              >
                <Icon name="Instagram" className="w-7 h-7" />
              </a>
              <a 
                href="#" 
                className="glass-cockpit p-4 rounded-2xl transition-all duration-500 hover:scale-110 rotate-3d-hover"
                style={{
                  color: `rgb(${currentMode.primary})`,
                  border: `2px solid rgba(${currentMode.primary}, 0.3)`,
                  boxShadow: `0 0 20px rgba(${currentMode.primary}, 0.4)`
                }}
              >
                <Icon name="Youtube" className="w-7 h-7" />
              </a>
              <a 
                href="#" 
                className="glass-cockpit p-4 rounded-2xl transition-all duration-500 hover:scale-110 rotate-3d-hover"
                style={{
                  color: `rgb(${currentMode.primary})`,
                  border: `2px solid rgba(${currentMode.primary}, 0.3)`,
                  boxShadow: `0 0 20px rgba(${currentMode.primary}, 0.4)`
                }}
              >
                <Icon name="Mail" className="w-7 h-7" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}