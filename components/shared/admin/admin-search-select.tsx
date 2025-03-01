import { SimpleSelect } from '@/components/ui';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  title: string;
  list: Record<string, string>;
  value: string;
  defaultValue?: string;
  setQuery: React.ChangeEventHandler<HTMLSelectElement>;
  className?: string;
}

export const AdminSearchSelect: React.FC<Props> = ({ setQuery, value, title, list, defaultValue, className }) => {
  return (
    <div className={cn('flex flex-col gap-2 items-center', className)}>
      <p className="text-gray-600 text-sm ">{title}</p>

      <SimpleSelect
        list={list}
        value={value}
        defaultValue={defaultValue}
        handleChange={setQuery}
        className='w-full h-[30px] rounded-[3px] outline outline-1 bg-gray-100 px-3'
      />
    </div>
  );
};
