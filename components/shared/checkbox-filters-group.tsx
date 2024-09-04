'use client';

import React from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';

type Item = FilterChecboxProps;
interface Props {
    title: string;
    // все чекбоксы
    items: Item[];
    // сокращенный список чекбоксов
    defaultItems: Item[];
    limit?: number;
    // поиск
    searchInputPlacehilder?: string;
    // выбор чекбоксов
    onChange?: (items: string[]) => void;
    // массив выбранных чекбоксов
    defaultValue?: string[];
    classname?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlacehilder = "Поиск...",
    onChange,
    defaultValue,
    classname,
}) => {
    const [showAll, setShowAll] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const list = showAll? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())) : defaultItems?.slice(0, limit);

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    return (
        <div className={classname}>
            <p className='font-bold mb-3'>{title}</p>

            {/* поиск */}
            {showAll &&
                <div className='mb-5'>
                    <Input onChange={onChangeSearchInput} placeholder={searchInputPlacehilder} className='bg-grey-50 border-none' />
                </div>
            }

            <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
                {list.map((item, index) => (
                    <FilterCheckbox 
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={false}
                        onCheckedChange={(ids) => console.log(ids)}
                    />
                ))}
            </div>

            {/* Кнопка "Показать все" */}
            {items.length > limit && (
                <div className={showAll? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
                        {showAll? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}

        </div>
    );
}