import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'mx-auto px-3 min-w-[320px] sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px]',
        className,
      )}>
      {children}
    </div>
  );
};
