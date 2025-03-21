import { Container, CookieBar, Filters, Title, TopBar } from '@/components/shared';
import { ProductsGroupList } from '@/components/shared/products-group-list';
import { findParts, GetSearchParams } from '@/lib/find-parts';
import { Suspense } from 'react';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findParts(searchParams);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все запчасти" size="lg" className="font-extrabold" />
      </Container>

      {/* Верхняя часть с категориями */}
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Container>
        <div className="flex gap-[80px]">
          {/* Фильтрация (левая часть окна) */}
          <div className="w-[250px]">
            {/* Компонент Suspense необходим для рендеринга html на сервере */}
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Список товаров (правая часть окна) */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* всплывашка согласия на куки */}
      <CookieBar />
    </>
  );
}
