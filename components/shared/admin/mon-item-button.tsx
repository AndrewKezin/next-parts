import React from 'react';
import { Check, Hourglass } from 'lucide-react';

interface Props {
  handleChecked: () => void;
  type: 'check' | 'timer';
  title?: string;
  className?: string;
}

export const MonitorItemButton: React.FC<Props> = ({ handleChecked, type, title, className }) => {
  return (
    <button
      className="border border-gray-500 rounded-[10px] bg-slate-50 p-2 cursor-pointer hover:bg-green-100 hover:border-green-600"
      onClick={() => handleChecked()}
      title={title}>
      {type === 'timer' ? <Hourglass className="w-5 h-5" /> : <Check className="w-5 h-5 text-green-600" />}
    </button>
  );
};
