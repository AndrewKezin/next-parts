import { DatePickerWithRange } from '@/components/ui';
import { cn } from '@/lib/utils';
import React from 'react';
import { DateRange } from 'react-day-picker';

interface Props {
  title: string;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  className?: string;
}

export const AdminDatePicker: React.FC<Props> = ({ title, date, setDate, className }) => {
  return (
    <div className={cn('flex flex-col gap-2 items-center', className)}>
      <p className="text-gray-600 text-sm ">{title}</p>

      <DatePickerWithRange date={date} setDate={setDate} />
    </div>
  );
};
