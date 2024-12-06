import { cn } from '@/lib/utils';

interface Props {
  src: string;
  className?: string;
}

// рендерит картинку товара в корзине
export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return <img className={cn('w-[60px] h-[60px]', className)} src={src} />;
};
