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
          'p-0 w-[1060px] max-w-[1060px] h-[calc(100vh-50px)] bg-white invisible-scrollbar overflow-auto',
          className,
        )}>
        <ProductForm product={product} onModalSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
