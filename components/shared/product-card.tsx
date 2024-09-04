'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  classname?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, classname }) => {
  return (
    <div className={classname}>
      <Link href={`product/${id}`}>
        {/* Изображение */}
        <div className="flex justify-center p-6 bg-secondary rounded-lg  h-[260px]">
          <Image unoptimized priority={true} src={imageUrl} alt={name} width={215} height={215} className='w-auto h-auto' />
        </div>

        {/* Заголовок */}
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        {/* Применимость */}
        <p className="text-sm text-grey-400">ZF, Aisin, GM</p>

        {/* Цена */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price} ₽</b>
          </span>
        </div>

        {/* Кнопка "Добавить" */}
        <Button variant="secondary">
          <Plus size={20} className="mr-1" />
          Добавить
        </Button>
      </Link>
    </div>
  );
};
