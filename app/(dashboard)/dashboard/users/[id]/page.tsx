import { getUserProfile } from '@/lib';
import { AdminUserProfile, CartItemsView, UserOrdersView } from '@/components/shared';
import { CartItemDTO, UserDTO } from '@/services/dto/cart.dto';

// { params: { id } }: { params: { id: string } } позволяет вытащить id из url без использования useSearchParams
export default async function UserPage({ params: { id } }: { params: { id: string } }) {
  const user = (await getUserProfile(id)) as UserDTO;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl lg:text-4xl font-bold mt-10 mb-5">Просмотр профиля пользователя</h1>

      <AdminUserProfile user={user} />

      <div className="w-full flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-3">Заказы пользователя:</h2>
        <UserOrdersView orders={user.orders.reverse()} type={'admin'} />
      </div>

      <div className="w-full flex flex-col justify-center items-center mb-5">
        <h2 className="text-2xl font-bold mb-3">Сейчас у пользователя в корзине:</h2>
        <CartItemsView items={user?.cart?.items as CartItemDTO[]} />
      </div>
    </div>
  );
}
