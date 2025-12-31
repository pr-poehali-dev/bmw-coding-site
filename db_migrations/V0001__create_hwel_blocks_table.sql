-- Создание таблицы для HWEL блоков BMW
CREATE TABLE IF NOT EXISTS hwel_blocks (
    id SERIAL PRIMARY KEY,
    hwel_code VARCHAR(10) NOT NULL,
    block_name VARCHAR(100) NOT NULL,
    description TEXT,
    vehicle_series VARCHAR(50),
    year_from INTEGER,
    year_to INTEGER,
    features JSONB,
    upgrade_options JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(hwel_code, vehicle_series)
);

-- Индексы для быстрого поиска
CREATE INDEX idx_hwel_vehicle ON hwel_blocks(vehicle_series, year_from, year_to);
CREATE INDEX idx_hwel_code ON hwel_blocks(hwel_code);

-- Заполнение базовых данных по популярным HWEL блокам NBT/NBT Evo
INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options) VALUES
('26B9', 'NBT Evo', 'Мультимедийная система NBT Evolution с расширенными возможностями', '3-Series', 2015, 2020, 
 '{"video_motion": true, "fullscreen_camera": true, "sport_displays": true, "split_screen": true}', 
 '{"carplay": "Апгрейд до 26BB для CarPlay", "hud": "Совместим с Head-Up Display"}'),

('26BA', 'NBT Evo High', 'Улучшенная версия NBT Evo с поддержкой большего экрана', '5-Series', 2014, 2020,
 '{"video_motion": true, "fullscreen_camera": true, "sport_displays": true, "navigation_plus": true}',
 '{"carplay": "Апгрейд до 26BB для беспроводного CarPlay"}'),

('26BB', 'NBT Evo ID6', 'NBT Evo с поддержкой Apple CarPlay и Android Auto', '3-Series', 2017, 2021,
 '{"carplay": true, "android_auto": true, "video_motion": true, "fullscreen_camera": true, "sport_displays": true}',
 '{"wireless_charging": "Совместим с беспроводной зарядкой"}'),

('26BC', 'NBT Evo ID6+', 'Топовая версия NBT Evo с беспроводным CarPlay', '5-Series', 2018, 2021,
 '{"carplay_wireless": true, "android_auto": true, "video_motion": true, "gesture_control": true, "hud": true}',
 '{"premium_sound": "Совместим с Harman Kardon"}'),

('26F0', 'MGU High', 'Мультимедийная система с Head-Up Display', '7-Series', 2015, 2020,
 '{"hud": true, "navigation": true, "premium_audio": true}',
 '{"carplay": "Возможен апгрейд до ID6"}'),

('26F1', 'MGU ID6', 'MGU с поддержкой CarPlay и расширенным HUD', '7-Series', 2017, 2021,
 '{"hud": true, "carplay": true, "android_auto": true, "gesture_control": true}',
 '{}'),

('263A', 'CIC High', 'Старая система CIC для моделей до 2013 года', '3-Series', 2009, 2013,
 '{"basic_navigation": true, "bluetooth": true}',
 '{"retrofit_nbt": "Возможна установка NBT через модернизацию"}'),

('263B', 'NBT Standard', 'Базовая NBT система без расширенных функций', '1-Series', 2012, 2016,
 '{"navigation": true, "bluetooth": true, "usb": true}',
 '{"nbt_evo": "Апгрейд до NBT Evo для видео в движении"}');

-- Создание таблицы для истории VIN-декодирований (аналитика)
CREATE TABLE IF NOT EXISTS vin_searches (
    id SERIAL PRIMARY KEY,
    vin VARCHAR(17) NOT NULL,
    vehicle_series VARCHAR(50),
    vehicle_year INTEGER,
    search_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    client_ip VARCHAR(45)
);

CREATE INDEX idx_vin_timestamp ON vin_searches(search_timestamp DESC);
