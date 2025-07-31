import { cn } from '@/lib/utils';

interface Props {
  name: string;
  details?: string;
  productItemId?: string;
  isExceeding?: boolean;
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({
  name,
  productItemId,
  details,
  isExceeding,
  className,
}) => {
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2
          className={cn('text-md lg:text-lg font-bold flex-1 leading-5 lg:leading-6', {
            'text-red-500': isExceeding,
          })}>
          {name}
        </h2>
      </div>
      <p className="text-sm md:text-md text-gray-600 w-full">Артикул: {productItemId}</p>
      {details && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
    </div>
  );
};
