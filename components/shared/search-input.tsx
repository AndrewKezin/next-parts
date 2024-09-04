'use client';

import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  // Ловим клик по оверлэю
  useClickAway(ref, () => {
    setFocused(false);
  });

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

        <input
          className="rounded-2xl outline-none w-full bg-gray-200 pl-11"
          type="text"
          placeholder="Поиск"
          onFocus={() => setFocused(true)}
        />

        {/* popup окно для найденных товаров */}
        <div className={cn(
            'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
            focused && 'visible opacity-100 top-12')}>

          {/* Список найденных товаров */}
            <Link href='/product/1' className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'>
                <Image unoptimized priority={true} className='rounded-sm h-8 w-8' width={32} height={32} src='https://at-cvt.com/wp-content/uploads/2021/04/15/m465cvt_1.jpg' alt='Товар 1' />
                <span>Товар 1</span>
            </Link>

        </div>

      </div>
    </>
  );
};
