'use client';

import React from 'react';
import {
  AdminNavMenu,
  AdminNewProduct,
  AdminPagination,
  AdminProductCard,
  AdminProductFilter,
} from '@/components/shared';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { PackagePlus } from 'lucide-react';
import { ProductDTO } from '@/services/dto/cart.dto';
import { FetchProducts } from '@/services/dto/cart.dto';

export default function DashboardProducts() {
  const [isNewProduct, setIsNewProduct] = React.useState(false);
  const [products, setProducts] = React.useState<ProductDTO[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [startIndex, setStartIndex] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const handleSetData = (product: FetchProducts) => {
    if (product) {
      setProducts(product.products);
      setTotalCount(product.totalCount || 0);
    }
  };

  const handleAddProduct = () => {
    setIsNewProduct(!isNewProduct);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold mt-10 mb-8">Панель управления товарами</h1>

      {/* Фильтр товаров */}
      {!isNewProduct && (
        <AdminProductFilter
          startIndex={startIndex}
          itemsPerPage={itemsPerPage}
          handleSetData={handleSetData}
          setIsLoading={setIsLoading}
        />
      )}

      <div className="w-full p-3 mb-3">
        <Button
          variant={'outline'}
          className="w-[250px] mb-3 border-black text-black bg-slate-100"
          onClick={handleAddProduct}>
          <PackagePlus className="mr-2" />
          {isNewProduct ? 'Перейти к списку товаров' : 'Добавить новый товар'}
        </Button>
      </div>

      {isNewProduct && <AdminNewProduct />}

      {/* Список товаров */}
      {!isNewProduct && isLoading && <p className="text-2xl p-5">Загрузка...</p>}
      {!isLoading && (!products || products?.length === 0) && (
        <p className="text-2xl p-5">Товары по выбранным параметрам не найдены</p>
      )}

      {!isNewProduct &&
        products &&
        products.length > 0 && (
          <>
            <p className='text-md p-5'>Найдено товаров: {totalCount}</p>
            {products.map((product) => (
              <AdminProductCard key={product.id} product={product} />
            ))}
          </>
        )}

      {/* Пагинация */}
      {!isNewProduct && products && products.length > 1 && (
        <AdminPagination
          totalCount={totalCount}
          setStartIndex={setStartIndex}
          setItemsPerPage={setItemsPerPage}
          className="flex items-center justify-center w-full gap-7 p-3 mb-5"
        />
      )}

      <AdminNavMenu page="products" />
    </div>
  );
}
