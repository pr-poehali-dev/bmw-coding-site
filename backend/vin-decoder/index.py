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
        
        available_blocks = [dict(row) for row in cur.fetchall()]
        
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f'Database error: {str(e)}')
        available_blocks = []
    
    # Анализ возможностей кодирования
    coding_analysis = analyze_coding_options(vehicle_info, available_blocks)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'vin': vin,
            'vehicle': vehicle_info,
            'blocks': available_blocks,
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


def analyze_coding_options(vehicle_info: dict, available_blocks: list) -> dict:
    '''Анализ возможностей кодирования для конкретного авто'''
    
    analysis = {
        'current_capabilities': [],
        'available_upgrades': [],
        'recommendations': []
    }
    
    # Примеры популярных опций и требования к HWEL блокам
    popular_features = {
        'carplay': {
            'name': 'Apple CarPlay',
            'required_blocks': ['26BB', '26BC'],
            'description': 'Беспроводной CarPlay и Android Auto'
        },
        'hud': {
            'name': 'Head-Up Display',
            'required_blocks': ['26F0', '26F1'],
            'description': 'Проекция информации на лобовое стекло'
        },
        'video_motion': {
            'name': 'Видео в движении',
            'required_blocks': ['26B9', '26BA', '26BB'],
            'description': 'Просмотр видео на ходу (пассажир)'
        },
        'fullscreen_camera': {
            'name': 'Камера на весь экран',
            'required_blocks': ['26B9', '26BA', '26BB'],
            'description': 'Увеличенное изображение с камер'
        },
        'sport_displays': {
            'name': 'Спортивные дисплеи',
            'required_blocks': ['26B9'],
            'description': 'G-meter, boost pressure, oil temp'
        }
    }
    
    # Проверяем текущие блоки
    current_blocks = [block['hwel_code'] for block in available_blocks]
    
    for feature_key, feature_info in popular_features.items():
        has_all_blocks = all(block in current_blocks for block in feature_info['required_blocks'])
        
        if has_all_blocks:
            analysis['current_capabilities'].append({
                'feature': feature_info['name'],
                'description': feature_info['description'],
                'status': 'available'
            })
        else:
            missing_blocks = [b for b in feature_info['required_blocks'] if b not in current_blocks]
            analysis['available_upgrades'].append({
                'feature': feature_info['name'],
                'description': feature_info['description'],
                'required_blocks': feature_info['required_blocks'],
                'missing_blocks': missing_blocks,
                'upgrade_needed': True
            })
    
    # Генерация рекомендаций
    if vehicle_info['year'] >= 2016:
        analysis['recommendations'].append('Ваш автомобиль поддерживает большинство современных опций кодирования')
    
    if '26B9' in current_blocks:
        analysis['recommendations'].append('NBT Evo: доступны расширенные функции мультимедиа')
    
    if '26BB' not in current_blocks and vehicle_info['year'] >= 2017:
        analysis['recommendations'].append('Рекомендуем апгрейд до NBT Evo ID6 (26BB) для CarPlay')
    
    return analysis
