import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  autoUpdate: boolean;
  intervalTime: number;
  autoUpdatePeriod: string;
  setAutoUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setIntervalTime: React.Dispatch<React.SetStateAction<number>>;
  setAutoUpdatePeriod: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

export const AutoUpdate: React.FC<Props> = ({
  autoUpdate,
  setAutoUpdate,
  intervalTime,
  setIntervalTime,
  autoUpdatePeriod,
  setAutoUpdatePeriod,
  className,
}) => {
  const [value, setValue] = React.useState(1);
  const setIntervalTimeHandler = (value: number) => {
    if (isNaN(value)) {
      setValue(1);
      return;
    }
    
    if (Number(value) < 0 || Number(value) > 99) {
      setValue(1);
      return;
    }

    setValue(value);
    autoUpdatePeriod === 'minutes' ? setIntervalTime(value * 60000) : setIntervalTime(value * 1000);
  };

  return (
    <div
      className={cn(
        'flex justify-center items-center w-[550px] gap-2 p-5 border border-gray-500 rounded',
        className,
      )}>
      <input
        type="checkbox"
        className="w-[16px] h-[16px]"
        checked={autoUpdate}
        onChange={(e) => setAutoUpdate(e.target.checked)}
      />
      {autoUpdate ? 'Автообновление включено' : 'Автообновление выключено'}
      {autoUpdate && (
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => setIntervalTimeHandler(Number(e.target.value))}
            className="w-[50px] border px-1 border-slate-500"
          />

          <fieldset className="flex gap-2">
            <input
              type="radio"
              id="minutes"
              name="autoUpdatePeriod"
              value="minutes"
              defaultChecked={autoUpdatePeriod === 'minutes'}
              onChange={(e) => setAutoUpdatePeriod(e.target.value)}
            />
            <label htmlFor="minutes" className="text-sm px-1">
              минут
            </label>
            <input
              type="radio"
              id="seconds"
              name="autoUpdatePeriod"
              value="seconds"
              defaultChecked={autoUpdatePeriod === 'seconds'}
              onChange={(e) => setAutoUpdatePeriod(e.target.value)}
            />
            <label htmlFor="seconds" className="text-sm px-1">
              секунд
            </label>
          </fieldset>
        </div>
      )}
    </div>
  );
};
