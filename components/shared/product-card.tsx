'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus, ShoppingCart } from 'lucide-react';
import { GearboxManufacturer, ProductItem } from '@prisma/client';
import { CartStateItem } from '@/lib/get-cart-details';

interface Props {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  manufacturer: GearboxManufacturer[];
  itemsInCart: CartStateItem[];
  prodItems: ProductItem[];
  classname?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  manufacturer,
  itemsInCart,
  prodItems,
  classname,
}) => {
  const prodItemsInCart = itemsInCart.map((item) => item.productItemId);
  const prodItemsIds = prodItems.map((item) => item.id);

  // проверка наличия товара в корзине
  const isInCart = prodItemsInCart.some((item) => prodItemsIds.includes(item));

  const textManufacturer = manufacturer.map((item) => item.name).join(', ');

  const isAvailable = prodItems.some((item) => item.quantity > 0);

  return (
    <div className={classname}>
      <Link href={`product/${id}`}>
        {/* Изображение */}
        <div className="flex justify-center p-6 bg-secondary rounded-lg  h-[260px]">
          {!imageUrl || imageUrl === '-' ? (
            <div className="flex justify-center items-center w-[215px] h-[215px] bg-gray-100 text-gray-400">
              Нет фотографии
            </div>
          ) : (
            <Image
              unoptimized
              priority={true}
              src={imageUrl}
              alt={name}
              width={215}
              height={215}
              className="w-auto h-auto"
            />
          )}
        </div>

        {/* Заголовок */}
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        {/* Применимость */}
        <p className="text-sm text-grey-400">{textManufacturer}</p>

        {/* ID */}
        <p className="text-sm text-grey-400">Каталожный номер: {id}</p>

        {/* Цена */}
        {!isAvailable ? (
          <div className="flex justify-between items-center mt-4">
            <span className="text-[20px] text-gray-500">
              <b>Нет в наличии</b>
            </span>
          </div>
        ) : (
          <div className="flex justify-between items-center mt-4">
            <span className="text-[20px]">
              от <b>{price} ₽</b>
            </span>
          </div>
        )}

        {/* В корзине / Кнопка "Добавить" */}
        {isInCart ? (
          <div className="w-[150px] flex items-center justify-left gap-2 px-2 py-1 bg-secondary rounded-sm text-md font-bold text-primary">
            <ShoppingCart className="mr-1 text-primary" />В корзине
          </div>
        ) : (
          <Button variant="secondary">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        )}
      </Link>
    </div>
  );
};
