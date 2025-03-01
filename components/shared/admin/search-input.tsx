import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import React from 'react';
import { useDebounce } from 'react-use';

interface Props {
  searchQuery: string;
  title: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isClearInput: boolean;
  setIsClearInput: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder?: string;
  className?: string;
}

export const AdminSearchInput: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  title,
  isClearInput,
  setIsClearInput,
  placeholder='Поиск',
  className,
}) => {
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (isClearInput) {
      setQuery('');
      setIsClearInput(false);
    }
  }, [isClearInput]);

  // Запрос на поиск
  useDebounce(
    () => {
      setSearchQuery(query);
    },
    300,
    [query],
  );  

  return (
    <div className={cn('flex flex-col gap-2 items-center', className)}>
      <p className="text-gray-600 text-sm ">{title}</p>
      <div className="flex rounded-xl flex-1 justify-between relative mb-3">
        {/* Lucide-значок поиска */}
        <Search className="absolute top-1/2 translate-y-[-50%] left-1 h-5 text-gray-400" />
        <X className='absolute top-1/2 translate-y-[-50%] right-1 h-5 text-gray-400 cursor-pointer' onClick={() => setQuery('')} />

        {/* Поле ввода */}
        <input
          type="text"
          className="w-full h-[30px] rounded-[3px] outline outline-1 bg-gray-100 pl-8 pr-3"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};
