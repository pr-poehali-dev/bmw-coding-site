-- Добавление всех блоков управления BMW где доступно кодирование

-- ====== DME/DDE (Digital Motor Electronics) - Блоки управления двигателем ======
INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options) 
SELECT '12A0', 'DME MS43', 'Блок управления двигателем M54/M56', 'E46', 2001, 2006,
 '{"vmax_removal": true, "sport_mode": true, "cold_start_tuning": true}'::jsonb,
 '{"chip_tuning": "Возможен чип-тюнинг для +30 л.с."}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '12A0' AND vehicle_series = 'E46');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '12B0', 'DME MSD80', 'Блок управления двигателем N54/N55', 'E90', 2006, 2013,
 '{"vmax_removal": true, "launch_control": true, "burbles": true, "sport_mode": true}'::jsonb,
 '{"stage1": "Stage 1 тюнинг +100 л.с. для N54"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '12B0' AND vehicle_series = 'E90');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '12C0', 'DME MSD81', 'Блок управления для N52/N53', 'E60', 2007, 2010,
 '{"vmax_removal": true, "throttle_response": true, "idle_rpm": true}'::jsonb,
 '{"chip_tuning": "Оптимизация расхода топлива"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '12C0' AND vehicle_series = 'E60');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '12D0', 'DME MEVD17.2', 'Современный блок для B58/B48', 'G20', 2015, 2025,
 '{"vmax_removal": true, "launch_control": true, "burbles": true, "pops_bangs": true, "sport_plus": true}'::jsonb,
 '{"bootmod3": "Поддержка BootMod3 для Stage 2"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '12D0' AND vehicle_series = 'G20');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '12E0', 'DME S58', 'М-блок управления для S58 (M3/M4)', 'G80', 2021, 2025,
 '{"m_mode": true, "drift_mode": true, "launch_control": true, "individual_mode": true}'::jsonb,
 '{"xhp": "XHP тюнинг для коробки + Stage 2"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '12E0' AND vehicle_series = 'G80');

-- ====== EGS/GS (Электронное управление КПП) ======
INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '13A0', 'EGS ZF6HP', 'Управление АКПП ZF 6HP', 'E60', 2003, 2010,
 '{"sport_shift": true, "kick_down_tuning": true, "shift_points": true}'::jsonb,
 '{"xhp_flash": "XHP прошивка для спортивных переключений"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '13A0' AND vehicle_series = 'E60');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '13B0', 'GS19 ZF8HP', 'Управление АКПП ZF 8HP (F-серия)', 'F30', 2011, 2019,
 '{"sport_shift": true, "manual_mode": true, "launch_control": true, "shift_speed": true}'::jsonb,
 '{"xhp_stage3": "XHP Stage 3 - быстрейшие переключения"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '13B0' AND vehicle_series = 'F30');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '13C0', 'TCU ZF8HP Gen3', 'Новейшая АКПП для G-серии', 'G20', 2018, 2025,
 '{"sport_plus": true, "launch_control": true, "drift_mode": true, "individual_shift": true}'::jsonb,
 '{"xhp": "Полная кастомизация карт переключения"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '13C0' AND vehicle_series = 'G20');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '13D0', 'DCT DKG', 'Роботизированная КПП M-DCT', 'M3', 2008, 2020,
 '{"launch_control": true, "ultra_fast_shift": true, "auto_blip": true}'::jsonb,
 '{"custom_maps": "Настройка агрессивности переключений"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '13D0' AND vehicle_series = 'M3');

-- ====== KOMBI (Комбинация приборов) ======
INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '14A0', 'KOMBI Analog', 'Аналоговая приборная панель', 'E90', 2005, 2012,
 '{"needles_sweep": true, "startup_animation": true, "hidden_menus": true, "units_change": true}'::jsonb,
 '{"digital_retrofit": "Замена на цифровую панель невозможна"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '14A0' AND vehicle_series = 'E90');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '14B0', 'KOMBI CID', 'Цифровая панель с CID дисплеем', 'F30', 2011, 2019,
 '{"live_digital_speed": true, "boost_gauge": true, "oil_temp": true, "coolant_temp": true, "custom_welcome": true}'::jsonb,
 '{"m_cluster": "Активация M-режимов на дисплее"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '14B0' AND vehicle_series = 'F30');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '14C0', 'Live Cockpit', 'Полностью цифровая панель 12.3"', 'G20', 2018, 2025,
 '{"customizable_widgets": true, "sport_displays": true, "m_mode_display": true, "g_meter": true, "lap_timer": true}'::jsonb,
 '{"professional": "Апгрейд до Live Cockpit Professional"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '14C0' AND vehicle_series = 'G20');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '14D0', 'M Display', 'Спортивная панель для M-моделей', 'M3', 2014, 2025,
 '{"shift_lights": true, "boost_pressure": true, "g_meter": true, "lap_timer": true, "track_mode": true}'::jsonb,
 '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '14D0' AND vehicle_series = 'M3');

-- ====== FEM/BDC (Footwell/Body Domain Controller) ======
INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '61A0', 'FEM1', 'Body Controller для F-серии', 'F30', 2011, 2015,
 '{"comfort_access": true, "welcome_lights": true, "daylight_running": true, "cornering_lights": true, "auto_lock": true}'::jsonb,
 '{"angel_eyes": "Активация LED Angel Eyes"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '61A0' AND vehicle_series = 'F30');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '61B0', 'FEM2', 'Улучшенный FEM с больше функций', 'F30', 2015, 2019,
 '{"comfort_access": true, "keyless_go": true, "ambient_lighting": true, "puddle_lights": true, "panic_alarm": true}'::jsonb,
 '{"led_retrofit": "Поддержка LED фар и задних фонарей"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '61B0' AND vehicle_series = 'F30');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '61C0', 'BDC', 'Body Domain Controller для E-серии', 'E90', 2005, 2012,
 '{"comfort_access": true, "daylight_running": true, "welcome_lights": true, "mirror_fold": true}'::jsonb,
 '{"coding_only": "Только через кодирование, не программирование"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '61C0' AND vehicle_series = 'E90');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '61D0', 'BDC2', 'Второе поколение BDC', 'E60', 2007, 2010,
 '{"comfort_access": true, "auto_trunk": true, "mirror_auto_fold": true, "rain_sensor": true}'::jsonb,
 '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '61D0' AND vehicle_series = 'E60');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '61E0', 'BDC3', 'Последняя версия BDC для E-серии', 'E90', 2010, 2013,
 '{"comfort_access": true, "keyless_go": true, "auto_trunk": true, "selective_unlock": true}'::jsonb,
 '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '61E0' AND vehicle_series = 'E90');

-- ====== CAS (Car Access System) ======
INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '51A0', 'CAS3', 'Система доступа CAS3', 'E90', 2005, 2012,
 '{"comfort_access": true, "remote_start_prep": true, "keyless_entry": true}'::jsonb,
 '{"remote_start": "Возможна установка автозапуска"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '51A0' AND vehicle_series = 'E90');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '51B0', 'CAS3+', 'Улучшенная CAS3 с push-start', 'E70', 2007, 2013,
 '{"keyless_go": true, "comfort_access": true, "auto_lock": true}'::jsonb,
 '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '51B0' AND vehicle_series = 'E70');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '51C0', 'CAS4', 'Современная система для F-серии', 'F30', 2011, 2019,
 '{"keyless_go": true, "comfort_access": true, "remote_services": true, "panic_mode": true}'::jsonb,
 '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '51C0' AND vehicle_series = 'F30');

-- ====== IHKA (Климат-контроль) ======
INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '64A0', 'IHKA Standard', 'Однозонный климат', 'E46', 2001, 2006,
 '{"auto_recirculation": true, "max_cooling": true, "rest_heat": true}'::jsonb,
 '{"retrofit_2zone": "Возможна установка 2-зонного"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '64A0' AND vehicle_series = 'E46');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '64B0', 'IHKA 2-Zone', 'Двухзонный климат-контроль', 'E90', 2005, 2012,
 '{"auto_recirculation": true, "max_cooling": true, "rest_heat": true, "left_right_zones": true}'::jsonb,
 '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '64B0' AND vehicle_series = 'E90');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '64C0', 'IHKA 4-Zone', 'Четырехзонный для 7-серии', '7-Series', 2008, 2025,
 '{"individual_zones": true, "ionizer": true, "fragrance": true, "auto_recirculation": true}'::jsonb,
 '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '64C0' AND vehicle_series = '7-Series');

-- ====== DSC/ABS (Система стабилизации) ======
INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '34A0', 'DSC MK60', 'Система стабилизации MK60', 'E90', 2005, 2012,
 '{"mdm_mode": true, "dsc_off": true, "abs_tuning": true}'::jsonb,
 '{"drift_mode": "Активация Drift Mode (только M-модели)"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '34A0' AND vehicle_series = 'E90');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '34B0', 'DSC MK60E5', 'Улучшенная DSC для F-серии', 'F30', 2011, 2019,
 '{"mdm_mode": true, "dsc_off": true, "brake_fade_compensation": true}'::jsonb,
 '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '34B0' AND vehicle_series = 'F30');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '34C0', 'DSC iDSC', 'Интегрированная DSC для G-серии', 'G20', 2018, 2025,
 '{"mdm_plus": true, "drift_analyzer": true, "launch_control_support": true}'::jsonb,
 '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '34C0' AND vehicle_series = 'G20');

-- ====== PDC/Park Assist (Парктроник) ======
INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '70A0', 'PDC Standard', 'Базовый парктроник', 'E90', 2005, 2012,
 '{"front_rear_sensors": true, "volume_adjust": true, "visual_display": true}'::jsonb,
 '{"pdc_retrofit": "Установка камеры заднего вида"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '70A0' AND vehicle_series = 'E90');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '70B0', 'PDC + Camera', 'Парктроник с камерой', 'F30', 2011, 2019,
 '{"front_rear_sensors": true, "backup_camera": true, "park_assist": true}'::jsonb,
 '{"360_camera": "Апгрейд до кругового обзора"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '70B0' AND vehicle_series = 'F30');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '70C0', 'Parking Assistant Plus', 'Автоматическая парковка', 'G20', 2018, 2025,
 '{"auto_parking": true, "360_camera": true, "park_assist_plus": true, "remote_parking": true}'::jsonb,
 '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '70C0' AND vehicle_series = 'G20');

-- ====== HUD (Head-Up Display) ======
INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '88A0', 'HUD Gen1', 'Первое поколение HUD', 'F30', 2012, 2016,
 '{"speed_display": true, "navigation_arrows": true, "warnings": true}'::jsonb,
 '{"brightness": "Настройка яркости и высоты"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '88A0' AND vehicle_series = 'F30');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '88B0', 'HUD Gen2', 'Цветной HUD с больше информации', 'G20', 2018, 2025,
 '{"full_color": true, "navigation": true, "speed_limit": true, "phone_info": true, "adaptive_brightness": true}'::jsonb,
 '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '88B0' AND vehicle_series = 'G20');

-- ====== SAS (Сервопривод руля) ======
INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '80A0', 'SAS Standard', 'Сервопривод рулевого управления', 'F30', 2011, 2019,
 '{"variable_assist": true, "sport_mode": true, "comfort_mode": true}'::jsonb,
 '{"active_steering": "Активный руль (только на опциях)"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '80A0' AND vehicle_series = 'F30');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '80B0', 'Integral Active Steering', 'Активное рулевое управление', '5-Series', 2017, 2025,
 '{"rear_steering": true, "sport_mode": true, "parking_assist": true}'::jsonb,
 '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '80B0' AND vehicle_series = '5-Series');

-- ====== Seat Memory (Память сидений) ======
INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '72A0', 'SM Driver', 'Память водительского сиденья', 'E90', 2005, 2012,
 '{"3_positions": true, "easy_entry": true, "mirror_memory": true}'::jsonb,
 '{"comfort_access_link": "Привязка к ключу"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '72A0' AND vehicle_series = 'E90');

INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options)
SELECT '72B0', 'SM Driver + Passenger', 'Память обоих сидений', '5-Series', 2010, 2025,
 '{"driver_3_positions": true, "passenger_3_positions": true, "easy_entry": true, "steering_memory": true}'::jsonb,
 '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM hwel_blocks WHERE hwel_code = '72B0' AND vehicle_series = '5-Series');
