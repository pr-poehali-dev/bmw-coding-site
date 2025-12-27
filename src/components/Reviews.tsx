import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const reviews = [
  {
    id: 1,
    author: 'Дмитрий',
    rating: 5,
    text: 'Отличный сервис! Профессионально закодировали функции, всё работает идеально. Рекомендую!',
    date: '2024-11-15'
  },
  {
    id: 2,
    author: 'Александр',
    rating: 5,
    text: 'Сделали русификацию BMW X5. Быстро, качественно, по адекватной цене. Очень доволен результатом!',
    date: '2024-10-28'
  },
  {
    id: 3,
    author: 'Михаил',
    rating: 5,
    text: 'Чип-тюнинг Stage 2 - машина просто улетает! Прирост мощности ощутим. Спасибо команде!',
    date: '2024-10-10'
  },
  {
    id: 4,
    author: 'Сергей',
    rating: 5,
    text: 'Установили российские карты навигации. Работают отлично, всё настроили как надо.',
    date: '2024-09-22'
  },
  {
    id: 5,
    author: 'Владимир',
    rating: 5,
    text: 'Изготовили дубликат ключа для BMW. Сделали быстро, ключ работает без нареканий.',
    date: '2024-09-05'
  },
  {
    id: 6,
    author: 'Игорь',
    rating: 5,
    text: 'Профессионалы своего дела! Удалили ошибку экстренного вызова программно, сэкономил на замене блока.',
    date: '2024-08-18'
  }
];

export default function Reviews() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/10'}`}
      />
    ));
  };

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-light text-white tracking-tight">Отзывы клиентов</h2>
        <a
          href="https://yandex.ru/maps/org/reborn_technologies/70103871083/reviews/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-white/40 hover:text-blue-400 transition-colors duration-300"
        >
          <span>Все отзывы на Яндекс.Картах</span>
          <Icon name="ExternalLink" className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review, index) => (
          <Card
            key={review.id}
            className="border-0 overflow-hidden transition-all duration-500 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))',
              backdropFilter: 'blur(40px)',
              boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
              animationDelay: `${index * 50}ms`
            }}
          >
            <div 
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent)',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
              }}
            />

            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-light text-white mb-1">{review.author}</h3>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <span className="text-xs text-white/30">
                  {new Date(review.date).toLocaleDateString('ru-RU', { 
                    year: 'numeric', 
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <p className="text-sm text-white/70 font-light leading-relaxed">
                {review.text}
              </p>

              <div 
                className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(255, 215, 0, 0.03), transparent)'
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
