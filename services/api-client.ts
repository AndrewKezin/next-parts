import * as products from './products';
import * as ingredients from './ingredients';
import * as manufacturers from './manufacturers';
import * as cart from './cart';
import * as auth from './dto/auth';

// Реэкспорт всех функций из каждого файла сервиса
export const Api = {
    products,
    ingredients,
    manufacturers,
    cart,
    auth,
}