'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { formProfileSchema, TFormProfileValues } from './modals/auth-modal/forms/schemas';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from './container';
import { Title } from './title';
import { FormInput } from '../form';
import { Button } from '../ui';
import { Eye, EyeOff } from 'lucide-react';
import { deleteUserAccount, updateUserInfo } from '@/app/actions';
import { AddressInput } from './address-input';
import { ErrorText } from './error-text';
import { cn } from '@/lib/utils';

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [type, setType] = React.useState<'password' | 'text'>('password');
  const [required, setRequired] = React.useState(false);
  const [isVisibleDeleteBlock, setIsVisibleDeleteBlock] = React.useState(false);
  const [password, setPassword] = React.useState('');

  const form = useForm({
    resolver: zodResolver(formProfileSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || '',
      address: data.address || '',
      password: '',
      confirmPassword: '',
    },
  });

  const { control } = form;

  const onSubmit = async (data: TFormProfileValues) => {
    console.log('onsubmit');
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        password: data.password,
      });

      toast.error('Данные обновлены 📝', {
        icon: '✅',
      });
    } catch (error) {
      return toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    }
  };

  // Выход их аккаунта
  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  // Показать/скрыть пароль
  const toggleVisible = () => {
    setIsVisible(!isVisible);
    setType(type === 'password' ? 'text' : 'password');
  };

  // Если пароль не пустой, то включить обязательность заполнения поля "Подтверждение пароля"
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'password' && value.password) {
        setRequired(true);
      } else {
        setRequired(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // Кнопка удаления аккаунта
  const onClickAccountDelete = () => {
    setIsVisibleDeleteBlock(true);
  };

  // Кнопка подтверждения удаления аккаунта
  const handleConfirmDelete = async () => {
    try {
      const isDeleted = await deleteUserAccount({ password });
      if (isDeleted) {
        toast.error('Ваш аккаунт удален', {
          icon: '✅',
          duration: 5000,
        });
        onClickSignOut();
      } else {
        toast.error('Неверный пароль', {
          icon: '❌',
          duration: 5000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Кнопка отмены удаления
  const onClickCancel = () => {
    setIsVisibleDeleteBlock(false);
    setPassword('');
  };

  return (
    <Container className="my-10">
      <Title text={`Профиль пользователя ${data.fullName}`} size="md" className="font-bold" />

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10 mb-7"
          onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />
          <FormInput type="phone" name="phone" label="Телефон" />

          <Controller
            name="address"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <p className="font-medium mb-[-10px]">Адрес доставки</p>
                <AddressInput onChange={field.onChange} defaultQuery={data.address ?? undefined} />
                {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
              </>
            )}
          />

          <div className="relative">
            <FormInput type={type} name="password" label="Новый пароль" />
            <div
              onClick={toggleVisible}
              className="absolute right-[40px] top-[45px] cursor-pointer">
              {isVisible ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
            </div>
            <FormInput
              type={type}
              name="confirmPassword"
              label="Повторите пароль"
              required={required}
            />
          </div>

          <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
            Сохранить
          </Button>
        </form>
      </FormProvider>

      <div className="flex flex-col gap-5 w-96 mt-3 mb-5">
        <Button
          onClick={onClickSignOut}
          variant="secondary"
          disabled={form.formState.isSubmitting}
          className="text-base mb-7"
          type="submit">
          Выйти из аккаунта
        </Button>

        <div
          className="text-grey-500 cursor-pointer underline w-fit"
          onClick={onClickAccountDelete}>
          Удалить аккаунт
        </div>
        <div className={cn(isVisibleDeleteBlock ? 'flex flex-col gap-2' : 'hidden')}>
          <p>Чтобы подтвердить удаление аккаунта, введите пароль от аккаунта</p>
          <div className="flex gap-2">
            <input
              placeholder="Введите пароль"
              className="w-1/3 border px-1 border-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="w-fit  bg-white border border-grey-500 text-black"
              onClick={handleConfirmDelete}>
              Подтвердить
            </Button>
            <Button
              className="w-fit bg-white border border-grey-500 text-black"
              onClick={onClickCancel}>
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
