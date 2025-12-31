import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''VIN-декодер с анализом HWEL блоков и возможностей кодирования BMW'''
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid JSON'}),
            'isBase64Encoded': False
        }
    
    vin = body.get('vin', '').strip().upper()
    sa_codes = body.get('saCodes', [])  # Массив SA кодов от клиента
    
    if not vin or len(vin) != 17:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'VIN должен содержать 17 символов'}),
            'isBase64Encoded': False
        }
    
    # Базовое декодирование VIN BMW
    vehicle_info = decode_bmw_vin(vin)
    
    # ИМИТАЦИЯ API: Если SA коды не переданы, используем тестовые данные
    if not sa_codes:
        sa_codes = get_mock_sa_codes(vin)
        vehicle_info['mock_data'] = True
    
    # Определяем установленное оборудование по SA кодам
    equipment = parse_sa_codes(sa_codes)
    vehicle_info.update(equipment)
    
    # Получаем HWEL блоки из базы данных
    try:
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # Получаем возможные блоки для модели и года
        cur.execute("""
            SELECT hwel_code, block_name, description, features, upgrade_options
            FROM hwel_blocks 
            WHERE vehicle_series = %s AND year_from <= %s AND year_to >= %s
            ORDER BY hwel_code
        """, (vehicle_info['series'], vehicle_info['year'], vehicle_info['year']))
        
        all_blocks = [dict(row) for row in cur.fetchall()]
        
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f'Database error: {str(e)}')
        all_blocks = []
    
    # Фильтруем блоки по реально установленным SA кодам
    installed_blocks = filter_installed_blocks(all_blocks, equipment)
    
    # Анализ возможностей кодирования
    coding_analysis = analyze_coding_options(vehicle_info, installed_blocks, equipment)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'vin': vin,
            'vehicle': vehicle_info,
            'equipment': equipment,
            'sa_codes': sa_codes,
            'blocks': installed_blocks,
            'analysis': coding_analysis
        }, ensure_ascii=False),
        'isBase64Encoded': False
    }


def decode_bmw_vin(vin: str) -> dict:
    '''Декодирование VIN BMW'''
    
    # WMI (World Manufacturer Identifier) - первые 3 символа
    wmi = vin[:3]
    
    # VDS (Vehicle Descriptor Section) - символы 4-9
    series_code = vin[3]
    body_type = vin[4]
    engine_code = vin[5:7]
    
    # VIS (Vehicle Identifier Section) - символы 10-17
    model_year_code = vin[9]
    plant_code = vin[10]
    
    # Определение серии BMW
    series_map = {
        'A': '1-Series', 'B': '3-Series', 'C': '5-Series', 'D': '7-Series',
        'E': 'X1', 'F': 'X3', 'G': 'X5', 'H': 'X6', 'K': 'Z4',
        'U': '6-Series', 'V': 'M-Series', 'W': 'i3/i8'
    }
    
    # Определение года (упрощенная версия)
    year_map = {
        'A': 2010, 'B': 2011, 'C': 2012, 'D': 2013, 'E': 2014,
        'F': 2015, 'G': 2016, 'H': 2017, 'J': 2018, 'K': 2019,
        'L': 2020, 'M': 2021, 'N': 2022, 'P': 2023, 'R': 2024, 'S': 2025
    }
    
    series = series_map.get(series_code, 'Unknown')
    year = year_map.get(model_year_code, 2020)
    
    return {
        'vin': vin,
        'manufacturer': 'BMW',
        'series': series,
        'year': year,
        'engine': engine_code,
        'plant': plant_code,
        'wmi': wmi
    }


def analyze_coding_options(vehicle_info: dict, available_blocks: list, equipment: dict) -> dict:
    '''Анализ возможностей кодирования для конкретного авто на основе установленных опций'''
    
    analysis = {
        'available_coding': [],  # Доступные кодировки
        'engine_tuning': [],
        'transmission_tuning': [],
        'recommendations': []
    }
    
    # Определяем доступные кодировки на основе установленного оборудования
    multimedia = equipment.get('multimedia', {})
    options = equipment.get('options', [])
    
    # === МУЛЬТИМЕДИА КОДИРОВКИ ===
    
    # Если есть NBT Evo (609)
    if multimedia.get('NBT Evo ID6 Navigation Professional'):
        analysis['available_coding'].extend([
            {
                'category': 'Мультимедиа',
                'name': 'Видео в движении',
                'description': 'Пассажир может смотреть видео во время движения',
                'price': 2000,
                'duration': 30
            },
            {
                'category': 'Мультимедиа',
                'name': 'Apple CarPlay активация',
                'description': 'Беспроводное подключение iPhone к мультимедиа',
                'price': 8000,
                'duration': 60
            },
            {
                'category': 'Мультимедиа',
                'name': 'Android Auto активация',
                'description': 'Беспроводное подключение Android телефона',
                'price': 8000,
                'duration': 60
            },
            {
                'category': 'Мультимедиа',
                'name': 'Split-screen режим',
                'description': 'Разделение экрана на 2 зоны одновременно',
                'price': 2000,
                'duration': 20
            }
        ])
    
    # Если есть камера заднего вида
    if multimedia.get('camera'):
        analysis['available_coding'].append({
            'category': 'Мультимедиа',
            'name': 'Камера на весь экран',
            'description': 'Увеличенное изображение камеры заднего вида',
            'price': 2000,
            'duration': 20
        })
    
    # Если есть Top View камера
    if multimedia.get('top_view'):
        analysis['available_coding'].append({
            'category': 'Мультимедиа',
            'name': 'Top View на скорости',
            'description': 'Круговой обзор 360° на скорости до 30 км/ч',
            'price': 2500,
            'duration': 25
        })
    
    # Если есть HUD
    if multimedia.get('Head-Up Display') or multimedia.get('BMW Head-Up Display'):
        analysis['available_coding'].extend([
            {
                'category': 'Приборная панель',
                'name': 'HUD расширенная информация',
                'description': 'Дополнительные данные на проекции (температура, G-force)',
                'price': 2000,
                'duration': 30
            },
            {
                'category': 'Приборная панель',
                'name': 'HUD регулировка яркости',
                'description': 'Увеличенный диапазон яркости проекции',
                'price': 1500,
                'duration': 15
            }
        ])
    
    # === ОСВЕЩЕНИЕ ===
    
    if 'Adaptive LED Headlights' in options:
        analysis['available_coding'].extend([
            {
                'category': 'Освещение',
                'name': 'Welcome Light Show',
                'description': 'Анимация фар при открытии/закрытии автомобиля',
                'price': 1500,
                'duration': 20
            },
            {
                'category': 'Освещение',
                'name': 'Динамические поворотники',
                'description': 'Бегущие указатели поворота',
                'price': 3000,
                'duration': 40
            }
        ])
    
    # Общие кодировки освещения
    analysis['available_coding'].extend([
        {
            'category': 'Освещение',
            'name': 'ДХО не гаснут с поворотниками',
            'description': 'Дневные ходовые огни остаются активными при повороте',
            'price': 1500,
            'duration': 15
        },
        {
            'category': 'Освещение',
            'name': 'Отключение автоматического дальнего света',
            'description': 'Фары всегда в режиме ближнего света',
            'price': 1500,
            'duration': 10
        }
    ])
    
    # === КОМФОРТ ===
    
    if 'Comfort Access' in options:
        analysis['available_coding'].extend([
            {
                'category': 'Комфорт',
                'name': 'Автозакрытие зеркал',
                'description': 'Зеркала складываются при закрытии автомобиля',
                'price': 1500,
                'duration': 15
            },
            {
                'category': 'Комфорт',
                'name': 'Автозакрытие окон с брелока',
                'description': 'Закрытие всех стёкол удержанием кнопки брелока',
                'price': 2000,
                'duration': 20
            }
        ])
    
    # Общие комфортные кодировки
    analysis['available_coding'].extend([
        {
            'category': 'Комфорт',
            'name': 'Двойное моргание аварийкой',
            'description': 'Двойное мигание при закрытии автомобиля',
            'price': 1000,
            'duration': 10
        },
        {
            'category': 'Комфорт',
            'name': 'Отключение автостопа Start/Stop',
            'description': 'Система всегда выключена по умолчанию',
            'price': 2000,
            'duration': 15
        },
        {
            'category': 'Комфорт',
            'name': 'Отключение звука ремня безопасности',
            'description': 'Убрать назойливый звуковой сигнал непристёгнутого ремня',
            'price': 1000,
            'duration': 10
        }
    ])
    
    # === ПРИБОРНАЯ ПАНЕЛЬ ===
    
    analysis['available_coding'].extend([
        {
            'category': 'Приборная панель',
            'name': 'Цифровая скорость в приборке',
            'description': 'Отображение скорости цифрами на панели',
            'price': 1500,
            'duration': 15
        },
        {
            'category': 'Приборная панель',
            'name': 'Sweep-анимация стрелок',
            'description': 'Красивая анимация стрелок при запуске',
            'price': 2000,
            'duration': 20
        },
        {
            'category': 'Приборная панель',
            'name': 'M-режимы отображения',
            'description': 'Спортивные режимы приборной панели',
            'price': 3000,
            'duration': 30
        }
    ])
    
    # === БЕЗОПАСНОСТЬ / ДРАЙВ ===
    
    if 'M Sport Package' in options:
        analysis['available_coding'].extend([
            {
                'category': 'Безопасность',
                'name': 'MDM режим (M Dynamic Mode)',
                'description': 'Промежуточный режим стабилизации для дрифта',
                'price': 2000,
                'duration': 25
            },
            {
                'category': 'Безопасность',
                'name': 'Полное отключение DSC',
                'description': 'Возможность полного выключения стабилизации',
                'price': 1500,
                'duration': 20
            }
        ])
    
    # Общие кодировки
    analysis['available_coding'].extend([
        {
            'category': 'Безопасность',
            'name': 'Отключение ограничения скорости',
            'description': 'Снятие программного ограничения 250 км/ч',
            'price': 2000,
            'duration': 20
        }
    ])
    
    # Анализ возможностей чип-тюнинга двигателя
    engine = equipment.get('engine', {})
    if engine.get('code'):
        engine_code = engine['code']
        engine_type = engine.get('type', '')
        
        # Популярные двигатели BMW для тюнинга
        tunable_engines = {
            'B58': {'stage1': 400, 'stage2': 500, 'name': 'B58 3.0L Turbo'},
            'B48': {'stage1': 280, 'stage2': 320, 'name': 'B48 2.0L Turbo'},
            'N55': {'stage1': 380, 'stage2': 450, 'name': 'N55 3.0L Turbo'},
            'N20': {'stage1': 260, 'stage2': 290, 'name': 'N20 2.0L Turbo'},
            'S55': {'stage1': 500, 'stage2': 600, 'name': 'S55 3.0L Twin Turbo (M)'},
            'S58': {'stage1': 550, 'stage2': 650, 'name': 'S58 3.0L Twin Turbo (M)'},
            'B57': {'stage1': 350, 'stage2': 400, 'name': 'B57 3.0L Diesel'}
        }
        
        for code, specs in tunable_engines.items():
            if code in engine_code or code in engine_type:
                analysis['engine_tuning'].append({
                    'engine': specs['name'],
                    'stock_hp': engine.get('power', 'н/д'),
                    'stage1_hp': specs['stage1'],
                    'stage2_hp': specs['stage2'],
                    'available': True
                })
                analysis['recommendations'].append(f'Доступен чип-тюнинг {specs["name"]}: Stage 1 до {specs["stage1"]} л.с.')
                break
    
    # Анализ возможностей прошивки коробки
    transmission = equipment.get('transmission', {})
    if transmission.get('type') == 'ZF8HP':
        analysis['transmission_tuning'].append({
            'transmission': 'ZF 8HP (8-speed automatic)',
            'xhp_stage1': 'Быстрые переключения + Sport режим',
            'xhp_stage2': 'Launch Control + Custom maps',
            'xhp_stage3': 'Full custom + Track mode',
            'available': True
        })
        analysis['recommendations'].append('Доступна прошивка XHP для коробки ZF8HP')
    
    return analysis


def get_mock_sa_codes(vin: str) -> list:
    '''Имитация API - возвращает тестовые SA коды на основе VIN'''
    # Для демонстрации используем реальные SA коды типичного BMW F30 340i 2017
    mock_data = {
        'WBATX71070LB47317': [
            '1CA',  # BMW M Sport package
            '2VB',  # Acoustic comfort glazing
            '302',  # Automatic transmission Steptronic
            '322',  # Comfort Access
            '430',  # Interior mirror with automatic-dip
            '494',  # Seat heating for driver and front passenger
            '4UR',  # BMW Connected Drive services
            '563',  # Ambient Light
            '609',  # Navigation system Professional (NBT Evo ID6)
            '610',  # Head-Up Display
            '639',  # Harman Kardon surround sound system
            '644',  # BMW Head-Up Display
            '6FL',  # Adaptive LED headlights
            '6WB',  # Rear view camera
            'B58',  # Engine code: B58 3.0L Turbo I6 340 hp
            'ZF8HP', # Transmission: ZF 8HP50 8-speed automatic
        ]
    }
    
    return mock_data.get(vin, ['302', '609', 'B48', 'ZF8HP'])


def parse_sa_codes(sa_codes: list) -> dict:
    '''Парсинг SA кодов в структурированную информацию об оборудовании'''
    
    equipment = {
        'multimedia': {},
        'engine': {},
        'transmission': {},
        'options': []
    }
    
    # База знаний SA кодов
    sa_database = {
        # Мультимедиа системы
        '606': {'category': 'multimedia', 'name': 'NBT Standard', 'hwel': '263B'},
        '609': {'category': 'multimedia', 'name': 'NBT Evo ID6 Navigation Professional', 'hwel': '26BB'},
        '6WB': {'category': 'multimedia', 'name': 'Rear view camera', 'feature': 'camera'},
        '6VC': {'category': 'multimedia', 'name': 'Top view camera', 'feature': 'top_view'},
        
        # Head-Up Display
        '610': {'category': 'multimedia', 'name': 'Head-Up Display', 'hwel': '26F0'},
        '644': {'category': 'multimedia', 'name': 'BMW Head-Up Display', 'hwel': '26F0'},
        
        # Аудиосистемы
        '639': {'category': 'multimedia', 'name': 'Harman Kardon', 'feature': 'premium_audio'},
        '688': {'category': 'multimedia', 'name': 'Bowers & Wilkins', 'feature': 'premium_audio'},
        
        # Двигатели (коды часто идут как текст, не SA коды)
        'B58': {'category': 'engine', 'code': 'B58', 'type': 'B58 3.0L Turbo I6', 'power': 340, 'tunable': True},
        'B48': {'category': 'engine', 'code': 'B48', 'type': 'B48 2.0L Turbo I4', 'power': 252, 'tunable': True},
        'N55': {'category': 'engine', 'code': 'N55', 'type': 'N55 3.0L Turbo I6', 'power': 306, 'tunable': True},
        'S55': {'category': 'engine', 'code': 'S55', 'type': 'S55 3.0L Twin Turbo I6', 'power': 431, 'tunable': True},
        'S58': {'category': 'engine', 'code': 'S58', 'type': 'S58 3.0L Twin Turbo I6', 'power': 503, 'tunable': True},
        'B57': {'category': 'engine', 'code': 'B57', 'type': 'B57 3.0L Diesel I6', 'power': 265, 'tunable': True},
        
        # Коробки передач
        '302': {'category': 'transmission', 'type': 'ZF8HP', 'name': 'ZF 8-speed Automatic', 'tunable': True},
        'ZF8HP': {'category': 'transmission', 'type': 'ZF8HP', 'name': 'ZF 8HP50/70 Automatic', 'tunable': True},
        
        # Опции комфорта
        '322': {'category': 'option', 'name': 'Comfort Access'},
        '1CA': {'category': 'option', 'name': 'M Sport Package'},
        '494': {'category': 'option', 'name': 'Seat Heating'},
        '563': {'category': 'option', 'name': 'Ambient Light'},
        '6FL': {'category': 'option', 'name': 'Adaptive LED Headlights'},
    }
    
    installed_hwel = []
    
    for code in sa_codes:
        code_upper = code.upper()
        if code_upper in sa_database:
            info = sa_database[code_upper]
            
            if info['category'] == 'multimedia':
                equipment['multimedia'][info['name']] = True
                if 'hwel' in info:
                    installed_hwel.append(info['hwel'])
                if 'feature' in info:
                    equipment['multimedia'][info['feature']] = True
            
            elif info['category'] == 'engine':
                equipment['engine'] = {
                    'code': info['code'],
                    'type': info['type'],
                    'power': info['power'],
                    'tunable': info.get('tunable', False)
                }
            
            elif info['category'] == 'transmission':
                equipment['transmission'] = {
                    'type': info['type'],
                    'name': info['name'],
                    'tunable': info.get('tunable', False)
                }
            
            elif info['category'] == 'option':
                equipment['options'].append(info['name'])
    
    equipment['installed_hwel_codes'] = installed_hwel
    
    return equipment


def filter_installed_blocks(all_blocks: list, equipment: dict) -> list:
    '''Фильтрация блоков - возвращает только реально установленные'''
    
    installed_hwel = equipment.get('installed_hwel_codes', [])
    
    if not installed_hwel:
        # Если HWEL коды не определены из SA, возвращаем все возможные
        return all_blocks
    
    # Возвращаем только блоки которые реально установлены
    installed_blocks = [
        block for block in all_blocks 
        if block['hwel_code'] in installed_hwel
    ]
    
    return installed_blocks if installed_blocks else all_blocks