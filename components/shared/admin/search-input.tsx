import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import React from 'react';
import { useDebounce } from 'react-use';

interface Props {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  className?: string;
}

export const AdminSearchInput: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  title,
  className,
}) => {
  const [query, setQuery] = React.useState('');

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
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />

        {/* Поле ввода */}
        <input
          type="text"
          className="w-full h-[30px] rounded-[3px] outline outline-1 bg-gray-100 pl-10 pr-3"
          placeholder="Поиск"
          // value={query}
          onChange={(e) => setQuery(e.target.value)}
          value={searchQuery}
        />
      </div>
    </div>
  );
};
