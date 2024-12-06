import { CartItemDTO } from "@/services/dto/cart.dto";

interface Props {
    orderId: number;
    items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => {
    return (
        <div>
            <h1>Спасибо за покупку в NEXT PARTS!</h1>

            <p>Ваш заказ <b>#{orderId}</b> оплачен. Список товаров:</p>

            <hr />
            
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.productItem.product.name} | {item.productItem.price} ₽ X {item.quantity} шт = {item.productItem.price * item.quantity} ₽
                    </li>
                ))}
            </ul>
        </div>
    );
}