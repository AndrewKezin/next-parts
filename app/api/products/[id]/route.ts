import { prisma } from '@/prisma/prisma-client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    try {
        const session = await getServerSession(authOptions);
    
        if (!session) {
          return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
        }
    
        if (session.user.role !== 'ADMIN') {
          return NextResponse.json({ message: 'Недостаточно прав' }, { status: 403 });
        }
    
        const product = await prisma.product.findFirst({
            where: {
                id: Number(params.id),
            },
            include: {
                category: true,
                ingredients: true,
                items: true,
                gearboxesManufacturers: true,
            }
        });

        return NextResponse.json(product);
      } catch (err) {
        console.log('[GET_PRODUCT] Error', err);
        return NextResponse.json({ message: '[GET_PRODUCT] Error' }, { status: 500 });
      }
}