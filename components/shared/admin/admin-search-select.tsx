import { SimpleSelect } from '@/components/ui';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@prisma/client';
import React from 'react';

interface Props {
  setQuery: React.ChangeEventHandler<HTMLSelectElement>;
  title: string;
  defaultValue: string;
  className?: string;
}

export const AdminSearchSelect: React.FC<Props> = ({ setQuery, title, defaultValue, className }) => {
  return (
    <div className={cn('flex flex-col gap-2 items-center', className)}>
      <p className="text-gray-600 text-sm ">{title}</p>

      <SimpleSelect
        list={OrderStatus}
        defaultValue={defaultValue}
        handleChange={setQuery}
        className='w-full h-[30px] rounded-[3px] outline outline-1 bg-gray-100 px-3'
      />
    </div>
  );
};
