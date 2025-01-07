import { getUserProfile } from '@/lib';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// { params: { id } }: { params: { id: string } } позволяет вытащить id из url без использования useSearchParams
export default async function UserPage({ params: { id } }: { params: { id: string } }) {
  const user = await getUserProfile(id);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold mt-10 mb-5">Просмотр профиля пользователя</h1>

      <div className="w-full mb-5">
        <table className="table-auto w-full mb-3 border-collapse border border-black">
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-black font-bold">ID</td>
              <td className="px-4 py-2 border border-black">{user?.id}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black font-bold">Email</td>
              <td className="px-4 py-2 border border-black">{user?.email}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black font-bold">ФИО</td>
              <td className="px-4 py-2 border border-black">{user?.fullName}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black font-bold">Role</td>
              <td className="px-4 py-2 border border-black">{user?.role}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black font-bold">Статус</td>
              <td className="px-4 py-2 border border-black">Статус</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black font-bold">Создан</td>
              <td className="px-4 py-2 border border-black">
                {user?.createdAt.toLocaleDateString()}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black font-bold">Обновлен</td>
              <td className="px-4 py-2 border border-black">
                {user?.updatedAt.toLocaleDateString()}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black font-bold">Подтвержден</td>
              <td className="px-4 py-2 border border-black">
                {user?.verified ? 'Да' : 'Нет'}: {user?.verified?.toLocaleDateString()}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black font-bold">Провайдер</td>
              <td className="px-4 py-2 border border-black">{user?.provider}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black font-bold">Адрес доставки</td>
              <td className="px-4 py-2 border border-black">{user?.address}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black font-bold">Телефон</td>
              <td className="px-4 py-2 border border-black">{user?.phone}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-3">Заказы пользователя:</h2>

        {user?.orders.length === 0 ? (
          <p className="text-xl mb-5">Нет заказов</p>
        ) : (
          <table className="table-auto w-full mb-10 border-collapse border border-black">
            <thead className="bg-slate-200 border border-black">
              <tr>
                <th className="border border-black px-2">ID заказа</th>
                <th className="border border-black px-2">Сумма, ₽</th>
                <th className="border border-black px-2">Адрес доставки</th>
                <th className="border border-black px-2">Статус</th>
                <th className="border border-black px-2">Комментарий</th>
                <th className="border border-black px-2">Создан</th>
                <th className="border border-black px-2">Обновлен</th>
              </tr>
            </thead>
            <tbody>
              {user?.orders.map((order) => (
                <tr key={order.id}>
                  <td className="border border-black px-2 text-center">{order.id}</td>
                  <td className="border border-black px-2">{order.totalAmount}</td>
                  <td className="border border-black px-2">{order.address}</td>
                  <td
                    className={cn(
                      'border border-black px-2',
                      { 'bg-red-400': order.status === 'CANCELED' },
                      { 'bg-green-300': order.status === 'SUCCESS' },
                      { 'bg-yellow-200': order.status === 'PENDING' },
                      { 'bg-blue-200': order.status === 'PROCESSING' },
                    )}>
                    {order.status}
                  </td>
                  <td className="border border-black px-2">{order.comment}</td>
                  <td className="border border-black px-2">{order.createdAt.toLocaleString()}</td>
                  <td className="border border-black px-2">{order.updatedAt.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="w-full flex flex-col justify-center items-center mb-5">
        <h2 className="text-2xl font-bold mb-3">Сейчас у пользователя в корзине:</h2>
        {user?.cart?.items.length === 0 ? (
          <p className="text-xl mb-5">Нет товаров</p>
        ) : (
          <table className="table-auto w-full mb-10 border-collapse border border-black">
            <thead className="bg-slate-200 border border-black">
              <tr>
                <th className="border border-black px-2">ID товара</th>
                <th className="border border-black px-2">Наименование</th>
                <th className="border border-black px-2">Цена, ₽</th>
                <th className="border border-black px-2">Кол-во</th>
                <th className="border border-black px-2">Доп. товары</th>
                <th className="border border-black px-2">Общая стоимость, ₽</th>
                <th className="border border-black px-2">Характеристики товара</th>
              </tr>
            </thead>
            <tbody>
              {user?.cart?.items.map((item) => (
                <tr key={item.id}>
                  <th className="border border-black px-2 font-normal">
                    <Link
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_MAIN_PAGE_URL}/product/${item.productItem.product.id}`}
                      className="underline text-blue-500">
                      {item.productItem.product.id}
                    </Link>
                  </th>
                  <th className="border border-black px-2 font-normal">
                    {item.productItem.product.name}
                  </th>
                  <th className="border border-black px-2 font-normal">{item.productItem.price}</th>
                  <th className="border border-black px-2 font-normal">{item.quantity}</th>
                  <th className="border border-black px-2 font-normal">
                    {item.ingredients.length === 0 ? (
                      <p>Нет доп.товаров</p>
                    ) : (
                      <>
                        {item.ingredients.map((ingregient) => (
                          <p>
                            {ingregient.name} ... {ingregient.price}₽
                          </p>
                        ))}
                      </>
                    )}
                  </th>
                  <th className="border border-black px-2 font-normal">
                    {item.productItem.price * item.quantity +
                      item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)}
                  </th>
                  <th className="border border-black px-2 font-normal">
                    {item.ingredients.length === 0 ? (
                      <p>Нет характеристик</p>
                    ) : (
                      <>
                        {item.productItem.quantityOfTeeth && (
                          <p>{item.productItem.quantityOfTeeth} зубьев</p>
                        )}
                        {item.productItem.thickness && <p>{item.productItem.thickness} мм</p>}
                        {item.productItem.volume && <p>{item.productItem.volume} л</p>}
                      </>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
