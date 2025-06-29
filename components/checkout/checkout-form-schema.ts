import {z} from 'zod';

export const checkoutFormSchema = z.object({
    firstName: z
        .string()
        .min(2, 'Имя должно содержать не менее 2 символов')
        .max(20, 'Имя должно содержать не более 20 символов'),
    lastName: z
        .string()
        .min(2, 'Фамилия должна содержать не менее 2 символов')
        .max(30, 'Фамилия должна содержать не более 30 символов'),
    email: z
        .string()
        .email('Введите корректный адрес электронной почты'),
    phone: z
        .string()
        .min(10, 'Номер телефона должен содержать не менее 10 символов')
        .max(15, 'Номер телефона должен содержать не более 15 символов'),
    deliveryMethod: z.enum(['delivery', 'pickup']),
    address: z
        .string()
        .min(5, 'Адрес должен содержать не менее 5 символов')
        .max(100, 'Адрес должен содержать не более 100 символов'),
    comment: z.string().optional()
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>