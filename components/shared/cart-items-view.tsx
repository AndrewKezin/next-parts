import { cn } from '@/lib/utils';
import { CartItemDTO } from '@/services/dto/cart.dto';
import Link from 'next/link';
import React, { Fragment } from 'react';

interface Props {
  items: CartItemDTO[];
  className?: string;
}

export const CartItemsView: React.FC<Props> = ({ items, className }) => {
  return (
    <div className={cn('w-full mb-5', className)}>
      {!items || items.length === 0 ? (
        <p className="text-xl mb-5 text-center">Нет товаров/услуг</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-black">
          <thead className="bg-slate-200 border border-black">
            <tr>
              <th className="border border-black px-2">ID товара</th>
              <th className="border border-black px-2">Наименование</th>
              <th className="border border-black px-2">Цена, ₽</th>
              <th className="border border-black px-2">Кол-во</th>
              <th className="border border-black px-2">Доп. товары/услуги</th>
              <th className="border border-black px-2">Общая стоимость, ₽</th>
              <th className="border border-black px-2">Характеристики товара</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <th className="border border-black px-2 font-normal">
                  <Link
                    target="_blank"
                    href={`/product/${item.productItem.product.id}`}
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
                    <p>Нет доп.товаров/услуг</p>
                  ) : (
                    <>
                      {item.ingredients.map((ingregient) => (
                        <Fragment key={ingregient.id}>
                          <p>
                            {ingregient.name} ... {ingregient.price}₽
                          </p>
                          <div className="h-[1px] bg-slate-700 last:hidden" />
                        </Fragment>
                      ))}
                    </>
                  )}
                </th>
                <th className="border border-black px-2 font-normal">
                  {item.productItem.price * item.quantity +
                    item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)}
                </th>
                <th className="border border-black px-2 font-normal">
                  <>
                    {item.productItem.quantityOfTeeth && (
                      <p>{item.productItem.quantityOfTeeth} зубьев</p>
                    )}
                    {item.productItem.thickness && <p>{item.productItem.thickness} мм</p>}
                    {item.productItem.volume && <p>{item.productItem.volume} л</p>}
                  </>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
