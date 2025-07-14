import { AdminOrderInfo, Container } from '@/components/shared';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';

export default async function UserOrderPage({ params: { id } }: { params: { id: string } }) {
  const session = await getUserSession();

  if (!session) {
    return redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.id),
    },
    select: {
      id: true,
      orders: true,
    },
  });

  if (!user) {
    return redirect('/not-auth');
  }

  const findOrder = user.orders.find((order) => order.id === Number(id));

  if (!findOrder) {
    return <h2 className="text-3xl font-bold mt-20 mb-5 text-center">Заказ не найден</h2>;
  }

  const order = await prisma.order.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!order) {
    return <h2 className="text-3xl font-bold mt-20 mb-5 text-center">Заказ не найден</h2>;
  }

  const orderPayData = await prisma.testPayment.findFirst({
    where: {
      id: String(order.paymentId),
    },
    select: {
      paid: true,
      confirmation: true,
    },
  });

  if (!orderPayData) {
    return (
      <h2 className="text-3xl font-bold mt-20 mb-5 text-center">
        Произошла ошибка при создании заказа. Пожалуйста, свяжитесь с менеджером или создайте заказ
        заново.
      </h2>
    );
  }

  const isPaid = orderPayData?.paid;
  const paymentUrl = JSON.parse(String(orderPayData?.confirmation)).confirmation_url;

  return (
    <Container>
      <div>
        <h1 className="text-4xl font-bold mt-10 mb-5 text-center">Просмотр заказа #{id}</h1>

        {order && <AdminOrderInfo order={order} paymentUrl={!isPaid && paymentUrl} />}
      </div>
    </Container>
  );
}
