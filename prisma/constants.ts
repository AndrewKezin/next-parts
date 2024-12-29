// тестовые категории
export const categories = [
  { name: 'Комплекты' },
  { name: 'Расходники' },
  { name: 'Диски' },
  { name: 'Железо' },
  { name: 'Электрика' },
  { name: 'Гидроблоки' },
  { name: 'Масла' },
  { name: 'Инструмент' },
];

// тестовые ингредиенты
export const ingredients = [
  {
    name: 'Герметик силиконовый (красный, от -60°C до +200°C, 500ml)',
    price: 2350,
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/05/12/m469blm_1.jpg'
  },
  {
    name: 'Герметик силиконовый EVO300 (серый, от -70°C до +300°C, 70ml)',
    price: 435,
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/05/12/m469blg_1.jpg'
  },
  {
    name: 'Аэрозоль для установки обрезиненных поршней (step 1, 200ml)',
    price: 1100,
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2022/02/27/19500_1.jpg'
  },
  {
    name: 'Стабилизатор трансмиссионной жидкости',
    price: 1520,
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/m465l_1.jpg'
  },
  {
    name: 'Жидкость для разверток',
    price: 1200,
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/m465bt_1.jpg'
  },
  {
    name: 'Модификатор концентрированный фрикционный Dr. Tranny',
    price: 3200,
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/m465ha_1.jpg'
  },
  {
    name: 'Перчатки одноразовые нитриловые JSN NATRIX (размер L, 50шт., оранжевые)',
    price: 2000,
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2023/09/24/J10855L_1.jpg'
  },
  {
    name: 'Радиатор охлаждения трансмиссии дополнительный',
    price: 5800,
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/m465bt_1.jpg'
  },
]

// тестовые продукты
export const products = [
  {
    name: 'Комплект прокладок и сальников (BMW)',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2022/06/05/d194002a_1.jpg',
    categoryId: 1,
  },
  {
    name: 'Комплект прокладок и сальников (Gen 1/2, 2003-up, с шайбами)',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2023/11/19/P156002A_1.jpg',
    categoryId: 1,
  },
  {
    name: 'Ремкомплект с фрикционными дисками',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
    categoryId: 1,
  },
  {
    name: 'Комплект прокладок и сальников',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/s745002a_1.jpg',
    categoryId: 1,
  },
  {
    name: 'Фильтр картридж (с пластиковым корпусом и крышкой)',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2023/05/28/A745012C_1.jpg',
    categoryId: 2,
  },
  {
    name: 'Поддон пластиковый с встроенным фильтром и прокладкой',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2023/06/11/D251010A_1.jpg',
    categoryId: 2,
  },
  {
    name: 'Поддон пластиковый с встроенным фильтром и прокладкой ',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/04/a765010a_1.jpg',
    categoryId: 2,
  },
  {
    name: 'Вал масляного насоса',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/04/15/d96671_1.jpg',
    categoryId: 4,
  },
  {
    name: 'Вал промежуточный раздаточной коробки',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2022/01/30/a39679b_1.jpg',
    categoryId: 4,
  },
  {
    name: 'Комплект соленоидов (9шт.)',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/04/15/a757420a_1.jpg',
    categoryId: 5,
  },
  {
    name: 'Блок соленоидов (#0260200001)',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/04/d46420_1.jpg',
    categoryId: 5,
  },
  {
    name: 'Датчик переключения передач (Nissan, тип 1)',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2024/04/07/D663410A_1.jpg',
    categoryId: 5,
  },
  {
    name: 'Гидравлический блок управления (99-up, без блока соленоидов, восстановленный)',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/f030_1.jpg',
    categoryId: 6,
    gearboxesManufacturers: { connect: [{ id: 15 }] },
  },
  {
    name: 'Гидравлический блок управления (тип 1, Opel)',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/09/26/d19740a_1.jpg',
    categoryId: 6,
  },
  {
    name: 'Гидравлический блок управления (Nissan, тип 1)',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/05/13/d666740a_1.jpg',
    categoryId: 6,
  },
  {
    name: 'Комплект адаптеров для очистки системы охлаждения',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/m465fk_1.jpg',
    categoryId: 8,
  },
  {
    name: 'Набор инструментов для установки втулок',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/t-55064_1.jpg',
    categoryId: 8,
  },
  {
    name: 'Съемник гидравлического блока управления',
    imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/05/11/jtc-4921_1.jpg',
    categoryId: 8,
  },
]


export const gearboxManufacturers = [
  {name: 'Aisin Warner'},
  {name: 'Borg Warner'},
  {name: 'China manuf.'},
  {name: 'Ford'},
  {name: 'Getrag'},
  {name: 'GM'},
  {name: 'Honda'},
  {name: 'Kia/Hundai'},
  {name: 'Mercedes-Benz'},
  {name: 'Mitsubishi'},
  {name: 'Nissan/Jatco'},
  {name: 'Other manuf.'},
  {name: 'PSA (France manuf.)'},
  {name: 'Subaru'},
  {name: 'Toyota'},
  {name: 'VAG'},
  {name: 'ZF'},
];