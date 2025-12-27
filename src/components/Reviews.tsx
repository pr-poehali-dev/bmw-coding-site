import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const reviews = [
  {
    id: 1,
    author: 'Дмитрий',
    rating: 5,
    text: 'Саш, ты красавчик! Машина после твоего тюнинга вообще другая стала, прям зверь 🔥 Спасибо большое!',
    date: '2024-11-15',
    time: '14:23'
  },
  {
    id: 2,
    author: 'Максим',
    rating: 5,
    text: 'Александр, спасибо что быстро принял! Кодирование сделали на высоте, всё как я хотел. Буду обращаться ещё 👍',
    date: '2024-10-28',
    time: '18:45'
  },
  {
    id: 3,
    author: 'Михаил',
    rating: 5,
    text: 'Братан, огонь работа! Stage 1 сделал просто пушка, тачка теперь летит. Друзьям уже рекомендовал 🚀',
    date: '2024-10-10',
    time: '20:12'
  },
  {
    id: 4,
    author: 'Сергей',
    rating: 5,
    text: 'Саня, спасибо за карты! Теперь навигация норм показывает всё, не как раньше. Зачёт!',
    date: '2024-09-22',
    time: '16:30'
  },
  {
    id: 5,
    author: 'Владимир',
    rating: 5,
    text: 'Александр, ключ работает идеально! Сделали за час, молодцы. Цена адекватная, всё честно 👌',
    date: '2024-09-05',
    time: '11:50'
  },
  {
    id: 6,
    author: 'Игорь',
    rating: 5,
    text: 'Саш, выручил с этой ошибкой! В дилере 50к хотели за замену блока, а ты программно за копейки убрал. Красава! 💪',
    date: '2024-08-18',
    time: '19:05'
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
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                  style={{
                    background: 'linear-gradient(135deg, rgba(41, 128, 185, 0.3), rgba(52, 152, 219, 0.2))',
                    border: '1px solid rgba(52, 152, 219, 0.4)'
                  }}
                >
                  {review.author[0]}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-light text-white">{review.author}</h3>
                  <span className="text-xs text-white/30">
                    {new Date(review.date).toLocaleDateString('ru-RU', { 
                      day: 'numeric',
                      month: 'short'
                    })} в {review.time}
                  </span>
                </div>
                <Icon name="MessageCircle" className="w-4 h-4 text-white/20" />
              </div>

              <div 
                className="p-4 rounded-2xl rounded-tl-none mb-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <p className="text-sm text-white/80 leading-relaxed">
                  {review.text}
                </p>
              </div>

              <div className="flex items-center gap-1 justify-end">
                {renderStars(review.rating)}
              </div>

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