import { ProductDTO } from '@/services/dto/cart.dto';

interface Props {
  product: ProductDTO;
}

export const AdminProductCard: React.FC<Props> = ({ product }) => {
  console.log(product);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex border border-gray-300 bg-white p-2">
        <div className="w-[100px] flex flex-col items-center justify-center border border-gray-300">
          <div className="underline">ID товара:</div>
          <div>{product.id}</div>
        </div>
        <div className="w-[300px] flex flex-col items-center justify-center border border-gray-300">
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
          <div className="w-[200px] flex flex-col items-center justify-center border border-gray-300">
            <div className="underline">Дополнительно:</div>
            <div>{product.ingredients.map((item) => item.name).join(', ')}</div>
          </div>
        )}
        <div className="w-[200px] flex flex-col items-center justify-center border border-gray-300">
          <div className="underline">Варианты:</div>
          <div className="flex flex-col items-center justify-center">
            <div>{product.items.map((item) => item.id).join(', ')}</div>
            <div>{product.items.map((item) => item.price).join(', ')}</div>
            <div>{product.items.map((item) => item.quantityOfTeeth).join(', ')}</div>
            <div>{product.items.map((item) => item.thickness).join(', ')}</div>
            <div>{product.items.map((item) => item.volume).join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
