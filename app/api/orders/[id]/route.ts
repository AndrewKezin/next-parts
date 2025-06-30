import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { checkAdminRules } from '@/lib/check-admin-rules';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminRules = await checkAdminRules(true);

    if (adminRules.status !== 200) {
      return NextResponse.json({ message: adminRules.message }, { status: adminRules.status });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(order);
  } catch (err) {
    console.log('[GET_ORDERS] Error', err);
    return NextResponse.json({ message: '[GET_ORDERS] Error' }, { status: 500 });
  }
}
