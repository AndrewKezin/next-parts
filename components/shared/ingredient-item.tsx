import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useSet } from 'react-use';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: Boolean;
  onClick?: () => void;
  className?: string;
}

// Поле с ингредиентом
export const IngredientItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  active,
  onClick,
  className,
}) => {
  // Кастомный хук useSet для хранения выбранных id ингредиентов
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  return (
    <div
      className={cn(
        'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
        {'border border-primary': active},
        className,
      )}
      onClick={onClick}>
        {/* Галочка выбранного ингредиента */}
        {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}

        <Image unoptimized priority={true} src={imageUrl} alt={name} width={110} height={110} />
        <span className="text-xs mb-1">{name}</span>
        <span className='font-bold'>{price} ₽</span>

      </div>
  );
};
