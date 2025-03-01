import { Api } from '@/services/api-client';
import { Category } from '@prisma/client';
import { useEffect, useState } from 'react';

/**
 * Хук, получающий с бэкенда список категорий и статус их загрузки
 * @returns Возвращает список категорий и статус загрузки
 */
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        // отправить GET запрос на localhost:3000/api/categories чтобы через призму получить из БД список категорий
        const allCategories = await Api.categories.getAll();
        setCategories(allCategories);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading };
};
