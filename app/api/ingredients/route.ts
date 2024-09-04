import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";


// получение списка ингредиентов
export async function GET() {
    const ingredients = await prisma.ingredient.findMany();

    return NextResponse.json(ingredients);
}