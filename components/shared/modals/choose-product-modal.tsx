'use client';

import { Dialog } from '@/components/ui';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '@/components/shared';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    // router.back() - это закрыть модалку
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          'p-1 w-[300px] sm:w-[500px] md:w-[600px] lg:w-[980px] xl:w-[1100px] h-[calc(100vh-70px)] bg-white rounded-md invisible-scrollbar overflow-auto',
          className,
        )}>
        <ProductForm product={product} onModalSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
