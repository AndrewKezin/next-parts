'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/store';
import React from 'react';
import toast from 'react-hot-toast';
import { ChooseDiscForm } from './choose-disc-form';
import { ChooseOilForm } from './choose-oil-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
  product: ProductWithRelations;
  onModalSubmit?: VoidFunction;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({ product, onModalSubmit, className }) => {
  const [quantity, setQuantity] = React.useState(1);
  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

  // проверка на то, что продукт является диском
  const isDiscForm = Boolean(product.items[0].quantityOfTeeth);
  // проверка на то, что продукт является маслом
  const isOilForm = Boolean(product.items[0].volume);

  const firstItem = product.items[0];

  const onSubmit = async (productItemId?: string, ingredients?: string[]) => {
    try {
      const itemID = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemID,
        quantity: quantity,
        ingredients,
      });

      // всплывающее сообщение
      toast.success('Товар добавлен в корзину');

      // если onSubmit отработал в модальном окне, то выполнить router.back(), который получен через пропс из компонента модалки
      onModalSubmit?.();
    } catch (err) {
      console.error(err);
      toast.error('Не удалось добавить товар в корзину');
    }
  };

  if (isDiscForm) {
    return (
      <ChooseDiscForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        manufacturer={product.gearboxesManufacturers}
        quantity={quantity}
        setQuantity={setQuantity}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  if (isOilForm) {
    return (
      <ChooseOilForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        manufacturer={product.gearboxesManufacturers}
        quantity={quantity}
        setQuantity={setQuantity}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      ingredients={product.ingredients}
      items={product.items}
      manufacturer={product.gearboxesManufacturers}
      quantity={quantity}
      setQuantity={setQuantity}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};
