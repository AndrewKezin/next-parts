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
    <div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
      <Image
        // два параметра ниже нужны для загрузки изображений со стороннего сайта
        unoptimized
        priority={true}
        src={imageUrl}
        alt="Товар"
        width={widthAtSize(size)[0]}
        height={widthAtSize(size)[1]}
        className="relative left-2 top-2 transition-all z-10  duration-300"
        // два параметра ниже убирают ошибку "The resource ... was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally."
        placeholder="blur"
        blurDataURL={imageUrl}
      />
    </div>
  );
};
