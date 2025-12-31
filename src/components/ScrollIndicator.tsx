import { useEffect, useRef, useState } from 'react';

interface ScrollIndicatorProps {
  totalItems: number;
  color?: string;
}

export default function ScrollIndicator({ totalItems, color = '#FF6B35' }: ScrollIndicatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current?.previousElementSibling as HTMLElement;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.scrollWidth / totalItems;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(index, totalItems - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [totalItems]);

  return (
    <div ref={containerRef} className="flex justify-center gap-1.5 mt-3">
      {Array.from({ length: totalItems }).map((_, idx) => (
        <div
          key={idx}
          className="h-1 rounded-full transition-all duration-300"
          style={{
            width: activeIndex === idx ? '20px' : '6px',
            backgroundColor: activeIndex === idx ? color : 'rgba(255, 255, 255, 0.2)'
          }}
        />
      ))}
    </div>
  );
}
