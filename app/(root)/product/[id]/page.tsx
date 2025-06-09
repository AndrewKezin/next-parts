import { Container, ProductForm } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: id },
    include: {
      // запрос на ингредиенты
      ingredients: true,
      // ниже запрос категории для рекомендованных товаров. Его лучше вынести в отдельный useEffect, т.к. в нём происходят 3 запроса, которые могут затормозить загрузку основного контента
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      // запрос на items
      items: true,
      // запрос на производителей трансмиссий
      gearboxesManufacturers: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} />
    </Container>
  );
}
