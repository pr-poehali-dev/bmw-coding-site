import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Option {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  icon: string;
  popular?: boolean;
}

const categories = [
  { id: 'comfort', name: 'Комфорт', icon: 'Armchair' },
  { id: 'multimedia', name: 'Мультимедиа', icon: 'Monitor' },
  { id: 'exterior', name: 'Внешний вид', icon: 'Sparkles' },
  { id: 'safety', name: 'Безопасность', icon: 'Shield' },
  { id: 'performance', name: 'Производительность', icon: 'Gauge' }
];

const options: Option[] = [
  // Комфорт
  { id: 'autostop', name: 'Отключение Start/Stop', category: 'comfort', price: 500, description: 'Полное отключение системы автостарта', icon: 'Power', popular: true },
  { id: 'mirrors', name: 'Сворачивание зеркал', category: 'comfort', price: 300, description: 'Автоматическое складывание по брелку', icon: 'Maximize2' },
  { id: 'seatbelt', name: 'Настройка ремней', category: 'comfort', price: 200, description: 'Отключение напоминаний о ремнях', icon: 'UserCheck' },
  { id: 'eco', name: 'Отключение ECO режима', category: 'comfort', price: 300, description: 'Деактивация экономичного режима', icon: 'Leaf' },
  { id: 'welcome', name: 'Welcome Light', category: 'comfort', price: 400, description: 'Подсветка при приближении к авто', icon: 'Lightbulb' },
  
  // Мультимедиа
  { id: 'carplay', name: 'Apple CarPlay', category: 'multimedia', price: 0, description: 'Активация бесплатно', icon: 'Smartphone', popular: true },
  { id: 'video', name: 'Видео в движении', category: 'multimedia', price: 800, description: 'Просмотр видео на ходу', icon: 'Play' },
  { id: 'youtube', name: 'YouTube / Spotify', category: 'multimedia', price: 600, description: 'Активация стриминговых сервисов', icon: 'Music' },
  { id: 'fullscreen', name: 'Полноэкранный режим', category: 'multimedia', price: 500, description: 'Увеличение области отображения', icon: 'Maximize' },
  { id: 'logo', name: 'Смена логотипа', category: 'multimedia', price: 400, description: 'Кастомный загрузочный экран', icon: 'Image' },
  
  // Внешний вид
  { id: 'drl', name: 'Режимы DRL', category: 'exterior', price: 600, description: 'Различные режимы дневных огней', icon: 'Sun' },
  { id: 'cornering', name: 'Подсветка поворотов', category: 'exterior', price: 500, description: 'Активация противотуманок в поворотах', icon: 'Navigation' },
  { id: 'welcome-light', name: 'Приветственный свет', category: 'exterior', price: 700, description: 'Анимация оптики при открытии', icon: 'Star' },
  { id: 'needle', name: 'Цвет стрелок приборов', category: 'exterior', price: 300, description: 'Изменение подсветки приборной панели', icon: 'Palette' },
  
  // Безопасность
  { id: 'speed', name: 'Снятие ограничения скорости', category: 'safety', price: 1000, description: 'Увеличение лимита до 280 км/ч', icon: 'Zap' },
  { id: 'parkassist', name: 'Видео с камер на ходу', category: 'safety', price: 800, description: 'Просмотр камер парковки в движении', icon: 'Camera' },
  { id: 'tpms', name: 'Настройка TPMS', category: 'safety', price: 400, description: 'Калибровка датчиков давления', icon: 'Activity' },
  
  // Производительность
  { id: 'sport', name: 'Спорт режим по умолчанию', category: 'performance', price: 500, description: 'Запуск всегда в Sport режиме', icon: 'Gauge' },
  { id: 'xdrive', name: 'Настройка xDrive', category: 'performance', price: 800, description: 'Калибровка полного привода', icon: 'Settings2' },
  { id: 'dsc', name: 'Полное отключение DSC', category: 'performance', price: 600, description: 'Деактивация системы стабилизации', icon: 'RotateCcw' },
];

export default function CodingPackages() {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('comfort');

  const toggleOption = (optionId: string) => {
    const newSelected = new Set(selectedOptions);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }
    setSelectedOptions(newSelected);
  };

  const totalPrice = Array.from(selectedOptions).reduce((sum, optionId) => {
    const option = options.find(o => o.id === optionId);
    return sum + (option?.price || 0);
  }, 0);

  const filteredOptions = options.filter(o => o.category === activeCategory);
  const selectedCount = selectedOptions.size;

  const handleSendConfig = () => {
    const selectedItems = Array.from(selectedOptions)
      .map(id => options.find(o => o.id === id))
      .filter(Boolean)
      .map(o => `• ${o!.name} - ${o!.price}₽`)
      .join('\n');
    
    const message = `Конфигурация опций BMW:\n\n${selectedItems}\n\nИтого: ${totalPrice.toLocaleString('ru-RU')} ₽`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/Bocha_reborn?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Icon name="Wrench" className="w-8 h-8 text-[#81C4FF]" />
          <h2 className="font-light text-white text-3xl">Конфигуратор опций BMW G-series</h2>
        </div>
        <p className="text-white/60 text-sm">Выберите нужные опции и соберите свой пакет кодировок</p>
      </div>

      {/* Категории */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105 whitespace-nowrap"
            style={{
              background: activeCategory === cat.id
                ? 'linear-gradient(135deg, #81C4FF, #16588E)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
              border: activeCategory === cat.id
                ? '1px solid rgba(129, 196, 255, 0.5)'
                : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: activeCategory === cat.id
                ? '0 8px 32px rgba(129, 196, 255, 0.3)'
                : 'none'
            }}
          >
            <Icon name={cat.icon as any} className="w-5 h-5" />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Опции */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredOptions.map((option) => {
          const isSelected = selectedOptions.has(option.id);
          return (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              className="relative p-6 rounded-xl transition-all duration-300 text-left group"
              style={{
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(129, 196, 255, 0.15), rgba(22, 88, 142, 0.15))'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                border: isSelected
                  ? '2px solid rgba(129, 196, 255, 0.5)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isSelected
                  ? '0 8px 32px rgba(129, 196, 255, 0.2)'
                  : 'none'
              }}
            >
              {option.popular && (
                <div 
                  className="absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    color: '#000'
                  }}
                >
                  Популярно
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(129, 196, 255, 0.3), rgba(22, 88, 142, 0.2))'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                      border: '1px solid rgba(129, 196, 255, 0.2)'
                    }}
                  >
                    <Icon 
                      name={option.icon as any} 
                      className="w-5 h-5"
                      style={{ color: isSelected ? '#81C4FF' : 'rgba(255, 255, 255, 0.6)' }}
                    />
                  </div>
                  <div>
                    <h3 
                      className="font-medium text-base mb-1"
                      style={{ color: isSelected ? '#81C4FF' : '#fff' }}
                    >
                      {option.name}
                    </h3>
                  </div>
                </div>
                
                <div 
                  className="w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all"
                  style={{
                    borderColor: isSelected ? '#81C4FF' : 'rgba(255, 255, 255, 0.2)',
                    background: isSelected ? '#81C4FF' : 'transparent'
                  }}
                >
                  {isSelected && <Icon name="Check" className="w-4 h-4 text-black" />}
                </div>
              </div>

              <p className="text-white/50 text-sm mb-3">{option.description}</p>

              <div 
                className="text-xl font-light"
                style={{ color: isSelected ? '#81C4FF' : 'rgba(255, 255, 255, 0.7)' }}
              >
                {option.price === 0 ? 'Бесплатно' : `${option.price.toLocaleString('ru-RU')} ₽`}
              </div>
            </button>
          );
        })}
      </div>

      {/* Итоговая панель */}
      <div 
        className="sticky bottom-6 rounded-2xl p-6 backdrop-blur-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(129, 196, 255, 0.15), rgba(22, 88, 142, 0.15))',
          border: '1px solid rgba(129, 196, 255, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <div>
              <div className="text-white/60 text-sm mb-1">Выбрано опций</div>
              <div className="text-white text-2xl font-light">{selectedCount}</div>
            </div>
            <div 
              className="h-12 w-px"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(129, 196, 255, 0.3), transparent)' }}
            />
            <div>
              <div className="text-white/60 text-sm mb-1">Итоговая стоимость</div>
              <div className="text-[#81C4FF] text-2xl font-light">
                {totalPrice.toLocaleString('ru-RU')} ₽
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setSelectedOptions(new Set())}
              disabled={selectedCount === 0}
              className="px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              Сбросить
            </button>
            <button
              onClick={handleSendConfig}
              disabled={selectedCount === 0}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: selectedCount > 0
                  ? 'linear-gradient(135deg, #81C4FF, #16588E)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                border: '1px solid rgba(129, 196, 255, 0.3)',
                boxShadow: selectedCount > 0 ? '0 10px 40px rgba(129, 196, 255, 0.4)' : 'none'
              }}
            >
              <Icon name="Send" className="w-5 h-5" />
              <span>Отправить конфигурацию</span>
            </button>
          </div>
        </div>
      </div>

      {/* Кнопки скачивания */}
      <div className="flex justify-center gap-4 mt-8">
        <a
          href="https://disk.yandex.ru/i/UmJoVZEGPbNOPw"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(129, 196, 255, 0.1), rgba(22, 88, 142, 0.1))',
            border: '1px solid rgba(129, 196, 255, 0.3)',
            boxShadow: '0 4px 20px rgba(129, 196, 255, 0.2)'
          }}
        >
          <Icon name="Download" className="w-5 h-5" />
          <span>Кодировки F-series</span>
        </a>

        <a
          href="https://disk.yandex.ru/i/Nd0Xi_oEIpiw4g"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(129, 196, 255, 0.1), rgba(22, 88, 142, 0.1))',
            border: '1px solid rgba(129, 196, 255, 0.3)',
            boxShadow: '0 4px 20px rgba(129, 196, 255, 0.2)'
          }}
        >
          <Icon name="Download" className="w-5 h-5" />
          <span>Кодировки G-series</span>
        </a>
      </div>
    </div>
  );
}
