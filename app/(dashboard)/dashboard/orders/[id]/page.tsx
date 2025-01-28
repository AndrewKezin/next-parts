import { AdminOrderInfo } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function AdminOrderPage({ params: { id } }: { params: { id: string } }) {
  const order = await prisma.order.findFirst({
    where: {
      id: Number(id),
    },
  });

  return (
    <div>
      <h1 className="text-4xl font-bold mt-10 mb-5 text-center">Просмотр заказа #{id}</h1>

     {order && <AdminOrderInfo order={order} />}
    </div>
  );
}
