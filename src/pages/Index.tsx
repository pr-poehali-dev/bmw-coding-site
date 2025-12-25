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
    features: ['Stage 1/2/3 тюнинг', 'Оптимизация АКПП', '+30-100 л.с. мощности', 'Снижение расхода топлива']
  },
  {
    id: 'coding',
    title: 'Кодирование',
    description: 'Активация скрытых функций BMW через программное обеспечение',
    icon: 'Code2',
    features: ['Складывание зеркал', 'Комфортное открывание', 'Видео в движении', 'Настройка приборной панели']
  },
  {
    id: 'equipment',
    title: 'Дооснащение',
    description: 'Установка дополнительного оборудования и модернизация',
    icon: 'Cog',
    features: ['Камеры кругового обзора', 'Парктроники', 'Мультимедиа системы', 'LED оптика']
  },
  {
    id: 'russian',
    title: 'Русификация',
    description: 'Полная локализация интерфейса на русский язык',
    icon: 'Languages',
    features: ['Меню на русском', 'Голосовое управление', 'Навигация', 'Приборная панель']
  },
  {
    id: 'maps',
    title: 'Навигация',
    description: 'Обновление карт и навигационного ПО до последних версий',
    icon: 'Map',
    features: ['Актуальные карты РФ', 'Обновление ПО', 'Пробки онлайн', 'Точки интереса']
  },
  {
    id: 'keys',
    title: 'Изготовление ключей',
    description: 'Программирование и изготовление дополнительных ключей',
    icon: 'Key',
    features: ['Запасной ключ', 'Comfort Access', 'Display Key', 'Восстановление ключей']
  }
];

export default function Index() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div 
        className="fixed inset-0 opacity-30 hexagon-pattern"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/81949a9a-544b-45d6-8c91-6241328f1c0e.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3) saturate(1.2)'
        }}
      />
      
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-40" />
      
      <div className="relative z-10">
        <header className="border-b border-primary/20 backdrop-blur-xl bg-card/40 leather-texture">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="container mx-auto px-4 py-5 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/40 blur-3xl group-hover:bg-primary/60 transition-all duration-500" />
                <img 
                  src="https://cdn.poehali.dev/files/reborn.jpg" 
                  alt="Reborn Technologies" 
                  className="h-20 md:h-28 w-auto object-contain relative z-10 drop-shadow-[0_0_25px_rgba(0,149,255,0.8)]"
                />
              </div>
              <div className="hidden lg:block border-l border-primary/30 pl-6 h-16">
                <h1 className="text-3xl font-bold text-foreground tracking-wide mb-1">BMW CODING</h1>
                <p className="text-sm text-primary font-medium">G-SERIES TECHNOLOGY</p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary text-primary-foreground font-bold rounded-xl px-8 py-6 ambient-glow hover:scale-105 transition-all duration-300">
              <Icon name="Phone" className="w-5 h-5 mr-2" />
              Связаться
            </Button>
          </div>
        </header>

        <section className="container mx-auto px-4 py-24 text-center relative">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent blur-3xl" />
          <div className="animate-slide-in relative">
            <div className="inline-block bg-card/60 backdrop-blur-sm border border-primary/40 rounded-full px-8 py-3 mb-8 ambient-glow leather-texture">
              <p className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2 justify-center">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Активируем за 1 час то, что BMW скрыл в вашем авто
              </p>
            </div>
            <h2 className="text-6xl md:text-8xl font-bold mb-8 electric-glow leading-tight">
              +10 СКРЫТЫХ ФУНКЦИЙ<br/>БЕЗ ВИЗИТА В ДИЛЕР
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              Складывание зеркал, видео в движении, русское меню — всё это уже есть в вашем BMW. 
              Просто заблокировано заводом.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-6">
              <div className="flex items-center gap-3 text-primary bg-card/40 backdrop-blur-sm px-6 py-3 rounded-xl border border-primary/20 leather-texture">
                <Icon name="CheckCircle2" className="w-6 h-6" />
                <span className="font-bold">Гарантия на работу</span>
              </div>
              <div className="flex items-center gap-3 text-accent bg-card/40 backdrop-blur-sm px-6 py-3 rounded-xl border border-accent/20 leather-texture">
                <Icon name="Shield" className="w-6 h-6" />
                <span className="font-bold">Без потери гарантии BMW</span>
              </div>
            </div>
            <p className="text-xl text-primary font-bold bg-card/40 backdrop-blur-sm inline-block px-8 py-4 rounded-xl border border-primary/30 ambient-glow">
              🎁 При заказе сегодня — диагностика всех систем БЕСПЛАТНО (обычно 3000₽)
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="bg-card/60 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all duration-500 cursor-pointer group relative overflow-hidden leather-texture hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl flex items-center justify-center mb-6 border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-500 ambient-glow mx-auto">
                    <Icon name={service.icon as any} className="w-12 h-12 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground transition-all text-center">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base text-center">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className={`space-y-3 transition-all duration-500 ${selectedService === service.id ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <p className="text-sm font-bold text-primary mb-3">Возможности:</p>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm bg-card/40 p-2 rounded-lg border border-primary/10">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full border-2 border-primary/40 hover:bg-primary/10 hover:border-primary/60 text-foreground font-bold rounded-xl py-6"
                  >
                    <Icon name="ArrowRight" className="w-5 h-5 mr-2" />
                    {selectedService === service.id ? 'Скрыть детали' : 'Подробнее'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 electric-glow">
              МАКСИМАЛЬНАЯ ПРОИЗВОДИТЕЛЬНОСТЬ
            </h2>
            <p className="text-muted-foreground text-xl">
              Реальные показатели после нашего чип-тюнинга
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-20">
            <Card className="bg-card/60 backdrop-blur-xl border-primary/30 premium-shadow text-center p-10 relative overflow-hidden leather-texture hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-primary/40 ambient-glow">
                  <Icon name="Gauge" className="w-12 h-12 text-primary" />
                </div>
                <div className="text-7xl font-bold mb-3 bmw-gradient">
                  +80
                </div>
                <div className="text-3xl font-bold text-primary mb-3">Л.С.</div>
                <p className="text-muted-foreground text-lg leading-relaxed">Прирост мощности<br/>Stage 2</p>
              </div>
            </Card>

            <Card className="bg-card/60 backdrop-blur-xl border-accent/30 premium-shadow text-center p-10 relative overflow-hidden leather-texture hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-accent/40">
                  <Icon name="Zap" className="w-12 h-12 text-accent" />
                </div>
                <div className="text-7xl font-bold mb-3 gold-glow text-accent">
                  3.9
                </div>
                <div className="text-3xl font-bold text-accent mb-3">СЕК</div>
                <p className="text-muted-foreground text-lg leading-relaxed">Разгон 0-100 км/ч<br/>после тюнинга</p>
              </div>
            </Card>

            <Card className="bg-card/60 backdrop-blur-xl border-primary/30 premium-shadow text-center p-10 relative overflow-hidden leather-texture hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-primary/40 ambient-glow">
                  <Icon name="TrendingDown" className="w-12 h-12 text-primary" />
                </div>
                <div className="text-7xl font-bold mb-3 bmw-gradient">
                  -15%
                </div>
                <div className="text-3xl font-bold text-primary mb-3">РАСХОД</div>
                <p className="text-muted-foreground text-lg leading-relaxed">Снижение расхода<br/>топлива</p>
              </div>
            </Card>
          </div>

          <div 
            className="relative rounded-3xl overflow-hidden h-[500px] border-2 border-primary/40 ambient-glow"
            style={{
              backgroundImage: `url('https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/8d53ffc2-e332-4bea-b692-9aea8eeb44d0.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent backdrop-blur-md">
              <div className="h-full flex items-center px-10 md:px-20">
                <div className="max-w-2xl">
                  <div className="inline-block bg-primary/20 border border-primary/40 rounded-full px-6 py-2 mb-6 ambient-glow">
                    <p className="text-sm font-bold text-primary uppercase tracking-widest">G-SERIES TECHNOLOGY</p>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 electric-glow leading-tight">
                    ТЕХНОЛОГИИ BMW<br/>G-СЕРИИ
                  </h3>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Работаем с новейшими моделями BMW G-серии. Полная поддержка Live Cockpit, 
                    Curved Display и Operating System 8.0
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-card/60 backdrop-blur-sm p-4 rounded-xl border border-primary/30 leather-texture">
                      <Icon name="CheckCircle2" className="w-6 h-6 text-primary flex-shrink-0" />
                      <span className="font-bold">iDrive 8.0</span>
                    </div>
                    <div className="flex items-center gap-3 bg-card/60 backdrop-blur-sm p-4 rounded-xl border border-primary/30 leather-texture">
                      <Icon name="CheckCircle2" className="w-6 h-6 text-primary flex-shrink-0" />
                      <span className="font-bold">Live Cockpit</span>
                    </div>
                    <div className="flex items-center gap-3 bg-card/60 backdrop-blur-sm p-4 rounded-xl border border-accent/30 leather-texture">
                      <Icon name="CheckCircle2" className="w-6 h-6 text-accent flex-shrink-0" />
                      <span className="font-bold">Laser Light</span>
                    </div>
                    <div className="flex items-center gap-3 bg-card/60 backdrop-blur-sm p-4 rounded-xl border border-accent/30 leather-texture">
                      <Icon name="CheckCircle2" className="w-6 h-6 text-accent flex-shrink-0" />
                      <span className="font-bold">Curved Display</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-24">
          <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-primary/30 premium-shadow leather-texture relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary via-accent to-transparent" />
            <CardContent className="p-16 text-center">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 electric-glow">
                ГОТОВЫ МОДЕРНИЗИРОВАТЬ ВАШ BMW?
              </h3>
              <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                Свяжитесь с нами для консультации и записи на обслуживание. 
                Работаем со всеми моделями BMW G-серии.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary text-primary-foreground font-bold text-xl px-12 py-8 rounded-2xl shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all duration-300 ambient-glow hover:scale-105">
                  <Icon name="MessageCircle" className="w-6 h-6 mr-3" />
                  Написать в WhatsApp
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-primary/50 hover:bg-primary/10 hover:border-primary/80 text-foreground font-bold text-xl px-12 py-8 rounded-2xl transition-all duration-300 hover:scale-105">
                  <Icon name="Phone" className="w-6 h-6 mr-3" />
                  Позвонить
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="border-t border-primary/20 backdrop-blur-xl bg-card/40 mt-24 leather-texture relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="container mx-auto px-4 py-10 text-center">
            <p className="text-muted-foreground mb-4">© 2024 BMW Coding. Профессиональная работа с электроникой BMW G-серии</p>
            <div className="flex justify-center gap-8">
              <a href="#" className="text-primary hover:text-accent transition-colors">
                <Icon name="Instagram" className="w-6 h-6" />
              </a>
              <a href="#" className="text-primary hover:text-accent transition-colors">
                <Icon name="Youtube" className="w-6 h-6" />
              </a>
              <a href="#" className="text-primary hover:text-accent transition-colors">
                <Icon name="Mail" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
