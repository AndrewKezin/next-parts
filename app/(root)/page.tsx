import {
  Container,
  CookieBar,
  Filters,
  FiltersDrawer,
  MobileFiltersButton,
  Title,
  TopBar,
} from '@/components/shared';
import { ProductsGroupList } from '@/components/shared/products-group-list';
import { findParts, GetSearchParams } from '@/lib/find-parts';
import { Settings2 } from 'lucide-react';
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
        <div className="flex lg:gap-[20px] xl:gap-[80px]">
          {/* Фильтрация (левая часть окна) */}
          {/* Десктопный вариант */}
          <div className="hidden lg:block lg:w-[250px]">
            {/* Компонент Suspense необходим для рендеринга html на сервере */}
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Мобильный вариант */}
          <Suspense>
            <div className="block lg:hidden">
              <FiltersDrawer>
                <MobileFiltersButton className="ml-[-15px]" />
              </FiltersDrawer>
            </div>
          </Suspense>

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
