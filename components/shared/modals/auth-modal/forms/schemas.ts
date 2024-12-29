// zod - библиотека для валидации
import { z } from 'zod';

const passwordSchema = z.string().min(5, {
  message: 'Пароль должен содержать не менее 5 символов',
});

// форма авторизации
export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Введите корректный email' }),
  password: passwordSchema,
});

// форма регистрации
export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z
        .string()
        .min(4, 'Имя должно содержать не менее 2 символов')
        .max(20, 'Имя должно содержать не более 20 символов'),
      confirmPassword: passwordSchema,
      privacyconfirm: z.literal(true),
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Поля "Пароль" и "Подтвердите пароль" должны совпадать',
    path: ['confirmPassword'],
  });

// форма изменения профиля
export const formProfileSchema = z
  .object({
    email: z.string().email({ message: 'Введите корректный email' }),
    fullName: z
      .string()
      .min(4, 'Имя должно содержать не менее 2 символов')
      .max(20, 'Имя должно содержать не более 20 символов'),
      // следующие поля либо необязательные, либо будут валидироваться (при вводе значений)
    phone: z
      .string()
      .min(10, 'Номер телефона должен содержать не менее 10 символов')
      .optional()
      .or(z.literal('')),
    address: z.string().min(10, 'Введите корректный адрес').optional().or(z.literal('')),
    password: passwordSchema.optional().or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Поля "Пароль" и "Подтвердите пароль" должны совпадать',
    path: ['confirmPassword'],
  });

// типизация форм
export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TFormProfileValues = z.infer<typeof formProfileSchema>;
