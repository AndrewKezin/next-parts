'use client';

import React from 'react';
import { Button } from '@/components/ui';
import Select, { OnChangeValue } from 'react-select';
import { TOption } from './admin-product-select';

interface Props {
  // количество найденных элементов в БД
  totalCount: number;
  setStartIndex: (startIndex: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  className?: string;
}

export const AdminPagination: React.FC<Props> = ({
  totalCount,
  setStartIndex,
  setItemsPerPage,
  className,
}) => {
  const [page, setPage] = React.useState(1);
  const [goToPage, setGoToPage] = React.useState('1');
  const [itemsPerPageInPag, setitemsPerPageInPag] = React.useState<TOption>({
    value: '10',
    label: '10',
  });
  const pagesOptions: TOption[] = [
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
  ];

  React.useEffect(() => {
    setStartIndex((page - 1) * Number(itemsPerPageInPag.value));
    setItemsPerPage(Number(itemsPerPageInPag.value));
  }, [page, itemsPerPageInPag]);

  const totalPages = totalCount ? totalCount : 1;
  const maxPages = Math.ceil(totalPages / Number(itemsPerPageInPag.value));

  // логика перехода на следующую/предыдущую страницу по кнопкам
  const handlePageChange = (page: number): void => {
    setPage(page);
  };

  // логика показа по количеству элементов на странице
  const handlePageOptionsChange = (selectedOptions: OnChangeValue<TOption, boolean>) => {
    setitemsPerPageInPag(selectedOptions as TOption);
    handlePageChange(1);
  };

  // логика перехода на допусимую страницу
  const handleGoToPage = (goToPage: string) => {
    const pageNumber = Number(goToPage);
    if (isNaN(pageNumber)) {
      setPage(1);
      setGoToPage('1');
    } else if (pageNumber < 1) {
      setPage(1);
      setGoToPage('1');
    } else if (pageNumber > maxPages) {
      setPage(maxPages);
      setGoToPage(maxPages.toString());
    } else {
      setPage(pageNumber);
    }
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-center gap-1">
        <Button
          variant={'outline'}
          className="border-black text-black bg-slate-100"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}>
          &lt;
        </Button>
        <p className="text-xl">
          {page} из {maxPages}
        </p>
        <Button
          variant={'outline'}
          className="border-black text-black bg-slate-100"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === maxPages}>
          &gt;
        </Button>
      </div>

      <div className="flex items-center justify-center gap-1">
        <label htmlFor="pageOptions">Показывать по:</label>
        <Select
          isMulti={false}
          name="pageOptions"
          id="pageOptions"
          value={itemsPerPageInPag}
          options={pagesOptions}
          onChange={handlePageOptionsChange}
        />
        <p>товаров</p>
      </div>

      <div className="flex items-center justify-center gap-1">
        <form
          className="flex items-center gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleGoToPage(goToPage);
          }}>
          <label htmlFor="goToPage">К странице:</label>
          <input
            type="text"
            name="goToPage"
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
            className="border border-gray-300 rounded p-2 w-[50px]"
          />
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
            Перейти
          </button>
        </form>
      </div>
    </div>
  );
};
