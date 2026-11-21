import React from 'react';
import { cn } from '../../lib/utils';
import logoImg from '../../assets/logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  variant?: 'dark' | 'light' | 'badge';
}

export const Logo: React.FC<LogoProps> = ({
  className,
  size = 'md',
  showSubtitle = true,
  variant = 'badge'
}) => {
  const sizeMap = {
    sm: { img: 'h-8 w-8', text: 'text-base', sub: 'text-[9px]' },
    md: { img: 'h-10 w-10', text: 'text-lg', sub: 'text-[10px]' },
    lg: { img: 'h-14 w-14', text: 'text-2xl', sub: 'text-xs' },
    xl: { img: 'h-20 w-20', text: 'text-3xl', sub: 'text-sm' }
  };

  const current = sizeMap[size];

  return (
    <div className={cn('flex items-center gap-3 select-none', className)}>
      {/* Official QUICK by VMS Logo Mark */}
      <div
        className={cn(
          'relative rounded-2xl overflow-hidden flex items-center justify-center transition-transform hover:scale-105 duration-200',
          variant === 'badge' && 'bg-slate-950 p-1 border border-slate-800 shadow-md shadow-red-950/20 ring-1 ring-slate-800/80',
          variant === 'dark' && 'bg-transparent',
          variant === 'light' && 'bg-slate-950 p-1 rounded-xl shadow'
        )}
      >
        <img
          src={logoImg}
          alt="QUICK by VMS Logo"
          className={cn(current.img, 'object-contain rounded-xl')}
          onError={(e) => {
            // Fallback if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5">
          <span className={cn('font-black tracking-tight text-slate-900 font-sans', current.text)}>
            QUICK
          </span>
          <span className="text-red-600 font-serif italic text-xs font-bold">
            by
          </span>
          <span className="bg-red-600 text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded-md tracking-wider shadow-sm">
            VMS
          </span>
        </div>
        {showSubtitle && (
          <p className={cn('text-slate-400 font-medium tracking-normal mt-0.5', current.sub)}>
            Disponibilités Motos Algérie
          </p>
        )}
      </div>
    </div>
  );
};
