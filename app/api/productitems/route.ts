import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

// получение всех возможных вариантов толщины дисков, количества зубов и объема канистры масла в виде массива объектов
export async function GET() {
    const productItems = await prisma.productItem.findMany({
      select: {
        thickness: true,
        quantityOfTeeth: true,
        volume: true,
      },
    });

    return NextResponse.json(productItems);
}
