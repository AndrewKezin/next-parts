import {cn} from '@/lib/utils';

interface Props {
  value: number;
  className?: string;
}

// рендерит стоимость товара в корзине
export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
  return <h2 className={cn('font-bold', className)}>{value} ₽</h2>;
};
