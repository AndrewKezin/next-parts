import React from 'react';
import { Check, Hourglass } from 'lucide-react';

interface Props {
  handleChecked: () => void;
  type: 'check' | 'timer';
  className?: string;
}

export const MonitorItemButton: React.FC<Props> = ({ handleChecked, type, className }) => {
  return (
    <button
      className="border border-gray-500 rounded-[10px] bg-slate-50 p-2 cursor-pointer"
      onClick={() => handleChecked()}>
      {type === 'timer' ? <Hourglass className="w-5 h-5" /> : <Check className="w-5 h-5" />}
    </button>
  );
};
