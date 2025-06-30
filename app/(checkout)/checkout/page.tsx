'use client';

import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm } from '@/components/checkout';
import { CheckoutSidebar, Container, Title } from '@/components/shared';
import { useCart } from '@/hooks';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutFormSchema, CheckoutFormValues } from '@/components/checkout/checkout-form-schema';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useTestPayStore } from '@/store';
import { Api } from '@/services/api-client';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);

  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart();

  const totalCountDisabled = items.some((item) => item.disabled);

  const session = useSession();

  // стор для тестового платежа
  const payStore = useTestPayStore((state) => state);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      deliveryMethod: 'delivery',
      address: '',
      email: '',
      comment: '',
    },
  });

  // вшить в поля формы данные о пользователе, когда придут данные о сессии
  useEffect(() => {
    async function fetchUserInfo() {
      const data: User = await Api.auth.getMe();

      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
      if (data.phone) {
        form.setValue('phone', data.phone);
      }
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    try {
      setSubmitting(true);
      // серверный экшн. Вернет ссылку (по учебному курсу)
      // const url = await createOrder(data);

      const orderData = await createOrder(data);
      const url = orderData?.confirmation.confirmation_url;

      toast.success('Заказ успешно оформлен! Переход на страницу оплаты заказа...', {
        icon: '✅',
      });

      // отправить данные в стор для тестового платежа (не в рамках учебного курса). Zustand стор с middleware persist сохранит данные в localStorage, чтобы затем достать эти данные на группе роута test-pay.
      if (orderData) {
        payStore.setData(orderData);
      }

      // редирект на страницу оплаты заказа, если серверный экшн вернул ссылку
      if (url) {
        location.href = url;
      }
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
        <h2 className="text-3xl font-bold mt-20 mb-5 text-center">
          Вы не авторизованы! Авторизуйтесь, пожалуйста!
        </h2>
      </Container>
    );
  }

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-40">
            {/* Левая часть */}
            <div className="flex flex-col gap-5 flex-1 mb-20">
              <CheckoutCart
                items={items}
                updateItemQuantity={updateItemQuantity}
                removeCartItem={removeCartItem}
                loading={loading}
              />

              <CheckoutPersonalForm className={loading ? 'opacity-40 cursor-pointer-none' : ''} />

              <CheckoutAddressForm
                inputValue={form.watch('address')}
                className={loading ? 'opacity-40 cursor-pointer-none' : ''}
              />
            </div>

            {/* Правая часть */}
            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                hasDelivery={form.watch('deliveryMethod') === 'delivery'}
                loading={totalCountDisabled || loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
