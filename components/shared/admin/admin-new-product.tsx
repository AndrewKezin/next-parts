export const AdminNewProduct = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-2">
      <h2 className="text-2xl font-bold">Добавить новый товар</h2>

      <form>
        <div className="w-full flex flex-col items-center justify-center mb-2">
          <div className="w-full flex border border-gray-300 bg-white p-2">
            <div className="w-[100px] flex flex-col items-center justify-center border border-gray-300">
              <div className="underline">ID товара:</div>
              <div>ДОБАВИТЬ</div>
            </div>
            <div className="w-[300px] flex flex-col flex-1 items-center justify-center border border-gray-300">
              <div className="underline">Название:</div>
              <div>ДОБАВИТЬ</div>
            </div>
            <div className="w-[100px] flex flex-col items-center justify-center border border-gray-300">
              <div className="underline">Категория:</div>
              <div>ДОБАВИТЬ</div>
            </div>
            <div className="w-[150px] h-[150px] flex flex-col items-center justify-center border border-gray-300">
              ДОБАВИТЬ
            </div>
            <div className="w-[200px] flex flex-col items-center justify-center border border-gray-300">
              <div className="underline">Производители:</div>
              <div>ДОБАВИТЬ</div>
            </div>
          </div>
          <div className="w-full flex border border-gray-300 bg-white p-2">
            <div className="w-[500px] flex flex-col items-start justify-center border border-gray-300">
              <div className="underline">Дополнительно к товару:</div>

              <div className="flex items-center justify-center gap-1 border border-gray-300">
                <div>ДОБАВИТЬ</div>
                <div className="flex flex-col">
                  <div>ДОБАВИТЬ</div>
                  <div>ДОБАВИТЬ ₽</div>
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center border border-gray-300">
              <div className="underline">Варианты:</div>

              <div className="w-full flex items-center justify-center gap-1 border border-gray-300">
                <div className="mx-1">Артикул товара: ДОБАВИТЬ</div>
                <div className="mx-1">Количество зубов диска: ДОБАВИТЬ</div>
                <div className="mx-1">Толщина диска: ДОБАВИТЬ</div>
                <div className="mx-1">Объём канистры масла: ДОБАВИТЬ л</div>
                <div className="mx-1">Стоимость: ДОБАВИТЬ ₽</div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
