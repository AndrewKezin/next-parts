'use client';

import React, { useEffect, useState } from 'react';
import {
  AdminNewProduct,
  AdminPagination,
  AdminProductCard,
  AdminProductFilter,
  ProductSktn,
} from '@/components/shared';
import { Button } from '@/components/ui';
import { PackagePlus, PackageSearch } from 'lucide-react';
import { ProductDTO } from '@/services/dto/cart.dto';
import { FetchProducts } from '@/services/dto/cart.dto';
import { useSearchParams } from 'next/navigation';

export default function DashboardProducts() {
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [productEditId, setProductEditId] = useState<string>('');
  const [isProductEdit, setIsProductEdit] = useState(false);
  const [productItemId, setProductItemId] = useState<string>('');

  // пролучить productItemId из url, для перехода из админ-монитора
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.has('prodItemId')) {
      setProductItemId(searchParams.get('prodItemId') || '');
    }
  }, [searchParams]);

  const handleSetData = (product: FetchProducts) => {
    if (product) {
      setProducts(product.products);
      setTotalCount(product.totalCount || 0);
    }
  };

  const handleProductEdit = (id: string) => {
    setIsProductEdit(true);
    setProductEditId(id);
  };

  const handleAddProduct = () => {
    setIsNewProduct(!isNewProduct);
    setIsProductEdit(false);
  };

  if (isProductEdit) {
    return (
      <>
        <div className="w-full p-3">
          <Button
            variant={'outline'}
            className="w-[250px] mb-3 border-black text-black bg-slate-100"
            onClick={() => setIsProductEdit(false)}>
            <PackageSearch className="mr-2" />
            Перейти к списку товаров
          </Button>
          <AdminNewProduct
            productId={productEditId}
            isProductEdit={isProductEdit}
            setIsProductEdit={setIsProductEdit}
          />
        </div>
      </>
    );
  }

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
          productItemId={productItemId}
        />
      )}

      <div className="w-full p-3 mb-3">
        <Button
          variant={'outline'}
          className="w-[250px] mb-3 border-black text-black bg-slate-100"
          onClick={handleAddProduct}>
          {isNewProduct || isProductEdit ? (
            <>
              <PackageSearch className="mr-2" /> Перейти к списку товаров
            </>
          ) : (
            <>
              <PackagePlus className="mr-2" /> Добавить новый товар
            </>
          )}
        </Button>
      </div>

      {isNewProduct && <AdminNewProduct />}

      {/* Список товаров */}
      {!isNewProduct &&
        isLoading &&
        Array(5)
          .fill(0)
          .map((_, index) => <ProductSktn key={index} />)}
      {!isLoading && (!products || products?.length === 0) && (
        <p className="text-2xl p-5">Товары по выбранным параметрам не найдены</p>
      )}

      {!isNewProduct && products && products.length > 0 && (
        <>
          <p className="text-md p-5">Найдено товаров: {totalCount}</p>

          {products.map((product) => (
            <AdminProductCard
              key={product.id}
              product={product}
              handleProductEdit={handleProductEdit}
            />
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
    </div>
  );
}
