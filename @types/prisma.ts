import { Ingredient, Product, ProductItem } from "@prisma/client";

// тип, который объединяет Product c items и ингредиентами
export type ProductWithRelations = Product & {items: ProductItem[]; ingredients: Ingredient[]};