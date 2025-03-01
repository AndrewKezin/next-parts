import { Api } from '@/services/api-client';
import { useEffect, useState } from 'react';

/**
 * Хук для получения списка всех возможных вариантов толщины дисков, кол-ва зубов и объема канистры масла
 * @returns Возвращает массивы возможных вариантов и статус загрузки
 */
export const useProductItemsVariants = () => {
  const [thicknessArr, setThicknessArr] = useState<number[]>([]);
  const [quantityOfTeethArr, setQuantityOfTeethArr] = useState<number[]>([]);
  const [volumeArr, setVolumeArr] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductItemsVariants = async () => {
      try {
        setLoading(true);
        // отправить GET запрос на localhost:3000/api/productitems чтобы через призму получить из БД список ингредиентов
        const productItems = await Api.productitems.getAll();

        const thicknessSet = new Set(productItems.map((item) => item.thickness));
        const quantityOfTeethSet = new Set(productItems.map((item) => item.quantityOfTeeth));
        const volumeSet = new Set(productItems.map((item) => item.volume));

        setThicknessArr(Array.from(thicknessSet).sort());
        setQuantityOfTeethArr(Array.from(quantityOfTeethSet).sort());
        setVolumeArr(Array.from(volumeSet).sort());

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductItemsVariants();
  }, []);

  return {thicknessArr, quantityOfTeethArr, volumeArr, loading};
};
