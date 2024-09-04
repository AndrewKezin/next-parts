import Image from 'next/image';
import { Container, Filters, Title, TopBar } from '@/components/shared';
import { ProductCard } from '@/components/shared/product-card';
import { ProductsGroupList } from '@/components/shared/products-group-list';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все запчасти" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container>
        <div className="flex gap-[80px]">
          {/* Фильтрация (левая часть окна) */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров (правая часть окна) */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Комплекты"
                engName="komplekty"
                categoryId={0}
                items={[
                  {
                    id: 0,
                    name: 'Комплект прокладок и сальников (Gen 1/2, 2003-up, без шайб)',
                    image: 'https://at-cvt.com/wp-content/uploads/2022/08/07/t156002a_1.jpg',
                    items: [{ price: 16300 }],
                  },
                  {
                    id: 1,
                    name: 'Комплект прокладок и сальников (Gen 1/2, 2003-up, без шайб)',
                    image: 'https://at-cvt.com/wp-content/uploads/2022/08/07/t156002a_1.jpg',
                    items: [{ price: 16300 }],
                  },
                  {
                    id: 2,
                    name: 'Комплект прокладок и сальников (Gen 1/2, 2003-up, без шайб)',
                    image: 'https://at-cvt.com/wp-content/uploads/2022/08/07/t156002a_1.jpg',
                    items: [{ price: 16300 }],
                  },
                  {
                    id: 3,
                    name: 'Комплект прокладок и сальников (Gen 1/2, 2003-up, без шайб)',
                    image: 'https://at-cvt.com/wp-content/uploads/2022/08/07/t156002a_1.jpg',
                    items: [{ price: 16300 }],
                  },
                  {
                    id: 4,
                    name: 'Комплект прокладок и сальников (Gen 1/2, 2003-up, без шайб)',
                    image: 'https://at-cvt.com/wp-content/uploads/2022/08/07/t156002a_1.jpg',
                    items: [{ price: 16300 }],
                  },
                  {
                    id: 5,
                    name: 'Комплект прокладок и сальников (Gen 1/2, 2003-up, без шайб)',
                    image: 'https://at-cvt.com/wp-content/uploads/2022/08/07/t156002a_1.jpg',
                    items: [{ price: 16300 }],
                  },
                  {
                    id: 6,
                    name: 'Комплект прокладок и сальников (Gen 1/2, 2003-up, без шайб)',
                    image: 'https://at-cvt.com/wp-content/uploads/2022/08/07/t156002a_1.jpg',
                    items: [{ price: 16300 }],
                  },
                ]}
              />

              <ProductsGroupList
                title="Расходники"
                engName="rashodniki"
                categoryId={1}
                items={[
                  {
                    id: 0,
                    name: 'Присадка для трансмиссионного масла CVT (0.296л)',
                    image: 'https://at-cvt.com/wp-content/uploads/2021/04/15/m465cvt_1.jpg',
                    items: [{ price: 2300 }],
                  },
                  {
                    id: 1,
                    name: 'Присадка для трансмиссионного масла CVT (0.296л)',
                    image: 'https://at-cvt.com/wp-content/uploads/2021/04/15/m465cvt_1.jpg',
                    items: [{ price: 2300 }],
                  },
                  {
                    id: 2,
                    name: 'Присадка для трансмиссионного масла CVT (0.296л)',
                    image: 'https://at-cvt.com/wp-content/uploads/2021/04/15/m465cvt_1.jpg',
                    items: [{ price: 2300 }],
                  },
                  {
                    id: 3,
                    name: 'Присадка для трансмиссионного масла CVT (0.296л)',
                    image: 'https://at-cvt.com/wp-content/uploads/2021/04/15/m465cvt_1.jpg',
                    items: [{ price: 2300 }],
                  },
                  {
                    id: 4,
                    name: 'Присадка для трансмиссионного масла CVT (0.296л)',
                    image: 'https://at-cvt.com/wp-content/uploads/2021/04/15/m465cvt_1.jpg',
                    items: [{ price: 2300 }],
                  },
                  {
                    id: 5,
                    name: 'Присадка для трансмиссионного масла CVT (0.296л)',
                    image: 'https://at-cvt.com/wp-content/uploads/2021/04/15/m465cvt_1.jpg',
                    items: [{ price: 2300 }],
                  },
                  {
                    id: 6,
                    name: 'Присадка для трансмиссионного масла CVT (0.296л)',
                    image: 'https://at-cvt.com/wp-content/uploads/2021/04/15/m465cvt_1.jpg',
                    items: [{ price: 2300 }],
                  },
                ]}
              />

              <ProductsGroupList
                title="Диски"
                engName="diski"
                categoryId={2}
                items={[
                  {
                    id: 0,
                    name: 'Фрикционный диск (151×1.6x30T) D',
                    image: 'https://at-cvt.com/wp-content/uploads/2022/10/23/d194103a_1.jpg',
                    items: [{ price: 300 }],
                  },
                  {
                    id: 1,
                    name: 'Фрикционный диск (151×1.6x30T) D',
                    image: 'https://at-cvt.com/wp-content/uploads/2022/10/23/d194103a_1.jpg',
                    items: [{ price: 300 }],
                  },
                  {
                    id: 2,
                    name: 'Фрикционный диск (151×1.6x30T) D',
                    image: 'https://at-cvt.com/wp-content/uploads/2022/10/23/d194103a_1.jpg',
                    items: [{ price: 300 }],
                  },
                  {
                    id: 3,
                    name: 'Фрикционный диск (151×1.6x30T) D',
                    image: 'https://at-cvt.com/wp-content/uploads/2022/10/23/d194103a_1.jpg',
                    items: [{ price: 300 }],
                  },
                  {
                    id: 4,
                    name: 'Фрикционный диск (151×1.6x30T) D',
                    image: 'https://at-cvt.com/wp-content/uploads/2022/10/23/d194103a_1.jpg',
                    items: [{ price: 300 }],
                  },
                  {
                    id: 5,
                    name: 'Фрикционный диск (151×1.6x30T) D',
                    image: 'https://at-cvt.com/wp-content/uploads/2022/10/23/d194103a_1.jpg',
                    items: [{ price: 300 }],
                  },
                  {
                    id: 6,
                    name: 'Фрикционный диск (151×1.6x30T) D',
                    image: 'https://at-cvt.com/wp-content/uploads/2022/10/23/d194103a_1.jpg',
                    items: [{ price: 300 }],
                  },
                ]}
              />
               
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
