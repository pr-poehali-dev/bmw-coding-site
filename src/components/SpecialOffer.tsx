import Icon from '@/components/ui/icon';

export default function SpecialOffer() {
  return (
    <div 
      className="relative rounded-3xl overflow-hidden mb-16 group cursor-pointer"
      style={{
        border: '1px solid rgba(231, 34, 46, 0.25)',
        boxShadow: '0 30px 90px -20px rgba(231, 34, 46, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.005))'
      }}
    >
      <div 
        className="absolute top-0 left-0 right-0 h-1 z-20"
        style={{
          background: 'linear-gradient(90deg, #81C4FF 0%, #81C4FF 33.33%, #16588E 33.33%, #16588E 66.66%, #E7222E 66.66%, #E7222E 100%)',
          boxShadow: '0 0 30px rgba(231, 34, 46, 0.8)'
        }}
      />
      
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 relative overflow-hidden bg-black">
          <img 
            src="https://cdn.poehali.dev/files/mgu1.jpg" 
            alt="BMW Live Cockpit Professional с российскими картами" 
            className="w-full h-full object-cover"
            style={{
              filter: 'brightness(1.35) contrast(1.5) saturate(1.4)',
              objectPosition: 'center 35%',
              transform: 'scale(1.5)',
              imageRendering: 'crisp-edges'
            }}
          />
          
          {/* Глянцевое покрытие */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.08) 30%, transparent 60%),
                linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 40%),
                linear-gradient(to bottom, transparent 70%, rgba(0, 0, 0, 0.5) 90%, rgba(0, 0, 0, 0.9) 100%)
              `,
              mixBlendMode: 'normal'
            }}
          />
          
          {/* Блики как на глянцевом экране */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 600px 200px at 30% 20%, rgba(255, 255, 255, 0.3), transparent 50%),
                radial-gradient(ellipse 400px 150px at 70% 30%, rgba(255, 255, 255, 0.2), transparent 50%)
              `,
              mixBlendMode: 'overlay'
            }}
          />
          
          {/* Цветные блики от панели */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at 50% 40%, rgba(231, 34, 46, 0.15), transparent 60%),
                radial-gradient(ellipse at 30% 60%, rgba(255, 120, 80, 0.1), transparent 50%)
              `,
              mixBlendMode: 'screen',
              opacity: 0.7
            }}
          />
        </div>
        
        <div 
          className="lg:w-1/2 relative p-12 flex flex-col justify-center"
          style={{
            background: `
              radial-gradient(ellipse at right, rgba(231, 34, 46, 0.15) 0%, transparent 70%),
              radial-gradient(ellipse at center, rgba(231, 34, 46, 0.1) 0%, transparent 60%),
              linear-gradient(135deg, rgba(20, 20, 30, 0.92) 0%, rgba(10, 10, 15, 0.96) 100%)
            `,
            backdropFilter: 'blur(24px) saturate(180%)'
          }}
        >
          {/* Стеклянный эффект с бликом */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 30%),
                radial-gradient(circle at 80% 50%, rgba(231, 34, 46, 0.2), transparent 50%)
              `,
              mixBlendMode: 'overlay'
            }}
          />
          
          {/* Мягкое свечение */}
          <div 
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 70% 40%, rgba(255, 80, 90, 0.15), transparent 60%)',
              mixBlendMode: 'screen',
              filter: 'blur(40px)'
            }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="Map" className="w-6 h-6 text-[#E7222E]" />
              <span className="text-[#E7222E] text-sm font-light tracking-widest uppercase">Специальное предложение</span>
            </div>
            
            <h2 className="font-light text-white mb-4 leading-tight text-2xl">
              Российские карты навигации
            </h2>
            
            <p className="text-white/80 text-lg font-light mb-8 leading-relaxed max-w-xl">
              Смена навигации на российские карты за 1 час. Настройка и активация включены в стоимость. Гарантия на установку.
            </p>
            
            <div className="flex items-center gap-8 mb-8">
              <div>
                <span className="text-white/40 text-sm line-through block mb-2">35 000 ₽</span>
                <span className="font-light text-[#E7222E] text-2xl">25000₽ </span>
              </div>
              <div 
                className="py-4 rounded-2xl px-[11px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))',
                  border: '1px solid rgba(231, 34, 46, 0.5)',
                  boxShadow: '0 10px 40px rgba(231, 34, 46, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                <span className="text-white text-2xl font-medium">-29%</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Clock" className="w-4 h-4" />
                <span>Установка 1 час</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" className="w-4 h-4" />
                <span>Гарантия</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="w-4 h-4" />
                <span>Настройка бесплатно</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}