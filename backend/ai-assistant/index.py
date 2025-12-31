import json
import requests

def handler(event: dict, context) -> dict:
    '''AI консультант по автомобилям через Google Gemini API'''
    
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
    
    user_message = body.get('message', '').strip()
    api_key = body.get('apiKey', '').strip()
    history = body.get('history', [])
    
    if not user_message:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Message is required'}),
            'isBase64Encoded': False
        }
    
    if not api_key:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'API key is required'}),
            'isBase64Encoded': False
        }
    
    # Получаем контекст VIN анализа, если передан
    vin_context = body.get('vinContext', {})
    
    # Расширенная база знаний PsdzData для AI
    knowledge_base = """
    === БАЗА ЗНАНИЙ BMW CODING ===
    
    HWEL БЛОКИ И ИХ ВОЗМОЖНОСТИ:
    - 26B9 (NBT Evo): Видео в движении, камера на весь экран, спортивные дисплеи, split-screen
    - 26BA (NBT Evo High): Все функции 26B9 + навигация Plus для больших экранов
    - 26BB (NBT Evo ID6): Все функции 26B9 + Apple CarPlay + Android Auto (проводной)
    - 26BC (NBT Evo ID6+): Все функции 26BB + беспроводной CarPlay + жестовое управление
    - 26F0 (MGU High): Head-Up Display + навигация + премиум аудио
    - 26F1 (MGU ID6): HUD + CarPlay + Android Auto + жестовое управление
    - 263A (CIC High): Старая система 2009-2013, базовая навигация
    - 263B (NBT Standard): Базовая NBT без расширенных функций
    
    ПОПУЛЯРНЫЕ ОПЦИИ КОДИРОВАНИЯ:
    1. Apple CarPlay (требует 26BB/26BC/26F1):
       - Беспроводной только на 26BC и новее
       - Проводной на 26BB через USB
       - Работает параллельно с навигацией BMW
    
    2. Видео в движении (доступно на NBT Evo 26B9+):
       - Активация через FSC код или кодирование
       - Пассажир может смотреть видео на ходу
       - Не влияет на безопасность водителя
    
    3. Камера на весь экран (26B9+):
       - Увеличение изображения с парковочных камер
       - Работает с Top View и Rear View
    
    4. Спортивные дисплеи (26B9+):
       - G-meter (датчик перегрузок)
       - Boost pressure (давление турбины)
       - Oil temperature (температура масла)
       - Lap timer для трека
    
    5. Head-Up Display (26F0/26F1):
       - Проекция скорости, навигации, предупреждений
       - Регулировка яркости и высоты
    
    АПГРЕЙДЫ ОБОРУДОВАНИЯ:
    - С 263A/263B на NBT Evo: требуется замена головного устройства + проводки
    - С 26B9 на 26BB: обновление ПО + активация FSC для CarPlay
    - С 26BB на 26BC: замена WiFi модуля для беспроводного CarPlay
    
    ЧАСТЫЕ ВОПРОСЫ:
    Q: Можно ли активировать CarPlay на NBT Standard?
    A: Нет, требуется апгрейд до NBT Evo ID6 (26BB) минимум
    
    Q: Видео в движении безопасно?
    A: Да, функция блокирует видео для водителя, доступно только пассажиру
    
    Q: Можно ли установить NBT Evo на старый E90?
    A: Технически да, но требуется замена проводки и адаптация CAN-шины
    """
    
    system_prompt = f"""Ты — эксперт-консультант автосервиса "Bocha Reborn" по BMW кодированию и диагностике.

ТВОЯ БАЗА ЗНАНИЙ:
{knowledge_base}

ТЕКУЩИЙ КОНТЕКСТ VIN АНАЛИЗА:
{json.dumps(vin_context, ensure_ascii=False) if vin_context else "VIN не предоставлен"}

ПРАВИЛА КОНСУЛЬТАЦИИ:
- Используй базу знаний для точных ответов по HWEL блокам
- Если известен VIN клиента, учитывай его комплектацию из контекста
- Объясняй технические термины простым языком
- Давай конкретные рекомендации по апгрейдам
- Отвечай кратко (3-5 предложений максимум)
- При необходимости сложной диагностики рекомендуй визит в сервис
- Упоминай цены только если клиент спрашивает напрямую

ВАЖНО: Ты консультант, но финальное решение - за мастером в автосервисе."""

    contents = []
    
    for msg in history:
        role = 'user' if msg.get('sender') == 'user' else 'model'
        text = msg.get('text', '')
        if text:
            contents.append({
                'role': role,
                'parts': [{'text': text}]
            })
    
    contents.append({
        'role': 'user',
        'parts': [{'text': user_message}]
    })
    
    url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={api_key}'
    
    payload = {
        'contents': contents,
        'systemInstruction': {
            'parts': [{'text': system_prompt}]
        },
        'generationConfig': {
            'temperature': 0.8,
            'maxOutputTokens': 250,
            'topP': 0.95
        }
    }
    
    try:
        response = requests.post(url, json=payload, timeout=20)
        response_data = response.json()
        
        if response.status_code != 200:
            error_msg = response_data.get('error', {}).get('message', 'Unknown error')
            print(f'Gemini API Error ({response.status_code}): {error_msg}')
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': f'AI error: {error_msg}'}),
                'isBase64Encoded': False
            }
        
        ai_text = response_data['candidates'][0]['content']['parts'][0]['text']
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'response': ai_text,
                'message': user_message
            }),
            'isBase64Encoded': False
        }
        
    except requests.Timeout:
        return {
            'statusCode': 408,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Request timeout'}),
            'isBase64Encoded': False
        }
    except KeyError:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid response from AI'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        print(f'Unexpected error: {str(e)}')
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Internal server error'}),
            'isBase64Encoded': False
        }