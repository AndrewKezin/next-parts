import { cn } from '@/lib/utils';
import { Settings2 } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
}

export const MobileFiltersButton: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'sticky left-0 top-1/2 text-sm bg-white opacity-50 w-[50px] h-[60px] border border-primary rounded-[3px] flex items-center justify-center cursor-pointer',
        className,
      )}>
      <Settings2 className="w-5 h-5 text-primary" />
    </div>
  );
};
