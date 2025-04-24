import { ProductDTO } from '@/services/dto/cart.dto';
import { SearchCheck } from 'lucide-react';
import Link from 'next/link';

interface Props {
  product: ProductDTO;
}

export const AdminProductCard: React.FC<Props> = ({ product }) => {
 
  return (
    <div className="w-full flex flex-col items-center justify-center mb-2">
      <div className="w-full flex border border-gray-300 bg-white p-2">
        <div className="w-[100px] flex flex-col items-center justify-center border border-gray-300">
          <div className="underline">ID товара:</div>
          <div>
            <Link href={`../product/${product.id}`} target="_blank">
              {product.id}
              <SearchCheck className="text-primary" />
            </Link>
          </div>
        </div>
        <div className="w-[300px] flex flex-col flex-1 items-center justify-center border border-gray-300">
          <div className="underline">Название:</div>
          <div>{product.name}</div>
        </div>
        <div className="w-[100px] flex flex-col items-center justify-center border border-gray-300">
          <div className="underline">Категория:</div>
          <div>{product.category.name}</div>
        </div>
        <div className="w-[150px] h-[150px] flex flex-col items-center justify-center border border-gray-300">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="w-[200px] flex flex-col items-center justify-center border border-gray-300">
          <div className="underline">Производители:</div>
          <div>{product.gearboxesManufacturers.map((item) => item.name).join(', ')}</div>
        </div>
      </div>
      <div className="w-full flex border border-gray-300 bg-white p-2">
        {product.ingredients.length > 0 && (
          <div className="w-[500px] flex flex-col items-start justify-center border border-gray-300 p-2 gap-2">
            <div className="underline">Дополнительно к товару:</div>
            {product.ingredients.map((item) => (
              <div className="flex items-center justify-center gap-1 " key={item.id}>
                <div>
                  <img src={item.imageUrl} alt={item.name} width={100} height={100} />
                </div>
                <div className="flex flex-col">
                  <div>{item.name}</div>
                  <div>{item.price} ₽</div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-1 flex-col items-center justify-center border border-gray-300 p-2 gap-2">
          {product.items.length > 1 && <div className="underline">Варианты:</div>}
          {product.items.length === 1 && (
            <div className="w-full flex items-center justify-center gap-1 ">
              <div className="mx-1">Артикул товара: {product.items[0].id}</div>
              {product.items[0].quantityOfTeeth && <div className="mx-1">Кол-во зубов диска: {product.items[0].quantityOfTeeth}</div>}
              {product.items[0].thickness && <div className="mx-1">Толщина диска: {product.items[0].thickness} мм</div>}
              {product.items[0].volume && <div className="mx-1">Объём канистры масла: {product.items[0].volume} л</div>}
              <div className="mx-1">Стоимость: {product.items[0].price} ₽</div>
            </div>
          )}
          {product.items.length > 1 &&
            product.items.map((item) => (
              <div
                className="w-full flex items-center justify-center gap-1 border border-gray-300"
                key={item.id}>
                <div className="mx-1">Артикул товара: {item.id}</div>
                {item.quantityOfTeeth && (
                  <div className="mx-1">Кол-во зубов диска: {item.quantityOfTeeth}</div>
                )}
                {item.thickness && <div className="mx-1">Толщина диска: {item.thickness} мм</div>}
                {item.volume && <div className="mx-1">Объём канистры масла: {item.volume} л</div>}
                <div className="mx-1">Стоимость: {item.price} ₽</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
