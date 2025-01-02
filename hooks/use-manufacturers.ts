import { Api } from '@/services/api-client';
import { GearboxManufacturer } from '@prisma/client';
import { useEffect, useState } from 'react';

/**
 * Хук для получения с бэкенда списка производителей трансмиссий
 * @returns Возвращает список производителей и статус загрузки
 */
export const useManufacturers = () => {
  const [manufacturers, setManufacturers] = useState<GearboxManufacturer[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function fetchManufacturers() {
      try {
        setloading(true);
        // отправить GET запрос на localhost:3000/api/manufacturers чтобы через призму получить из БД список производителей
        const manufacturersArr = await Api.manufacturers.getManufacturers();
        setManufacturers(manufacturersArr);
      } catch (err) {
        console.log(err);
      } finally {
        setloading(false);
      }
    }

    fetchManufacturers();
  }, []);

  return { manufacturers, loading };
};
