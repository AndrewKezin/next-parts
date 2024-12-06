interface Props {
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentUrl }) => {
    return (
        <div>
            <h1>Заказ из магазина NextParts # {orderId}</h1>
            <p>Сумма заказа: <b>{totalAmount} ₽</b></p>
            <a href={paymentUrl}>Ссылка на оплату</a>
            <p>Пожалуйста, оплатите заказ в ближайшее время!</p>
        </div>
    );
}