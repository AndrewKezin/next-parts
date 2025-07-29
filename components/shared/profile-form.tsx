'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { formProfileSchema, TFormProfileValues } from './modals/auth-modal/forms/schemas';
import toast from 'react-hot-toast';
import { Container } from './container';
import { Title } from './title';
import { FormInput } from '../form';
import { Button } from '../ui';
import { Eye, EyeOff, Save } from 'lucide-react';
import { updateUserInfo } from '@/app/actions';
import { AddressInput } from './address-input';
import { ErrorText } from './error-text';
import { ProfileAddresses, ProfileMenu } from '.';
import { UserDTO } from '@/services/dto/cart.dto';

interface Props {
  data: UserDTO;
}

export const ProfileForm: React.FC<Props> = ({ data: userData }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [type, setType] = React.useState<'password' | 'text'>('password');
  const [required, setRequired] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(formProfileSchema),
    defaultValues: {
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone || '',
      address: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { control } = form;

  const onSubmit = async (data: TFormProfileValues) => {
    try {
      const result = await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        addresses: data.address ? { create: [{ address: data.address }] } : undefined,
        phone: data.phone,
        password: data.password,
      });

      if (!result) {
        return toast.error('Произошла ошибка при обновлении данных', {
          icon: '❌',
        });
      }

      toast.error('Данные обновлены 📝', {
        icon: '✅',
      });
      window.location.reload();
    } catch (error) {
      return toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    }
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

  return (
    <Container className="my-10">
      <Title text={`Профиль пользователя ${userData.fullName}`} size="md" className="font-bold" />

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-full sm:w-96 mt-10 mb-7"
          onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />
          <FormInput type="phone" name="phone" label="Телефон" />

          <ProfileAddresses addresses={userData.addresses} />

          <Controller
            name="address"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <p className="font-medium mb-[-10px]">Добавить адрес доставки</p>
                <AddressInput onChange={field.onChange} />
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
            <Save size={23} className="ml-2" />
          </Button>
        </form>
      </FormProvider>

      <ProfileMenu />
    </Container>
  );
};
