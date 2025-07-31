import { cn } from '@/lib/utils';

interface Props {
  src: string;
  className?: string;
}

// рендерит картинку товара в корзине
export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return <img className={cn('w-[80px] sm:w-[150px]', className)} alt="image" src={src} />;
};
