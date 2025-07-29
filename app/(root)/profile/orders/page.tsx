import { Container, UserOrdersView } from '@/components/shared';
import { Button } from '@/components/ui';
import { getUserProfile } from '@/lib';
import { getUserSession } from '@/lib/get-user-session';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function OrdersPage() {
  const getUser = await getUserSession();

  if (!getUser) {
    return redirect('/not-auth');
  }

  const user = await getUserProfile(getUser.id);
  const orders = user?.orders.reverse();

  if (!orders) {
    return redirect('/');
  }

  return (
    <Container>
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl font-bold mt-10 mb-5">Заказы</h1>

        {orders.length === 0 ? (
          <h2 className="text-3xl font-bold mt-12 mb-5">Заказов нет</h2>
        ) : (
          <UserOrdersView orders={orders} type={'user'} />
        )}

        <Link href={'/profile'}>
          <Button className="w-[150px] md:w-[300px] h-[50px] text-xl font-bold mt-10 mb-5">
            Назад
          </Button>
        </Link>
      </div>
    </Container>
  );
}
