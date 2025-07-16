'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Props {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  className?: string;
}

export const DatePickerWithRange: React.FC<Props> = ({ date, setDate, className }) => {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            className="flex justify-start items-center text-left font-normal w-[250px] h-[30px] rounded-[3px] outline outline-1 bg-gray-100 px-2">
            <CalendarIcon className="w-[20px] h-[20px] text-gray-400 mr-1" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd LLL y')} - {format(date.to, 'dd LLL y')}
                </>
              ) : (
                format(date.from, 'dd LLL y')
              )
            ) : (
              <span>Выбрать даты</span>
            )}
          </button>
          {/* </Button> */}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
