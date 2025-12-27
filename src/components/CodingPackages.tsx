import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Option {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  series: 'F' | 'G' | 'both';
}

const categories = [
  { id: 'comfort', name: 'Комфорт', icon: 'Armchair' },
  { id: 'multimedia', name: 'Мультимедиа', icon: 'Monitor' },
  { id: 'exterior', name: 'Внешний вид', icon: 'Sparkles' },
  { id: 'safety', name: 'Безопасность', icon: 'Shield' },
  { id: 'performance', name: 'Производительность', icon: 'Gauge' }
];

const options: Option[] = [
  // Внешний вид - F series (Осветительные приборы)
  { id: 'f_fog_flicker', name: 'Отключение мерцания туманок', category: 'exterior', description: 'Убирает эффект опроса ПТФ', icon: 'Lightbulb', series: 'F' },
  { id: 'f_strobe', name: 'Эффект стробоскопа', category: 'exterior', description: 'ПТФ отключаются при нажатии дальнего света', icon: 'Zap', series: 'F' },
  { id: 'f_fog_smooth', name: 'Плавное включение туманок', category: 'exterior', description: 'Мягкая активация ПТФ', icon: 'Sun', series: 'F' },
  { id: 'f_adaptive_fog', name: 'Адаптивное освещение ПТФ', category: 'exterior', description: 'Поворотные противотуманки', icon: 'Navigation', series: 'F' },
  { id: 'f_headlight_wash', name: 'Омыватель фар', category: 'exterior', description: 'Настройка работы омывателя', icon: 'Droplet', series: 'F' },
  { id: 'f_rings_bright', name: 'Яркость колец', category: 'exterior', description: 'Изменение яркости Angel Eyes', icon: 'Circle', series: 'F' },
  { id: 'f_drl_off', name: 'Отключение ДХО', category: 'exterior', description: 'Возможность выключить дневные огни', icon: 'SunOff', series: 'F' },
  { id: 'f_rear_drl', name: 'Задние габариты в ДХО', category: 'exterior', description: 'Задние фонари в режиме ДХО', icon: 'Lightbulb', series: 'F' },
  { id: 'f_rear_smooth', name: 'Плавное включение задних фонарей', category: 'exterior', description: 'Мягкая активация стоп-сигналов', icon: 'Sun', series: 'F' },
  
  // Производительность - F series (Режимы езды)
  { id: 'f_auto_handbrake', name: 'Авто снятие с ручника', category: 'performance', description: 'Автоматически на D и R', icon: 'Gauge', series: 'F' },
  { id: 'f_start_no_brake', name: 'Старт без педали тормоза', category: 'performance', description: 'Запуск двигателя без тормоза', icon: 'Power', series: 'F' },
  { id: 'f_speed_limit', name: 'Лимит скорости', category: 'performance', description: 'Ограничение максимальной скорости', icon: 'Gauge', series: 'F' },
  { id: 'f_autostop', name: 'Отключение Start/Stop', category: 'performance', description: 'Деактивация системы Старт/Стоп', icon: 'Power', series: 'F' },
  { id: 'f_launch', name: 'Launch Control', category: 'performance', description: 'Активация Лаунч-контроля', icon: 'Rocket', series: 'F' },
  { id: 'f_sport_mode', name: 'Настройка режима Спорт', category: 'performance', description: 'Кастомизация Sport режима', icon: 'Gauge', series: 'F' },
  { id: 'f_coasting', name: 'Режим наката', category: 'performance', description: 'Движение накатом без торможения', icon: 'Wind', series: 'F' },
  
  // Мультимедиа - F series (Панель приборов и Бортовой компьютер)
  { id: 'f_digital_speed', name: 'Цифровой спидометр', category: 'multimedia', description: 'Отображение скорости цифрами', icon: 'Gauge', series: 'F' },
  { id: 'f_color_change', name: 'Цвет панели день/ночь', category: 'multimedia', description: 'Изменение цвета приборов', icon: 'Palette', series: 'F' },
  { id: 'f_auto_brightness', name: 'Авто подсветка без датчика', category: 'multimedia', description: 'Автопереключение без датчика света', icon: 'Sun', series: 'F' },
  { id: 'f_consumption_limit', name: 'Ограничение расхода', category: 'multimedia', description: 'Изменение шкалы расхода', icon: 'Fuel', series: 'F' },
  { id: 'f_remove_ed', name: 'Убрать EfficientDynamics', category: 'multimedia', description: 'Удаление надписи ED', icon: 'X', series: 'F' },
  { id: 'f_m_logo', name: 'Лого M-Performance', category: 'multimedia', description: 'M-лого на приборной панели', icon: 'Star', series: 'F' },
  { id: 'f_video', name: 'Видео в движении', category: 'multimedia', description: 'Просмотр видео на ходу', icon: 'Play', series: 'F' },
  { id: 'f_codecs', name: 'Активация кодеков', category: 'multimedia', description: 'Дополнительные форматы видео', icon: 'FileVideo', series: 'F' },
  { id: 'f_media_off', name: 'Отключение медиа после двери', category: 'multimedia', description: 'Авто выключение при открытии', icon: 'DoorOpen', series: 'F' },
  { id: 'f_phone_sound', name: 'Телефонный звонок COMBOX', category: 'multimedia', description: 'Трансляция звонков через авто', icon: 'Phone', series: 'F' },
  { id: 'f_sport_indicators', name: 'Спортивные индикаторы', category: 'multimedia', description: 'Дополнительные показатели', icon: 'Activity', series: 'F' },
  { id: 'f_tpms_data', name: 'Данные TPMS', category: 'multimedia', description: 'Информация о давлении в шинах', icon: 'Gauge', series: 'F' },
  { id: 'f_usb_video', name: 'Видео с USB', category: 'multimedia', description: 'Воспроизведение с флешки', icon: 'Usb', series: 'F' },
  { id: 'f_towbar_cam', name: 'Камера в режим фаркопа', category: 'multimedia', description: 'Установка камеры фаркопа', icon: 'Camera', series: 'F' },
  { id: 'f_units', name: 'Единицы измерения', category: 'multimedia', description: 'Изменение единиц (км, мили)', icon: 'Ruler', series: 'F' },
  { id: 'f_comfort_open', name: 'Комфортное открытие', category: 'multimedia', description: 'Настройка опций открытия', icon: 'DoorOpen', series: 'F' },
  { id: 'f_service_history', name: 'Сервисная история', category: 'multimedia', description: 'Отображение истории ТО', icon: 'History', series: 'F' },
  { id: 'f_radio_off', name: 'Отключение SDARS', category: 'multimedia', description: 'Деактивация спутникового радио', icon: 'RadioOff', series: 'F' },
  { id: 'f_ed_menu', name: 'Меню EfficientDynamics', category: 'multimedia', description: 'Информативное меню ED', icon: 'Menu', series: 'F' },
  { id: 'f_dev_menu', name: 'Меню разработчика', category: 'multimedia', description: 'Доступ к скрытому меню', icon: 'Code', series: 'F' },
  { id: 'f_hifi', name: 'Stereo в Hi-Fi', category: 'multimedia', description: 'Улучшение звука головного устройства', icon: 'Music', series: 'F' },
  { id: 'f_xdrive_display', name: 'Состояние xDrive', category: 'multimedia', description: 'Наклон и компас на экране', icon: 'Compass', series: 'F' },
  { id: 'f_volume_bar', name: 'Полоска громкости', category: 'multimedia', description: 'Визуализация уровня звука', icon: 'Volume2', series: 'F' },
  { id: 'f_connected', name: 'ConnectedDrive', category: 'multimedia', description: 'Включение сервисов CD', icon: 'Wifi', series: 'F' },
  { id: 'f_logo_change', name: 'Изменение эмблемы запуска', category: 'multimedia', description: 'Кастомный логотип при старте', icon: 'Image', series: 'F' },
  { id: 'f_radio_time', name: 'Время отключения магнитолы', category: 'multimedia', description: 'Задержка выключения после зажигания', icon: 'Clock', series: 'F' },
  
  // Безопасность - F series
  { id: 'f_autolock', name: 'Автозакрытие авто', category: 'safety', description: 'Если не открывались двери', icon: 'Lock', series: 'F' },
  { id: 'f_alarm_key', name: 'Сигнализация при мех. ключе', category: 'safety', description: 'Включение при открытии ключом', icon: 'Key', series: 'F' },
  { id: 'f_no_belt_gong', name: 'Отключение гонга ремня', category: 'safety', description: 'Без звука при заводе без ремня', icon: 'UserCheck', series: 'F' },
  { id: 'f_horn_signal', name: 'Звук при постановке на охрану', category: 'safety', description: 'Управление звуковым сигналом', icon: 'Volume2', series: 'F' },
  
  // Комфорт - F series (Багажник, Кузов, Салон)
  { id: 'f_trunk_delay', name: 'Задержка открытия багажника', category: 'comfort', description: 'Настройка времени открытия', icon: 'Package', series: 'F' },
  { id: 'f_trunk_close', name: 'Закрытие багажника с ключа', category: 'comfort', description: 'Удаленное закрытие', icon: 'Package', series: 'F' },
  { id: 'f_trunk_smooth_close', name: 'Плавное закрытие багажника', category: 'comfort', description: 'Без удара при закрытии', icon: 'Package', series: 'F' },
  { id: 'f_trunk_smooth_open', name: 'Плавное открытие багажника', category: 'comfort', description: 'Без удара при открытии', icon: 'Package', series: 'F' },
  { id: 'f_mirror_tilt', name: 'Наклон зеркала назад', category: 'comfort', description: 'При движении задним ходом', icon: 'Maximize2', series: 'F' },
  { id: 'f_mirror_dimming', name: 'Чувствительность затемнения', category: 'comfort', description: 'Более чувствительный датчик', icon: 'Sun', series: 'F' },
  { id: 'f_mirror_heat', name: 'Обогрев зеркал и дворников', category: 'comfort', description: 'Активация подогрева', icon: 'Thermometer', series: 'F' },
  { id: 'f_mirror_heat_delay', name: 'Убрать задержку подогрева', category: 'comfort', description: 'Мгновенный подогрев зеркал', icon: 'Zap', series: 'F' },
  { id: 'f_wheel_size', name: 'Размер колес', category: 'comfort', description: 'Настройка размерности дисков', icon: 'Circle', series: 'F' },
  { id: 'f_window_delay', name: 'Задержка окон с ключа', category: 'comfort', description: 'Открытие/закрытие с брелка', icon: 'Key', series: 'F' },
  { id: 'f_blinker_count', name: 'Количество миганий поворотника', category: 'comfort', description: 'При касании рычага', icon: 'Navigation', series: 'F' },
  { id: 'f_handle_light', name: 'Подсветка ручек при R', category: 'comfort', description: 'При включении задней передачи', icon: 'Lightbulb', series: 'F' },
  { id: 'f_easy_entry', name: 'Комфортная посадка', category: 'comfort', description: 'Отъезжает руль и кресло', icon: 'Armchair', series: 'F' },
  { id: 'f_air_sensor', name: 'Датчик грязного воздуха', category: 'comfort', description: 'Высокая чувствительность рециркуляции', icon: 'Wind', series: 'F' },
  { id: 'f_light_sensor', name: 'Датчик света менее чувствительный', category: 'comfort', description: 'Настройка датчика освещения', icon: 'Sun', series: 'F' },
  { id: 'f_seat_heat_memory', name: 'Память подогрева сидений', category: 'comfort', description: 'Время запоминания после выключения', icon: 'Thermometer', series: 'F' },
  { id: 'f_wheel_heat_memory', name: 'Память подогрева руля', category: 'comfort', description: 'Время запоминания после выключения', icon: 'Thermometer', series: 'F' },
  { id: 'f_auto_no_ac', name: 'AUTO без кондиционера', category: 'comfort', description: 'Кнопка AUTO не включает AC', icon: 'Wind', series: 'F' },
  { id: 'f_recirculation_memory', name: 'Память рециркуляции', category: 'comfort', description: 'Запоминание положения режима', icon: 'RotateCcw', series: 'F' },
  { id: 'f_gong_sound', name: 'Звук гонга двери', category: 'comfort', description: 'Изменение звука открытой двери и ошибок', icon: 'Volume2', series: 'F' },
  { id: 'f_brightness_wheel', name: 'Колесико яркости салона', category: 'comfort', description: 'Не меняет яркость подсветки салона', icon: 'Sun', series: 'F' },
  { id: 'f_seat_memory_sound', name: 'Звук запоминания кресла', category: 'comfort', description: 'Сигнал после сохранения положения', icon: 'Volume2', series: 'F' },
  { id: 'f_battery_warning', name: 'Напоминание о разряде АКБ', category: 'comfort', description: 'Убрать предупреждение на стоянке', icon: 'Battery', series: 'F' },
  { id: 'f_recuperation', name: 'Отключить рекуперацию ED', category: 'comfort', description: 'Постоянная зарядка аккумулятора', icon: 'BatteryCharging', series: 'F' },
  { id: 'f_emergency_brake', name: 'Аварийка при торможении', category: 'comfort', description: 'Отключение при резком торможении', icon: 'AlertTriangle', series: 'F' },
  { id: 'f_battery_min', name: 'Минимальный заряд АКБ', category: 'comfort', description: 'Увеличение минимального заряда', icon: 'Battery', series: 'F' },
  { id: 'f_brake_system', name: 'Данные тормозной системы', category: 'comfort', description: 'Изменение информации о тормозах', icon: 'Disc', series: 'F' },
  
  // Комфорт - G series
  { id: 'g_autostop', name: 'Отключение Start/Stop', category: 'comfort', description: 'Полное отключение системы автостарта', icon: 'Power', series: 'G' },
  { id: 'g_mirrors', name: 'Сворачивание зеркал', category: 'comfort', description: 'Автоматическое складывание по брелку', icon: 'Maximize2', series: 'G' },
  { id: 'g_seatbelt', name: 'Настройка ремней безопасности', category: 'comfort', description: 'Отключение звуковых сигналов', icon: 'UserCheck', series: 'G' },
  { id: 'g_eco', name: 'Отключение ECO режима', category: 'comfort', description: 'Деактивация экономичного режима', icon: 'Leaf', series: 'G' },
  { id: 'g_gesture', name: 'Управление жестами', category: 'comfort', description: 'Активация управления жестами', icon: 'Hand', series: 'G' },

  // Мультимедиа - G series
  { id: 'g_carplay', name: 'Apple CarPlay', category: 'multimedia', description: 'Активация CarPlay', icon: 'Smartphone', series: 'G' },
  { id: 'g_video', name: 'Видео в движении', category: 'multimedia', description: 'Просмотр видео на ходу', icon: 'Play', series: 'G' },
  { id: 'g_youtube', name: 'YouTube / Spotify', category: 'multimedia', description: 'Активация стриминга', icon: 'Music', series: 'G' },
  { id: 'g_fullscreen', name: 'Полноэкранный режим', category: 'multimedia', description: 'Увеличение области отображения', icon: 'Maximize', series: 'G' },
  { id: 'g_android', name: 'Android Auto', category: 'multimedia', description: 'Активация Android Auto', icon: 'Smartphone', series: 'G' },
  
  // Внешний вид - G series
  { id: 'g_drl', name: 'Режимы DRL', category: 'exterior', description: 'Различные режимы дневных огней', icon: 'Sun', series: 'G' },
  { id: 'g_welcome_anim', name: 'Приветственная анимация', category: 'exterior', description: 'Световое шоу при открытии', icon: 'Star', series: 'G' },
  { id: 'g_laser', name: 'Лазерный свет', category: 'exterior', description: 'Активация лазерных фар', icon: 'Zap', series: 'G' },
  { id: 'g_ambient', name: 'Ambient свет расширенный', category: 'exterior', description: 'Дополнительные режимы подсветки', icon: 'Lightbulb', series: 'G' },
  
  // Безопасность - G series
  { id: 'g_speed', name: 'Снятие ограничения скорости', category: 'safety', description: 'Увеличение до 280 км/ч', icon: 'Gauge', series: 'G' },
  { id: 'g_camera', name: 'Камеры на ходу', category: 'safety', description: 'Просмотр камер в движении', icon: 'Camera', series: 'G' },
  { id: 'g_parking', name: 'Parking Assistant Plus', category: 'safety', description: 'Активация автопарковки', icon: 'Navigation2', series: 'G' },
  { id: 'g_tpms', name: 'Настройка TPMS', category: 'safety', description: 'Калибровка датчиков давления', icon: 'Activity', series: 'G' },
  
  // Производительность - G series
  { id: 'g_sport', name: 'Sport режим по умолчанию', category: 'performance', description: 'Запуск всегда в Sport', icon: 'Gauge', series: 'G' },
  { id: 'g_xdrive', name: 'Настройка xDrive', category: 'performance', description: 'Калибровка полного привода', icon: 'Settings2', series: 'G' },
  { id: 'g_dsc', name: 'Полное отключение DSC', category: 'performance', description: 'Деактивация стабилизации', icon: 'RotateCcw', series: 'G' },
  { id: 'g_exhaust', name: 'Выхлоп активный', category: 'performance', description: 'Постоянный спортивный звук', icon: 'Volume2', series: 'G' },
];

// Функция расчёта цены со скидкой
const calculatePrice = (count: number): { total: number; discount: number; original: number } => {
  if (count === 0) return { total: 0, discount: 0, original: 0 };
  
  const pricePerOption = 1500;
  let total = 0;
  let discount = 0;
  
  if (count === 1) {
    total = 1500;
  } else if (count === 2) {
    total = 3000;
  } else if (count === 3) {
    total = 3500;
  } else if (count >= 4 && count <= 5) {
    // 4-5 опций: скидка 25%
    const original = count * pricePerOption;
    discount = 25;
    total = Math.round(original * 0.75);
  } else if (count >= 6 && count <= 9) {
    // 6-9 опций: скидка 30%
    const original = count * pricePerOption;
    discount = 30;
    total = Math.round(original * 0.70);
  } else if (count >= 10) {
    // 10+ опций: скидка 35%
    const original = count * pricePerOption;
    discount = 35;
    total = Math.round(original * 0.65);
  }
  
  const original = count * pricePerOption;
  return { total, discount, original };
};

export default function CodingPackages() {
  const [selectedSeries, setSelectedSeries] = useState<'F' | 'G' | null>(null);
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

  const filteredOptions = selectedSeries 
    ? options.filter(o => o.category === activeCategory && (o.series === selectedSeries || o.series === 'both'))
    : [];

  const selectedCount = selectedOptions.size;
  const pricing = calculatePrice(selectedCount);

  const handleSendConfig = () => {
    const selectedItems = Array.from(selectedOptions)
      .map(id => options.find(o => o.id === id))
      .filter(Boolean)
      .map(o => `• ${o!.name}`)
      .join('\n');
    
    let message = `Конфигурация опций BMW ${selectedSeries}-series:\n\n${selectedItems}\n\n`;
    message += `Количество опций: ${selectedCount}\n`;
    if (pricing.discount > 0) {
      message += `Скидка: ${pricing.discount}%\n`;
      message += `Было: ${pricing.original.toLocaleString('ru-RU')} ₽\n`;
    }
    message += `Итого: ${pricing.total.toLocaleString('ru-RU')} ₽`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/Bocha_reborn?text=${encodedMessage}`, '_blank');
  };

  const handleSeriesChange = (series: 'F' | 'G') => {
    setSelectedSeries(series);
    setSelectedOptions(new Set());
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Icon name="Wrench" className="w-8 h-8 text-[#81C4FF]" />
          <h2 className="font-light text-white text-3xl">Конфигуратор опций BMW</h2>
        </div>
        <p className="text-white/60 text-sm">Выберите серию и соберите свой пакет кодировок</p>
      </div>

      {/* Выбор серии */}
      {!selectedSeries ? (
        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="text-white text-xl font-light mb-6 text-center">Выберите серию вашего BMW</h3>
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => handleSeriesChange('F')}
              className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 group"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div className="text-6xl font-light text-white mb-4 group-hover:text-[#81C4FF] transition-colors">F</div>
              <div className="text-white/60 text-sm">F-series</div>
              <div className="text-white/40 text-xs mt-2">2011-2019</div>
            </button>

            <button
              onClick={() => handleSeriesChange('G')}
              className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 group"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div className="text-6xl font-light text-white mb-4 group-hover:text-[#81C4FF] transition-colors">G</div>
              <div className="text-white/60 text-sm">G-series</div>
              <div className="text-white/40 text-xs mt-2">2019+</div>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Выбранная серия */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div 
              className="px-6 py-3 rounded-xl flex items-center gap-3"
              style={{
                background: 'linear-gradient(135deg, #81C4FF, #16588E)',
                boxShadow: '0 8px 32px rgba(129, 196, 255, 0.3)'
              }}
            >
              <span className="text-white font-medium">BMW {selectedSeries}-series</span>
            </div>
            <button
              onClick={() => {
                setSelectedSeries(null);
                setSelectedOptions(new Set());
              }}
              className="px-4 py-2 rounded-lg text-white/60 hover:text-white transition-colors text-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              Изменить серию
            </button>
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
                      className="w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0"
                      style={{
                        borderColor: isSelected ? '#81C4FF' : 'rgba(255, 255, 255, 0.2)',
                        background: isSelected ? '#81C4FF' : 'transparent'
                      }}
                    >
                      {isSelected && <Icon name="Check" className="w-4 h-4 text-black" />}
                    </div>
                  </div>

                  <p className="text-white/50 text-sm">{option.description}</p>
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
                  <div className="text-white/60 text-sm mb-1">
                    {pricing.discount > 0 ? (
                      <span className="flex items-center gap-2">
                        Скидка <span className="text-[#81C4FF] font-medium">{pricing.discount}%</span>
                      </span>
                    ) : (
                      'Итоговая стоимость'
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {pricing.discount > 0 && (
                      <span className="text-white/40 text-lg line-through">
                        {pricing.original.toLocaleString('ru-RU')} ₽
                      </span>
                    )}
                    <span className="text-[#81C4FF] text-2xl font-light">
                      {pricing.total.toLocaleString('ru-RU')} ₽
                    </span>
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
        </>
      )}

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
          <span>Полный список опций F-series</span>
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
          <span>Полный список опций G-series</span>
        </a>
      </div>
    </div>
  );
}