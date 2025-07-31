'use client';

import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm } from '@/components/checkout';
import { CheckoutSidebar, Container } from '@/components/shared';
import { useCart } from '@/hooks';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutFormSchema, CheckoutFormValues } from '@/components/checkout/checkout-form-schema';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Api } from '@/services/api-client';
import { useSession } from 'next-auth/react';
import { UserAddresses } from '@prisma/client';
import { UserWithAddresses } from '@/services/dto/cart.dto';
import { getExceedingAvailQuant } from '@/lib';

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const [addresses, setAddresses] = useState<UserAddresses[]>([]);

  const session = useSession();

  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      deliveryMethod: 'DELIVERY',
      address: undefined,
      email: '',
      comment: '',
    },
  });

  // вшить в поля формы данные о пользователе, когда придут данные о сессии
  useEffect(() => {
    async function fetchUserInfo() {
      // @ts-ignore
      const data: UserWithAddresses = await Api.auth.getMe();

      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
      if (data.phone) {
        form.setValue('phone', data.phone);
      }
      if (data.addresses.length > 0) {
        setAddresses(data.addresses);
      }
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  // получение товаров с превышением доступного количества
  const { countOfSameItems, isExceedingItems } = getExceedingAvailQuant(items);

  const deliveryMethod = form.watch('deliveryMethod');
  const isAddress = Boolean(form.watch('address'));

  const totalCountDisabled = items.some((item) => item.disabled);

  const checkDeliveryAddress = () => {
    return isAddress || deliveryMethod === 'PICKUP';
  };

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    try {
      // включаем индикатор загрузки
      setSubmitting(true);

      // серверный экшн. Вернет ссылку (по учебному курсу)
      // const url = await createOrder(data);

      const orderData = await createOrder(data);

      if (!orderData) {
        return toast.error('Не удалось создать заказ', {
          icon: '❌',
        });
      }

      const url = orderData?.confirmation.confirmation_url;

      toast.success('Заказ успешно оформлен! Переход на страницу оплаты заказа...', {
        icon: '✅',
      });

      if (!url) {
        return toast.error('При создании заказа произошла ошибка', {
          icon: '❌',
        });
      }
      // редирект на страницу оплаты заказа, если серверный экшн вернул ссылку
      window.location.href = url;
    } catch (err) {
      setSubmitting(false);
      console.log(err);

      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  };

  if (session.status === 'unauthenticated') {
    return (
      <Container>
        <h2 className="text-xl lg:text-3xl font-bold mt-20 mb-5 text-center">
          Вы не авторизованы! Авторизуйтесь, пожалуйста!
        </h2>
      </Container>
    );
  }

  return (
    <>
      <h2 className="font-bold xl:font-extrabold pt-3 mb-3 xl:mb-8 text-2xl lg:text-2xl xl:text-[36px]">
        Оформление заказа
      </h2>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col xl:flex-row xl:gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-5 flex-1 mb-20">
              <CheckoutCart
                items={items}
                updateItemQuantity={updateItemQuantity}
                removeCartItem={removeCartItem}
                loading={loading}
                isExceedingItems={isExceedingItems}
                countOfSameItems={countOfSameItems}
              />

              <CheckoutPersonalForm className={loading ? 'opacity-40 cursor-pointer-none' : ''} />

              <CheckoutAddressForm
                addresses={addresses}
                className={loading ? 'opacity-40 cursor-pointer-none' : ''}
              />
            </div>

            {/* Правая часть */}
            <div className="w-full sm:w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                btnDisabled={isExceedingItems || !checkDeliveryAddress()}
                hasDelivery={deliveryMethod === 'DELIVERY'}
                loading={totalCountDisabled || loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
