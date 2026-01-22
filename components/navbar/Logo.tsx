// components/navbar/Logo.tsx
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/lib/stores/ui-store';
import { useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className, size = 'lg' }: LogoProps) {
  const { theme } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sizeMap = {
    sm: { width: 40, height: 40 },
    md: { width: 56, height: 56 },
    lg: { width: 72, height: 72 },
    xl: { width: 96, height: 96 },
  };

  const dimensions = sizeMap[size];
  
  // Utiliser toujours le logo transparent sur fond clair pour un look professionnel
  const logoSrc = theme === 'dark' 
    ? '/images/transparent/Logo_fr-removebg-preview.png'
    : '/images/transparent/Logo_fr-removebg-preview.png';

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Image
        src={logoSrc}
        alt=""
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain"
        priority
        quality={100}
        style={{
          filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none',
        }}
      />
    </div>
  );
}