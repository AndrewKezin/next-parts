import { Container, ProductImage, Title } from '@/components/shared';
import { GroupVariants } from '@/components/shared/group-variants';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} />

        <div className="w-[490px] bg-[#fcfcfc] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />

          <p className="text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>

          <GroupVariants
            selectedValue='2'
            items={[
                {
                    name: '1.5 мм',
                    value: '1',
                },
                {
                    name: '1.7 мм',
                    value: '2',
                },
                {
                    name: '1.8 мм',
                    value: '3',
                    disabled: true,
                },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
