import React from 'react';
import { Check, Hourglass } from 'lucide-react';

interface Props {
  setChecked: () => void;
  type: 'check' | 'timer';
  title?: string;
  disabled?: boolean;
  className?: string;
}

export const MonitorItemButton: React.FC<Props> = ({
  setChecked,
  type,
  title,
  disabled,
  className,
}) => {
  return (
    <button
      className="border border-gray-500 rounded-[10px] bg-slate-50 p-2 cursor-pointer hover:bg-green-100 hover:border-green-600"
      onClick={() => setChecked()}
      title={title}
      disabled={disabled}>
      {disabled ? <Hourglass className="w-5 h-5" /> : <Check className="w-5 h-5 text-green-600" />}
    </button>
  );
};
