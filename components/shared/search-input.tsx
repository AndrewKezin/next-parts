'use client';

import { cn } from '@/lib/utils';
import { Api } from '@/services/api-client';
import { Product } from '@prisma/client';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useClickAway, useDebounce } from 'react-use';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Ловим клик по оверлэю
  useClickAway(ref, () => {
    setFocused(false);
  });

  // Запрос на поиск
  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery);
          setProducts(response);
      } catch(error) {
        console.log(error); 
      }
    },
    300,
    [searchQuery],
  );

  // После клика на товар в popup закрыть окно popup
  const onClickItem = () => {
    setProducts([]);
    setSearchQuery('');
    setFocused(false);
  }

  return (
    <>
      {/* Оверлэй */}
      {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}

      {/* Поле ввода */}
      <div
        ref={ref}
        className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
        {/* Lucide-значок поиска */}
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />

        {/* Поле ввода */}
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Поиск"
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Lucide-значок очистки */}
        {searchQuery.length > 0 && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute top-1/2 translate-y-[-50%] right-3 h-5 text-gray-400">
            <X />
          </button>
        )}

        {/* popup окно для найденных товаров */}
        {products.length > 0 && (
          <div
            className={cn(
              'absolute w-full h-[calc(100vh-100px)] overflow-y-auto invisible-scrollbar bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12',
            )}>
            {/* Список найденных товаров */}
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                key={product.id}
                href={`/product/${product.id}`}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10">
                <Image
                  unoptimized
                  priority={true}
                  className="rounded-sm h-8 w-8"
                  width={32}
                  height={32}
                  src={product.imageUrl}
                  alt={product.name}
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
