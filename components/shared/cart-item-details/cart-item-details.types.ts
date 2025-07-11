export interface CartItemProps {
  id: number;
  productItemId: string;
  imageUrl: string;
  details: string;
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;
  className?: string;
}
