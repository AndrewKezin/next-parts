'use client';

import React, { useState } from 'react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/lib';
import Image from 'next/image';
import { Title } from './title';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks';

// Выезжающее окно корзины справа
export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {totalAmount, items, updateItemQuantity, removeCartItem} = useCart();

  const [redirecting, setRedirecting] = useState(false);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      {/* Кнопка открытия корзины */}
      <SheetTrigger asChild>{children}</SheetTrigger>

      {/* Контент корзины*/}
      <SheetContent
        aria-describedby={undefined}
        className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                В корзине{' '}
                <span className="font-bold">
                  {items.length}{' '}
                  {(items.length % 10 === 1 && 'товар') ||
                    (items.length % 10 === (2 | 3 | 4) && 'товара') ||
                    (items.length % 10 >= 5 && 'товаров')}
                </span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/assets/images/empty-cart.png"
                alt="Корзина пуста"
                width={120}
                height={120}
              />
              <Title size="sm" text="Корзина пуста" className="text-center font-bold my-2" />
              <p className="text-center text-neutral-500 mb-5">
                Вы еще не добавили товаров в корзину
              </p>

              {/* SheetClose добавит onclick на кнопку закрытия */}
              <SheetClose>
                <Button className="w-65 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" /> Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {/* Список товаров в корзине */}
          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto flex-1">
                {items.map((item) => (
                  <div className="mb-2" key={item.id}>
                    <CartDrawerItem
                      id={item.id}
                      imageUrl={item.imageUrl}
                      details={
                        ((item.thickness || item.quantityOfTeeth) &&
                          getCartItemDetails(
                            item.ingredients,
                            item.thickness,
                            item.quantityOfTeeth,
                          )) ||
                        (item.volume &&
                          getCartItemDetails(item.ingredients, null, null, item.volume)) ||
                        ''
                      }
                      disabled={item.disabled}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      onClickCountButton={(type) =>
                        onClickCountButton(item.id, item.quantity, type)
                      }
                      onClickRemove={() => removeCartItem(item.id)}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg  text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{totalAmount} ₽</span>
                  </div>

                  <Link href="/checkout">
                    <Button onClick={() => setRedirecting(true)} disabled={redirecting} type="submit" className="w-full h-12 text-base">
                      Оформить заказ
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div> 
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
