import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  text: string;
  value: string | number;
  arrows?: boolean;
  endText?: string;
  className?: string;
}

export const AdminProdCardItemProp: React.FC<Props> = ({ text, value, arrows, endText, className }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <p className="underline">{text}:</p>
      <div className="flex items-center mb-2">
        {arrows && <button className="w-7 h-7 mr-2 border border-gray-500 rounded-[5px]">-</button>}
        <p>
          {value} {endText}
        </p>
        {arrows && <button className="w-7 h-7 ml-2 border border-gray-500 rounded-[5px]">+</button>}
      </div>
    </div>
  );
};
