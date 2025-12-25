import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const services = [
  {
    id: 'chiptuning',
    title: 'Чип-тюнинг',
    description: 'Увеличение мощности двигателя',
    icon: 'Zap',
    price: 'от 25 000 ₽'
  },
  {
    id: 'coding',
    title: 'Кодирование',
    description: 'Активация скрытых функций',
    icon: 'Code2',
    price: 'от 8 000 ₽'
  },
  {
    id: 'equipment',
    title: 'Дооснащение',
    description: 'Установка оборудования',
    icon: 'Cog',
    price: 'от 15 000 ₽'
  },
  {
    id: 'russian',
    title: 'Русификация',
    description: 'Полная локализация интерфейса',
    icon: 'Languages',
    price: 'от 12 000 ₽'
  },
  {
    id: 'maps',
    title: 'Навигация',
    description: 'Обновление карт и ПО',
    icon: 'Map',
    price: 'от 5 000 ₽'
  },
  {
    id: 'keys',
    title: 'Ключи',
    description: 'Изготовление ключей',
    icon: 'Key',
    price: 'от 18 000 ₽'
  }
];

const ambientModes = [
  { id: 'ice-blue', name: 'Ice Blue', color: '#0099FF', icon: 'Droplets' },
  { id: 'orange', name: 'Orange', color: '#FF7A3C', icon: 'Flame' },
  { id: 'purple', name: 'Purple', color: '#A564FF', icon: 'Sparkles' },
  { id: 'mint', name: 'Mint', color: '#64C8B4', icon: 'Leaf' },
  { id: 'red', name: 'Red', color: '#FF5050', icon: 'Flame' },
  { id: 'white', name: 'White', color: '#FFFFFF', icon: 'Circle' }
];

export default function Index() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [ambientColor, setAmbientColor] = useState('#0099FF');

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0f 50%, #000000 100%)'
      }}
    >
      {/* Ambient подсветка по краям */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 transition-all duration-1000"
        style={{
          background: `linear-gradient(90deg, transparent, ${ambientColor}80, transparent)`,
          boxShadow: `0 0 40px ${ambientColor}`
        }}
      />
      <div 
        className="fixed bottom-0 left-0 right-0 h-1 transition-all duration-1000"
        style={{
          background: `linear-gradient(90deg, transparent, ${ambientColor}80, transparent)`,
          boxShadow: `0 0 40px ${ambientColor}`
        }}
      />

      {/* Главный экран как Curved Display */}
      <div className="container mx-auto px-4 py-8 relative">
        
        {/* Верхняя панель как в BMW */}
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="flex items-center gap-4">
            <img 
              src="https://cdn.poehali.dev/files/reborn.jpg" 
              alt="Logo" 
              className="h-16 w-auto"
              style={{
                filter: `drop-shadow(0 0 20px ${ambientColor})`
              }}
            />
            <div>
              <h1 className="text-2xl font-light tracking-wider" style={{ color: ambientColor }}>BMW CODING</h1>
              <p className="text-xs text-gray-500 tracking-widest">G-SERIES</p>
            </div>
          </div>
          <Button 
            className="px-6 py-3 rounded-full font-medium transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${ambientColor}20, ${ambientColor}10)`,
              border: `1px solid ${ambientColor}40`,
              color: ambientColor,
              boxShadow: `0 0 20px ${ambientColor}40`
            }}
          >
            <Icon name="Phone" className="w-4 h-4 mr-2" />
            Связаться
          </Button>
        </div>

        {/* Ambient контроллер внизу */}
        <div 
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-full backdrop-blur-xl transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.95), rgba(15, 15, 20, 0.9))',
            border: `1px solid ${ambientColor}30`,
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.6), 0 0 40px ${ambientColor}20, inset 0 1px 0 rgba(255, 255, 255, 0.05)`
          }}
        >
          <div className="flex items-center gap-2">
            {ambientModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setAmbientColor(mode.color)}
                className="w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 relative"
                style={{
                  background: ambientColor === mode.color 
                    ? `radial-gradient(circle, ${mode.color}40, transparent)`
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${ambientColor === mode.color ? mode.color : 'rgba(255, 255, 255, 0.1)'}`,
                  boxShadow: ambientColor === mode.color ? `0 0 20px ${mode.color}80` : 'none'
                }}
              >
                <div 
                  className="absolute inset-1 rounded-full"
                  style={{
                    background: mode.color,
                    opacity: ambientColor === mode.color ? 0.8 : 0.3
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Заголовок как на iDrive */}
        <div className="text-center mb-12 mt-12">
          <h2 
            className="text-5xl md:text-7xl font-light tracking-tight mb-4 transition-all duration-1000"
            style={{
              color: ambientColor,
              textShadow: `0 0 40px ${ambientColor}60`
            }}
          >
            BMW G-SERIES
          </h2>
          <p className="text-gray-400 text-xl font-light tracking-wide">Профессиональное программирование и кодирование</p>
        </div>

        {/* Сетка услуг как плитки iDrive */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {services.map((service) => (
            <Card
              key={service.id}
              className="relative overflow-hidden cursor-pointer group transition-all duration-500 hover:scale-105"
              onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              style={{
                background: 'linear-gradient(135deg, rgba(15, 15, 20, 0.8), rgba(10, 10, 15, 0.9))',
                border: selectedService === service.id 
                  ? `2px solid ${ambientColor}` 
                  : '2px solid rgba(255, 255, 255, 0.05)',
                boxShadow: selectedService === service.id
                  ? `0 0 30px ${ambientColor}60, inset 0 0 30px ${ambientColor}10`
                  : '0 4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
              }}
            >
              <CardContent className="p-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${ambientColor}20, ${ambientColor}05)`,
                    border: `1px solid ${ambientColor}30`,
                    boxShadow: `0 0 20px ${ambientColor}20`
                  }}
                >
                  <Icon 
                    name={service.icon as any} 
                    className="w-8 h-8 transition-all duration-1000" 
                    style={{ color: ambientColor }}
                  />
                </div>
                <h3 className="text-xl font-medium mb-2 text-white">{service.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{service.description}</p>
                <p 
                  className="text-lg font-medium transition-all duration-1000"
                  style={{ color: ambientColor }}
                >
                  {service.price}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA блок */}
        <div 
          className="max-w-4xl mx-auto p-12 rounded-3xl text-center backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.8), rgba(15, 15, 20, 0.7))',
            border: `1px solid ${ambientColor}30`,
            boxShadow: `0 20px 60px rgba(0, 0, 0, 0.6), 0 0 60px ${ambientColor}20, inset 0 1px 0 rgba(255, 255, 255, 0.05)`
          }}
        >
          <h3 
            className="text-4xl md:text-5xl font-light mb-6 transition-all duration-1000"
            style={{
              color: ambientColor,
              textShadow: `0 0 30px ${ambientColor}60`
            }}
          >
            Модернизация BMW
          </h3>
          <p className="text-gray-400 text-lg mb-8 font-light">
            Активация скрытых функций • Чип-тюнинг • Русификация
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="px-10 py-6 rounded-full text-lg font-medium transition-all duration-300"
              style={{
                background: ambientColor,
                color: '#000',
                boxShadow: `0 0 40px ${ambientColor}60`
              }}
            >
              <Icon name="MessageCircle" className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>
            <Button 
              size="lg"
              className="px-10 py-6 rounded-full text-lg font-medium transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${ambientColor}20, ${ambientColor}10)`,
                border: `1px solid ${ambientColor}40`,
                color: ambientColor,
                boxShadow: `0 0 20px ${ambientColor}40`
              }}
            >
              <Icon name="Phone" className="w-5 h-5 mr-2" />
              Позвонить
            </Button>
          </div>
        </div>

        {/* Футер */}
        <footer className="mt-20 text-center pb-24">
          <p className="text-gray-600 text-sm mb-4">© 2024 BMW Coding • G-Series Specialist</p>
          <div className="flex justify-center gap-6">
            {['Instagram', 'Youtube', 'Mail'].map((social) => (
              <a 
                key={social}
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: ambientColor
                }}
              >
                <Icon name={social as any} className="w-5 h-5" />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
