interface Props {
  value: number;
  endText?: string;
  className?: string;
}

// рендерит стоимость товара в корзине
export const CartItemDetailsPrice: React.FC<Props> = ({ value, endText, className }) => {
  return (
    <h2 className={className}>
      {value} ₽{endText}
    </h2>
  );
};
