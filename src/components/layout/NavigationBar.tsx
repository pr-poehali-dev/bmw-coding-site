import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';

function NavigationBarMobile() {
  const [currentTime] = useState(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        <img 
          src="https://cdn.poehali.dev/files/reborn.jpg" 
          alt="Logo" 
          className="h-7 w-auto opacity-90"
        />
        <div className="h-4 w-px bg-white/20" />
        <span className="text-white/60 text-xs font-light tracking-wider" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>REBORN BMW</span>
      </div>
      
      <div className="flex items-center gap-3 text-white/60 text-xs">
        <Icon name="Wifi" className="w-3 h-3" />
        <Icon name="Signal" className="w-3 h-3" />
        <div className="font-light tracking-wide">{currentTime}</div>
      </div>
    </div>
  );
}

function NavigationBarDesktop() {
  const [currentTime] = useState(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-3">
        <img 
          src="https://cdn.poehali.dev/files/reborn.jpg" 
          alt="Logo" 
          className="h-10 w-auto opacity-90"
        />
        <div className="h-6 w-px bg-white/20" />
        <span className="text-white/60 text-sm font-light tracking-wider" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>REBORN BMW</span>
      </div>
      
      <div className="flex items-center gap-6 text-white/60 text-sm">
        <div className="flex items-center gap-2">
          <Icon name="Wifi" className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Signal" className="w-4 h-4" />
        </div>
        <div className="font-light tracking-wide">{currentTime}</div>
      </div>
    </div>
  );
}

export default function NavigationBar() {
  return (
    <Adaptive
      mobile={<NavigationBarMobile />}
      desktop={<NavigationBarDesktop />}
    />
  );
}
