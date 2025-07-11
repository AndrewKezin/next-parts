'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TFormLoginValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '@/components/shared/title';
import { FormInput } from '@/components/shared';
import { Button } from '@/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState<'password' | 'text'>('password');

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        form.handleSubmit(onSubmit)();
      }
    };

    document.addEventListener('keydown', handleEnter);

    return () => {
      document.removeEventListener('keydown', handleEnter);
    };
  }, []);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
    setType(type === 'password' ? 'text' : 'password');
  };

  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      // не производить перезагрузку страницы
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw new Error();
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: '✅',
      });

      // Закрыть модальное окно
      onClose?.();
    } catch (err) {
      console.error('Error [LOGIN]:', err);
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
          </div>
        </div>

        <FormInput name="email" label="E-Mail" required />
        <div className="relative">
          <FormInput type={type} name="password" label="Пароль" required />
          <div onClick={toggleVisible} className="absolute right-[40px] top-[45px] cursor-pointer">
            {isVisible ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
          </div>
        </div>

        <Button disabled={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
