'use client';

import { Dialog } from '@/components/ui';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { ChooseDiscForm, ChooseOilForm, ChooseProductForm } from '@/components/shared';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  // проверка на то, что продукт является диском
  const isDiscForm = Boolean(product.items[0].quantityOfTeeth);
  // проверка на то, что продукт является маслом
  const isOilForm = Boolean(product.items[0].volume);
  

  return (
    // router.back() - это закрыть модалку
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
        {isDiscForm && (
          <ChooseDiscForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
          />
        )}

        {isOilForm && (
          <ChooseOilForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
          />
        )}

        {!(isDiscForm || isOilForm) && (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
