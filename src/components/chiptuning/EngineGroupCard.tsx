import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { EngineGroup, getGainPercentage, getTypeColor } from './chipTuningData';

interface EngineGroupCardProps {
  group: EngineGroup;
  index: number;
  onSelect: () => void;
}

export default function EngineGroupCard({ group, index, onSelect }: EngineGroupCardProps) {
  const color = getTypeColor(group.type);
  const totalModels = group.variants.reduce((sum, v) => sum + v.models.length, 0);

  return (
    <Card
      onClick={onSelect}
      className="group relative overflow-hidden border-0 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
      style={{
        background: `
          linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),
          linear-gradient(135deg, ${color}08, ${color}03)
        `,
        backdropFilter: 'blur(40px)',
        boxShadow: `
          0 30px 80px -20px rgba(0, 0, 0, 0.6), 
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          0 0 0 1px ${color}15
        `,
        animationDelay: `${index * 50}ms`
      }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${color}15, transparent 70%)`,
          mixBlendMode: 'screen'
        }}
      />

      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
          boxShadow: `0 0 20px ${color}30`
        }}
      />
      
      <CardContent className="p-8 relative z-10">
        <div className="mb-6">
          <Icon 
            name={group.type === 'petrol' ? 'Flame' : 'Fuel'}
            className="w-12 h-12 transition-all duration-300 group-hover:scale-110"
            style={{ color }}
          />
        </div>
        
        <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">
          {group.name}
        </h3>
        <p className="text-sm text-white/70 mb-4 font-medium">
          {group.description}
        </p>

        <div className="mb-4">
          <div className="text-white/60 text-xs mb-2 font-medium">Подходящие модели:</div>
          <div className="flex flex-wrap gap-2">
            {group.variants.flatMap(v => v.models).slice(0, 6).map((model, i) => (
              <span 
                key={i}
                className="px-2 py-1 rounded-lg text-xs text-white/90 font-medium"
                style={{
                  background: `linear-gradient(135deg, ${color}20, ${color}12)`,
                  border: `1px solid ${color}35`
                }}
              >
                {model}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}