import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface EngineVariant {
  code: string;
  powerBefore: number;
  powerAfter: number;
  torqueBefore: number;
  torqueAfter: number;
  priceFrom: number;
  priceTo: number;
  models: string[];
}

interface EngineGroup {
  name: string;
  type: 'petrol' | 'diesel' | 'hybrid';
  variants: EngineVariant[];
}

const engineGroups: EngineGroup[] = [
  {
    name: 'B48 2.0 Turbo',
    type: 'petrol',
    variants: [
      { 
        code: '184 л.с.', 
        powerBefore: 184, 
        powerAfter: 240, 
        torqueBefore: 290, 
        torqueAfter: 380, 
        priceFrom: 22500, 
        priceTo: 25000,
        models: ['318i', '320i', '520i', 'X3 20i', 'X1 20i']
      },
      { 
        code: '249-252 л.с.', 
        powerBefore: 252, 
        powerAfter: 320, 
        torqueBefore: 350, 
        torqueAfter: 450, 
        priceFrom: 25000, 
        priceTo: 28000,
        models: ['330i', '530i', 'X3 30i', 'X4 30i', '730i']
      }
    ]
  },
  {
    name: 'B58 3.0 Turbo',
    type: 'petrol',
    variants: [
      { 
        code: '340-360 л.с.', 
        powerBefore: 360, 
        powerAfter: 420, 
        torqueBefore: 500, 
        torqueAfter: 600, 
        priceFrom: 28000, 
        priceTo: 30000,
        models: ['340i', '540i', 'X3 M40i', 'X4 M40i', '740i', 'X5 40i', 'X6 40i']
      },
      { 
        code: '374-387 л.с.', 
        powerBefore: 387, 
        powerAfter: 450, 
        torqueBefore: 500, 
        torqueAfter: 620, 
        priceFrom: 28000, 
        priceTo: 32000,
        models: ['M340i', 'M340i xDrive']
      }
    ]
  },
  {
    name: 'S58 3.0 Twin-Turbo',
    type: 'petrol',
    variants: [
      { 
        code: '510-530 л.с.', 
        powerBefore: 530, 
        powerAfter: 600, 
        torqueBefore: 750, 
        torqueAfter: 850, 
        priceFrom: 30000, 
        priceTo: 35000,
        models: ['M550i', 'X5 M50i', 'X6 M50i', 'M750i', 'X7 M50i']
      }
    ]
  },
  {
    name: 'B47 2.0 Diesel',
    type: 'diesel',
    variants: [
      { 
        code: '150-190 л.с.', 
        powerBefore: 190, 
        powerAfter: 240, 
        torqueBefore: 400, 
        torqueAfter: 480, 
        priceFrom: 22500, 
        priceTo: 25000,
        models: ['318d', '320d', '520d', 'X3 20d', 'X5 25d']
      }
    ]
  },
  {
    name: 'B57 3.0 Diesel',
    type: 'diesel',
    variants: [
      { 
        code: '249-265 л.с.', 
        powerBefore: 265, 
        powerAfter: 330, 
        torqueBefore: 620, 
        torqueAfter: 720, 
        priceFrom: 25000, 
        priceTo: 28000,
        models: ['330d', '530d', 'X3 30d', 'X4 30d', 'X5 30d', '730d']
      },
      { 
        code: '286-320 л.с.', 
        powerBefore: 320, 
        powerAfter: 380, 
        torqueBefore: 680, 
        torqueAfter: 780, 
        priceFrom: 28000, 
        priceTo: 30000,
        models: ['530d MHEV', '730d MHEV', 'X3 30d MHEV']
      },
      { 
        code: '340 л.с.', 
        powerBefore: 340, 
        powerAfter: 400, 
        torqueBefore: 700, 
        torqueAfter: 800, 
        priceFrom: 28000, 
        priceTo: 30000,
        models: ['M340d', 'X3 M40d', 'X5 40d', 'X6 40d', '740d']
      },
      { 
        code: '400 л.с.', 
        powerBefore: 400, 
        powerAfter: 460, 
        torqueBefore: 760, 
        torqueAfter: 860, 
        priceFrom: 30000, 
        priceTo: 35000,
        models: ['M550d', 'X5 M50d', 'X6 M50d', 'X7 M50d', '750d']
      }
    ]
  },
  {
    name: 'Гибриды (eDrive)',
    type: 'hybrid',
    variants: [
      { 
        code: '292-394 л.с.', 
        powerBefore: 394, 
        powerAfter: 450, 
        torqueBefore: 600, 
        torqueAfter: 700, 
        priceFrom: 28000, 
        priceTo: 32000,
        models: ['330e', '530e', 'X3 30e', 'X5 45e', '745e']
      }
    ]
  }
];

export default function ChipTuning() {
  const [selectedGroup, setSelectedGroup] = useState<EngineGroup | null>(null);
  const [typeFilter, setTypeFilter] = useState<'all' | 'petrol' | 'diesel' | 'hybrid'>('all');

  const getGainPercentage = (before: number, after: number) => {
    return Math.round(((after - before) / before) * 100);
  };

  const filteredGroups = typeFilter === 'all' 
    ? engineGroups 
    : engineGroups.filter(g => g.type === typeFilter);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'petrol': return 'Flame';
      case 'diesel': return 'Fuel';
      case 'hybrid': return 'Leaf';
      default: return 'Zap';
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'petrol': return 'Бензин';
      case 'diesel': return 'Дизель';
      case 'hybrid': return 'Гибрид';
      default: return '';
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'petrol': return '#FFD700';
      case 'diesel': return '#81C4FF';
      case 'hybrid': return '#22C55E';
      default: return '#FFD700';
    }
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Icon name="Gauge" className="w-8 h-8 text-[#FFD700]" />
          <h2 className="font-light text-white text-3xl">Чип-тюнинг BMW по двигателям</h2>
        </div>
        <p className="text-white/60 text-sm">Выберите тип двигателя вашего автомобиля</p>
      </div>

      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 justify-center">
        {[
          { id: 'all', label: 'Все двигатели', icon: 'Grid' },
          { id: 'petrol', label: 'Бензиновые', icon: 'Flame' },
          { id: 'diesel', label: 'Дизельные', icon: 'Fuel' },
          { id: 'hybrid', label: 'Гибридные', icon: 'Leaf' }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setTypeFilter(filter.id as any)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 whitespace-nowrap"
            style={{
              background: typeFilter === filter.id
                ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
              border: typeFilter === filter.id
                ? '1px solid rgba(255, 215, 0, 0.5)'
                : '1px solid rgba(255, 255, 255, 0.1)',
              color: typeFilter === filter.id ? '#FFD700' : 'rgba(255, 255, 255, 0.6)',
              boxShadow: typeFilter === filter.id ? '0 8px 32px rgba(255, 215, 0, 0.2)' : 'none'
            }}
          >
            <Icon name={filter.icon as any} className="w-4 h-4" />
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      {!selectedGroup ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group, idx) => {
            const color = getTypeColor(group.type);
            const totalModels = group.variants.reduce((sum, v) => sum + v.models.length, 0);
            
            return (
              <button
                key={group.name}
                onClick={() => setSelectedGroup(group)}
                className="p-8 rounded-2xl transition-all duration-500 hover:scale-105 group text-left animate-fade-in"
                style={{
                  background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                  border: `1px solid ${color}40`,
                  boxShadow: `0 8px 32px ${color}25`,
                  animationDelay: `${idx * 100}ms`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-2xl font-light text-white mb-2 group-hover:text-[#FFD700] transition-colors duration-300">
                      {group.name}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name={getTypeIcon(group.type) as any} className="w-4 h-4" style={{ color }} />
                      <span className="text-sm" style={{ color }}>{getTypeLabel(group.type)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {group.variants.map((variant, i) => (
                    <div key={i} className="text-white/60 text-sm flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ background: color }} />
                      <span>{variant.code}</span>
                      <span className="text-white/40">→</span>
                      <span style={{ color }}>{variant.powerAfter} л.с.</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-white/40 text-xs pt-3 border-t" style={{ borderColor: `${color}20` }}>
                  <Icon name="Car" className="w-4 h-4" />
                  <span>Подходит для {totalModels} моделей</span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div 
                className="px-6 py-3 rounded-xl flex items-center gap-3"
                style={{
                  background: `linear-gradient(135deg, ${getTypeColor(selectedGroup.type)}, ${getTypeColor(selectedGroup.type)}CC)`,
                  boxShadow: `0 8px 32px ${getTypeColor(selectedGroup.type)}40`
                }}
              >
                <Icon name={getTypeIcon(selectedGroup.type) as any} className="w-5 h-5 text-black" />
                <span className="text-black font-medium">{selectedGroup.name}</span>
              </div>
              <button
                onClick={() => setSelectedGroup(null)}
                className="px-4 py-2 rounded-lg text-white/60 hover:text-white transition-colors text-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                Изменить двигатель
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedGroup.variants.map((variant, idx) => {
              const powerGain = getGainPercentage(variant.powerBefore, variant.powerAfter);
              const torqueGain = getGainPercentage(variant.torqueBefore, variant.torqueAfter);
              const color = getTypeColor(selectedGroup.type);
              
              return (
                <div
                  key={idx}
                  className="relative p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                  style={{
                    background: `linear-gradient(135deg, ${color}0D, ${color}05)`,
                    border: `1px solid ${color}30`,
                    boxShadow: `0 8px 32px ${color}20`,
                    animationDelay: `${idx * 50}ms`
                  }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-light text-white mb-2">{variant.code}</h3>
                      <div className="flex items-center gap-2">
                        <Icon name={getTypeIcon(selectedGroup.type) as any} className="w-4 h-4" style={{ color }} />
                        <span className="text-white/60 text-sm">{getTypeLabel(selectedGroup.type)}</span>
                      </div>
                    </div>
                    <div 
                      className="px-4 py-2 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))',
                        border: '1px solid rgba(34, 197, 94, 0.3)'
                      }}
                    >
                      <span className="text-green-400 text-sm font-medium">+{powerGain}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-white/40 text-xs mb-2 flex items-center gap-1">
                        <Icon name="Gauge" className="w-3 h-3" />
                        Мощность
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white/60 text-lg">{variant.powerBefore}</span>
                        <Icon name="ArrowRight" className="w-4 h-4" style={{ color }} />
                        <span className="text-2xl font-light" style={{ color }}>{variant.powerAfter}</span>
                        <span className="text-white/40 text-sm">л.с.</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-white/40 text-xs mb-2 flex items-center gap-1">
                        <Icon name="Zap" className="w-3 h-3" />
                        Крутящий момент
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white/60 text-lg">{variant.torqueBefore}</span>
                        <Icon name="ArrowRight" className="w-4 h-4" style={{ color }} />
                        <span className="text-2xl font-light" style={{ color }}>{variant.torqueAfter}</span>
                        <span className="text-white/40 text-sm">Нм</span>
                      </div>
                      <div 
                        className="mt-2 px-3 py-1 rounded-lg inline-block"
                        style={{
                          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05))',
                          border: '1px solid rgba(34, 197, 94, 0.2)'
                        }}
                      >
                        <span className="text-green-400 text-xs">+{torqueGain}%</span>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="mb-6 p-4 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                      border: `1px solid ${color}20`
                    }}
                  >
                    <div className="text-white/40 text-xs mb-2 flex items-center gap-1">
                      <Icon name="Car" className="w-3 h-3" />
                      Подходящие модели:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {variant.models.map((model, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 rounded-lg text-xs text-white/70"
                          style={{
                            background: `linear-gradient(135deg, ${color}15, ${color}08)`,
                            border: `1px solid ${color}25`
                          }}
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div 
                    className="pt-6 border-t flex items-center justify-between"
                    style={{ borderColor: `${color}20` }}
                  >
                    <div>
                      <div className="text-white/40 text-xs mb-1">Стоимость Stage 1</div>
                      <div className="text-xl font-light" style={{ color }}>
                        {variant.priceFrom.toLocaleString('ru-RU')} - {variant.priceTo.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                    <a
                      href="https://t.me/Bocha_reborn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-black transition-all duration-300 hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                        boxShadow: `0 8px 24px ${color}40`
                      }}
                    >
                      <Icon name="MessageCircle" className="w-4 h-4" />
                      <span>Заказать</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div 
            className="mt-8 p-6 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${getTypeColor(selectedGroup.type)}0D, ${getTypeColor(selectedGroup.type)}05)`,
              border: `1px solid ${getTypeColor(selectedGroup.type)}30`
            }}
          >
            <div className="flex items-start gap-4">
              <Icon name="Info" className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: getTypeColor(selectedGroup.type) }} />
              <div className="text-white/70 text-sm leading-relaxed">
                <p className="mb-2"><strong className="text-white">Процесс занимает 3 часа:</strong> диагностика, считывание заводской прошивки, коррекция параметров, запись улучшенной программы и тест-драйв.</p>
                <p>Работы проводятся через OBD-порт без вскрытия блока управления. Гарантия на все работы.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
