import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';

/**
 * Хук, получающий с бэкенда список ингредиентов и статус их загрузки
 */
export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        // отправить GET запрос на localhost:3000/api/ingredients чтобы через призму получить из БД список ингредиентов
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients, loading };
};
