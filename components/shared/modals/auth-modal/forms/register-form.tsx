'use client';

import { Button } from '@/components/ui/button';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TFormRegisterValues, formRegisterSchema } from './schemas';
import toast from 'react-hot-toast';
import { FormInput, Title } from '@/components/shared';
import { registerUser } from '@/app/actions';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [type, setType] = React.useState<'password' | 'text'>('password');

  const toggleVisible = () => {
    setIsVisible(!isVisible);
    setType(type === 'password' ? 'text' : 'password');
  };

  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error('Регистрация успешна 📝. Подтвердите свою почту', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      return toast.error('Неверный E-Mail или пароль', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Регистрация" size="md" className="font-bold" />
          </div>
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <div className="relative">
          <FormInput name="password" label="Пароль" type={type} required />
          <div onClick={toggleVisible} className="absolute right-[40px] top-[45px] cursor-pointer">
            {isVisible ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
          </div>
          <FormInput name="confirmPassword" label="Подтвердите пароль" type={type} required />
        </div>

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
