import * as products from './products';
import * as ingredients from './ingredients';
import * as manufacturers from './manufacturers';
import * as cart from './cart';
import * as auth from './dto/auth';
import * as orders from './orders';
import * as users from './users';
import * as categories from './categories';
import * as productitems from './productitems';

// Реэкспорт всех функций из каждого файла сервиса
export const Api = {
    products,
    ingredients,
    manufacturers,
    cart,
    auth,
    orders,
    users,
    categories,
    productitems,
}