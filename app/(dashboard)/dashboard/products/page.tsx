'use client';

import React from 'react';
import { AdminNewProduct, AdminPagination, AdminProductCard, AdminProductFilter } from '@/components/shared';
import Select, { OnChangeValue } from 'react-select';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { PackagePlus } from 'lucide-react';
import { TOption } from '@/components/shared/admin/admin-product-select';
import { ProductDTO } from '@/services/dto/cart.dto';
import { FetchProducts } from '@/services/dto/cart.dto';

export default function DashboardProducts() {
  const [isNewProduct, setIsNewProduct] = React.useState(false);
  // const [page, setPage] = React.useState(1);
  // const [goToPage, setGoToPage] = React.useState(1);
  const [products, setProducts] = React.useState<ProductDTO[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [startIndex, setStartIndex] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  // const pagesOptions: TOption[] = [
  //   { value: '10', label: '10' },
  //   { value: '15', label: '15' },
  //   { value: '50', label: '50' },
  //   { value: '100', label: '100' },
  // ];

  // const startIndex = (page - 1) * Number(itemsPerPage.value);
  // const endIndex = page * Number(itemsPerPage.value);

  // const totalPages = totalCount ? totalCount : 1;
  // const maxPages = Math.ceil(totalPages / Number(itemsPerPage.value));
  // const currentPageProducts = products.slice(startIndex, endIndex);

  const handleSetData = (product: FetchProducts) => {
    if (product) {
      setProducts(product.products);
      setTotalCount(product.totalCount || 0);
    }
  };

  console.log('products', products);
  console.log('totalCount', totalCount);

  const handleAddProduct = () => {
    setIsNewProduct(!isNewProduct);
  };

  // const handlePageChange = (page: number) => {
  //   setPage(page);
  // };

  // const handlePageOptionsChange = (selectedOptions: OnChangeValue<TOption, boolean>) => {
  //   setitemsPerPage(selectedOptions as TOption);
  //   handlePageChange(1);
  // };

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
          {isNewProduct ? 'Перейти к списку товаров' : 'Добавить новый товар' }
          
        </Button>
      </div>

      {isNewProduct && <AdminNewProduct />}

      {/* Список товаров */}
      {!isNewProduct && isLoading && <p className="text-2xl p-5">Загрузка...</p>}
      {!isLoading && (!products || products?.length === 0) && (
        <p className="text-2xl p-5">Товары по выбранным параметрам не найдены</p>
      )}

      {!isNewProduct && products && products.length > 0 &&
        products.map((product) => <AdminProductCard key={product.id} product={product} />)}

      {/* Пагинация */}
      {!isNewProduct && products && products.length > 1 && (
        <AdminPagination 
        totalCount={totalCount}
        setStartIndex={setStartIndex}
        setItemsPerPage={setItemsPerPage}
          className='flex items-center justify-center w-full gap-7 p-3 mb-5'
        />

        // <div className="flex items-center justify-center w-full gap-7 p-3 mb-5">
        //   <div className="flex items-center justify-center gap-1">
        //     <Button
        //       variant={'outline'}
        //       className="border-black text-black bg-slate-100"
        //       onClick={() => handlePageChange(page - 1)}
        //       disabled={page === 1}>
        //       &lt;
        //     </Button>
        //     <p className="text-xl">
        //       {page} из {maxPages}
        //     </p>
        //     <Button
        //       variant={'outline'}
        //       className="border-black text-black bg-slate-100"
        //       onClick={() => handlePageChange(page + 1)}
        //       disabled={page === maxPages}>
        //       &gt;
        //     </Button>
        //   </div>

        //   <div className="flex items-center justify-center gap-1">
        //     <label htmlFor="pageOptions">Показывать по:</label>
        //     <Select
        //       isMulti={false}
        //       name="pageOptions"
        //       id="pageOptions"
        //       value={itemsPerPage}
        //       options={pagesOptions}
        //       onChange={handlePageOptionsChange}
        //     />
        //     <p>товаров</p>
        //   </div>

        //   <div className="flex items-center justify-center gap-1">
        //     <form
        //       className="flex items-center gap-3"
        //       onSubmit={(e) => {
        //         e.preventDefault();
        //         if (goToPage > 0 && goToPage <= maxPages) {
        //           setPage(goToPage);
        //         }
        //       }}>
        //       <label htmlFor="goToPage">К странице:</label>
        //       <input
        //         type="text"
        //         name="goToPage"
        //         value={goToPage}
        //         onChange={(e) => setGoToPage(Number(e.target.value))}
        //         className="border border-gray-300 rounded p-2 w-[50px]"
        //       />
        //       <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        //         Перейти
        //       </button>
        //     </form>
        //   </div>
        // </div>
      )}

      <Link href="/dashboard" className="text-primary font-bold text-2xl mb-3">
        Вернуться в панель администратора
      </Link>
      <Link href="/dashboard/profile" className="text-primary font-bold text-xl mb-3">
        Перейти в профиль администратора
      </Link>
      <Link href="/dashboard/orders" className="text-primary font-bold text-xl mb-3">
        Перейти к управлению заказами
      </Link>
      <Link href="/dashboard/users" className="text-primary font-bold text-xl mb-3">
        Перейти к управлению профилями пользователей
      </Link>
    </div>
  );
}
