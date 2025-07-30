import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface Props {
  imageUrl: string;
  size?: number;
  className?: string;
}

const widthAtSize = (size: number = 2) => {
  switch (size) {
    case 1:
      return [300, 300];
    case 2:
      return [400, 400];
    case 3:
      return [500, 500];
    default:
      return [400, 400];
  }
};

export const ProductImage: React.FC<Props> = ({ imageUrl, size, className }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center relative w-[200px] sm:w-[300px] md:w-[300px] lg:w-[400px] xl:w-[500px]',
        className,
      )}>
      {!imageUrl || imageUrl === '-' ? (
        <div className="flex justify-center items-center w-80% h-80% rounded-sm bg-gray-100 text-gray-400">
          Нет фотографии
        </div>
      ) : (
        <Image
          // два параметра ниже нужны для загрузки изображений со стороннего сайта
          unoptimized
          priority={true}
          src={imageUrl}
          alt="Товар"
          width={widthAtSize(size)[0]}
          height={widthAtSize(size)[1]}
          className="z-10"
          // два параметра ниже убирают ошибку "The resource ... was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally."
          placeholder="blur"
          blurDataURL={imageUrl}
        />
      )}
    </div>
  );
};
