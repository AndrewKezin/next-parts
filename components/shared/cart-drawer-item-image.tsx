import { cn } from '@/lib/utils';

interface Props {
  src: string;
  className?: string;
}

// рендерит картинку товара в корзине
export const CartDrawerItemImage: React.FC<Props> = ({ src, className }) => {
  return <img className={cn('w-[150px] sm:w-[200px]', className)} alt="image" src={src} />;
};
